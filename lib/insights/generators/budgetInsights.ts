import type { Insight } from "../index";

interface BudgetInputs {
  income:    number;
  housing:   number;
  food:      number;
  transport: number;
  debt:      number;
  other:     number;
}

interface BudgetOutputs {
  leftover?:           number;
  savingsRate?:        number;
  expenseRatio?:       number;
  annualLeftover?:     number;
  housingRatio?:       number;
  debtRatio?:          number;
  tenYearIfInvested?:  number;
}

export function budgetInsights(
  inputs: BudgetInputs,
  outputs: BudgetOutputs
): Insight[] {
  const results: Insight[] = [];

  const income      = Number(inputs.income);
  const housing     = Number(inputs.housing);
  const debt        = Number(inputs.debt);
  const leftover    = outputs.leftover           ?? 0;
  const savingsRate = outputs.savingsRate        ?? 0;
  const expenseRatio = outputs.expenseRatio      ?? 0;
  const annualLeft  = outputs.annualLeftover     ?? 0;
  const housingPct  = outputs.housingRatio       ?? 0;
  const debtPct     = outputs.debtRatio          ?? 0;
  const tenYear     = outputs.tenYearIfInvested  ?? 0;

  // 1. Core budget health — always shown
  if (leftover < 0) {
    results.push({
      id: "budget.overspending",
      type: "warning",
      message: `You're spending $${Math.abs(leftover).toLocaleString()}/month more than you earn — that gap compounds as debt every month you don't address it.`,
      detail: `Start by identifying the largest discretionary category. Even a 10% cut in one area can flip a deficit to surplus.`,
    });
  } else {
    results.push({
      id: "budget.savings-rate",
      type: savingsRate >= 20 ? "positive" : savingsRate >= 10 ? "info" : "warning",
      message: `${savingsRate}% savings rate. ${savingsRate >= 20 ? "Strong — you're building wealth." : savingsRate >= 10 ? "Decent, but there's room to grow." : "Below the 10% minimum many financial advisors recommend."}`,
      detail: `The 50/30/20 rule suggests 20% of take-home going to savings and debt repayment. Your current rate is ${savingsRate}%.`,
    });
  }

  // 2. Housing ratio check
  if (housingPct > 30) {
    results.push({
      id: "budget.housing-heavy",
      type: "warning",
      message: `Housing takes ${housingPct}% of your income — above the 30% rule of thumb. At $${housing.toLocaleString()}/month, it's your biggest constraint.`,
      detail: `When housing exceeds 30–35%, it crowds out savings and leaves little buffer for unexpected expenses or goals.`,
    });
  } else if (housingPct <= 25) {
    results.push({
      id: "budget.housing-lean",
      type: "positive",
      message: `Housing at ${housingPct}% of income is well within the 30% guideline — a healthy foundation for wealth-building.`,
      detail: `Keeping housing lean is one of the highest-leverage financial decisions. The savings compound every month for the life of the tenancy or mortgage.`,
    });
  }

  // 3. Debt burden
  if (debtPct > 15) {
    results.push({
      id: "budget.debt-heavy",
      type: "warning",
      message: `Debt payments consume ${debtPct}% of your income — $${debt.toLocaleString()}/month. Reducing this is the fastest way to free up cash flow.`,
      detail: `Every dollar of debt eliminated redirects to savings. Prioritise high-interest debt first using the avalanche method.`,
    });
  }

  // 4. Annual perspective
  if (annualLeft > 0) {
    results.push({
      id: "budget.annual-perspective",
      type: "info",
      message: `Your $${leftover.toLocaleString()}/month surplus = $${annualLeft.toLocaleString()} per year. That's your real annual wealth-building capacity.`,
      detail: `Seeing the annual number makes the surplus feel more meaningful — and easier to commit to investing rather than spending.`,
    });
  }

  // 5. 10-year compound value
  if (tenYear > 20_000 && leftover > 0) {
    results.push({
      id: "budget.compound-value",
      type: "opportunity",
      message: `If your $${leftover.toLocaleString()}/month surplus were invested at 7%, it would grow to $${tenYear.toLocaleString()} over 10 years.`,
      detail: `A consistent monthly surplus, invested, is the engine of wealth. The number that matters isn't income — it's how much you don't spend.`,
    });
  }

  // 6. Savings rate benchmark
  if (savingsRate >= 0 && savingsRate < 20 && leftover >= 0) {
    const gapToTwenty = Math.round(income * 0.2 - leftover);
    if (gapToTwenty > 0) {
      results.push({
        id: "budget.savings-gap",
        type: "opportunity",
        message: `To hit a 20% savings rate, you need to find $${gapToTwenty.toLocaleString()}/month — about $${Math.round(gapToTwenty / 30)}/day in expense reductions.`,
        detail: `$${gapToTwenty.toLocaleString()}/month is often achievable through subscription cuts, dining adjustments, or one major category reduction.`,
      });
    }
  }

  return results;
}
