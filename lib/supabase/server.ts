import { createClient } from "@supabase/supabase-js";

/**
 * Admin client — server-side ONLY.
 * Never import this in client components or expose to the browser.
 * Initialised lazily so missing env vars don't break the build.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars. " +
      "Add them to Vercel → Settings → Environment Variables.",
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}
