'use client';

import Link from "next/link";
import { Button } from "./button";
import { useAuth } from "../../app/hooks/useAuth";

interface NavButtonsProps {
  className?: string;
}

export const NavButtons = ({ className }: NavButtonsProps) => {
  const { isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className={`flex items-center gap-4 ${className || ''}`}>
        <div className="w-24 h-9 bg-gray-700 animate-pulse rounded-md"></div>
        <div className="w-32 h-9 bg-gray-700 animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className={`flex items-center gap-4 ${className || ''}`}>
        <Link href="/dashboard">
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
            Dashboard
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
            Mi Perfil
          </Button>
        </Link>
        <Button 
          onClick={logout}
          variant="ghost" 
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          Cerrar Sesión
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className || ''}`}>
      <Link href="/login">
        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
          Iniciar Sesión
        </Button>
      </Link>
      <Link href="/dashboard">
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
          Comenzar Gratis
        </Button>
      </Link>
    </div>
  );
};
