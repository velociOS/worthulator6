import type { Insight } from "../index";

interface BioAgeInputs {
  age:      number;
  sleep:    number;
  exercise: number;
  bmi:      number;
  smoker:   number;
}

interface BioAgeOutputs {
  biologicalAge?:       number;
  riskScore?:           number;
  ageDelta?:            number;
  riskFactorCount?:     number;
  improvementPotential?: number;
}

export function biologicalAgeInsights(
  inputs: BioAgeInputs,
  outputs: BioAgeOutputs
): Insight[] {
  const results: Insight[] = [];

  const age     = Number(inputs.age);
  const sleep   = Number(inputs.sleep);
  const exercise = Number(inputs.exercise);
  const bmi     = Number(inputs.bmi);
  const smoker  = Number(inputs.smoker);
  const bioAge  = outputs.biologicalAge       ?? age;
  const delta   = outputs.ageDelta            ?? 0;
  const factors = outputs.riskFactorCount     ?? 0;
  const improve = outputs.improvementPotential ?? 0;
  const risk    = outputs.riskScore           ?? 0;

  // 1. Core biological vs chronological framing
  if (delta === 0) {
    results.push({
      id: "bioage.on-track",
      type: "positive",
      message: `Your biological age matches your chronological age of ${age}. Your lifestyle is tracking well.`,
      detail: `No major risk factors detected. Maintaining sleep, exercise, healthy BMI, and not smoking keeps biological ageing in check.`,
    });
  } else {
    results.push({
      id: "bioage.older-than-actual",
      type: "warning",
      message: `Your lifestyle makes you biologically ${delta} years older than your chronological age of ${age} — estimated ${bioAge}.`,
      detail: `Biological age is not fixed. Each lifestyle factor you address directly reverses this gap.`,
    });
  }

  // 2. Sleep impact
  if (sleep < 6) {
    results.push({
      id: "bioage.sleep-deficit",
      type: "warning",
      message: `Getting under 6 hours of sleep adds ~5 years to your biological age. You're currently at ${sleep}h/night.`,
      detail: `Sleep is the single highest-leverage lifestyle lever. Reaching 7–9 hours consistently can recover those years.`,
    });
  } else if (sleep >= 7 && sleep <= 9) {
    results.push({
      id: "bioage.sleep-good",
      type: "positive",
      message: `${sleep}h of sleep per night is in the optimal 7–9h range — well done.`,
      detail: `Adequate sleep reduces systemic inflammation and cortisol, directly slowing cellular ageing.`,
    });
  }

  // 3. Smoking impact
  if (smoker === 1) {
    results.push({
      id: "bioage.smoking",
      type: "warning",
      message: `Smoking adds approximately 8 years to biological age — the single largest modifiable risk factor.`,
      detail: `Research shows biological age begins recovering within 1 year of quitting, with near-full reversal of this factor after 10–15 years.`,
    });
  }

  // 4. Exercise impact
  if (exercise < 2) {
    results.push({
      id: "bioage.low-exercise",
      type: "warning",
      message: `Exercising fewer than 2 days/week adds ~4 years to biological age. You're currently at ${exercise} day(s)/week.`,
      detail: `Just 3 sessions of 30+ minutes per week of moderate activity would eliminate this factor entirely.`,
    });
  } else if (exercise >= 5) {
    results.push({
      id: "bioage.high-exercise",
      type: "positive",
      message: `${exercise} exercise days/week is excellent — this is one of the most powerful anti-ageing behaviours.`,
      detail: `High-frequency exercisers consistently test younger biologically than sedentary peers of the same age.`,
    });
  }

  // 5. Improvement potential
  if (improve >= 10) {
    results.push({
      id: "bioage.improvement-potential",
      type: "opportunity",
      message: `By addressing your ${factors} active risk factor${factors > 1 ? "s" : ""}, you could recover up to ${improve} years of biological age.`,
      detail: `Biological ageing is partially reversible. Consistent lifestyle changes take 3–12 months to show measurable shifts.`,
    });
  }

  // 6. BMI framing
  if (bmi > 30) {
    results.push({
      id: "bioage.bmi-risk",
      type: "warning",
      message: `A BMI above 30 adds ~6 years to biological age. Current BMI: ${bmi}.`,
      detail: `Even a 5–10% reduction in body weight significantly reduces metabolic risk markers and biological ageing indicators.`,
    });
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    results.push({
      id: "bioage.bmi-healthy",
      type: "positive",
      message: `BMI of ${bmi} is in the healthy range (18.5–24.9) — no ageing penalty from this factor.`,
      detail: `Maintaining a healthy BMI throughout adulthood is strongly correlated with longevity.`,
    });
  }

  return results;
}
