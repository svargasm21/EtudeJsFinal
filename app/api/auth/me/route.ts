import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta';

export async function GET(request: NextRequest) {
  try {
    console.log('=== /api/auth/me called ===');
    const token = request.cookies.get('token');
    console.log('Token found:', !!token);
    
    if (!token) {
      console.log('No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    console.log('Verifying token...');
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: number };
    console.log('Token decoded successfully, userId:', decoded.userId);
    
    console.log('Querying database for user...');
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        nombre: true,
        correo: true,
        fechaRegistro: true,
        inscripciones: {
          include: {
            curso: true,
            progreso: true
          }
        }
      }
    });

    if (!user) {
      console.log('User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found successfully:', user.nombre);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error en /api/auth/me:', error);
    const errorMessage = typeof error === 'object' && error !== null && 'message' in error
      ? (error as { message: string }).message
      : String(error);
    return NextResponse.json({ error: 'Invalid token', details: errorMessage }, { status: 401 });
  }
}
