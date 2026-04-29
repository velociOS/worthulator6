// ─── UK constants (2024/25) ───────────────────────────────────────────────────

export const UK_PERSONAL_ALLOWANCE     = 12_570;
export const UK_BASIC_RATE_LIMIT       = 50_270;  // PA + basic-rate band (37,700)
export const UK_ADDITIONAL_THRESHOLD   = 125_140;
export const UK_PA_TAPER_START         = 100_000; // PA taper starts here

export interface UKTaxBand {
  label: string;
  /** Taxable income (after PA) at which this band starts */
  from: number;
  /** Taxable income (after PA) at which this band ends */
  to: number;
  rate: number;
}

/** Income tax bands applied to taxable income (salary minus personal allowance) */
export const UK_TAX_BANDS: UKTaxBand[] = [
  { label: "Basic Rate",       from: 0,       to: 37_700,  rate: 0.20 },
  { label: "Higher Rate",      from: 37_700,  to: 125_140, rate: 0.40 },
  { label: "Additional Rate",  from: 125_140, to: Infinity, rate: 0.45 },
];

export const UK_NI_PRIMARY    = 12_570;
export const UK_NI_UPPER      = 50_270;
export const UK_NI_MAIN_RATE  = 0.08;  // 8% on earnings between primary and upper threshold (2024/25)
export const UK_NI_UPPER_RATE = 0.02;  // 2% above upper earnings limit

// ─── US constants (2024) ──────────────────────────────────────────────────────

export interface USTaxBracket {
  /** Taxable income up to this amount is taxed at this rate */
  up: number;
  rate: number;
}

export const US_BRACKETS_SINGLE: USTaxBracket[] = [
  { up: 11_600,   rate: 0.10 },
  { up: 47_150,   rate: 0.12 },
  { up: 100_525,  rate: 0.22 },
  { up: 191_950,  rate: 0.24 },
  { up: 243_725,  rate: 0.32 },
  { up: 609_350,  rate: 0.35 },
  { up: Infinity, rate: 0.37 },
];

export const US_BRACKETS_MARRIED: USTaxBracket[] = [
  { up: 23_200,   rate: 0.10 },
  { up: 94_300,   rate: 0.12 },
  { up: 201_050,  rate: 0.22 },
  { up: 383_900,  rate: 0.24 },
  { up: 487_450,  rate: 0.32 },
  { up: 731_200,  rate: 0.35 },
  { up: Infinity, rate: 0.37 },
];

/** Social Security wage base (2024) */
export const US_SS_WAGE_BASE  = 168_600;
export const US_SS_RATE       = 0.062;   // 6.2% employee share
export const US_MEDICARE_RATE = 0.0145;  // 1.45% employee share

// ─── Salary quick-picks ───────────────────────────────────────────────────────

export const UK_SALARY_PICKS = [25_000, 35_000, 50_000, 75_000, 100_000];
export const US_SALARY_PICKS = [40_000, 60_000, 80_000, 100_000, 150_000];
