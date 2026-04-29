import type { USTaxData } from "./types";

/**
 * US federal income tax brackets for tax year 2025.
 * Source: IRS Revenue Procedure 2024-40.
 *
 * Note: this calculator applies brackets to income after 401(k) deduction.
 * The IRS standard deduction ($15,000 single / $30,000 married) is not applied
 * here — results are estimates for salary planning, not tax-return preparation.
 */
const us2025: USTaxData = {
  taxYear: "2025",
  bracketsSingle: [
    { up:  11_925,  rate: 0.10 },
    { up:  48_475,  rate: 0.12 },
    { up: 103_350,  rate: 0.22 },
    { up: 197_300,  rate: 0.24 },
    { up: 250_525,  rate: 0.32 },
    { up: 626_350,  rate: 0.35 },
    { up: Infinity, rate: 0.37 },
  ],
  bracketsMarried: [
    { up:  23_850,  rate: 0.10 },
    { up:  96_950,  rate: 0.12 },
    { up: 206_700,  rate: 0.22 },
    { up: 394_600,  rate: 0.24 },
    { up: 501_050,  rate: 0.32 },
    { up: 751_600,  rate: 0.35 },
    { up: Infinity, rate: 0.37 },
  ],
  ssWageBase:   176_100,  // Social Security wage base 2025
  ssRate:       0.062,    // 6.2% employee share
  medicareRate: 0.0145,   // 1.45% employee share
};

export default us2025;
