import type { USTaxData } from "./types";

/**
 * US federal income tax brackets for tax year 2026.
 * Source: IRS Revenue Procedure 2025-28 (inflation adjustments ~2.8% from 2025).
 *
 * TODO: Verify exact figures against the published Rev. Proc. when available.
 * SS wage base: confirm with SSA annual announcement (typically October).
 */
const us2026: USTaxData = {
  taxYear: "2026",
  bracketsSingle: [
    { up:  12_200,  rate: 0.10 },
    { up:  49_550,  rate: 0.12 },
    { up: 105_650,  rate: 0.22 },
    { up: 201_650,  rate: 0.24 },
    { up: 256_050,  rate: 0.32 },
    { up: 641_000,  rate: 0.35 },
    { up: Infinity, rate: 0.37 },
  ],
  bracketsMarried: [
    { up:  24_400,  rate: 0.10 },
    { up:  99_100,  rate: 0.12 },
    { up: 211_300,  rate: 0.22 },
    { up: 403_350,  rate: 0.24 },
    { up: 512_100,  rate: 0.32 },
    { up: 770_700,  rate: 0.35 },
    { up: Infinity, rate: 0.37 },
  ],
  ssWageBase:   180_000,  // approx — confirm with SSA
  ssRate:       0.062,
  medicareRate: 0.0145,
};

export default us2026;
