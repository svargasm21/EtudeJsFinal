"use client";
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default SidebarLayout;
