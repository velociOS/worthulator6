import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
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

    const { error } = await supabaseAdmin.from("leads").insert({
      calculator_type:   body.calculator_type,
      name:              body.name              ?? null,
      email:             body.email             ?? null,
      phone:             body.phone             ?? null,
      location:          body.location          ?? null,
      address_line:      body.address_line      ?? null,
      timeline:          body.timeline          ?? null,
      estimated_cost:    body.estimated_cost    ?? null,
      inputs:            body.inputs            ?? {},
      results:           body.results           ?? {},
      metadata:          body.metadata          ?? {},
      marketing_consent: body.marketing_consent ?? false,
      lead_score,
      status:            "new",
    });

    if (error) {
      console.error("[/api/leads] Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to save lead" },
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
