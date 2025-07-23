'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  nombre: string;
  correo: string;
  fechaRegistro: string;
  inscripciones?: {
    id: number;
    curso: {
      id: number;
      titulo: string;
    };
    progreso?: {
      porcentajeAvance: number;
    };
  }[];
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        // Opcional: redirigir a la página de login
        window.location.href = '/login';
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        
        // Crear un controller para timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
        
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
          const userData = await response.json();
          console.log('User data received:', userData);
          setUser(userData);
        } else {
          const errorData = await response.text();
          console.log('Authentication failed:', response.status, errorData);
          setUser(null);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        if (error instanceof Error && error.name === 'AbortError') {
          console.error('Request timed out');
        }
        setUser(null);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading, isAuthenticated: !!user, logout };
}
