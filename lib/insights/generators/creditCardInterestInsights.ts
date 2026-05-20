import type { Insight } from "../types";

export interface CreditCardInterestInputs {
  balance: number;
  apr: number;
  monthlyPayment: number;
}

export interface CreditCardInterestOutputs {
  monthsToPayoff: number;
  totalInterest: number;
  totalPaid: number;
  interestOfTotal: number;
  interestToBalanceRatio?: number;
  yearsToPayoff?: number;
  dailyInterestCost?: number;
}

export function generateCreditCardInterestInsights(
  inputs: CreditCardInterestInputs,
  outputs: CreditCardInterestOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { balance, apr, monthlyPayment } = inputs;
  const {
    monthsToPayoff,
    totalInterest,
    interestOfTotal,
    interestToBalanceRatio = 0,
    yearsToPayoff = 0,
    dailyInterestCost = 0,
  } = outputs;

  // cant-cover-interest — payment doesn't even cover monthly interest
  if (monthsToPayoff >= 600) {
    insights.push({
      id: "credit-card-interest.cant-cover-interest",
      title: "Payment doesn't cover interest",
      body: `At ${apr}% APR, your $${monthlyPayment}/mo payment is less than the monthly interest charge. Your balance is growing — not shrinking. Increase your payment immediately.`,
      severity: "critical",
      category: "debt-burden",
    });
    return insights;
  }

  // predatory-apr — APR ≥ 25%
  if (apr >= 25) {
    insights.push({
      id: "credit-card-interest.predatory-apr",
      title: "Predatory interest rate",
      body: `At ${apr}% APR, you're paying $${dailyInterestCost.toFixed(2)}/day just to carry this balance. A balance transfer to a 0% intro card could save you $${Math.round(totalInterest).toLocaleString()} in interest.`,
      severity: "warning",
      category: "debt-burden",
    });
  }

  // interest-exceeds-half — more than half of payments go to interest
  if (interestOfTotal > 50) {
    insights.push({
      id: "credit-card-interest.interest-exceeds-half",
      title: "Most of your payments go to the bank",
      body: `${interestOfTotal.toFixed(1)}% of every dollar you pay goes to interest — not your debt. You're effectively renting your balance from the lender.`,
      severity: "warning",
      category: "hidden-cost",
    });
  }

  // compounding-shock — paying 50%+ extra on top of original balance
  if (interestToBalanceRatio > 0.5) {
    insights.push({
      id: "credit-card-interest.compounding-shock",
      title: `You'll pay ${Math.round(interestToBalanceRatio * 100)}% extra`,
      body: `You borrowed $${balance.toLocaleString()} but will pay $${Math.round(totalInterest).toLocaleString()} in interest on top — that's ${Math.round(interestToBalanceRatio * 100)}% more than you borrowed. Compounding works against you here.`,
      severity: interestToBalanceRatio > 1 ? "critical" : "warning",
      category: "opportunity-cost",
    });
  }

  // long-haul — more than 3 years to pay off
  if (yearsToPayoff > 3) {
    insights.push({
      id: "credit-card-interest.long-haul",
      title: `${Math.round(yearsToPayoff * 10) / 10} years until debt-free`,
      body: `At this payment rate, you won't clear this balance for over ${Math.floor(yearsToPayoff)} years. Doubling your monthly payment could cut that timeline dramatically.`,
      severity: "neutral",
      category: "debt-burden",
    });
  }

  // quick-payoff — paid off in under 12 months
  if (yearsToPayoff > 0 && yearsToPayoff < 1) {
    insights.push({
      id: "credit-card-interest.quick-payoff",
      title: "On track to clear this quickly",
      body: `You'll be debt-free in under a year. Keep this payment consistent and consider throwing any windfalls at the balance to cut interest further.`,
      severity: "positive",
      category: "benchmark-comparison",
    });
  }

  // daily-drain — always fires for context
  insights.push({
    id: "credit-card-interest.daily-drain",
    title: `Costs $${dailyInterestCost.toFixed(2)} every single day`,
    body: `This balance costs you $${dailyInterestCost.toFixed(2)} in interest per day — $${Math.round(dailyInterestCost * 30).toLocaleString()}/month before you make a single payment toward principal.`,
    severity: "neutral",
    category: "hidden-cost",
  });

  return insights;
}
