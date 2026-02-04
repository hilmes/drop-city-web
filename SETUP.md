# Drop City Website Setup

## Beta signup (Supabase + Resend)

The beta signup form posts to `POST /api/beta-signup`.

### Required environment variables (Vercel / `.env.local`)

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
EMAIL_FROM="Drop City <beta@dropcity.io>"   # optional; defaults to onboarding@resend.dev
NOTIFY_EMAIL=team@dropcity.io               # optional
```

### Supabase table

Create a table named `beta_signups` with a **unique** constraint on `email`.
Minimum schema:

- `email` (text, unique)
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

> The API uses a service-role key and performs an idempotent upsert on `email`.

### Email behavior

- Always records the signup in Supabase.
- Sends a confirmation email to the user via Resend.
- Optionally sends a notification email to `NOTIFY_EMAIL`.
- If email sending fails, the API still returns **200** and includes email status in the response.

## Upstash Redis Configuration (legacy)

The previous waitlist endpoint (`/api/waitlist`) uses Upstash Redis for storing email signups.

### Quick Setup via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/hilmes-projects/drop-city-web)
2. Click **Storage** tab
3. Click **Create Database** → Select **Upstash Redis**
4. Name it `drop-city-waitlist`
5. Select **Free** tier
6. Click **Create**
7. Environment variables are auto-configured

### Manual Setup

1. Create account at [upstash.com](https://upstash.com)
2. Create a new Redis database (Free tier works)
3. Copy the REST URL and REST Token
4. Add to Vercel environment variables:

```
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...
```

5. Redeploy

### Domain Configuration

Add these DNS records for dropcity.io:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

Or use CNAME:
| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |

### Viewing Waitlist

```bash
# Get count
curl https://dropcity.io/api/waitlist

# View all emails (requires direct Upstash access)
# Use Upstash console or Redis CLI
```

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000
