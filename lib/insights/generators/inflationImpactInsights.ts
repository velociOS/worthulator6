import type { Insight } from "../types";

export interface InflationImpactInputs {
  amount: number;
  rate: number;
  years: number;
}

export interface InflationImpactOutputs {
  futureValue: number;
  loss: number;
  lossPercent: number;
  realValueRatio?: number;
  yearsToHalve?: number;
  dailyLoss?: number;
}

export function generateInflationImpactInsights(
  inputs: InflationImpactInputs,
  outputs: InflationImpactOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { amount, rate, years } = inputs;
  const {
    loss,
    lossPercent,
    realValueRatio = outputs.futureValue / amount,
    yearsToHalve   = rate > 0 ? 70 / rate : 9999,
    dailyLoss      = loss / (years * 365),
  } = outputs;

  // daily-erosion — always fires
  insights.push({
    id: "inflation-impact.daily-erosion",
    title: `Loses $${dailyLoss.toFixed(2)} in value every day`,
    body: `At ${rate}% inflation, your $${amount.toLocaleString()} loses $${dailyLoss.toFixed(2)} in purchasing power daily — $${Math.round(dailyLoss * 30).toLocaleString()}/month, silently, without you spending a cent.`,
    severity: "neutral",
    category: "hidden-cost",
  });

  // severe-erosion — losing > 40% of value
  if (lossPercent > 40) {
    insights.push({
      id: "inflation-impact.severe-erosion",
      title: `Loses ${lossPercent.toFixed(1)}% of purchasing power`,
      body: `Over ${years} years at ${rate}% inflation, your $${amount.toLocaleString()} will only buy $${outputs.futureValue.toLocaleString()} worth of goods today. That's a loss of $${Math.round(loss).toLocaleString()} in real value — over ${lossPercent.toFixed(1)}% eroded.`,
      severity: "warning",
      category: "financial-stress",
    });
  } else if (lossPercent > 20) {
    // moderate-erosion
    insights.push({
      id: "inflation-impact.moderate-erosion",
      title: `${lossPercent.toFixed(1)}% purchasing power lost`,
      body: `At ${rate}% inflation over ${years} years, your money loses ${lossPercent.toFixed(1)}% of its buying power. Keeping this amount in cash or low-yield savings means losing $${Math.round(loss).toLocaleString()} in real terms.`,
      severity: "neutral",
      category: "opportunity-cost",
    });
  }

  // halving-timeline
  if (yearsToHalve < 30) {
    insights.push({
      id: "inflation-impact.halving-timeline",
      title: `Purchasing power halves in ~${Math.round(yearsToHalve)} years`,
      body: `At ${rate}% inflation, purchasing power is cut in half every ~${Math.round(yearsToHalve)} years (Rule of 70). Any money sitting idle without earning at least ${rate}% annually is actively shrinking.`,
      severity: rate >= 5 ? "warning" : "neutral",
      category: "debt-burden",
    });
  }

  // action-framing — beating inflation
  if (rate > 0) {
    const targetReturn = rate + 2;
    insights.push({
      id: "inflation-impact.action-framing",
      title: `Needs ${rate.toFixed(1)}%+ return just to break even`,
      body: `To preserve the real value of $${amount.toLocaleString()}, your money needs to grow at least ${rate.toFixed(1)}% annually. Targeting ${targetReturn.toFixed(1)}%+ through index funds or bonds gives you a real return above inflation.`,
      severity: "neutral",
      category: "investment-opportunity",
    });
  }

  // high-rate alarm — recent inflation scenario (> 6%)
  if (rate >= 6) {
    insights.push({
      id: "inflation-impact.high-rate-alarm",
      title: "High inflation scenario — real erosion is severe",
      body: `At ${rate}%, inflation is significantly above the historical US average of ~3.5%. Cash savings lose value rapidly at this rate — even high-yield savings accounts may struggle to keep pace.`,
      severity: "warning",
      category: "financial-stress",
    });
  }

  return insights;
}
