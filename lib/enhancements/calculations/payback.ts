/**
 * Payback Period Calculation Helpers
 */

export interface PaybackInput {
  /** Upfront investment cost */
  investment: number;
  /** Annual (or periodic) net cash inflow / savings */
  annualReturn: number;
}

export interface PaybackResult {
  years: number;
  months: number;
  /** Formatted string e.g. "2 years 4 months" */
  formatted: string;
}

/**
 * Simple payback period.
 * Payback (years) = investment / annualReturn
 */
export function calculatePayback({ investment, annualReturn }: PaybackInput): PaybackResult {
  if (annualReturn <= 0) {
    return { years: Infinity, months: Infinity, formatted: "Never" };
  }

  const years = investment / annualReturn;
  const wholeYears = Math.floor(years);
  const months = Math.round((years - wholeYears) * 12);

  let formatted = "";
  if (wholeYears > 0) formatted += `${wholeYears} year${wholeYears !== 1 ? "s" : ""}`;
  if (months > 0) formatted += `${formatted ? " " : ""}${months} month${months !== 1 ? "s" : ""}`;
  if (!formatted) formatted = "< 1 month";

  return { years, months: Math.round(years * 12), formatted };
}

/**
 * Discounted payback — accounts for time value of money.
 * Returns payback in years or null if never recovered within maxYears.
 */
export function discountedPayback(
  investment: number,
  annualCashFlow: number,
  discountRate: number,
  maxYears = 30
): number | null {
  let cumulative = 0;
  for (let year = 1; year <= maxYears; year++) {
    cumulative += annualCashFlow / Math.pow(1 + discountRate / 100, year);
    if (cumulative >= investment) return year;
  }
  return null;
}
