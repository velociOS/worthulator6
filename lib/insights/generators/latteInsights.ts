// ─── WorthCore Insight Engine — Latte Factor Generator ───────────────────────
//
// PURPOSE:
//   Deterministic insight rules for the "latte-factor" engine calculator.
//   Adds multi-horizon projections, monthly context, compound-growth framing,
//   and a "reduce-by-half" scenario beyond what the calculator already shows.
//
// CALCULATOR OUTPUT SCHEMA (from calculatorConfigs.ts "latte-factor"):
//   inputs:  dailySpend, annualReturn, years
//   outputs: investedValue, totalSpent, growth
//
// RULES:
//   ✅ Pure TypeScript — synchronous, deterministic, no side effects
//   ✅ Additional projections only (no recalculation of what the engine outputs)
//   ✅ All insight IDs are stable and unique: "latte.<rule-name>"
//   ❌ Never import React
//   ❌ Never call fetch() or async operations
//
// ─────────────────────────────────────────────────────────────────────────────

import { formatCurrency }    from "@/lib/insights/benchmarks";
import { futureValueAnnuity } from "@/lib/insights/projections";
import type { Insight }       from "@/lib/insights/types";

// ─── Rule thresholds ─────────────────────────────────────────────────────────

/** If compound growth exceeds total contributions → show compound power insight. */
const GROWTH_EXCEEDS_CONTRIBUTIONS_THRESHOLD = 100; // percent
/** Above $10/day → high daily spend warning. */
const HIGH_DAILY_SPEND = 10;
/** Minimum daily spend for "cut in half" scenario to be meaningful. */
const HALF_SPEND_MIN = 3;
/** If horizon < 20 years → show 20-year projection for contrast. */
const EXTENDED_HORIZON_THRESHOLD = 20;

// ─── Input / Output types ─────────────────────────────────────────────────────

export interface LatteInputs {
  dailySpend:   number;
  annualReturn: number;
  years:        number;
}

export interface LatteOutputs {
  investedValue: number;
  totalSpent:    number;
  growth:        number;
}

// ─── Generator ────────────────────────────────────────────────────────────────

/**
 * Generate all applicable latte-factor insights.
 * Focuses on: monthly cost context, compound growth framing, multi-horizon
 * projections, and the "reduce-by-half" opportunity scenario.
 *
 * @param inputs   Calculator inputs  (dailySpend, annualReturn, years)
 * @param outputs  Calculator outputs (investedValue, totalSpent, growth)
 */
export function generateLatteInsights(
  inputs: LatteInputs,
  outputs: LatteOutputs,
): Insight[] {
  if (inputs.dailySpend <= 0 || inputs.years <= 0) return [];

  const insights: Insight[] = [];

  const annualSpend  = Math.round(inputs.dailySpend * 365);
  const monthlySpend = Math.round(inputs.dailySpend * 30.4);

  // ── Rule 1: Monthly spend context ────────────────────────────────────────
  insights.push({
    id:       "latte.monthly-spend",
    category: "spending",
    severity: "neutral",
    title:    "Your habit in monthly terms",
    body:     `${formatCurrency(inputs.dailySpend)}/day adds up to ~${formatCurrency(monthlySpend)}/month and ${formatCurrency(annualSpend)}/year. Small daily habits compound into real budget line items — and compound interest turns them into much more.`,
    metric:   { label: "Monthly spend", value: formatCurrency(monthlySpend) },
  });

  // ── Rule 2: Compound growth power ────────────────────────────────────────
  if (outputs.totalSpent > 0) {
    const growthPercent = Math.round((outputs.growth / outputs.totalSpent) * 100);
    if (growthPercent >= GROWTH_EXCEEDS_CONTRIBUTIONS_THRESHOLD) {
      insights.push({
        id:       "latte.compound-growth",
        category: "investment",
        severity: "positive",
        title:    "Compounding multiplies every dollar",
        body:     `Over ${inputs.years} years, compound interest adds ${formatCurrency(outputs.growth)} — ${growthPercent}% on top of your ${formatCurrency(outputs.totalSpent)} in total contributions. At this horizon, the market does more work than you do.`,
        metric:   { label: "Compound gain", value: formatCurrency(outputs.growth) },
      });
    }
  }

  // ── Rule 3: Extended horizon projection (if years < 20) ──────────────────
  if (inputs.years < EXTENDED_HORIZON_THRESHOLD) {
    const twentyYearFV = Math.round(futureValueAnnuity(annualSpend, 20, inputs.annualReturn));
    insights.push({
      id:       "latte.20yr-projection",
      category: "projection",
      severity: "neutral",
      title:    "Extend to 20 years",
      body:     `Extend your horizon to 20 years and the same daily ${formatCurrency(inputs.dailySpend)} grows to ${formatCurrency(twentyYearFV)} — versus ${formatCurrency(outputs.investedValue)} at ${inputs.years} year${inputs.years === 1 ? "" : "s"}. Time is the most powerful variable in compounding.`,
      metric:   { label: "At 20 years", value: formatCurrency(twentyYearFV) },
    });
  }

  // ── Rule 4: 30-year projection (if years < 30) ────────────────────────────
  if (inputs.years < 30) {
    const thirtyYearFV = Math.round(futureValueAnnuity(annualSpend, 30, inputs.annualReturn));
    insights.push({
      id:       "latte.30yr-projection",
      category: "projection",
      severity: "neutral",
      title:    "30-year wealth potential",
      body:     `Over 30 years this habit — redirected to investing — would be worth ${formatCurrency(thirtyYearFV)}. That's enough to meaningfully supplement or replace a retirement account contribution.`,
      metric:   { label: "At 30 years", value: formatCurrency(thirtyYearFV) },
    });
  }

  // ── Rule 5: Reduce-by-half scenario ──────────────────────────────────────
  if (inputs.dailySpend > HALF_SPEND_MIN) {
    const halfSpend = inputs.dailySpend / 2;
    const halfFV    = Math.round(futureValueAnnuity(halfSpend * 365, inputs.years, inputs.annualReturn));
    insights.push({
      id:       "latte.half-spend-scenario",
      category: "opportunity-cost",
      severity: "neutral",
      title:    "Cut it in half",
      body:     `Cutting to ${formatCurrency(halfSpend)}/day and investing the difference still builds ${formatCurrency(halfFV)} over ${inputs.years} years. You keep the habit — just dial it back. The other half still grows significantly.`,
      metric:   { label: `Half-habit at ${inputs.years}yr`, value: formatCurrency(halfFV) },
    });
  }

  // ── Rule 6: High daily spend alert ────────────────────────────────────────
  if (inputs.dailySpend >= HIGH_DAILY_SPEND) {
    insights.push({
      id:       "latte.high-daily-spend",
      category: "warning",
      severity: "warning",
      title:    "High daily habit spend",
      body:     `${formatCurrency(inputs.dailySpend)}/day is above average for a single daily habit — that's ${formatCurrency(monthlySpend)}/month or ${formatCurrency(annualSpend)}/year. This likely reflects multiple purchases or premium items. Even moderate reductions compound significantly over time.`,
      metric:   { label: "Annual total", value: formatCurrency(annualSpend) },
    });
  }

  return insights;
}
