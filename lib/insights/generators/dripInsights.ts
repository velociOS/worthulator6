// ─── DRIP (Dividend Reinvestment) Insight Generator ─────────────────────────
//
// Produces live WorthCore insights for the drip-calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   drip.gains-exceed-deposits — totalGain > totalContributed → positive
//   drip.strong-multiplier     — returnMultiple > 3 → positive
//   drip.annual-income         — shows projected annual dividend income → neutral
//   drip.double-time           — shows years to double at current rate → neutral
//   drip.low-yield             — dividendYield < 2% → neutral (below S&P avg)
//   drip.long-horizon-reward   — years >= 25 → positive (time is the engine)
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

export interface DripInputs {
  initial:       number;   // $
  monthlyAdd:    number;   // $/month
  dividendYield: number;   // %
  priceGrowth:   number;   // %
  years:         number;   // years
}

export interface DripOutputs {
  finalValue:       number;
  totalContributed: number;
  totalGain:        number;
  returnMultiple?:      number;
  annualDividendAtEnd?: number;
  doubleTimeYears?:     number;
}

export function generateDripInsights(
  inputs:  DripInputs,
  outputs: DripOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { initial, monthlyAdd, dividendYield, priceGrowth, years } = inputs;
  const {
    finalValue,
    totalContributed,
    totalGain,
    returnMultiple      = totalContributed > 0 ? finalValue / totalContributed : 1,
    annualDividendAtEnd = Math.round(finalValue * dividendYield / 100),
    doubleTimeYears     = (dividendYield + priceGrowth) > 0
      ? Math.round(72 / (dividendYield + priceGrowth) * 10) / 10
      : 0,
  } = outputs;

  // ── 1. Gains exceed deposits ─────────────────────────────────────────────
  if (totalGain > totalContributed) {
    insights.push({
      id:       "drip.gains-exceed-deposits",
      type:     "positive",
      title:    `Growth beats deposits — $${totalGain.toLocaleString()} in gains vs $${totalContributed.toLocaleString()} invested`,
      body:     `After ${years} years, your total growth of $${totalGain.toLocaleString()} exceeds everything you put in. Reinvested dividends and price appreciation together now outweigh your own contributions — that's compounding at work.`,
      priority: 100,
    });
  }

  // ── 2. Strong return multiple ────────────────────────────────────────────
  if (returnMultiple >= 3) {
    insights.push({
      id:       "drip.strong-multiplier",
      type:     "positive",
      title:    `${returnMultiple.toFixed(1)}× return on your invested capital`,
      body:     `Your $${totalContributed.toLocaleString()} grows to $${finalValue.toLocaleString()} — a ${returnMultiple.toFixed(1)}× multiple. DRIP investing's power comes from dividend reinvestment compounding on top of price growth, month after month.`,
      priority: 95,
    });
  } else if (returnMultiple >= 1.5) {
    insights.push({
      id:       "drip.moderate-multiplier",
      type:     "neutral",
      title:    `${returnMultiple.toFixed(1)}× your money over ${years} years`,
      body:     `A ${returnMultiple.toFixed(1)}× return means your $${totalContributed.toLocaleString()} becomes $${finalValue.toLocaleString()}. Extending the horizon or increasing monthly contributions would push this multiple significantly higher.`,
      priority: 80,
    });
  }

  // ── 3. Annual dividend income at maturity ────────────────────────────────
  if (annualDividendAtEnd > 0) {
    insights.push({
      id:       "drip.annual-income",
      type:     "neutral",
      title:    `At maturity, your portfolio could pay $${annualDividendAtEnd.toLocaleString()}/year in dividends`,
      body:     `A ${dividendYield}% yield on a $${finalValue.toLocaleString()} portfolio generates $${annualDividendAtEnd.toLocaleString()} annually — about $${Math.round(annualDividendAtEnd / 12).toLocaleString()}/month. That's passive income that persists without selling a single share.`,
      priority: 85,
    });
  }

  // ── 4. Double time ───────────────────────────────────────────────────────
  if (doubleTimeYears > 0) {
    insights.push({
      id:       "drip.double-time",
      type:     "neutral",
      title:    `At ${dividendYield + priceGrowth}% combined return, your money doubles every ~${doubleTimeYears} years`,
      body:     `The Rule of 72: divide 72 by your annual return to estimate years to double. At ${dividendYield + priceGrowth}% (${dividendYield}% yield + ${priceGrowth}% growth), you double roughly every ${doubleTimeYears} years — meaning your portfolio could double ${Math.floor(years / doubleTimeYears)} time(s) over this horizon.`,
      priority: 70,
    });
  }

  // ── 5. Low yield ─────────────────────────────────────────────────────────
  if (dividendYield < 2) {
    insights.push({
      id:       "drip.low-yield",
      type:     "neutral",
      title:    `${dividendYield}% yield is below the S&P 500 average`,
      body:     `The S&P 500 currently yields around 1.3–1.5%. At ${dividendYield}% you're relying more on price appreciation than dividends. High-dividend ETFs (like SCHD or VYM) typically yield 3–4% while still offering growth — worth considering for DRIP strategies.`,
      priority: 65,
    });
  }

  // ── 6. Long horizon reward ───────────────────────────────────────────────
  if (years >= 25) {
    insights.push({
      id:       "drip.long-horizon",
      type:     "positive",
      title:    `${years} years gives compounding serious room to run`,
      body:     `Long time horizons supercharge DRIP investing. Your $${initial.toLocaleString()} initial investment alone compounds to $${Math.round(initial * Math.pow(1 + (dividendYield + priceGrowth) / 100, years)).toLocaleString()} — before adding a single monthly contribution. Time is the most powerful variable in this equation.`,
      priority: 60,
    });
  }

  return insights;
}
