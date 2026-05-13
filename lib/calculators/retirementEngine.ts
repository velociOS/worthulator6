// ─── Retirement Calculator Engine ────────────────────────────────────────────
// Compound accumulation + inflation-adjusted drawdown with portfolio
// sustainability modelling, readiness scoring, and milestone projections.

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturnRate: number;       // % pre-retirement
  retirementReturnRate: number;   // % post-retirement (conservative)
  inflationRate: number;          // % annual
  monthlyRetirementGoal: number;  // desired monthly income in today's dollars
  annualBonus: number;            // optional extra annual contribution
  socialSecurityMonthly: number;  // monthly SS/pension in today's dollars
}

export interface YearlyRetirementSnapshot {
  age: number;
  portfolioValue: number;
  totalContributions: number;
  totalGrowth: number;
  inflationAdjustedValue: number;
  phase: "accumulation" | "retirement";
  monthlyWithdrawal?: number;
}

export interface RetirementMilestone {
  amount: number;
  label: string;
  ageToReach: number | null;
}

export interface RetirementResult {
  // Accumulation
  projectedBalance: number;
  totalContributions: number;
  totalGrowth: number;
  inflationAdjustedBalance: number;

  // Income & drawdown
  safeMonthlyWithdrawal: number;     // 4% rule / 12
  portfolioMonthlyIncome: number;
  socialSecurityAdjusted: number;    // SS in future dollars at retirement
  totalMonthlyIncome: number;        // portfolio + SS
  monthlyRetirementNeed: number;     // goal in future dollars at retirement
  monthlyIncomeGap: number;          // positive = shortfall, negative = surplus
  incomeReplacementRate: number;     // % of goal covered (capped at 200)

  // Sustainability
  sustainabilityYears: number;
  portfolioDepletesAtAge: number | null;
  portfolioOutlivesExpectancy: boolean;

  // Readiness
  readinessScore: number;            // 0–100
  readinessLabel: string;
  readinessColor: "emerald" | "amber" | "orange" | "rose";

  // Dimensions
  accumulationYears: number;
  drawdownYears: number;

  // Data series
  yearlySnapshots: YearlyRetirementSnapshot[];
  milestones: RetirementMilestone[];
}

export interface RetirementScenario {
  label: string;
  description: string;
  emoji: string;
  mutate: (inputs: RetirementInputs) => RetirementInputs;
}

// ─── Core engine ─────────────────────────────────────────────────────────────

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    annualReturnRate,
    retirementReturnRate,
    inflationRate,
    monthlyRetirementGoal,
    annualBonus,
    socialSecurityMonthly,
  } = inputs;

  const accumulationYears = Math.max(0, retirementAge - currentAge);
  const drawdownYears = Math.max(0, lifeExpectancy - retirementAge);
  const monthlyAccumRate = annualReturnRate / 100 / 12;
  const monthlyDrawdownRate = retirementReturnRate / 100 / 12;

  // ── Accumulation phase ─────────────────────────────────────────────────────
  const yearlySnapshots: YearlyRetirementSnapshot[] = [];
  let balance = currentSavings;
  let totalContributions = currentSavings;

  for (let year = 1; year <= accumulationYears; year++) {
    for (let m = 0; m < 12; m++) {
      balance += monthlyContribution;
      totalContributions += monthlyContribution;
      balance *= 1 + monthlyAccumRate;
    }
    balance += annualBonus;
    totalContributions += annualBonus;

    const inflFactor = Math.pow(1 + inflationRate / 100, year);
    yearlySnapshots.push({
      age: currentAge + year,
      portfolioValue: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(balance - totalContributions),
      inflationAdjustedValue: Math.round(balance / inflFactor),
      phase: "accumulation",
    });
  }

  const projectedBalance = balance;
  const totalGrowth = Math.round(projectedBalance - totalContributions);
  const inflationAtRetirement = Math.pow(1 + inflationRate / 100, accumulationYears);
  const inflationAdjustedBalance = Math.round(projectedBalance / inflationAtRetirement);

  // ── Retirement income calculations ────────────────────────────────────────
  const monthlyRetirementNeed = Math.round(monthlyRetirementGoal * inflationAtRetirement);
  const socialSecurityAdjusted = Math.round(socialSecurityMonthly * inflationAtRetirement);
  const safeMonthlyWithdrawal = Math.round((projectedBalance * 0.04) / 12);
  const portfolioMonthlyIncome = safeMonthlyWithdrawal;
  const totalMonthlyIncome = portfolioMonthlyIncome + socialSecurityAdjusted;
  const monthlyIncomeGap = monthlyRetirementNeed - totalMonthlyIncome;
  const incomeReplacementRate =
    monthlyRetirementNeed > 0
      ? Math.min(200, (totalMonthlyIncome / monthlyRetirementNeed) * 100)
      : 100;

  // ── Drawdown phase ─────────────────────────────────────────────────────────
  // Portfolio withdrawal = goal minus SS, both inflation-growing year by year
  const basePortfolioWithdrawal = Math.max(0, monthlyRetirementNeed - socialSecurityAdjusted);
  let drawdownBalance = projectedBalance;
  let portfolioDepletesAtAge: number | null = null;
  let sustainabilityYears = drawdownYears;

  for (let year = 1; year <= drawdownYears; year++) {
    // Withdrawals grow with inflation each year to maintain purchasing power
    const yearInflMultiplier = Math.pow(1 + inflationRate / 100, year - 1);
    const monthlyWithdrawal = basePortfolioWithdrawal * yearInflMultiplier;

    for (let m = 0; m < 12; m++) {
      drawdownBalance *= 1 + monthlyDrawdownRate;
      drawdownBalance -= monthlyWithdrawal;
      if (drawdownBalance <= 0 && !portfolioDepletesAtAge) {
        drawdownBalance = 0;
        portfolioDepletesAtAge = retirementAge + year;
        sustainabilityYears = year - 1;
      }
    }

    const totalInflFactor = Math.pow(1 + inflationRate / 100, accumulationYears + year);
    yearlySnapshots.push({
      age: retirementAge + year,
      portfolioValue: Math.max(0, Math.round(drawdownBalance)),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(drawdownBalance - totalContributions),
      inflationAdjustedValue: Math.max(0, Math.round(drawdownBalance / totalInflFactor)),
      phase: "retirement",
      monthlyWithdrawal: Math.round(monthlyWithdrawal),
    });
  }

  const portfolioOutlivesExpectancy = portfolioDepletesAtAge === null;

  // ── Readiness score (0–100) ────────────────────────────────────────────────
  // Coverage: how well total income covers the goal (0–70 pts)
  const coverageScore = Math.min(70, (incomeReplacementRate / 100) * 70);
  // Sustainability: does portfolio last through full life expectancy (0–30 pts)
  const sustainabilityRatio = drawdownYears > 0 ? sustainabilityYears / drawdownYears : 1;
  const sustainabilityScore = Math.round(Math.min(30, sustainabilityRatio * 30));
  const readinessScore = Math.min(100, Math.round(coverageScore + sustainabilityScore));

  const readinessLabel =
    readinessScore >= 85 ? "On Track" :
    readinessScore >= 65 ? "Needs Attention" :
    readinessScore >= 40 ? "At Risk" :
    "Critical Gap";

  const readinessColor: RetirementResult["readinessColor"] =
    readinessScore >= 85 ? "emerald" :
    readinessScore >= 65 ? "amber" :
    readinessScore >= 40 ? "orange" :
    "rose";

  // ── Milestones ─────────────────────────────────────────────────────────────
  const MILESTONE_AMOUNTS = [50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000];
  const milestones: RetirementMilestone[] = MILESTONE_AMOUNTS.map((amount) => {
    const snap = yearlySnapshots.find(
      (s) => s.phase === "accumulation" && s.portfolioValue >= amount
    );
    return {
      amount,
      label:
        amount >= 2_000_000 ? "$2M" :
        amount >= 1_000_000 ? "Millionaire" :
        amount >= 500_000   ? "$500k" :
        amount >= 250_000   ? "$250k" :
        amount >= 100_000   ? "$100k" :
        "$50k",
      ageToReach: snap ? snap.age : null,
    };
  });

  return {
    projectedBalance: Math.round(projectedBalance),
    totalContributions: Math.round(totalContributions),
    totalGrowth,
    inflationAdjustedBalance,
    safeMonthlyWithdrawal,
    portfolioMonthlyIncome,
    socialSecurityAdjusted,
    totalMonthlyIncome,
    monthlyRetirementNeed,
    monthlyIncomeGap,
    incomeReplacementRate: Math.round(incomeReplacementRate * 10) / 10,
    sustainabilityYears,
    portfolioDepletesAtAge,
    portfolioOutlivesExpectancy,
    readinessScore,
    readinessLabel,
    readinessColor,
    accumulationYears,
    drawdownYears,
    yearlySnapshots,
    milestones,
  };
}

// ─── What-if scenarios ────────────────────────────────────────────────────────

export const RETIREMENT_SCENARIOS: RetirementScenario[] = [
  {
    label: "Retire later (+5)",
    description: "Work 5 more years before retiring",
    emoji: "⏳",
    mutate: (i) => ({
      ...i,
      retirementAge: Math.min(i.retirementAge + 5, i.lifeExpectancy - 5),
    }),
  },
  {
    label: "+$300/month",
    description: "Save $300 more each month",
    emoji: "💵",
    mutate: (i) => ({ ...i, monthlyContribution: i.monthlyContribution + 300 }),
  },
  {
    label: "+2% return",
    description: "Achieve 2% higher annual returns",
    emoji: "📈",
    mutate: (i) => ({ ...i, annualReturnRate: Math.min(i.annualReturnRate + 2, 15) }),
  },
  {
    label: "Retire earlier (−5)",
    description: "Retire 5 years sooner",
    emoji: "🏖️",
    mutate: (i) => ({
      ...i,
      retirementAge: Math.max(i.retirementAge - 5, i.currentAge + 2),
    }),
  },
  {
    label: "Reduce goal 20%",
    description: "Lower monthly income goal by 20%",
    emoji: "🎯",
    mutate: (i) => ({
      ...i,
      monthlyRetirementGoal: Math.round(i.monthlyRetirementGoal * 0.8),
    }),
  },
];

// ─── Format helpers ───────────────────────────────────────────────────────────

export function fmtRetCurrency(n: number, compact = false): string {
  if (!isFinite(n)) return "—";
  if (compact) {
    if (Math.abs(n) >= 1_000_000) return `$${(Math.abs(n) / 1_000_000).toFixed(2)}M`;
    if (Math.abs(n) >= 1_000) return `$${(Math.abs(n) / 1_000).toFixed(1)}k`;
  }
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fmtRetPct(n: number): string {
  return `${n.toFixed(1)}%`;
}
