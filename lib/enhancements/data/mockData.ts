/**
 * Mock data for development and testing.
 * Replace with real API calls or database queries in production.
 */

import type { EarningsDataPoint } from "@/components/enhancements/charts/EarningsChart";
import type { TrendDataPoint } from "@/components/enhancements/charts/TrendChart";
import type { ComparisonDataPoint } from "@/components/enhancements/charts/ComparisonChart";

// ─── Earnings over 12 months ─────────────────────────────────────────────────

export const mockMonthlyEarnings: EarningsDataPoint[] = [
  { label: "Jan", value: 4200, projected: 4500 },
  { label: "Feb", value: 3900, projected: 4500 },
  { label: "Mar", value: 5100, projected: 4800 },
  { label: "Apr", value: 4800, projected: 5000 },
  { label: "May", value: 5400, projected: 5200 },
  { label: "Jun", value: 5800, projected: 5400 },
  { label: "Jul", value: 5200, projected: 5600 },
  { label: "Aug", value: 6100, projected: 5800 },
  { label: "Sep", value: 5700, projected: 6000 },
  { label: "Oct", value: 6400, projected: 6200 },
  { label: "Nov", value: 6900, projected: 6400 },
  { label: "Dec", value: 7200, projected: 6600 },
];

// ─── Trend data (3 years) ────────────────────────────────────────────────────

export const mockAnnualTrend: TrendDataPoint[] = [
  { date: "2022", value: 48000 },
  { date: "2023", value: 56000 },
  { date: "2024", value: 63000 },
  { date: "2025", value: 71000 },
  { date: "2026", value: 79000 },
];

// ─── Salary comparison ───────────────────────────────────────────────────────

export const mockSalaryComparison: ComparisonDataPoint[] = [
  { label: "Junior", base: 38000, withBenefits: 44000 },
  { label: "Mid",    base: 58000, withBenefits: 68000 },
  { label: "Senior", base: 82000, withBenefits: 97000 },
  { label: "Lead",   base: 105000, withBenefits: 124000 },
];

export const mockSalaryComparisonSeries = [
  { key: "base", name: "Base salary", color: "#10b981" },
  { key: "withBenefits", name: "Total compensation", color: "#6366f1" },
];

// ─── Insight mock data ───────────────────────────────────────────────────────

export const mockInsightData: Record<string, number> = {
  grossAnnual: 75000,
  netAnnual: 52500,
  savingsRate: 18,
  hourlyRate: 36,
};
