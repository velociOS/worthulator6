// ─── PTO Calculator Insight Generator ────────────────────────────────────────
//
// Produces live WorthCore insights for the pto-calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   pto.daily-value      — always fires — shows daily PTO value
//   pto.high-balance     — daysRemaining > 15 → neutral (use-it-or-lose-it risk)
//   pto.large-cash-value — cashValue > 5000 → neutral (asset awareness)
//   pto.weeks-framing    — ptoDaysAsWeeks ≥ 2 → neutral (reframe in weeks)
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

export interface PtoInputs {
  hourlyRate:        number;  // $/hour
  ptoHoursRemaining: number;  // hours
  hoursPerDay:       number;  // hours/day
}

export interface PtoOutputs {
  cashValue:         number;
  daysRemaining:     number;
  weeklyEarningRate: number;
  dailyCashValue?:   number;
  ptoDaysAsWeeks?:   number;
}

export function generatePtoInsights(
  inputs:  PtoInputs,
  outputs: PtoOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { hourlyRate, ptoHoursRemaining, hoursPerDay } = inputs;
  const {
    cashValue,
    daysRemaining,
    weeklyEarningRate,
    dailyCashValue = Math.round(hourlyRate * hoursPerDay),
    ptoDaysAsWeeks = Math.round((daysRemaining / 5) * 10) / 10,
  } = outputs;

  // ── 1. Daily value framing (always fires) ────────────────────────────────
  insights.push({
    id:       "pto.daily-value",
    type:     "neutral",
    title:    `Each PTO day is worth $${dailyCashValue.toLocaleString()} to you`,
    body:     `At $${hourlyRate}/hour for a ${hoursPerDay}-hour day, each vacation day carries a $${dailyCashValue.toLocaleString()} value. Your current ${daysRemaining} days remaining equals $${cashValue.toLocaleString()} in total — roughly ${ptoDaysAsWeeks} weeks of time off.`,
    priority: 60,
  });

  // ── 2. High balance warning ───────────────────────────────────────────────
  if (daysRemaining > 15) {
    insights.push({
      id:       "pto.high-balance",
      type:     "neutral",
      title:    `${daysRemaining} days is a large PTO balance — check your policy`,
      body:     `Many employers cap PTO accrual or have "use-it-or-lose-it" policies. With ${daysRemaining} days, that's $${cashValue.toLocaleString()} at risk if your balance expires. Review your company policy — or start booking.`,
      priority: 90,
    });
  }

  // ── 3. Large cash value awareness ────────────────────────────────────────
  if (cashValue >= 5000) {
    insights.push({
      id:       "pto.large-cash-value",
      type:     "neutral",
      title:    `You're sitting on $${cashValue.toLocaleString()} in PTO value`,
      body:     `That's a significant employer benefit — equivalent to $${weeklyEarningRate.toLocaleString()} per week if paid out. Some employers allow PTO buy-back or carryover; others forfeit it. Treat unused PTO as a financial asset you should actively manage.`,
      priority: 80,
    });
  }

  // ── 4. Weeks framing ─────────────────────────────────────────────────────
  if (ptoDaysAsWeeks >= 2) {
    insights.push({
      id:       "pto.weeks-framing",
      type:     "positive",
      title:    `That's ${ptoDaysAsWeeks} full weeks of paid time off`,
      body:     `${daysRemaining} days = ${ptoDaysAsWeeks} work weeks. That's a meaningful amount of flexibility — whether used for rest, side projects, or job searching. Burned-out employees who take less vacation tend to be less productive even during work hours.`,
      priority: 70,
    });
  }

  return insights;
}
