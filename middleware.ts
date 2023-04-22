import { NextRequest } from 'next/server';
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
