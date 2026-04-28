import {
  physicalInjuries,
  psychiatricInjuries,
  type UKPhysicalInjuryKey,
  type UKPsychiatricInjuryKey,
  type UKSeverity,
  type InjuryType,
} from "./data";
import {
  getContributoryNegligenceFactor,
  getEvidenceMultiplier,
  getRecoveryFactor,
  getPainFactor,
  getImpactFactor,
  getPsychFactor,
  getJurisdictionFactor,
  getCaseStrength,
  type EvidenceStrength,
  type ImpactLevel,
  type CaseStrength,
} from "./factors";

// ─── Input / Output types ─────────────────────────────────────────────────────

export interface UKInjurySelection {
  type: InjuryType;
  key: UKPhysicalInjuryKey | UKPsychiatricInjuryKey;
  severity: UKSeverity;
  recoveryMonths: number;
}

export interface UKPIInput {
  incidentType: string;
  injuries: UKInjurySelection[];
  painScale: number;
  impactLevel: ImpactLevel;
  faultPercent: number;
  evidenceStrength: EvidenceStrength;
  medicalCosts: number;
  lostWages: number;
  futureMedical: number;
  futureLoss: number;
  propertyDamage: number;
  jurisdiction: string;
}

export interface UKCaseResult {
  conservative: number;
  likely: number;
  aggressive: number;
  caseStrength: CaseStrength;
  /** General damages (PSLA) mid estimate after contributory negligence */
  generalDamages: number;
  /** Raw special damages total (before fault reduction) */
  specialDamagesRaw: number;
  /** Special damages after contributory negligence reduction */
  specialDamagesAdj: number;
  /** Contributory negligence multiplier (0–1) */
  faultFactor: number;
  explanation: string;
  breakdown: {
    medicalCosts:    number;
    lostWages:       number;
    futureMedical:   number;
    futureLoss:      number;
    propertyDamage:  number;
    /** General damages (pain, suffering & loss of amenity) — mid figure */
    generalDamages:  number;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInjuryRange(inj: UKInjurySelection): { min: number; max: number } {
  const source =
    inj.type === "physical"
      ? physicalInjuries[inj.key as UKPhysicalInjuryKey]
      : psychiatricInjuries[inj.key as UKPsychiatricInjuryKey];
  if (!source) return { min: 0, max: 0 };
  const range = source.ranges[inj.severity];
  return range ?? { min: 0, max: 0 };
}

function buildExplanation(
  input: UKPIInput,
  caseStrength: CaseStrength,
  faultFactor: number,
  jurisdictionFactor: number,
): string {
  const count      = input.injuries.length;
  const hasPsych   = input.injuries.some((i) => i.type === "psychiatric");
  const maxRecovery = input.injuries.reduce((m, i) => Math.max(m, i.recoveryMonths), 0);

  const severityDesc = input.injuries.some((i) => i.severity === "catastrophic")
    ? "catastrophic"
    : input.injuries.some((i) => i.severity === "severe")
    ? "severe"
    : input.injuries.some((i) => i.severity === "moderate")
    ? "moderate"
    : "minor";

  const faultDesc =
    input.faultPercent === 0
      ? "no attributed contributory negligence"
      : input.faultPercent <= 20
      ? `${input.faultPercent}% contributory negligence (low)`
      : input.faultPercent <= 40
      ? `${input.faultPercent}% contributory negligence (moderate) — payout reduced accordingly`
      : `${input.faultPercent}% contributory negligence — significantly reduces your compensation`;

  const evidenceDesc: Record<EvidenceStrength, string> = {
    strong:   "strong supporting evidence",
    moderate: "moderate evidence",
    weak:     "limited evidentiary support",
  };

  const recoveryDesc =
    maxRecovery === 0
      ? "minimal or immediate recovery"
      : maxRecovery <= 3
      ? `a ${maxRecovery}-month recovery period`
      : maxRecovery <= 12
      ? `a ${maxRecovery}-month recovery period`
      : `${maxRecovery}+ months of ongoing recovery`;

  const jurisdictionNote =
    jurisdictionFactor >= 1.0
      ? "England & Wales courts provide the baseline for these estimates."
      : jurisdictionFactor <= 0.93
      ? "Northern Ireland compensation figures are applied, which are broadly consistent with — but marginally below — England & Wales levels."
      : "Scottish court figures have been applied, which may differ slightly from England & Wales due to procedural differences.";

  return [
    `This estimate covers ${count === 1 ? "one injury" : `${count} injuries`} of ${severityDesc} severity${hasPsych ? ", including a psychological component which strengthens the general damages element of your claim" : ""}.`,
    `With ${faultDesc} and ${evidenceDesc[input.evidenceStrength]}, the effective contributory negligence factor is ${Math.round(faultFactor * 100)}%.`,
    `${recoveryDesc.charAt(0).toUpperCase() + recoveryDesc.slice(1)} has been factored into the general damages calculation.`,
    jurisdictionNote,
    `Overall prospects are assessed as ${caseStrength}. These figures are based on approximate Judicial College Guidelines ranges and are for educational purposes only.`,
  ].join(" ");
}

// ─── Main calculation engine ──────────────────────────────────────────────────
/**
 * UK formula:
 *   Total = (generalDamages + specialDamages) × faultFactor
 *
 * General damages = injury severity ranges from Judicial College Guidelines,
 *   adjusted by recovery, pain, impact, evidence quality and jurisdiction.
 *
 * Special damages = documented / projected financial losses.
 *
 * No multiplier model. No strict fault cutoff (UK contributory negligence).
 */
export function calculateUKCaseValue(input: UKPIInput): UKCaseResult {
  // ── 1. Special damages (quantifiable financial losses) ──────────────────────
  const specialDamagesRaw =
    input.medicalCosts +
    input.lostWages +
    input.futureMedical +
    input.futureLoss +
    input.propertyDamage;

  // ── 2. General damages base ranges (summed across all injuries) ─────────────
  let baseMin = 0;
  let baseMax = 0;
  const maxRecoveryMonths = input.injuries.reduce(
    (m, i) => Math.max(m, i.recoveryMonths),
    0,
  );

  for (const inj of input.injuries) {
    const range = getInjuryRange(inj);
    baseMin += range.min;
    baseMax += range.max;
  }

  // ── 3. Combined modifier for general damages ────────────────────────────────
  const recoveryFactor     = getRecoveryFactor(maxRecoveryMonths);
  const painFactor         = getPainFactor(input.painScale);
  const impactFactor       = getImpactFactor(input.impactLevel);
  const hasPhysical        = input.injuries.some((i) => i.type === "physical");
  const hasPsychiatric     = input.injuries.some((i) => i.type === "psychiatric");
  const psychFactor        = getPsychFactor(hasPhysical && hasPsychiatric);
  const jurisdictionFactor = getJurisdictionFactor(input.jurisdiction);
  const evidenceMultiplier = getEvidenceMultiplier(input.evidenceStrength);

  const combinedFactor =
    recoveryFactor * painFactor * impactFactor * psychFactor * jurisdictionFactor;

  // ── 4. General damages range (adjusted) ────────────────────────────────────
  const generalMin = baseMin * combinedFactor * evidenceMultiplier;
  const generalMax = baseMax * combinedFactor * evidenceMultiplier;
  const generalMid = (generalMin + generalMax) / 2;

  // ── 5. Contributory negligence (UK — no threshold cutoff) ───────────────────
  const faultFactor = getContributoryNegligenceFactor(input.faultPercent);

  // ── 6. Three compensation tiers ─────────────────────────────────────────────
  let conservative = Math.max(0, Math.round((generalMin + specialDamagesRaw) * faultFactor));
  let likely       = Math.max(conservative, Math.round((generalMid + specialDamagesRaw) * faultFactor));
  let aggressive   = Math.max(likely, Math.round((generalMax + specialDamagesRaw) * faultFactor));

  // ── 7. Supporting output ────────────────────────────────────────────────────
  const caseStrength       = getCaseStrength(input.faultPercent, input.evidenceStrength);
  const generalDamages     = Math.round(generalMid * faultFactor);
  const specialDamagesAdj  = Math.round(specialDamagesRaw * faultFactor);

  const explanation = buildExplanation(
    input,
    caseStrength,
    faultFactor,
    jurisdictionFactor,
  );

  return {
    conservative,
    likely,
    aggressive,
    caseStrength,
    generalDamages,
    specialDamagesRaw,
    specialDamagesAdj,
    faultFactor,
    explanation,
    breakdown: {
      medicalCosts:   input.medicalCosts,
      lostWages:      input.lostWages,
      futureMedical:  input.futureMedical,
      futureLoss:     input.futureLoss,
      propertyDamage: input.propertyDamage,
      generalDamages: Math.round(generalMid),
    },
  };
}
