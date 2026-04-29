// ─── Shared tax-data interfaces ───────────────────────────────────────────────
// All versioned tax files (uk_2025.ts, us_2026.ts, etc.) conform to these shapes.

export interface UKTaxBand {
  label: string;
  /** Taxable income (after personal allowance) at which this band starts */
  from: number;
  /** Taxable income (after personal allowance) at which this band ends */
  to: number;
  rate: number;
}

export interface USTaxBracket {
  /** Taxable income up to this amount is taxed at `rate` */
  up: number;
  rate: number;
}

export interface UKTaxData {
  /** HMRC tax year label, e.g. "2026/27" */
  taxYear: string;
  personalAllowance: number;
  /** Upper earnings limit of basic-rate band (PA + 37,700 when PA is full) */
  basicRateLimit: number;
  /** Threshold above which additional rate (45%) applies */
  additionalThreshold: number;
  /** Income above this triggers the personal allowance taper */
  paTaperStart: number;
  /** Progressive income tax bands, applied to taxable income after PA */
  taxBands: UKTaxBand[];
  /** NI primary threshold — below this no employee NI is due */
  niPrimary: number;
  /** NI upper earnings limit */
  niUpper: number;
  /** Employee NI rate between primary and upper threshold */
  niMainRate: number;
  /** Employee NI rate above upper threshold */
  niUpperRate: number;
}

export interface USTaxData {
  /** IRS tax year label, e.g. "2026" */
  taxYear: string;
  bracketsSingle: USTaxBracket[];
  bracketsMarried: USTaxBracket[];
  /** Social Security wage base */
  ssWageBase: number;
  /** Employee Social Security rate (6.2%) */
  ssRate: number;
  /** Employee Medicare rate (1.45%) */
  medicareRate: number;
}
