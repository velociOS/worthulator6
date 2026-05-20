import type { Insight } from "../index";

interface VapingInputs {
  dailyCost: number;
}

interface VapingOutputs {
  yearlyCost?:   number;
  fiveYear?:     number;
  invested?:     number;
  weeklySpend?:  number;
  monthlySpend?: number;
  tenYear?:      number;
  invested10yr?: number;
}

export function vapingCostInsights(
  inputs: VapingInputs,
  outputs: VapingOutputs
): Insight[] {
  const results: Insight[] = [];

  const daily   = Number(inputs.dailyCost);
  const yearly  = outputs.yearlyCost   ?? 0;
  const five    = outputs.fiveYear     ?? 0;
  const ten     = outputs.tenYear      ?? 0;
  const inv5    = outputs.invested     ?? 0;
  const inv10   = outputs.invested10yr ?? 0;
  const weekly  = outputs.weeklySpend  ?? 0;
  const monthly = outputs.monthlySpend ?? 0;

  // 1. Core daily habit framing
  results.push({
    id: "vaping.daily-habit",
    type: "info",
    message: `$${daily}/day on vaping is $${weekly}/week, $${monthly}/month, $${yearly.toLocaleString()}/year.`,
    detail: `A habit that feels small daily adds up to a significant annual expense.`,
  });

  // 2. Five-year milestone
  if (five > 2_000) {
    results.push({
      id: "vaping.five-year",
      type: "warning",
      message: `Over 5 years, this habit costs $${five.toLocaleString()} — enough to fully fund an emergency fund and more.`,
      detail: `5 years is the typical window where habit costs become undeniable. $${five.toLocaleString()} is real money with real alternatives.`,
    });
  }

  // 3. Investment alternative — 5yr
  if (inv5 > five) {
    results.push({
      id: "vaping.investment-5yr",
      type: "opportunity",
      message: `Invested at 7%, $${yearly.toLocaleString()}/year becomes $${inv5.toLocaleString()} over 5 years.`,
      detail: `Every pod or bottle you buy is a small trade against your future self. Compound interest doesn't care about the reason you didn't invest.`,
    });
  }

  // 4. Ten-year framing
  if (ten > 5_000) {
    results.push({
      id: "vaping.ten-year",
      type: "warning",
      message: `Over 10 years, the total habit cost is $${ten.toLocaleString()} — or $${inv10.toLocaleString()} if that money had been invested.`,
      detail: `$${(inv10 - ten).toLocaleString()} is the true opportunity cost — the compound growth you gave up.`,
    });
  }

  // 5. Health cost framing
  if (daily >= 5) {
    results.push({
      id: "vaping.health-context",
      type: "warning",
      message: `Nicotine dependency carries long-term health costs that don't appear in this calculator — medical bills, reduced productivity, and insurance premiums.`,
      detail: `The financial cost shown here is only the direct spend. Add health cost estimates and the real figure is substantially higher.`,
    });
  }

  // 6. Quitting reframe
  results.push({
    id: "vaping.quit-reframe",
    type: "opportunity",
    message: `Quitting today redirects $${yearly.toLocaleString()}/year. In 10 years, that's $${inv10.toLocaleString()} invested — a life-changing number for a daily habit.`,
    detail: `The payoff of quitting is immediate in cash flow and compounds indefinitely in investment value.`,
  });

  return results;
}
