-- ============================================================
-- Add phone column to leads table.
-- Run this in the Supabase SQL editor.
-- ============================================================

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS phone text;
