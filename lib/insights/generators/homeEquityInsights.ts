import type { Insight } from "../types";

export interface HomeEquityInputs {
  homeValue: number;
  mortgage: number;
}

export interface HomeEquityOutputs {
  equity: number;
  ltv: number;
  borrowable: number;
  equityPercent?: number;
  toHeloc80ltv?: number;
  equityAnnualSalaries?: number;
}

export function generateHomeEquityInsights(
  inputs: HomeEquityInputs,
  outputs: HomeEquityOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { homeValue, mortgage } = inputs;
  const {
    equity,
    ltv,
    borrowable,
    equityPercent = ((homeValue - mortgage) / homeValue) * 100,
    toHeloc80ltv  = 0,
    equityAnnualSalaries = Math.round(equity / 65000 * 10) / 10,
  } = outputs;

  // ownership-milestone — always fires
  const nextMilestone = equityPercent < 25 ? 25 : equityPercent < 50 ? 50 : equityPercent < 75 ? 75 : 100;
  const toNextMilestone = Math.round(homeValue * (nextMilestone / 100) - equity);
  insights.push({
    id: "home-equity.ownership-milestone",
    title: `You own ${equityPercent.toFixed(1)}% of this home`,
    body: `Your equity of $${equity.toLocaleString()} represents ${equityPercent.toFixed(1)}% ownership. ${toNextMilestone > 0 ? `You're $${toNextMilestone.toLocaleString()} away from the ${nextMilestone}% milestone.` : "You've hit a major ownership milestone — well done."}`,
    severity: equityPercent >= 50 ? "positive" : equityPercent >= 25 ? "neutral" : "neutral",
    category: "benchmark-comparison",
  });

  // heloc-unlock — approaching or past 80% LTV threshold
  if (toHeloc80ltv > 0) {
    insights.push({
      id: "home-equity.heloc-distance",
      title: `$${toHeloc80ltv.toLocaleString()} from unlocking a HELOC`,
      body: `Lenders typically require 80% LTV or less to offer a HELOC. You need to reduce your balance by $${toHeloc80ltv.toLocaleString()} to reach that threshold and access your equity as a credit line.`,
      severity: "neutral",
      category: "affordability-pressure",
    });
  } else if (borrowable > 0) {
    insights.push({
      id: "home-equity.heloc-eligible",
      title: `Up to $${borrowable.toLocaleString()} available via HELOC`,
      body: `Your LTV is below 80% — you're eligible to borrow against up to $${borrowable.toLocaleString()} of your equity. HELOCs typically offer lower rates than personal loans or credit cards.`,
      severity: "positive",
      category: "investment-opportunity",
    });
  }

  // salary-equivalence — milestone framing
  insights.push({
    id: "home-equity.salary-equivalence",
    title: `Equity worth ${equityAnnualSalaries} years of median salary`,
    body: `Your $${equity.toLocaleString()} in home equity is equivalent to ${equityAnnualSalaries} years of US median salary ($65k/yr) — likely your single largest personal asset.`,
    severity: "neutral",
    category: "opportunity-cost",
  });

  // underwater-warning — negative equity
  if (equity < 0) {
    insights.push({
      id: "home-equity.underwater",
      title: "Underwater — you owe more than the home is worth",
      body: `You owe $${Math.abs(equity).toLocaleString()} more than the current market value. Selling would not cover your mortgage. Contact your lender about refinance options or loan modification programs.`,
      severity: "critical",
      category: "financial-stress",
    });
  }

  // ltv-framing
  if (ltv > 80 && equity > 0) {
    insights.push({
      id: "home-equity.ltv-warning",
      title: `LTV of ${ltv.toFixed(1)}% — PMI likely applies`,
      body: `Above 80% LTV, most conventional loans require PMI (private mortgage insurance), typically $50–$200/month. As you build equity past the 80% LTV threshold, PMI drops off automatically or on request.`,
      severity: "neutral",
      category: "hidden-cost",
    });
  }

  return insights;
}
