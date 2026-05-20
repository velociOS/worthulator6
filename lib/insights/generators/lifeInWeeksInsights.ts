import type { Insight } from "../index";

interface LifeInWeeksInputs {
  age:            number;
  lifeExpectancy: number;
}

interface LifeInWeeksOutputs {
  weeksRemaining?:       number;
  weeksLived?:           number;
  percentUsed?:          number;
  yearsRemaining?:       number;
  daysRemaining?:        number;
  summerWeeksRemaining?: number;
}

export function lifeInWeeksInsights(
  inputs: LifeInWeeksInputs,
  outputs: LifeInWeeksOutputs
): Insight[] {
  const results: Insight[] = [];

  const age       = Number(inputs.age);
  const lifeExp   = Number(inputs.lifeExpectancy);
  const remaining = outputs.weeksRemaining       ?? 0;
  const lived     = outputs.weeksLived           ?? 0;
  const pct       = outputs.percentUsed          ?? 0;
  const yearsLeft = outputs.yearsRemaining       ?? 0;
  const daysLeft  = outputs.daysRemaining        ?? 0;
  const summers   = outputs.summerWeeksRemaining ?? 0;

  // 1. Core scarcity framing
  results.push({
    id: "weeks.core-scarcity",
    type: "info",
    message: `A ${lifeExp}-year life is ${lifeExp * 52} weeks total. At ${age}, you've used ${lived.toLocaleString()} and have ${remaining.toLocaleString()} remaining.`,
    detail: `Each week is a fixed, non-renewable unit. There's no making up a week you let slip by.`,
  });

  // 2. Percentage milestone framing
  if (pct >= 50) {
    results.push({
      id: "weeks.past-halfway",
      type: "milestone",
      message: `You're ${pct}% through your expected lifespan — past the halfway point.`,
      detail: `This isn't a cause for anxiety — it's a signal. The weeks remaining are just as full of potential as the ones already lived.`,
    });
  } else {
    results.push({
      id: "weeks.before-halfway",
      type: "positive",
      message: `You're ${pct}% through your expected lifespan — more than ${(100 - pct).toFixed(0)}% of your life is still ahead of you.`,
      detail: `Most of the compounding — in wealth, relationships, skills, and experience — still lies ahead.`,
    });
  }

  // 3. Years as "summers" framing
  if (summers > 0) {
    results.push({
      id: "weeks.summers-remaining",
      type: "info",
      message: `${yearsLeft} years remaining means roughly ${summers} weeks of summer left to experience.`,
      detail: `Thinking in "summers" or "Christmases" makes abstract time feel immediate and motivating.`,
    });
  }

  // 4. Days remaining
  if (daysLeft > 0) {
    results.push({
      id: "weeks.days-remaining",
      type: "info",
      message: `${remaining.toLocaleString()} weeks is ${daysLeft.toLocaleString()} days — each one a discrete choice about where to direct your attention.`,
      detail: `Tim Urban's "Your Life in Weeks" visual shows this powerfully: most of your weeks already have an owner. The question is whether the remaining ones do too.`,
    });
  }

  // 5. Urgency without anxiety
  if (age >= 60) {
    results.push({
      id: "weeks.late-stage",
      type: "milestone",
      message: `At ${age}, you have ${remaining.toLocaleString()} weeks remaining — enough to start a new chapter, build something meaningful, or deepen every relationship that matters.`,
      detail: `Research on life satisfaction consistently shows people in their 60s–80s report higher meaning and contentment than younger adults. These are not diminished years.`,
    });
  } else if (age < 30) {
    results.push({
      id: "weeks.early-stage",
      type: "opportunity",
      message: `At ${age}, you have ${remaining.toLocaleString()} weeks ahead — roughly ${(remaining / 52).toFixed(0)} years. The compound effect of starting habits now is enormous.`,
      detail: `A habit started at ${age} has ${yearsLeft} years to compound. Whether it's savings, fitness, learning, or relationships — start now.`,
    });
  }

  // 6. Intentionality prompt
  results.push({
    id: "weeks.intentionality",
    type: "opportunity",
    message: `If you filled just ${Math.round(remaining * 0.1).toLocaleString()} of your remaining weeks with one deliberate focus, that's ${Math.round(remaining * 0.1 / 52)} years of intentional progress.`,
    detail: `You don't need every week. 10% of your remaining time, focused deliberately, compounds into a life-defining body of work.`,
  });

  return results;
}
