import type { Insight } from "../index";

interface WfhInputs {
  dailyCommuteCost: number;
  officeDays:       number;
  dailyFood:        number;
  commuteMinutes:   number;
}

interface WfhOutputs {
  yearlySavings?:        number;
  monthlySavings?:       number;
  timeSavedHours?:       number;
  tenYearSavings?:       number;
  investedSavings10yr?:  number;
  hourlyValueRecovered?: number;
}

export function wfhSavingsInsights(
  inputs: WfhInputs,
  outputs: WfhOutputs
): Insight[] {
  const results: Insight[] = [];

  const commuteCost   = Number(inputs.dailyCommuteCost);
  const officeDays    = Number(inputs.officeDays);
  const foodCost      = Number(inputs.dailyFood);
  const commuteMin    = Number(inputs.commuteMinutes);
  const yearly        = outputs.yearlySavings        ?? 0;
  const monthly       = outputs.monthlySavings       ?? 0;
  const timeHours     = outputs.timeSavedHours       ?? 0;
  const tenYear       = outputs.tenYearSavings       ?? 0;
  const invested10    = outputs.investedSavings10yr  ?? 0;
  const hrValue       = outputs.hourlyValueRecovered ?? 0;

  // 1. Annual savings summary — always shown
  results.push({
    id: "wfh.annual-savings",
    type: "positive",
    message: `Working from home ${officeDays} day(s)/week saves $${yearly.toLocaleString()}/year ($${monthly.toLocaleString()}/month) in commute and food costs.`,
    detail: `That's real take-home value — no gross-up needed. WFH savings arrive after-tax, making them worth more than equivalent salary increases.`,
  });

  // 2. Time recovered
  if (timeHours > 100) {
    results.push({
      id: "wfh.time-recovered",
      type: "positive",
      message: `You reclaim ${timeHours.toLocaleString()} hours/year by not commuting — equivalent to ${Math.round(timeHours / 40)} full working weeks returned to your life.`,
      detail: `Those hours can compound into skills, side income, fitness, or rest. Time recovered from commuting is among the most valuable WFH benefits.`,
    });
  }

  // 3. Hourly value of time recovered
  if (hrValue > 10 && timeHours > 0) {
    results.push({
      id: "wfh.hourly-value",
      type: "info",
      message: `Each hour you don't commute is worth $${hrValue} in saved direct costs — before accounting for the value of your time itself.`,
      detail: `Add your personal hourly value to this and the effective hourly savings of WFH often exceeds $50/hour.`,
    });
  }

  // 4. 10-year accumulated savings
  if (tenYear > 20_000) {
    results.push({
      id: "wfh.ten-year",
      type: "milestone",
      message: `Over 10 years, this WFH arrangement saves $${tenYear.toLocaleString()} in direct costs alone — before factoring in time.`,
      detail: `Companies frequently undervalue WFH as a compensation benefit. In salary terms, $${yearly.toLocaleString()}/year in savings is equivalent to a raise of $${Math.round(yearly / 0.72).toLocaleString()} gross (at 28% tax).`,
    });
  }

  // 5. Investment value of savings
  if (invested10 > tenYear) {
    results.push({
      id: "wfh.invested-savings",
      type: "opportunity",
      message: `If the $${yearly.toLocaleString()}/year WFH savings were invested at 7%, they'd be worth $${invested10.toLocaleString()} after 10 years.`,
      detail: `The compounding case for WFH is often more powerful than the direct savings alone. Redirect the savings to investments rather than lifestyle inflation.`,
    });
  }

  // 6. Food cost insight
  const annualFood = Math.round(foodCost * officeDays * 52);
  if (annualFood > 2_000) {
    results.push({
      id: "wfh.food-cost",
      type: "info",
      message: `$${foodCost}/day in office food and coffee costs $${annualFood.toLocaleString()}/year at ${officeDays} day(s)/week. Working from home eliminates this category almost entirely.`,
      detail: `Bought lunches and coffees are one of the highest-visibility household discretionary expenses — and one of the easiest to reclaim with WFH.`,
    });
  }

  return results;
}
