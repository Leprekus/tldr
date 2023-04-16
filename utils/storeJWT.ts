import { IClientToken } from '@/typings';
const jwt = require('jsonwebtoken');

// Store JWT in a cookie with an expiry time
export default function storeJWT(headers: Headers, payload: IClientToken) {
  const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET, { accessTokenExpires: payload.expires_in });
  headers.set('Set-Cookie', `access_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(Date.now() + payload.expires_in * 1000).toUTCString()}`);
}
