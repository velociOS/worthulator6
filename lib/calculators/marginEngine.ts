// ─── Margin Calculator Engine ─────────────────────────────────────────────────

export type CalcMode = "cost_price" | "target_margin" | "target_markup";

export interface MarginInputs {
  mode: CalcMode;
  cost: number;
  price: number;
  desiredMargin: number; // used in target_margin mode
  desiredMarkup: number; // used in target_markup mode
  monthlyUnits: number;
}

export interface SensitivityPoint {
  price: number;
  margin: number;
  profit: number;
}

export interface ProjectionPoint {
  units: number;
  revenue: number;
  profit: number;
}

export interface ScenarioComparison {
  name: string;
  margin: number;
  color: string;
}

export interface MarginResult {
  // Core metrics
  effectiveCost: number;
  effectivePrice: number;
  grossProfit: number;
  marginPct: number;
  markupPct: number;
  profitPerSale: number;

  // Volume metrics
  monthlyRevenue: number;
  monthlyProfit: number;
  monthlyCosts: number;
  annualProfit: number;

  // Shares
  costSharePct: number;
  profitSharePct: number;

  // Chart data
  sensitivityData: SensitivityPoint[];
  projectionData: ProjectionPoint[];
  scenarioData: ScenarioComparison[];

  // Helpers
  isValid: boolean;
  isProfitable: boolean;
}

// Derive effective cost & price based on mode
function resolveInputs(inputs: MarginInputs): { cost: number; price: number } {
  const { mode, cost, price, desiredMargin, desiredMarkup } = inputs;

  if (mode === "target_margin") {
    // price = cost / (1 - margin%)
    const m = Math.min(desiredMargin, 99.9);
    const derivedPrice = m >= 0 && cost > 0 ? cost / (1 - m / 100) : price;
    return { cost, price: derivedPrice };
  }

  if (mode === "target_markup") {
    // price = cost * (1 + markup%)
    const derivedPrice = cost > 0 ? cost * (1 + desiredMarkup / 100) : price;
    return { cost, price: derivedPrice };
  }

  return { cost, price };
}

export function calculateMargin(inputs: MarginInputs): MarginResult {
  const { monthlyUnits } = inputs;
  const { cost, price } = resolveInputs(inputs);

  const isValid = cost > 0 && price > 0;
  const isProfitable = price > cost;

  const grossProfit = price - cost;
  const marginPct = price > 0 ? (grossProfit / price) * 100 : 0;
  const markupPct = cost > 0 ? (grossProfit / cost) * 100 : 0;

  const monthlyRevenue = price * monthlyUnits;
  const monthlyProfit = grossProfit * monthlyUnits;
  const monthlyCosts = cost * monthlyUnits;
  const annualProfit = monthlyProfit * 12;

  const costSharePct = price > 0 ? (cost / price) * 100 : 0;
  const profitSharePct = price > 0 ? (grossProfit / price) * 100 : 0;

  // Sensitivity: price ±40% in steps of 5%
  const sensitivityData: SensitivityPoint[] = [];
  for (let delta = -40; delta <= 40; delta += 5) {
    const p = price * (1 + delta / 100);
    if (p <= 0) continue;
    const m = ((p - cost) / p) * 100;
    sensitivityData.push({
      price: Math.round(p * 100) / 100,
      margin: Math.round(m * 10) / 10,
      profit: Math.round((p - cost) * monthlyUnits),
    });
  }

  // Volume projection
  const projectionData: ProjectionPoint[] = [10, 25, 50, 100, 250, 500, 1000].map((units) => ({
    units,
    revenue: Math.round(price * units),
    profit: Math.round(grossProfit * units),
  }));

  // Industry benchmark comparisons
  const scenarioData: ScenarioComparison[] = [
    { name: "Restaurant",   margin: 10,  color: "#f97316" },
    { name: "eCommerce",    margin: 20,  color: "#3b82f6" },
    { name: "Retail",       margin: 30,  color: "#8b5cf6" },
    { name: "Software",     margin: 72,  color: "#06b6d4" },
    { name: "Your margin",  margin: Math.round(marginPct * 10) / 10, color: "#34d399" },
  ];

  return {
    effectiveCost: cost,
    effectivePrice: price,
    grossProfit,
    marginPct,
    markupPct,
    profitPerSale: grossProfit,
    monthlyRevenue,
    monthlyProfit,
    monthlyCosts,
    annualProfit,
    costSharePct,
    profitSharePct,
    sensitivityData,
    projectionData,
    scenarioData,
    isValid,
    isProfitable,
  };
}

// Quick helpers used in the UI
export function priceFromMargin(cost: number, margin: number): number {
  if (margin >= 100 || margin < 0) return 0;
  return cost > 0 ? cost / (1 - margin / 100) : 0;
}

export function priceFromMarkup(cost: number, markup: number): number {
  return cost > 0 ? cost * (1 + markup / 100) : 0;
}

export function marginFromMarkup(markup: number): number {
  return markup > 0 ? (markup / (100 + markup)) * 100 : 0;
}

export function markupFromMargin(margin: number): number {
  if (margin >= 100 || margin < 0) return 0;
  return (margin / (100 - margin)) * 100;
}
