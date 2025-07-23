import React, { ReactNode } from 'react';
import Header from '../../components/ui/Header';
import SidebarLayout from '../../components/ui/SidebarLayout';
import { SidebarProvider } from '../../components/ui/SidebarProvider';

const Layout = ({children}: {children : ReactNode}) => {
  return (
    <SidebarProvider>
      <SidebarLayout>
        <div 
          className="flex flex-col bg-pattern bg-cover bg-top bg-dark-100 px-5 xs:px-10 md:px-16 min-h-screen"
          style={{ backgroundImage: "url('/images/pattern.webp')" }}
        >
          <div className='mx-auto max-w-7xl w-full'>
            <Header> {children} </Header>
            <div className='mt-20 pb-20'> {children} </div>
          </div>
        </div>
      </SidebarLayout>
    </SidebarProvider>
  );
};

export default Layout;

