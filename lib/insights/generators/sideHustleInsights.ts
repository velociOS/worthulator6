import type { Insight } from "../index";

interface SideHustleInputs {
  hoursPerWeek: number;
  rate:         number;
  expensePct:   number;
  taxRate:      number;
}

interface SideHustleOutputs {
  netMonthly?:      number;
  yearlyNet?:       number;
  hourlyEffective?: number;
  monthlyRevenue?:  number;
  annualTaxPaid?:   number;
  fiveYearNet?:     number;
}

export function sideHustleInsights(
  inputs: SideHustleInputs,
  outputs: SideHustleOutputs
): Insight[] {
  const results: Insight[] = [];

  const hours       = Number(inputs.hoursPerWeek);
  const rate        = Number(inputs.rate);
  const expPct      = Number(inputs.expensePct);
  const taxPct      = Number(inputs.taxRate);
  const netMonthly  = outputs.netMonthly       ?? 0;
  const yearlyNet   = outputs.yearlyNet        ?? 0;
  const effective   = outputs.hourlyEffective  ?? 0;
  const revenue     = outputs.monthlyRevenue   ?? 0;
  const taxPaid     = outputs.annualTaxPaid    ?? 0;
  const fiveYear    = outputs.fiveYearNet      ?? 0;

  // 1. True hourly rate framing
  const overhead = expPct + taxPct;
  if (effective < rate * 0.6) {
    results.push({
      id: "hustle.true-rate-shock",
      type: "warning",
      message: `After ${expPct}% expenses and ${taxPct}% tax, your $${rate}/hr rate becomes $${effective}/hr effective — a ${Math.round((1 - effective / rate) * 100)}% haircut.`,
      detail: `${overhead}% of your gross revenue disappears before you see it. Factor this into any rate negotiation.`,
    });
  } else {
    results.push({
      id: "hustle.true-rate",
      type: "info",
      message: `Your $${rate}/hr earns $${effective}/hr after expenses and tax — a ${Math.round((1 - effective / rate) * 100)}% reduction.`,
      detail: `${expPct}% expenses + ${taxPct}% tax = ${overhead}% overhead. Every $1 rate increase adds $${Math.round((1 - overhead / 100) * 100) / 100} in take-home per hour.`,
    });
  }

  // 2. Monthly income milestone
  if (netMonthly >= 2000) {
    results.push({
      id: "hustle.income-milestone",
      type: "milestone",
      message: `$${netMonthly.toLocaleString()}/month net — this side hustle is a serious income stream, not pocket change.`,
      detail: `At $${yearlyNet.toLocaleString()}/year, it would replace a $${Math.round(yearlyNet / 2080)}/hr full-time salary.`,
    });
  } else if (netMonthly >= 500) {
    results.push({
      id: "hustle.income-milestone",
      type: "info",
      message: `$${netMonthly.toLocaleString()}/month net — enough to fully fund an emergency fund or max an IRA in under a year.`,
      detail: `$${yearlyNet.toLocaleString()}/year is real money. Small consistent rate increases compound this significantly.`,
    });
  }

  // 3. Tax is the biggest surprise
  if (taxPaid > 2000) {
    results.push({
      id: "hustle.tax-burden",
      type: "warning",
      message: `You'll owe roughly $${taxPaid.toLocaleString()} in taxes on this hustle — set aside $${Math.round(taxPaid / 12).toLocaleString()}/month now.`,
      detail: `Self-employment income includes a 15.3% SE tax on top of income tax. Unlike W-2, nothing is withheld automatically.`,
    });
  }

  // 4. Rate increase leverage
  const rateBoost10 = Math.round(hours * 10 * 4.33 * (1 - expPct / 100) * (1 - taxPct / 100));
  if (rateBoost10 > 0) {
    results.push({
      id: "hustle.rate-leverage",
      type: "opportunity",
      message: `Raising your rate by $10/hr adds $${rateBoost10.toLocaleString()} to your annual net — no extra hours required.`,
      detail: `Rate increases are the highest-leverage action in any service business. You do the same work, keep more of it.`,
    });
  }

  // 5. Five-year framing
  if (fiveYear > 20_000) {
    results.push({
      id: "hustle.five-year-framing",
      type: "opportunity",
      message: `Over 5 years at this rate, your side hustle nets $${fiveYear.toLocaleString()} — enough to change your financial life.`,
      detail: `That's before any rate increases, client growth, or scaling. It's also $${Math.round(fiveYear / 5 / 12).toLocaleString()}/month consistently.`,
    });
  }

  // 6. Hours check — burnout warning
  if (hours > 20) {
    results.push({
      id: "hustle.hours-warning",
      type: "warning",
      message: `${hours} hours/week on top of a full-time job is ${hours * 52} hours/year — approaching burnout territory.`,
      detail: `Consider whether charging more and working fewer hours would produce the same income with less risk of burnout.`,
    });
  }

  return results;
}
