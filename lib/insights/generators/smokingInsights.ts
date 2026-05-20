// ─── WorthCore Insight Engine — Quit Smoking Generator ───────────────────────
//
// PURPOSE:
//   Deterministic insight rules for the "quit-smoking" engine calculator.
//   Celebrates quit milestones, benchmarks pack cost, and projects investment
//   opportunity from the money no longer spent on cigarettes.
//
// CALCULATOR OUTPUT SCHEMA (from calculatorConfigs.ts "quit-smoking"):
//   inputs:  packsPerDay, packCost, daysSinceQuit
//   outputs: moneySaved, cigarettesAvoided, daysOfLifeRegained
//
// RULES:
//   ✅ Pure TypeScript — synchronous, deterministic, no side effects
//   ✅ Consumes outputs — NEVER runs new core calculations
//   ✅ All insight IDs are stable and unique: "smoking.<rule-name>"
//   ❌ Never import React
//   ❌ Never call fetch() or async operations
//
// ─────────────────────────────────────────────────────────────────────────────

import {
  compareToNationalCigarettePrice,
  formatCurrency,
  formatCurrencyPrecise,
} from "@/lib/insights/benchmarks";
import { futureValueAnnuity } from "@/lib/insights/projections";
import type { Insight }       from "@/lib/insights/types";

// ─── Rule thresholds ─────────────────────────────────────────────────────────

/**
 * US average annual spend for a 1 pack/day smoker at the national average
 * pack price ($9.20). Source: usCostDataset.national.cigarettes × 365.
 * $9.20 × 365 = $3,358
 */
const AVG_ANNUAL_SMOKER_SPEND = Math.round(9.2 * 365); // $3,358

/** Pack cost 15%+ above national avg → regional price insight fires. */
const HIGH_PACK_PRICE_THRESHOLD = 15;

// ─── Input / Output types ─────────────────────────────────────────────────────

export interface SmokingInputs {
  packsPerDay:   number;
  packCost:      number;
  daysSinceQuit: number;
}

export interface SmokingOutputs {
  moneySaved:         number;
  cigarettesAvoided:  number;
  daysOfLifeRegained: number;
}

// ─── Generator ────────────────────────────────────────────────────────────────

/**
 * Generate all applicable smoking cessation insights.
 * Focuses on: annual savings context, investment projections, pack price
 * comparisons, and milestone recognition.
 *
 * @param inputs   Calculator inputs  (packsPerDay, packCost, daysSinceQuit)
 * @param outputs  Calculator outputs (moneySaved, cigarettesAvoided, daysOfLifeRegained)
 */
export function generateSmokingInsights(
  inputs: SmokingInputs,
  outputs: SmokingOutputs,
): Insight[] {
  if (outputs.moneySaved <= 0) return [];

  const insights: Insight[] = [];

  // Annual equivalent — what the habit was costing per year
  const annualSpend = Math.round(inputs.packsPerDay * inputs.packCost * 365);

  // ── Rule 1: Annual habit cost vs average ──────────────────────────────────
  if (annualSpend > AVG_ANNUAL_SMOKER_SPEND * 1.2) {
    insights.push({
      id:       "smoking.above-avg-annual-spend",
      category: "spending",
      severity: "warning",
      title:    "Above-average habit cost",
      body:     `Your habit was costing ${formatCurrency(annualSpend)}/year — above the US average of ${formatCurrency(AVG_ANNUAL_SMOKER_SPEND)}/year for a 1 pack/day smoker. Staying smoke-free keeps that entire amount in your pocket.`,
      metric:   { label: "Was costing per year", value: formatCurrency(annualSpend) },
    });
  } else {
    insights.push({
      id:       "smoking.annual-spend",
      category: "spending",
      severity: "neutral",
      title:    "Annual habit cost",
      body:     `Your habit was costing ${formatCurrency(annualSpend)}/year. The US average is ${formatCurrency(AVG_ANNUAL_SMOKER_SPEND)}/year for a 1 pack/day smoker at the national average price of $9.20/pack.`,
      metric:   { label: "Was costing per year", value: formatCurrency(annualSpend) },
    });
  }

  // ── Rule 2: 10-year investment projection of continued savings ─────────────
  const tenYearFV   = Math.round(futureValueAnnuity(annualSpend, 10));
  const tenYearGain = tenYearFV - annualSpend * 10;

  insights.push({
    id:       "smoking.investment-projection",
    category: "investment",
    severity: "positive",
    title:    "Your savings, invested",
    body:     `If you invest the ${formatCurrency(annualSpend)}/year you're no longer spending on cigarettes, it could grow to ${formatCurrency(tenYearFV)} in 10 years — ${formatCurrency(Math.round(tenYearGain))} in compound gains on top of your contributions.`,
    metric:   { label: "10-yr investment value", value: formatCurrency(tenYearFV) },
  });

  // ── Rule 3: Pack price vs national average ─────────────────────────────────
  const vsNational = compareToNationalCigarettePrice(inputs.packCost);
  if (vsNational.direction === "above" && vsNational.percentDiff >= HIGH_PACK_PRICE_THRESHOLD) {
    insights.push({
      id:       "smoking.above-avg-pack-price",
      category: "comparison",
      severity: "neutral",
      title:    "High pack cost area",
      body:     `At ${formatCurrencyPrecise(inputs.packCost)}/pack, your area is ${vsNational.percentDiff.toFixed(0)}% above the national average of ${formatCurrencyPrecise(vsNational.reference)}/pack. State excise taxes are the primary driver — quitting saves you even more than the average smoker.`,
      metric:   { label: "vs. national avg", value: `+${vsNational.percentDiff.toFixed(0)}%` },
    });
  }

  // ── Rule 4: Milestone recognition (ordered largest → smallest) ────────────
  if (inputs.daysSinceQuit >= 3_650) {
    insights.push({
      id:       "smoking.milestone-10yr",
      category: "savings",
      severity: "positive",
      title:    "10 years smoke-free",
      body:     `A decade without cigarettes is exceptional. Your lung cancer risk is now close to that of a lifetime non-smoker. You've avoided ${outputs.cigarettesAvoided.toLocaleString()} cigarettes and reclaimed ${outputs.daysOfLifeRegained.toFixed(1)} days of your life.`,
      metric:   { label: "Life regained", value: `${outputs.daysOfLifeRegained.toFixed(1)} days` },
    });
  } else if (inputs.daysSinceQuit >= 1_825) {
    insights.push({
      id:       "smoking.milestone-5yr",
      category: "savings",
      severity: "positive",
      title:    "5 years smoke-free",
      body:     `Five years is a landmark. Your heart disease risk is now close to that of a non-smoker. You've saved ${formatCurrency(outputs.moneySaved)} and avoided ${outputs.cigarettesAvoided.toLocaleString()} cigarettes — keep going.`,
      metric:   { label: "Money saved", value: formatCurrency(outputs.moneySaved) },
    });
  } else if (inputs.daysSinceQuit >= 365) {
    insights.push({
      id:       "smoking.milestone-1yr",
      category: "savings",
      severity: "positive",
      title:    "One year smoke-free",
      body:     `A full year without cigarettes — your risk of coronary heart disease is now half that of a smoker. You've already saved ${formatCurrency(outputs.moneySaved)} and avoided ${outputs.cigarettesAvoided.toLocaleString()} cigarettes.`,
      metric:   { label: "Saved so far", value: formatCurrency(outputs.moneySaved) },
    });
  } else if (inputs.daysSinceQuit >= 100) {
    insights.push({
      id:       "smoking.milestone-100d",
      category: "savings",
      severity: "positive",
      title:    "100 days smoke-free",
      body:     `Over 100 days in — the hardest cravings are behind you. You've saved ${formatCurrency(outputs.moneySaved)} and avoided ${outputs.cigarettesAvoided.toLocaleString()} cigarettes. Keep building momentum.`,
      metric:   { label: "Saved so far", value: formatCurrency(outputs.moneySaved) },
    });
  } else if (inputs.daysSinceQuit >= 30) {
    insights.push({
      id:       "smoking.milestone-30d",
      category: "savings",
      severity: "positive",
      title:    "One month smoke-free",
      body:     `One month down — physical cravings are significantly reduced. You've already saved ${formatCurrency(outputs.moneySaved)} and avoided ${outputs.cigarettesAvoided.toLocaleString()} cigarettes. The best is ahead.`,
      metric:   { label: "Already saved", value: formatCurrency(outputs.moneySaved) },
    });
  } else {
    insights.push({
      id:       "smoking.milestone-early",
      category: "savings",
      severity: "positive",
      title:    "Every day counts",
      body:     `${inputs.daysSinceQuit} days smoke-free — the first weeks are the hardest. You've already saved ${formatCurrency(outputs.moneySaved)} and avoided ${outputs.cigarettesAvoided.toLocaleString()} cigarettes. You're doing it.`,
      metric:   { label: "Saved so far", value: formatCurrency(outputs.moneySaved) },
    });
  }

  return insights;
}
