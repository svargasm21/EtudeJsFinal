import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcrypt'
import { hashPassword } from '@/lib/auth';
export async function POST(req: Request) {
  try {
    const { nombre, correo, contrasena } = await req.json()

    if (!nombre || !correo || !contrasena) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios (nombre, correo y contraseña)' },
        { status: 400 }
      )
    }

    const existing = await db.usuario.findUnique({ where: { correo } })
    if (existing) {
      return NextResponse.json(
        { error: 'El correo ya está registrado' },
        { status: 409 }
      )
    }

    const hashed = await hashPassword(contrasena);
    const newUser = await db.usuario.create({
      data: { nombre, correo, contrasena: hashed }
    })

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', userId: newUser.id },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error en register:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor al registrar usuario' },
      { status: 500 }
    )
  }
}
