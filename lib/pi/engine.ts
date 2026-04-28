import {
  physicalInjuries,
  psychiatricInjuries,
  type PhysicalInjuryKey,
  type PsychiatricInjuryKey,
  type Severity,
  type InjuryType,
} from "./data";
import {
  getLiabilityFactor,
  getRecoveryFactor,
  getPainFactor,
  getImpactFactor,
  getPsychFactor,
  getLocationFactor,
  getCaseStrength,
  type EvidenceStrength,
  type ImpactLevel,
  type CaseStrength,
} from "./factors";

// ─── Input / Output types ─────────────────────────────────────────────────────

export interface InjurySelection {
  type: InjuryType;
  key: PhysicalInjuryKey | PsychiatricInjuryKey;
  severity: Severity;
  recoveryMonths: number;
}

export interface PIInput {
  incidentType: string;
  injuries: InjurySelection[];
  painScale: number;
  impactLevel: ImpactLevel;
  faultPercent: number;
  evidenceStrength: EvidenceStrength;
  medicalCosts: number;
  lostWages: number;
  futureMedical: number;
  futureLoss: number;
  propertyDamage: number;
  /** 0 = unknown / no cap */
  policyLimit: number;
  state: string;
}

export interface CaseResult {
  conservative: number;
  likely: number;
  aggressive: number;
  caseStrength: CaseStrength;
  /** Raw economic sum (before liability adjustment) */
  economic: number;
  /** Liability-adjusted non-economic estimate */
  nonEconomic: number;
  /** Liability multiplier as 0–1 decimal */
  liabilityFactor: number;
  /** Economic damages after liability reduction */
  liabilityAdjustedEconomic: number;
  policyCapped: boolean;
  explanation: string;
  breakdown: {
    medicalCosts: number;
    lostWages: number;
    futureMedical: number;
    futureLoss: number;
    propertyDamage: number;
    painSuffering: number;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInjuryRange(inj: InjurySelection): { min: number; max: number } {
  const source =
    inj.type === "physical"
      ? physicalInjuries[inj.key as PhysicalInjuryKey]
      : psychiatricInjuries[inj.key as PsychiatricInjuryKey];
  if (!source) return { min: 0, max: 0 };
  const range = source.ranges[inj.severity];
  return range ?? { min: 0, max: 0 };
}

function buildExplanation(
  input: PIInput,
  caseStrength: CaseStrength,
  liabilityFactor: number,
  locationFactor: number,
  policyCapped: boolean
): string {
  const count = input.injuries.length;
  const hasPsych = input.injuries.some((i) => i.type === "psychiatric");
  const maxRecovery = input.injuries.reduce(
    (m, i) => Math.max(m, i.recoveryMonths),
    0
  );

  const severityDesc = input.injuries.some((i) => i.severity === "severe")
    ? "severe"
    : input.injuries.some((i) => i.severity === "moderate")
    ? "moderate"
    : "minor";

  const faultDesc =
    input.faultPercent === 0
      ? "no attributed fault"
      : input.faultPercent <= 20
      ? `${input.faultPercent}% attributed fault (low)`
      : input.faultPercent <= 40
      ? `${input.faultPercent}% attributed fault (moderate)`
      : `${input.faultPercent}% attributed fault — significantly reduces claim value`;

  const evidenceDesc: Record<EvidenceStrength, string> = {
    strong: "strong evidence documentation",
    moderate: "moderate evidence",
    weak: "limited evidentiary support",
  };

  const recoveryDesc =
    maxRecovery === 0
      ? "immediate or minimal recovery"
      : maxRecovery <= 3
      ? `a ${maxRecovery}-month recovery period`
      : maxRecovery <= 12
      ? `a ${maxRecovery}-month recovery period`
      : `${maxRecovery}+ months of ongoing recovery`;

  const locationNote =
    locationFactor >= 1.3
      ? "Your jurisdiction is historically associated with above-average jury awards."
      : locationFactor <= 0.9
      ? "Your jurisdiction applies statutory damage caps that may limit certain award categories."
      : "Jurisdiction factors are within the national average range.";

  const policyNote = policyCapped
    ? " Note: The estimated value has been capped at the reported policy limit — your attorney may explore umbrella coverage or other sources."
    : "";

  return [
    `This evaluation covers ${count === 1 ? "one injury" : `${count} injuries`} of ${severityDesc} severity${hasPsych ? ", including a psychiatric component that strengthens the non-economic claim" : ""}.`,
    `With ${faultDesc} and ${evidenceDesc[input.evidenceStrength]}, the effective liability factor is ${Math.round(liabilityFactor * 100)}%.`,
    `${recoveryDesc.charAt(0).toUpperCase() + recoveryDesc.slice(1)} has been incorporated into the non-economic multiplier.`,
    locationNote,
    `Overall case strength is assessed as ${caseStrength}.${policyNote}`,
  ].join(" ");
}

// ─── Main engine ──────────────────────────────────────────────────────────────

export function calculateCaseValue(input: PIInput): CaseResult {
  // 1. Economic damages
  const economic =
    input.medicalCosts +
    input.lostWages +
    input.futureMedical +
    input.futureLoss +
    input.propertyDamage;

  // 2. Injury base ranges
  let baseMin = 0;
  let baseMax = 0;
  const maxRecoveryMonths = input.injuries.reduce(
    (m, i) => Math.max(m, i.recoveryMonths),
    0
  );

  for (const inj of input.injuries) {
    const range = getInjuryRange(inj);
    baseMin += range.min;
    baseMax += range.max;
  }

  // 3. Combined factor
  const recoveryFactor = getRecoveryFactor(maxRecoveryMonths);
  const painFactor = getPainFactor(input.painScale);
  const impactFactor = getImpactFactor(input.impactLevel);
  const hasPhysical = input.injuries.some((i) => i.type === "physical");
  const hasPsychiatric = input.injuries.some((i) => i.type === "psychiatric");
  const psychFactor = getPsychFactor(hasPhysical && hasPsychiatric);
  const locationFactor = getLocationFactor(input.state);

  const combinedFactor =
    recoveryFactor * painFactor * impactFactor * psychFactor * locationFactor;

  // 4. Non-economic damages (pain & suffering, emotional distress)
  const nonEconomicMin = baseMin * combinedFactor;
  const nonEconomicMax = baseMax * combinedFactor;
  const nonEconomicMid = (nonEconomicMin + nonEconomicMax) / 2;

  // 5. Totals pre-liability
  const totalMin = economic + nonEconomicMin;
  const totalMax = economic + nonEconomicMax;
  const totalMid = economic + nonEconomicMid;

  // 6. Liability adjustment
  const liabilityFactor = getLiabilityFactor(
    input.faultPercent,
    input.evidenceStrength
  );

  let conservative = Math.max(0, Math.round(totalMin * liabilityFactor));
  let likely = Math.max(conservative, Math.round(totalMid * liabilityFactor));
  let aggressive = Math.max(likely, Math.round(totalMax * liabilityFactor));

  // 7. Policy cap
  let policyCapped = false;
  if (input.policyLimit > 0 && aggressive > input.policyLimit) {
    policyCapped = true;
    conservative = Math.min(conservative, input.policyLimit);
    likely = Math.min(likely, input.policyLimit);
    aggressive = Math.min(aggressive, input.policyLimit);
  }

  // 8. Supporting output
  const caseStrength = getCaseStrength(
    input.faultPercent,
    input.evidenceStrength
  );
  const nonEconomic = Math.round(nonEconomicMid * liabilityFactor);
  const liabilityAdjustedEconomic = Math.round(economic * liabilityFactor);

  const explanation = buildExplanation(
    input,
    caseStrength,
    liabilityFactor,
    locationFactor,
    policyCapped
  );

  return {
    conservative,
    likely,
    aggressive,
    caseStrength,
    economic,
    nonEconomic,
    liabilityFactor,
    liabilityAdjustedEconomic,
    policyCapped,
    explanation,
    breakdown: {
      medicalCosts: input.medicalCosts,
      lostWages: input.lostWages,
      futureMedical: input.futureMedical,
      futureLoss: input.futureLoss,
      propertyDamage: input.propertyDamage,
      painSuffering: nonEconomic,
    },
  };
}
