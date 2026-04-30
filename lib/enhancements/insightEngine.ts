/**
 * Insight Engine
 * Generates human-readable insights and actionable recommendations
 * from arbitrary key-value data objects.
 */

export interface InsightRecord {
  type: "positive" | "neutral" | "warning";
  label: string;
  message: string;
  value?: string | number;
}

export interface RecommendationRecord {
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  actionLabel?: string;
}

// ─── Insights ────────────────────────────────────────────────────────────────

/**
 * Generates an array of insights from a data object.
 * Looks for common financial/numeric keys and builds context-aware messages.
 */
export function generateInsights(
  data: Record<string, number | string>
): InsightRecord[] {
  const insights: InsightRecord[] = [];

  const get = (key: string): number | undefined => {
    const val = data[key];
    if (val === undefined || val === null) return undefined;
    const num = typeof val === "number" ? val : parseFloat(String(val));
    return isNaN(num) ? undefined : num;
  };

  // Net vs gross income ratio
  const net = get("netAnnual") ?? get("netIncome") ?? get("takeHome");
  const gross = get("grossAnnual") ?? get("grossIncome") ?? get("gross");
  if (net !== undefined && gross !== undefined && gross > 0) {
    const ratio = (net / gross) * 100;
    insights.push({
      type: ratio >= 70 ? "positive" : ratio >= 55 ? "neutral" : "warning",
      label: "Take-home ratio",
      message: `You keep ${ratio.toFixed(1)}% of gross income after tax and deductions.`,
      value: `${ratio.toFixed(1)}%`,
    });
  }

  // Hourly rate awareness
  const hourly = get("hourlyRate") ?? get("hourly");
  if (hourly !== undefined) {
    insights.push({
      type: hourly >= 50 ? "positive" : hourly >= 25 ? "neutral" : "warning",
      label: "Hourly rate",
      message:
        hourly >= 50
          ? `$${hourly}/hr is above average — strong market position.`
          : hourly >= 25
          ? `$${hourly}/hr is in the mid-market range.`
          : `$${hourly}/hr is below the median for most skilled roles.`,
      value: `$${hourly}/hr`,
    });
  }

  // ROI indicator
  const roi = get("roi") ?? get("ROI");
  if (roi !== undefined) {
    insights.push({
      type: roi >= 20 ? "positive" : roi >= 0 ? "neutral" : "warning",
      label: "Return on investment",
      message:
        roi >= 20
          ? `${roi.toFixed(1)}% ROI — excellent return.`
          : roi >= 0
          ? `${roi.toFixed(1)}% ROI — modest but positive return.`
          : `${roi.toFixed(1)}% ROI — investment is currently at a loss.`,
      value: `${roi.toFixed(1)}%`,
    });
  }

  // Payback period
  const payback = get("paybackMonths") ?? get("payback");
  if (payback !== undefined) {
    insights.push({
      type: payback <= 12 ? "positive" : payback <= 36 ? "neutral" : "warning",
      label: "Payback period",
      message:
        payback <= 12
          ? `Payback in ${payback.toFixed(0)} months — fast recovery.`
          : payback <= 36
          ? `Payback in ${payback.toFixed(0)} months — reasonable timeline.`
          : `Payback in ${payback.toFixed(0)} months — consider ways to accelerate.`,
      value: `${payback.toFixed(0)} mo`,
    });
  }

  // Savings rate
  const savings = get("savingsRate") ?? get("savings");
  if (savings !== undefined) {
    insights.push({
      type: savings >= 20 ? "positive" : savings >= 10 ? "neutral" : "warning",
      label: "Savings rate",
      message:
        savings >= 20
          ? `${savings.toFixed(1)}% savings rate — on track for financial goals.`
          : savings >= 10
          ? `${savings.toFixed(1)}% savings rate — solid foundation.`
          : `${savings.toFixed(1)}% savings rate — consider increasing contributions.`,
      value: `${savings.toFixed(1)}%`,
    });
  }

  // Fallback generic numeric insights
  if (insights.length === 0) {
    const entries = Object.entries(data).filter(
      ([, v]) => typeof v === "number" && !isNaN(v as number)
    );
    entries.slice(0, 3).forEach(([key, value]) => {
      insights.push({
        type: "neutral",
        label: key.replace(/([A-Z])/g, " $1").trim(),
        message: `${key}: ${value}`,
        value: String(value),
      });
    });
  }

  return insights;
}

// ─── Recommendations ─────────────────────────────────────────────────────────

/**
 * Generates actionable recommendations based on data patterns.
 */
export function generateRecommendations(
  data: Record<string, number | string>
): RecommendationRecord[] {
  const recs: RecommendationRecord[] = [];

  const get = (key: string): number | undefined => {
    const val = data[key];
    if (val === undefined || val === null) return undefined;
    const num = typeof val === "number" ? val : parseFloat(String(val));
    return isNaN(num) ? undefined : num;
  };

  const net = get("netAnnual") ?? get("netIncome") ?? get("takeHome");
  const gross = get("grossAnnual") ?? get("grossIncome") ?? get("gross");
  const savings = get("savingsRate") ?? get("savings");
  const roi = get("roi") ?? get("ROI");
  const payback = get("paybackMonths") ?? get("payback");

  if (savings !== undefined && savings < 15) {
    recs.push({
      priority: "high",
      title: "Increase your savings rate",
      description: `At ${savings.toFixed(1)}%, you may want to target 15–20% to build a solid emergency fund and long-term wealth.`,
      actionLabel: "Review your budget",
    });
  }

  if (net !== undefined && gross !== undefined && gross > 0) {
    const ratio = (net / gross) * 100;
    if (ratio < 60) {
      recs.push({
        priority: "medium",
        title: "Optimise your tax position",
        description: `You're keeping ${ratio.toFixed(1)}% of gross income. Consider pension contributions or tax-advantaged accounts to improve this ratio.`,
        actionLabel: "Explore tax optimisation",
      });
    }
  }

  if (roi !== undefined && roi < 10) {
    recs.push({
      priority: "medium",
      title: "Improve return on investment",
      description: `A ${roi.toFixed(1)}% ROI is below the 10% benchmark. Review cost inputs or explore higher-yield alternatives.`,
      actionLabel: "Recalculate with lower costs",
    });
  }

  if (payback !== undefined && payback > 24) {
    recs.push({
      priority: "low",
      title: "Shorten your payback period",
      description: `A ${payback.toFixed(0)}-month payback is longer than ideal. Look for ways to increase returns or reduce upfront investment.`,
      actionLabel: "Model scenarios",
    });
  }

  // Default recommendation if nothing specific triggered
  if (recs.length === 0) {
    recs.push({
      priority: "low",
      title: "Explore scenario modelling",
      description:
        "Try adjusting inputs to see how small changes in rate or costs affect your bottom line.",
    });
  }

  return recs;
}
