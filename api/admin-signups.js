// Vercel Serverless Function: GET /api/admin-signups
// - Requires Authorization: Bearer <google-id-token>
// - Verifies token + checks authorized email
// - Returns all beta signups from Supabase
//
// Env vars:
// - GOOGLE_CLIENT_ID
// - ADMIN_EMAILS (optional, defaults to jhilmes@gmail.com)
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY

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

async function verifyIdToken(idToken, clientId) {
  const resp = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
  );
  if (!resp.ok) throw new Error('Invalid token');

  const payload = await resp.json();
  if (payload.aud !== clientId) throw new Error('Token audience mismatch');
  if (payload.email_verified !== 'true' && payload.email_verified !== true) {
    throw new Error('Email not verified');
  }

  return { email: payload.email.toLowerCase() };
}

async function requireAuth(req) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) throw Object.assign(new Error('GOOGLE_CLIENT_ID not configured'), { status: 500 });

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) throw Object.assign(new Error('Authorization required'), { status: 401 });

  let user;
  try {
    user = await verifyIdToken(token, clientId);
  } catch (e) {
    throw Object.assign(new Error(`Auth failed: ${e.message}`), { status: 401 });
  }

  if (!ALLOWED_EMAILS.includes(user.email)) {
    throw Object.assign(new Error('Access denied'), { status: 403 });
  }

  return user;
}

async function fetchSignups() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase not configured');

  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/beta_signups?select=email,source,created_at,updated_at&order=created_at.desc`;
  const resp = await fetch(endpoint, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Supabase error (${resp.status}): ${text}`);
  }

  return resp.json();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'Method not allowed' });

  // Auth check
  try {
    await requireAuth(req);
  } catch (e) {
    return json(res, e.status || 401, { ok: false, error: e.message });
  }

  // Fetch data
  let signups;
  try {
    signups = await fetchSignups();
  } catch (e) {
    return json(res, 500, { ok: false, error: e.message });
  }

  return json(res, 200, {
    ok: true,
    signups,
    stats: {
      total: signups.length,
    },
  });
}
