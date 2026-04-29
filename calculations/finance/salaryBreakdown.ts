import {
  getUKTaxData,
  getUSTaxData,
  CURRENT_YEAR,
  type SupportedYear,
} from "@/data/tax";

// ─── Shared output shape ──────────────────────────────────────────────────────

export interface SalaryBreakdownResult {
  grossSalary: number;
  /** Pre-tax pension / 401(k) deduction */
  pensionDeduction: number;
  /** Salary after pension deduction — what income tax is calculated on */
  taxableIncome: number;
  incomeTax: number;
  /** National Insurance (UK) or FICA — Social Security + Medicare (US) */
  socialLevy: number;
  totalDeductions: number;
  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
  /** (incomeTax + socialLevy) / grossSalary × 100 */
  effectiveTaxRate: number;
}

// ─── UK ──────────────────────────────────────────────────────────────────────

export function calculateUKSalary(
  grossSalary: number,
  pensionPct: number,
  year: SupportedYear = CURRENT_YEAR,
): SalaryBreakdownResult {
  const d = getUKTaxData(year);
  const pensionDeduction = Math.max(0, grossSalary * (pensionPct / 100));
  const salaryAfterPension = Math.max(0, grossSalary - pensionDeduction);

  // Personal allowance taper: tapers £1 per £2 of income above taper start
  let personalAllowance = d.personalAllowance;
  if (salaryAfterPension > d.additionalThreshold) {
    personalAllowance = 0;
  } else if (salaryAfterPension > d.paTaperStart) {
    personalAllowance = Math.max(
      0,
      d.personalAllowance - (salaryAfterPension - d.paTaperStart) / 2,
    );
  }

  const taxableIncome = Math.max(0, salaryAfterPension - personalAllowance);

  // Progressive income tax across UK bands
  let incomeTax = 0;
  let prev = 0;
  for (const band of d.taxBands) {
    if (taxableIncome <= prev) break;
    incomeTax += (Math.min(taxableIncome, band.to) - prev) * band.rate;
    prev = band.to;
  }

  // National Insurance (applied to gross salary after pension, not taxable income)
  let ni = 0;
  if (salaryAfterPension > d.niPrimary) {
    const mainBand = Math.max(0, Math.min(salaryAfterPension, d.niUpper) - d.niPrimary);
    ni += mainBand * d.niMainRate;
    if (salaryAfterPension > d.niUpper) {
      ni += (salaryAfterPension - d.niUpper) * d.niUpperRate;
    }
  }

  const totalDeductions = pensionDeduction + incomeTax + ni;
  const netAnnual = Math.max(0, grossSalary - totalDeductions);
  const effectiveTaxRate =
    grossSalary > 0 ? ((incomeTax + ni) / grossSalary) * 100 : 0;

  return {
    grossSalary,
    pensionDeduction,
    taxableIncome,
    incomeTax,
    socialLevy: ni,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    netWeekly: netAnnual / 52,
    effectiveTaxRate,
  };
}

// ─── US ──────────────────────────────────────────────────────────────────────

export function calculateUSSalary(
  grossSalary: number,
  filingStatus: "single" | "married",
  retirementPct: number,
  year: SupportedYear = CURRENT_YEAR,
): SalaryBreakdownResult {
  const d = getUSTaxData(year);
  const pensionDeduction = Math.max(0, grossSalary * (retirementPct / 100));
  const taxableIncome = Math.max(0, grossSalary - pensionDeduction);

  const brackets =
    filingStatus === "married" ? d.bracketsMarried : d.bracketsSingle;

  let incomeTax = 0;
  let prev = 0;
  for (const { up, rate } of brackets) {
    if (taxableIncome <= prev) break;
    incomeTax += (Math.min(taxableIncome, up) - prev) * rate;
    prev = up;
  }

  // FICA is applied to gross (not after 401k)
  const socialSecurity = Math.min(grossSalary, d.ssWageBase) * d.ssRate;
  const medicare = grossSalary * d.medicareRate;
  const fica = socialSecurity + medicare;

  const totalDeductions = pensionDeduction + incomeTax + fica;
  const netAnnual = Math.max(0, grossSalary - totalDeductions);
  const effectiveTaxRate =
    grossSalary > 0 ? ((incomeTax + fica) / grossSalary) * 100 : 0;

  return {
    grossSalary,
    pensionDeduction,
    taxableIncome,
    incomeTax,
    socialLevy: fica,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    netWeekly: netAnnual / 52,
    effectiveTaxRate,
  };
}
