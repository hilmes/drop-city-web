-- Drop City: Beta Signups Table
-- Run this in Supabase Dashboard > SQL Editor
-- Project: ipcrvvqpmyycqwegbcez (charrette, shared for now)

CREATE TABLE IF NOT EXISTS public.beta_signups (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  source      text DEFAULT 'dropcity.io',
  ip          text,
  user_agent  text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Index for fast lookups by email
CREATE INDEX IF NOT EXISTS idx_beta_signups_email ON public.beta_signups (email);

-- Index for analytics by date
CREATE INDEX IF NOT EXISTS idx_beta_signups_created_at ON public.beta_signups (created_at DESC);

-- Enable RLS but allow service_role full access (no policies needed for server-side only)
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow service_role to do everything (this is implicit, but explicit is better)
CREATE POLICY "Service role has full access" ON public.beta_signups
  FOR ALL
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.beta_signups IS 'Drop City beta signup emails from dropcity.io landing page';
