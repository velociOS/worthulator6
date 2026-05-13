// ─── Investment Calculator Engine ────────────────────────────────────────────
// Strongly-typed compound growth engine supporting monthly/yearly contributions,
// inflation-adjusted projections, and milestone calculations.

export type CompoundFrequency = "monthly" | "quarterly" | "annually";

export interface InvestmentInputs {
  initialAmount: number;       // starting lump sum
  monthlyContribution: number; // added every month
  annualContribution: number;  // added once per year (e.g. bonus)
  annualReturnRate: number;    // % e.g. 7 = 7%
  years: number;               // investment duration
  inflationRate: number;       // % e.g. 2.5
  compoundFrequency: CompoundFrequency;
}

export interface YearlySnapshot {
  year: number;
  portfolioValue: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjustedValue: number;
  annualGrowth: number;        // gain in this year only
}

export interface MilestoneResult {
  amount: number;
  yearsToReach: number | null; // null = never reached within timeframe
  label: string;
}

export interface InvestmentResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjustedValue: number;
  wealthMultiplier: number;
  effectiveAnnualReturn: number;
  yearlySnapshots: YearlySnapshot[];
  milestones: MilestoneResult[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function periodsPerYear(freq: CompoundFrequency): number {
  return freq === "monthly" ? 12 : freq === "quarterly" ? 4 : 1;
}

// ─── Core engine ─────────────────────────────────────────────────────────────

export function calculateInvestment(inputs: InvestmentInputs): InvestmentResult {
  const {
    initialAmount,
    monthlyContribution,
    annualContribution,
    annualReturnRate,
    years,
    inflationRate,
    compoundFrequency,
  } = inputs;

  const n = periodsPerYear(compoundFrequency);
  const r = annualReturnRate / 100;
  const rPerPeriod = r / n;
  const monthsPerPeriod = 12 / n;

  const yearlySnapshots: YearlySnapshot[] = [];

  let balance = initialAmount;
  let totalContributions = initialAmount;
  let prevBalance = initialAmount;

  for (let year = 1; year <= years; year++) {
    // Apply compound periods within this year
    for (let period = 0; period < n; period++) {
      // Monthly contributions added each month within period
      balance += monthlyContribution * monthsPerPeriod;
      totalContributions += monthlyContribution * monthsPerPeriod;
      // Growth on balance
      balance *= 1 + rPerPeriod;
    }
    // Annual contribution at year-end
    balance += annualContribution;
    totalContributions += annualContribution;

    const totalInterest = balance - totalContributions;
    const inflationFactor = Math.pow(1 + inflationRate / 100, year);
    const inflationAdjustedValue = balance / inflationFactor;

    yearlySnapshots.push({
      year,
      portfolioValue: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalInterest),
      inflationAdjustedValue: Math.round(inflationAdjustedValue),
      annualGrowth: Math.round(balance - prevBalance),
    });

    prevBalance = balance;
  }

  const finalSnapshot = yearlySnapshots[yearlySnapshots.length - 1] ?? {
    portfolioValue: initialAmount,
    totalContributions: initialAmount,
    totalInterest: 0,
    inflationAdjustedValue: initialAmount,
    annualGrowth: 0,
  };

  const futureValue = finalSnapshot.portfolioValue;
  const finalContributions = finalSnapshot.totalContributions;
  const totalInterest = finalSnapshot.totalInterest;
  const inflationAdjustedValue = finalSnapshot.inflationAdjustedValue;
  const wealthMultiplier = finalContributions > 0 ? futureValue / finalContributions : 1;

  // Effective annual return (CAGR)
  const effectiveAnnualReturn =
    finalContributions > 0
      ? (Math.pow(futureValue / finalContributions, 1 / years) - 1) * 100
      : 0;

  // ── Milestones ──────────────────────────────────────────────────────────
  const MILESTONE_AMOUNTS = [10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000];
  const milestones: MilestoneResult[] = MILESTONE_AMOUNTS.map((amount) => {
    const snap = yearlySnapshots.find((s) => s.portfolioValue >= amount);
    return {
      amount,
      yearsToReach: snap ? snap.year : null,
      label:
        amount >= 1_000_000
          ? "Millionaire"
          : amount >= 500_000
          ? "$500k"
          : amount >= 250_000
          ? "$250k"
          : amount >= 100_000
          ? "$100k"
          : amount >= 50_000
          ? "$50k"
          : amount >= 25_000
          ? "$25k"
          : "$10k",
    };
  });

  return {
    futureValue,
    totalContributions: Math.round(finalContributions),
    totalInterest,
    inflationAdjustedValue,
    wealthMultiplier: Math.round(wealthMultiplier * 100) / 100,
    effectiveAnnualReturn: Math.round(effectiveAnnualReturn * 100) / 100,
    yearlySnapshots,
    milestones,
  };
}

// ─── What-if delta ────────────────────────────────────────────────────────────

export interface WhatIfScenario {
  label: string;
  description: string;
  emoji: string;
  mutate: (inputs: InvestmentInputs) => InvestmentInputs;
}

export const WHAT_IF_SCENARIOS: WhatIfScenario[] = [
  {
    label: "+$100/mo",
    description: "Invest $100 more each month",
    emoji: "💵",
    mutate: (i) => ({ ...i, monthlyContribution: i.monthlyContribution + 100 }),
  },
  {
    label: "+2% return",
    description: "Achieve 2% higher annual return",
    emoji: "📈",
    mutate: (i) => ({ ...i, annualReturnRate: i.annualReturnRate + 2 }),
  },
  {
    label: "+5 years",
    description: "Stay invested 5 years longer",
    emoji: "⏳",
    mutate: (i) => ({ ...i, years: i.years + 5 }),
  },
  {
    label: "No inflation",
    description: "Zero inflation scenario",
    emoji: "🛡️",
    mutate: (i) => ({ ...i, inflationRate: 0 }),
  },
  {
    label: "2× start",
    description: "Double your initial investment",
    emoji: "🚀",
    mutate: (i) => ({ ...i, initialAmount: i.initialAmount * 2 }),
  },
];

// ─── Format helpers ───────────────────────────────────────────────────────────

export function fmtCurrency(n: number, compact = false): string {
  if (!isFinite(n)) return "—";
  if (compact) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  }
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fmtPct(n: number): string {
  return `${n.toFixed(2)}%`;
}
