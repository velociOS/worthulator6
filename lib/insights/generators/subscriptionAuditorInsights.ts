import type { Insight } from "../index";

interface SubscriptionInputs {
  streaming: number;
  software:  number;
  fitness:   number;
  newsMedia: number;
  other:     number;
}

interface SubscriptionOutputs {
  monthlyTotal?:   number;
  annualTotal?:    number;
  twentyYearCost?: number;
  investedValue10?: number;
  investedValue20?: number;
  dailyCost?:      number;
}

export function subscriptionAuditorInsights(
  inputs: SubscriptionInputs,
  outputs: SubscriptionOutputs
): Insight[] {
  const results: Insight[] = [];

  const streaming  = Number(inputs.streaming);
  const software   = Number(inputs.software);
  const fitness    = Number(inputs.fitness);
  const monthly    = outputs.monthlyTotal    ?? 0;
  const annual     = outputs.annualTotal     ?? 0;
  const twenty     = outputs.twentyYearCost  ?? 0;
  const inv10      = outputs.investedValue10 ?? 0;
  const inv20      = outputs.investedValue20 ?? 0;
  const daily      = outputs.dailyCost       ?? 0;

  // 1. Daily cost framing — always shown
  results.push({
    id: "subs.daily-cost",
    type: "info",
    message: `$${monthly.toFixed(0)}/month in subscriptions = $${daily.toFixed(2)}/day — money leaving your account every single day, including when you don't use them.`,
    detail: `Many subscriptions go unused for months. The average household actively uses fewer than half of their subscriptions.`,
  });

  // 2. Annual total as a "bill" reframe
  if (annual > 500) {
    results.push({
      id: "subs.annual-bill",
      type: "warning",
      message: `Your annual subscription bill is $${annual.toLocaleString()} — that's a significant recurring expense most people never see itemised.`,
      detail: `Auditing annually and cancelling just 20% of subscriptions would save $${Math.round(annual * 0.2).toLocaleString()}/year.`,
    });
  }

  // 3. 10-year investment opportunity
  if (inv10 > annual * 5) {
    results.push({
      id: "subs.invest-10yr",
      type: "opportunity",
      message: `Invested at 7% instead of spent, $${monthly.toFixed(0)}/month becomes $${Math.round(inv10).toLocaleString()} over 10 years.`,
      detail: `You don't need to cut all subscriptions — but finding $30–50/month to redirect could compound to $50,000+ over a decade.`,
    });
  }

  // 4. 20-year compound framing
  if (inv20 > 100_000) {
    results.push({
      id: "subs.invest-20yr",
      type: "milestone",
      message: `Over 20 years at 7%, your $${monthly.toFixed(0)}/month subscription spend would be worth $${inv20.toLocaleString()} — if invested instead.`,
      detail: `That's the compound cost of subscription creep. Each new subscription adds to a number that snowballs quietly in the background.`,
    });
  }

  // 5. Fitness/wellness check (common unused category)
  if (fitness > 50) {
    results.push({
      id: "subs.fitness-audit",
      type: "info",
      message: `$${fitness}/month on fitness and wellness. If you use it actively, it's great value. If not, it's one of the most commonly cancelled categories.`,
      detail: `Fitness subscriptions are the #1 cancelled category after annual billing cycles. Track actual usage before the next renewal date.`,
    });
  }

  // 6. Software creep
  if (software > 40) {
    results.push({
      id: "subs.software-creep",
      type: "info",
      message: `$${software}/month on software and apps. Check for free-tier alternatives or annual billing discounts — most SaaS tools offer 15–25% off annually.`,
      detail: `Annual billing converts $${software}/month to ~$${Math.round(software * 12 * 0.8).toLocaleString()}/year with a 20% discount — saving $${Math.round(software * 12 * 0.2).toLocaleString()}/year without cancelling anything.`,
    });
  }

  return results;
}
