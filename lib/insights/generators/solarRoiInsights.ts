import type { Insight } from "../types";

export interface SolarRoiInputs {
  systemCost: number;
  monthlyBill: number;
  solarOffset: number;
  utilityInflation: number;
}

export interface SolarRoiOutputs {
  paybackMonths: number;
  year1Savings: number;
  savings25yr: number;
  paybackYears?: number;
  roiMultiple?: number;
  profitYears?: number;
  co2TonsPerYear?: number;
  inflationProtectionValue?: number;
  gridIndependenceScore?: number;
  utilityBillIn10yrs?: number;
  year25MonthlySaving?: number;
}

export function generateSolarRoiInsights(
  inputs: SolarRoiInputs,
  outputs: SolarRoiOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { systemCost, monthlyBill, solarOffset, utilityInflation } = inputs;
  const inf = utilityInflation / 100;

  const paybackYears  = outputs.paybackYears
    ?? Math.round(outputs.paybackMonths / 12 * 10) / 10;
  const roiMultiple   = outputs.roiMultiple
    ?? Math.round(outputs.savings25yr / systemCost * 100) / 100;
  const profitYears   = outputs.profitYears
    ?? Math.max(0, Math.round((25 - paybackYears) * 10) / 10);
  const co2TonsPerYear = outputs.co2TonsPerYear
    ?? Math.round(outputs.year1Savings / 0.15 * 0.85 / 2000 * 10) / 10;
  const inflationProtectionValue = outputs.inflationProtectionValue
    ?? Math.round(outputs.savings25yr - outputs.year1Savings * 25);
  const gridIndependenceScore = outputs.gridIndependenceScore
    ?? Math.round(solarOffset);
  const utilityBillIn10yrs = outputs.utilityBillIn10yrs
    ?? Math.round(monthlyBill * Math.pow(1 + inf, 10));
  const year25MonthlySaving = outputs.year25MonthlySaving
    ?? Math.round(outputs.year1Savings / 12 * Math.pow(1 + inf, 24));

  const monthlyOffset = Math.round(monthlyBill * (solarOffset / 100));
  const treesEquivalent = Math.round(co2TonsPerYear * 45);
  const gridDependentMonthly = Math.round(monthlyBill * (1 - solarOffset / 100));

  // ── 1. payback-milestone — always fires ───────────────────────────────────────
  const paybackYrsLabel = paybackYears < 10
    ? `${Math.floor(paybackYears)} years, ${Math.round((paybackYears % 1) * 12)} months`
    : `${paybackYears} years`;
  insights.push({
    id: "solar-roi.payback-milestone",
    title: `Pays for itself in ${paybackYrsLabel}`,
    body: `Your $${systemCost.toLocaleString()} system reaches break-even in ${paybackYrsLabel}. After that, ${profitYears} years of pure profit remain — every kilowatt your panels generate is free money.`,
    severity: paybackYears <= 8 ? "positive" : "neutral",
    category: "investment-opportunity",
  });

  // ── 2. roi-multiple — milestone: return per dollar ────────────────────────
  insights.push({
    id: "solar-roi.roi-multiple",
    title: `$${roiMultiple.toFixed(1)} back for every $1 invested`,
    body: `Over 25 years, your $${systemCost.toLocaleString()} generates $${outputs.savings25yr.toLocaleString()} in savings — a ${roiMultiple.toFixed(1)}× return, completely tax-free, with no market volatility.`,
    severity: roiMultiple >= 3 ? "positive" : "neutral",
    category: "investment-opportunity",
  });

  // ── 3. future-utility-burden — inflation framing ────────────────────────
  if (utilityInflation > 0 && utilityBillIn10yrs > monthlyBill) {
    insights.push({
      id: "solar-roi.future-utility-burden",
      title: `Without solar, your bill grows to $${utilityBillIn10yrs}/month in 10 years`,
      body: `At ${utilityInflation}% annual utility inflation, your current $${monthlyBill}/month bill becomes $${utilityBillIn10yrs}/month in 10 years — a $${utilityBillIn10yrs - monthlyBill}/month increase. Solar locks in your energy cost today and eliminates that rising burden.`,
      severity: "warning",
      category: "hidden-cost",
    });
  }

  // ── 4. inflation-protection — hedge framing ───────────────────────────
  if (inflationProtectionValue > 500) {
    insights.push({
      id: "solar-roi.inflation-protection",
      title: `Utility inflation adds $${inflationProtectionValue.toLocaleString()} extra to your lifetime savings`,
      body: `Without rate increases, your 25-year savings would total $${Math.round(outputs.year1Savings * 25).toLocaleString()}. Because utility inflation at ${utilityInflation}%/yr compounds over time, your actual savings reach $${outputs.savings25yr.toLocaleString()} — an extra $${inflationProtectionValue.toLocaleString()} that inflation generates in your favor.`,
      severity: "positive",
      category: "opportunity-cost",
    });
  }

  // ── 5. electricity-independence — milestone framing ─────────────────────
  insights.push({
    id: "solar-roi.electricity-independence",
    title: `You're ${gridIndependenceScore}% electricity independent`,
    body: `At ${solarOffset}% solar offset, only $${gridDependentMonthly}/month of your electricity bill remains grid-dependent. ${solarOffset >= 90 ? "You're nearly energy self-sufficient — add battery storage to reach 100%." : solarOffset >= 70 ? "Increasing your offset with more panels or battery storage could cut that grid bill further." : "Optimizing your offset % is the fastest way to cut your long-term utility burden."}`,
    severity: solarOffset >= 80 ? "positive" : "neutral",
    category: "benchmark-comparison",
  });

  // ── 6. savings-growth — year 25 framing ────────────────────────────
  if (year25MonthlySaving > monthlyOffset * 1.4) {
    insights.push({
      id: "solar-roi.savings-growth",
      title: `Your monthly saving grows to $${year25MonthlySaving}/month by year 25`,
      body: `Today your panels save $${monthlyOffset}/month. As utility rates rise ${utilityInflation}%/yr, that same offset is worth $${year25MonthlySaving}/month in year 25 — the saving is nearly ${Math.round(year25MonthlySaving / monthlyOffset * 10) / 10}× more valuable by end of life.`,
      severity: "positive",
      category: "investment-opportunity",
    });
  }

  // ── 7. co2-impact — environmental milestone ────────────────────────────
  if (co2TonsPerYear > 0) {
    insights.push({
      id: "solar-roi.co2-impact",
      title: `Offsets ~${co2TonsPerYear} tons of CO₂ per year`,
      body: `Equivalent to planting ${treesEquivalent} trees every year. Over 25 years, your system avoids ${Math.round(co2TonsPerYear * 25)} tons of CO₂ emissions — without any lifestyle change.`,
      severity: "positive",
      category: "opportunity-cost",
    });
  }

  // ── 8. long-payback warning ──────────────────────────────────────────────
  if (paybackYears > 15) {
    insights.push({
      id: "solar-roi.long-payback",
      title: "Payback period exceeds 15 years — review your assumptions",
      body: `At ${paybackYears} years to break even, less than half the panel's lifespan is profitable. Check your solar offset estimate, and whether state incentives or net metering credits apply. The 30% federal tax credit should already be reflected in your system cost input.`,
      severity: "warning",
      category: "financial-stress",
    });
  }

  return insights;
}
