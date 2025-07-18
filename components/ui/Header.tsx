"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import path from 'path';

const Header = ({children}: {children : ReactNode}) => {

    const pathname = usePathname();

    return (
        <header className="my-10 flex justify-between gap-5">

            <Link href="/" className="text-2xl font-bold" style={{ color: '#e7dfcf' }} > EtudeJS </Link>

      {/* Navegación */}
      <nav>
        <ul className="flex items-center space-x-6">
          <Link
            href="/login"
            className={cn(
              'text-base cursor-pointer capitalize transition-colors',
              pathname === '/login' ? 'text-primary font-semibold' : 'text-muted-foreground'
            )}
          >
            Login
          </Link>

          <Link
            href="/courses"
            className={cn(
              'text-base cursor-pointer capitalize transition-colors',
              pathname === '/courses' ? 'text-primary font-semibold' : 'text-muted-foreground'
            )}
          >
            Courses
          </Link>
        </ul>
      </nav>
    </header>
    );
};

export default Header;

