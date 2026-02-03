# Drop City Website Setup

## Upstash Redis Configuration

The waitlist feature requires Upstash Redis for storing email signups.

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
