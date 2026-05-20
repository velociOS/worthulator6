import type { Insight } from "../types";

export interface BurnoutInputs {
  hours: number;
  stress: number;
  sleep: number;
}

export interface BurnoutOutputs {
  burnoutRisk: number;
  overworkHoursPerYear?: number;
  sleepDebtWeekly?: number;
  recoveryWeeksNeeded?: number;
}

export function generateBurnoutInsights(
  inputs: BurnoutInputs,
  outputs: BurnoutOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { hours, stress, sleep } = inputs;
  const {
    burnoutRisk,
    overworkHoursPerYear = Math.max(0, hours - 40) * 52,
    sleepDebtWeekly      = Math.max(0, 8 - sleep) * 7,
    recoveryWeeksNeeded  = Math.round(burnoutRisk / 25),
  } = outputs;

  // critical-risk — score > 70
  if (burnoutRisk > 70) {
    insights.push({
      id: "burnout.critical-risk",
      title: "High burnout risk — act now",
      body: `A score of ${burnoutRisk}/100 is in the high-risk zone. At ${hours} hrs/week with stress at ${stress}/10, you're depleting faster than you can recover. Without intervention, performance and health decline are likely within weeks.`,
      severity: "critical",
      category: "financial-stress",
    });
  } else if (burnoutRisk > 40) {
    // moderate-risk
    insights.push({
      id: "burnout.moderate-risk",
      title: "Moderate burnout risk — monitor closely",
      body: `Your score of ${burnoutRisk}/100 is in the yellow zone. You're not in crisis, but sustained exposure to this workload and stress level will push you toward high risk. Address the largest factor first.`,
      severity: "warning",
      category: "financial-stress",
    });
  } else {
    // low-risk
    insights.push({
      id: "burnout.low-risk",
      title: "Low burnout risk — sustainable balance",
      body: `Your score of ${burnoutRisk}/100 suggests a manageable workload. Continue monitoring, especially as deadlines or season shifts increase hours or stress temporarily.`,
      severity: "positive",
      category: "benchmark-comparison",
    });
  }

  // overwork-hours — meaningful if > 0
  if (overworkHoursPerYear > 0) {
    insights.push({
      id: "burnout.overwork-hours",
      title: `${overworkHoursPerYear.toLocaleString()} hours of overtime per year`,
      body: `Working ${hours} hrs/week means you're putting in ${overworkHoursPerYear.toLocaleString()} hours above the 40-hour baseline annually — the equivalent of ${Math.round(overworkHoursPerYear / 40)} extra weeks of full-time work every year, unpaid.`,
      severity: hours > 55 ? "warning" : "neutral",
      category: "time-loss",
    });
  }

  // sleep-debt — meaningful if > 5 hrs/week deficit
  if (sleepDebtWeekly > 5) {
    insights.push({
      id: "burnout.sleep-debt",
      title: `${sleepDebtWeekly.toFixed(0)} hours of sleep debt per week`,
      body: `At ${sleep} hours/night you're accumulating ${sleepDebtWeekly.toFixed(0)} hours of sleep debt weekly vs the 8-hour recommendation. Chronic sleep deprivation amplifies stress hormones and accelerates burnout progression.`,
      severity: "warning",
      category: "hidden-cost",
    });
  }

  // recovery-context — if risk > 40, show recovery framing
  if (burnoutRisk > 40 && recoveryWeeksNeeded > 0) {
    insights.push({
      id: "burnout.recovery-cost",
      title: `Recovery takes ${recoveryWeeksNeeded}+ weeks`,
      body: `At this risk level, meaningful recovery typically requires ${recoveryWeeksNeeded} or more weeks of reduced load. Addressing root causes now costs far less — in time, money, and health — than recovering from full burnout.`,
      severity: "neutral",
      category: "opportunity-cost",
    });
  }

  return insights;
}
