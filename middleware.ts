import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export default async function requireSession(
  req: NextRequest,
  res: NextResponse,
  next: () => void
) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/user/:path*',
}
