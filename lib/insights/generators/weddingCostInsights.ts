import type { Insight } from "../index";

interface WeddingCostInputs {
  guests:        number;
  costPerGuest:  number;
  venue:         number;
  photography:   number;
  misc:          number;
}

interface WeddingCostOutputs {
  total?:               number;
  allInPerGuest?:       number;
  cateringTotal?:       number;
  nonCateringTotal?:    number;
  investedAlternative?: number;
}

export function weddingCostInsights(
  inputs: WeddingCostInputs,
  outputs: WeddingCostOutputs
): Insight[] {
  const results: Insight[] = [];

  const guests        = Number(inputs.guests);
  const costPerGuest  = Number(inputs.costPerGuest);
  const venue         = Number(inputs.venue);
  const photography   = Number(inputs.photography);
  const total         = outputs.total               ?? 0;
  const perGuest      = outputs.allInPerGuest       ?? 0;
  const catering      = outputs.cateringTotal       ?? 0;
  const nonCatering   = outputs.nonCateringTotal    ?? 0;
  const invested      = outputs.investedAlternative ?? 0;

  const NATIONAL_AVG = 30_000;
  const cateringPct  = total > 0 ? Math.round((catering / total) * 100) : 0;

  // 1. Per-guest total framing — always shown
  results.push({
    id: "wedding.per-guest",
    type: "info",
    message: `With ${guests} guests, the all-in cost per person is $${perGuest.toLocaleString()} — the most efficient lens for evaluating trade-offs.`,
    detail: `Reducing the guest list is the highest-leverage budget lever: cutting 20 guests saves $${Math.round(perGuest * 20).toLocaleString()} at your current per-head cost.`,
  });

  // 2. Catering vs fixed cost split
  results.push({
    id: "wedding.catering-split",
    type: "info",
    message: `Catering makes up ${cateringPct}% of your total ($${catering.toLocaleString()} vs $${nonCatering.toLocaleString()} in fixed costs). ${cateringPct > 50 ? "Guest list size is your #1 budget lever." : "Fixed costs dominate — venue negotiations will have the most impact."}`,
    detail: `Understanding the catering-to-fixed ratio shows where to negotiate. High catering % = reduce guests; high fixed % = shop venues aggressively.`,
  });

  // 3. Venue as % of total
  const venuePct = total > 0 ? Math.round((venue / total) * 100) : 0;
  if (venuePct > 30) {
    results.push({
      id: "wedding.venue-heavy",
      type: "warning",
      message: `Venue costs represent ${venuePct}% of your total budget at $${venue.toLocaleString()}. This is above typical 20–25% guidelines.`,
      detail: `Off-peak dates (Fridays, Sundays, January–March) can reduce venue costs by 20–40% without changing the experience meaningfully.`,
    });
  }

  // 4. National average comparison
  if (total < NATIONAL_AVG) {
    results.push({
      id: "wedding.below-average",
      type: "positive",
      message: `At $${total.toLocaleString()}, you're $${(NATIONAL_AVG - total).toLocaleString()} below the US national average of $${NATIONAL_AVG.toLocaleString()} — keeping more wealth-building capital intact.`,
      detail: `The national average includes premium markets. A beautiful wedding is entirely achievable at $15,000–$20,000 with intentional prioritisation.`,
    });
  } else {
    results.push({
      id: "wedding.above-average",
      type: "info",
      message: `At $${total.toLocaleString()}, you're $${(total - NATIONAL_AVG).toLocaleString()} above the US national average wedding cost of $${NATIONAL_AVG.toLocaleString()}.`,
      detail: `There's no right or wrong number — but identifying which line items matter most to you can create meaningful room to redirect funds toward your future together.`,
    });
  }

  // 5. 5-year invested alternative
  if (invested > total * 1.1) {
    results.push({
      id: "wedding.invested-alternative",
      type: "opportunity",
      message: `$${total.toLocaleString()} invested instead would grow to $${invested.toLocaleString()} in 5 years at 7% — a house deposit or early retirement contribution.`,
      detail: `This isn't a case against celebrating — it's context for how significant the financial trade-off is, and why alignment on spending is essential before the big day.`,
    });
  }

  // 6. Photography value check
  const photoPct = total > 0 ? Math.round((photography / total) * 100) : 0;
  if (photoPct > 0 && photoPct < 10) {
    results.push({
      id: "wedding.photo-underweight",
      type: "info",
      message: `Photography is ${photoPct}% of your budget at $${photography.toLocaleString()}. Many couples say it's the one line item they'd increase in hindsight — it's the only thing that lasts.`,
      detail: `The venue, food, and flowers are experienced once. Photography is experienced every anniversary for decades. It tends to be under-weighted relative to its long-term value.`,
    });
  }

  return results;
}
