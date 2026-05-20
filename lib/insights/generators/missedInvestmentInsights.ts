import type { Insight } from "../index";

interface MissedInvestmentInputs {
  amount: number;
  yearsAgo: number;
  annualReturn: number;
}

interface MissedInvestmentOutputs {
  currentValue?:      number;
  totalGain?:         number;
  multiplier?:        number;
  growthLostPct?:     number;
  monthlyEquivalent?: number;
  futureProjection?:  number;
  weeklyLoss?:        number;
}

export function missedInvestmentInsights(
  inputs: MissedInvestmentInputs,
  outputs: MissedInvestmentOutputs
): Insight[] {
  const results: Insight[] = [];

  const amount     = Number(inputs.amount);
  const years      = Number(inputs.yearsAgo);
  const rate       = Number(inputs.annualReturn);
  const current    = outputs.currentValue      ?? 0;
  const gain       = outputs.totalGain         ?? 0;
  const multiplier = outputs.multiplier        ?? 0;
  const pctLost    = outputs.growthLostPct     ?? 0;
  const monthly    = outputs.monthlyEquivalent ?? 0;
  const future     = outputs.futureProjection  ?? 0;
  const weekly     = outputs.weeklyLoss        ?? 0;

  // 1. The gut-punch framing
  results.push({
    id: "missed.opportunity-cost",
    type: "warning",
    message: `That $${amount.toLocaleString()} decision cost you $${gain.toLocaleString()} in foregone growth — a ${pctLost.toFixed(0)}% return you walked away from.`,
    detail: `$${amount.toLocaleString()} invested ${years} years ago at ${rate}% would be worth $${current.toLocaleString()} today.`,
  });

  // 2. Multiplier framing
  if (multiplier >= 2) {
    results.push({
      id: "missed.multiplier",
      type: "milestone",
      message: `That purchase was a ${multiplier.toFixed(2)}x trade — you got one item, gave up ${multiplier.toFixed(2)} times what you paid.`,
      detail: `Every $1 not invested at ${rate}% for ${years} years became $${multiplier.toFixed(2)}.`,
    });
  }

  // 3. Monthly bleed
  if (monthly > 50) {
    results.push({
      id: "missed.monthly-bleed",
      type: "info",
      message: `That single purchase bled you $${monthly.toLocaleString()}/month in compound growth over ${years} years.`,
      detail: `Spread across ${years * 12} months, the opportunity cost averaged $${monthly.toLocaleString()} per month.`,
    });
  }

  // 4. Weekly bleed
  if (weekly > 10) {
    results.push({
      id: "missed.weekly-loss",
      type: "info",
      message: `Or think of it as $${weekly.toLocaleString()} lost every week for ${years} years.`,
      detail: `$${weekly.toLocaleString()}/week is the opportunity cost of that one decision, spread over time.`,
    });
  }

  // 5. Forward projection — what if you invested the current value for 20 more years
  if (future > current * 2) {
    results.push({
      id: "missed.future-projection",
      type: "opportunity",
      message: `If you invest $${current.toLocaleString()} today and hold for 20 more years at ${rate}%, it grows to $${future.toLocaleString()}.`,
      detail: `The best time to invest was ${years} years ago. The second best time is now.`,
    });
  }

  // 6. Small amount reframe
  if (amount <= 500) {
    results.push({
      id: "missed.small-amount-reframe",
      type: "info",
      message: `Even a $${amount.toLocaleString()} investment compounds into something significant over time.`,
      detail: `Small, consistent investments create outsized long-term wealth. The habit matters more than the amount.`,
    });
  }

  return results;
}
