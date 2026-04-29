import type { UKTaxData } from "./types";

/**
 * UK income tax and National Insurance rates for tax year 2025/26
 * (6 April 2025 – 5 April 2026).
 *
 * All thresholds were frozen by HM Treasury.
 * Source: HMRC — Income Tax rates and allowances 2025/26.
 */
const uk2025: UKTaxData = {
  taxYear: "2025/26",
  personalAllowance:    12_570,
  basicRateLimit:       50_270,  // personal allowance + 37,700 basic-rate band
  additionalThreshold: 125_140,
  paTaperStart:        100_000,  // PA tapers £1 per £2 above this
  taxBands: [
    { label: "Basic Rate",      from: 0,       to: 37_700,   rate: 0.20 },
    { label: "Higher Rate",     from: 37_700,  to: 125_140,  rate: 0.40 },
    { label: "Additional Rate", from: 125_140, to: Infinity, rate: 0.45 },
  ],
  niPrimary:   12_570,
  niUpper:     50_270,
  niMainRate:  0.08,  // 8% on earnings £12,570–£50,270
  niUpperRate: 0.02,  // 2% above upper earnings limit
};

export default uk2025;
