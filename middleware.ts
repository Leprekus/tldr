import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from './pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth';
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


// import { withAuth } from "next-auth/middleware"


// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
    
//       // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      

//       // if (!session) {
        
//       //   return new NextResponse(
//       //     JSON.stringify({ success: false, message: 'authentication failed' }),
//       //     { status: 401, headers: { 'content-type': 'application/json' } }
//       //   )
//       // }
//       return NextResponse.json({ message: 'pee pee'});
//     },
//   {
//     callbacks: {
//       authorized: ({ token }) => token ? true : false,
//     },
//     secret: process.env.NEXTAUTH_SECRET
//   }
// )