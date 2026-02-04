import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

type BetaSignupBody = {
  email?: unknown;
};

function isValidEmail(email: string): boolean {
  // Simple pragmatic validation. Supabase unique constraint is the ultimate guard.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest) {
  let emailRaw: unknown;
  try {
    const body = (await request.json()) as BetaSignupBody;
    emailRaw = body?.email;
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  if (typeof emailRaw !== 'string') {
    return json(400, { error: 'Valid email required' });
  }

  const email = emailRaw.toLowerCase().trim();
  if (!email || !isValidEmail(email)) {
    return json(400, { error: 'Valid email required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return json(500, { error: 'Server misconfigured' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  const now = new Date().toISOString();

  // Schema expectation: beta_signups(email text primary key/unique, created_at timestamptz default now(), updated_at timestamptz default now())
  // We do an upsert to make this endpoint idempotent.
  const { error: upsertError } = await supabase
    .from('beta_signups')
    .upsert(
      {
        email,
        updated_at: now,
      },
      { onConflict: 'email' }
    );

  if (upsertError) {
    console.error('Supabase upsert error:', upsertError);
    return json(500, { error: 'Failed to save signup' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const notifyEmail = process.env.NOTIFY_EMAIL;

  const notify: {
    confirmationEmailSent: boolean;
    confirmationEmailError?: string;
    notifyEmailSent: boolean;
    notifyEmailError?: string;
  } = {
    confirmationEmailSent: false,
    notifyEmailSent: false,
  };

  if (!resendKey) {
    console.warn('RESEND_API_KEY not set; skipping email send');
    return json(200, { ok: true, email, notify });
  }

  const resend = new Resend(resendKey);

  // 1) Confirmation email to user
  try {
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: 'You\'re on the Drop City beta list',
      text:
        "Thanks for signing up for the Drop City beta. We’ll email you when it’s your turn to get access.\n\n— Drop City",
    });

    if (error) {
      notify.confirmationEmailError = String(error?.message || error);
    } else {
      notify.confirmationEmailSent = true;
    }
  } catch (err) {
    notify.confirmationEmailError = err instanceof Error ? err.message : String(err);
  }

  // 2) Optional notify email to internal address
  if (notifyEmail) {
    try {
      const { error } = await resend.emails.send({
        from: emailFrom,
        to: notifyEmail,
        subject: 'New Drop City beta signup',
        text: `New beta signup: ${email}\nTime: ${now}`,
      });

      if (error) {
        notify.notifyEmailError = String(error?.message || error);
      } else {
        notify.notifyEmailSent = true;
      }
    } catch (err) {
      notify.notifyEmailError = err instanceof Error ? err.message : String(err);
    }
  }

  return json(200, { ok: true, email, notify });
}
