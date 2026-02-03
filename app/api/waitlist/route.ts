import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Redis client (only if credentials are available)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const WAITLIST_KEY = 'dropcity:waitlist';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // If Redis isn't configured, return success anyway (for demo/development)
    if (!redis) {
      console.log('Waitlist signup (no Redis):', normalizedEmail);
      return NextResponse.json({
        message: 'You\'re on the list',
        position: Math.floor(Math.random() * 50) + 1,
      });
    }

    // Check if already on waitlist
    const exists = await redis.sismember(WAITLIST_KEY, normalizedEmail);
    if (exists) {
      return NextResponse.json(
        { message: 'You\'re already on the list', alreadyExists: true },
        { status: 200 }
      );
    }

    // Add to waitlist set
    await redis.sadd(WAITLIST_KEY, normalizedEmail);

    // Also store with timestamp for ordering
    await redis.zadd(`${WAITLIST_KEY}:ordered`, {
      score: Date.now(),
      member: normalizedEmail,
    });

    // Get position
    const position = await redis.scard(WAITLIST_KEY);

    return NextResponse.json({
      message: 'You\'re on the list',
      position,
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!redis) {
      return NextResponse.json({ count: 0 });
    }
    const count = await redis.scard(WAITLIST_KEY);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Waitlist count error:', error);
    return NextResponse.json({ count: 0 });
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
