import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuthenticated = await getToken({ req });
    const isLoginPage = pathname.startsWith('/login');

    const protectedRoutes = ['/dashboard', '/chat/*'];
    const isAccessingProtectedRoutes = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (isAccessingProtectedRoutes && !isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAccessingProtectedRoutes && !isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  macher: ['/', '/login', '/dashboard/*'],
};
