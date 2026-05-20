import type { Insight } from "../index";

interface ScreenTimeInputs {
  hoursPerDay: number;
  hourlyRate:  number;
  yearsAhead:  number;
}

interface ScreenTimeOutputs {
  annualCost?:             number;
  weeklyHours?:            number;
  lifetimeDays?:           number;
  totalCost?:              number;
  weeklyOpportunityCost?:  number;
  investedValue?:          number;
}

export function screenTimeInsights(
  inputs: ScreenTimeInputs,
  outputs: ScreenTimeOutputs
): Insight[] {
  const results: Insight[] = [];

  const hours   = Number(inputs.hoursPerDay);
  const rate    = Number(inputs.hourlyRate);
  const years   = Number(inputs.yearsAhead);
  const annual  = outputs.annualCost            ?? 0;
  const weekly  = outputs.weeklyHours           ?? 0;
  const days    = outputs.lifetimeDays          ?? 0;
  const total   = outputs.totalCost             ?? 0;
  const weeklyVal = outputs.weeklyOpportunityCost ?? 0;
  const invested  = outputs.investedValue        ?? 0;

  // 1. Annual opportunity cost
  results.push({
    id: "screen.annual-cost",
    type: "warning",
    message: `${hours}h/day of non-work screen time costs $${annual.toLocaleString()}/year in opportunity value at your $${rate}/hr rate.`,
    detail: `That's $${weeklyVal.toLocaleString()}/week — time that could be spent on skills, side projects, or rest.`,
  });

  // 2. Lifetime time consumed
  if (days >= 30) {
    results.push({
      id: "screen.lifetime-days",
      type: "warning",
      message: `Over ${years} years, ${hours}h/day consumes ${days.toFixed(0)} full days — more than ${(days / 30).toFixed(0)} months of your life.`,
      detail: `That's continuous time, not spread across days — you're trading ${(days / 30).toFixed(1)} months to screens.`,
    });
  }

  // 3. Total opportunity cost over projection
  if (total > 10_000) {
    results.push({
      id: "screen.total-cost",
      type: "milestone",
      message: `Over ${years} years, the total opportunity cost is $${total.toLocaleString()} — enough to ${total > 100_000 ? "retire years earlier" : "fully fund an emergency fund and more"}.`,
      detail: `Reducing screen time by 1 hour/day at $${rate}/hr saves $${Math.round(365 * rate).toLocaleString()}/year.`,
    });
  }

  // 4. Invested equivalent
  if (invested > annual) {
    results.push({
      id: "screen.invested-equivalent",
      type: "opportunity",
      message: `If the $${annual.toLocaleString()}/year opportunity cost were invested at 7%, it would be worth $${invested.toLocaleString()} after ${years} years.`,
      detail: `Screen time has a compound cost — not just the hours lost, but the compounding growth of what those hours could produce.`,
    });
  }

  // 5. High usage warning
  if (hours >= 6) {
    results.push({
      id: "screen.high-usage",
      type: "warning",
      message: `${hours}h/day puts you well above the average. Studies link 6+ hours of daily screen time to reduced sleep quality, attention span, and productivity.`,
      detail: `A 30-day screen reduction challenge — cutting to ${Math.max(1, hours - 2)}h/day — would reclaim ${Math.round(2 * 30)} hours immediately.`,
    });
  }

  // 6. One-hour reduction nudge
  const hourReductionValue = Math.round(365 * rate);
  if (hourReductionValue > 5_000) {
    results.push({
      id: "screen.one-hour-reduction",
      type: "opportunity",
      message: `Cutting just 1 hour/day frees up $${hourReductionValue.toLocaleString()}/year in opportunity value and 365 hours of recovered time.`,
      detail: `365 hours is enough to learn a new language, complete a certification, or build a meaningful side project.`,
    });
  }

  return results;
}
