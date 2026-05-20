// ─── Credit Card Payoff Insight Generator ────────────────────────────────────
//
// Produces live WorthCore insights for the credit-card-payoff-calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   cc.predatory-apr        — APR ≥ 25% → warning (dangerous rate territory)
//   cc.interest-exceeds-balance — totalInterest > balance → warning
//   cc.long-haul            — payoff > 3 years → warning (balance transfer CTA)
//   cc.quick-payoff         — payoff ≤ 18 months → positive
//   cc.daily-drain          — always fires — surfaces daily interest cost
//   cc.balance-transfer-window — interestToBalanceRatio > 0.4 → neutral
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

export interface CreditCardPayoffInputs {
  balance: number;   // $
  apr:     number;   // %
  payment: number;   // $/month
}

export interface CreditCardPayoffOutputs {
  months:                 number;
  interest:               number;
  totalPaid:              number;
  dailyInterestCost?:     number;
  monthlyInterestFirst?:  number;
  interestToBalanceRatio?: number;
  payoffYears?:           number;
}

export function generateCreditCardPayoffInsights(
  inputs:  CreditCardPayoffInputs,
  outputs: CreditCardPayoffOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { balance, apr, payment } = inputs;
  const {
    months,
    interest,
    dailyInterestCost     = 0,
    monthlyInterestFirst  = 0,
    interestToBalanceRatio = 0,
    payoffYears            = 0,
  } = outputs;

  // ── 1. Predatory APR ────────────────────────────────────────────────────
  if (apr >= 25) {
    insights.push({
      id:       "cc.predatory-apr",
      type:     "warning",
      title:    `${apr}% APR is in predatory territory`,
      body:     `Rates above 25% are among the highest legally allowed. A balance transfer to a 0% APR card could immediately stop the bleeding — even with a 3–5% transfer fee, you'd likely save thousands.`,
      priority: 100,
    });
  } else if (apr >= 20) {
    insights.push({
      id:       "cc.high-apr",
      type:     "warning",
      title:    `${apr}% APR is costing you heavily`,
      body:     `At 20%+ APR, over a third of your monthly payment goes straight to interest on a typical balance. Paying more than the minimum makes a dramatic difference.`,
      priority: 90,
    });
  }

  // ── 2. Interest exceeds the original balance ─────────────────────────────
  if (interest > balance) {
    insights.push({
      id:       "cc.interest-exceeds-balance",
      type:     "warning",
      title:    `You'll pay more in interest than your original balance`,
      body:     `Total interest of $${interest.toLocaleString()} exceeds your $${balance.toLocaleString()} balance. This is a sign the payment plan needs restructuring — a higher monthly payment or a balance transfer would save you real money.`,
      priority: 95,
    });
  }

  // ── 3. Long payoff window ────────────────────────────────────────────────
  if (months > 36) {
    insights.push({
      id:       "cc.long-haul",
      type:     "warning",
      title:    `${payoffYears} years to pay off — consider a balance transfer`,
      body:     `At $${payment}/month, you won't be debt-free for over 3 years. A 0% APR balance transfer card could pause all interest for 12–21 months, letting every dollar go toward the principal.`,
      priority: 85,
    });
  }

  // ── 4. Quick payoff — positive reinforcement ─────────────────────────────
  if (months <= 18 && months > 0) {
    insights.push({
      id:       "cc.quick-payoff",
      type:     "positive",
      title:    `On track — debt-free in ${months} months`,
      body:     `At $${payment}/month you're clearing this balance in ${months} months (${payoffYears} years). Keep it up — any extra payment above $${payment} shrinks that timeline even further.`,
      priority: 80,
    });
  }

  // ── 5. Daily interest drain (always fires) ───────────────────────────────
  if (dailyInterestCost > 0) {
    insights.push({
      id:       "cc.daily-drain",
      type:     "neutral",
      title:    `This debt costs you $${dailyInterestCost.toFixed(2)} every single day`,
      body:     `Your first month's interest charge is $${monthlyInterestFirst.toLocaleString()} — that's $${dailyInterestCost.toFixed(2)}/day just to stand still. Every extra dollar you pay reduces this daily drain immediately.`,
      priority: 70,
    });
  }

  // ── 6. Balance transfer window ───────────────────────────────────────────
  if (interestToBalanceRatio > 0.4) {
    insights.push({
      id:       "cc.balance-transfer-window",
      type:     "neutral",
      title:    `Interest will be ${Math.round(interestToBalanceRatio * 100)}% of your original balance`,
      body:     `You're projected to pay $${interest.toLocaleString()} in interest on a $${balance.toLocaleString()} balance — a ${Math.round(interestToBalanceRatio * 100)}% premium. A 0% transfer card with a 3% fee saves significantly if used in the next 12–18 months.`,
      priority: 65,
    });
  }

  return insights;
}
