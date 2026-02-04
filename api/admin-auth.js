// Vercel Serverless Function: /api/admin-auth
// - GET ?client_id=1 → returns the Google client ID for the frontend
// - POST { idToken } → verifies Google ID token, checks authorized email
//
// Env vars:
// - GOOGLE_CLIENT_ID           (Google OAuth 2.0 Web Client ID)
// - ADMIN_EMAILS               (optional; comma-separated list, defaults to jhilmes@gmail.com)

const ALLOWED_EMAILS = (process.env.ADMIN_EMAILS || 'jhilmes@gmail.com')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

/**
 * Verify Google ID token using Google's tokeninfo endpoint.
 * This is the simplest approach — no library needed.
 * For production at scale, use google-auth-library, but for an admin
 * page with one user this is perfectly fine.
 */
async function verifyIdToken(idToken, clientId) {
  const resp = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
  );

  if (!resp.ok) {
    throw new Error('Invalid token');
  }

  const payload = await resp.json();

  // Verify the token was issued for our client
  if (payload.aud !== clientId) {
    throw new Error('Token audience mismatch');
  }

  // Verify email is verified
  if (payload.email_verified !== 'true' && payload.email_verified !== true) {
    throw new Error('Email not verified');
  }

  return {
    email: payload.email.toLowerCase(),
    name: payload.name || '',
    picture: payload.picture || '',
    sub: payload.sub,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return json(res, 204, {});

  const clientId = process.env.GOOGLE_CLIENT_ID;

  // GET: return the client ID so the frontend can initialize GSI
  if (req.method === 'GET') {
    if (!clientId) {
      return json(res, 500, { ok: false, error: 'GOOGLE_CLIENT_ID not configured' });
    }
    return json(res, 200, { clientId });
  }

  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  if (!clientId) {
    return json(res, 500, { ok: false, error: 'GOOGLE_CLIENT_ID not configured' });
  }

  // Read body
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(res, 400, { ok: false, error: 'Invalid JSON' });
  }

  const { idToken } = body;
  if (!idToken) {
    return json(res, 400, { ok: false, error: 'idToken required' });
  }

  // Verify token
  let user;
  try {
    user = await verifyIdToken(idToken, clientId);
  } catch (e) {
    return json(res, 401, { ok: false, error: `Authentication failed: ${e.message}` });
  }

  // Check authorization
  if (!ALLOWED_EMAILS.includes(user.email)) {
    return json(res, 403, { ok: false, error: `Access denied. ${user.email} is not authorized.` });
  }

  return json(res, 200, {
    ok: true,
    user: {
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  });
}
