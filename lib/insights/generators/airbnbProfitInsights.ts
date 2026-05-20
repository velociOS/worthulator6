import type { Insight } from "../index";

interface AirbnbInputs {
  nightlyRate:     number;
  occupancyPct:    number;
  platformFeePct:  number;
  monthlyExpenses: number;
}

interface AirbnbOutputs {
  monthlyRevenue?:        number;
  monthlyProfit?:         number;
  annualProfit?:          number;
  breakEvenOcc?:          number;
  profitMarginPct?:       number;
  tenYearProfit?:         number;
  revenueToExpenseRatio?: number;
}

export function airbnbProfitInsights(
  inputs: AirbnbInputs,
  outputs: AirbnbOutputs
): Insight[] {
  const results: Insight[] = [];

  const monthly   = outputs.monthlyProfit         ?? 0;
  const annual    = outputs.annualProfit           ?? 0;
  const revenue   = outputs.monthlyRevenue         ?? 0;
  const breakEven = outputs.breakEvenOcc           ?? 0;
  const margin    = outputs.profitMarginPct        ?? 0;
  const tenYear   = outputs.tenYearProfit          ?? 0;
  const ratio     = outputs.revenueToExpenseRatio  ?? 0;
  const occ       = Number(inputs.occupancyPct);
  const nightly   = Number(inputs.nightlyRate);
  const expenses  = Number(inputs.monthlyExpenses);

  // 1. Profitability framing
  if (monthly > 0) {
    results.push({
      id: "airbnb.profit-framing",
      type: "milestone",
      message: `At ${occ}% occupancy, your listing nets $${monthly.toLocaleString()}/month — $${annual.toLocaleString()}/year after fees and expenses.`,
      detail: `That's a ${margin.toFixed(1)}% profit margin on $${revenue.toLocaleString()} in gross revenue.`,
    });
  } else {
    results.push({
      id: "airbnb.losing-money",
      type: "warning",
      message: `At ${occ}% occupancy, this listing is currently losing $${Math.abs(monthly).toLocaleString()}/month.`,
      detail: `You need to increase your nightly rate, occupancy, or reduce expenses to break even.`,
    });
  }

  // 2. Break-even occupancy
  if (breakEven > 0 && breakEven < 100) {
    const cushion = occ - breakEven;
    if (cushion >= 15) {
      results.push({
        id: "airbnb.break-even-cushion",
        type: "milestone",
        message: `You break even at ${breakEven.toFixed(1)}% occupancy — you have a ${cushion.toFixed(0)}% buffer above that.`,
        detail: `Even if occupancy drops to ${breakEven.toFixed(0)}% you still cover all expenses. Strong margin of safety.`,
      });
    } else if (cushion >= 5) {
      results.push({
        id: "airbnb.break-even-cushion",
        type: "info",
        message: `Break-even occupancy is ${breakEven.toFixed(1)}% — you're only ${cushion.toFixed(0)}% above it.`,
        detail: `A slow month could push you into the red. Consider pricing adjustments or expense reduction to widen the buffer.`,
      });
    } else if (occ <= breakEven) {
      results.push({
        id: "airbnb.below-break-even",
        type: "warning",
        message: `Your current ${occ}% occupancy is at or below your break-even point of ${breakEven.toFixed(1)}%.`,
        detail: `You need at least ${Math.ceil(breakEven)}% occupancy to cover $${expenses.toLocaleString()}/month in expenses.`,
      });
    }
  }

  // 3. Revenue-to-expense ratio
  if (ratio >= 2) {
    results.push({
      id: "airbnb.revenue-ratio",
      type: "info",
      message: `For every $1 in monthly expenses, you earn $${ratio.toFixed(1)} in gross revenue.`,
      detail: `A ratio above 2× suggests a healthy short-term rental operation at current occupancy.`,
    });
  }

  // 4. Ten-year framing
  if (tenYear > 50_000) {
    results.push({
      id: "airbnb.ten-year-framing",
      type: "opportunity",
      message: `At this rate, your listing generates $${tenYear.toLocaleString()} in net profit over 10 years.`,
      detail: `That's before any rent appreciation or nightly rate increases — which historically average 3–5%/year.`,
    });
  }

  // 5. Rate optimization nudge
  if (monthly > 0 && nightly < 100) {
    results.push({
      id: "airbnb.rate-nudge",
      type: "opportunity",
      message: `At $${nightly}/night, a $20 rate increase adds ~$${Math.round(20 * 30 * occ / 100).toLocaleString()}/month in gross revenue.`,
      detail: `Dynamic pricing tools (Wheelhouse, PriceLabs) can optimize nightly rates to capture seasonal demand.`,
    });
  }

  return results;
}
