-- ============================================================
-- leads table — unified lead store for all Worthulator calculators
-- Run this once in the Supabase SQL editor for your project.
-- ============================================================

create table if not exists public.leads (
  id                uuid        primary key default gen_random_uuid(),
  created_at        timestamptz not null    default now(),

  -- Which calculator generated this lead
  calculator_type   text        not null,

  -- Contact
  name              text,
  email             text,

  -- Key context fields (denormalised for easy querying / analytics)
  location          text,
  estimated_cost    numeric,

  -- Full snapshot — flexible JSON columns
  inputs            jsonb       not null default '{}'::jsonb,
  results           jsonb       not null default '{}'::jsonb,
  metadata          jsonb       not null default '{}'::jsonb,

  -- Consent
  marketing_consent boolean     not null default false
);

-- ── Indexes for common query patterns ────────────────────────────────────────

-- Filter / group by calculator
create index if not exists leads_calculator_type_idx
  on public.leads (calculator_type);

-- Time-series analytics
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- Email lookup (e.g. deduplication, follow-up)
create index if not exists leads_email_idx
  on public.leads (email)
  where email is not null;

-- ── Row-Level Security ────────────────────────────────────────────────────────
-- The API route uses the service role key which bypasses RLS.
-- Enable RLS so the anon key cannot read or write leads directly.

alter table public.leads enable row level security;

-- No public policies — all access goes through the service role via /api/leads.
-- Add dashboard policies here if you need Supabase Studio read access:
--
-- create policy "service_role_full_access" on public.leads
--   using (auth.role() = 'service_role');
