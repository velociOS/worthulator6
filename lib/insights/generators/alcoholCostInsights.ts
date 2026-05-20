import type { Insight } from "../index";

interface AlcoholInputs {
  drinksPerWeek: number;
  costPerDrink:  number;
}

interface AlcoholOutputs {
  yearlyCost?:          number;
  tenYearCost?:         number;
  investedValue?:       number;
  weeklySpend?:         number;
  dailyCost?:           number;
  twentyYearInvested?:  number;
}

export function alcoholCostInsights(
  inputs: AlcoholInputs,
  outputs: AlcoholOutputs
): Insight[] {
  const results: Insight[] = [];

  const drinks  = Number(inputs.drinksPerWeek);
  const perDrink = Number(inputs.costPerDrink);
  const yearly   = outputs.yearlyCost         ?? 0;
  const tenYear  = outputs.tenYearCost        ?? 0;
  const invested = outputs.investedValue      ?? 0;
  const weekly   = outputs.weeklySpend        ?? 0;
  const daily    = outputs.dailyCost          ?? 0;
  const twenty   = outputs.twentyYearInvested ?? 0;

  // 1. Core habit cost — always shown
  results.push({
    id: "alcohol.annual-habit",
    type: "info",
    message: `${drinks} drinks/week at $${perDrink} each costs $${weekly.toLocaleString()}/week — $${yearly.toLocaleString()}/year.`,
    detail: `That's $${daily.toFixed(2)}/day, every day, whether you drink or not on average.`,
  });

  // 2. Decade framing
  if (tenYear > 5_000) {
    results.push({
      id: "alcohol.decade-framing",
      type: "warning",
      message: `A decade of this habit totals $${tenYear.toLocaleString()} — and that's before any price increases.`,
      detail: `Alcohol prices have risen ~3-4% per year historically. Real 10-year cost is likely higher.`,
    });
  }

  // 3. Investment alternative
  if (invested > tenYear) {
    results.push({
      id: "alcohol.investment-alternative",
      type: "opportunity",
      message: `Invested at 7% instead, your $${yearly.toLocaleString()}/year becomes $${invested.toLocaleString()} over 10 years — $${(invested - tenYear).toLocaleString()} more than just stopping.`,
      detail: `The opportunity cost isn't just the cash spent — it's the compound growth you forgo.`,
    });
  }

  // 4. 20-year horizon framing
  if (twenty > 50_000) {
    results.push({
      id: "alcohol.twenty-year",
      type: "milestone",
      message: `Over 20 years, the same money invested at 7% grows to $${twenty.toLocaleString()}.`,
      detail: `That's a retirement supplement, a house deposit, or 2+ years of financial runway — all from one habit.`,
    });
  }

  // 5. Heavy drinking threshold
  if (drinks >= 14) {
    results.push({
      id: "alcohol.heavy-threshold",
      type: "warning",
      message: `${drinks} drinks/week exceeds the CDC's "heavy drinking" threshold (14+ for men, 7+ for women).`,
      detail: `Beyond the financial cost, heavy drinking is associated with increased health risks that can compound long-term costs significantly.`,
    });
  }

  // 6. Per-drink equivalence (if high cost)
  if (perDrink >= 10 && drinks >= 7) {
    const weeklyGroceries = Math.round(weekly * 0.7); // rough grocery equivalent
    results.push({
      id: "alcohol.cost-context",
      type: "info",
      message: `Your weekly alcohol spend of $${weekly.toLocaleString()} is comparable to a full week of groceries for one person.`,
      detail: `Context reframes the habit. It's not just the amount — it's what else that money represents.`,
    });
  }

  return results;
}
