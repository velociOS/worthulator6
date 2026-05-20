// ─── WorthCore Insight Engine — Commute Cost Generator ───────────────────────
//
// PURPOSE:
//   Deterministic insight rules for the "commute-cost" engine calculator.
//   Consumes commute inputs + outputs and produces structured Insight objects.
//
// CALCULATOR OUTPUT SCHEMA (from calculatorConfigs.ts "commute-cost"):
//   inputs:  milesOneWay, mpg, gasPrice, workDaysPerYear
//   outputs: annualCost, monthlyCost, costPerDay
//
// RULES:
//   ✅ Pure TypeScript — synchronous, deterministic, no side effects
//   ✅ Consumes outputs — NEVER runs new core calculations
//   ✅ All thresholds are constants with comments explaining source
//   ✅ All insight IDs are stable and unique: "commute.<rule-name>"
//   ❌ Never import React
//   ❌ Never call fetch() or async operations
//
// ─────────────────────────────────────────────────────────────────────────────

import {
  compareToNationalFuelAverage,
  compareToStateFuelAverage,
  formatCurrency,
  formatCurrencyPrecise,
} from "@/lib/insights/benchmarks";
import { futureValueAnnuity } from "@/lib/insights/projections";
import { getEnergyValue }     from "@/lib/dataStore";
import type { Insight, InsightContext } from "@/lib/insights/types";

// ─── Module-level WorthCore defaults ─────────────────────────────────────────
// WorthCore rule: getEnergyValue() MUST be called at module level only.
const ELECTRICITY_RATE = getEnergyValue("electricityPriceUs"); // 0.17 $/kWh

// ─── Rule thresholds (documented with sources) ───────────────────────────────
/** Above $4,000/yr → heavy commuter. Source: US commute cost studies. */
const ANNUAL_COST_HEAVY = 4_000;
/** Below $1,200/yr → light commuter (short distance or high MPG). */
const ANNUAL_COST_LIGHT = 1_200;
/** ±10% from national/state average → "above/below average" threshold. */
const FUEL_PRICE_DIFF_THRESHOLD = 10;
/** ±8% from state average → state comparison fires. */
const STATE_DIFF_THRESHOLD = 8;
/** Below 20 MPG → fuel economy drag insight. */
const LOW_MPG_THRESHOLD = 20;
/** EV savings must exceed $500/yr to be actionable. */
const EV_SAVINGS_MIN = 500;
/** Standard EV efficiency assumption. Source: EPA average 2024. */
const EV_KWH_PER_100_MILES = 30;

// ─── Input / Output types ─────────────────────────────────────────────────────
// Mirrors the "commute-cost" config exactly.

export interface CommuteInputs {
  milesOneWay:    number;
  mpg:            number;
  gasPrice:       number;
  workDaysPerYear: number;
}

export interface CommuteOutputs {
  annualCost:  number;
  monthlyCost: number;
  costPerDay:  number;
}

// ─── Generator ────────────────────────────────────────────────────────────────

/**
 * Generate all applicable commute cost insights for a given set of inputs
 * and outputs. Returns an empty array if no rules fire.
 *
 * @param inputs   Calculator inputs (mirrors commute-cost config)
 * @param outputs  Calculator outputs (annualCost, monthlyCost, costPerDay)
 * @param context  Optional — provides state for regional comparisons
 */
export function generateCommuteInsights(
  inputs: CommuteInputs,
  outputs: CommuteOutputs,
  context?: InsightContext,
): Insight[] {
  if (outputs.annualCost <= 0) return [];

  const insights: Insight[] = [];
  const totalMilesPerYear = inputs.milesOneWay * 2 * inputs.workDaysPerYear;

  // ── Rule 1: Annual cost tier ───────────────────────────────────────────────
  if (outputs.annualCost >= ANNUAL_COST_HEAVY) {
    insights.push({
      id:       "commute.high-annual-cost",
      category: "spending",
      severity: "warning",
      title:    "Heavy commuter fuel spend",
      body:     `Your commute costs ${formatCurrency(outputs.annualCost)}/year in fuel — above the $${ANNUAL_COST_HEAVY.toLocaleString()} threshold for high-cost commuters. At ${formatCurrency(outputs.monthlyCost)}/month, this is a significant fixed expense worth reviewing.`,
      metric:   { label: "Annual fuel cost", value: formatCurrency(outputs.annualCost) },
    });
  } else if (outputs.annualCost <= ANNUAL_COST_LIGHT) {
    insights.push({
      id:       "commute.low-annual-cost",
      category: "savings",
      severity: "positive",
      title:    "Efficient commute",
      body:     `At ${formatCurrency(outputs.annualCost)}/year your commute fuel cost is well below average. Your ${inputs.milesOneWay}-mile one-way distance and ${inputs.mpg} MPG vehicle are an effective combination.`,
      metric:   { label: "Annual fuel cost", value: formatCurrency(outputs.annualCost) },
    });
  }

  // ── Rule 2: Gas price vs national average ──────────────────────────────────
  const vsNational = compareToNationalFuelAverage(inputs.gasPrice);
  const natAbsDiff  = Math.abs(vsNational.absoluteDiff);
  const annualImpact = Math.round((natAbsDiff / inputs.gasPrice) * outputs.annualCost);

  if (vsNational.direction === "above" && vsNational.percentDiff >= FUEL_PRICE_DIFF_THRESHOLD) {
    insights.push({
      id:       "commute.above-national-fuel",
      category: "comparison",
      severity: "warning",
      title:    "Above-average fuel price",
      body:     `You're paying ${formatCurrencyPrecise(inputs.gasPrice)}/gal — ${vsNational.percentDiff.toFixed(0)}% above the national average of ${formatCurrencyPrecise(vsNational.reference)}. That extra cost adds roughly ${formatCurrency(annualImpact)}/year compared to an average-price driver on the same commute.`,
      metric:   { label: "vs. national avg", value: `+${vsNational.percentDiff.toFixed(0)}%` },
    });
  } else if (vsNational.direction === "below" && Math.abs(vsNational.percentDiff) >= FUEL_PRICE_DIFF_THRESHOLD) {
    insights.push({
      id:       "commute.below-national-fuel",
      category: "comparison",
      severity: "positive",
      title:    "Below-average fuel price",
      body:     `You're paying ${formatCurrencyPrecise(inputs.gasPrice)}/gal — ${Math.abs(vsNational.percentDiff).toFixed(0)}% below the national average of ${formatCurrencyPrecise(vsNational.reference)}. That saves roughly ${formatCurrency(annualImpact)}/year versus a driver paying the national average.`,
      metric:   { label: "vs. national avg", value: `-${Math.abs(vsNational.percentDiff).toFixed(0)}%` },
    });
  }

  // ── Rule 3: Gas price vs selected state average ────────────────────────────
  if (context?.state && context.state !== "National") {
    const vsState  = compareToStateFuelAverage(inputs.gasPrice, context.state);
    if (vsState.direction === "above" && vsState.percentDiff >= STATE_DIFF_THRESHOLD) {
      const stateImpact = Math.round((Math.abs(vsState.absoluteDiff) / inputs.gasPrice) * outputs.annualCost);
      insights.push({
        id:       "commute.above-state-fuel",
        category: "comparison",
        severity: "neutral",
        title:    `Above ${context.state} average`,
        body:     `${context.state}'s average is ${formatCurrencyPrecise(vsState.reference)}/gal — you're paying ${vsState.percentDiff.toFixed(0)}% more. Finding a station closer to the state average could save ~${formatCurrency(stateImpact)}/year.`,
        metric:   { label: `${context.state} avg`, value: formatCurrencyPrecise(vsState.reference) },
      });
    }
  }

  // ── Rule 4: EV switch opportunity ─────────────────────────────────────────
  const annualEvCost   = Math.round((totalMilesPerYear / 100) * EV_KWH_PER_100_MILES * ELECTRICITY_RATE);
  const evAnnualSavings = Math.round(outputs.annualCost - annualEvCost);

  if (evAnnualSavings > EV_SAVINGS_MIN) {
    insights.push({
      id:       "commute.ev-opportunity",
      category: "opportunity-cost",
      severity: "neutral",
      title:    "EV switch potential",
      body:     `Switching to an EV on this commute could reduce your fuel cost from ${formatCurrency(outputs.annualCost)} to ~${formatCurrency(annualEvCost)}/year (home charging at ${formatCurrencyPrecise(ELECTRICITY_RATE)}/kWh, 30 kWh/100mi). That's ${formatCurrency(evAnnualSavings)}/year in savings.`,
      metric:   { label: "Potential annual savings", value: formatCurrency(evAnnualSavings) },
    });
  }

  // ── Rule 5: 10-year opportunity cost ──────────────────────────────────────
  const tenYearFV      = Math.round(futureValueAnnuity(outputs.annualCost, 10));
  const tenYearGain    = tenYearFV - outputs.annualCost * 10;

  insights.push({
    id:       "commute.opportunity-cost-10yr",
    category: "opportunity-cost",
    severity: "neutral",
    title:    "10-year opportunity cost",
    body:     `Your annual fuel spend of ${formatCurrency(outputs.annualCost)} invested in an index fund would grow to ${formatCurrency(tenYearFV)} over 10 years — ${formatCurrency(Math.round(tenYearGain))} in compound gains above contributions.`,
    metric:   { label: "10-yr investment value", value: formatCurrency(tenYearFV) },
  });

  // ── Rule 6: Low MPG drag ──────────────────────────────────────────────────
  if (inputs.mpg < LOW_MPG_THRESHOLD) {
    const hypotheticalAnnual = Math.round((inputs.milesOneWay * 2 / 30) * inputs.gasPrice * inputs.workDaysPerYear);
    const mpgSavings         = outputs.annualCost - hypotheticalAnnual;
    insights.push({
      id:       "commute.low-mpg",
      category: "warning",
      severity: "warning",
      title:    "Fuel economy drag",
      body:     `At ${inputs.mpg} MPG your vehicle is below the 20 MPG efficiency threshold. Upgrading to a 30 MPG vehicle on this same commute would cost ~${formatCurrency(hypotheticalAnnual)}/year in fuel — saving ${formatCurrency(Math.round(mpgSavings))}/year.`,
      metric:   { label: "Current fuel economy", value: `${inputs.mpg} MPG` },
    });
  }

  return insights;
}
