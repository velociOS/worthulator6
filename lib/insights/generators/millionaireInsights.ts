import type { Insight } from "../index";

interface MillionaireInputs {
  currentSavings: number;
  monthlySavings: number;
  annualReturn: number;
}

interface MillionaireOutputs {
  yearsToMillion?: number;
  totalContributed?: number;
  interestEarned?: number;
  progressPercent?: number;
  marketContribPct?: number;
  yearsFasterWith200?: number;
}

export function millionaireInsights(
  inputs: MillionaireInputs,
  outputs: MillionaireOutputs
): Insight[] {
  const results: Insight[] = [];

  const years       = outputs.yearsToMillion    ?? 0;
  const contributed = outputs.totalContributed  ?? 0;
  const interest    = outputs.interestEarned    ?? 0;
  const progress    = outputs.progressPercent   ?? 0;
  const mktPct      = outputs.marketContribPct  ?? 0;
  const faster200   = outputs.yearsFasterWith200 ?? 0;
  const savings     = Number(inputs.currentSavings);
  const contrib     = Number(inputs.monthlySavings);

  // 1. Already there
  if (savings >= 1_000_000) {
    results.push({
      id: "millionaire.already-there",
      type: "milestone",
      message: `You've already reached $1,000,000. Welcome to the millionaire club.`,
      detail: `At 4% withdrawal, that's $${Math.round(savings * 0.04 / 12).toLocaleString()}/month in passive income.`,
    });
    return results;
  }

  // 2. Progress milestone
  if (progress > 0) {
    const pct = progress.toFixed(1);
    if (progress >= 75) {
      results.push({
        id: "millionaire.progress-milestone",
        type: "milestone",
        message: `You're ${pct}% of the way to $1,000,000 — almost there.`,
        detail: `$${savings.toLocaleString()} invested. Only $${(1_000_000 - savings).toLocaleString()} to go.`,
      });
    } else if (progress >= 50) {
      results.push({
        id: "millionaire.progress-milestone",
        type: "milestone",
        message: `You're over halfway to $1M — ${pct}% of the way there.`,
        detail: `You've done the hard part. Compound interest does more heavy lifting the closer you get.`,
      });
    } else {
      results.push({
        id: "millionaire.progress-milestone",
        type: "info",
        message: `You're ${pct}% of the way to $1,000,000.`,
        detail: `$${savings.toLocaleString()} invested so far. At $${contrib.toLocaleString()}/month, you'll hit $1M in ${years} years.`,
      });
    }
  }

  // 3. Market does the heavy lifting
  if (mktPct >= 40) {
    results.push({
      id: "millionaire.market-contribution",
      type: "milestone",
      message: `The market funds ${mktPct.toFixed(1)}% of your million — you only contribute ${(100 - mktPct).toFixed(1)}%.`,
      detail: `Compound interest turns $${Math.round(contributed).toLocaleString()} of your money into $${(1_000_000).toLocaleString()} — the rest is pure growth.`,
    });
  }

  // 4. Accelerator: $200 extra
  if (faster200 >= 1) {
    results.push({
      id: "millionaire.accelerator-200",
      type: "opportunity",
      message: `An extra $200/month gets you to $1M ${faster200} year${faster200 === 1 ? "" : "s"} faster.`,
      detail: `$200/month is less than most people spend on takeout. Redirected to investing, it cuts years off the timeline.`,
    });
  }

  // 5. Interest milestone
  if (interest > contributed && interest > 100_000) {
    results.push({
      id: "millionaire.interest-exceeds-contributions",
      type: "milestone",
      message: `The market will contribute more than you do — $${interest.toLocaleString()} in growth vs. $${Math.round(contributed).toLocaleString()} from your pocket.`,
      detail: `This is compound interest working as intended: time in the market does more work than your monthly contributions.`,
    });
  }

  // 6. Long-timeline nudge
  if (years >= 30) {
    results.push({
      id: "millionaire.long-timeline",
      type: "warning",
      message: `At your current rate, $1M takes ${years} years. Increasing your monthly investment now has an outsized impact.`,
      detail: `Because of compounding, $100 extra today is worth far more than $100 extra in year 20. Start the increase now.`,
    });
  } else if (years > 0 && years <= 10) {
    results.push({
      id: "millionaire.fast-track",
      type: "milestone",
      message: `You're on pace for $1M in ${years} years or less. You're in rare company.`,
      detail: `Less than 10% of households hit $1M before age 50. Your $${contrib.toLocaleString()}/month habit puts you on that path.`,
    });
  }

  return results;
}
