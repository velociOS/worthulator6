// ─── Savings Goal Insight Generator ──────────────────────────────────────────
//
// Produces live WorthCore insights for the savings-goal-calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   savingsgoal.returns-do-heavy-lifting — interestSharePct > 30% → positive
//   savingsgoal.interest-helpful         — interestSharePct 10–30% → neutral
//   savingsgoal.zero-return              — annualReturn = 0 → neutral (opportunity cost)
//   savingsgoal.high-monthly-burden      — monthlyContribution > 1000 → neutral
//   savingsgoal.interest-multiplier      — interestToContribRatio > 0.3 → positive
//   savingsgoal.low-rate-tip             — annualReturn < 3% → neutral (HYSA nudge)
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

export interface SavingsGoalInputs {
  goalAmount:     number;   // $
  currentSavings: number;   // $
  years:          number;   // years
  annualReturn:   number;   // %
}

export interface SavingsGoalOutputs {
  monthlyContribution:  number;
  totalContributed:     number;
  interestEarned:       number;
  interestSharePct:     number;
  interestToContribRatio?: number;
  annualSavingsRequired?:  number;
  goalYears?:              number;
}

export function generateSavingsGoalInsights(
  inputs:  SavingsGoalInputs,
  outputs: SavingsGoalOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { goalAmount, currentSavings, years, annualReturn } = inputs;
  const {
    monthlyContribution,
    totalContributed,
    interestEarned,
    interestSharePct,
    interestToContribRatio = totalContributed > 0 ? interestEarned / totalContributed : 0,
    annualSavingsRequired  = Math.round(monthlyContribution * 12),
  } = outputs;

  // ── 1. Returns doing heavy lifting ──────────────────────────────────────
  if (interestSharePct > 30) {
    insights.push({
      id:       "savingsgoal.returns-heavy-lifting",
      type:     "positive",
      title:    `Interest covers ${Math.round(interestSharePct)}% of your goal`,
      body:     `At ${annualReturn}% return, $${Math.round(interestEarned).toLocaleString()} of your $${goalAmount.toLocaleString()} goal is funded by growth — not your deposits. You're putting in $${Math.round(totalContributed).toLocaleString()} and letting compounding do the rest.`,
      priority: 100,
    });
  } else if (interestSharePct >= 10) {
    insights.push({
      id:       "savingsgoal.interest-helpful",
      type:     "neutral",
      title:    `Returns add $${Math.round(interestEarned).toLocaleString()} toward your goal`,
      body:     `Your ${annualReturn}% annual return contributes ${Math.round(interestSharePct)}% of the target. Increasing the return rate — even to a high-yield savings account (4–5%) — amplifies this further.`,
      priority: 85,
    });
  }

  // ── 2. Zero / near-zero return ───────────────────────────────────────────
  if (annualReturn < 1) {
    insights.push({
      id:       "savingsgoal.zero-return",
      type:     "neutral",
      title:    `0% return means every dollar comes from you`,
      body:     `You're saving $${Math.round(monthlyContribution).toLocaleString()}/month with no investment return. Moving this into a high-yield savings account at 4–5% APY could shave months off your timeline or reduce required contributions.`,
      priority: 90,
    });
  }

  // ── 3. Low-rate nudge ────────────────────────────────────────────────────
  if (annualReturn >= 1 && annualReturn < 3) {
    insights.push({
      id:       "savingsgoal.low-rate-tip",
      type:     "neutral",
      title:    `${annualReturn}% return — HYSA rates are currently 4–5%`,
      body:     `Many high-yield savings accounts are paying 4–5% APY right now. Switching from ${annualReturn}% to 4.5% could meaningfully reduce your monthly contribution requirement for the same goal.`,
      priority: 80,
    });
  }

  // ── 4. High monthly burden ───────────────────────────────────────────────
  if (monthlyContribution > 1000) {
    insights.push({
      id:       "savingsgoal.high-monthly-burden",
      type:     "neutral",
      title:    `$${Math.round(monthlyContribution).toLocaleString()}/month is a significant commitment`,
      body:     `You'd need to set aside $${annualSavingsRequired.toLocaleString()} per year. If that's a stretch, extending the timeline by even 12 months reduces the monthly requirement — and more time means more compounding.`,
      priority: 75,
    });
  }

  // ── 5. Strong interest multiplier ────────────────────────────────────────
  if (interestToContribRatio > 0.3 && annualReturn >= 3) {
    insights.push({
      id:       "savingsgoal.interest-multiplier",
      type:     "positive",
      title:    `Every $1 you save earns an extra $${interestToContribRatio.toFixed(2)} in returns`,
      body:     `Over ${years} years at ${annualReturn}%, your deposits generate ${Math.round(interestToContribRatio * 100)}¢ in interest for every dollar contributed. The longer the timeline, the more powerful this ratio becomes.`,
      priority: 70,
    });
  }

  // ── 6. Head start framing ────────────────────────────────────────────────
  if (currentSavings > 0) {
    const headStartPct = Math.round((currentSavings / goalAmount) * 100);
    insights.push({
      id:       "savingsgoal.head-start",
      type:     "positive",
      title:    `You're already ${headStartPct}% of the way there`,
      body:     `Your $${currentSavings.toLocaleString()} head start is compounding now. That existing balance reduces your monthly requirement — and every year it compounds before you reach the goal date adds to your lead.`,
      priority: 65,
    });
  }

  return insights;
}
