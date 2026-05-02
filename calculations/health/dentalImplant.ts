// ── Dental Implant Cost Engine ────────────────────────────────────────────────

export type TreatmentType  = "single" | "multiple" | "full-mouth" | "all-on-4";
export type ImplantQuality = "budget" | "standard" | "premium";
export type ClinicType     = "budget" | "private" | "specialist";
export type BoneGraft      = "yes" | "no" | "unsure";
export type Country        =
  | "us" | "uk" | "au" | "ca" | "ie"
  | "de" | "fr" | "es" | "mx" | "th"
  | "in" | "pl" | "ro" | "other";

export interface DentalImplantInputs {
  treatmentType:  TreatmentType;
  toothCount:     number;        // 1–14, relevant for "multiple"
  quality:        ImplantQuality;
  clinicType:     ClinicType;
  boneGraft:      BoneGraft;
  country:        Country;
}

export interface DentalImplantResult {
  minCost:       number;
  maxCost:       number;
  avgCost:       number;
  costPerTooth:  number;
  monthlyEst:    number;  // avgCost / 36
  breakdown: {
    implants:   number;
    crowns:     number;
    surgery:    number;
    additional: number;
  };
}

// ── Base cost per treatment (US, private clinic, standard quality, no graft) ──
// [min, max] in USD
const BASE_RANGES: Record<TreatmentType, [number, number]> = {
  single:       [2_200, 5_000],
  multiple:     [2_000, 4_800],   // per-tooth — multiplied by count below
  "full-mouth": [22_000, 60_000],
  "all-on-4":   [16_000, 40_000], // per-arch; full mouth = ×2
};

// ── Quality multipliers ───────────────────────────────────────────────────────
const QUALITY_MULT: Record<ImplantQuality, number> = {
  budget:   0.68,
  standard: 1.00,
  premium:  1.45,
};

// ── Clinic type multipliers ───────────────────────────────────────────────────
const CLINIC_MULT: Record<ClinicType, number> = {
  budget:     0.72,
  private:    1.00,
  specialist: 1.32,
};

// ── Country multipliers (vs US baseline) ─────────────────────────────────────
export const COUNTRY_MULT: Record<Country, number> = {
  us:    1.00,
  uk:    0.82,
  au:    0.88,
  ca:    0.91,
  ie:    0.86,
  de:    0.75,
  fr:    0.78,
  es:    0.62,
  mx:    0.28,
  th:    0.22,
  in:    0.18,
  pl:    0.32,
  ro:    0.28,
  other: 0.70,
};

// ── Bone graft additions (USD, before multipliers) ───────────────────────────
const GRAFT_ADD: Record<TreatmentType, Record<BoneGraft, [number, number]>> = {
  single:       { yes: [800, 1_800],   no: [0, 0],    unsure: [400, 900]   },
  multiple:     { yes: [600, 1_400],   no: [0, 0],    unsure: [300, 700]   }, // per tooth
  "full-mouth": { yes: [3_000, 8_000], no: [0, 0],    unsure: [1_500, 4_000] },
  "all-on-4":   { yes: [2_000, 5_000], no: [0, 0],    unsure: [1_000, 2_500] },
};

// ── Tooth count volume discount ───────────────────────────────────────────────
function toothDiscount(count: number): number {
  if (count <= 2)  return 0.00;
  if (count <= 4)  return 0.05;
  if (count <= 6)  return 0.09;
  return 0.13;
}

// ── Main function ─────────────────────────────────────────────────────────────
export function calculateDentalImplantCost(
  inputs: DentalImplantInputs,
): DentalImplantResult {
  const { treatmentType, toothCount, quality, clinicType, boneGraft, country } = inputs;

  const [baseMin, baseMax] = BASE_RANGES[treatmentType];
  const qMult  = QUALITY_MULT[quality];
  const cMult  = CLINIC_MULT[clinicType];
  const locMult = COUNTRY_MULT[country];

  // Core treatment cost
  let min: number;
  let max: number;

  if (treatmentType === "multiple") {
    const count    = Math.max(2, Math.min(14, toothCount));
    const discount = toothDiscount(count);
    min = Math.round(baseMin * count * (1 - discount));
    max = Math.round(baseMax * count * (1 - discount));
  } else {
    min = baseMin;
    max = baseMax;
  }

  // Bone graft addition (applied before quality/clinic/location multipliers)
  const [graftMin, graftMax] = GRAFT_ADD[treatmentType][boneGraft];

  // Additional for multiple: graft per-tooth basis
  const graftMinTotal = treatmentType === "multiple"
    ? graftMin * Math.max(2, Math.min(14, toothCount))
    : graftMin;
  const graftMaxTotal = treatmentType === "multiple"
    ? graftMax * Math.max(2, Math.min(14, toothCount))
    : graftMax;

  min += graftMinTotal;
  max += graftMaxTotal;

  // Apply multipliers
  const totalMult = qMult * cMult * locMult;

  const finalMin = Math.round(min * totalMult / 100) * 100;
  const finalMax = Math.round(max * totalMult / 100) * 100;
  const finalAvg = Math.round((finalMin + finalMax) / 2 / 50) * 50;

  const effectiveTeeth =
    treatmentType === "single"       ? 1                              :
    treatmentType === "multiple"     ? Math.max(2, toothCount)        :
    treatmentType === "full-mouth"   ? 14                             :
    4; // all-on-4 per arch; conceptually 4 implants support 12+ teeth

  const costPerTooth = Math.round(finalAvg / effectiveTeeth / 50) * 50;
  const monthlyEst   = Math.round(finalAvg / 36 / 10) * 10;

  // Breakdown percentages — graft shifts weight to "additional"
  const graftPct = boneGraft === "yes" ? 0.15 : boneGraft === "unsure" ? 0.08 : 0;
  const base = 1 - graftPct;
  const breakdown = {
    implants:   Math.round(finalAvg * base * 0.38),
    crowns:     Math.round(finalAvg * base * 0.30),
    surgery:    Math.round(finalAvg * base * 0.22),
    additional: Math.round(finalAvg * (base * 0.10 + graftPct)),
  };

  // Normalise rounding drift
  const sum = breakdown.implants + breakdown.crowns + breakdown.surgery + breakdown.additional;
  breakdown.additional += finalAvg - sum;

  return { minCost: finalMin, maxCost: finalMax, avgCost: finalAvg, costPerTooth, monthlyEst, breakdown };
}

// ── Labels ────────────────────────────────────────────────────────────────────
export const TREATMENT_LABELS: Record<TreatmentType, string> = {
  single:       "Single Tooth",
  multiple:     "Multiple Teeth",
  "full-mouth": "Full Mouth",
  "all-on-4":   "All-on-4",
};

export const COUNTRY_LABELS: Record<Country, string> = {
  us:    "United States",
  uk:    "United Kingdom",
  au:    "Australia",
  ca:    "Canada",
  ie:    "Ireland",
  de:    "Germany",
  fr:    "France",
  es:    "Spain",
  mx:    "Mexico",
  th:    "Thailand",
  in:    "India",
  pl:    "Poland",
  ro:    "Romania",
  other: "Other",
};
