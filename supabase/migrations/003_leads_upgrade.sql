-- ============================================================
-- Leads table upgrade — structured location, lead scoring,
-- status workflow, address_line.
-- Run this in the Supabase SQL editor.
-- ============================================================

-- 1. Convert location from text → jsonb, preserving existing data
--    Existing plain-text values become { "postcode": "<value>" }
ALTER TABLE public.leads
  ALTER COLUMN location TYPE jsonb
  USING CASE
    WHEN location IS NULL THEN NULL
    ELSE jsonb_build_object('postcode', location)
  END;

-- 2. Rename address → address_line (added in migration 002)
ALTER TABLE public.leads
  RENAME COLUMN address TO address_line;

-- 3. Add lead_score and status columns
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS lead_score integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS status     text    NOT NULL DEFAULT 'new';

-- 4. Indexes for filtering / analytics
CREATE INDEX IF NOT EXISTS leads_lead_score_idx
  ON public.leads (lead_score DESC);

CREATE INDEX IF NOT EXISTS leads_status_idx
  ON public.leads (status);

CREATE INDEX IF NOT EXISTS leads_estimated_cost_idx
  ON public.leads (estimated_cost);
