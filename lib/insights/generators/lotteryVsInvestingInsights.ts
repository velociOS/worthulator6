import type { Insight } from "../index";

interface LotteryInputs {
  weekly: number;
  years: number;
  return: number;
}

interface LotteryOutputs {
  invested?:     number;
  spent?:        number;
  gap?:          number;
  lossMultiple?: number;
  monthlySpend?: number;
  dailyCost?:    number;
}

export function lotteryVsInvestingInsights(
  inputs: LotteryInputs,
  outputs: LotteryOutputs
): Insight[] {
  const results: Insight[] = [];

  const weekly    = Number(inputs.weekly);
  const years     = Number(inputs.years);
  const rate      = Number(inputs.return);
  const invested  = outputs.invested      ?? 0;
  const spent     = outputs.spent         ?? 0;
  const gap       = outputs.gap           ?? 0;
  const multiple  = outputs.lossMultiple  ?? 0;
  const monthly   = outputs.monthlySpend  ?? 0;
  const daily     = outputs.dailyCost     ?? 0;

  // 1. Core comparison — always shown
  results.push({
    id: "lottery.core-comparison",
    type: "warning",
    message: `Investing your $${weekly}/week instead of lottery tickets would build $${invested.toLocaleString()} over ${years} years.`,
    detail: `You'd spend $${spent.toLocaleString()} on tickets and have virtually nothing to show. Invested at ${rate}%, it's $${invested.toLocaleString()}.`,
  });

  // 2. Loss multiple
  if (multiple >= 2) {
    results.push({
      id: "lottery.loss-multiple",
      type: "warning",
      message: `For every $1 you put into lottery tickets, you give up $${multiple.toFixed(1)} in future investment value.`,
      detail: `That's a ${multiple.toFixed(1)}x opportunity cost — the "cost" of each ticket is far more than its face value.`,
    });
  }

  // 3. Monthly reframe
  if (monthly > 50) {
    results.push({
      id: "lottery.monthly-reframe",
      type: "info",
      message: `You're spending $${monthly.toLocaleString()}/month on lottery — enough to max a Roth IRA contribution in a few months.`,
      detail: `$${monthly.toLocaleString()}/month invested at ${rate}% for ${years} years grows to $${invested.toLocaleString()}.`,
    });
  }

  // 4. Daily habit
  if (daily > 0) {
    results.push({
      id: "lottery.daily-habit",
      type: "info",
      message: `That's $${daily.toFixed(2)}/day — a small habit with a $${invested.toLocaleString()} price tag over ${years} years.`,
      detail: `Small daily habits compound in both directions — toward debt or toward wealth.`,
    });
  }

  // 5. Gap (what compounding adds beyond what you'd have spent)
  if (gap > 10_000) {
    results.push({
      id: "lottery.compound-gap",
      type: "opportunity",
      message: `The market adds $${gap.toLocaleString()} on top of what you contribute — money created from nothing.`,
      detail: `Of the $${invested.toLocaleString()} total, only $${spent.toLocaleString()} came from you. The rest is compounding at work.`,
    });
  }

  // 6. Jackpot odds context
  results.push({
    id: "lottery.odds-context",
    type: "info",
    message: `The odds of winning a major jackpot are roughly 1 in 300 million. The odds of building wealth by investing consistently are near certainty.`,
    detail: `Expected value of a lottery ticket is negative by design. Compound investing has a provably positive expected value.`,
  });

  return results;
}
