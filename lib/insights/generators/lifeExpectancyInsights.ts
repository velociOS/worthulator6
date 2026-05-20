import type { Insight } from "../index";

interface LifeExpectancyInputs {
  age:      number;
  smoker:   number;
  exercise: number;
  bmi:      number;
}

interface LifeExpectancyOutputs {
  lifeExpectancy?:           number;
  yearsRemaining?:           number;
  weeksRemaining?:           number;
  improvementPotential?:     number;
  daysRemaining?:            number;
  productiveYearsRemaining?: number;
}

export function lifeExpectancyInsights(
  inputs: LifeExpectancyInputs,
  outputs: LifeExpectancyOutputs
): Insight[] {
  const results: Insight[] = [];

  const age       = Number(inputs.age);
  const smoker    = Number(inputs.smoker);
  const exercise  = Number(inputs.exercise);
  const bmi       = Number(inputs.bmi);
  const lifeExp   = outputs.lifeExpectancy           ?? 78;
  const yearsLeft = outputs.yearsRemaining           ?? 0;
  const weeks     = outputs.weeksRemaining           ?? 0;
  const improve   = outputs.improvementPotential     ?? 0;
  const days      = outputs.daysRemaining            ?? 0;
  const prodYears = outputs.productiveYearsRemaining ?? 0;

  // 1. Core expectancy framing
  results.push({
    id: "lifeexp.core",
    type: "info",
    message: `Based on your current lifestyle, estimated life expectancy is ${lifeExp} — leaving roughly ${yearsLeft} years (${weeks.toLocaleString()} weeks) from now.`,
    detail: `This is a planning estimate, not a prediction. Use it as a prompt to live with more intention.`,
  });

  // 2. Smoking is the biggest lever
  if (smoker === 1) {
    results.push({
      id: "lifeexp.smoking",
      type: "warning",
      message: `Smoking is estimated to reduce life expectancy by ~10 years. That's ${10 * 52} weeks removed from your projection.`,
      detail: `Quitting at ${age} still recovers many of those years. Life expectancy begins improving within months of quitting.`,
    });
  }

  // 3. Exercise impact
  if (exercise === 0) {
    results.push({
      id: "lifeexp.no-exercise",
      type: "warning",
      message: `Not exercising costs an estimated 4–6 years of life expectancy. Even 2 sessions/week of 30-minute walks measurably changes this.`,
      detail: `Exercise is one of the most studied longevity interventions. The dose required to see benefit is lower than most people think.`,
    });
  } else if (exercise === 3) {
    results.push({
      id: "lifeexp.high-exercise",
      type: "positive",
      message: `5+ exercise sessions per week adds ~6 years to life expectancy in this model — you're doing the right things.`,
      detail: `High-frequency exercisers consistently outlive sedentary peers by 5–10 years across multiple large cohort studies.`,
    });
  }

  // 4. Improvement potential
  if (improve > 0) {
    results.push({
      id: "lifeexp.improvement",
      type: "opportunity",
      message: `Optimising your lifestyle could add up to ${improve} more years to your life expectancy from this baseline.`,
      detail: `No single change produces all of this — but stacking small, consistent lifestyle improvements compounds over decades.`,
    });
  }

  // 5. Productive years framing (career/creative years left)
  if (prodYears > 0) {
    results.push({
      id: "lifeexp.productive-years",
      type: "milestone",
      message: `You have an estimated ${prodYears} productive working years ahead (to age 65) — enough time to build, change careers, or leave a legacy.`,
      detail: `${prodYears} years is ${prodYears * 52} weeks — more than enough to become expert-level in a new field, build a business, or pivot meaningfully.`,
    });
  } else if (age >= 65) {
    results.push({
      id: "lifeexp.post-65",
      type: "positive",
      message: `At ${age}, you're past the traditional retirement marker — with ${yearsLeft} years remaining. These are bonus productive years, entirely on your terms.`,
      detail: `Many people do their most meaningful work in retirement — freed from obligation, they build, create, and contribute more intentionally.`,
    });
  }

  // 6. Days remaining — visceral framing
  if (days > 0) {
    results.push({
      id: "lifeexp.days-framing",
      type: "info",
      message: `${yearsLeft} years is ${days.toLocaleString()} days. Each one is a new opportunity to make progress toward what matters most.`,
      detail: `"How we spend our days is, of course, how we spend our lives." — Annie Dillard`,
    });
  }

  return results;
}
