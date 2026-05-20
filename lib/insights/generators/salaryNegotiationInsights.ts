import type { Insight } from "../types";

export interface SalaryNegotiationInputs {
  currentOffer: number;
  marketLow: number;
  marketHigh: number;
  experienceYears: number;
  skillMatch: number;
  offerUrgency: string;
}

export interface SalaryNegotiationOutputs {
  marketMid: number;
  recommendedAsk: number;
  confidenceScore: number;
  annualGap?: number;
  percentageGap?: number;
  gapToMarketHigh?: number;
}

export function generateSalaryNegotiationInsights(
  inputs: SalaryNegotiationInputs,
  outputs: SalaryNegotiationOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { currentOffer, experienceYears, offerUrgency } = inputs;
  const {
    recommendedAsk,
    confidenceScore,
    annualGap = 0,
    percentageGap = 0,
    gapToMarketHigh = 0,
  } = outputs;

  // lifetime-cost — always fires — the cost of not negotiating
  if (annualGap > 0) {
    const tenYearGap = annualGap * 10;
    insights.push({
      id: "salary-negotiation.lifetime-cost",
      title: `Not negotiating costs $${tenYearGap.toLocaleString()} over 10 years`,
      body: `Accepting $${currentOffer.toLocaleString()} instead of asking for $${recommendedAsk.toLocaleString()} leaves $${annualGap.toLocaleString()}/year on the table — $${tenYearGap.toLocaleString()} over a decade, before compounding raises are factored in.`,
      severity: "warning",
      category: "opportunity-cost",
    });
  } else {
    // offer-above-recommended
    insights.push({
      id: "salary-negotiation.above-market",
      title: "Offer is above or at recommended ask",
      body: `Your current offer of $${currentOffer.toLocaleString()} is already at or above the recommended ask. You're in a strong position — consider negotiating other terms like bonuses, equity, or remote flexibility.`,
      severity: "positive",
      category: "benchmark-comparison",
    });
  }

  // strong-leverage — confidenceScore > 70 and urgency is high
  if (confidenceScore > 70 && offerUrgency === "high") {
    insights.push({
      id: "salary-negotiation.strong-leverage",
      title: "Strong negotiating position — push higher",
      body: `High hiring urgency + ${Math.round(confidenceScore)}/100 leverage score puts you in a strong position. Companies paying urgency premiums often have room to move further. Consider asking $${Math.round(recommendedAsk * 1.05).toLocaleString()} as your opening number.`,
      severity: "positive",
      category: "investment-opportunity",
    });
  }

  // market-gap — offer below market midpoint
  if (currentOffer < outputs.marketMid) {
    insights.push({
      id: "salary-negotiation.below-midpoint",
      title: "Offer is below market midpoint",
      body: `Your offer of $${currentOffer.toLocaleString()} sits below the $${outputs.marketMid.toLocaleString()} market midpoint for this role. Data shows candidates who negotiate receive an average of 5–10% more than their initial offer.`,
      severity: "neutral",
      category: "benchmark-comparison",
    });
  }

  // experience-leverage — senior candidate
  if (experienceYears >= 7) {
    insights.push({
      id: "salary-negotiation.experience-premium",
      title: `${experienceYears} years of experience commands a premium`,
      body: `Senior candidates typically command the upper range of salary bands. At ${experienceYears} years, you have strong grounds to target $${Math.round(outputs.marketMid * 1.1).toLocaleString()} or higher in your ask.`,
      severity: "neutral",
      category: "benchmark-comparison",
    });
  }

  // percentage-gap framing
  if (percentageGap > 0) {
    insights.push({
      id: "salary-negotiation.gap-framing",
      title: `Ask for ${percentageGap.toFixed(1)}% more — a single conversation`,
      body: `The gap between your offer and the recommended ask is ${percentageGap.toFixed(1)}% — a difference employers routinely negotiate. The cost of asking is zero; the cost of not asking is $${annualGap.toLocaleString()}/year.`,
      severity: "neutral",
      category: "opportunity-cost",
    });
  }

  return insights;
}
