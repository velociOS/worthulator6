import type { Severity } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EvidenceStrength = "strong" | "moderate" | "weak";
export type ImpactLevel = "none" | "minor" | "moderate" | "severe";
export type CaseStrength = "Strong" | "Moderate" | "Weak";

// ─── Factor functions ─────────────────────────────────────────────────────────

/**
 * Returns a liability multiplier (0–1.0) based on plaintiff's attributed fault
 * percentage and the strength of available evidence.
 */
export function getLiabilityFactor(
  faultPercent: number,
  evidenceStrength: EvidenceStrength
): number {
  const baseFactor = Math.max(0, (100 - faultPercent) / 100);
  const evidenceMultiplier: Record<EvidenceStrength, number> = {
    strong: 1.0,
    moderate: 0.85,
    weak: 0.65,
  };
  return baseFactor * evidenceMultiplier[evidenceStrength];
}

/**
 * Returns a non-economic damages multiplier based on total recovery duration.
 * Longer recovery = higher compensation potential for pain & suffering.
 */
export function getRecoveryFactor(months: number): number {
  if (months <= 1) return 0.7;
  if (months <= 3) return 0.85;
  if (months <= 6) return 1.0;
  if (months <= 12) return 1.25;
  if (months <= 24) return 1.5;
  return 1.8;
}

/**
 * Returns a pain multiplier based on reported pain scale (0–10).
 */
export function getPainFactor(scale: number): number {
  if (scale <= 2) return 0.5;
  if (scale <= 4) return 0.75;
  if (scale <= 6) return 1.0;
  if (scale <= 8) return 1.35;
  return 1.7;
}

/**
 * Returns a life-impact multiplier.
 */
export function getImpactFactor(level: ImpactLevel): number {
  const map: Record<ImpactLevel, number> = {
    none: 0.75,
    minor: 1.0,
    moderate: 1.35,
    severe: 1.7,
  };
  return map[level];
}

/**
 * Returns a comorbidity uplift when both physical AND psychiatric injuries exist.
 * Juries tend to award more when psychological harm accompanies physical injury.
 */
export function getPsychFactor(hasBothTypes: boolean): number {
  return hasBothTypes ? 1.15 : 1.0;
}

/**
 * Returns a jurisdiction multiplier per US state, reflecting historical jury award
 * tendencies and statutory damage cap environments.
 */
export function getLocationFactor(stateCode: string): number {
  const stateFactors: Record<string, number> = {
    AL: 0.9,  AK: 0.9,  AZ: 1.05, AR: 0.9,  CA: 1.35,
    CO: 0.9,  CT: 1.15, DE: 1.05, DC: 1.45, FL: 1.25,
    GA: 1.05, HI: 1.1,  ID: 0.9,  IL: 1.25, IN: 0.9,
    IA: 0.9,  KS: 0.9,  KY: 0.9,  LA: 0.95, ME: 0.9,
    MD: 0.9,  MA: 1.2,  MI: 0.9,  MN: 1.0,  MS: 0.85,
    MO: 0.9,  MT: 0.85, NE: 0.9,  NV: 1.2,  NH: 0.95,
    NJ: 1.3,  NM: 0.95, NY: 1.4,  NC: 0.95, ND: 0.8,
    OH: 0.95, OK: 0.9,  OR: 1.1,  PA: 1.15, RI: 1.05,
    SC: 0.95, SD: 0.8,  TN: 0.9,  TX: 1.0,  UT: 0.9,
    VT: 0.9,  VA: 0.85, WA: 1.1,  WV: 0.9,  WI: 0.95,
    WY: 0.85,
  };
  return stateFactors[stateCode] ?? 1.0;
}

/**
 * Determines case strength based on liability and evidence quality.
 */
export function getCaseStrength(
  faultPercent: number,
  evidenceStrength: EvidenceStrength
): CaseStrength {
  if (faultPercent <= 20 && evidenceStrength === "strong") return "Strong";
  if (faultPercent >= 50 || evidenceStrength === "weak") return "Weak";
  return "Moderate";
}

/**
 * Returns severity as a display label.
 */
export function getSeverityLabel(severity: Severity): string {
  const map: Record<Severity, string> = {
    minor: "Minor",
    moderate: "Moderate",
    severe: "Severe",
  };
  return map[severity];
}
