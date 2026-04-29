// ─── UK unit constants ────────────────────────────────────────────────────────
// All unit-specific constants for UK calculators live here.
// Update this file to change unit conversions or yields globally.

/** Concrete bag yields: weight label → cubic metres per bag */
export const UK_BAG_YIELDS: Record<string, number> = {
  "20": 0.0094,
  "25": 0.0118,
};

/** Divide depth in millimetres by this to get metres */
export const MM_TO_METRES_DIVISOR = 1000;

/** Volume divisor for m³ calculations (already in m³, no conversion needed) */
export const M3_DIVISOR = 1;

/** Gravel bulk density: kg per cubic metre */
export const GRAVEL_DENSITY_KG_PER_M3 = 1650;

/** Metric tonne: kg per tonne */
export const KG_PER_TONNE = 1000;
