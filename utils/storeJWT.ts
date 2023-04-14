const jwt = require('jsonwebtoken');

// Store JWT in a cookie with an expiry time
function storeJWT(res, payload:) {
  const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET, { expiresIn });
  res.setHeader('Set-Cookie', `access_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(Date.now() + expiresIn * 1000).toUTCString()}`);
}
