// ─── Cost Benchmark Series Registry ──────────────────────────────────────────
//
// PURPOSE:
//   Central registry of data source references for the WorthCore cost benchmark
//   refresh pipeline. Each entry maps a benchmark key to its authoritative
//   external source identifier and metadata.
//
// RULES:
//   ✅ Pure constant — no runtime logic, no async, no fetch
//   ✅ SSR-safe — safe to import anywhere in the stack
//   ✅ Single source of truth for source IDs used in updateCostBenchmarks.ts
//   ❌ Never call fetch() here — references only
//   ❌ Never import from components/ or app/
//
// ARCHITECTURE:
//   Unlike BLS (single API), cost benchmarks draw from multiple sources.
//   Each source has its own API pattern, rate limits, and key requirements.
//   The refresh script handles the per-source fetch logic. This file is the
//   stable registry of "what to fetch from where."
//
// TO ADD A NEW BENCHMARK:
//   1. Add the source reference here under the appropriate SOURCE_* block
//   2. Add the field to costBenchmarks.ts (SalaryBenchmarks interface + defaults)
//   3. Handle the fetch in scripts/updateCostBenchmarks.ts
//
// SUPPORTED SOURCE APIS:
//   EIA   — US Energy Information Administration (FREE, no key required)
//           https://api.eia.gov — DEMO_KEY works for basic access
//   BLS   — Consumer Expenditure Survey (CES) for household spend categories
//           https://api.bls.gov/publicAPI/v2/timeseries/data (no key for basic)
//   STATIC — Maintained manually from USDA, HHS, CDC, Care.com annual surveys

// ─── EIA Series ──────────────────────────────────────────────────────────────
// US Energy Information Administration — free, no registration required.
// Use DEMO_KEY for basic access; set EIA_API_KEY in .env.local for higher limits.

export const EIA_SERIES = {
  /** US regular gasoline retail price — national average, weekly ($/gallon) */
  REGULAR_GASOLINE_US: "EMD_EPD2D_PTE_NUS_DPG",
} as const;

export const EIA_API_BASE = "https://api.eia.gov/v2/petroleum/pri/gnd/data/";
export const EIA_DEMO_KEY = "DEMO_KEY"; // EIA public demo key — 100 req/hr

// ─── BLS CES Series ──────────────────────────────────────────────────────────
// Consumer Expenditure Survey — average annual household expenditure.
// Values are annual totals; divide by 12 for monthly benchmarks.

export const BLS_CES_SERIES = {
  /** Food at home (groceries) — CEX annual household average */
  FOOD_AT_HOME:    "CXUFOODHOMELB0101M",
  /** Food away from home (restaurants/takeout) — CEX annual household average */
  FOOD_AWAY:       "CXUFOODAWAYLB0101M",
  /** Utilities, fuels, and public services — CEX annual household average */
  UTILITIES:       "CXUUTILHOSELB0101M",
} as const;

export const BLS_CES_API_BASE = "https://api.bls.gov/publicAPI/v2/timeseries/data";

// ─── Static Source References ─────────────────────────────────────────────────
// These are maintained manually from published annual surveys.
// The URL is the canonical source for each benchmark — check annually.

export const STATIC_SOURCES = {
  CHILDCARE: {
    key:    "childcareMonthlyUs",
    source: "HHS / Care.com 2025 Cost of Care Survey",
    url:    "https://www.care.com/c/how-much-does-child-care-cost/",
    notes:  "National average for center-based infant care, all states weighted",
  },
  SUBSCRIPTIONS: {
    key:    "subscriptionsMonthlyUs",
    source: "Chase / Forbes Advisor 2025 Subscription Spend Survey",
    url:    "https://www.forbes.com/advisor/banking/subscription-spending-statistics/",
    notes:  "Average household monthly spend across all digital subscriptions",
  },
  COFFEE: {
    key:    "coffeePerCupUs",
    source: "NCA National Coffee Data Trends 2025 / Numbeo US",
    url:    "https://ncausa.org/research-trends",
    notes:  "Average drip coffee / latte price at café, national composite",
  },
  CIGARETTES: {
    key:    "cigarettesPerPackUs",
    source: "CDC STATE System 2025 / American Lung Association",
    url:    "https://www.cdc.gov/statesystem/cigarettetax.html",
    notes:  "Weighted average including state and local excise taxes",
  },
  GROCERIES: {
    key:    "groceriesMonthlyUs",
    source: "USDA Official Food Plans 2025 (Moderate-cost, 2-adult household)",
    url:    "https://www.ers.usda.gov/data-products/food-price-outlook/",
    notes:  "2-adult household moderate-cost USDA plan, scaled to national average",
  },
} as const;

export type CostSeriesKey =
  | keyof typeof EIA_SERIES
  | keyof typeof BLS_CES_SERIES
  | keyof typeof STATIC_SOURCES;
