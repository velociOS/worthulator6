// ─── Salary to Hourly Insight Generator ──────────────────────────────────────
//
// Produces live WorthCore insights for the salary-to-hourly calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   salary.per-minute     — always fires — $/minute earned (relatability anchor)
//   salary.below-median   — hourlyRate < 25 → neutral (below US median ~$30)
//   salary.strong-rate    — hourlyRate >= 50 → positive
//   salary.overtime-dilution — hoursPerWeek > 45 → neutral
//   salary.vacation-cost  — weeksPerYear < 50 → neutral (cost of vacation weeks)
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

// US median hourly wage 2026 (~$30/hr)
const US_MEDIAN_HOURLY = 30;

export interface SalaryToHourlyInputs {
  annualSalary:  number;   // $
  hoursPerWeek:  number;   // hours
  weeksPerYear:  number;   // weeks
}

export interface SalaryToHourlyOutputs {
  hourlyRate:    number;
  dailyRate:     number;
  weeklyRate:    number;
  monthlyRate:   number;
  hoursPerYear?:     number;
  perMinuteRate?:    number;
  minutesPerDollar?: number;
}

export function generateSalaryToHourlyInsights(
  inputs:  SalaryToHourlyInputs,
  outputs: SalaryToHourlyOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { annualSalary, hoursPerWeek, weeksPerYear } = inputs;
  const {
    hourlyRate,
    dailyRate,
    hoursPerYear     = hoursPerWeek * weeksPerYear,
    perMinuteRate    = hourlyRate / 60,
    minutesPerDollar = hourlyRate > 0 ? 60 / hourlyRate : 0,
  } = outputs;

  // ── 1. Per-minute rate (always fires) ────────────────────────────────────
  insights.push({
    id:       "salary.per-minute",
    type:     "neutral",
    title:    `You earn $${(perMinuteRate).toFixed(2)} every minute you work`,
    body:     `At $${hourlyRate.toFixed(2)}/hour, your time breaks down to $${perMinuteRate.toFixed(2)} per minute — or ${minutesPerDollar.toFixed(1)} minutes of work per dollar earned. That daily rate of $${dailyRate.toFixed(0)} represents ${Math.round(hoursPerWeek / 5)} hours of your time.`,
    priority: 60,
  });

  // ── 2. Below US median ────────────────────────────────────────────────────
  if (hourlyRate < US_MEDIAN_HOURLY) {
    const gap = Math.round((US_MEDIAN_HOURLY - hourlyRate) * hoursPerYear);
    insights.push({
      id:       "salary.below-median",
      type:     "neutral",
      title:    `$${hourlyRate.toFixed(2)}/hr is below the US median of ~$${US_MEDIAN_HOURLY}`,
      body:     `The US median wage is around $${US_MEDIAN_HOURLY}/hour. Closing this gap would add ~$${gap.toLocaleString()} to your annual income. Industry certifications, negotiation, or a role change in the same field often yield the fastest salary jumps.`,
      priority: 80,
    });
  }

  // ── 3. Strong rate ────────────────────────────────────────────────────────
  if (hourlyRate >= 50) {
    insights.push({
      id:       "salary.strong-rate",
      type:     "positive",
      title:    `$${hourlyRate.toFixed(2)}/hr puts you in the top quartile`,
      body:     `At $${hourlyRate.toFixed(2)}/hour, your salary exceeds the US median by ${Math.round((hourlyRate / US_MEDIAN_HOURLY - 1) * 100)}%. At this level, maximising tax-advantaged accounts (401k, HSA, backdoor Roth) has the most impact on long-term wealth.`,
      priority: 85,
    });
  }

  // ── 4. Overtime hour dilution ─────────────────────────────────────────────
  if (hoursPerWeek > 45) {
    const standardHourly = Math.round(annualSalary / (40 * weeksPerYear) * 100) / 100;
    insights.push({
      id:       "salary.overtime-dilution",
      type:     "neutral",
      title:    `Working ${hoursPerWeek}h/week dilutes your effective hourly rate`,
      body:     `If your role was 40 hours/week, your hourly would be $${standardHourly.toFixed(2)}. Those extra ${hoursPerWeek - 40} hours/week reduce your effective rate by ${Math.round((1 - hourlyRate / standardHourly) * 100)}%. Overtime without pay is a hidden salary cut.`,
      priority: 90,
    });
  }

  // ── 5. Vacation cost awareness ────────────────────────────────────────────
  if (weeksPerYear < 50) {
    const vacationWeeks = 52 - weeksPerYear;
    const vacationValue = Math.round(hourlyRate * hoursPerWeek * vacationWeeks);
    insights.push({
      id:       "salary.vacation-cost",
      type:     "neutral",
      title:    `${vacationWeeks} vacation week(s) = $${vacationValue.toLocaleString()} in foregone earnings`,
      body:     `You're calculating on ${weeksPerYear} worked weeks. Those ${vacationWeeks} week(s) off represent $${vacationValue.toLocaleString()} of compensation. If your role doesn't include paid leave, this is real out-of-pocket cost to factor in.`,
      priority: 70,
    });
  }

  return insights;
}
