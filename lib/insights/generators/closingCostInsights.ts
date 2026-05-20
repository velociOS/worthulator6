import type { Insight } from "../types";

const US_MEDIAN_RENT   = 2000;  // $/month
const US_MEDIAN_SALARY = 65000; // $/year

export interface ClosingCostInputs {
  homePrice: number;
  percent: number;
}

export interface ClosingCostOutputs {
  closingCost: number;
  rangeLow: number;
  rangeHigh: number;
  asMonthsRent?: number;
  asWeeksIncome?: number;
  breakEvenMonths?: number;
}

export function generateClosingCostInsights(
  inputs: ClosingCostInputs,
  outputs: ClosingCostOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { homePrice, percent } = inputs;
  const {
    closingCost,
    rangeLow,
    rangeHigh,
    asMonthsRent   = closingCost / US_MEDIAN_RENT,
    asWeeksIncome  = closingCost / (US_MEDIAN_SALARY / 52),
    breakEvenMonths = Math.round(closingCost / (homePrice * 0.03 / 12)),
  } = outputs;

  // hidden-cost-framing — always fires, milestone framing
  insights.push({
    id: "closing-cost.hidden-cost-framing",
    title: `Equivalent to ${asMonthsRent.toFixed(1)} months of rent`,
    body: `Your estimated $${closingCost.toLocaleString()} in closing costs is roughly ${asMonthsRent.toFixed(1)} months of average US rent — money due before you get your keys, on top of your down payment.`,
    severity: "neutral",
    category: "hidden-cost",
  });

  // income-framing — milestone framing
  insights.push({
    id: "closing-cost.income-framing",
    title: `${asWeeksIncome.toFixed(1)} weeks of median income`,
    body: `At the US median salary of $65k/year, covering $${closingCost.toLocaleString()} in closing costs requires ${asWeeksIncome.toFixed(1)} weeks of gross pay — almost entirely front-loaded before ownership begins.`,
    severity: percent >= 4 ? "warning" : "neutral",
    category: "affordability-pressure",
  });

  // break-even — appreciation milestone
  insights.push({
    id: "closing-cost.break-even-appreciation",
    title: `Break-even through appreciation: ${breakEvenMonths} months`,
    body: `Assuming 3% annual home appreciation, it takes roughly ${breakEvenMonths} months (~${Math.round(breakEvenMonths / 12 * 10) / 10} years) for your home's growth to offset the closing costs you paid upfront.`,
    severity: breakEvenMonths > 24 ? "warning" : "neutral",
    category: "investment-opportunity",
  });

  // range-spread — uncertainty framing
  if (rangeHigh - rangeLow > 5000) {
    insights.push({
      id: "closing-cost.range-spread",
      title: `Budget for $${rangeHigh.toLocaleString()} — not $${closingCost.toLocaleString()}`,
      body: `Closing costs can vary by $${(rangeHigh - rangeLow).toLocaleString()} depending on lender, title company, and taxes. Always budget for the high estimate ($${rangeHigh.toLocaleString()}) to avoid a last-minute cash shortfall.`,
      severity: "warning",
      category: "financial-stress",
    });
  }

  // high-closing-pct
  if (percent >= 4) {
    insights.push({
      id: "closing-cost.high-percentage",
      title: "Above-average closing cost rate",
      body: `At ${percent}%, your closing costs are above the typical 2–3% range. Consider requesting a Loan Estimate from multiple lenders — origination fees, title insurance, and escrow are often negotiable.`,
      severity: "neutral",
      category: "opportunity-cost",
    });
  }

  return insights;
}
