import type { Insight } from "../types";

export interface ApplianceEnergyInputs {
  watts: number;
  hoursPerDay: number;
  electricRate: number;
}

export interface ApplianceEnergyOutputs {
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  tenYearCost?: number;
  coffeeEquivalent?: number;
  asPercentMedianBill?: number;
  inflatedCost10yr?: number;
}

export function generateApplianceEnergyInsights(
  inputs: ApplianceEnergyInputs,
  outputs: ApplianceEnergyOutputs,
): Insight[] {
  const insights: Insight[] = [];
  const { watts, hoursPerDay, electricRate } = inputs;
  const {
    dailyCost,
    monthlyCost,
    annualCost,
    tenYearCost       = Math.round(annualCost * 10 * 100) / 100,
    coffeeEquivalent   = Math.round(annualCost / 5),
    asPercentMedianBill = Math.round(monthlyCost / 150 * 1000) / 10,
    inflatedCost10yr   = (() => {
      let acc = 0, yr = annualCost;
      for (let i = 0; i < 10; i++) { acc += yr; yr *= 1.03; }
      return Math.round(acc * 100) / 100;
    })(),
  } = outputs;

  const energyStarSavings = Math.round(annualCost * 0.3 * 100) / 100;
  const inflationExtra = Math.round((inflatedCost10yr - tenYearCost) * 100) / 100;

  // annual-framing — always fires, relatable milestone
  if (coffeeEquivalent > 0) {
    insights.push({
      id: "appliance-energy.annual-framing",
      title: `Costs $${annualCost.toLocaleString()} per year — ${coffeeEquivalent} coffees`,
      body: `Running this ${watts}W device for ${hoursPerDay} hours/day costs $${annualCost.toLocaleString()} per year — the equivalent of ${coffeeEquivalent} $5 coffees. Small watts add up over a full year.`,
      severity: annualCost > 500 ? "warning" : annualCost > 200 ? "neutral" : "neutral",
      category: "hidden-cost",
    });
  }

  // ten-year-cost — milestone framing
  if (tenYearCost > 100) {
    insights.push({
      id: "appliance-energy.ten-year-cost",
      title: `Costs $${tenYearCost.toLocaleString()} over 10 years`,
      body: `Over a decade of typical use, this appliance will cost $${tenYearCost.toLocaleString()} in electricity alone — before any rate increases. Factor this into your next appliance purchase decision.`,
      severity: tenYearCost > 2000 ? "warning" : "neutral",
      category: "opportunity-cost",
    });
  }

  // bill-share — contextual framing
  if (asPercentMedianBill > 5) {
    insights.push({
      id: "appliance-energy.bill-share",
      title: `${asPercentMedianBill}% of your total electricity bill`,
      body: `At $${monthlyCost.toLocaleString()}/month, this single device accounts for ~${asPercentMedianBill}% of the average US household electricity bill ($150/month). High-draw devices like AC and electric heaters can easily dominate your bill.`,
      severity: asPercentMedianBill > 25 ? "warning" : "neutral",
      category: "benchmark-comparison",
    });
  }

  // energy-star-upgrade — if annual cost is meaningful
  if (annualCost > 50) {
    insights.push({
      id: "appliance-energy.energy-star-upgrade",
      title: `ENERGY STAR upgrade saves ~$${energyStarSavings}/year`,
      body: `ENERGY STAR certified appliances typically use 20–30% less electricity. Replacing this with a 30%-more-efficient model saves roughly $${energyStarSavings}/year — paying back the upgrade cost faster on high-draw devices.`,
      severity: "neutral",
      category: "investment-opportunity",
    });
  }

  // inflation-adjusted-decade — future burden framing
  if (inflationExtra > 20) {
    insights.push({
      id: "appliance-energy.inflation-decade",
      title: `If electricity rises 3%/yr, this costs $${inflatedCost10yr.toLocaleString()} over 10 years`,
      body: `With flat rates your 10-year cost is $${tenYearCost.toLocaleString()}. At 3% annual electricity inflation — the US historical average — it grows to $${inflatedCost10yr.toLocaleString()}, an extra $${inflationExtra.toLocaleString()} you'll never see coming. Efficiency upgrades lock in today's lower rates.`,
      severity: annualCost > 200 ? "warning" : "neutral",
      category: "hidden-cost",
    });
  }

  // always-on warning
  if (hoursPerDay >= 20) {
    insights.push({
      id: "appliance-energy.always-on",
      title: "Running nearly 24/7 — idle power adds up fast",
      body: `At ${hoursPerDay} hours/day, this device barely turns off. Even reducing to 18 hours/day would save $${Math.round((annualCost - watts / 1000 * 18 * electricRate * 365) * 100) / 100} per year. Consider a smart plug with scheduling to cut idle time.`,
      severity: "warning",
      category: "hidden-cost",
    });
  }

  // rate-context
  if (electricRate > 0.20) {
    insights.push({
      id: "appliance-energy.high-rate",
      title: `High electricity rate ($${electricRate}/kWh) — efficiency matters more`,
      body: `At $${electricRate}/kWh your rate is above the US average (~$0.15/kWh). Efficiency upgrades and off-peak charging deliver proportionally bigger savings. Running this device during off-peak hours (11pm–7am in most regions) may cut costs by 20–40%.`,
      severity: "neutral",
      category: "opportunity-cost",
    });
  }

  return insights;
}
