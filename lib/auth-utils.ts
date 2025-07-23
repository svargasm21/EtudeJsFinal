import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || '';

export interface UserData {
  userId: string;
  correo: string;
}

export async function getAuthenticatedUser(): Promise<UserData | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as UserData;
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  return user !== null;
}

// Función para usar en componentes cliente
export function getTokenFromClient(): string | null {
  if (typeof window === 'undefined') return null;
  
  // En el cliente, necesitamos acceder a las cookies de manera diferente
  // ya que las cookies HttpOnly no son accesibles desde JavaScript
  // Esto solo funcionará si la cookie no es HttpOnly
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
}
