import type { UKSeverity } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EvidenceStrength = "strong" | "moderate" | "weak";
export type ImpactLevel      = "none" | "minor" | "moderate" | "severe";
export type CaseStrength     = "Strong" | "Moderate" | "Weak";

// ─── UK Contributory Negligence ───────────────────────────────────────────────
/**
 * UK law does NOT zero out a claim at any fault threshold.
 * Damages are simply reduced proportionally by the claimant's share of fault.
 * (Law Reform (Contributory Negligence) Act 1945)
 */
export function getContributoryNegligenceFactor(faultPercent: number): number {
  return Math.max(0, (100 - faultPercent) / 100);
}

// ─── Evidence quality ─────────────────────────────────────────────────────────
/**
 * Affects where within the general damages range the estimate sits.
 * Strong evidence pushes toward the upper end; weak toward the lower.
 */
export function getEvidenceMultiplier(evidenceStrength: EvidenceStrength): number {
  const map: Record<EvidenceStrength, number> = {
    strong:   1.0,
    moderate: 0.88,
    weak:     0.72,
  };
  return map[evidenceStrength];
}

// ─── Recovery factor ──────────────────────────────────────────────────────────
/**
 * Longer recovery increases the general damages award (loss of amenity, ongoing suffering).
 * Less dominant than the US multiplier model — acts as a modest range adjustment.
 */
export function getRecoveryFactor(months: number): number {
  if (months <= 1)  return 0.80;
  if (months <= 3)  return 0.90;
  if (months <= 6)  return 1.00;
  if (months <= 12) return 1.10;
  if (months <= 24) return 1.20;
  return 1.35;
}

// ─── Pain factor ──────────────────────────────────────────────────────────────
export function getPainFactor(scale: number): number {
  if (scale <= 2) return 0.70;
  if (scale <= 4) return 0.85;
  if (scale <= 6) return 1.00;
  if (scale <= 8) return 1.15;
  return 1.30;
}

// ─── Life-impact factor ───────────────────────────────────────────────────────
export function getImpactFactor(level: ImpactLevel): number {
  const map: Record<ImpactLevel, number> = {
    none:     0.80,
    minor:    1.00,
    moderate: 1.20,
    severe:   1.45,
  };
  return map[level];
}

// ─── Psychiatric comorbidity uplift ───────────────────────────────────────────
/**
 * When physical AND psychiatric injuries coexist, UK courts typically award
 * additional general damages for the psychological component.
 */
export function getPsychFactor(hasBothTypes: boolean): number {
  return hasBothTypes ? 1.10 : 1.00;
}

// ─── UK jurisdiction factor ───────────────────────────────────────────────────
/**
 * The UK is far more uniform than the US. Scotland has a slightly different
 * procedural regime (Court of Session / Sheriff Court). Northern Ireland broadly
 * follows England & Wales principles but historically produces marginally lower awards.
 */
export function getJurisdictionFactor(jurisdiction: string): number {
  const map: Record<string, number> = {
    england_wales:    1.00,
    scotland:         0.95,
    northern_ireland: 0.92,
  };
  return map[jurisdiction] ?? 1.00;
}

// ─── Case strength ────────────────────────────────────────────────────────────
/**
 * In the UK context, "Strong" means good prospects of a favourable outcome;
 * "Weak" means the claim will face significant challenges.
 * (No >50% cutoff — that is a US contributory negligence concept.)
 */
export function getCaseStrength(
  faultPercent: number,
  evidenceStrength: EvidenceStrength,
): CaseStrength {
  if (faultPercent <= 20 && evidenceStrength === "strong") return "Strong";
  if (faultPercent >= 60 || evidenceStrength === "weak")   return "Weak";
  return "Moderate";
}

// ─── Severity display label ───────────────────────────────────────────────────
export function getSeverityLabel(severity: UKSeverity): string {
  const map: Record<UKSeverity, string> = {
    minor:        "Minor",
    moderate:     "Moderate",
    severe:       "Severe",
    catastrophic: "Catastrophic",
  };
  return map[severity];
}
