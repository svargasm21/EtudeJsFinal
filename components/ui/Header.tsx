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

            <ul className='flex flex-row items-center gap-8'>
                <Link href='/courses' className={cn(
                    "text-base cursor-pointer capitalize", 
                    pathname === '/courses' ? 'text-primary font-semibold' : 'text-muted-foreground')}> 
                    Courses
                </Link>
            </ul>
        </header>
    );
};

export default Header;

