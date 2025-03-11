import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';


export async function withAdminAccess(
  request: NextRequest,
  handler: () => Promise<NextResponse>
) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  if (!token || token.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Unauthorized: You must be an admin to access this resource' },
      { status: 403 }
    );
  }

  return handler();
}