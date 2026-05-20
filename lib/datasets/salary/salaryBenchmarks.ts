// ─── WorthCore Salary Benchmarks ─────────────────────────────────────────────
//
// PURPOSE:
//   The ONLY layer calculators should consume for BLS-derived benchmarks.
//   Contains the most recent published values, refreshed by running:
//
//     npx tsx scripts/updateBlsBenchmarks.ts
//
// RULES (read before editing):
//   ✅ Pure TypeScript only — no async, no fetch, no React
//   ✅ SSR-safe — safe to import in server components and client components
//   ✅ Always returns a valid number — never throws, never undefined
//   ✅ Intentionally mutable at module level — updateBlsBenchmarks.ts overwrites
//      the values block and the `lastUpdated` field
//   ❌ Calculators must NEVER fetch BLS directly — import from here instead
//   ❌ Never import from components/ or app/ (circular deps)
//   ❌ Never call fetch() here
//
// DATA FLOW:
//   BLS public API → scripts/updateBlsBenchmarks.ts → this file → calculators
//
// USAGE PATTERN IN CALCULATORS:
//   import { salaryBenchmarks } from "@/lib/datasets/salary/salaryBenchmarks";
//   const { avgHourlyWageUs, inflationRateUs } = salaryBenchmarks;
//
// DATA SOURCES:
//   CPI:               CUUR0000SA0  (BLS — CPI-U, All Items)
//   Avg Hourly Wage:   CES0500000003 (BLS — Total Private, seasonally adjusted)
//   Avg Weekly Hours:  CES0500000007 (BLS — Total Private, seasonally adjusted)
//   Unemployment:      LNS14000000  (BLS — Seasonally adjusted)
//
// LAST UPDATED:
//   2026-05-19 — sourced from BLS public API (no key)

// ─── Benchmark Dataset ───────────────────────────────────────────────────────

export interface SalaryBenchmarks {
  /** Average hourly wage across all private-sector workers (USD) */
  avgHourlyWageUs: number;

  /** Average weekly hours worked across all private-sector workers */
  avgWeeklyHoursUs: number;

  /** Unemployment rate as a percentage (e.g. 4.1 = 4.1%) */
  unemploymentRateUs: number;

  /**
   * Year-over-year CPI inflation rate as a percentage (e.g. 3.2 = 3.2%).
   * Derived from the 12-month change in CUUR0000SA0.
   */
  inflationRateUs: number;

  /** Implied annual salary from avgHourlyWageUs × avgWeeklyHoursUs × 52 */
  impliedAnnualSalaryUs: number;

  /** ISO 8601 timestamp of the last successful BLS data refresh */
  lastUpdated: string;

  /** BLS period label for the current data (e.g. "Mar 2026") */
  currentPeriodLabel: string;
}

export const salaryBenchmarks: SalaryBenchmarks = {
  // ── Values as of March 2026 (BLS release) ────────────────────────────────
  avgHourlyWageUs:       35.58,   // CES0500000003 — Mar 2026
  avgWeeklyHoursUs:      34.3,    // CES0500000007 — Mar 2026
  unemploymentRateUs:     4.2,    // LNS14000000   — Mar 2026
  inflationRateUs:        2.4,    // CUUR0000SA0   — 12-month change, Mar 2026

  // ── Derived ──────────────────────────────────────────────────────────────
  impliedAnnualSalaryUs: Math.round(35.58 * 34.3 * 52), // ≈ 63,450

  // ── Metadata ─────────────────────────────────────────────────────────────
  lastUpdated:       "2026-05-19T00:00:00.000Z",
  currentPeriodLabel: "Mar 2026",
};

// ─── Convenience accessors ───────────────────────────────────────────────────
// Safe getters for calulators that want a single value with an optional fallback.

/**
 * Returns the named benchmark value, or `fallback` if the field is not a
 * finite number (should never happen with hardcoded data, but guards against
 * future runtime mutation errors).
 */
export function getBenchmark(
  key: Exclude<keyof SalaryBenchmarks, "lastUpdated" | "currentPeriodLabel">,
  fallback: number,
): number {
  const v = salaryBenchmarks[key] as number;
  return Number.isFinite(v) ? v : fallback;
}
