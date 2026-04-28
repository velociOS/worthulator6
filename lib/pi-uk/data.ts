// ─── Types ───────────────────────────────────────────────────────────────────

export type InjuryType = "physical" | "psychiatric";

export type UKPhysicalInjuryKey =
  | "whiplash"
  | "soft_tissue"
  | "fracture_single"
  | "fracture_multiple"
  | "spinal_disc"
  | "spinal_cord"
  | "tbi"
  | "internal"
  | "burns"
  | "facial_scarring"
  | "amputation"
  | "nerve_damage";

export type UKPsychiatricInjuryKey =
  | "anxiety"
  | "ptsd"
  | "depression"
  | "adjustment_disorder";

// UK adds "catastrophic" as a severity tier above "severe"
export type UKSeverity = "minor" | "moderate" | "severe" | "catastrophic";

export interface CompensationRange {
  min: number;
  max: number;
}

export interface UKInjuryEntry {
  label: string;
  description: string;
  icon: string;
  availableSeverities: UKSeverity[];
  severityLabels: Partial<Record<UKSeverity, string>>;
  ranges: Partial<Record<UKSeverity, CompensationRange>>;
}

// ─── Physical injury ranges (approximate Judicial College Guidelines) ─────────
// Values are in GBP. Based on JCG 16th edition approximations.

export const physicalInjuries: Record<UKPhysicalInjuryKey, UKInjuryEntry> = {
  whiplash: {
    label: "Whiplash / Neck Injury",
    description: "Soft tissue cervical spine injury",
    icon: "🦴",
    availableSeverities: ["minor", "moderate", "severe", "catastrophic"],
    severityLabels: {
      minor: "Minor — full recovery within 2 years",
      moderate: "Moderate — symptoms persisting beyond 2 years",
      severe: "Severe — permanent or significant disability",
      catastrophic: "Catastrophic — severe neck fracture / paralysis",
    },
    ranges: {
      minor:        { min: 2_450,   max: 7_410 },
      moderate:     { min: 7_410,   max: 36_120 },
      severe:       { min: 36_120,  max: 139_210 },
      catastrophic: { min: 139_210, max: 250_000 },
    },
  },
  soft_tissue: {
    label: "Soft Tissue Injury",
    description: "Back, shoulder, knee or general soft tissue damage",
    icon: "💪",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "Minor — brief treatment, full recovery",
      moderate: "Moderate — extended treatment required",
      severe: "Severe — surgical or ongoing care",
    },
    ranges: {
      minor:    { min: 2_000,  max: 7_500 },
      moderate: { min: 7_500,  max: 25_000 },
      severe:   { min: 25_000, max: 75_000 },
    },
  },
  fracture_single: {
    label: "Bone Fracture (Single)",
    description: "Single bone fracture requiring medical treatment",
    icon: "🩻",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Simple fracture — cast or brace, good recovery",
      severe: "Complex fracture — surgical repair required",
    },
    ranges: {
      moderate: { min: 8_000,  max: 30_000 },
      severe:   { min: 30_000, max: 100_000 },
    },
  },
  fracture_multiple: {
    label: "Multiple / Complex Fractures",
    description: "Multiple fractures or complex fracture patterns",
    icon: "🦾",
    availableSeverities: ["moderate", "severe", "catastrophic"],
    severityLabels: {
      moderate:     "Multiple fractures (2–3 bones)",
      severe:       "Extensive fractures (4+ bones or comminuted)",
      catastrophic: "Catastrophic — pelvis, femur or multiple major fractures",
    },
    ranges: {
      moderate:     { min: 25_000, max: 70_000 },
      severe:       { min: 70_000, max: 200_000 },
      catastrophic: { min: 200_000, max: 400_000 },
    },
  },
  spinal_disc: {
    label: "Spinal Disc Injury",
    description: "Herniated or bulging disc with nerve compression",
    icon: "⚕️",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Disc herniation — conservative treatment",
      severe: "Disc injury requiring surgical intervention",
    },
    ranges: {
      moderate: { min: 25_000, max: 75_000 },
      severe:   { min: 75_000, max: 200_000 },
    },
  },
  spinal_cord: {
    label: "Spinal Cord Injury",
    description: "Partial or complete spinal cord damage",
    icon: "🏥",
    availableSeverities: ["severe", "catastrophic"],
    severityLabels: {
      severe:       "Partial injury — some function retained",
      catastrophic: "Complete injury — paraplegia or tetraplegia",
    },
    ranges: {
      severe:       { min: 150_000, max: 400_000 },
      catastrophic: { min: 400_000, max: 1_000_000 },
    },
  },
  tbi: {
    label: "Brain Injury",
    description: "Concussion to severe traumatic brain injury",
    icon: "🧠",
    availableSeverities: ["minor", "moderate", "severe", "catastrophic"],
    severityLabels: {
      minor:        "Minor — brief symptoms, full or near-full recovery",
      moderate:     "Moderate — weeks of significant symptoms",
      severe:       "Severe TBI — permanent effects on cognition or function",
      catastrophic: "Catastrophic — profound disability or persistent vegetative state",
    },
    ranges: {
      minor:        { min: 12_000,  max: 48_000 },
      moderate:     { min: 48_000,  max: 200_000 },
      severe:       { min: 200_000, max: 550_000 },
      catastrophic: { min: 550_000, max: 1_200_000 },
    },
  },
  internal: {
    label: "Internal Injuries",
    description: "Organ damage or internal bleeding",
    icon: "🫀",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Single organ — successfully treated",
      severe: "Multiple organs or permanent damage",
    },
    ranges: {
      moderate: { min: 20_000,  max: 60_000 },
      severe:   { min: 60_000,  max: 300_000 },
    },
  },
  burns: {
    label: "Burn Injuries",
    description: "Thermal, chemical or electrical burns",
    icon: "🔥",
    availableSeverities: ["minor", "moderate", "severe", "catastrophic"],
    severityLabels: {
      minor:        "Minor — superficial, limited area",
      moderate:     "Moderate — significant area, scarring likely",
      severe:       "Severe — extensive burns, surgical treatment",
      catastrophic: "Catastrophic — life-threatening, major reconstruction",
    },
    ranges: {
      minor:        { min: 3_000,   max: 12_000 },
      moderate:     { min: 12_000,  max: 50_000 },
      severe:       { min: 50_000,  max: 175_000 },
      catastrophic: { min: 175_000, max: 400_000 },
    },
  },
  facial_scarring: {
    label: "Facial / Permanent Scarring",
    description: "Visible scarring, disfigurement or cosmetic damage",
    icon: "🩹",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "Minor — small area, partially concealed",
      moderate: "Noticeable permanent scarring",
      severe: "Disfiguring or very extensive scarring",
    },
    ranges: {
      minor:    { min: 2_000,  max: 12_500 },
      moderate: { min: 12_500, max: 40_000 },
      severe:   { min: 40_000, max: 100_000 },
    },
  },
  amputation: {
    label: "Amputation",
    description: "Loss of digit, extremity or limb",
    icon: "🦿",
    availableSeverities: ["moderate", "severe", "catastrophic"],
    severityLabels: {
      moderate:     "Digit(s) or partial extremity",
      severe:       "Single limb amputation",
      catastrophic: "Multiple limbs or bilateral amputations",
    },
    ranges: {
      moderate:     { min: 30_000,  max: 100_000 },
      severe:       { min: 150_000, max: 600_000 },
      catastrophic: { min: 600_000, max: 1_200_000 },
    },
  },
  nerve_damage: {
    label: "Nerve Damage",
    description: "Peripheral nerve injury causing pain or functional loss",
    icon: "⚡",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Partial nerve damage — treatable",
      severe: "Permanent nerve damage",
    },
    ranges: {
      moderate: { min: 18_000, max: 55_000 },
      severe:   { min: 55_000, max: 175_000 },
    },
  },
};

// ─── Psychiatric injury ranges ────────────────────────────────────────────────

export const psychiatricInjuries: Record<UKPsychiatricInjuryKey, UKInjuryEntry> = {
  anxiety: {
    label: "Anxiety / Stress Disorder",
    description: "Clinically diagnosed anxiety related to the incident",
    icon: "😰",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "Mild — brief, self-resolving",
      moderate: "Moderate — therapy required",
      severe: "Severe — ongoing, significantly impacting daily life",
    },
    ranges: {
      minor:    { min: 1_500,  max: 8_000 },
      moderate: { min: 8_000,  max: 30_000 },
      severe:   { min: 30_000, max: 85_000 },
    },
  },
  ptsd: {
    label: "Post-Traumatic Stress Disorder (PTSD)",
    description: "PTSD following a traumatic incident",
    icon: "🧩",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Moderate — partial recovery expected",
      severe: "Severe — chronic, largely permanent",
    },
    ranges: {
      moderate: { min: 12_500, max: 50_000 },
      severe:   { min: 50_000, max: 175_000 },
    },
  },
  depression: {
    label: "Clinical Depression",
    description: "Major depressive disorder linked to the incident",
    icon: "😞",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Moderate — treatable with support",
      severe: "Severe — chronic, significantly impairs functioning",
    },
    ranges: {
      moderate: { min: 7_000,  max: 30_000 },
      severe:   { min: 30_000, max: 85_000 },
    },
  },
  adjustment_disorder: {
    label: "Adjustment Disorder",
    description: "Emotional difficulty adjusting following a traumatic event",
    icon: "💆",
    availableSeverities: ["minor", "moderate"],
    severityLabels: {
      minor: "Mild — 3–6 months, then resolved",
      moderate: "Significant — 6+ months ongoing",
    },
    ranges: {
      minor:    { min: 1_000, max: 7_000 },
      moderate: { min: 7_000, max: 22_000 },
    },
  },
};

// ─── Incident types (UK terminology) ─────────────────────────────────────────

export type UKIncidentType =
  | "road_traffic"
  | "slip_fall"
  | "workplace"
  | "clinical_negligence"
  | "product_liability"
  | "animal_attack"
  | "assault"
  | "public_liability";

export const incidentTypes: Record<
  UKIncidentType,
  { label: string; icon: string; description: string }
> = {
  road_traffic: {
    label: "Road Traffic Accident",
    icon: "🚗",
    description: "Car, van, motorcycle or pedestrian",
  },
  slip_fall: {
    label: "Slip, Trip or Fall",
    icon: "🏚️",
    description: "Premises liability involving a fall",
  },
  workplace: {
    label: "Workplace Injury",
    icon: "🏗️",
    description: "Injury in a work environment",
  },
  clinical_negligence: {
    label: "Clinical Negligence",
    icon: "🩺",
    description: "Negligent medical or clinical treatment",
  },
  product_liability: {
    label: "Defective Product",
    icon: "📦",
    description: "Injury caused by a defective product",
  },
  animal_attack: {
    label: "Animal Attack",
    icon: "🐕",
    description: "Bite or attack by an animal",
  },
  assault: {
    label: "Assault / Battery",
    icon: "⚖️",
    description: "Intentional harmful contact",
  },
  public_liability: {
    label: "Public Liability",
    icon: "🏛️",
    description: "Injury on another's property or in a public space",
  },
};

// ─── Recovery duration presets ────────────────────────────────────────────────

export interface RecoveryOption {
  label: string;
  months: number;
}

export const recoveryOptions: RecoveryOption[] = [
  { label: "< 1 month",          months: 0.5 },
  { label: "1–3 months",         months: 2 },
  { label: "3–6 months",         months: 4.5 },
  { label: "6–12 months",        months: 9 },
  { label: "1–2 years",          months: 18 },
  { label: "2+ years / Ongoing", months: 36 },
];

// ─── UK Jurisdictions ─────────────────────────────────────────────────────────

export type UKJurisdiction =
  | "england_wales"
  | "scotland"
  | "northern_ireland";

export const UK_JURISDICTIONS: { value: UKJurisdiction; label: string }[] = [
  { value: "england_wales",    label: "England & Wales" },
  { value: "scotland",         label: "Scotland" },
  { value: "northern_ireland", label: "Northern Ireland" },
];
