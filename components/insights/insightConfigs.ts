/**
 * ─── Insight Configs ──────────────────────────────────────────────────────────
 * Per-calculator block data for InsightsSection.
 * Each calculator defines its own ordered list of blocks — only the blocks
 * relevant to that calculator are included.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { CALCULATOR_CONFIGS } from "@/components/calculator-engine/calculatorConfigs";

// ── Shared chart types (used by ProjectionBlock) ──────────────────────────────
export type YFormat = "currency" | "months" | "number";

export interface BarEntry {
  key: string;
  label: string;
  color: string;
}

export interface ChartConfig {
  type: "bar" | "line" | "pie";
  title: string;
  data: Record<string, string | number>[];
  xKey: string;
  bars: BarEntry[];
  yFormat?: YFormat;
  stacked?: boolean;
}

export interface TableConfig {
  caption: string;
  headers: string[];
  rows: string[][];
}

// ── Block types ───────────────────────────────────────────────────────────────

export interface HeroInsightBlock {
  type: "hero";
  stat: string;
  label: string;
  subStat?: string;
  accent?: "emerald" | "red" | "amber" | "blue";
}

export interface ComparisonItem {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

export interface ComparisonBlock {
  type: "comparison";
  title?: string;
  left: ComparisonItem;
  right: ComparisonItem;
}

export interface ProjectionBlock {
  type: "projection";
  chart: ChartConfig;
}

export interface BreakdownBlock {
  type: "breakdown";
  items: { label: string; value: string; note?: string }[];
}

export interface ExplanationBlock {
  type: "explanation";
  text: string;
}

export type InsightBlock =
  | HeroInsightBlock
  | ComparisonBlock
  | ProjectionBlock
  | BreakdownBlock
  | ExplanationBlock;

export interface InsightConfig {
  blocks: InsightBlock[];
  table: TableConfig;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtK(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n.toLocaleString()}`;
}

function fmtMo(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m}mo`;
  if (m === 0) return `${y}yr`;
  return `${y}yr ${m}mo`;
}

// ── Configs ───────────────────────────────────────────────────────────────────

export const INSIGHT_CONFIGS: Record<string, InsightConfig> = {

  // ── 401k Calculator ─────────────────────────────────────────────────────────
  "401k-calculator": (() => {
    const c = CALCULATOR_CONFIGS["401k-calculator"];

    // Cost of waiting: start at 25 (40yr) vs start at 35 (30yr)
    const r_early = c.calculate({ current: 0, contribution: 500, match: 50, rate: 7, years: 40 });
    const r_late  = c.calculate({ current: 0, contribution: 500, match: 50, rate: 7, years: 30 });
    const costOfWaiting = Math.round(r_early.balance - r_late.balance);

    // Projection: stacked bar showing where money comes from at each milestone
    const projectionData = [10, 20, 30, 40].map((years) => {
      const r = c.calculate({ current: 0, contribution: 500, match: 50, rate: 7, years });
      return {
        label: `${years}yr`,
        "You":    Math.round(r.contributions),
        "Match":  Math.round(r.matchValue),
        "Growth": Math.max(0, Math.round(r.balance - r.contributions - r.matchValue)),
      };
    });

    // Table
    const tableRows = [200, 500, 750, 1000].map((contribution) => {
      const r20 = c.calculate({ current: 0, contribution, match: 50, rate: 7, years: 20 });
      const r25 = c.calculate({ current: 0, contribution, match: 50, rate: 7, years: 25 });
      const r30 = c.calculate({ current: 0, contribution, match: 50, rate: 7, years: 30 });
      return [`$${contribution}/mo`, fmtK(r20.balance), fmtK(r25.balance), fmtK(r30.balance)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK(costOfWaiting),
          label: "lost by waiting just 10 years to start contributing",
          subStat: "Same $500/month. Same 7% return. Just starting 10 years later.",
          accent: "red",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "Start at 25 vs. start at 35 ($500/mo, 50% match, 7%)",
          left:  { label: "Start at 25", value: fmtK(r_early.balance), note: "40-year horizon", highlight: true },
          right: { label: "Start at 35", value: fmtK(r_late.balance),  note: "30-year horizon" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "Where the money actually comes from ($500/mo, 50% match, 7%)",
            xKey: "label",
            data: projectionData,
            stacked: true,
            bars: [
              { key: "You",    label: "Your contributions", color: "#6366f1" },
              { key: "Match",  label: "Employer match",     color: "#3b82f6" },
              { key: "Growth", label: "Compound growth",    color: "#10b981" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "Those 10 years aren't just 10 extra years of growth — every dollar invested at 25 compounds for 40 years. At 35, it only gets 30. The gap is exponential, not arithmetic.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Projected 401k balance — $0 start, 50% employer match, 7% annual return",
        headers: ["Monthly contribution", "After 20 years", "After 25 years", "After 30 years"],
        rows: tableRows,
      },
    };
  })(),

  // ── Student Loan Calculator ──────────────────────────────────────────────────
  "student-loan-calculator": (() => {
    const c = CALCULATOR_CONFIGS["student-loan-calculator"];

    const r10 = c.calculate({ loan: 35000, rate: 5.5, term: 120 });
    const r20 = c.calculate({ loan: 35000, rate: 5.5, term: 240 });

    const tableRows = [3.5, 5.5, 7.0, 9.0].map((rate) => {
      const a = c.calculate({ loan: 35000, rate, term: 120 });
      const b = c.calculate({ loan: 35000, rate, term: 180 });
      return [`${rate}%`, `$${Math.round(a.payment)}/mo`, fmtK(a.interest), `$${Math.round(b.payment)}/mo`, fmtK(b.interest)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK(Math.round(r20.interest - r10.interest)),
          label: "extra interest from choosing 20 years over 10 on a $35k loan",
          subStat: "Same debt. Same 5.5% rate. Your term choice decides the rest.",
          accent: "red",
        },
        {
          type: "comparison",
          title: "10-year vs 20-year repayment — $35k at 5.5%",
          left:  { label: "10-year term", value: fmtK(Math.round(r10.interest)), note: `$${Math.round(r10.payment)}/mo · done in 10yr`, highlight: true },
          right: { label: "20-year term", value: fmtK(Math.round(r20.interest)), note: `$${Math.round(r20.payment)}/mo · paying for 20yr` },
        },
        {
          type: "explanation",
          text: "The 20-year plan feels safer — lower monthly payments. But you're paying for 120 extra months of interest. By the end you've paid nearly twice as much on top of the original loan.",
        },
      ],
      table: {
        caption: "$35,000 loan — payment and total interest by rate (10yr vs 15yr term)",
        headers: ["Rate", "10yr payment", "10yr interest", "15yr payment", "15yr interest"],
        rows: tableRows,
      },
    };
  })(),

  // ── Credit Card Payoff Calculator ────────────────────────────────────────────
  "credit-card-payoff-calculator": (() => {
    const c = CALCULATOR_CONFIGS["credit-card-payoff-calculator"];

    const r_min = c.calculate({ balance: 5000, apr: 22, payment: 150 });
    const r_opt = c.calculate({ balance: 5000, apr: 22, payment: 300 });

    const tableRows = [150, 200, 300, 400, 600].map((payment) => {
      const r = c.calculate({ balance: 5000, apr: 22, payment });
      return [`$${payment}/mo`, fmtMo(r.months), fmtK(r.interest), fmtK(r.totalPaid)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK(Math.round(r_min.interest)),
          label: "paid in interest on $5k at 22% APR — just from making $150 minimum payments",
          subStat: `${fmtMo(r_min.months)} to clear a $5,000 balance. The bank is patient.`,
          accent: "red",
        },
        {
          type: "comparison",
          title: "$150/month vs $300/month — same $5k balance at 22% APR",
          left:  { label: "$300/month", value: fmtK(Math.round(r_opt.interest)), note: fmtMo(r_opt.months) + " to clear", highlight: true },
          right: { label: "$150/month", value: fmtK(Math.round(r_min.interest)), note: fmtMo(r_min.months) + " to clear" },
        },
        {
          type: "explanation",
          text: "At 22% APR, over a third of every minimum payment vanishes as interest before touching the principal. Doubling your payment doesn't just halve the time — it cuts total interest by far more than half.",
        },
      ],
      table: {
        caption: "$5,000 balance at 22% APR — full payoff comparison by monthly payment",
        headers: ["Monthly payment", "Time to payoff", "Total interest", "Total paid"],
        rows: tableRows,
      },
    };
  })(),

  // ── Latte Factor Calculator ───────────────────────────────────────────────────
  "latte-factor": (() => {
    const c = CALCULATOR_CONFIGS["latte-factor"];

    const r6 = c.calculate({ dailySpend: 6, annualReturn: 7, years: 30 });

    const chartData = [2, 3, 4, 5, 6, 8, 10].map((dailySpend) => {
      const r = c.calculate({ dailySpend, annualReturn: 7, years: 30 });
      return { label: `$${dailySpend}`, value: Math.round(r.investedValue) };
    });

    const tableRows = [2, 3, 5, 6, 8, 10].map((daily) => {
      const r10 = c.calculate({ dailySpend: daily, annualReturn: 7, years: 10 });
      const r20 = c.calculate({ dailySpend: daily, annualReturn: 7, years: 20 });
      const r30 = c.calculate({ dailySpend: daily, annualReturn: 7, years: 30 });
      return [
        `$${daily}/day ($${Math.round(daily * 365).toLocaleString()}/yr)`,
        fmtK(r10.investedValue), fmtK(r20.investedValue), fmtK(r30.investedValue),
      ];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK(Math.round(r6.investedValue)),
          label: "what $6/day grows to if invested at 7% for 30 years",
          subStat: `You only put in ${fmtK(Math.round(r6.totalSpent))} — compound interest adds the rest`,
          accent: "emerald",
        },
        {
          type: "breakdown",
          items: [
            { label: "Total invested",  value: fmtK(Math.round(r6.totalSpent)),    note: "$6 × 365 × 30 years" },
            { label: "Final value",     value: fmtK(Math.round(r6.investedValue)), note: "At 7% annual return" },
            { label: "Compound gain",   value: fmtK(Math.round(r6.growth)),        note: "Return on top of savings" },
          ],
        },
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "30-year invested value by daily habit amount (7% return)",
            xKey: "label",
            data: chartData,
            bars: [{ key: "value", label: "Invested value", color: "#10b981" }],
            yFormat: "currency",
          },
        },
        {
          type: "explanation",
          text: "This isn't about coffee — it's about automatic behaviour. Compound interest turns any recurring habit into a machine, spending or investing. $6/day is $2,190/year, and at 7% for 30 years that becomes over 3× your money.",
        },
      ],
      table: {
        caption: "Invested value at 7% annual return — if spent on habit vs invested instead",
        headers: ["Daily habit", "After 10 years", "After 20 years", "After 30 years"],
        rows: tableRows,
      },
    };
  })(),

  // ── Car Loan Calculator ───────────────────────────────────────────────────────
  "car-loan-calculator": (() => {
    const c = CALCULATOR_CONFIGS["car-loan-calculator"];

    // $28k car, $3k down, $0 trade-in — compare 48 vs 84 months at 7%
    const r48 = c.calculate({ vehiclePrice: 28000, downPayment: 3000, tradeIn: 0, interestRate: 7, termMonths: 48 });
    const r84 = c.calculate({ vehiclePrice: 28000, downPayment: 3000, tradeIn: 0, interestRate: 7, termMonths: 84 });
    const termGap = Math.round((r84.totalInterest as number) - (r48.totalInterest as number));

    // Line chart: total interest vs loan term at 3 APR rates
    const chartData = [24, 36, 48, 60, 72, 84].map((term) => {
      const r5 = c.calculate({ vehiclePrice: 28000, downPayment: 3000, tradeIn: 0, interestRate: 5,  termMonths: term });
      const r7 = c.calculate({ vehiclePrice: 28000, downPayment: 3000, tradeIn: 0, interestRate: 7,  termMonths: term });
      const r9 = c.calculate({ vehiclePrice: 28000, downPayment: 3000, tradeIn: 0, interestRate: 9,  termMonths: term });
      return {
        label: `${term}mo`,
        "5% APR": Math.round(r5.totalInterest as number),
        "7% APR": Math.round(r7.totalInterest as number),
        "9% APR": Math.round(r9.totalInterest as number),
      };
    });

    // Table: monthly payment at different vehicle prices and terms
    const tableRows = [15000, 20000, 28000, 35000, 45000].map((price) => {
      const down = Math.round(price * 0.1);
      const t48 = c.calculate({ vehiclePrice: price, downPayment: down, tradeIn: 0, interestRate: 7, termMonths: 48 });
      const t60 = c.calculate({ vehiclePrice: price, downPayment: down, tradeIn: 0, interestRate: 7, termMonths: 60 });
      const t72 = c.calculate({ vehiclePrice: price, downPayment: down, tradeIn: 0, interestRate: 7, termMonths: 72 });
      return [
        `$${price.toLocaleString()} (10% down)`,
        `$${Math.round(t48.monthlyPayment as number)}/mo`,
        `$${Math.round(t60.monthlyPayment as number)}/mo`,
        `$${Math.round(t72.monthlyPayment as number)}/mo`,
      ];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK(termGap),
          label: "extra interest from choosing 84 months over 48 — same $28k car, same 7% APR",
          subStat: "Same loan. Same rate. Just three extra years of payments to the lender.",
          accent: "red",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "48-month vs 84-month — $28k car, $3k down, 7% APR",
          left:  { label: "48 months", value: fmtK(Math.round(r48.totalInterest as number)), note: `$${Math.round(r48.monthlyPayment as number)}/mo · done in 4 years`, highlight: true },
          right: { label: "84 months", value: fmtK(Math.round(r84.totalInterest as number)), note: `$${Math.round(r84.monthlyPayment as number)}/mo · paying for 7 years` },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "line",
            title: "Total interest paid by loan term — $28k car, $3k down",
            xKey: "label",
            data: chartData,
            bars: [
              { key: "5% APR", label: "5% APR", color: "#10b981" },
              { key: "7% APR", label: "7% APR", color: "#f59e0b" },
              { key: "9% APR", label: "9% APR", color: "#ef4444" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "The monthly savings from a longer term feel real — but the total extra interest is a hidden second payment to the lender. On most car loans, the shortest term you can comfortably manage saves thousands.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Monthly payment by vehicle price and loan term — 10% down, 7% APR",
        headers: ["Vehicle price (10% down)", "48 months", "60 months", "72 months"],
        rows: tableRows,
      },
    };
  })(),

  // ── Budget Calculator ─────────────────────────────────────────────────────────
  "budget-calculator": (() => {
    const c = CALCULATOR_CONFIGS["budget-calculator"];

    // Default $5k take-home budget
    const r = c.calculate({ income: 5000, housing: 1500, food: 600, transport: 400, debt: 300, other: 500 });
    const savings = Math.max(0, Math.round(r.leftover as number));

    // What does saving X% for 20 years at 7% produce?
    const rate = 0.07 / 12;
    const n20 = 240;
    function invested(monthly: number) {
      return Math.round(monthly * ((Math.pow(1 + rate, n20) - 1) / rate));
    }

    // Pie chart: category breakdown of default budget
    const pieData = [
      { name: "Housing",   value: 1500 },
      { name: "Food",      value: 600  },
      { name: "Transport", value: 400  },
      { name: "Debt",      value: 300  },
      { name: "Other",     value: 500  },
      { name: "Savings",   value: savings },
    ];

    // Table: 20-year wealth at different savings rates and incomes
    const tableRows = [3000, 4000, 5000, 7000, 10000].map((income) => {
      const s10 = Math.round(income * 0.10);
      const s20 = Math.round(income * 0.20);
      return [
        `$${income.toLocaleString()}/mo`,
        `$${s10}/mo`,
        fmtK(invested(s10)),
        `$${s20}/mo`,
        fmtK(invested(s20)),
      ];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK(invested(1000)),
          label: "what $1,000/month saved grows to in 20 years at 7% — a 20% savings rate on $5k take-home",
          subStat: `You only deposit ${fmtK(240_000)} — compound interest builds the rest`,
          accent: "emerald",
        } satisfies HeroInsightBlock,
        {
          type: "projection",
          chart: {
            type: "pie",
            title: "Where a $5,000/month take-home goes — default budget breakdown",
            xKey: "name",
            data: pieData,
            bars: [
              { key: "Housing",   label: "Housing",   color: "#6366f1" },
              { key: "Food",      label: "Food",      color: "#3b82f6" },
              { key: "Transport", label: "Transport", color: "#f59e0b" },
              { key: "Debt",      label: "Debt",      color: "#ef4444" },
              { key: "Other",     label: "Other",     color: "#8b5cf6" },
              { key: "Savings",   label: "Savings",   color: "#10b981" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "breakdown",
          items: [
            { label: "10% savings ($500/mo)",  value: fmtK(invested(500)),  note: "After 20 years at 7%" },
            { label: "20% savings ($1k/mo)",   value: fmtK(invested(1000)), note: "After 20 years at 7%" },
            { label: "30% savings ($1.5k/mo)", value: fmtK(invested(1500)), note: "After 20 years at 7%" },
          ],
        } satisfies BreakdownBlock,
        {
          type: "explanation",
          text: "The difference between a 10% and 20% savings rate isn't just double the money — it's double the compound growth engine running in the background. Most people underestimate how fast it compounds because they never see it reflected in daily spending.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "20-year invested value (at 7%) at different savings rates across income levels",
        headers: ["Monthly income", "10% saved/mo", "20yr value (10%)", "20% saved/mo", "20yr value (20%)"],
        rows: tableRows,
      },
    };
  })(),

  // ── BMR Calculator ─────────────────────────────────────────────────────────────
  "bmr-calculator": (() => {
    const c = CALCULATOR_CONFIGS["bmr-calculator"];

    const male30   = c.calculate({ gender: "male",   weight: 75, height: 175, age: 30 });
    const female30 = c.calculate({ gender: "female", weight: 65, height: 165, age: 30 });
    const gap = Math.round((male30.active as number) - (male30.sedentary as number));

    // Bar chart: calorie needs across activity levels for a 30yo male
    const activityData = [
      { label: "BMR (rest)",   Calories: male30.bmr      as number },
      { label: "Sedentary",    Calories: male30.sedentary as number },
      { label: "Moderate",     Calories: male30.moderate  as number },
      { label: "Active",       Calories: male30.active    as number },
      { label: "Very active",  Calories: Math.round((male30.bmr as number) * 1.9) },
    ];

    // Table: BMR and maintenance calories by age
    const tableRows = [20, 25, 30, 40, 50, 60].map((age) => {
      const m = c.calculate({ gender: "male",   weight: 75, height: 175, age });
      const f = c.calculate({ gender: "female", weight: 65, height: 165, age });
      return [
        `${age} years`,
        `${m.bmr} kcal`,
        `${m.moderate} kcal`,
        `${f.bmr} kcal`,
        `${f.moderate} kcal`,
      ];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: `${gap} kcal`,
          label: "more calories burned daily — active lifestyle vs sedentary, same person, same body",
          subStat: "That's ~1 lb of fat per week in extra burn — with zero diet changes",
          accent: "blue",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "Male vs female daily calorie needs — age 30, moderate activity",
          left:  { label: "Male (75 kg, 175 cm)",   value: `${male30.moderate} kcal`,   note: "Moderate activity maintenance", highlight: true },
          right: { label: "Female (65 kg, 165 cm)", value: `${female30.moderate} kcal`, note: "Moderate activity maintenance" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "Daily calorie needs by activity level — male, 30 yr, 75 kg, 175 cm",
            xKey: "label",
            data: activityData,
            bars: [{ key: "Calories", label: "Calories/day", color: "#3b82f6" }],
            yFormat: "number",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "BMR is your floor — the calories your body burns just staying alive. Activity level multiplies it significantly. A genuinely active lifestyle burns 500–800 more calories daily than sedentary, which is nearly a pound of fat per week in extra burn, with no diet change.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "BMR and moderate maintenance calories by age (male: 75 kg, 175 cm | female: 65 kg, 165 cm)",
        headers: ["Age", "Male BMR", "Male moderate TDEE", "Female BMR", "Female moderate TDEE"],
        rows: tableRows,
      },
    };
  })(),

  // ── Calorie Deficit Calculator ────────────────────────────────────────────────
  "calorie-deficit": (() => {
    const c = CALCULATOR_CONFIGS["calorie-deficit"];

    const r05 = c.calculate({ currentWeight: 185, weeklyLossGoal: 0.5 });
    const r1  = c.calculate({ currentWeight: 185, weeklyLossGoal: 1.0 });
    const r2  = c.calculate({ currentWeight: 185, weeklyLossGoal: 2.0 });

    // Grouped bar: weeks to reach 10, 20, 30 lb goals at different rates
    const chartData = [
      {
        label: "10 lbs",
        "0.5 lb/wk": 20,
        "1 lb/wk":   10,
        "1.5 lb/wk": 7,
        "2 lb/wk":   5,
      },
      {
        label: "20 lbs",
        "0.5 lb/wk": 40,
        "1 lb/wk":   20,
        "1.5 lb/wk": 14,
        "2 lb/wk":   10,
      },
      {
        label: "30 lbs",
        "0.5 lb/wk": 60,
        "1 lb/wk":   30,
        "1.5 lb/wk": 20,
        "2 lb/wk":   15,
      },
    ];

    // Table: target calories by starting weight at 1 lb/week goal
    const tableRows = [150, 165, 185, 200, 220].map((weight) => {
      const r = c.calculate({ currentWeight: weight, weeklyLossGoal: 1 });
      return [
        `${weight} lbs`,
        `${r.targetDailyCalories} kcal/day`,
        `${r.dailyDeficit} kcal`,
        `${r.weeksToLose10lbs} weeks`,
      ];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: "15 weeks",
          label: "faster — losing 10 lbs at 2 lb/week vs 0.5 lb/week. Same goal. Wildly different effort.",
          subStat: "A 2 lb/week deficit requires twice the daily restriction — most people can't sustain it",
          accent: "amber",
        } satisfies HeroInsightBlock,
        {
          type: "breakdown",
          items: [
            { label: "0.5 lb/week deficit", value: `${r05.dailyDeficit} kcal/day`, note: `${r05.targetDailyCalories} kcal target` },
            { label: "1 lb/week deficit",   value: `${r1.dailyDeficit} kcal/day`,  note: `${r1.targetDailyCalories} kcal target`  },
            { label: "2 lb/week deficit",   value: `${r2.dailyDeficit} kcal/day`,  note: `${r2.targetDailyCalories} kcal target`  },
          ],
        } satisfies BreakdownBlock,
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "Weeks to reach weight loss goal by rate — 185 lb starting weight",
            xKey: "label",
            data: chartData,
            bars: [
              { key: "0.5 lb/wk", label: "0.5 lb/week", color: "#10b981" },
              { key: "1 lb/wk",   label: "1 lb/week",   color: "#3b82f6" },
              { key: "1.5 lb/wk", label: "1.5 lb/week", color: "#f59e0b" },
              { key: "2 lb/wk",   label: "2 lb/week",   color: "#ef4444" },
            ],
            yFormat: "number",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "Research consistently shows moderate deficits (500–750 kcal/day, ~1–1.5 lb/week) lead to better long-term outcomes than aggressive restriction. Slower loss preserves more muscle mass and is far easier to sustain — and you still reach the goal in weeks, not months.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Daily calorie target at 1 lb/week loss goal — by starting body weight",
        headers: ["Starting weight", "Daily calorie target", "Daily deficit", "Weeks to lose 10 lbs"],
        rows: tableRows,
      },
    };
  })(),

  // ── Subscription Auditor ──────────────────────────────────────────────────────
  "subscription-auditor": (() => {
    const c = CALCULATOR_CONFIGS["subscription-auditor"];

    // Default $150/mo total (streaming 45 + software 30 + fitness 40 + news 15 + other 20)
    const rDefault = c.calculate({ streaming: 45, software: 30, fitness: 40, newsMedia: 15, other: 20 });

    function invested(monthly: number, years: number) {
      const r = 0.07 / 12;
      const n = years * 12;
      return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r));
    }

    // Line chart: growth of invested subscription money over time at different monthly totals
    const lineData = [5, 10, 15, 20, 25, 30].map((years) => ({
      label: `${years}yr`,
      "$50/mo":  invested(50,  years),
      "$100/mo": invested(100, years),
      "$150/mo": invested(150, years),
      "$200/mo": invested(200, years),
    }));

    // Table: annual spend and invested value at different monthly amounts
    const tableRows = [50, 75, 100, 150, 200, 300].map((monthly) => {
      const r = c.calculate({ streaming: monthly * 0.3, software: monthly * 0.2, fitness: monthly * 0.27, newsMedia: monthly * 0.1, other: monthly * 0.13 });
      return [
        `$${monthly}/mo`,
        fmtK(r.annualTotal as number),
        fmtK(r.twentyYearCost as number),
        fmtK(invested(monthly, 10)),
        fmtK(invested(monthly, 20)),
      ];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK(rDefault.investedValue10 as number),
          label: "what $150/month in subscriptions grows to in 10 years — if invested at 7% instead",
          subStat: `The average household spends $${Math.round(rDefault.annualTotal as number)}/yr on subscriptions — ${fmtK(rDefault.twentyYearCost as number)} over 20 years`,
          accent: "amber",
        } satisfies HeroInsightBlock,
        {
          type: "breakdown",
          items: [
            { label: "Monthly total",       value: `$${Math.round(rDefault.monthlyTotal as number)}/mo`, note: "Ongoing cash drain"         },
            { label: "20-year lifetime",    value: fmtK(rDefault.twentyYearCost as number),              note: "If prices never increase"   },
            { label: "Invested instead (10yr)", value: fmtK(rDefault.investedValue10 as number),         note: "Opportunity cost at 7%"    },
          ],
        } satisfies BreakdownBlock,
        {
          type: "projection",
          chart: {
            type: "line",
            title: "Invested value over time — if monthly subscription spend went to markets at 7%",
            xKey: "label",
            data: lineData,
            bars: [
              { key: "$50/mo",  label: "$50/mo",  color: "#10b981" },
              { key: "$100/mo", label: "$100/mo", color: "#3b82f6" },
              { key: "$150/mo", label: "$150/mo", color: "#f59e0b" },
              { key: "$200/mo", label: "$200/mo", color: "#ef4444" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "Subscriptions are engineered to feel invisible — $12.99 is nothing, but 12 of them is $156/month. The real damage isn't the cash; it's the compound interest on every dollar that never got invested. A $150/month subscription habit is a six-figure decision over 20 years.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Subscription cost vs investment opportunity (7% annual return)",
        headers: ["Monthly subscriptions", "Annual spend", "20-year cost", "Invested (10yr)", "Invested (20yr)"],
        rows: tableRows,
      },
    };
  })(),

  // ── Quit Smoking Calculator ───────────────────────────────────────────────────
  "quit-smoking": (() => {
    const c = CALCULATOR_CONFIGS["quit-smoking"];

    const r1_1yr  = c.calculate({ packsPerDay: 1,   packCost: 10, daysSinceQuit: 365  });
    const r2_1yr  = c.calculate({ packsPerDay: 2,   packCost: 10, daysSinceQuit: 365  });
    const fmtM = (v: number) => `$${Math.round(v).toLocaleString()}`;

    const chartData = [
      { label: "1 year",  "0.5 packs": 1825,  "1 pack": 3650,  "1.5 packs": 5475,  "2 packs": 7300  },
      { label: "3 years", "0.5 packs": 5475,  "1 pack": 10950, "1.5 packs": 16425, "2 packs": 21900 },
      { label: "5 years", "0.5 packs": 9125,  "1 pack": 18250, "1.5 packs": 27375, "2 packs": 36500 },
      { label: "10 years","0.5 packs": 18250, "1 pack": 36500, "1.5 packs": 54750, "2 packs": 73000 },
    ];

    const tableRows = [0.5, 1, 1.5, 2].map((packs) => {
      const r1  = c.calculate({ packsPerDay: packs, packCost: 10, daysSinceQuit: 365  });
      const r3  = c.calculate({ packsPerDay: packs, packCost: 10, daysSinceQuit: 1095 });
      const r5  = c.calculate({ packsPerDay: packs, packCost: 10, daysSinceQuit: 1825 });
      const r10 = c.calculate({ packsPerDay: packs, packCost: 10, daysSinceQuit: 3650 });
      return [`${packs} pack${packs !== 1 ? "s" : ""}/day`, fmtM(r1.moneySaved), fmtM(r3.moneySaved), fmtM(r5.moneySaved), fmtM(r10.moneySaved)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: `${Math.round(r1_1yr.daysOfLifeRegained as number)} days`,
          label: "of life regained in a single smoke-free year — at 1 pack/day",
          subStat: `Plus ${fmtM(r1_1yr.moneySaved as number)} in money saved`,
          accent: "emerald",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "1 pack/day vs 2 packs/day — after 1 year smoke-free",
          left:  { label: "1 pack/day",  value: fmtM(r1_1yr.moneySaved as number), note: "56 days of life back", highlight: true },
          right: { label: "2 packs/day", value: fmtM(r2_1yr.moneySaved as number), note: "112 days of life back" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "Money saved by staying smoke-free — $10/pack at different daily habits",
            xKey: "label",
            data: chartData,
            bars: [
              { key: "0.5 packs", label: "0.5 packs/day", color: "#10b981" },
              { key: "1 pack",    label: "1 pack/day",     color: "#3b82f6" },
              { key: "1.5 packs", label: "1.5 packs/day",  color: "#f59e0b" },
              { key: "2 packs",   label: "2 packs/day",    color: "#ef4444" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "The financial case for quitting compounds with time — but the health gains arrive faster. Within 20 minutes of quitting, heart rate drops. Within 12 hours, carbon monoxide normalises. Within a year, heart disease risk is half that of a smoker. The money is just the part you can count.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Money saved since quitting — $10/pack at various pack-per-day habits",
        headers: ["Habit", "1 year", "3 years", "5 years", "10 years"],
        rows: tableRows,
      },
    };
  })(),

  // ── Savings Calculator ────────────────────────────────────────────────────────
  "savings-calculator": (() => {
    const c = CALCULATOR_CONFIGS["savings-calculator"];

    const r3   = c.calculate({ initial: 5000, monthly: 300, rate: 3,   years: 10 });
    const r45  = c.calculate({ initial: 5000, monthly: 300, rate: 4.5, years: 10 });
    const r7   = c.calculate({ initial: 5000, monthly: 300, rate: 7,   years: 10 });
    const fmtK = (v: number) => `$${Math.round(v / 1000)}k`;

    const lineData = [2, 4, 6, 8, 10].map((yr) => {
      const a = c.calculate({ initial: 5000, monthly: 300, rate: 3,   years: yr });
      const b = c.calculate({ initial: 5000, monthly: 300, rate: 4.5, years: yr });
      const cc= c.calculate({ initial: 5000, monthly: 300, rate: 7,   years: yr });
      return { yr: `${yr}yr`, "3%": a.balance, "4.5%": b.balance, "7%": cc.balance };
    });

    const tableRows = [1, 3, 5, 10, 20].map((yr) => {
      const r = c.calculate({ initial: 5000, monthly: 300, rate: 4.5, years: yr });
      return [`${yr} yr`, fmtK(r.totalDeposited as number), fmtK(r.interestEarned as number), fmtK(r.balance as number)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtK((r7.balance as number) - (r3.balance as number)),
          label: "extra — the difference between 3% and 7% on $5k + $300/mo over 10 years",
          subStat: `${fmtK(r3.balance as number)} at 3% → ${fmtK(r7.balance as number)} at 7%`,
          accent: "emerald",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "3% HYSA vs 7% stocks — same $300/mo over 10 years",
          left:  { label: "7% (stocks)",    value: fmtK(r7.balance as number),  note: "Index fund return", highlight: true },
          right: { label: "3% (HYSA floor)", value: fmtK(r3.balance as number), note: "High-yield savings" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "line",
            title: "Savings growth — $5,000 start + $300/month at different interest rates",
            xKey: "yr",
            data: lineData,
            bars: [
              { key: "3%",   label: "3% (HYSA)",  color: "#94a3b8" },
              { key: "4.5%", label: "4.5% (HYSA+)", color: "#3b82f6" },
              { key: "7%",   label: "7% (stocks)", color: "#10b981" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "The gap between 3% and 7% looks small each year, but compounds dramatically. After 20 years, the same deposits at 7% produce nearly double the balance of 3%. The rate you earn matters almost as much as the amount you save — and both are in your control.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Balance over time — $5,000 start + $300/month at 4.5%",
        headers: ["Period", "Total deposited", "Interest earned", "Balance"],
        rows: tableRows,
      },
    };
  })(),

  // ── Savings Goal Calculator ───────────────────────────────────────────────────
  "savings-goal-calculator": (() => {
    const c = CALCULATOR_CONFIGS["savings-goal-calculator"];

    const r0  = c.calculate({ goalAmount: 20000, currentSavings: 2000, years: 3, annualReturn: 0   });
    const r4  = c.calculate({ goalAmount: 20000, currentSavings: 2000, years: 3, annualReturn: 4   });
    const r7  = c.calculate({ goalAmount: 20000, currentSavings: 2000, years: 3, annualReturn: 7   });
    const fmtD = (v: number) => `$${Math.round(v)}/mo`;

    const chartData = [0, 2, 4, 7].map((rate) => {
      const r = c.calculate({ goalAmount: 20000, currentSavings: 2000, years: 3, annualReturn: rate });
      return { rate: `${rate}%`, monthly: Math.round(r.monthlyContribution as number) };
    });

    const tableRows = [1, 2, 3, 5, 10].map((yr) => {
      const r = c.calculate({ goalAmount: 20000, currentSavings: 2000, years: yr, annualReturn: 4 });
      return [`${yr} yr`, fmtD(r.monthlyContribution as number), `$${Math.round(r.interestEarned as number)}`];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: `$${Math.round((r0.monthlyContribution as number) - (r7.monthlyContribution as number))}/mo`,
          label: "saved every month — earning 7% vs 0% to hit $20,000 in 3 years",
          subStat: `${fmtD(r0.monthlyContribution as number)} with no interest → ${fmtD(r7.monthlyContribution as number)} at 7%`,
          accent: "emerald",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "0% (cash under mattress) vs 4% HYSA — $20k goal in 3 years",
          left:  { label: "4% HYSA",  value: fmtD(r4.monthlyContribution as number), note: "Interest does some work", highlight: true },
          right: { label: "0% return", value: fmtD(r0.monthlyContribution as number), note: "Every dollar from you" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "Monthly savings required — $20,000 goal in 3 years at different rates",
            xKey: "rate",
            data: chartData,
            bars: [{ key: "monthly", label: "Monthly needed", color: "#3b82f6" }],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "Even a modest 4% HYSA reduces the monthly burden compared to a zero-interest account. The real power comes from starting early — stretching the timeline from 3 years to 5 years cuts the monthly requirement nearly in half, even at the same rate.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Monthly deposit needed — $20,000 goal at 4% annual return",
        headers: ["Timeline", "Monthly needed", "Interest pays"],
        rows: tableRows,
      },
    };
  })(),

  // ── Inflation Impact Calculator ───────────────────────────────────────────────
  "inflation-impact-calculator": (() => {
    const c = CALCULATOR_CONFIGS["inflation-impact-calculator"];

    const r20_2  = c.calculate({ amount: 10000, rate: 2,   years: 20 });
    const r20_35 = c.calculate({ amount: 10000, rate: 3.5, years: 20 });
    const r20_5  = c.calculate({ amount: 10000, rate: 5,   years: 20 });

    const lineData = [
      { yr: "Today", "2%": 10000, "3.5%": 10000, "5%": 10000, "8%": 10000 },
      { yr: "5yr",   "2%": 9058,  "3.5%": 8420,  "5%": 7835,  "8%": 6806  },
      { yr: "10yr",  "2%": 8203,  "3.5%": 7091,  "5%": 6139,  "8%": 4632  },
      { yr: "20yr",  "2%": 6730,  "3.5%": 5025,  "5%": 3769,  "8%": 2145  },
      { yr: "30yr",  "2%": 5521,  "3.5%": 3563,  "5%": 2314,  "8%": 994   },
    ];

    const tableRows = [5, 10, 15, 20, 30].map((yr) => {
      const r = c.calculate({ amount: 10000, rate: 3.5, years: yr });
      return [`${yr} years`, `$${(r.futureValue as number).toLocaleString()}`, `$${(r.loss as number).toLocaleString()}`, `${r.lossPercent}%`];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: `$${(r20_35.futureValue as number).toLocaleString()}`,
          label: "what $10,000 buys in 20 years — at 3.5% average inflation",
          subStat: `$${(r20_35.loss as number).toLocaleString()} of purchasing power silently destroyed`,
          accent: "red",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "$10,000 today — purchasing power in 20 years",
          left:  { label: "2% (target rate)", value: `$${(r20_2.futureValue as number).toLocaleString()}`,  note: "Fed's ideal target", highlight: true },
          right: { label: "5% (recent avg)",  value: `$${(r20_5.futureValue as number).toLocaleString()}`,  note: "2021–2024 average" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "line",
            title: "Purchasing power of $10,000 over 30 years — at different inflation rates",
            xKey: "yr",
            data: lineData,
            bars: [
              { key: "2%",   label: "2% inflation",   color: "#10b981" },
              { key: "3.5%", label: "3.5% inflation",  color: "#3b82f6" },
              { key: "5%",   label: "5% inflation",    color: "#f59e0b" },
              { key: "8%",   label: "8% inflation",    color: "#ef4444" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "Inflation is a silent tax. Money sitting in a 0.5% savings account during a 3.5% inflation period loses roughly 3% of its real value every year — half its purchasing power in under 25 years. Matching inflation requires at least a high-yield savings account; beating it requires investing.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Purchasing power of $10,000 over time — at 3.5% annual inflation",
        headers: ["Years", "Buying power", "Value lost", "Eroded"],
        rows: tableRows,
      },
    };
  })(),

  // ── Millionaire Calculator ────────────────────────────────────────────────────
  "millionaire-calculator": (() => {
    const c = CALCULATOR_CONFIGS["millionaire-calculator"];

    const r500  = c.calculate({ currentSavings: 10000, monthlySavings: 500,  annualReturn: 7 });
    const r1000 = c.calculate({ currentSavings: 10000, monthlySavings: 1000, annualReturn: 7 });
    const fmtYr = (v: number) => `${Math.round(v)} yrs`;

    const chartData = [200, 500, 1000, 2000].map((mo) => {
      const r = c.calculate({ currentSavings: 10000, monthlySavings: mo, annualReturn: 7 });
      return { label: `$${mo}/mo`, years: Math.round(r.yearsToMillion as number) };
    });

    const tableRows = [200, 500, 1000, 2000].map((mo) => {
      const r = c.calculate({ currentSavings: 10000, monthlySavings: mo, annualReturn: 7 });
      return [
        `$${mo}/mo`,
        fmtYr(r.yearsToMillion as number),
        `$${(r.totalContributed as number).toLocaleString()}`,
        `$${(r.interestEarned as number).toLocaleString()}`,
      ];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: `${Math.round((r500.yearsToMillion as number) - (r1000.yearsToMillion as number))} years`,
          label: "shaved off the path to $1 million — just by doubling from $500/mo to $1,000/mo",
          subStat: `${fmtYr(r500.yearsToMillion as number)} at $500/mo → ${fmtYr(r1000.yearsToMillion as number)} at $1,000/mo`,
          accent: "emerald",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "$500/mo vs $1,000/mo at 7% — years to $1 million",
          left:  { label: "$1,000/mo", value: fmtYr(r1000.yearsToMillion as number), note: "Reach $1M faster",  highlight: true },
          right: { label: "$500/mo",   value: fmtYr(r500.yearsToMillion as number),  note: "Market does the work" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "Years to $1,000,000 — $10k starting, 7% annual return",
            xKey: "label",
            data: chartData,
            bars: [{ key: "years", label: "Years to $1M", color: "#10b981" }],
            yFormat: "number",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "At $500/month and 7%, you personally deposit around $200k to reach $1 million — the market contributes the other $800k. The counterintuitive truth: consistency matters more than the exact amount. Starting with $200/month beats waiting until you can afford $500/month.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Road to $1M — $10,000 starting investment at 7% annual return",
        headers: ["Monthly investment", "Years to $1M", "You contribute", "Market contributes"],
        rows: tableRows,
      },
    };
  })(),

  // ── FIRE Calculator ───────────────────────────────────────────────────────────
  "fire-calculator": (() => {
    const c = CALCULATOR_CONFIGS["fire-calculator"];

    const r2k = c.calculate({ monthlyExpenses: 4000, currentSavings: 50000, monthlySavings: 2000, annualReturn: 7 });
    const r3k = c.calculate({ monthlyExpenses: 4000, currentSavings: 50000, monthlySavings: 3000, annualReturn: 7 });
    const fmtYr = (v: number) => `${Math.round(v as number)} yrs`;

    const chartData = [1000, 2000, 3000, 5000].map((mo) => {
      const r = c.calculate({ monthlyExpenses: 4000, currentSavings: 50000, monthlySavings: mo, annualReturn: 7 });
      return { label: `$${mo}/mo`, years: Math.round(r.yearsToFire as number) };
    });

    const tableRows = [3000, 4000, 5000, 6000].map((exp) => {
      const fireNum = exp * 12 * 25;
      const r = c.calculate({ monthlyExpenses: exp, currentSavings: 50000, monthlySavings: 2000, annualReturn: 7 });
      return [`$${exp.toLocaleString()}/mo`, `$${fireNum.toLocaleString()}`, fmtYr(r.yearsToFire as number)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: `$${((r2k.fireNumber as number) / 1000).toFixed(0)}k`,
          label: "FIRE number — 25× annual expenses at $4,000/month spending",
          subStat: `Reach it in ${fmtYr(r2k.yearsToFire as number)} saving $2,000/month at 7%`,
          accent: "amber",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "$2,000/mo vs $3,000/mo saved — years to FIRE at $4k/mo expenses",
          left:  { label: "$3,000/mo saved", value: fmtYr(r3k.yearsToFire as number), note: "Faster path",      highlight: true },
          right: { label: "$2,000/mo saved", value: fmtYr(r2k.yearsToFire as number), note: "Standard savings" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "bar",
            title: "Years to FIRE — $4,000/mo expenses, $50k starting, 7% return",
            xKey: "label",
            data: chartData,
            bars: [{ key: "years", label: "Years to FIRE", color: "#f59e0b" }],
            yFormat: "number",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "The 4% rule is the engine: spend 4% of your portfolio per year and it historically lasts 30+ years. Every $500/month cut from expenses reduces your FIRE number by $150,000 and speeds up your timeline twice — you need less AND accumulate faster. Frugality is leverage.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "FIRE number and timeline by monthly expense level — $50k starting, $2k/mo savings, 7%",
        headers: ["Monthly expenses", "FIRE number", "Years to FIRE"],
        rows: tableRows,
      },
    };
  })(),

  // ── WFH Savings Calculator ────────────────────────────────────────────────────
  "wfh-savings-calculator": (() => {
    const c = CALCULATOR_CONFIGS["wfh-savings-calculator"];

    const r3day = c.calculate({ dailyCommuteCost: 15, officeDays: 3, dailyFood: 18, commuteMinutes: 45 });
    const r5day = c.calculate({ dailyCommuteCost: 15, officeDays: 5, dailyFood: 18, commuteMinutes: 45 });
    const fmtK  = (v: number) => `$${Math.round(v / 1000)}k`;
    const fmtM  = (v: number) => `$${Math.round(v).toLocaleString()}`;

    const pieData = [
      { name: "Food & coffee saved", value: Math.round(18 * 3 * 52) },
      { name: "Commute costs saved", value: Math.round(15 * 3 * 52) },
    ];

    const tableRows = [1, 3, 5, 10].map((yr) => {
      const annual = r3day.yearlySavings as number;
      const fv = annual * ((Math.pow(1.07, yr) - 1) / 0.07);
      return [`${yr} year${yr > 1 ? "s" : ""}`, fmtM(annual * yr), fmtK(fv)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: `${r3day.timeSavedHours} hrs`,
          label: "reclaimed per year — commute time back in your life at 3 days WFH, 45-min commute",
          subStat: `Plus ${fmtM(r3day.yearlySavings as number)}/yr in real cash savings`,
          accent: "blue",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "3 days WFH vs full remote — annual savings difference",
          left:  { label: "Fully remote",  value: fmtM(r5day.yearlySavings as number), note: "5 days/wk saved",  highlight: true },
          right: { label: "3 days WFH",    value: fmtM(r3day.yearlySavings as number), note: "Hybrid schedule" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "pie",
            title: "Where the WFH savings come from — 3 days/week, $15 commute + $18 food",
            xKey: "name",
            data: pieData,
            bars: [
              { key: "Food & coffee saved", label: "Food & coffee saved", color: "#3b82f6" },
              { key: "Commute costs saved", label: "Commute costs saved", color: "#10b981" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "WFH savings aren't just what you spend less — they're also time returned. At a conservative $35/hr, 700 hours of annual commute time reclaimed is worth over $24,000 in real life value. Hybrid workers often underestimate this because the hours disappear invisibly rather than as a line item.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "WFH savings over time — if invested at 7% annual return (3 days/wk)",
        headers: ["Period", "Total cash saved", "If invested at 7%"],
        rows: tableRows,
      },
    };
  })(),

  // ── EV vs Gas Calculator ──────────────────────────────────────────────────────
  "ev-vs-gas": (() => {
    const c = CALCULATOR_CONFIGS["ev-vs-gas"];

    const rLow  = c.calculate({ milesPerYear: 12000, mpg: 20, gasPrice: 3.5, kwhPer100mi: 30, electricRate: 0.15 });
    const rMid  = c.calculate({ milesPerYear: 12000, mpg: 28, gasPrice: 3.5, kwhPer100mi: 30, electricRate: 0.15 });
    const rHigh = c.calculate({ milesPerYear: 12000, mpg: 45, gasPrice: 3.5, kwhPer100mi: 30, electricRate: 0.15 });
    const fmtM  = (v: number) => `$${Math.round(v).toLocaleString()}`;

    const lineData = [1, 3, 5, 7, 10].map((yr) => ({
      yr: `${yr}yr`,
      "20 MPG": Math.round((rLow.annualSavings  as number) * yr),
      "28 MPG": Math.round((rMid.annualSavings  as number) * yr),
      "35 MPG": Math.round(c.calculate({ milesPerYear: 12000, mpg: 35, gasPrice: 3.5, kwhPer100mi: 30, electricRate: 0.15 }).annualSavings as number * yr),
      "45 MPG": Math.round((rHigh.annualSavings as number) * yr),
    }));

    const tableRows = [15, 20, 28, 35, 45].map((mpg) => {
      const r = c.calculate({ milesPerYear: 12000, mpg, gasPrice: 3.5, kwhPer100mi: 30, electricRate: 0.15 });
      return [`${mpg} MPG`, fmtM(r.annualGasCost as number), fmtM(r.annualEvCost as number), fmtM(r.annualSavings as number)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: fmtM(rMid.annualSavings as number),
          label: "annual EV fuel savings — 12,000 miles, 28 MPG gas car, $3.50/gal",
          subStat: `vs ${fmtM(rLow.annualSavings as number)}/yr replacing a 20 MPG vehicle`,
          accent: "emerald",
        } satisfies HeroInsightBlock,
        {
          type: "comparison",
          title: "EV savings: replacing a truck (20 MPG) vs replacing a hybrid (45 MPG)",
          left:  { label: "vs 20 MPG truck",  value: fmtM(rLow.annualSavings  as number), note: "Best case for EV", highlight: true },
          right: { label: "vs 45 MPG hybrid", value: fmtM(rHigh.annualSavings as number), note: "Smaller advantage" },
        } satisfies ComparisonBlock,
        {
          type: "projection",
          chart: {
            type: "line",
            title: "Cumulative EV fuel savings over time — 12,000 mi/yr, $3.50/gal, 30 kWh/100mi",
            xKey: "yr",
            data: lineData,
            bars: [
              { key: "20 MPG", label: "vs 20 MPG",  color: "#ef4444" },
              { key: "28 MPG", label: "vs 28 MPG",  color: "#f59e0b" },
              { key: "35 MPG", label: "vs 35 MPG",  color: "#3b82f6" },
              { key: "45 MPG", label: "vs 45 MPG",  color: "#10b981" },
            ],
            yFormat: "currency",
          },
        } satisfies ProjectionBlock,
        {
          type: "explanation",
          text: "The EV savings case is strongest when replacing a low-MPG vehicle. A truck owner switching to an EV saves 3–4× more on fuel than a Prius driver making the same switch. At $3.50/gal and average US driving, the annual savings typically fall between $400 and $1,600 — before factoring in maintenance, which tilts further in the EV's favour.",
        } satisfies ExplanationBlock,
      ],
      table: {
        caption: "Annual EV fuel savings by gas car MPG — 12,000 mi/yr, $3.50/gal, 30 kWh/100mi at $0.15/kWh",
        headers: ["Gas car MPG", "Annual gas cost", "Annual EV cost", "Annual savings"],
        rows: tableRows,
      },
    };
  })(),

  // ── Side Hustle Calculator ────────────────────────────────────────────────────
  "side-hustle-calculator": (() => {
    const c = CALCULATOR_CONFIGS["side-hustle-calculator"];

    // Rate lever: $50/hr at 10hr vs $25/hr at 10hr
    const r_50_10 = c.calculate({ hoursPerWeek: 10, rate: 50, expensePct: 15, taxRate: 25 });
    const r_25_10 = c.calculate({ hoursPerWeek: 10, rate: 25, expensePct: 15, taxRate: 25 });
    // Hours lever: $25/hr at 20hr (same income as $50/hr at 10hr)
    const r_25_20 = c.calculate({ hoursPerWeek: 20, rate: 25, expensePct: 15, taxRate: 25 });

    const tableRows = [25, 35, 50, 75].map((rate) => {
      const h5  = c.calculate({ hoursPerWeek: 5,  rate, expensePct: 15, taxRate: 25 });
      const h10 = c.calculate({ hoursPerWeek: 10, rate, expensePct: 15, taxRate: 25 });
      const h20 = c.calculate({ hoursPerWeek: 20, rate, expensePct: 15, taxRate: 25 });
      return [`$${rate}/hr`, fmtK(h5.netMonthly), fmtK(h10.netMonthly), fmtK(h20.netMonthly)];
    });

    return {
      blocks: [
        {
          type: "hero",
          stat: "2×",
          label: "more monthly income — same 10 hours, just a higher rate",
          subStat: `$${Math.round(r_25_10.netMonthly)}/mo at $25/hr → $${Math.round(r_50_10.netMonthly)}/mo at $50/hr`,
          accent: "emerald",
        },
        {
          type: "comparison",
          title: "Rate vs hours — which lever actually matters",
          left:  { label: "$50/hr · 10hrs/wk", value: fmtK(Math.round(r_50_10.netMonthly)), note: "Raise your rate", highlight: true },
          right: { label: "$25/hr · 20hrs/wk", value: fmtK(Math.round(r_25_20.netMonthly)), note: "Work twice as hard" },
        },
        {
          type: "explanation",
          text: "Most freelancers grind for more hours when income feels low. But rate is the highest-leverage variable — it scales instantly with zero extra time. The same monthly take-home at half the hours.",
        },
      ],
      table: {
        caption: "Monthly net income — 15% expenses, 25% self-employment tax",
        headers: ["Hourly rate", "5 hrs/week", "10 hrs/week", "20 hrs/week"],
        rows: tableRows,
      },
    };
  })(),
};
