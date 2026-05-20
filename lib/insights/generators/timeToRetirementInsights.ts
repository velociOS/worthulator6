// ─── Time to Retirement Insight Generator ────────────────────────────────────
//
// Produces live WorthCore insights for the time-to-retirement-calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   ttretire.on-track         — yearsToRetire ≤ 20 → positive
//   ttretire.late-timeline    — yearsToRetire > 35 → warning
//   ttretire.low-contributions — monthlySavings < 500 → warning
//   ttretire.savings-progress  — shows % progress toward target (always fires)
//   ttretire.10yr-projection   — shows projected 10-year balance
//   ttretire.gap-context       — frames the retirementGap in real terms
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

export interface TimeToRetirementInputs {
  expenses:       number;  // $/month
  current:        number;  // $ saved
  monthlySavings: number;  // $/month
  returnRate:     number;  // %
}

export interface TimeToRetirementOutputs {
  yearsToRetire:    number;
  retirementTarget: number;
  retirementGap?:        number;
  savingsProgress?:      number;  // 0.0–1.0
  projectedBalance10yr?: number;
  annualContribution?:   number;
}

export function generateTimeToRetirementInsights(
  inputs:  TimeToRetirementInputs,
  outputs: TimeToRetirementOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { expenses, current, monthlySavings, returnRate } = inputs;
  const {
    yearsToRetire,
    retirementTarget,
    retirementGap        = Math.max(0, retirementTarget - current),
    savingsProgress      = current / Math.max(retirementTarget, 1),
    projectedBalance10yr = 0,
    annualContribution   = monthlySavings * 12,
  } = outputs;

  // ── 1. On track ──────────────────────────────────────────────────────────
  if (yearsToRetire <= 20 && yearsToRetire > 0) {
    insights.push({
      id:       "ttretire.on-track",
      type:     "positive",
      title:    `Retirement in ${yearsToRetire} years — you're on track`,
      body:     `At $${monthlySavings.toLocaleString()}/month and ${returnRate}% annual return, you'll reach your $${retirementTarget.toLocaleString()} target in ${yearsToRetire} years. Even modest contribution increases could shave years off that timeline.`,
      priority: 100,
    });
  }

  // ── 2. Very long timeline ────────────────────────────────────────────────
  if (yearsToRetire > 35) {
    insights.push({
      id:       "ttretire.late-timeline",
      type:     "warning",
      title:    `${yearsToRetire} years is a long road — act now`,
      body:     `At your current savings rate, retirement is ${yearsToRetire} years away. Increasing monthly contributions by just $300 now can dramatically cut this number. The earlier you increase contributions, the more compounding amplifies the impact.`,
      priority: 95,
    });
  }

  // ── 3. Low monthly contributions ────────────────────────────────────────
  if (monthlySavings < 500) {
    insights.push({
      id:       "ttretire.low-contributions",
      type:     "warning",
      title:    `$${monthlySavings}/month is below the recommended minimum`,
      body:     `Most financial planners suggest saving 15% of gross income for retirement. At $${monthlySavings}/month, you may be behind the curve. Automating contributions — even a small increase — removes the friction of manual saving.`,
      priority: 90,
    });
  }

  // ── 4. Savings progress (always fires) ──────────────────────────────────
  const progressPct = Math.round(savingsProgress * 100);
  if (progressPct < 100) {
    insights.push({
      id:       "ttretire.savings-progress",
      type:     progressPct >= 50 ? "neutral" : "neutral",
      title:    `You're ${progressPct}% of the way to your $${retirementTarget.toLocaleString()} target`,
      body:     `Your current $${current.toLocaleString()} covers ${progressPct}% of your retirement number. You have a $${retirementGap.toLocaleString()} gap to close — and $${annualContribution.toLocaleString()} in contributions per year working toward it.`,
      priority: 80,
    });
  } else {
    insights.push({
      id:       "ttretire.savings-complete",
      type:     "positive",
      title:    `You've already hit your retirement target`,
      body:     `Your current savings of $${current.toLocaleString()} already exceeds your $${retirementTarget.toLocaleString()} target. At ${returnRate}% return, you're in a position to consider pulling back contributions and letting compounding do the rest.`,
      priority: 100,
    });
  }

  // ── 5. 10-year projection ────────────────────────────────────────────────
  if (projectedBalance10yr > 0) {
    const pct10yr = retirementTarget > 0 ? Math.round((projectedBalance10yr / retirementTarget) * 100) : 0;
    insights.push({
      id:       "ttretire.10yr-projection",
      type:     "neutral",
      title:    `In 10 years your portfolio could reach $${projectedBalance10yr.toLocaleString()}`,
      body:     `At $${monthlySavings.toLocaleString()}/month and ${returnRate}% annual return, 10 years of consistent investing would put you at $${projectedBalance10yr.toLocaleString()} — ${pct10yr}% of your final target of $${retirementTarget.toLocaleString()}.`,
      priority: 70,
    });
  }

  // ── 6. Retirement gap framing ────────────────────────────────────────────
  if (retirementGap > 500000) {
    insights.push({
      id:       "ttretire.gap-context",
      type:     "neutral",
      title:    `$${retirementGap.toLocaleString()} gap — but time is your best asset`,
      body:     `A $${retirementGap.toLocaleString()} gap sounds large, but compound growth is exponential. Investing $${monthlySavings.toLocaleString()}/month at ${returnRate}% means each year of early contributions is worth significantly more than contributions made in the final decade.`,
      priority: 65,
    });
  }

  return insights;
}
