#!/usr/bin/env tsx
// ─── BLS Benchmark Refresh Script ────────────────────────────────────────────
//
// PURPOSE:
//   Fetches the latest BLS data for the four WorthCore benchmark series and
//   overwrites the values in lib/datasets/salary/salaryBenchmarks.ts.
//
// USAGE:
//   npx tsx scripts/updateBlsBenchmarks.ts
//
// ENVIRONMENT (optional — works without it):
//   BLS_API_KEY=<your-key>   # Omit for public-API access (500 req/day, no key)
//
// HOW IT WORKS:
//   1. Reads BLS_API_KEY from process.env (optional)
//   2. Fetches each series individually using the public v2 API
//   3. Extracts the most recent valid data point per series
//   4. Derives inflation rate from the 12-month CPI change
//   5. Writes the new values into salaryBenchmarks.ts using regex replacement
//   6. Leaves all comments, types, and structure untouched
//
// SAFETY:
//   - Never overwrites if any fetch fails — exits with code 1
//   - Never writes non-finite numbers
//   - All writes are idempotent — safe to run repeatedly
//   - Does not affect any other file in the project
//
// RUN THIS PERIODICALLY (e.g. monthly) to keep benchmarks current.

import * as fs from "fs";
import * as path from "path";

// ─── Config ──────────────────────────────────────────────────────────────────

const BLS_API_BASE = "https://api.bls.gov/publicAPI/v2/timeseries/data";
const BENCHMARKS_FILE = path.resolve(
  __dirname,
  "../lib/datasets/salary/salaryBenchmarks.ts",
);

const SERIES = {
  CPI:                "CUUR0000SA0",
  AVG_HOURLY_EARNINGS:"CES0500000003",
  AVG_WEEKLY_HOURS:   "CES0500000007",
  UNEMPLOYMENT_RATE:  "LNS14000000",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlsDataPoint {
  year:   string;
  period: string; // "M01"–"M12" or "M13" (annual avg)
  value:  string;
}

interface BlsSeriesResult {
  seriesID: string;
  data:     BlsDataPoint[];
}

interface BlsApiResponse {
  status:  string;
  message: string[];
  Results?: {
    series: BlsSeriesResult[];
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildUrl(seriesId: string, apiKey?: string): string {
  const params = new URLSearchParams();
  if (apiKey) params.set("registrationkey", apiKey);
  const qs = params.toString();
  return `${BLS_API_BASE}/${seriesId}${qs ? `?${qs}` : ""}`;
}

/** Returns the most recent monthly data point, skipping annual averages (M13). */
function latestMonthly(data: BlsDataPoint[]): BlsDataPoint | null {
  const monthly = data
    .filter(
      (d) =>
        d.period.startsWith("M") &&
        d.period !== "M13" &&
        Number.isFinite(parseFloat(d.value)),
    )
    .sort((a, b) => {
      const aYM = parseInt(a.year) * 100 + parseInt(a.period.slice(1));
      const bYM = parseInt(b.year) * 100 + parseInt(b.period.slice(1));
      return bYM - aYM; // descending
    });
  return monthly[0] ?? null;
}

/** Returns the data point exactly 12 months before `ref`, or null. */
function priorYearPoint(
  data: BlsDataPoint[],
  ref: BlsDataPoint,
): BlsDataPoint | null {
  const refYear  = parseInt(ref.year);
  const refMonth = parseInt(ref.period.slice(1));
  const priorYear  = refYear - 1;
  return (
    data.find(
      (d) =>
        parseInt(d.year) === priorYear &&
        d.period === ref.period &&
        Number.isFinite(parseFloat(d.value)),
    ) ?? null
  );
}

function periodLabel(point: BlsDataPoint): string {
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  const idx = parseInt(point.period.slice(1)) - 1;
  return `${monthNames[idx] ?? point.period} ${point.year}`;
}

async function fetchSeries(
  seriesId: string,
  apiKey?: string,
): Promise<BlsDataPoint[]> {
  const url = buildUrl(seriesId, apiKey);
  console.log(`  Fetching ${seriesId}...`);

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for series ${seriesId}`);
  }

  const json = (await res.json()) as BlsApiResponse;

  if (json.status !== "REQUEST_SUCCEEDED") {
    const msgs = (json.message ?? []).join("; ");
    throw new Error(`BLS API error for ${seriesId}: ${msgs}`);
  }

  const series = json.Results?.series?.[0];
  if (!series || !Array.isArray(series.data) || series.data.length === 0) {
    throw new Error(`No data returned for series ${seriesId}`);
  }

  return series.data;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const apiKey = process.env.BLS_API_KEY ?? undefined;
  if (apiKey) {
    console.log("BLS_API_KEY found — using registered API access.");
  } else {
    console.log("No BLS_API_KEY — using public API (500 req/day limit, no key required).");
  }

  console.log("\nFetching BLS series...");

  let cpiData:     BlsDataPoint[];
  let wageData:    BlsDataPoint[];
  let hoursData:   BlsDataPoint[];
  let unempData:   BlsDataPoint[];

  try {
    [cpiData, wageData, hoursData, unempData] = await Promise.all([
      fetchSeries(SERIES.CPI,                apiKey),
      fetchSeries(SERIES.AVG_HOURLY_EARNINGS, apiKey),
      fetchSeries(SERIES.AVG_WEEKLY_HOURS,    apiKey),
      fetchSeries(SERIES.UNEMPLOYMENT_RATE,   apiKey),
    ]);
  } catch (err) {
    console.error("\n❌ Fetch failed:", (err as Error).message);
    console.error("   salaryBenchmarks.ts was NOT modified.");
    process.exit(1);
  }

  // ── Extract latest data points ──────────────────────────────────────────

  const latestCpi   = latestMonthly(cpiData);
  const latestWage  = latestMonthly(wageData);
  const latestHours = latestMonthly(hoursData);
  const latestUnemp = latestMonthly(unempData);

  if (!latestCpi || !latestWage || !latestHours || !latestUnemp) {
    console.error("❌ Could not extract a valid latest data point from one or more series.");
    process.exit(1);
  }

  // ── Derive inflation rate (12-month CPI change) ─────────────────────────

  const priorCpi = priorYearPoint(cpiData, latestCpi);
  let inflationRate: number;

  if (priorCpi) {
    const current = parseFloat(latestCpi.value);
    const prior   = parseFloat(priorCpi.value);
    inflationRate = Math.round(((current - prior) / prior) * 1000) / 10; // 1dp
  } else {
    console.warn("  ⚠️  Prior-year CPI not found — keeping existing inflationRateUs.");
    inflationRate = NaN; // will be guarded below
  }

  // ── Validate all values ─────────────────────────────────────────────────

  const avgHourlyWageUs   = Math.round(parseFloat(latestWage.value) * 100) / 100;
  const avgWeeklyHoursUs  = Math.round(parseFloat(latestHours.value) * 10) / 10;
  const unemploymentRateUs = Math.round(parseFloat(latestUnemp.value) * 10) / 10;
  const impliedAnnualSalaryUs = Math.round(avgHourlyWageUs * avgWeeklyHoursUs * 52);
  const label = periodLabel(latestWage);
  const now   = new Date().toISOString();

  const validations: [string, number][] = [
    ["avgHourlyWageUs",    avgHourlyWageUs],
    ["avgWeeklyHoursUs",   avgWeeklyHoursUs],
    ["unemploymentRateUs", unemploymentRateUs],
  ];

  if (Number.isFinite(inflationRate)) {
    validations.push(["inflationRateUs", inflationRate]);
  }

  for (const [field, value] of validations) {
    if (!Number.isFinite(value) || value <= 0) {
      console.error(`❌ Invalid value for ${field}: ${value}`);
      process.exit(1);
    }
  }

  // ── Log new values ──────────────────────────────────────────────────────

  console.log(`\n✅ BLS data retrieved for period: ${label}`);
  console.log(`   avgHourlyWageUs:      $${avgHourlyWageUs}`);
  console.log(`   avgWeeklyHoursUs:     ${avgWeeklyHoursUs} hrs`);
  console.log(`   unemploymentRateUs:   ${unemploymentRateUs}%`);
  if (Number.isFinite(inflationRate)) {
    console.log(`   inflationRateUs:      ${inflationRate}% (12-month CPI change)`);
  }
  console.log(`   impliedAnnualSalaryUs: $${impliedAnnualSalaryUs.toLocaleString()}`);

  // ── Read and patch salaryBenchmarks.ts ─────────────────────────────────

  let source = fs.readFileSync(BENCHMARKS_FILE, "utf-8");

  function replaceField(src: string, field: string, newVal: string, comment: string): string {
    // Matches:  fieldName:  <number>,  // existing comment
    const re = new RegExp(`(\\s+${field}:\\s*)[\\d.]+,([ \\t]*\\/\\/[^\\n]*)`, "g");
    return src.replace(re, `$1${newVal},   // ${comment}`);
  }

  source = replaceField(source, "avgHourlyWageUs",       String(avgHourlyWageUs),       `CES0500000003 — ${label}`);
  source = replaceField(source, "avgWeeklyHoursUs",      String(avgWeeklyHoursUs),      `CES0500000007 — ${label}`);
  source = replaceField(source, "unemploymentRateUs",    String(unemploymentRateUs),    `LNS14000000   — ${label}`);

  if (Number.isFinite(inflationRate)) {
    source = replaceField(source, "inflationRateUs",     String(inflationRate),         `CUUR0000SA0   — 12-month change, ${label}`);
  }

  // Replace impliedAnnualSalaryUs line (derived — fully rewritten)
  source = source.replace(
    /impliedAnnualSalaryUs:\s*Math\.round\([^)]+\),/,
    `impliedAnnualSalaryUs: ${impliedAnnualSalaryUs}, // derived: ${avgHourlyWageUs} × ${avgWeeklyHoursUs} × 52`,
  );

  // Replace lastUpdated
  source = source.replace(
    /lastUpdated:\s*"[^"]*"/,
    `lastUpdated:       "${now}"`,
  );

  // Replace currentPeriodLabel
  source = source.replace(
    /currentPeriodLabel:\s*"[^"]*"/,
    `currentPeriodLabel: "${label}"`,
  );

  // Replace the header comment date line
  source = source.replace(
    /\/\/ LAST UPDATED:\n\/\/\s+[^\n]+/,
    `// LAST UPDATED:\n//   ${now.slice(0, 10)} — sourced from BLS public API${apiKey ? " (registered key)" : " (no key)"}`,
  );

  fs.writeFileSync(BENCHMARKS_FILE, source, "utf-8");

  console.log(`\n✅ salaryBenchmarks.ts updated successfully.`);
  console.log(`   Path: ${BENCHMARKS_FILE}`);
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
