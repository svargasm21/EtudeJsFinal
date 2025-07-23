"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { useSidebar } from './SidebarProvider';
import { useAuth } from '../../app/hooks/useAuth';

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
  requiresAuth: boolean;
  showOnlyWhenNotAuth?: boolean;
}

const sidebarLinks: SidebarLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "/icons/home.svg",
    requiresAuth: false, // Dashboard siempre accesible
  },
  {
    href: "/profile",
    label: "Usuario",
    icon: "/icons/user.svg",
    requiresAuth: true, // Requiere autenticación
  },
  {
    href: "/courses",
    label: "Mis Cursos",
    icon: "/icons/book.svg",
    requiresAuth: true, // Requiere autenticación
  },
  {
    href: "/piano",
    label: "Piano",
    icon: "/icons/book-2.svg",
    requiresAuth: false, // Piano accesible para todos
  },
  {
    href: "/documentation",
    label: "Documentación",
    icon: "/icons/search-fill.svg",
    requiresAuth: false, // Documentación accesible para todos
  },
  {
    href: "/login",
    label: "Iniciar Sesión",
    icon: "/icons/user.svg",
    requiresAuth: false,
    showOnlyWhenNotAuth: true // Solo mostrar cuando no esté autenticado
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, toggle, close } = useSidebar();
  const { isAuthenticated, loading, logout } = useAuth();

  // Filtrar enlaces según el estado de autenticación
  const filteredLinks = sidebarLinks.filter(link => {
    if (link.showOnlyWhenNotAuth) {
      return !isAuthenticated;
    }
    return true;
  });

  const handleLinkClick = (link: SidebarLink) => {
    close();
    
    // Si está cargando, no hacer nada
    if (loading) {
      return;
    }
    
    // Si el enlace requiere autenticación y el usuario no está autenticado
    if (link.requiresAuth && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Si el usuario está autenticado o el enlace no requiere autenticación
    // Usar window.location.href para forzar la navegación para el botón de usuario
    if (link.href === '/profile') {
      window.location.href = link.href;
    } else {
      router.push(link.href);
    }
  };

  return (
    <>
      {/* Overlay elegante */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gradient-to-br from-black/40 via-black/25 to-transparent backdrop-blur-[2px] transition-all duration-500"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full backdrop-blur-lg border-r border-yellow-400/20 transition-all duration-500 ease-in-out",
          "w-56 transform",
          isOpen ? "translate-x-0 sidebar-enter" : "-translate-x-full"
        )}
        style={{ 
          background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.98) 0%, rgba(25, 25, 40, 0.95) 100%)',
          backdropFilter: 'blur(16px)',
          boxShadow: '8px 0 32px rgba(231, 223, 207, 0.1), inset -1px 0 0 rgba(231, 223, 207, 0.2)'
        }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-yellow-400/20 bg-gradient-to-r from-transparent to-yellow-400/5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-sm">E</span>
              </div>
              <Link href="/" className="text-lg font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                EtudeJS
              </Link>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggle}
              className="hover:bg-yellow-400/10 text-yellow-300 hover:text-yellow-200 transition-all duration-300"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1">
            {filteredLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link)}
                disabled={loading}
                className={cn(
                  "w-full group flex items-center space-x-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg nav-item-enter hover-glow",
                  pathname === link.href
                    ? "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-200 border border-yellow-400/30 shadow-yellow-400/20 shadow-lg"
                    : "text-gray-300 hover:text-yellow-200 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-transparent",
                  // Mostrar indicador visual si requiere autenticación y no está autenticado
                  link.requiresAuth && !isAuthenticated && !loading ? "opacity-75" : "",
                  loading ? "opacity-50 cursor-not-allowed" : ""
                )}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="relative">
                  <img
                    src={link.icon}
                    alt={link.label}
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      pathname === link.href 
                        ? "brightness-0 invert drop-shadow-sm" 
                        : "filter brightness-75 group-hover:brightness-110 group-hover:drop-shadow-sm"
                    )}
                  />
                  {pathname === link.href && (
                    <div className="absolute -inset-1 bg-yellow-400/20 rounded-full blur-sm -z-10" />
                  )}
                  {/* Icono de candado para enlaces que requieren autenticación */}
                  {link.requiresAuth && !isAuthenticated && !loading && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className={cn(
                  "transition-all duration-300",
                  pathname === link.href ? "font-semibold" : "",
                  link.requiresAuth && !isAuthenticated && !loading ? "opacity-75" : ""
                )}>
                  {link.label}
                  {link.requiresAuth && !isAuthenticated && !loading && (
                    <span className="text-xs text-red-400 ml-1">(Login requerido)</span>
                  )}
                </span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          {isAuthenticated && (
            <div className="p-3 border-t border-yellow-400/20 bg-gradient-to-t from-red-900/10 to-transparent">
              <button
                onClick={() => {
                  close();
                  logout();
                }}
                className="w-full group flex items-center space-x-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-400/20 hover:text-red-300 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-red-400/20"
              >
                <div className="relative">
                  <img
                    src="/icons/logout.svg"
                    alt="Logout"
                    className="h-5 w-5 filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                  />
                  <div className="absolute -inset-1 bg-red-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <span className="group-hover:font-medium transition-all duration-300">Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
