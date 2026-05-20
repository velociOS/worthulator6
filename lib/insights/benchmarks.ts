// ─── WorthCore Insight Engine — Benchmark Helpers ────────────────────────────
//
// PURPOSE:
//   Reusable comparison functions that measure a value against national or
//   state-level benchmarks sourced from WorthCore datasets.
//
// RULES:
//   ✅ Pure TypeScript functions — no side effects, no state
//   ✅ Synchronous — no async, no fetch
//   ✅ SSR-safe — safe to import everywhere
//   ✅ Fallback-safe — never throws, always returns a valid result
//   ❌ Never import from components/, app/, or calculatorConfigs
//
// ─────────────────────────────────────────────────────────────────────────────

import { usStateFuelDataset } from "@/lib/datasets/usStateFuelPrices";
import { usCostDataset }       from "@/lib/datasets/usCostOfLiving";

// ─── Core Comparison Types ───────────────────────────────────────────────────

export interface ComparisonResult {
  direction: "above" | "below" | "equal";
  /**
   * Positive → value is above reference.
   * Negative → value is below reference.
   * Expressed as a percentage of the reference.
   */
  percentDiff: number;
  /** Absolute difference: value − reference */
  absoluteDiff: number;
  /** The reference value used for comparison */
  reference: number;
}

// ─── Core Maths ──────────────────────────────────────────────────────────────

/**
 * Percentage difference between a value and a reference.
 * Returns 0 if reference is 0 to prevent division-by-zero.
 *
 * @example
 *   calculatePercentDiff(4.80, 3.85) // → +24.7  (CA is 24.7% above national)
 *   calculatePercentDiff(2.95, 3.85) // → -23.4  (TX is 23.4% below national)
 */
export function calculatePercentDiff(value: number, reference: number): number {
  if (reference === 0) return 0;
  return ((value - reference) / reference) * 100;
}

/**
 * Compare any value to a reference and return a structured result.
 * "equal" zone: within ±1% of reference.
 */
export function compareToReference(value: number, reference: number): ComparisonResult {
  const percentDiff  = calculatePercentDiff(value, reference);
  const absoluteDiff = value - reference;
  const direction    = percentDiff > 1 ? "above" : percentDiff < -1 ? "below" : "equal";
  return { direction, percentDiff, absoluteDiff, reference };
}

// ─── Fuel Price Benchmarks ───────────────────────────────────────────────────

/**
 * Compare a gas price to the US national average.
 * National average is sourced from usStateFuelDataset.national (Layer 2 updatable).
 *
 * @example
 *   compareToNationalFuelAverage(4.80) // → { direction: "above", percentDiff: 24.7, ... }
 */
export function compareToNationalFuelAverage(gasPrice: number): ComparisonResult {
  return compareToReference(gasPrice, usStateFuelDataset.national);
}

/**
 * Compare a gas price to a specific US state's average.
 * Falls back to national average if the state is not in the dataset.
 *
 * @example
 *   compareToStateFuelAverage(3.20, "Texas")      // compare to TX avg ($2.95)
 *   compareToStateFuelAverage(4.10, "California") // compare to CA avg ($4.80)
 */
export function compareToStateFuelAverage(
  gasPrice: number,
  state: string,
): ComparisonResult {
  const stateAvg = usStateFuelDataset.states[state] ?? usStateFuelDataset.national;
  return compareToReference(gasPrice, stateAvg);
}

// ─── Cost of Living Benchmarks ───────────────────────────────────────────────

/**
 * Compare a cigarette pack cost to the US national average.
 * National average sourced from usCostDataset.national.cigarettes.
 */
export function compareToNationalCigarettePrice(packCost: number): ComparisonResult {
  return compareToReference(packCost, usCostDataset.national.cigarettes);
}

/**
 * Compare a coffee/meal cost to the US national average for that category.
 */
export function compareToNationalCityCost(
  value: number,
  category: "coffee" | "meal" | "fuel",
): ComparisonResult {
  return compareToReference(value, usCostDataset.national[category]);
}

// ─── Formatting Helpers ──────────────────────────────────────────────────────

/**
 * Format a number as US dollars with no decimal places.
 * Uses Intl.NumberFormat for reliable cross-environment formatting.
 *
 * @example
 *   formatCurrency(3850)   // → "$3,850"
 *   formatCurrency(382.5)  // → "$383"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style:                 "currency",
    currency:              "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number as US dollars with two decimal places.
 *
 * @example
 *   formatCurrencyPrecise(3.85) // → "$3.85"
 */
export function formatCurrencyPrecise(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style:                 "currency",
    currency:              "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
