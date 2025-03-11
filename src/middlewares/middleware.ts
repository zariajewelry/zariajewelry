import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const protectedPaths = ['/dashboard', '/profile', '/orders', '/checkout'];
  
  const authRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];
  
  const isPathProtected = protectedPaths.some((path) => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  

  const isAuthRoute = authRoutes.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  if (isPathProtected && !token) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*', 
    '/orders/:path*',
    '/checkout/:path*',
    // Apply middleware to auth routes
    '/auth/:path*',
    // The dashboard index route
    '/dashboard',
    // The profile index route
    '/profile', 
  ],
};