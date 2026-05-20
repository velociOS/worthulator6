// ─── US State Fuel Prices Dataset ────────────────────────────────────────────
//
// PURPOSE:
//   State-level average regular unleaded gasoline prices for contextual
//   assumption injection into fuel-consuming engine calculators.
//
// RULES:
//   ✅ Pure TypeScript only — no async, no fetch, no React
//   ✅ SSR-safe — safe to import in server and client components
//   ✅ getUSStateFuelPrice() always returns a number — never throws
//   ✅ Intentionally mutable — Layer 2 / Phase 5C can overwrite at runtime
//   ❌ Never import from components/ or app/
//   ❌ Never call fetch() or any I/O here
//
// USAGE:
//   import { getUSStateFuelPrice, US_STATE_LIST } from "@/lib/datasets/usStateFuelPrices";
//   const price = getUSStateFuelPrice("Texas"); // → 2.95
//   const price = getUSStateFuelPrice("Unknown"); // → 3.85 (national fallback)
//
// DATA SOURCE:
//   EIA Weekly Retail Gasoline Prices — 2024–2025 state averages.
//   Prices in USD per gallon, regular unleaded.
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export interface USStateFuelDataset {
  /** State name → average price per gallon ($) */
  states: Record<string, number>;
  /** US national average — fallback when state is unknown */
  national: number;
  /** ISO 8601 date — when these defaults were last verified */
  lastUpdated: string;
  version: number;
}

// ─── State Prices ─────────────────────────────────────────────────────────────
// Ordered alphabetically. All prices in USD per gallon, regular unleaded.
// Reflects 2024–2025 EIA state averages. High-price states driven by:
//   - CA: blend requirements + LCFS + refinery capacity constraints
//   - HI/AK: geographic isolation
//   - WA/OR: carbon pricing + blend requirements
//   - IL/PA/NY: high state excise taxes

const STATE_FUEL_PRICES: Record<string, number> = {
  "Alabama":              3.00,
  "Alaska":               4.20,
  "Arizona":              3.30,
  "Arkansas":             3.00,
  "California":           4.80,
  "Colorado":             3.50,
  "Connecticut":          3.55,
  "Delaware":             3.35,
  "Florida":              3.30,
  "Georgia":              3.15,
  "Hawaii":               4.60,
  "Idaho":                3.50,
  "Illinois":             3.80,
  "Indiana":              3.25,
  "Iowa":                 3.15,
  "Kansas":               3.05,
  "Kentucky":             3.10,
  "Louisiana":            3.00,
  "Maine":                3.40,
  "Maryland":             3.35,
  "Massachusetts":        3.55,
  "Michigan":             3.35,
  "Minnesota":            3.20,
  "Mississippi":          2.90,
  "Missouri":             3.05,
  "Montana":              3.40,
  "Nebraska":             3.10,
  "Nevada":               3.90,
  "New Hampshire":        3.20,
  "New Jersey":           3.30,
  "New Mexico":           3.20,
  "New York":             3.70,
  "North Carolina":       3.20,
  "North Dakota":         3.20,
  "Ohio":                 3.25,
  "Oklahoma":             3.00,
  "Oregon":               4.00,
  "Pennsylvania":         3.65,
  "Rhode Island":         3.45,
  "South Carolina":       3.00,
  "South Dakota":         3.20,
  "Tennessee":            3.00,
  "Texas":                2.95,
  "Utah":                 3.50,
  "Vermont":              3.45,
  "Virginia":             3.20,
  "Washington":           4.20,
  "West Virginia":        3.35,
  "Wisconsin":            3.20,
  "Wyoming":              3.30,
  "District of Columbia": 3.70,
};

// ─── Mutable Dataset Export ───────────────────────────────────────────────────

export const usStateFuelDataset: USStateFuelDataset = {
  states:      STATE_FUEL_PRICES,
  national:    3.85,
  lastUpdated: "2025-01-01",
  version:     1,
};

// ─── Sorted State List ────────────────────────────────────────────────────────

/**
 * Alphabetically sorted list of all state names in the dataset.
 * Useful for populating select/dropdown UI elements.
 */
export const US_STATE_LIST: string[] = Object.keys(STATE_FUEL_PRICES).sort();

// ─── Getters ──────────────────────────────────────────────────────────────────

/**
 * Returns the average fuel price per gallon for a given US state.
 * Falls back to the national average if the state name is unrecognised.
 * Never throws — always returns a positive number.
 *
 * @example
 *   getUSStateFuelPrice("California")   // → 4.80
 *   getUSStateFuelPrice("Texas")        // → 2.95
 *   getUSStateFuelPrice("Unknown")      // → 3.85 (national fallback)
 */
export function getUSStateFuelPrice(state: string): number {
  return usStateFuelDataset.states[state] ?? usStateFuelDataset.national;
}
