// ─── Coast FIRE Insight Generator ────────────────────────────────────────────
//
// Produces live WorthCore insights for the coast-fire-calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   coastfire.already-coasted   — current >= requiredNow → positive (done!)
//   coastfire.nearly-there      — coastRatio >= 0.75 → positive
//   coastfire.halfway            — coastRatio 0.5–0.75 → neutral
//   coastfire.large-gap          — coastRatio < 0.5 → warning
//   coastfire.portfolio-overshoot — coastValue >= target * 1.5 → positive
//   coastfire.low-rate-risk      — rate < 5% → warning (conservative assumption)
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

export interface CoastFireInputs {
  current: number;  // $
  target:  number;  // $
  rate:    number;  // %
  years:   number;  // years
}

export interface CoastFireOutputs {
  coastValue:     number;
  requiredNow:    number;
  coastShortfall?: number;
  coastSurplus?:   number;
  coastRatio?:     number;
}

export function generateCoastFireInsights(
  inputs:  CoastFireInputs,
  outputs: CoastFireOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { current, target, rate, years } = inputs;
  const {
    coastValue,
    requiredNow,
    coastShortfall = 0,
    coastSurplus   = 0,
    coastRatio     = current / Math.max(requiredNow, 1),
  } = outputs;

  // ── 1. Already coasted ──────────────────────────────────────────────────
  if (current >= requiredNow) {
    insights.push({
      id:       "coastfire.already-coasted",
      type:     "positive",
      title:    `You've already hit Coast FIRE`,
      body:     `Your $${current.toLocaleString()} portfolio exceeds the $${requiredNow.toLocaleString()} needed to coast. You could stop contributing today and your investments alone would grow to your $${target.toLocaleString()} target in ${years} years.`,
      priority: 100,
    });
  }

  // ── 2. Nearly there ─────────────────────────────────────────────────────
  if (current < requiredNow && coastRatio >= 0.75) {
    insights.push({
      id:       "coastfire.nearly-there",
      type:     "positive",
      title:    `${Math.round(coastRatio * 100)}% of the way to Coast FIRE`,
      body:     `You're $${coastShortfall.toLocaleString()} away from your Coast FIRE number. At your current savings rate you're well within reach — one strong year could get you over the line.`,
      priority: 90,
    });
  }

  // ── 3. Halfway ──────────────────────────────────────────────────────────
  if (coastRatio >= 0.5 && coastRatio < 0.75) {
    insights.push({
      id:       "coastfire.halfway",
      type:     "neutral",
      title:    `Halfway to Coast FIRE — $${coastShortfall.toLocaleString()} to go`,
      body:     `You've built ${Math.round(coastRatio * 100)}% of the portfolio needed to coast. Once you hit $${requiredNow.toLocaleString()}, every extra dollar invested is optional — compounding does the heavy lifting.`,
      priority: 80,
    });
  }

  // ── 4. Large gap ────────────────────────────────────────────────────────
  if (coastRatio < 0.5) {
    insights.push({
      id:       "coastfire.large-gap",
      type:     "warning",
      title:    `Still ${Math.round((1 - coastRatio) * 100)}% away from coasting`,
      body:     `You need $${coastShortfall.toLocaleString()} more to reach Coast FIRE. Front-loading contributions now is the highest-leverage move — time and compound growth do exponentially more work the earlier you invest.`,
      priority: 85,
    });
  }

  // ── 5. Portfolio overshoot ───────────────────────────────────────────────
  if (coastValue >= target * 1.5) {
    insights.push({
      id:       "coastfire.portfolio-overshoot",
      type:     "positive",
      title:    `On track to blow past your FIRE target`,
      body:     `Your projected portfolio of $${coastValue.toLocaleString()} is ${Math.round((coastValue / target - 1) * 100)}% above your $${target.toLocaleString()} target. Consider whether your target reflects your actual retirement spending needs.`,
      priority: 70,
    });
  }

  // ── 6. Low return rate risk ──────────────────────────────────────────────
  if (rate < 5) {
    insights.push({
      id:       "coastfire.low-rate-risk",
      type:     "neutral",
      title:    `${rate}% return is conservative — but safe`,
      body:     `At ${rate}%, your projections are based on a cautious return assumption. The long-run S&P 500 average is ~10% nominal (7% inflation-adjusted). Even at 5–6%, coast FIRE is achievable — the gap to close is just larger.`,
      priority: 60,
    });
  }

  // ── 7. Surplus framing ───────────────────────────────────────────────────
  if (coastSurplus > 50000) {
    insights.push({
      id:       "coastfire.coast-surplus",
      type:     "positive",
      title:    `$${coastSurplus.toLocaleString()} above your Coast FIRE number`,
      body:     `You have a $${coastSurplus.toLocaleString()} cushion above the minimum needed to coast. Additional contributions now accelerate your timeline or pad your retirement lifestyle above the baseline.`,
      priority: 65,
    });
  }

  return insights;
}
