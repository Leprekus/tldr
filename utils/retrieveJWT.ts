import { NextRequest, NextResponse } from 'next/server';

const jwt = require('jsonwebtoken');

// Retrieve JWT from the cookie
export default function retrieveJWT(req: NextRequest) {
    
    const accessToken = req.cookies.get('access_token')?.value
  if (req.cookies && accessToken) {
    try {
      const token = accessToken;
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
      return decoded;
    } catch (err) {
      console.error(err);
    }
  }
}
