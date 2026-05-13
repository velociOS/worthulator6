// ─── Inflation Calculator Engine ──────────────────────────────────────────────
// Reusable across: inflation, retirement, salary comparison, purchasing power,
// and investment calculators. All helpers are individually exportable.

// ─── Constants ────────────────────────────────────────────────────────────────

export const HISTORICAL_US_AVG_RATE = 3.2;  // Post-war US CPI average
export const FED_TARGET_RATE        = 2.0;  // Federal Reserve target
export const RECENT_10YR_RATE       = 3.8;  // 2014–2024 US average

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InflationInputs {
  amount: number;
  startYear: number;
  endYear: number;
  inflationRate: number;       // annual %
  monthlyContribution?: number;
}

export interface YearDataPoint {
  year: number;
  nominal: number;             // original amount (unchanged)
  real: number;                // purchasing power in start-year dollars
  purchasingPowerPct: number;  // % of original power remaining
}

export interface FutureProjectionPoint {
  year: number;
  nominalCost: number;         // what today's amount costs in that future year
  realValue: number;           // real value if held as cash
}

export interface ScenarioComparison {
  name: string;
  rate: number;
  realValue: number;
  powerPct: number;
  powerLoss: number;
  color: string;
}

export interface RealWorldItem {
  name: string;
  emoji: string;
  category: string;
  baseYear: number;
  basePrice: number;
  historicalGrowthRate: number;
  unit: string;
}

export interface RealWorldPricePoint {
  item: RealWorldItem;
  priceAtStart: number;
  priceAtEnd: number;
  changePct: number;
  changeDollars: number;
}

export interface InflationResult {
  // Primary outputs
  realValue: number;              // purchasing power in start-year $
  equivalentNeeded: number;       // $ needed at endYear to match original
  purchasingPowerLoss: number;    // $ eroded
  purchasingPowerPct: number;     // % of purchasing power remaining
  totalInflationPct: number;      // cumulative %

  // Time metrics
  yearsSpanned: number;
  annualImpact: number;           // avg $ of purchasing power lost per year
  yearsToDouble: number;          // when prices double at this rate
  yearsToHalvePower: number;      // same — power halves when prices double

  // Monthly contribution scenario
  totalContributed: number;
  totalNominal: number;
  totalRealWithContributions: number;

  // Chart data
  yearlyData: YearDataPoint[];
  futureProjection: FutureProjectionPoint[];
  scenarios: ScenarioComparison[];
  realWorldComparisons: RealWorldPricePoint[];

  isValid: boolean;
}

// ─── Real world price baselines (US, base year 2000) ─────────────────────────

export const REAL_WORLD_ITEMS: RealWorldItem[] = [
  {
    name: "Cup of coffee",
    emoji: "☕",
    category: "Food & Drink",
    baseYear: 2000,
    basePrice: 1.50,
    historicalGrowthRate: 4.1,
    unit: "large cup",
  },
  {
    name: "Gallon of gas",
    emoji: "⛽",
    category: "Transport",
    baseYear: 2000,
    basePrice: 1.47,
    historicalGrowthRate: 3.8,
    unit: "regular unleaded",
  },
  {
    name: "Movie ticket",
    emoji: "🎬",
    category: "Entertainment",
    baseYear: 2000,
    basePrice: 5.39,
    historicalGrowthRate: 3.9,
    unit: "avg ticket",
  },
  {
    name: "Loaf of bread",
    emoji: "🍞",
    category: "Groceries",
    baseYear: 2000,
    basePrice: 1.00,
    historicalGrowthRate: 3.1,
    unit: "white sliced",
  },
  {
    name: "Monthly rent",
    emoji: "🏠",
    category: "Housing",
    baseYear: 2000,
    basePrice: 700,
    historicalGrowthRate: 5.8,
    unit: "avg 1-BR",
  },
  {
    name: "College tuition",
    emoji: "🎓",
    category: "Education",
    baseYear: 2000,
    basePrice: 3500,
    historicalGrowthRate: 5.4,
    unit: "per semester",
  },
];

// ─── Pure calculation helpers (reusable by other engines) ─────────────────────

/** Inflation-adjusted value: what `amount` from `startYear` is worth in start-year dollars at `endYear` */
export function adjustedPurchasingPower(amount: number, rate: number, years: number): number {
  return amount / Math.pow(1 + rate / 100, years);
}

/** Equivalent needed: how much you'd need at endYear to match original purchasing power */
export function equivalentFutureAmount(amount: number, rate: number, years: number): number {
  return amount * Math.pow(1 + rate / 100, years);
}

/** Years for prices to double at given annual rate (Rule of 70 / exact) */
export function yearsToDoubleAtRate(rate: number): number {
  if (rate <= 0) return Infinity;
  return Math.log(2) / Math.log(1 + rate / 100);
}

/** Estimated price of a real-world item in a given year using historical growth */
export function estimatedPriceInYear(item: RealWorldItem, year: number): number {
  const n = year - item.baseYear; // handles negative (before baseYear)
  return item.basePrice * Math.pow(1 + item.historicalGrowthRate / 100, n);
}

/** Real salary needed in endYear to match startYear purchasing power */
export function salaryNeededForEquivalentPower(salary: number, rate: number, years: number): number {
  return equivalentFutureAmount(salary, rate, years);
}

// ─── Main engine ──────────────────────────────────────────────────────────────

export function calculateInflation(inputs: InflationInputs): InflationResult {
  const {
    amount,
    startYear,
    endYear,
    inflationRate,
    monthlyContribution = 0,
  } = inputs;

  const years = endYear - startYear;
  const r     = inflationRate / 100;
  const isValid = amount > 0 && years > 0 && inflationRate >= 0;

  const _yearsToDouble = yearsToDoubleAtRate(inflationRate);

  if (!isValid) {
    return {
      realValue: amount,
      equivalentNeeded: amount,
      purchasingPowerLoss: 0,
      purchasingPowerPct: 100,
      totalInflationPct: 0,
      yearsSpanned: Math.max(0, years),
      annualImpact: 0,
      yearsToDouble: _yearsToDouble,
      yearsToHalvePower: _yearsToDouble,
      totalContributed: 0,
      totalNominal: amount,
      totalRealWithContributions: amount,
      yearlyData: [],
      futureProjection: [],
      scenarios: [],
      realWorldComparisons: [],
      isValid: false,
    };
  }

  const factor               = Math.pow(1 + r, years);
  const realValue            = amount / factor;
  const equivalentNeeded     = amount * factor;
  const purchasingPowerLoss  = amount - realValue;
  const purchasingPowerPct   = (realValue / amount) * 100;
  const totalInflationPct    = (factor - 1) * 100;
  const annualImpact         = purchasingPowerLoss / years;

  // Monthly contribution total (simplified: all deposited today)
  const totalContributed              = monthlyContribution * 12 * years;
  const totalNominal                  = amount + totalContributed;
  const totalRealWithContributions    = totalNominal / factor;

  // Year-by-year series
  const yearlyData: YearDataPoint[] = [];
  for (let y = startYear; y <= endYear; y++) {
    const n = y - startYear;
    const f = Math.pow(1 + r, n);
    yearlyData.push({
      year: y,
      nominal: amount,
      real: Math.round((amount / f) * 100) / 100,
      purchasingPowerPct: Math.round((100 / f) * 10) / 10,
    });
  }

  // Future projection (20 years beyond endYear)
  const futureProjection: FutureProjectionPoint[] = [];
  for (let i = 0; i <= 20; i++) {
    const f = Math.pow(1 + r, i);
    futureProjection.push({
      year: endYear + i,
      nominalCost: Math.round(amount * f),
      realValue: Math.round(amount / f),
    });
  }

  // Scenario comparisons at standard rates
  const SCENARIO_RATES = [
    { name: "1% (Low)",          rate: 1,   color: "#34d399" },
    { name: "2% (Fed Target)",   rate: 2,   color: "#22d3ee" },
    { name: "3.2% (US Avg)",     rate: 3.2, color: "#a78bfa" },
    { name: "5% (High)",         rate: 5,   color: "#f59e0b" },
    { name: "8% (Very High)",    rate: 8,   color: "#ef4444" },
  ];

  const scenarios: ScenarioComparison[] = SCENARIO_RATES.map((s) => {
    const f  = Math.pow(1 + s.rate / 100, years);
    const rv = amount / f;
    return {
      name:      s.name,
      rate:      s.rate,
      realValue: Math.round(rv * 100) / 100,
      powerPct:  Math.round((rv / amount) * 1000) / 10,
      powerLoss: Math.round((amount - rv) * 100) / 100,
      color:     s.color,
    };
  });

  // Real world price comparisons (based on historical item growth rates, not user's rate)
  const realWorldComparisons: RealWorldPricePoint[] = REAL_WORLD_ITEMS.map((item) => {
    const ps = estimatedPriceInYear(item, startYear);
    const pe = estimatedPriceInYear(item, endYear);
    return {
      item,
      priceAtStart:  Math.round(ps * 100) / 100,
      priceAtEnd:    Math.round(pe * 100) / 100,
      changePct:     Math.round(((pe - ps) / ps) * 1000) / 10,
      changeDollars: Math.round((pe - ps) * 100) / 100,
    };
  });

  return {
    realValue,
    equivalentNeeded,
    purchasingPowerLoss,
    purchasingPowerPct,
    totalInflationPct,
    yearsSpanned: years,
    annualImpact,
    yearsToDouble: _yearsToDouble,
    yearsToHalvePower: _yearsToDouble,
    totalContributed,
    totalNominal,
    totalRealWithContributions,
    yearlyData,
    futureProjection,
    scenarios,
    realWorldComparisons,
    isValid,
  };
}
