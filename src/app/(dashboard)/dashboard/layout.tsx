import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <aside className='container w-full max-h-screen py-16 md:py-12'>
      {children}
    </aside>
  );
};

export default Layout;
