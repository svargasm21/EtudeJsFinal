"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useSidebar } from './SidebarProvider';
import { Button } from './button';
import { useAuth } from '../../app/hooks/useAuth';

const Header = ({children}: {children : ReactNode}) => {
    const pathname = usePathname();
    const { toggle } = useSidebar();
    const { isAuthenticated, logout, loading } = useAuth();

    return (
        <header className="my-10 flex justify-between items-center gap-5">
            <div className="flex items-center gap-4">
                {/* Botón hamburguesa mejorado */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggle}
                    className="group relative p-2 hover:bg-yellow-400/10 border border-yellow-400/20 hover:border-yellow-400/40 rounded-xl transition-all duration-300"
                >
                    <div className="relative">
                        <svg
                            className="h-5 w-5 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <div className="absolute -inset-1 bg-yellow-400/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                </Button>

                <Link 
                    href="/" 
                    className="text-2xl font-bold hidden md:block group relative"
                    style={{ color: '#e7dfcf' }}
                >
                    <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent group-hover:from-yellow-200 group-hover:to-yellow-500 transition-all duration-300">
                        EtudeJS
                    </span>
                    <div className="absolute -inset-2 bg-yellow-400/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
            </div>

            {/* Navegación mejorada */}
            <nav>
                <ul className="flex items-center space-x-4">
                    {loading ? (
                        // Skeleton loading para los botones
                        <>
                            <div className="w-16 h-8 bg-gray-700 animate-pulse rounded-xl"></div>
                            <div className="w-20 h-8 bg-gray-700 animate-pulse rounded-xl"></div>
                        </>
                    ) : isAuthenticated ? (
                        // Usuario autenticado
                        <>
                            <Link
                                href="/dashboard"
                                className={cn(
                                    'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 border',
                                    pathname === '/dashboard' 
                                        ? 'text-yellow-200 bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10' 
                                        : 'text-gray-300 hover:text-yellow-200 border-transparent hover:border-yellow-400/20 hover:bg-yellow-400/5'
                                )}
                            >
                                Dashboard
                                {pathname === '/dashboard' && (
                                    <div className="absolute -inset-1 bg-yellow-400/20 rounded-xl blur-sm -z-10"></div>
                                )}
                            </Link>

                            <Link
                                href="/profile"
                                className={cn(
                                    'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 border',
                                    pathname === '/profile' 
                                        ? 'text-blue-200 bg-gradient-to-r from-blue-600/20 to-blue-400/20 border-blue-400/40 shadow-lg shadow-blue-400/10' 
                                        : 'text-gray-300 hover:text-blue-200 border-transparent hover:border-blue-400/20 hover:bg-blue-400/5'
                                )}
                            >
                                Mi Perfil
                                {pathname === '/profile' && (
                                    <div className="absolute -inset-1 bg-blue-400/20 rounded-xl blur-sm -z-10"></div>
                                )}
                            </Link>

                            <Button
                                onClick={logout}
                                className="relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 border border-transparent hover:border-red-400/20 hover:bg-red-400/5 text-red-400 hover:text-red-300"
                            >
                                Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        // Usuario no autenticado
                        <>
                            <Link
                                href="/login"
                                className={cn(
                                    'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 border',
                                    pathname === '/login' 
                                        ? 'text-yellow-200 bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10' 
                                        : 'text-gray-300 hover:text-yellow-200 border-transparent hover:border-yellow-400/20 hover:bg-yellow-400/5'
                                )}
                            >
                                Login
                                {pathname === '/login' && (
                                    <div className="absolute -inset-1 bg-yellow-400/20 rounded-xl blur-sm -z-10"></div>
                                )}
                            </Link>

                            <Link
                                href="/dashboard"
                                className={cn(
                                    'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 border',
                                    pathname === '/dashboard' 
                                        ? 'text-blue-200 bg-gradient-to-r from-blue-600/20 to-blue-400/20 border-blue-400/40 shadow-lg shadow-blue-400/10' 
                                        : 'text-gray-300 hover:text-blue-200 border-transparent hover:border-blue-400/20 hover:bg-blue-400/5'
                                )}
                            >
                                Comenzar
                                {pathname === '/dashboard' && (
                                    <div className="absolute -inset-1 bg-blue-400/20 rounded-xl blur-sm -z-10"></div>
                                )}
                            </Link>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

