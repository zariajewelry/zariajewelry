import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import logger from '@/utils/logger';

export function loggingMiddleware(request: NextRequest) {
  const start = Date.now();
  const response = NextResponse.next();


  const ip = request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            'unknown';

  response.headers.set('X-Response-Time', `${Date.now() - start}ms`);
  
  logger.http(`Request completed`, {
    method: request.method,
    path: request.nextUrl.pathname,
    status: response.status,
    responseTime: `${Date.now() - start}ms`,
    ip,
    userAgent: request.headers.get('user-agent')
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};