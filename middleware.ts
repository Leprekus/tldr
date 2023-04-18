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
  const response = NextResponse.next();
  const accessToken = req.cookies.get('accessToken')?.value;
  const accessTokenExpires = req.cookies.get('accessTokenExpires')?.value;
  const userToken = await getSession();

  if (userToken?.accessToken) {
    response.cookies.set('accessToken', userToken.accessToken);
    response.cookies.set({
      name: 'accessToken',
      value: userToken.accessToken,
    });
    return response;
  }

  if(parseInt(accessTokenExpires!) < Date.now()) {

  }
  const clientToken = await authenticateClient();
  response.cookies.set('accessToken', clientToken.access_token);
  response.cookies.set({
    name: 'accessToken',
    value: JSON.stringify(clientToken.access_token),
  });
  response.cookies.set(
    'accessTokenExpires',
    JSON.stringify(clientToken.expires_in * 3600)
  );
  response.cookies.set({
    name: 'accessTokenExpires',
    value: JSON.stringify(clientToken.expires_in * 3600),
  });
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
