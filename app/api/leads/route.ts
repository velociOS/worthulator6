import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { calculateLeadScore } from "@/lib/leads";
import type { LeadPayload } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();

    // ── Validation ──────────────────────────────────────────────────────────

    if (!body.calculator_type || typeof body.calculator_type !== "string") {
      return NextResponse.json(
        { error: "calculator_type is required" },
        { status: 400 },
      );
    }

    if (body.email !== undefined && body.email !== "") {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
      if (!emailOk) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
      }
    }

    if (
      body.estimated_cost !== undefined &&
      (typeof body.estimated_cost !== "number" || body.estimated_cost < 0)
    ) {
      return NextResponse.json(
        { error: "estimated_cost must be a non-negative number" },
        { status: 400 },
      );
    }

    // ── Persist ─────────────────────────────────────────────────────────────

    const lead_score = calculateLeadScore({
      timeline:       body.timeline,
      estimated_cost: body.estimated_cost,
      address_line:   body.address_line,
      inputs:         body.inputs,
      email:          body.email,
      phone:          body.phone,
    });

    // Build insert payload — omit keys that are null/undefined so missing
    // optional columns don't cause a Supabase error
    const insertPayload: Record<string, unknown> = {
      calculator_type:   body.calculator_type,
      inputs:            body.inputs            ?? {},
      results:           body.results           ?? {},
      metadata:          body.metadata          ?? {},
      marketing_consent: body.marketing_consent ?? false,
      lead_score,
      status:            "new",
    };

    if (body.name          != null) insertPayload.name          = body.name;
    if (body.email         != null) insertPayload.email         = body.email;
    if (body.phone         != null) insertPayload.phone         = body.phone;
    if (body.location      != null) insertPayload.location      = body.location;
    if (body.address_line  != null) insertPayload.address_line  = body.address_line;
    if (body.timeline      != null) insertPayload.timeline      = body.timeline;
    if (body.estimated_cost != null) insertPayload.estimated_cost = body.estimated_cost;

    const { error } = await getSupabaseAdmin().from("leads").insert(insertPayload);

    if (error) {
      console.error("[/api/leads] Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: error.message ?? "Failed to save lead" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/leads] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
