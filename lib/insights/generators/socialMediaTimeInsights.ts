import type { Insight } from "../index";

interface SocialMediaInputs {
  dailyHours: number;
  years:      number;
}

interface SocialMediaOutputs {
  yearlyHours?:       number;
  lifetimeHours?:     number;
  yearsLost?:         number;
  daysLost?:          number;
  workingYearsLost?:  number;
  yearsLostDecimal?:  number;
}

export function socialMediaTimeInsights(
  inputs: SocialMediaInputs,
  outputs: SocialMediaOutputs
): Insight[] {
  const results: Insight[] = [];

  const daily     = Number(inputs.dailyHours);
  const years     = Number(inputs.years);
  const yearly    = outputs.yearlyHours      ?? 0;
  const lifetime  = outputs.lifetimeHours    ?? 0;
  const yearsLost = outputs.yearsLost        ?? 0;
  const days      = outputs.daysLost         ?? 0;
  const workYears = outputs.workingYearsLost ?? 0;
  const yDecimal  = outputs.yearsLostDecimal ?? 0;

  // 1. Core time framing
  results.push({
    id: "social.core-time",
    type: "info",
    message: `${daily}h/day of social media adds up to ${yearly} hours/year — ${(yearly / 24).toFixed(0)} full days a year spent scrolling.`,
    detail: `That's ${(yearly / 40).toFixed(0)} full work weeks. Imagine what you'd build or learn with that time.`,
  });

  // 2. Lifetime days consumed
  if (days >= 30) {
    results.push({
      id: "social.lifetime-days",
      type: "warning",
      message: `Over ${years} years, ${daily}h/day consumes ${days.toLocaleString()} full days — that's ${(days / 365).toFixed(1)} entire years of your life.`,
      detail: `This is continuous time — not spread across days. ${days.toLocaleString()} days is larger than most people's intuition suggests.`,
    });
  }

  // 3. Working years equivalent
  if (workYears >= 1) {
    results.push({
      id: "social.working-years",
      type: "warning",
      message: `${lifetime.toLocaleString()} lifetime hours is equivalent to ${workYears} full-time working years — all spent on social media.`,
      detail: `In those same ${workYears} working years you could have: earned a degree, built a business, written multiple books, or mastered two careers.`,
    });
  }

  // 4. High daily use
  if (daily >= 4) {
    results.push({
      id: "social.high-use",
      type: "warning",
      message: `${daily}h/day puts you in the top tier of social media users. Research links 4+ hours/day to reduced well-being, sleep quality, and focus.`,
      detail: `Reducing to 2h/day would reclaim ${Math.round((daily - 2) * 365)} hours next year alone — ${((daily - 2) * 365 / 40).toFixed(0)} working weeks of recovered time.`,
    });
  }

  // 5. Benchmark reframe
  const avgDailyUS = 2.3; // hours
  if (daily > avgDailyUS) {
    const excess = Math.round((daily - avgDailyUS) * 365);
    results.push({
      id: "social.above-average",
      type: "info",
      message: `The average American spends ~2.3h/day on social media. You're using ${(daily - avgDailyUS).toFixed(1)}h/day more — ${excess} extra hours/year.`,
      detail: `${excess} hours is enough to learn a programming language, run 500 miles, or read 30+ books.`,
    });
  }

  // 6. One-hour cut nudge
  const hourCutAnnual = Math.round(1 * 365);
  results.push({
    id: "social.one-hour-cut",
    type: "opportunity",
    message: `Cutting just 1 hour/day reclaims ${hourCutAnnual} hours/year — ${(hourCutAnnual / 40).toFixed(0)} full work weeks for skill-building, rest, or relationships.`,
    detail: `Habit science suggests replacing social media time with a specific alternative activity is more effective than just "using it less."`,
  });

  return results;
}
