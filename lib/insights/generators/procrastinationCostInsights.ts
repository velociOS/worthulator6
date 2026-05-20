import type { Insight } from "../index";

interface ProcrastinationInputs {
  hoursPerDay:  number;
  hourlyRate:   number;
  daysPerYear:  number;
}

interface ProcrastinationOutputs {
  annualLoss?:  number;
  weeklyLoss?:  number;
  tenYearLoss?: number;
  dailyLoss?:   number;
  monthlyLoss?: number;
  careerLoss?:  number;
}

export function procrastinationCostInsights(
  inputs: ProcrastinationInputs,
  outputs: ProcrastinationOutputs
): Insight[] {
  const results: Insight[] = [];

  const hours   = Number(inputs.hoursPerDay);
  const rate    = Number(inputs.hourlyRate);
  const days    = Number(inputs.daysPerYear);
  const annual  = outputs.annualLoss  ?? 0;
  const weekly  = outputs.weeklyLoss  ?? 0;
  const tenYear = outputs.tenYearLoss ?? 0;
  const daily   = outputs.dailyLoss   ?? 0;
  const monthly = outputs.monthlyLoss ?? 0;
  const career  = outputs.careerLoss  ?? 0;

  // 1. Daily cost — always show
  results.push({
    id: "procrastination.daily-cost",
    type: "warning",
    message: `${hours}h of daily procrastination at $${rate}/hr costs $${daily.toLocaleString()}/day — $${weekly.toLocaleString()}/week.`,
    detail: `Most people underestimate the daily cost because it's diffuse — a few minutes here, an hour there. This is what it totals.`,
  });

  // 2. Annual earnings lost
  if (annual > 5_000) {
    results.push({
      id: "procrastination.annual-loss",
      type: "warning",
      message: `$${annual.toLocaleString()}/year in lost earnings. Over 12 months, that's a salary-level sum simply left on the table.`,
      detail: `Reducing procrastination by 30 minutes/day would recover $${Math.round(annual / (hours / 0.5)).toLocaleString()}/year.`,
    });
  }

  // 3. Monthly framing — actionable
  results.push({
    id: "procrastination.monthly",
    type: "info",
    message: `$${monthly.toLocaleString()}/month is the cost of this habit — enough to fund a Roth IRA in ${Math.ceil(500 / monthly)} months.`,
    detail: `Monthly framing makes the habit feel real. It's a recurring bill you're paying without getting anything in return.`,
  });

  // 4. 10-year compound loss
  if (tenYear > 50_000) {
    results.push({
      id: "procrastination.ten-year",
      type: "milestone",
      message: `Invested at 7%, that $${annual.toLocaleString()}/year becomes $${tenYear.toLocaleString()} over 10 years — the true compound cost.`,
      detail: `This isn't just lost earnings — it's the wealth those earnings could have built. Procrastination has a compound price.`,
    });
  }

  // 5. Career-scale loss
  if (career > 100_000) {
    results.push({
      id: "procrastination.career-loss",
      type: "warning",
      message: `Over a 20-year career, the same $${annual.toLocaleString()}/year invested at 7% would be $${career.toLocaleString()} — a retirement-defining number.`,
      detail: `The scale of this is hard to grasp daily but impossible to ignore over decades. Procrastination is a tax on your future self.`,
    });
  }

  // 6. Minimum-effective-dose nudge
  if (hours >= 2) {
    const halfHourSave = Math.round((annual / hours) * 0.5);
    results.push({
      id: "procrastination.msd-nudge",
      type: "opportunity",
      message: `Cutting procrastination by just 30 minutes/day would save $${halfHourSave.toLocaleString()}/year — with almost no lifestyle change required.`,
      detail: `The Pomodoro Technique, time-boxing, or a single weekly review often reduces unstructured distraction time by 30–60 minutes without feeling like deprivation.`,
    });
  }

  return results;
}
