import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import handleClientCookieToken from './utils/handleClientCookieToken';
import authenticateClient from './utils/authenticateClient';
// This function can be marked `async` if using `await` inside
interface IClientToken {
  access_token: string,
  token_type: "bearer",
  expires_in: 3600,
  scope: "read write"
}
export async function middleware(req: NextRequest) {

  const token = await getToken({req});
  const res = NextResponse.next()
  if(!token && !res.cookies.get('accessToken')) {
    // const requestHeaders = new Headers(req.headers)
    // handleClientCookieToken(req, requestHeaders)
    const clientToken = 'await authenticateClient()'

    const cookie = res.cookies.set("accessToken", 'clientToken.access_token', {
      httpOnly: true,
      //secure: process.env.NODE_ENV !== "development",
      //sameSite: "strict",
      maxAge: 60 * 60,
      //path: "/",
     });

     return NextResponse.next()
  }


}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
