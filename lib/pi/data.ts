// ─── Types ───────────────────────────────────────────────────────────────────

export type InjuryType = "physical" | "psychiatric";

export type PhysicalInjuryKey =
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

export type PsychiatricInjuryKey =
  | "anxiety"
  | "ptsd"
  | "depression"
  | "adjustment_disorder";

export type Severity = "minor" | "moderate" | "severe";

export interface CompensationRange {
  min: number;
  max: number;
}

export interface InjuryEntry {
  label: string;
  description: string;
  icon: string;
  availableSeverities: Severity[];
  severityLabels: Partial<Record<Severity, string>>;
  ranges: Partial<Record<Severity, CompensationRange>>;
}

// ─── Physical injury compensation ranges (US statistical averages) ────────────

export const physicalInjuries: Record<PhysicalInjuryKey, InjuryEntry> = {
  whiplash: {
    label: "Whiplash / Neck Injury",
    description: "Soft tissue cervical spine injury",
    icon: "🦴",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "Minor — 1–3 months recovery",
      moderate: "Moderate — 3–12 months recovery",
      severe: "Severe — 12+ months / ongoing",
    },
    ranges: {
      minor: { min: 2_000, max: 10_000 },
      moderate: { min: 10_000, max: 35_000 },
      severe: { min: 35_000, max: 80_000 },
    },
  },
  soft_tissue: {
    label: "Soft Tissue Injury",
    description: "Back, shoulder, knee or general soft tissue damage",
    icon: "💪",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "Minor — brief treatment, full recovery",
      moderate: "Moderate — extended treatment",
      severe: "Severe — surgical / ongoing care",
    },
    ranges: {
      minor: { min: 2_000, max: 8_000 },
      moderate: { min: 8_000, max: 25_000 },
      severe: { min: 25_000, max: 60_000 },
    },
  },
  fracture_single: {
    label: "Bone Fracture (Single)",
    description: "Single bone fracture requiring medical treatment",
    icon: "🩻",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Simple fracture — cast or brace",
      severe: "Complex fracture — surgical repair",
    },
    ranges: {
      moderate: { min: 15_000, max: 40_000 },
      severe: { min: 40_000, max: 80_000 },
    },
  },
  fracture_multiple: {
    label: "Multiple / Complex Fractures",
    description: "Multiple fractures or comminuted fracture pattern",
    icon: "🦾",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Multiple fractures (2–3 bones)",
      severe: "Extensive fractures (4+ or comminuted)",
    },
    ranges: {
      moderate: { min: 30_000, max: 80_000 },
      severe: { min: 80_000, max: 200_000 },
    },
  },
  spinal_disc: {
    label: "Spinal Disc Injury",
    description: "Herniated or bulging disc with nerve compression",
    icon: "⚕️",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Disc herniation — conservative treatment",
      severe: "Disc injury requiring surgery",
    },
    ranges: {
      moderate: { min: 40_000, max: 100_000 },
      severe: { min: 100_000, max: 300_000 },
    },
  },
  spinal_cord: {
    label: "Spinal Cord Injury",
    description: "Partial or complete spinal cord damage",
    icon: "🏥",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Partial injury — some function retained",
      severe: "Complete injury — paralysis",
    },
    ranges: {
      moderate: { min: 200_000, max: 500_000 },
      severe: { min: 500_000, max: 1_500_000 },
    },
  },
  tbi: {
    label: "Traumatic Brain Injury",
    description: "Concussion to severe traumatic brain trauma",
    icon: "🧠",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "Mild concussion — brief symptoms",
      moderate: "Moderate TBI — weeks of symptoms",
      severe: "Severe TBI — permanent effects",
    },
    ranges: {
      minor: { min: 20_000, max: 60_000 },
      moderate: { min: 80_000, max: 300_000 },
      severe: { min: 300_000, max: 1_000_000 },
    },
  },
  internal: {
    label: "Internal Injuries",
    description: "Organ damage or internal bleeding",
    icon: "🫀",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Single organ — treated successfully",
      severe: "Multiple organs or permanent damage",
    },
    ranges: {
      moderate: { min: 30_000, max: 100_000 },
      severe: { min: 100_000, max: 400_000 },
    },
  },
  burns: {
    label: "Burn Injuries",
    description: "Thermal, chemical or electrical burns",
    icon: "🔥",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "First-degree / minor second-degree",
      moderate: "Second-degree — significant area",
      severe: "Third-degree / extensive burns",
    },
    ranges: {
      minor: { min: 5_000, max: 20_000 },
      moderate: { min: 20_000, max: 80_000 },
      severe: { min: 80_000, max: 500_000 },
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
      severe: "Disfiguring or extensive scarring",
    },
    ranges: {
      minor: { min: 5_000, max: 20_000 },
      moderate: { min: 20_000, max: 60_000 },
      severe: { min: 60_000, max: 200_000 },
    },
  },
  amputation: {
    label: "Amputation",
    description: "Loss of digit, extremity or limb",
    icon: "🦿",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Digit(s) or partial extremity",
      severe: "Full limb or multiple amputations",
    },
    ranges: {
      moderate: { min: 50_000, max: 150_000 },
      severe: { min: 250_000, max: 1_000_000 },
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
      moderate: { min: 25_000, max: 80_000 },
      severe: { min: 80_000, max: 250_000 },
    },
  },
};

// ─── Psychiatric injury compensation ranges ───────────────────────────────────

export const psychiatricInjuries: Record<PsychiatricInjuryKey, InjuryEntry> = {
  anxiety: {
    label: "Anxiety / Stress Disorder",
    description: "Clinically diagnosed anxiety related to the incident",
    icon: "😰",
    availableSeverities: ["minor", "moderate", "severe"],
    severityLabels: {
      minor: "Mild — brief, self-resolving",
      moderate: "Moderate — therapy required",
      severe: "Severe — ongoing, impacting daily life",
    },
    ranges: {
      minor: { min: 3_000, max: 15_000 },
      moderate: { min: 15_000, max: 45_000 },
      severe: { min: 45_000, max: 120_000 },
    },
  },
  ptsd: {
    label: "Post-Traumatic Stress Disorder",
    description: "PTSD following traumatic incident",
    icon: "🧩",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Moderate PTSD — partial recovery expected",
      severe: "Severe PTSD — chronic, ongoing",
    },
    ranges: {
      moderate: { min: 20_000, max: 80_000 },
      severe: { min: 80_000, max: 250_000 },
    },
  },
  depression: {
    label: "Clinical Depression",
    description: "Major depressive disorder linked to the incident",
    icon: "😞",
    availableSeverities: ["moderate", "severe"],
    severityLabels: {
      moderate: "Moderate — treatable with support",
      severe: "Severe — chronic, impairs functioning",
    },
    ranges: {
      moderate: { min: 10_000, max: 40_000 },
      severe: { min: 40_000, max: 120_000 },
    },
  },
  adjustment_disorder: {
    label: "Adjustment Disorder",
    description: "Emotional difficulty adjusting following traumatic event",
    icon: "💆",
    availableSeverities: ["minor", "moderate"],
    severityLabels: {
      minor: "Mild — 3–6 months, then resolved",
      moderate: "Significant — 6+ months ongoing",
    },
    ranges: {
      minor: { min: 2_000, max: 10_000 },
      moderate: { min: 10_000, max: 30_000 },
    },
  },
};

// ─── Incident types ───────────────────────────────────────────────────────────

export type IncidentType =
  | "motor_vehicle"
  | "slip_fall"
  | "workplace"
  | "medical_malpractice"
  | "product_liability"
  | "dog_bite"
  | "assault"
  | "premises";

export const incidentTypes: Record<
  IncidentType,
  { label: string; icon: string; description: string }
> = {
  motor_vehicle: {
    label: "Motor Vehicle Accident",
    icon: "🚗",
    description: "Car, truck, motorcycle or pedestrian",
  },
  slip_fall: {
    label: "Slip & Fall",
    icon: "🏚️",
    description: "Premises liability involving a fall",
  },
  workplace: {
    label: "Workplace Injury",
    icon: "🏗️",
    description: "Injury in a work environment",
  },
  medical_malpractice: {
    label: "Medical Malpractice",
    icon: "🩺",
    description: "Negligent medical treatment",
  },
  product_liability: {
    label: "Product Liability",
    icon: "📦",
    description: "Injury from a defective product",
  },
  dog_bite: {
    label: "Dog Bite / Animal Attack",
    icon: "🐕",
    description: "Attack or bite by an animal",
  },
  assault: {
    label: "Assault / Battery",
    icon: "⚖️",
    description: "Intentional harmful contact",
  },
  premises: {
    label: "Premises Liability",
    icon: "🏛️",
    description: "Injury on another's property",
  },
};

// ─── Recovery duration presets ────────────────────────────────────────────────

export interface RecoveryOption {
  label: string;
  months: number;
}

export const recoveryOptions: RecoveryOption[] = [
  { label: "< 1 month", months: 0.5 },
  { label: "1–3 months", months: 2 },
  { label: "3–6 months", months: 4.5 },
  { label: "6–12 months", months: 9 },
  { label: "1–2 years", months: 18 },
  { label: "2+ years / Ongoing", months: 36 },
];

// ─── US States ────────────────────────────────────────────────────────────────

export const US_STATES: { value: string; label: string }[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "Washington D.C." },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];
