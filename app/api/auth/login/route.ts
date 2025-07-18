import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const { correo, contrasena } = await req.json()

    if (!correo || !contrasena) {
      return NextResponse.json(
        { error: 'Debes proporcionar correo y contraseña' },
        { status: 400 }
      )
    }

    const user = await db.usuario.findUnique({ where: { correo } })
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrecta' },
        { status: 401 }
      )
    }

    const valid = await bcrypt.compare(contrasena, user.contrasena)
    if (!valid) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrecta' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: 'Login exitoso', userId: user.id },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error en login:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor al iniciar sesión' },
      { status: 500 }
    )
  }
}
