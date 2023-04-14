import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import authenticateClient from './utils/authenticateClient';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
// This function can be marked `async` if using `await` inside
interface IClientToken {
  access_token: string,
  token_type: "bearer",
  expires_in: 3600,
  scope: "read write"
}
export async function middleware(req: NextRequest) {
  const token = await getToken({req});
  if(!token) {
    const clientToken = await authenticateClient()
    jwt.sign(clientToken, process.env.NEXTAUTH_SECRET!)
  }


}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
