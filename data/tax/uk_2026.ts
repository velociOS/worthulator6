import type { UKTaxData } from "./types";

/**
 * UK income tax and National Insurance rates for tax year 2026/27
 * (6 April 2026 – 5 April 2027).
 *
 * All income tax thresholds remain frozen by HM Treasury until April 2028.
 * Employee NI rates are unchanged.
 * Source: Autumn Budget 2024 / Spring Statement 2025 — no threshold changes.
 */
const uk2026: UKTaxData = {
  taxYear: "2026/27",
  personalAllowance:    12_570,
  basicRateLimit:       50_270,
  additionalThreshold: 125_140,
  paTaperStart:        100_000,
  taxBands: [
    { label: "Basic Rate",      from: 0,       to: 37_700,   rate: 0.20 },
    { label: "Higher Rate",     from: 37_700,  to: 125_140,  rate: 0.40 },
    { label: "Additional Rate", from: 125_140, to: Infinity, rate: 0.45 },
  ],
  niPrimary:   12_570,
  niUpper:     50_270,
  niMainRate:  0.08,
  niUpperRate: 0.02,
};

export default uk2026;
