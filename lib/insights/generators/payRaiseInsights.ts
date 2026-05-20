import type { Insight } from "../types";

const US_INFLATION = 3.5; // benchmark

export interface PayRaiseInputs {
  currentSalary: number;
  raisePercent: number;
}

export interface PayRaiseOutputs {
  newSalary: number;
  annualIncrease: number;
  monthlyIncrease: number;
  realRaisePercent?: number;
  inflationAdjustedGain?: number;
  fiveYearCumulativeLoss?: number;
}

export function generatePayRaiseInsights(
  inputs: PayRaiseInputs,
  outputs: PayRaiseOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { raisePercent } = inputs;
  const {
    annualIncrease,
    realRaisePercent = raisePercent - US_INFLATION,
    inflationAdjustedGain = 0,
    fiveYearCumulativeLoss = 0,
  } = outputs;

  // real-pay-cut — raise is below inflation
  if (realRaisePercent < 0) {
    insights.push({
      id: "pay-raise.real-pay-cut",
      title: "This raise is a real pay cut",
      body: `Your ${raisePercent}% raise is below the ${US_INFLATION}% inflation benchmark. In purchasing power terms, you're taking a ${Math.abs(realRaisePercent).toFixed(1)}% pay cut — losing $${Math.abs(inflationAdjustedGain).toLocaleString()} in real value annually. Over 5 years, that compounds to ~$${fiveYearCumulativeLoss.toLocaleString()} in lost purchasing power.`,
      severity: "warning",
      category: "hidden-cost",
    });
  } else if (realRaisePercent < 1) {
    // barely-keeping-up
    insights.push({
      id: "pay-raise.barely-keeping-up",
      title: "Barely beating inflation",
      body: `Your ${raisePercent}% raise beats inflation by just ${realRaisePercent.toFixed(1)}%. After prices rise, your real take-home gain is only $${Math.abs(inflationAdjustedGain).toLocaleString()}/year — less than most people expect.`,
      severity: "neutral",
      category: "benchmark-comparison",
    });
  } else {
    // genuine-gain
    insights.push({
      id: "pay-raise.genuine-gain",
      title: `+${realRaisePercent.toFixed(1)}% real purchasing power gain`,
      body: `After accounting for ${US_INFLATION}% inflation, your raise adds $${inflationAdjustedGain.toLocaleString()} in genuine purchasing power per year. That's a real increase, not just keeping pace.`,
      severity: "positive",
      category: "benchmark-comparison",
    });
  }

  // below-3pct — below typical annual adjustment
  if (raisePercent < 3) {
    insights.push({
      id: "pay-raise.below-market",
      title: "Below typical annual adjustment",
      body: `Most employers offer 3–5% annual raises. A ${raisePercent}% raise is below the baseline — worth negotiating for more, especially if your role's market rate has risen.`,
      severity: "neutral",
      category: "opportunity-cost",
    });
  }

  // strong-raise — 8%+
  if (raisePercent >= 8) {
    insights.push({
      id: "pay-raise.strong-raise",
      title: "Above-average raise secured",
      body: `A ${raisePercent}% raise is significantly above the 3–5% market norm, adding $${annualIncrease.toLocaleString()}/year. That's the kind of jump that typically requires a promotion, job change, or strong negotiation.`,
      severity: "positive",
      category: "benchmark-comparison",
    });
  }

  // monthly-impact — always fires
  insights.push({
    id: "pay-raise.monthly-impact",
    title: `$${outputs.monthlyIncrease.toLocaleString()} more per month`,
    body: `This raise puts an extra $${outputs.monthlyIncrease.toLocaleString()}/month in your paycheck — $${annualIncrease.toLocaleString()}/year before tax. Directing even half to investments or debt payoff compounds its value significantly.`,
    severity: "neutral",
    category: "opportunity-cost",
  });

  return insights;
}
