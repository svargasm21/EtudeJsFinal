
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { correo, contrasena } = await req.json()

  // Solo para pruebas. Reemplaza luego con consulta a tu BD.
  if (correo === 'admin@correo.com' && contrasena === '123456') {
    return NextResponse.json({ message: 'Login exitoso' }, { status: 200 })
  }

  return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
}
