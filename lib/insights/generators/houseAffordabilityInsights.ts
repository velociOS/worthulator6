// ─── WorthCore Insight Engine — House Affordability Generator ────────────────
//
// PURPOSE:
//   Deterministic insight rules for the "house-affordability-calculator".
//   Surfaces affordability tier, down payment adequacy, interest burden,
//   rate sensitivity, and monetization CTAs at the right moments.
//
// CALCULATOR OUTPUT SCHEMA (from calculatorConfigs.ts):
//   inputs:  income, downPayment, rate, term
//   outputs: maxHomePrice, monthlyBudget,
//            loanAmount, totalInterestEstimate, totalCostEstimate,
//            affordabilityRatio, downPaymentRatio, annualMortgageBurden
//
// RULES:
//   ✅ Pure TypeScript — synchronous, deterministic, no side effects
//   ✅ All thresholds documented with sources
//   ✅ All insight IDs stable: "homeafford.<rule-name>"
//   ❌ Never import React
//   ❌ Never call fetch() or async operations
//
// ─────────────────────────────────────────────────────────────────────────────

import { formatCurrency }  from "@/lib/insights/benchmarks";
import type { Insight }    from "@/lib/insights/types";

// ─── Rule thresholds (documented with sources) ────────────────────────────────

/** Price-to-annual-income < 3× → healthy affordability. Source: conventional lending guidelines. */
const AFFORDABILITY_HEALTHY   = 3;
/** Price-to-annual-income 3–5× → moderate stretch. */
const AFFORDABILITY_MODERATE  = 5;
/** Price-to-annual-income > 5× → financially stretched. */
const AFFORDABILITY_STRETCHED = 5;

/** Down payment < 10% → PMI + underwater risk. */
const DOWN_PAYMENT_LOW        = 10;
/** Down payment ≥ 20% → avoids PMI, strong equity position. */
const DOWN_PAYMENT_STRONG     = 20;

/** Total interest > 60% of purchase price → high-interest-burden warning. */
const INTEREST_BURDEN_THRESHOLD = 60;

/** Rate ≥ 7.5% → elevated rate — refinance potential when rates drop. */
const ELEVATED_RATE_THRESHOLD  = 7.5;

/** Monthly budget leaving < 5% headroom above 28% rule → tight margin. */
const TIGHT_MARGIN_INCOME_RATIO = 0.28;

// ─── Input / Output types ─────────────────────────────────────────────────────

export interface HouseAffordabilityInputs {
  income:      number;
  downPayment: number;
  rate:        number;
  term:        number;
}

export interface HouseAffordabilityOutputs {
  maxHomePrice:          number;
  monthlyBudget:         number;
  /** Phase 6D intelligence outputs */
  loanAmount?:           number;
  totalInterestEstimate?: number;
  totalCostEstimate?:    number;
  affordabilityRatio?:   number;
  downPaymentRatio?:     number;
  annualMortgageBurden?: number;
}

// ─── Generator ────────────────────────────────────────────────────────────────

/**
 * Generate all applicable house affordability insights.
 * Focuses on: affordability tier, down payment adequacy,
 * interest burden over loan life, rate sensitivity, and monetization signals.
 *
 * @param inputs   Calculator inputs
 * @param outputs  Calculator outputs (including Phase 6D intelligence fields)
 */
export function generateHouseAffordabilityInsights(
  inputs:  HouseAffordabilityInputs,
  outputs: HouseAffordabilityOutputs,
): Insight[] {
  if (outputs.maxHomePrice <= 0 || outputs.monthlyBudget <= 0) return [];

  const insights: Insight[] = [];

  const loanAmount    = outputs.loanAmount    ?? Math.round(outputs.maxHomePrice - inputs.downPayment);
  const annualIncome  = inputs.income * 12;
  const affordRatio   = outputs.affordabilityRatio
    ?? (annualIncome > 0 ? Math.round((outputs.maxHomePrice / annualIncome) * 100) / 100 : 0);
  const downPctRatio  = outputs.downPaymentRatio
    ?? (outputs.maxHomePrice > 0 ? Math.round((inputs.downPayment / outputs.maxHomePrice) * 1000) / 10 : 0);
  const totalInterest = outputs.totalInterestEstimate ?? 0;

  // ── Rule 1: Affordability tier ────────────────────────────────────────────
  if (affordRatio > 0 && affordRatio <= AFFORDABILITY_HEALTHY) {
    insights.push({
      id:       "homeafford.healthy-ratio",
      category: "savings",
      severity: "positive",
      title:    "Healthy affordability ratio",
      body:     `At ${affordRatio}× your annual income, this home price is within the conventionally safe zone (under 3×). You have financial flexibility — you're not house-poor at this price point.`,
      metric:   { label: "Price-to-income ratio", value: `${affordRatio}×` },
    });
  } else if (affordRatio > AFFORDABILITY_HEALTHY && affordRatio <= AFFORDABILITY_MODERATE) {
    insights.push({
      id:       "homeafford.moderate-ratio",
      category: "spending",
      severity: "neutral",
      title:    "Moderate affordability stretch",
      body:     `At ${affordRatio}× your annual income, this home is affordable but represents a meaningful stretch. The conventional guideline is under 3×. You can manage this, but there's limited cushion for rate increases or income changes.`,
      metric:   { label: "Price-to-income ratio", value: `${affordRatio}×` },
    });
  } else if (affordRatio > AFFORDABILITY_STRETCHED) {
    insights.push({
      id:       "homeafford.stretched-ratio",
      category: "spending",
      severity: "warning",
      title:    "Affordability is stretched",
      body:     `At ${affordRatio}× your annual income, this home price is above the 5× caution threshold. This level of commitment leaves limited margin for unexpected costs, rate adjustments, or income disruption. Consider a lower price point or increasing your down payment to reduce the loan.`,
      metric:   { label: "Price-to-income ratio", value: `${affordRatio}×` },
    });
  }

  // ── Rule 2: Down payment adequacy ─────────────────────────────────────────
  if (downPctRatio < DOWN_PAYMENT_LOW && inputs.downPayment >= 0) {
    insights.push({
      id:       "homeafford.low-down-payment",
      category: "warning",
      severity: "warning",
      title:    "Down payment below 10% — PMI likely",
      body:     `A ${downPctRatio.toFixed(1)}% down payment will trigger Private Mortgage Insurance (PMI), typically $50–$200/month on top of your payment. It also means you start with minimal equity — if home values dip, you could be underwater. Aiming for 20% down eliminates PMI and lowers your rate.`,
      metric:   { label: "Down payment", value: `${downPctRatio.toFixed(1)}%` },
    });
  } else if (downPctRatio >= DOWN_PAYMENT_STRONG) {
    insights.push({
      id:       "homeafford.strong-down-payment",
      category: "savings",
      severity: "positive",
      title:    "Strong down payment — no PMI",
      body:     `A ${downPctRatio.toFixed(1)}% down payment on ${formatCurrency(outputs.maxHomePrice)} avoids PMI, gives you immediate equity, and typically qualifies you for a lower interest rate. This is a financially sound position to buy from.`,
      metric:   { label: "Down payment", value: `${downPctRatio.toFixed(1)}%` },
    });
  }

  // ── Rule 3: Interest burden over loan life ────────────────────────────────
  if (totalInterest > 0 && outputs.maxHomePrice > 0) {
    const interestAsPctOfPrice = Math.round((totalInterest / outputs.maxHomePrice) * 100);
    if (interestAsPctOfPrice >= INTEREST_BURDEN_THRESHOLD) {
      insights.push({
        id:       "homeafford.interest-burden",
        category: "spending",
        severity: "neutral",
        title:    `You'll pay ${interestAsPctOfPrice}% of the home price in interest`,
        body:     `Over a ${Math.round(inputs.term / 12)}-year term at ${inputs.rate}%, the total interest on a ${formatCurrency(loanAmount)} loan is approximately ${formatCurrency(totalInterest)} — ${interestAsPctOfPrice}% of the home's purchase price. Paying extra toward principal each month can significantly reduce this.`,
        metric:   { label: "Estimated total interest", value: formatCurrency(totalInterest) },
      });
    }
  }

  // ── Rule 4: Rate sensitivity — elevated rate environment ──────────────────
  if (inputs.rate >= ELEVATED_RATE_THRESHOLD) {
    const lowerRateMonthly = (() => {
      const rLow = (inputs.rate - 1.5) / 100 / 12;
      const n    = inputs.term;
      const mp   = loanAmount * (rLow * Math.pow(1 + rLow, n)) / (Math.pow(1 + rLow, n) - 1);
      return Math.round(mp);
    })();
    const monthlySaving = outputs.monthlyBudget - lowerRateMonthly;
    if (monthlySaving > 50) {
      insights.push({
        id:       "homeafford.rate-sensitivity",
        category: "opportunity-cost",
        severity: "neutral",
        title:    "Rates are elevated — refinancing later could save significantly",
        body:     `At ${inputs.rate}%, your monthly payment is ${formatCurrency(outputs.monthlyBudget)}. If rates drop by 1.5 points, the same loan would cost ~${formatCurrency(lowerRateMonthly)}/month — saving ${formatCurrency(monthlySaving)}/month. Buying now and refinancing when rates fall is a common strategy in elevated-rate environments.`,
        metric:   { label: "Potential monthly saving", value: formatCurrency(monthlySaving) },
      });
    }
  }

  // ── Rule 5: 28% rule income margin check ─────────────────────────────────
  if (inputs.income > 0) {
    const remainingIncome = inputs.income * (1 - TIGHT_MARGIN_INCOME_RATIO);
    insights.push({
      id:       "homeafford.income-margin",
      category: "neutral",
      severity: "neutral",
      title:    `${formatCurrency(Math.round(remainingIncome))}/month remains after mortgage`,
      body:     `Your ${formatCurrency(outputs.monthlyBudget)} mortgage budget is exactly 28% of your ${formatCurrency(inputs.income)}/month gross income. After taxes and this mortgage, your actual take-home margin will be tighter. Factor in property tax (~1–2% of value/year), insurance, and maintenance (1% of value/year) as additional costs.`,
      metric:   { label: "Pre-tax income remaining", value: formatCurrency(Math.round(remainingIncome)) },
    });
  }

  return insights;
}
