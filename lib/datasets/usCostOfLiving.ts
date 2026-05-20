// ─── US Cost-of-Living Dataset ────────────────────────────────────────────────
//
// PURPOSE:
//   City-level and national average cost data for lifestyle calculators.
//   Covers everyday consumables: coffee, cigarettes, fuel, and restaurant meals.
//
// RULES (read before editing):
//   ✅ Pure TypeScript only — no async, no fetch, no React, no Supabase
//   ✅ SSR-safe — safe to import in server components and client components
//   ✅ getUSCityCost() always returns a number — never throws, always falls back
//   ✅ Intentionally mutable — Layer 2 API updates can overwrite at runtime
//   ❌ Never import from components/ or app/ (circular deps)
//   ❌ Never import from lib/dataStore.ts (this file is standalone infrastructure)
//   ❌ Never call fetch() or any I/O here
//
// USAGE PATTERN IN CALCULATORS:
//   import { getUSCityCost } from "@/lib/datasets/usCostOfLiving";
//   const fuelPrice = getUSCityCost("Seattle", "fuel"); // → 4.2
//
// DATA SOURCES:
//   USDA, EIA, CDC, BLS Consumer Expenditure Survey, GasBuddy, Numbeo — 2025 averages.
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

/** The four cost categories tracked per city */
export type USCostCategory = "coffee" | "cigarettes" | "fuel" | "meal";

/** Cost data for a single city (all values in USD) */
export interface USCityCostData {
  /** Average price per cup of drip coffee or latte — café ($) */
  coffee: number;
  /** Average price per pack of cigarettes ($) — includes state excise tax */
  cigarettes: number;
  /** Average price per gallon of regular unleaded gasoline ($) */
  fuel: number;
  /** Average cost per person for a sit-down restaurant meal ($) */
  meal: number;
}

/** Top-level dataset shape — matches mutable export below */
export interface USCostDataset {
  /** City-keyed map. Keys are display names, e.g. "New York City" */
  cities: Record<string, USCityCostData>;
  /** US national average — used as fallback when city is unknown */
  national: USCityCostData;
  /** ISO 8601 date — when these defaults were last verified */
  lastUpdated: string;
  /** Data version — increment when adding/removing cities or categories */
  version: number;
}

// ─── National Default ─────────────────────────────────────────────────────────
// US national averages as of Q1 2025.

const NATIONAL_DEFAULTS: USCityCostData = {
  coffee:     4.5,
  cigarettes: 9.2,
  fuel:       3.8,
  meal:       18,
};

// ─── City Data ────────────────────────────────────────────────────────────────
// ~15 major US metros. Values reflect 2024-2025 local averages.
// cigarettes vary widely by state excise tax (NY: $5.35/pack, TN: $0.62/pack).

const CITY_DEFAULTS: Record<string, USCityCostData> = {
  "New York City": {
    coffee:     6.0,
    cigarettes: 14.0, // NY state + NYC surcharge — highest in US
    fuel:       3.9,
    meal:       25,
  },
  "Los Angeles": {
    coffee:     5.5,
    cigarettes: 10.5, // CA tax: $2.87/pack
    fuel:       4.8,  // CA blend + refinery premium
    meal:       22,
  },
  "Chicago": {
    coffee:     4.8,
    cigarettes: 13.0, // IL + Cook County tax: ~$6/pack total
    fuel:       3.8,
    meal:       20,
  },
  "Dallas": {
    coffee:     4.0,
    cigarettes: 7.5, // TX tax: $1.41/pack
    fuel:       3.0,
    meal:       16,
  },
  "Houston": {
    coffee:     3.9,
    cigarettes: 7.5,
    fuel:       3.0,
    meal:       15,
  },
  "Miami": {
    coffee:     4.5,
    cigarettes: 9.0, // FL tax: $1.34/pack
    fuel:       3.4,
    meal:       20,
  },
  "Seattle": {
    coffee:     5.5, // Seattle/Pacific NW coffee culture premium
    cigarettes: 12.0, // WA tax: $3.025/pack
    fuel:       4.2,
    meal:       21,
  },
  "Boston": {
    coffee:     5.0,
    cigarettes: 11.0, // MA tax: $3.51/pack
    fuel:       3.7,
    meal:       22,
  },
  "Atlanta": {
    coffee:     4.2,
    cigarettes: 8.0, // GA tax: $0.37/pack — among lowest
    fuel:       3.1,
    meal:       15,
  },
  "Phoenix": {
    coffee:     4.2,
    cigarettes: 9.0, // AZ tax: $2.00/pack
    fuel:       3.3,
    meal:       15,
  },
  "Denver": {
    coffee:     4.8,
    cigarettes: 9.5, // CO tax: $1.94/pack
    fuel:       3.5,
    meal:       18,
  },
  "San Francisco": {
    coffee:     6.5,
    cigarettes: 11.0,
    fuel:       5.0, // CA + Bay Area premium — consistently highest metro
    meal:       25,
  },
  "Las Vegas": {
    coffee:     4.5,
    cigarettes: 8.5, // NV tax: $1.80/pack
    fuel:       3.6,
    meal:       17,
  },
  "Nashville": {
    coffee:     4.3,
    cigarettes: 7.0, // TN tax: $0.62/pack — second lowest in US
    fuel:       3.0,
    meal:       15,
  },
  "Portland": {
    coffee:     5.0,
    cigarettes: 11.0, // OR tax: $3.33/pack
    fuel:       4.0,
    meal:       19,
  },
};

// ─── Mutable Dataset Export ───────────────────────────────────────────────────
// Intentionally mutable so the Layer 2 update API can overwrite values at runtime.

export const usCostDataset: USCostDataset = {
  cities:      CITY_DEFAULTS,
  national:    NATIONAL_DEFAULTS,
  lastUpdated: "2025-01-01",
  version:     1,
};

// ─── Getter ───────────────────────────────────────────────────────────────────

/**
 * Get a cost value for a given US city and cost category.
 *
 * Falls back to the national average if the city is unknown or the
 * category is missing. Never throws — always returns a positive number.
 *
 * @example
 *   const fuelPrice = getUSCityCost("Seattle", "fuel");  // → 4.2
 *   const coffee    = getUSCityCost("Unknown", "coffee"); // → 4.5 (national)
 */
export function getUSCityCost(city: string, category: USCostCategory): number {
  const cityData = usCostDataset.cities[city];
  if (cityData && typeof cityData[category] === "number") {
    return cityData[category];
  }
  return usCostDataset.national[category];
}

/**
 * Return a sorted list of all city names in the dataset.
 * Useful for populating select/dropdown UI elements.
 */
export function getUSCityList(): string[] {
  return Object.keys(usCostDataset.cities).sort();
}
