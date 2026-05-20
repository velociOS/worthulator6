// ─── True Hourly Wage Insight Generator ──────────────────────────────────────
//
// Produces live WorthCore insights for the true-hourly-wage calculator.
// Called on every slider change via LiveInsightBlock → GENERATOR_REGISTRY.
//
// Rules:
//   truehourly.rate-ratio   — always fires — % of advertised rate they actually earn
//   truehourly.large-gap    — hourlyLoss > $10 → warning
//   truehourly.moderate-gap — hourlyLoss $5–10 → neutral
//   truehourly.time-robbed  — extraHoursPerYear > 200 → warning (5+ extra weeks)
//   truehourly.no-commute   — commuteHrsDay === 0 → positive
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from "@/lib/insights/types";

export interface TrueHourlyInputs {
  salary:         number;   // $
  hoursPerWeek:   number;   // hrs
  commuteHrsDay:  number;   // hrs each way
  decompressHrs:  number;   // hrs/day
}

export interface TrueHourlyOutputs {
  trueHourly:         number;
  advertisedHourly:   number;
  extraHoursPerYear:  number;
  hourlyLoss?:            number;
  trueVsAdvertisedRatio?: number;
  timeRobbedWeeks?:       number;
}

export function generateTrueHourlyInsights(
  inputs:  TrueHourlyInputs,
  outputs: TrueHourlyOutputs,
): Insight[] {
  const insights: Insight[] = [];

  const { salary, hoursPerWeek, commuteHrsDay, decompressHrs } = inputs;
  const {
    trueHourly,
    advertisedHourly,
    extraHoursPerYear,
    hourlyLoss            = Math.round((advertisedHourly - trueHourly) * 100) / 100,
    trueVsAdvertisedRatio = advertisedHourly > 0 ? trueHourly / advertisedHourly : 1,
    timeRobbedWeeks       = Math.round((extraHoursPerYear / 40) * 10) / 10,
  } = outputs;

  const effectivePct = Math.round(trueVsAdvertisedRatio * 100);

  // ── 1. Rate ratio (always fires) ─────────────────────────────────────────
  insights.push({
    id:       "truehourly.rate-ratio",
    type:     effectivePct >= 90 ? "positive" : effectivePct >= 75 ? "neutral" : "warning",
    title:    `You only capture ${effectivePct}% of your advertised $${advertisedHourly.toFixed(2)}/hr`,
    body:     `Once commute and decompression time are included, your true hourly drops from $${advertisedHourly.toFixed(2)} to $${trueHourly.toFixed(2)} — a $${hourlyLoss.toFixed(2)} gap. Over a year, that's ${extraHoursPerYear} hours of unpaid time (${timeRobbedWeeks} work weeks).`,
    priority: 100,
  });

  // ── 2. Large gap ──────────────────────────────────────────────────────────
  if (hourlyLoss > 10) {
    const annualLoss = Math.round(hourlyLoss * extraHoursPerYear);
    insights.push({
      id:       "truehourly.large-gap",
      type:     "warning",
      title:    `Commute and decompression cost you $${hourlyLoss.toFixed(2)}/hr`,
      body:     `If you valued your extra ${extraHoursPerYear} work-related hours at your advertised rate, that's $${annualLoss.toLocaleString()}/year in uncompensated time. A remote or hybrid arrangement, or a shorter commute, could effectively give you a major raise.`,
      priority: 95,
    });
  }

  // ── 3. Moderate gap ───────────────────────────────────────────────────────
  if (hourlyLoss >= 5 && hourlyLoss <= 10) {
    insights.push({
      id:       "truehourly.moderate-gap",
      type:     "neutral",
      title:    `$${hourlyLoss.toFixed(2)}/hr hidden cost from job-related time`,
      body:     `Your ${commuteHrsDay > 0 ? `${commuteHrsDay}hr commute` : ""}${commuteHrsDay > 0 && decompressHrs > 0 ? " and " : ""}${decompressHrs > 0 ? `${decompressHrs}hr decompression` : ""} adds up to ${extraHoursPerYear} hours annually. Negotiating even 2 remote days/week could recover a significant portion of this gap.`,
      priority: 85,
    });
  }

  // ── 4. Heavy time burden ──────────────────────────────────────────────────
  if (extraHoursPerYear > 200) {
    insights.push({
      id:       "truehourly.time-robbed",
      type:     "warning",
      title:    `${extraHoursPerYear} unpaid hours/year = ${timeRobbedWeeks} extra work weeks`,
      body:     `That's more than ${Math.floor(timeRobbedWeeks)} full work weeks per year spent on job-adjacent activities with no pay. Remote-first roles, closer offices, or flex-time policies can reclaim this time — and it's worth factoring into any job comparison.`,
      priority: 90,
    });
  }

  // ── 5. No commute bonus ───────────────────────────────────────────────────
  if (commuteHrsDay === 0) {
    insights.push({
      id:       "truehourly.no-commute",
      type:     "positive",
      title:    `Zero commute — your true rate nearly matches advertised`,
      body:     `With no commute, your true hourly of $${trueHourly.toFixed(2)} is very close to your advertised $${advertisedHourly.toFixed(2)}. Remote work is effectively a pay raise — the average US commute of 27 minutes each way costs workers ~$3–5/hr in true rate.`,
      priority: 75,
    });
  }

  // ── 6. Annual true compensation context ──────────────────────────────────
  const trueAnnual = Math.round(trueHourly * hoursPerWeek * 52);
  if (trueAnnual < salary * 0.85) {
    insights.push({
      id:       "truehourly.annual-context",
      type:     "neutral",
      title:    `True economic value of your role: ~$${trueAnnual.toLocaleString()}/year`,
      body:     `When job-related hours are priced at your true rate, your $${salary.toLocaleString()} salary has an effective economic value of ~$${trueAnnual.toLocaleString()}. Use this as a benchmark when comparing competing job offers — a $5k raise at a remote company is often worth much more.`,
      priority: 65,
    });
  }

  return insights;
}
