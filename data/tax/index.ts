import type { UKTaxData, USTaxData } from "./types";
import uk2025 from "./uk_2025";
import uk2026 from "./uk_2026";
import us2025 from "./us_2025";
import us2026 from "./us_2026";

// ─── Year registry ────────────────────────────────────────────────────────────

export type SupportedYear = 2025 | 2026;

/** The tax year calculators default to. Update each new tax year. */
export const CURRENT_YEAR: SupportedYear = 2026;

/** All supported years, in ascending order. Used to render year pickers. */
export const SUPPORTED_YEARS: SupportedYear[] = [2025, 2026];

// ─── Data maps ────────────────────────────────────────────────────────────────

const UK_DATA: Record<SupportedYear, UKTaxData> = {
  2025: uk2025,
  2026: uk2026,
};

const US_DATA: Record<SupportedYear, USTaxData> = {
  2025: us2025,
  2026: us2026,
};

// ─── Accessors ────────────────────────────────────────────────────────────────

export function getUKTaxData(year: SupportedYear = CURRENT_YEAR): UKTaxData {
  return UK_DATA[year];
}

export function getUSTaxData(year: SupportedYear = CURRENT_YEAR): USTaxData {
  return US_DATA[year];
}

// ─── Re-exports for consumers that only need the types ────────────────────────

export type { UKTaxData, USTaxData, UKTaxBand, USTaxBracket } from "./types";
