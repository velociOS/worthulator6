// ─── Finance defaults — passive income data layer ────────────────────────────
// All financial assumptions live here. Components and calculation modules must
// import from this file — never hardcode financial values elsewhere.

// ─── Core types ───────────────────────────────────────────────────────────────

export type Region = "US" | "UK";
export type StreamType =
  | "investment"
  | "rental"
  | "dividend"
  | "business"
  | "custom";
export type RiskLevel = "low" | "medium" | "high";
export type IncomeModel = "compound" | "fixed_yield" | "hybrid";

// ─── Asset type definitions ───────────────────────────────────────────────────

export interface AssetTypeConfig {
  label: string;
  description: string;
  /** Nominal annual capital-growth return (%) — used in FV formula */
  defaultAnnualReturn: number;
  /** Annual income yield (%) — used for fixed_yield / hybrid income models */
  defaultYieldRate: number;
  defaultRisk: RiskLevel;
  defaultIncomeModel: IncomeModel;
  /** Whether new streams of this type default to direct input or growth calculation */
  defaultMode: "direct" | "growth";
  examples: string;
}

export const ASSET_TYPES: Record<StreamType, AssetTypeConfig> = {
  investment: {
    label: "Investment Portfolio",
    description: "Index funds, ETFs, equities",
    defaultAnnualReturn: 7,
    defaultYieldRate: 3,
    defaultRisk: "medium",
    defaultIncomeModel: "compound",
    defaultMode: "growth",
    examples: "S&P 500 ETF, Vanguard FTSE All-World, global index funds",
  },
  rental: {
    label: "Rental Property",
    description: "Buy-to-let, rental income",
    defaultAnnualReturn: 4,
    defaultYieldRate: 5,
    defaultRisk: "medium",
    defaultIncomeModel: "fixed_yield",
    defaultMode: "direct",
    examples: "Monthly rent after mortgage, management fees, and void periods",
  },
  dividend: {
    label: "Dividend Income",
    description: "Dividend stocks, income funds",
    defaultAnnualReturn: 6,
    defaultYieldRate: 4,
    defaultRisk: "low",
    defaultIncomeModel: "hybrid",
    defaultMode: "direct",
    examples: "Quarterly dividends, income ETF distributions, REITs",
  },
  business: {
    label: "Business Income",
    description: "Business equity, digital products",
    defaultAnnualReturn: 15,
    defaultYieldRate: 10,
    defaultRisk: "high",
    defaultIncomeModel: "compound",
    defaultMode: "direct",
    examples: "Online business, SaaS revenue, licensing, royalties",
  },
  custom: {
    label: "Custom Stream",
    description: "Any other income source",
    defaultAnnualReturn: 7,
    defaultYieldRate: 4,
    defaultRisk: "medium",
    defaultIncomeModel: "compound",
    defaultMode: "direct",
    examples: "Peer-to-peer lending, alternative investments, savings bonds",
  },
};

// ─── Scenario presets ─────────────────────────────────────────────────────────

export interface ScenarioPreset {
  key: string;
  label: string;
  annualReturn: number;
}

export const SCENARIOS: ScenarioPreset[] = [
  { key: "conservative", label: "Conservative", annualReturn: 5 },
  { key: "balanced", label: "Balanced", annualReturn: 7 },
  { key: "aggressive", label: "Aggressive", annualReturn: 10 },
];

// ─── Regional finance defaults ─────────────────────────────────────────────────

export interface RegionFinanceDefaults {
  defaultInflation: number;
  defaultWithdrawalRate: number;
  currency: string;
}

export const REGION_DEFAULTS: Record<Region, RegionFinanceDefaults> = {
  US: {
    defaultInflation: 2.5,
    defaultWithdrawalRate: 4,
    currency: "$",
  },
  UK: {
    defaultInflation: 2.5,
    defaultWithdrawalRate: 4,
    currency: "£",
  },
};

// ─── Income interpretation milestones ─────────────────────────────────────────

export interface IncomeMilestone {
  /** Monthly amount threshold */
  threshold: number;
  label: string;
}

export const INCOME_MILESTONES: IncomeMilestone[] = [
  { threshold: 500, label: "Covers phone, subscriptions, and utilities" },
  { threshold: 1000, label: "Supplements a regular income meaningfully" },
  { threshold: 2000, label: "Could cover rent in many lower-cost areas" },
  { threshold: 3000, label: "Covers basic living costs in most regions" },
  { threshold: 5000, label: "Provides comfortable living in most of the US and UK" },
  { threshold: 7500, label: "Full financial independence in virtually any region" },
  { threshold: 10000, label: "Significant wealth — well above what most people need" },
];

/** Returns the highest milestone threshold that monthlyIncome meets or exceeds. */
export function getIncomeMilestone(monthlyIncome: number): IncomeMilestone | null {
  const matched = [...INCOME_MILESTONES]
    .reverse()
    .find((m) => monthlyIncome >= m.threshold);
  return matched ?? null;
}

// ─── Risk colour classes (Tailwind) ───────────────────────────────────────────

export const RISK_COLORS: Record<RiskLevel, string> = {
  low: "text-blue-600 bg-blue-50 border-blue-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  high: "text-red-600 bg-red-50 border-red-200",
};

// ─── Stream bar colours (Tailwind) ────────────────────────────────────────────

export const STREAM_COLORS = [
  "bg-emerald-400",
  "bg-blue-400",
  "bg-orange-400",
  "bg-purple-400",
  "bg-pink-400",
] as const;
