// ─── WorthCore Insight Engine — Projection Helpers ───────────────────────────
//
// PURPOSE:
//   Pure mathematical helpers for forward-looking projections used by insight
//   generators. Relies on WorthCore assumptions for default rates.
//
// RULES:
//   ✅ Pure functions — no side effects, deterministic for given inputs
//   ✅ Synchronous
//   ✅ SSR-safe
//   ✅ WorthCore module-level rule: getFinanceValue() called ONLY at module level
//   ❌ Never call getFinanceValue() inside a function body
//   ❌ Never call fetch() or async operations
//
// ─────────────────────────────────────────────────────────────────────────────

import { getFinanceValue } from "@/lib/dataStore";

// ─── Module-level WorthCore defaults (frozen at first import) ─────────────────
const DEFAULT_RETURN_RATE    = getFinanceValue("stockMarketReturn"); // 7.0%
const DEFAULT_INFLATION_RATE = getFinanceValue("inflationRate");     // 3.2%

// ─── Future Value ─────────────────────────────────────────────────────────────

/**
 * Future value of regular END-OF-YEAR annual contributions (ordinary annuity).
 *
 * Formula: FV = PMT × ( (1 + r)^n − 1 ) / r
 *
 * @param annualContribution  Amount invested per year ($)
 * @param years               Investment horizon (years)
 * @param annualReturnRate    Annual return rate (%, default: WCD stockMarketReturn)
 * @returns                   Future value in dollars
 *
 * @example
 *   futureValueAnnuity(3850, 10)      // $53,090 (annual fuel cost invested 10yr)
 *   futureValueAnnuity(3850, 10, 7)   // same
 *   futureValueAnnuity(2190, 30, 7)   // $6/day × 365 invested for 30 years
 */
export function futureValueAnnuity(
  annualContribution: number,
  years: number,
  annualReturnRate: number = DEFAULT_RETURN_RATE,
): number {
  if (annualContribution <= 0 || years <= 0) return 0;
  const r = annualReturnRate / 100;
  if (r === 0) return annualContribution * years;
  return annualContribution * ((Math.pow(1 + r, years) - 1) / r);
}

/**
 * Future value of a DAILY habit redirected to an investment.
 * Converts daily amount to annual, then applies futureValueAnnuity.
 *
 * @param dailyAmount         Amount per day ($)
 * @param years               Investment horizon (years)
 * @param annualReturnRate    Annual return rate (%, default: WCD stockMarketReturn)
 *
 * @example
 *   opportunityCostDaily(6, 30)    // $6/day latte over 30 years → ~$220k
 *   opportunityCostDaily(10.54, 10) // ~$1/day commute fuel invested 10 years
 */
export function opportunityCostDaily(
  dailyAmount: number,
  years: number,
  annualReturnRate: number = DEFAULT_RETURN_RATE,
): number {
  return futureValueAnnuity(dailyAmount * 365, years, annualReturnRate);
}

/**
 * Future value of a single lump-sum investment (not an annuity).
 *
 * Formula: FV = PV × (1 + r)^n
 *
 * @param presentValue        Current amount ($)
 * @param years               Investment horizon (years)
 * @param annualReturnRate    Annual return rate (%, default: WCD stockMarketReturn)
 *
 * @example
 *   futureValueLumpSum(5000, 10)   // $5k invested today → ~$9,836 in 10yr at 7%
 */
export function futureValueLumpSum(
  presentValue: number,
  years: number,
  annualReturnRate: number = DEFAULT_RETURN_RATE,
): number {
  if (presentValue <= 0 || years <= 0) return 0;
  const r = annualReturnRate / 100;
  return presentValue * Math.pow(1 + r, years);
}

// ─── Inflation Adjustment ─────────────────────────────────────────────────────

/**
 * Inflation-adjusted purchasing power of a future nominal value in today's dollars.
 *
 * Formula: Real = Nominal / (1 + inflationRate)^years
 *
 * @param nominalValue     Future dollar amount ($)
 * @param years            How many years in the future
 * @param inflationRate    Annual inflation rate (%, default: WCD inflationRate)
 *
 * @example
 *   inflationAdjustedValue(53090, 10)   // real purchasing power of $53k in 10yr
 */
export function inflationAdjustedValue(
  nominalValue: number,
  years: number,
  inflationRate: number = DEFAULT_INFLATION_RATE,
): number {
  if (years <= 0) return nominalValue;
  return nominalValue / Math.pow(1 + inflationRate / 100, years);
}

// ─── Time to Goal ─────────────────────────────────────────────────────────────

/**
 * Years required for regular annual contributions to reach a target amount.
 * Returns Infinity if inputs are invalid or zero-return prevents reaching target.
 *
 * Solves: C × ((1+r)^n − 1) / r = T
 *     for n: n = ln( T×r/C + 1 ) / ln(1+r)
 *
 * @param annualContribution  Amount invested per year ($)
 * @param targetAmount        Target future value ($)
 * @param annualReturnRate    Annual return rate (%, default: WCD stockMarketReturn)
 *
 * @example
 *   yearsToTarget(3850, 50000)    // ~8.7 years to $50k if you invest $3,850/yr
 */
export function yearsToTarget(
  annualContribution: number,
  targetAmount: number,
  annualReturnRate: number = DEFAULT_RETURN_RATE,
): number {
  if (annualContribution <= 0 || targetAmount <= 0) return Infinity;
  if (annualReturnRate <= 0) return targetAmount / annualContribution;
  const r           = annualReturnRate / 100;
  const numerator   = Math.log((targetAmount * r) / annualContribution + 1);
  const denominator = Math.log(1 + r);
  return numerator / denominator;
}
