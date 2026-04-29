// ─── US construction unit constants ──────────────────────────────────────────
// All unit-specific constants for US construction calculators live here.
// Update this file to change unit conversions or yields globally.

/** Concrete bag yields: weight label → cubic yards per bag */
export const US_BAG_YIELDS: Record<string, number> = {
  "40": 0.011,
  "60": 0.017,
  "80": 0.022,
};

/** Divide depth in inches by this to get feet */
export const INCHES_TO_FEET_DIVISOR = 12;

/** Divide volume in cubic feet by this to get cubic yards */
export const CU_FT_TO_CU_YD_DIVISOR = 27;

/** Gravel bulk density: pounds per cubic yard */
export const GRAVEL_DENSITY_LBS_PER_CU_YD = 2800;

/** Short ton: pounds per ton */
export const LBS_PER_SHORT_TON = 2000;
