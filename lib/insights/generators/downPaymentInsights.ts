import type { Insight } from "../types";

export interface DownPaymentInputs {
  homePrice: number;
  downPct: number;
  currentSaved: number;
  months: number;
}

export interface DownPaymentOutputs {
  monthlySavings: number;
  targetDown: number;
  remaining: number;
  progressPercent?: number;
  fasterMonthsWith200?: number;
  opportunityCostOfWaiting?: number;
}

export function generateDownPaymentInsights(
  inputs: DownPaymentInputs,
  outputs: DownPaymentOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { homePrice, downPct, months } = inputs;
  const {
    monthlySavings,
    targetDown,
    remaining,
    progressPercent = inputs.currentSaved > 0 ? (inputs.currentSaved / targetDown) * 100 : 0,
    fasterMonthsWith200 = 0,
    opportunityCostOfWaiting = 0,
  } = outputs;

  const yearsToGoal = Math.round(months / 12 * 10) / 10;

  // progress-milestone — always fires, emotional hook
  if (progressPercent > 0 && progressPercent < 100) {
    const toGo = Math.round(100 - progressPercent);
    insights.push({
      id: "down-payment.progress-milestone",
      title: `You're ${progressPercent.toFixed(1)}% of the way there`,
      body: `You've saved $${inputs.currentSaved.toLocaleString()} of your $${targetDown.toLocaleString()} goal — ${progressPercent.toFixed(1)}% complete. You're ${toGo}% away from being ready to make your offer.`,
      severity: progressPercent >= 50 ? "positive" : "neutral",
      category: "benchmark-comparison",
    });
  } else if (progressPercent >= 100) {
    insights.push({
      id: "down-payment.goal-reached",
      title: "Down payment goal already reached",
      body: `You've already saved $${inputs.currentSaved.toLocaleString()} — your $${targetDown.toLocaleString()} target is covered. Now focus on building your closing cost reserve (typically 2–5% of the purchase price).`,
      severity: "positive",
      category: "benchmark-comparison",
    });
  }

  // timeline-framing — always fires
  insights.push({
    id: "down-payment.timeline-framing",
    title: `${yearsToGoal} year${yearsToGoal !== 1 ? "s" : ""} until you can make your offer`,
    body: `At $${monthlySavings.toLocaleString()}/month, you'll hit your $${targetDown.toLocaleString()} down payment target in ${months} months — buying a $${homePrice.toLocaleString()} home with ${downPct}% down in ${yearsToGoal} year${yearsToGoal !== 1 ? "s" : ""}.`,
    severity: months <= 24 ? "positive" : months <= 48 ? "neutral" : "neutral",
    category: "affordability-pressure",
  });

  // accelerator-200 — milestone: get there faster
  if (fasterMonthsWith200 > 0) {
    const fasterYears = fasterMonthsWith200 >= 12 ? `${Math.floor(fasterMonthsWith200 / 12)} year${Math.floor(fasterMonthsWith200 / 12) > 1 ? "s" : ""}` : null;
    insights.push({
      id: "down-payment.accelerator-200",
      title: `$200/month extra gets you there ${fasterMonthsWith200} months faster`,
      body: `Adding just $200/month to your savings would cut your timeline by ${fasterMonthsWith200} months${fasterYears ? ` — over ${fasterYears} sooner` : ""}. On a $${homePrice.toLocaleString()} home, that could mean locking in today's price before it rises further.`,
      severity: "positive",
      category: "investment-opportunity",
    });
  }

  // pmi-warning — below 20% down
  if (downPct < 20) {
    const extraNeeded = Math.round(homePrice * 0.2 - targetDown);
    insights.push({
      id: "down-payment.pmi-warning",
      title: `PMI required — ${downPct}% is below the 20% threshold`,
      body: `With ${downPct}% down, you'll likely pay PMI — typically $50–$200/month until you reach 20% equity. Saving $${extraNeeded.toLocaleString()} more to hit 20% down ($${Math.round(homePrice * 0.2).toLocaleString()}) eliminates this ongoing cost permanently.`,
      severity: "warning",
      category: "hidden-cost",
    });
  } else {
    insights.push({
      id: "down-payment.no-pmi",
      title: "20%+ down — no PMI required",
      body: `Putting ${downPct}% down keeps you above the 20% threshold, eliminating PMI entirely and saving you $50–$200/month from day one of ownership.`,
      severity: "positive",
      category: "opportunity-cost",
    });
  }

  // opportunity-cost — always fires if meaningful
  if (opportunityCostOfWaiting > 1000) {
    insights.push({
      id: "down-payment.opportunity-cost",
      title: `$${opportunityCostOfWaiting.toLocaleString()} in potential investment gains while waiting`,
      body: `The $${remaining.toLocaleString()} you're saving over ${months} months could generate ~$${opportunityCostOfWaiting.toLocaleString()} in the market at 7% annually. This isn't a reason not to save for a home — it's a reason to get there faster.`,
      severity: "neutral",
      category: "opportunity-cost",
    });
  }

  return insights;
}
