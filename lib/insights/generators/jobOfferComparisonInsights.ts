import type { Insight } from "../index";

interface JobOfferInputs {
  salaryA:        number;
  salaryB:        number;
  commuteCostA:   number;
  commuteCostB:   number;
  benefitsValueA: number;
  benefitsValueB: number;
}

interface JobOfferOutputs {
  effectiveA?:  number;
  effectiveB?:  number;
  difference?:  number;
  monthlyGap?:  number;
  fiveYearGap?: number;
  tenYearGap?:  number;
  benefitsGap?: number;
  commuteGap?:  number;
}

export function jobOfferComparisonInsights(
  inputs: JobOfferInputs,
  outputs: JobOfferOutputs
): Insight[] {
  const results: Insight[] = [];

  const effA      = outputs.effectiveA  ?? 0;
  const effB      = outputs.effectiveB  ?? 0;
  const diff      = outputs.difference  ?? 0;
  const monthly   = outputs.monthlyGap  ?? 0;
  const fiveYr    = outputs.fiveYearGap ?? 0;
  const tenYr     = outputs.tenYearGap  ?? 0;
  const benGap    = outputs.benefitsGap ?? 0;
  const commGap   = outputs.commuteGap  ?? 0;
  const salaryA   = Number(inputs.salaryA);
  const salaryB   = Number(inputs.salaryB);
  const absDiff   = Math.abs(diff);
  const winner    = diff >= 0 ? "A" : "B";
  const loser     = diff >= 0 ? "B" : "A";

  // 1. Headline result (always shown)
  if (absDiff < 1000) {
    results.push({
      id: "job.effectively-tied",
      type: "info",
      message: `These offers are effectively equal in total compensation — within $${absDiff.toLocaleString()}/year of each other.`,
      detail: `At this level of parity, non-financial factors — culture, growth path, flexibility, manager quality — should drive the decision.`,
    });
  } else {
    results.push({
      id: "job.winner",
      type: "milestone",
      message: `Job ${winner} is worth $${absDiff.toLocaleString()} more per year — $${Math.abs(monthly).toLocaleString()}/month more in effective take-home.`,
      detail: `Effective compensation includes salary + benefits value minus commute cost. The headline salary on Job ${loser} is misleading.`,
    });
  }

  // 2. Five-year and ten-year compounding gap
  if (absDiff >= 2000) {
    results.push({
      id: "job.multi-year-gap",
      type: "warning",
      message: `Over 5 years, that gap is $${Math.abs(fiveYr).toLocaleString()}. Over 10 years: $${Math.abs(tenYr).toLocaleString()}.`,
      detail: `And that's before investing the difference. If the extra $${Math.abs(monthly).toLocaleString()}/month is invested at 7%, the 10-year wealth gap widens further.`,
    });
  }

  // 3. Benefits are the hidden differentiator
  const absBenGap = Math.abs(benGap);
  if (absBenGap >= 2000) {
    const benWinner = benGap >= 0 ? "A" : "B";
    results.push({
      id: "job.benefits-gap",
      type: "info",
      message: `Job ${benWinner} has $${absBenGap.toLocaleString()}/year more in benefits — health, 401k match, or equity that doesn't show in the salary line.`,
      detail: `Benefits are often worth 20–30% of salary. A $5,000 better health plan or employer 401k match is real compensation that should be counted.`,
    });
  }

  // 4. Commute cost is hidden salary reduction
  const absCommGap = Math.abs(commGap);
  if (absCommGap >= 1000) {
    const commWinner = commGap >= 0 ? "B" : "A"; // higher commute cost for A means B wins
    results.push({
      id: "job.commute-tax",
      type: "info",
      message: `The commute difference is $${absCommGap.toLocaleString()}/year — a hidden salary reduction that never appears in the offer letter.`,
      detail: `Job ${commWinner} has the commute advantage. That's money back in your pocket plus time — commute cost is taxed, unpaid, and unreimbursed.`,
    });
  }

  // 5. Salary vs effective comp divergence
  const salaryDiff = salaryB - salaryA;
  if (salaryDiff > 0 && diff > 0) {
    // Job A has lower salary but wins on effective comp
    results.push({
      id: "job.salary-deception",
      type: "warning",
      message: `Job B pays $${Math.abs(salaryDiff).toLocaleString()} more in salary — but Job A is worth more once benefits and commute are factored in.`,
      detail: `The salary headline is not the number that matters. Effective total compensation is what actually affects your life.`,
    });
  } else if (salaryDiff < 0 && diff < 0) {
    results.push({
      id: "job.salary-deception",
      type: "warning",
      message: `Job A pays $${Math.abs(salaryDiff).toLocaleString()} more in salary — but Job B is worth more on effective compensation.`,
      detail: `Benefits and lower commute costs can make the lower-salary job the better financial choice.`,
    });
  }

  return results;
}
