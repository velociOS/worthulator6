// ── Shared lead types ────────────────────────────────────────────────────────
// Used by both the API route (server) and client-side saveLead helper.

export interface LeadLocation {
  postcode: string;
  city?: string;
  region?: string;
  country?: string;
}

export interface LeadPayload {
  /** Identifies which calculator generated this lead, e.g. "roof-replacement-cost" */
  calculator_type: string;
  /** Contact details */
  name?: string;
  email?: string;
  phone?: string;
  /** Structured location object */
  location?: LeadLocation;
  /** Street address line (separate from postcode/location) */
  address_line?: string;
  /** Timeline for the project (e.g. "urgent", "within-6-months", "researching") */
  timeline?: string;
  /** Primary numeric result shown to the user */
  estimated_cost: number;
  /** Raw calculator inputs as the user set them */
  inputs: Record<string, unknown>;
  /** Full calculation results returned by the engine */
  results: Record<string, unknown>;
  /** Browser / page context — added automatically by saveLead() */
  metadata?: Record<string, unknown>;
  /** GDPR marketing consent — defaults to false */
  marketing_consent?: boolean;
}

export interface LeadResponse {
  success: boolean;
  error?: string;
}

// ── Lead scoring ─────────────────────────────────────────────────────────────

export function calculateLeadScore({
  timeline,
  estimated_cost,
  address_line,
  inputs,
  email,
  phone,
}: {
  timeline?: string;
  estimated_cost?: number;
  address_line?: string;
  inputs?: Record<string, unknown>;
  email?: string;
  phone?: string;
}): number {
  let score = 0;
  if (email && email.trim().length > 0)                  score += 30; // critical — no contact without it
  if (phone && phone.trim().length > 0)                  score += 20; // high value — direct contact
  if (timeline === "urgent")                              score += 20;
  if ((estimated_cost ?? 0) > 8000)                      score += 15;
  if (address_line && address_line.trim().length > 0)    score += 10;
  if ((inputs?.propertyType as string) === "detached")   score += 8;
  if ((inputs?.roofSize as number) > 1200)               score += 7;
  if ((inputs?.propertyType as string) === "terraced")   score += 5;
  return Math.min(score, 100);
}

// ── Client-side helper ───────────────────────────────────────────────────────

/**
 * POSTs a lead to /api/leads.
 * Safe to call from any client component — does NOT import Supabase.
 */
export async function saveLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        metadata: {
          url: typeof window !== "undefined" ? window.location.href : undefined,
          referrer: typeof document !== "undefined" ? document.referrer : undefined,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          timestamp: new Date().toISOString(),
          ...payload.metadata,
        },
      }),
    });

    const data: LeadResponse = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error ?? "Unknown error" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error — please try again." };
  }
}
