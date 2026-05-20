import type { Insight } from "../index";

interface FireInputs {
  monthlyExpenses: number;
  currentSavings: number;
  monthlySavings: number;
  annualReturn: number;
}

interface FireOutputs {
  fireNumber?: number;
  yearsToFire?: number;
  progressPercent?: number;
  passiveIncomeNow?: number;
  annualReturnNow?: number;
  yearsFasterWith500?: number;
}

export function fireInsights(
  inputs: FireInputs,
  outputs: FireOutputs
): Insight[] {
  const results: Insight[] = [];

  const fireNum    = outputs.fireNumber      ?? 0;
  const years      = outputs.yearsToFire     ?? 0;
  const progress   = outputs.progressPercent ?? 0;
  const passive    = outputs.passiveIncomeNow ?? 0;
  const returns    = outputs.annualReturnNow  ?? 0;
  const faster500  = outputs.yearsFasterWith500 ?? 0;
  const monthly    = Number(inputs.monthlyExpenses);
  const savings    = Number(inputs.currentSavings);
  const contrib    = Number(inputs.monthlySavings);

  // 1. Progress milestone (always shown)
  if (progress > 0 && progress < 100) {
    const pct = progress.toFixed(1);
    if (progress >= 75) {
      results.push({
        id: "fire.progress-milestone",
        type: "milestone",
        message: `You're ${pct}% of the way to FIRE — the finish line is close.`,
        detail: `$${savings.toLocaleString()} of your $${fireNum.toLocaleString()} FIRE number is already invested.`,
      });
    } else if (progress >= 50) {
      results.push({
        id: "fire.progress-milestone",
        type: "milestone",
        message: `You're ${pct}% of the way to FIRE — past the halfway mark.`,
        detail: `Every dollar you invest now grows toward your $${fireNum.toLocaleString()} target.`,
      });
    } else if (progress >= 25) {
      results.push({
        id: "fire.progress-milestone",
        type: "milestone",
        message: `You're ${pct}% to your FIRE number. You've built a real foundation.`,
        detail: `$${savings.toLocaleString()} invested. $${(fireNum - savings).toLocaleString()} still to go.`,
      });
    } else {
      results.push({
        id: "fire.progress-milestone",
        type: "info",
        message: `You're ${pct}% of the way to FIRE — the best time to accelerate is now.`,
        detail: `Your FIRE number is $${fireNum.toLocaleString()} (25× your $${monthly.toLocaleString()}/mo expenses).`,
      });
    }
  }

  // 2. Already at FIRE
  if (progress >= 100) {
    results.push({
      id: "fire.already-there",
      type: "milestone",
      message: `Your savings already cover your FIRE number. You may already be financially independent.`,
      detail: `At a 4% withdrawal rate, $${savings.toLocaleString()} supports $${Math.round(savings * 0.04 / 12).toLocaleString()}/month indefinitely.`,
    });
    return results;
  }

  // 3. Passive income now
  if (passive > 0) {
    results.push({
      id: "fire.passive-income-now",
      type: "info",
      message: `Your $${savings.toLocaleString()} already generates $${passive.toLocaleString()}/month at the 4% rule.`,
      detail: `That's passive income working for you today — and it grows every time you invest.`,
    });
  }

  // 4. Annual market return
  if (returns > 500) {
    results.push({
      id: "fire.market-working",
      type: "info",
      message: `Your investments are earning ~$${returns.toLocaleString()} per year at ${inputs.annualReturn}% — without you lifting a finger.`,
      detail: `That's $${Math.round(returns / 12).toLocaleString()}/month in compounding returns on your current balance.`,
    });
  }

  // 5. Accelerator: $500 extra
  if (faster500 >= 1) {
    results.push({
      id: "fire.accelerator-500",
      type: "opportunity",
      message: `Adding $500/month shaves ${faster500} year${faster500 === 1 ? "" : "s"} off your FIRE timeline.`,
      detail: `That's ${faster500} fewer years of working. If you can find $500/month — a side hustle, a subscription audit — your freedom date moves up.`,
    });
  }

  // 6. Contribution vs expenses ratio
  const savingsRate = monthly > 0 ? (contrib / monthly) * 100 : 0;
  if (savingsRate >= 50) {
    results.push({
      id: "fire.high-savings-rate",
      type: "milestone",
      message: `You're saving ${savingsRate.toFixed(0)}% of your monthly expenses — an elite savings rate.`,
      detail: `FIRE practitioners recommend 50%+ to retire early. You're already there.`,
    });
  } else if (savingsRate < 25 && contrib > 0) {
    results.push({
      id: "fire.low-savings-rate",
      type: "warning",
      message: `Your savings rate is ${savingsRate.toFixed(0)}% of monthly expenses. Reaching 50% would dramatically accelerate FIRE.`,
      detail: `FIRE calculators assume a tight link between spending and saving. Reducing $${monthly.toLocaleString()}/mo expenses is often faster than raising income.`,
    });
  }

  // 7. Timeline framing
  if (years >= 20) {
    results.push({
      id: "fire.long-timeline",
      type: "warning",
      message: `At your current pace, FIRE is ${years} years away. Increasing contributions now has an outsized compound effect.`,
      detail: `With ${years} years of compounding ahead, every extra $100/month today is worth significantly more than the same $100 in year 10.`,
    });
  } else if (years > 0 && years < 10) {
    results.push({
      id: "fire.short-timeline",
      type: "milestone",
      message: `You're on track for FIRE in under 10 years. That's early retirement territory.`,
      detail: `Stay consistent — market downturns close to your FIRE date are the main risk. Keep 1–2 years of expenses in cash as a buffer.`,
    });
  }

  return results;
}
