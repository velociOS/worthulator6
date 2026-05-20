// ─── BLS Series Registry ──────────────────────────────────────────────────────
//
// PURPOSE:
//   Central registry of BLS (Bureau of Labor Statistics) series IDs used by
//   the WorthCore salary benchmark refresh pipeline.
//
// RULES:
//   ✅ Pure constant — no runtime logic, no async, no fetch
//   ✅ SSR-safe — safe to import anywhere in the stack
//   ✅ Single source of truth for series IDs used in updateBlsBenchmarks.ts
//   ❌ Never call fetch() here — series IDs only
//   ❌ Never import from components/ or app/
//
// TO ADD A NEW SERIES:
//   1. Find the series ID at https://data.bls.gov/cgi-bin/browse.do
//   2. Add it here with a descriptive key
//   3. Add the corresponding field to salaryBenchmarks.ts
//   4. Handle it in scripts/updateBlsBenchmarks.ts
//
// PUBLIC API (no key) LIMITS:
//   - 25 series per query
//   - 10 years of data
//   - 500 requests/day per IP
//   - No registration required for basic access
//
// REGISTRATION (future):
//   Set BLS_API_KEY in .env.local to upgrade to:
//   - 50 series per query
//   - 20 years of data
//   - Daily email notifications on updates

// ─── Series IDs ──────────────────────────────────────────────────────────────

export const BLS_SERIES = {
  /** Consumer Price Index — All Urban Consumers, All Items */
  CPI: "CUUR0000SA0",

  /** Average Hourly Earnings — Total Private, seasonally adjusted */
  AVG_HOURLY_EARNINGS: "CES0500000003",

  /** Average Weekly Hours — Total Private, seasonally adjusted */
  AVG_WEEKLY_HOURS: "CES0500000007",

  /** Unemployment Rate — Seasonally adjusted */
  UNEMPLOYMENT_RATE: "LNS14000000",
} as const;

export type BlsSeriesKey = keyof typeof BLS_SERIES;
export type BlsSeriesId  = (typeof BLS_SERIES)[BlsSeriesKey];

/** BLS public API endpoint — no key required for basic access */
export const BLS_API_BASE = "https://api.bls.gov/publicAPI/v2/timeseries/data";
