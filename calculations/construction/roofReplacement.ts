// ── Roof Replacement Cost Engine ─────────────────────────────────────────────

export type Material       = "asphalt" | "metal" | "tile" | "flat";
export type PropertyType   = "bungalow" | "terraced" | "semi-detached" | "detached" | "commercial";
export type Condition      = "repairable" | "worn" | "severe";
export type Complexity     = "low" | "medium" | "high";
export type LocationCost   = "low" | "average" | "high";
export type Urgency        = "not-urgent" | "within-6-months" | "urgent";

export interface RoofInputs {
  roofSize:     number;       // sq ft
  propertyType: PropertyType;
  material:     Material;
  condition:    Condition;
  complexity:   Complexity;
  locationCost: LocationCost;
  urgency:      Urgency;
}

export interface RoofResult {
  minCost:     number;
  maxCost:     number;
  avgCost:     number;
  monthlyEst:  number;         // avgCost / 36
  /** Approximate split for chart: materials ~40%, labour ~45%, other ~15% */
  breakdown: {
    materials: number;
    labour:    number;
    other:     number;
  };
}

// Base cost per sq ft [min, max]
const MATERIAL_RANGES: Record<Material, [number, number]> = {
  asphalt: [4,   7],
  metal:   [8,  14],
  tile:    [10, 20],
  flat:    [5,  10],
};

const PROPERTY_TYPE_MULT: Record<PropertyType, number> = {
  bungalow:       0.85,  // single storey, simpler pitch
  terraced:       0.90,  // smaller footprint, party walls
  "semi-detached": 1.00,  // baseline
  detached:       1.15,  // larger roof, more complexity
  commercial:     1.35,  // flat/complex, safety regulations
};

const COMPLEXITY_MULT: Record<Complexity, number> = {
  low:    1.0,
  medium: 1.2,
  high:   1.4,
};

const LOCATION_MULT: Record<LocationCost, number> = {
  low:     0.9,
  average: 1.0,
  high:    1.25,
};

const CONDITION_MULT: Record<Condition, number> = {
  repairable: 0.6,
  worn:       1.0,
  severe:     1.3,
};

const URGENCY_MULT: Record<Urgency, number> = {
  "not-urgent":        1.0,
  "within-6-months":   1.1,
  urgent:              1.2,
};

export function calculateRoofCost(inputs: RoofInputs): RoofResult {
  const { roofSize, propertyType, material, condition, complexity, locationCost, urgency } = inputs;

  const [baseMin, baseMax] = MATERIAL_RANGES[material];
  const propM  = PROPERTY_TYPE_MULT[propertyType];
  const condM  = CONDITION_MULT[condition];
  const compM  = COMPLEXITY_MULT[complexity];
  const locM   = LOCATION_MULT[locationCost];
  const urgM   = URGENCY_MULT[urgency];

  const totalMult = propM * condM * compM * locM * urgM;

  const minCost = Math.round(roofSize * baseMin * totalMult);
  const maxCost = Math.round(roofSize * baseMax * totalMult);
  const avgCost = Math.round((minCost + maxCost) / 2);
  const monthlyEst = Math.round(avgCost / 36);

  return {
    minCost,
    maxCost,
    avgCost,
    monthlyEst,
    breakdown: {
      materials: Math.round(avgCost * 0.40),
      labour:    Math.round(avgCost * 0.45),
      other:     Math.round(avgCost * 0.15),
    },
  };
}

/** Human-readable label for material */
export const MATERIAL_LABELS: Record<Material, string> = {
  asphalt: "Asphalt Shingles",
  metal:   "Metal Roofing",
  tile:    "Tile / Slate",
  flat:    "Flat Roof",
};

/** Estimated lifespan in years per material */
export const MATERIAL_LIFESPAN: Record<Material, string> = {
  asphalt: "20–30 years",
  metal:   "40–70 years",
  tile:    "50–100 years",
  flat:    "10–20 years",
};
