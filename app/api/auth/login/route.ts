// app/api/auth/login/route.ts

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword } from '@/lib/auth'
import jwt from 'jsonwebtoken'

const { JWT_SECRET = '' } = process.env

export async function POST(req: Request) {
  try {
    const { correo, contrasena } = await req.json()

    if (!correo || !contrasena) {
      return NextResponse.json(
        { error: 'Debes proporcionar correo y contraseña' },
        { status: 400 }
      )
    }

    // 1) Buscar usuario
    const user = await db.usuario.findUnique({ where: { correo } })
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrecta' },
        { status: 401 }
      )
    }

    // 2) Verificar contraseña
    const isValid = await verifyPassword(contrasena, user.contrasena)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrecta' },
        { status: 401 }
      )
    }

    // 3) Generar token JWT
    const token = jwt.sign(
      { userId: user.id, correo: user.correo },
      JWT_SECRET,
      { expiresIn: '2h' }
    )

    // 4) Devolverlo en cookie HttpOnly
    const response = NextResponse.json(
      { message: 'Login exitoso' },
      { status: 200 }
    )
    // Cookie segura, HttpOnly y sameSite Lax
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 2 * 60 * 60 // 2 horas en segundos
    })

    return response
  } catch (err) {
    console.error('Error en login:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor al iniciar sesión' },
      { status: 500 }
    )
  }
}
