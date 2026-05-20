import type { Insight } from "../index";

interface SelfEmployedTaxInputs {
  grossIncome:      number;
  businessExpenses: number;
  federalRate:      number;
}

interface SelfEmployedTaxOutputs {
  annualTaxEstimate?: number;
  quarterlyPayment?:  number;
  monthlyReserve?:    number;
  effectiveTaxRate?:  number;
  netAfterTax?:       number;
  netMonthly?:        number;
  seTaxAmount?:       number;
}

export function selfEmployedTaxInsights(
  inputs: SelfEmployedTaxInputs,
  outputs: SelfEmployedTaxOutputs
): Insight[] {
  const results: Insight[] = [];

  const gross       = Number(inputs.grossIncome);
  const expenses    = Number(inputs.businessExpenses);
  const rate        = Number(inputs.federalRate);
  const annual      = outputs.annualTaxEstimate ?? 0;
  const quarterly   = outputs.quarterlyPayment  ?? 0;
  const monthly     = outputs.monthlyReserve    ?? 0;
  const effective   = outputs.effectiveTaxRate  ?? 0;
  const netYear     = outputs.netAfterTax        ?? 0;
  const netMo       = outputs.netMonthly         ?? 0;
  const seTax       = outputs.seTaxAmount        ?? 0;

  // 1. Core tax burden framing
  results.push({
    id: "set.core-burden",
    type: "info",
    message: `On $${gross.toLocaleString()} gross, you owe roughly $${annual.toLocaleString()}/year — an effective rate of ${effective.toFixed(1)}%.`,
    detail: `That's $${quarterly.toLocaleString()} quarterly or $${monthly.toLocaleString()}/month to set aside. Missing quarterly payments triggers IRS penalties.`,
  });

  // 2. Self-employment tax is the hidden shock
  const seTaxPct = gross > 0 ? Math.round(seTax / gross * 1000) / 10 : 0;
  if (seTax > 2000) {
    results.push({
      id: "set.se-tax-shock",
      type: "warning",
      message: `$${seTax.toLocaleString()} of your tax bill is self-employment tax (15.3% on net earnings) — ${seTaxPct.toFixed(1)}% of gross income.`,
      detail: `W-2 employees pay 7.65% — their employer matches the rest. As self-employed, you pay both halves. This is the hidden cost of 1099 work.`,
    });
  }

  // 3. Real take-home
  if (netMo > 0) {
    results.push({
      id: "set.take-home",
      type: "milestone",
      message: `After all taxes, you take home $${netMo.toLocaleString()}/month ($${netYear.toLocaleString()}/year) on $${gross.toLocaleString()} gross.`,
      detail: `That's your true income — not the headline number. Use this when comparing to a salaried W-2 offer.`,
    });
  }

  // 4. Expense deduction leverage
  if (expenses > 0) {
    const taxSavedOnExpenses = Math.round(expenses * (rate + 15.3) / 100);
    results.push({
      id: "set.expense-deduction",
      type: "opportunity",
      message: `Your $${expenses.toLocaleString()} in business expenses saves you ~$${taxSavedOnExpenses.toLocaleString()} in taxes.`,
      detail: `Every deductible expense reduces both income tax and self-employment tax. Home office, software, equipment, and professional development all qualify.`,
    });
  }

  // 5. Quarterly deadline warning
  if (quarterly > 500) {
    results.push({
      id: "set.quarterly-deadlines",
      type: "info",
      message: `Quarterly estimated tax payments of $${quarterly.toLocaleString()} are due April 15, June 16, September 15, and January 15.`,
      detail: `Missing or underpaying triggers an IRS underpayment penalty (currently ~8% annualized). Automate transfers to a dedicated tax savings account.`,
    });
  }

  // 6. High earner: SEP-IRA leverage
  if (gross >= 80_000) {
    const sepContrib = Math.round(Math.min((gross - expenses) * 0.25, 69000));
    const taxSaved   = Math.round(sepContrib * (rate + 15.3) / 100);
    results.push({
      id: "set.sep-ira-opportunity",
      type: "opportunity",
      message: `A SEP-IRA lets you contribute up to $${sepContrib.toLocaleString()} pre-tax — saving ~$${taxSaved.toLocaleString()} in taxes this year.`,
      detail: `Self-employed individuals can deduct up to 25% of net earnings into a SEP-IRA. It reduces taxable income and compounds tax-free for retirement.`,
    });
  }

  return results;
}
