// Vercel Serverless Function: POST /api/beta-signup
// - Validates email
// - Upserts into Supabase table `beta_signups`
// - Optional: sends a notification email via Resend
//
// Env vars (set in Vercel project settings):
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY   (server-only)
// - RESEND_API_KEY              (optional)
// - NOTIFY_EMAIL                (optional; destination)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function getIp(req) {
  const xfwd = req.headers['x-forwarded-for'];
  if (typeof xfwd === 'string' && xfwd.length > 0) return xfwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const err = new Error('Invalid JSON body');
    err.code = 'bad_json';
    throw err;
  }
}

// Basic, best-effort rate limit (per IP) using in-memory map.
// Works per serverless instance (not global) but helps against accidental spam.
const rl = globalThis.__dropcity_rl || (globalThis.__dropcity_rl = new Map());
function rateLimitOk(ip, now = Date.now()) {
  const windowMs = 60_000;
  const max = 5;
  const entry = rl.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }
  entry.count += 1;
  rl.set(ip, entry);
  return entry.count <= max;
}

async function supabaseUpsert(email, meta) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    const err = new Error('Server not configured (missing Supabase env vars)');
    err.code = 'misconfigured';
    throw err;
  }

  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/beta_signups?on_conflict=email`;
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify([{ email, ...meta }]),
  });

  // Supabase returns 201 for insert/upsert with representation.
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    const err = new Error(`Supabase error (${resp.status}): ${text || resp.statusText}`);
    err.code = 'supabase_error';
    err.status = resp.status;
    throw err;
  }

  const data = await resp.json().catch(() => null);
  return Array.isArray(data) && data[0] ? data[0] : null;
}

async function sendConfirmationEmail({ email }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: 'not_configured' };

  const from = 'Drop City <onboarding@resend.dev>';
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">Welcome to Drop City!</h1>
    </div>
    <div style="padding: 40px 30px;">
      <p style="margin: 0 0 20px; font-size: 18px; color: #333333; line-height: 1.6;">
        Hey there! 👋
      </p>
      <p style="margin: 0 0 20px; font-size: 16px; color: #555555; line-height: 1.6;">
        Thanks for signing up for the <strong>Drop City beta</strong>! You're officially on the list.
      </p>
      <p style="margin: 0 0 20px; font-size: 16px; color: #555555; line-height: 1.6;">
        We're building something special, and we can't wait to have you be part of it. We'll reach out soon with early access details and updates.
      </p>
      <p style="margin: 0 0 20px; font-size: 16px; color: #555555; line-height: 1.6;">
        In the meantime, stay tuned! ✨
      </p>
      <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">
          <strong>What's next?</strong><br>
          We'll send you updates as we get closer to launch. Keep an eye on your inbox!
        </p>
      </div>
    </div>
    <div style="padding: 20px 30px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #999999;">
        Drop City &copy; 2026 | Building the future together
      </p>
    </div>
  </div>
</body>
</html>`;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: 'Welcome to the Drop City beta! 🎉',
      html: htmlBody,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    console.warn('Resend confirmation failed', resp.status, text);
    return { sent: false, reason: `resend_${resp.status}` };
  }

  return { sent: true };
}

async function maybeNotifyAdmin({ email }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return { sent: false, reason: 'not_configured' };

  const from = 'Drop City <onboarding@resend.dev>';

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: 'New Drop City beta signup',
      text: `New beta signup: ${email}`,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    console.warn('Resend admin notify failed', resp.status, text);
    return { sent: false, reason: `resend_${resp.status}` };
  }

  return { sent: true };
}

export default async function handler(req, res) {
  // CORS: allow same-origin and simple local testing.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });

  const ip = getIp(req);
  if (!rateLimitOk(ip)) return json(res, 429, { ok: false, error: 'Too many requests. Try again in a minute.' });

  let body;
  try {
    body = await readJsonBody(req);
  } catch (e) {
    return json(res, 400, { ok: false, error: e.message || 'Bad request' });
  }

  const emailRaw = (body.email || '').toString();
  const email = emailRaw.trim().toLowerCase();

  if (!email) return json(res, 400, { ok: false, error: 'Email is required' });
  if (!EMAIL_RE.test(email)) return json(res, 400, { ok: false, error: 'Invalid email address' });

  const nowIso = new Date().toISOString();
  const meta = {
    source: (body.source || 'dropcity.io').toString().slice(0, 100),
    ip,
    user_agent: (req.headers['user-agent'] || '').toString().slice(0, 400),
    updated_at: nowIso,
  };

  try {
    await supabaseUpsert(email, meta);
  } catch (e) {
    if (e.code === 'misconfigured') return json(res, 500, { ok: false, error: e.message });
    return json(res, 500, { ok: false, error: 'Signup failed. Please try again later.' });
  }

  // Send confirmation email to the user and admin notification
  const [confirmation, adminNotify] = await Promise.all([
    sendConfirmationEmail({ email }),
    maybeNotifyAdmin({ email }),
  ]);

  return json(res, 200, { ok: true, email, confirmation, adminNotify });
}
