// ─── Passive Income Engine — Multi-stream calculation module ─────────────────
//
// All inputs are plain numbers. No currency logic, no React, no formatting.
// Import asset-type defaults from @/data/finance/defaults.

import type { StreamType, IncomeModel } from "@/data/finance/defaults";
import { ASSET_TYPES } from "@/data/finance/defaults";

// ─── Multi-stream types ───────────────────────────────────────────────────────

export interface PassiveIncomeStream {
  id: string;
  type: StreamType;
  label: string;
  /**
   * "direct"  → user provides monthlyIncome directly (e.g. existing rent)
   * "growth"  → income is calculated from portfolio FV + withdrawal rate
   */
  mode: "direct" | "growth";
  /** Used when mode === "direct". The known monthly income from this source. */
  monthlyIncome: number;
  /** Used when mode === "growth": starting capital */
  initialInvestment: number;
  /** Used when mode === "growth": monthly additional investment */
  monthlyContribution: number;
  /** Nominal annual capital-growth return, e.g. 7 for 7% */
  annualReturn: number;
  /** Annual income yield, e.g. 5 for 5%. Used by fixed_yield / hybrid models. */
  yieldRate: number;
  incomeModel: IncomeModel;
}

export interface StreamResult {
  id: string;
  portfolioValue: number;
  monthlyIncome: number;
  annualIncome: number;
  totalContributed: number;
  growth: number;
  growthPct: number;
}

export interface PortfolioInputs {
  streams: PassiveIncomeStream[];
  years: number;
  /** Safe withdrawal rate, e.g. 4 for 4% */
  withdrawalRate: number;
  /** Annual inflation, e.g. 2.5 */
  inflationRate: number;
  /**
   * Monthly passive income target.
   * 0 = not set (yearsToFreedom will be 0 in the result).
   */
  targetMonthlyIncome: number;
}

export interface PortfolioResult {
  streams: StreamResult[];
  totalPortfolioValue: number;
  totalMonthlyIncome: number;
  totalAnnualIncome: number;
  inflationAdjustedValue: number;
  totalContributed: number;
  totalGrowth: number;
  /**
   * 0  → no target set
   * 999 → not reachable within 40 years
   * else → decimal years to reach the monthly income target
   */
  yearsToFreedom: number;
  /** True if at least one stream uses growth mode */
  hasGrowthStreams: boolean;
  /** True if at least one stream uses direct income input */
  hasDirectStreams: boolean;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function fv(
  initialInvestment: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number,
): number {
  const P = Math.max(0, initialInvestment);
  const PMT = Math.max(0, monthlyContribution);
  const r = Math.max(0, annualReturn) / 100 / 12;
  const n = Math.max(0, years) * 12;
  if (r === 0) return P + PMT * n;
  return P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
}

function streamMonthlyIncome(
  portfolioValue: number,
  withdrawalRate: number,
  yieldRate: number,
  incomeModel: IncomeModel,
): number {
  switch (incomeModel) {
    case "fixed_yield":
      return (portfolioValue * yieldRate) / 100 / 12;
    case "hybrid":
      return (portfolioValue * ((withdrawalRate + yieldRate) / 2)) / 100 / 12;
    case "compound":
    default:
      return (portfolioValue * withdrawalRate) / 100 / 12;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function calculateStream(
  stream: PassiveIncomeStream,
  years: number,
  withdrawalRate: number,
): StreamResult {
  // ── Direct income mode: use the known monthly amount ──────────────────────
  if (stream.mode === "direct") {
    const income = Math.max(0, stream.monthlyIncome);
    return {
      id: stream.id,
      portfolioValue: 0,
      monthlyIncome: income,
      annualIncome: income * 12,
      totalContributed: 0,
      growth: 0,
      growthPct: 0,
    };
  }

  // ── Growth mode: FV-based calculation ─────────────────────────────────────
  const resolvedYield =
    stream.yieldRate > 0
      ? stream.yieldRate
      : ASSET_TYPES[stream.type].defaultYieldRate;

  const portfolioValue = fv(
    stream.initialInvestment,
    stream.monthlyContribution,
    stream.annualReturn,
    years,
  );

  const n = Math.max(0, years) * 12;
  const totalContributed =
    Math.max(0, stream.initialInvestment) +
    Math.max(0, stream.monthlyContribution) * n;
  const growth = Math.max(0, portfolioValue - totalContributed);
  const growthPct =
    totalContributed > 0 ? (growth / totalContributed) * 100 : 0;

  const monthlyIncome = Math.max(
    0,
    streamMonthlyIncome(
      portfolioValue,
      withdrawalRate,
      resolvedYield,
      stream.incomeModel,
    ),
  );

  return {
    id: stream.id,
    portfolioValue: Math.max(0, portfolioValue),
    monthlyIncome,
    annualIncome: monthlyIncome * 12,
    totalContributed,
    growth,
    growthPct,
  };
}

export function calculatePortfolio(inputs: PortfolioInputs): PortfolioResult {
  const { streams, years, withdrawalRate, inflationRate, targetMonthlyIncome } =
    inputs;

  const streamResults = streams.map((s) =>
    calculateStream(s, years, withdrawalRate),
  );

  const totalPortfolioValue = streamResults.reduce(
    (sum, r) => sum + r.portfolioValue,
    0,
  );
  const totalMonthlyIncome = streamResults.reduce(
    (sum, r) => sum + r.monthlyIncome,
    0,
  );
  const totalContributed = streamResults.reduce(
    (sum, r) => sum + r.totalContributed,
    0,
  );
  const totalGrowth = streamResults.reduce((sum, r) => sum + r.growth, 0);

  const inflationAdjustedValue =
    inflationRate > 0
      ? totalPortfolioValue / Math.pow(1 + inflationRate / 100, years)
      : totalPortfolioValue;

  // ── Time to financial freedom (month-by-month simulation) ─────────────────
  let yearsToFreedom = 0;
  if (targetMonthlyIncome > 0 && streams.length > 0) {
    // Direct income streams contribute a fixed amount regardless of time
    const directBase = streams
      .filter((s) => s.mode === "direct")
      .reduce((sum, s) => sum + Math.max(0, s.monthlyIncome), 0);

    if (directBase >= targetMonthlyIncome) {
      // Already at target from direct income alone
      yearsToFreedom = 0.01;
    } else {
      yearsToFreedom = 999;
      for (let m = 1; m <= 480; m++) {
        const yrs = m / 12;
        const totalIncome = streams.reduce((sum, s) => {
          if (s.mode === "direct") return sum + Math.max(0, s.monthlyIncome);
          const resolvedYield =
            s.yieldRate > 0 ? s.yieldRate : ASSET_TYPES[s.type].defaultYieldRate;
          const portfolioValue = fv(
            s.initialInvestment,
            s.monthlyContribution,
            s.annualReturn,
            yrs,
          );
          return (
            sum +
            Math.max(
              0,
              streamMonthlyIncome(
                portfolioValue,
                withdrawalRate,
                resolvedYield,
                s.incomeModel,
              ),
            )
          );
        }, 0);

        if (totalIncome >= targetMonthlyIncome) {
          yearsToFreedom = yrs;
          break;
        }
      }
    }
  }

  return {
    streams: streamResults,
    totalPortfolioValue,
    totalMonthlyIncome,
    totalAnnualIncome: totalMonthlyIncome * 12,
    inflationAdjustedValue,
    totalContributed,
    totalGrowth,
    yearsToFreedom,
    hasGrowthStreams: streams.some((s) => s.mode === "growth"),
    hasDirectStreams: streams.some((s) => s.mode === "direct"),
  };
}

// ─── Backwards-compatible single-stream API ───────────────────────────────────

export interface PassiveIncomeInputs {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  years: number;
  withdrawalRate: number;
  inflationRate: number;
  targetMonthlyIncome: number;
}

export interface PassiveIncomeOutputs {
  portfolioValue: number;
  inflationAdjustedValue: number;
  monthlyPassiveIncome: number;
  annualPassiveIncome: number;
  totalContributed: number;
  totalGrowth: number;
  yearsToGoal: number;
}

export function calculatePassiveIncome(
  inputs: PassiveIncomeInputs,
): PassiveIncomeOutputs {
  const result = calculatePortfolio({
    streams: [
      {
        id: "single",
        type: "investment",
        label: "Portfolio",
        mode: "growth",
        monthlyIncome: 0,
        initialInvestment: inputs.initialInvestment,
        monthlyContribution: inputs.monthlyContribution,
        annualReturn: inputs.annualReturn,
        yieldRate: 0,
        incomeModel: "compound",
      },
    ],
    years: inputs.years,
    withdrawalRate: inputs.withdrawalRate,
    inflationRate: inputs.inflationRate,
    targetMonthlyIncome: inputs.targetMonthlyIncome,
  });

  return {
    portfolioValue: result.totalPortfolioValue,
    inflationAdjustedValue: result.inflationAdjustedValue,
    monthlyPassiveIncome: result.totalMonthlyIncome,
    annualPassiveIncome: result.totalAnnualIncome,
    totalContributed: result.totalContributed,
    totalGrowth: result.totalGrowth,
    yearsToGoal: result.yearsToFreedom,
  };
}
