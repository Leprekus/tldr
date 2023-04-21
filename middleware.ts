import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import handleClientCookieToken from './utils/handleClientCookieToken';
import authenticateClient from './utils/authenticateClient';
import { getSession } from 'next-auth/react';
// This function can be marked `async` if using `await` inside
interface IClientToken {
  access_token: string;
  token_type: 'bearer';
  expires_in: 3600;
  scope: 'read write';
}
export async function middleware(req: NextRequest) {
  
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
