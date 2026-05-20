import type { Insight } from "../index";

interface GamblingInputs {
  weeklySpend: number;
  years:       number;
}

interface GamblingOutputs {
  totalLoss?:              number;
  investedValue?:          number;
  opportunityCost?:        number;
  weeklyInMonthlyTerms?:   number;
  dailyCost?:              number;
  returnMultiple?:         number;
}

export function gamblingLossInsights(
  inputs: GamblingInputs,
  outputs: GamblingOutputs
): Insight[] {
  const results: Insight[] = [];

  const weekly    = Number(inputs.weeklySpend);
  const years     = Number(inputs.years);
  const total     = outputs.totalLoss            ?? 0;
  const invested  = outputs.investedValue        ?? 0;
  const oppCost   = outputs.opportunityCost      ?? 0;
  const monthly   = outputs.weeklyInMonthlyTerms ?? 0;
  const daily     = outputs.dailyCost            ?? 0;
  const multiple  = outputs.returnMultiple       ?? 0;

  // 1. Core sunk cost framing
  results.push({
    id: "gambling.sunk-cost",
    type: "warning",
    message: `Gambling $${weekly}/week for ${years} years costs $${total.toLocaleString()} — money with a near-zero expected return.`,
    detail: `The house edge ensures the expected value of every dollar wagered is negative. There is no long-run profitable gambling strategy.`,
  });

  // 2. Loss multiple — what the market would have done
  if (multiple >= 1.5) {
    results.push({
      id: "gambling.return-multiple",
      type: "warning",
      message: `If invested instead, every $1 you gambled becomes $${multiple.toFixed(1)} over ${years} years at 7%.`,
      detail: `That's the compounding gap — the casino keeps your principal and all potential gains.`,
    });
  }

  // 3. Monthly reframe
  if (monthly > 100) {
    results.push({
      id: "gambling.monthly-reframe",
      type: "info",
      message: `$${weekly}/week is $${monthly.toLocaleString()}/month — enough to max out a Roth IRA contribution in ${Math.ceil(6000 / monthly)} months.`,
      detail: `Framed monthly, the habit reveals itself as a significant recurring expense with no wealth-building component.`,
    });
  }

  // 4. Investment alternative
  if (invested > total + 5_000) {
    results.push({
      id: "gambling.investment-alternative",
      type: "opportunity",
      message: `The same $${weekly}/week invested at 7% would be $${invested.toLocaleString()} after ${years} years — $${oppCost.toLocaleString()} more than what you spent.`,
      detail: `This is the real cost of gambling: not just the cash lost, but the compound growth that never happened.`,
    });
  }

  // 5. Daily habit framing
  if (daily > 5) {
    results.push({
      id: "gambling.daily-framing",
      type: "info",
      message: `That's $${daily.toFixed(2)} every day — including days you don't gamble.`,
      detail: `Daily cost framing makes recurring habits feel more real. $${daily.toFixed(2)}/day is a bill you pay 365 days a year.`,
    });
  }

  // 6. Escalation risk
  if (weekly >= 100) {
    results.push({
      id: "gambling.escalation-risk",
      type: "warning",
      message: `At $${weekly}/week, this is a significant financial commitment. Problem gambling often escalates — and average losses underestimate peak-session losses.`,
      detail: `If gambling feels compulsive rather than recreational, resources like the National Problem Gambling Helpline (1-800-522-4700) provide confidential support.`,
    });
  }

  return results;
}
