-- ============================================================
-- Add timeline and address as dedicated columns on leads.
-- Run this in the Supabase SQL editor.
-- ============================================================

alter table public.leads
  add column if not exists timeline text,
  add column if not exists address  text;
