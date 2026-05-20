// ─── WorthCore Insight Engine — Car Loan Generator ───────────────────────────
//
// PURPOSE:
//   Deterministic insight rules for the "car-loan-calculator" engine calculator.
//   Surfaces rate benchmarks, term-length risks, interest burden, down payment
//   adequacy, and investment opportunity cost.
//
// CALCULATOR OUTPUT SCHEMA (from calculatorConfigs.ts "car-loan-calculator"):
//   inputs:  vehiclePrice, downPayment, tradeIn, interestRate, termMonths
//   outputs: monthlyPayment, totalInterest, totalCost, interestPct,
//            loanAmount, downPaymentRatio, interestMultiplier, annualPaymentBurden
//
// RULES:
//   ✅ Pure TypeScript — synchronous, deterministic, no side effects
//   ✅ All market benchmarks sourced from WorthCore data layer at module level
//   ✅ All insight IDs are stable and unique: "carloan.<rule-name>"
//   ❌ Never import React
//   ❌ Never call fetch() or async operations
//
// ─────────────────────────────────────────────────────────────────────────────

import { formatCurrency }     from "@/lib/insights/benchmarks";
import { futureValueAnnuity } from "@/lib/insights/projections";
import { getFinanceValue }    from "@/lib/dataStore";
import type { Insight }       from "@/lib/insights/types";

// ─── Module-level WorthCore defaults ─────────────────────────────────────────
// WorthCore rule: getFinanceValue() MUST be called at module level only.
const MARKET_AUTO_LOAN_RATE = getFinanceValue("autoLoanRateNew"); // ~7-9% avg new car

// ─── Rule thresholds (documented with sources) ───────────────────────────────
/** Rate 1.5+ points above market → refinance trigger. */
const RATE_ABOVE_MARKET_TRIGGER = 1.5;
/** Rate 1.5+ points below market → positive acknowledgment. */
const RATE_BELOW_MARKET_THRESHOLD = 1.5;
/** 72+ months → long-term risk (depreciation + interest drain). */
const LONG_TERM_MONTHS = 72;
/** Interest share > 15% of total cost → "interest-heavy" warning. */
const INTEREST_HEAVY_THRESHOLD = 15;
/** Down payment < 10% of vehicle price → underwater risk. */
const LOW_DOWN_PAYMENT_THRESHOLD = 10;
/** Down payment ≥ 20% → strong position acknowledgment. */
const STRONG_DOWN_PAYMENT_THRESHOLD = 20;

// ─── Input / Output types ─────────────────────────────────────────────────────

export interface CarLoanInputs {
  vehiclePrice:  number;
  downPayment:   number;
  tradeIn:       number;
  interestRate:  number;
  termMonths:    number;
}

export interface CarLoanOutputs {
  monthlyPayment:    number;
  totalInterest:     number;
  totalCost:         number;
  interestPct:       number;
  /** Amount financed — vehicle price minus down payment and trade-in */
  loanAmount:        number;
  /** Down payment as % of vehicle price — intelligence output */
  downPaymentRatio?: number;
  /** Total paid / loan amount — intelligence output */
  interestMultiplier?: number;
  /** Monthly payment × 12 — annual cash-flow burden */
  annualPaymentBurden?: number;
}

// ─── Generator ────────────────────────────────────────────────────────────────

/**
 * Generate all applicable car loan insights.
 * Focuses on: rate benchmarking, term-length risk, interest burden,
 * down payment adequacy, and investment opportunity cost.
 *
 * @param inputs   Calculator inputs
 * @param outputs  Calculator outputs (including Phase 6C intelligence fields)
 */
export function generateCarLoanInsights(
  inputs: CarLoanInputs,
  outputs: CarLoanOutputs,
): Insight[] {
  if (outputs.monthlyPayment <= 0 || outputs.loanAmount <= 0) return [];

  const insights: Insight[] = [];

  const downPaymentRatio = outputs.downPaymentRatio
    ?? (inputs.vehiclePrice > 0 ? (inputs.downPayment / inputs.vehiclePrice) * 100 : 0);

  // ── Rule 1: Interest rate vs market average ────────────────────────────────
  const rateDiff = inputs.interestRate - MARKET_AUTO_LOAN_RATE;

  if (rateDiff >= RATE_ABOVE_MARKET_TRIGGER) {
    insights.push({
      id:       "carloan.rate-above-market",
      category: "spending",
      severity: "warning",
      title:    "Rate above current market",
      body:     `Your rate of ${inputs.interestRate}% is ${rateDiff.toFixed(1)} points above the current market average of ${MARKET_AUTO_LOAN_RATE}%. On a ${formatCurrency(outputs.loanAmount)} loan, that gap costs roughly ${formatCurrency(Math.round((rateDiff / 100 / 12) * outputs.loanAmount * Number(inputs.termMonths) * 0.6))} extra in interest. If your credit score has improved since origination, refinancing may reduce this significantly.`,
      metric:   { label: "Above market rate", value: `+${rateDiff.toFixed(1)}%` },
    });
  } else if (rateDiff <= -RATE_BELOW_MARKET_THRESHOLD) {
    insights.push({
      id:       "carloan.rate-below-market",
      category: "savings",
      severity: "positive",
      title:    "Below-market rate",
      body:     `At ${inputs.interestRate}%, your rate is ${Math.abs(rateDiff).toFixed(1)} points below the current market average of ${MARKET_AUTO_LOAN_RATE}%. This is a favorable rate — you're minimizing the cost of financing your vehicle.`,
      metric:   { label: "Below market", value: `-${Math.abs(rateDiff).toFixed(1)}%` },
    });
  }

  // ── Rule 2: Long loan term warning ────────────────────────────────────────
  if (inputs.termMonths >= LONG_TERM_MONTHS) {
    const termYears = Math.round(inputs.termMonths / 12);
    insights.push({
      id:       "carloan.long-term",
      category: "warning",
      severity: "warning",
      title:    `${termYears}-year loan — depreciation risk`,
      body:     `Loans of 72 months or longer keep you paying interest longer than the vehicle retains value. Most vehicles lose 40-60% of value in their first 5 years. A ${termYears}-year loan means you may owe more than the car is worth for several years — making it difficult to sell or trade if circumstances change.`,
      metric:   { label: "Loan term", value: `${termYears} years` },
    });
  }

  // ── Rule 3: Interest burden ────────────────────────────────────────────────
  if (outputs.interestPct >= INTEREST_HEAVY_THRESHOLD) {
    insights.push({
      id:       "carloan.interest-heavy",
      category: "spending",
      severity: "neutral",
      title:    "Interest is a significant cost",
      body:     `${outputs.interestPct.toFixed(1)}% of every dollar you pay goes to interest — ${formatCurrency(outputs.totalInterest)} in total. On a ${formatCurrency(outputs.totalCost)} purchase, the financing adds ${formatCurrency(outputs.totalInterest)} on top of the vehicle price. A larger down payment or shorter term would reduce this significantly.`,
      metric:   { label: "Total interest cost", value: formatCurrency(outputs.totalInterest) },
    });
  }

  // ── Rule 4: Down payment adequacy ─────────────────────────────────────────
  if (downPaymentRatio < LOW_DOWN_PAYMENT_THRESHOLD && inputs.downPayment >= 0) {
    insights.push({
      id:       "carloan.low-down-payment",
      category: "warning",
      severity: "neutral",
      title:    "Low down payment",
      body:     `${downPaymentRatio.toFixed(1)}% down is below the recommended 10-20%. Starting with minimal equity means you're immediately underwater — the vehicle is worth less than you owe. Financial advisors typically recommend 20% down to avoid this position and reduce monthly payments.`,
      metric:   { label: "Down payment", value: `${downPaymentRatio.toFixed(1)}%` },
    });
  } else if (downPaymentRatio >= STRONG_DOWN_PAYMENT_THRESHOLD) {
    insights.push({
      id:       "carloan.strong-down-payment",
      category: "savings",
      severity: "positive",
      title:    "Strong down payment",
      body:     `Putting ${downPaymentRatio.toFixed(1)}% down on a ${formatCurrency(inputs.vehiclePrice)} vehicle is a financially sound position. You have immediate equity, lower monthly payments, and protection against being underwater if the vehicle depreciates.`,
      metric:   { label: "Down payment", value: `${downPaymentRatio.toFixed(1)}%` },
    });
  }

  // ── Rule 5: Investment opportunity cost ───────────────────────────────────
  const annualContrib  = outputs.annualPaymentBurden ?? Math.round(outputs.monthlyPayment * 12);
  const termYears      = inputs.termMonths / 12;
  const opportunityFV  = Math.round(futureValueAnnuity(annualContrib, termYears));
  const opportunityGain = opportunityFV - annualContrib * termYears;

  if (opportunityGain > 2_000) {
    insights.push({
      id:       "carloan.opportunity-cost",
      category: "opportunity-cost",
      severity: "neutral",
      title:    "The investment opportunity cost",
      body:     `Your ${formatCurrency(outputs.monthlyPayment)}/month payment — if invested instead for ${Math.round(termYears)} years at a 7% return — would grow to ${formatCurrency(opportunityFV)}. This isn't an argument against buying a car; it's context for the true financial weight of this commitment.`,
      metric:   { label: `${Math.round(termYears)}-yr investment value`, value: formatCurrency(opportunityFV) },
    });
  }

  return insights;
}
