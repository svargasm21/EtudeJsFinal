import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-utils';

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    
    if (user) {
      return NextResponse.json({ 
        authenticated: true, 
        user: { userId: user.userId, correo: user.correo } 
      });
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Error verificando autenticación:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
