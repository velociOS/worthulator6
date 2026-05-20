import type { Insight } from "../index";

interface PetCostInputs {
  food:      number;
  vet:       number;
  insurance: number;
  misc:      number;
  years:     number;
}

interface PetCostOutputs {
  yearlyCost?:          number;
  lifetimeCost?:        number;
  monthlyCost?:         number;
  dailyCost?:           number;
  investedAlternative?: number;
}

export function petCostInsights(
  inputs: PetCostInputs,
  outputs: PetCostOutputs
): Insight[] {
  const results: Insight[] = [];

  const food      = Number(inputs.food);
  const vet       = Number(inputs.vet);
  const insurance = Number(inputs.insurance);
  const misc      = Number(inputs.misc);
  const years     = Number(inputs.years);
  const yearly    = outputs.yearlyCost          ?? 0;
  const lifetime  = outputs.lifetimeCost        ?? 0;
  const monthly   = outputs.monthlyCost         ?? 0;
  const daily     = outputs.dailyCost           ?? 0;
  const invested  = outputs.investedAlternative ?? 0;

  // 1. Core daily cost framing — always shown
  results.push({
    id: "pet.daily-cost",
    type: "info",
    message: `Your pet costs $${daily.toFixed(2)}/day — $${monthly.toLocaleString()}/month, $${yearly.toLocaleString()}/year.`,
    detail: `Most people think about pet costs annually. The daily framing makes it feel more concrete and budgetable.`,
  });

  // 2. Lifetime framing
  results.push({
    id: "pet.lifetime-total",
    type: "info",
    message: `Over ${years} years, the total cost of this pet is $${lifetime.toLocaleString()} — a significant long-term commitment alongside the emotional one.`,
    detail: `Understanding lifetime cost before adopting prevents financial stress and helps with emergency fund planning.`,
  });

  // 3. Vet cost realism
  if (vet > 0 && insurance === 0) {
    results.push({
      id: "pet.no-insurance",
      type: "warning",
      message: `No pet insurance budgeted. A single emergency vet visit can cost $2,000–$10,000. Consider whether your emergency fund covers this.`,
      detail: `Pet insurance typically costs $30–$70/month and can cap out-of-pocket vet costs significantly in the event of major illness or accident.`,
    });
  } else if (insurance > 0) {
    results.push({
      id: "pet.insurance-noted",
      type: "positive",
      message: `$${insurance.toLocaleString()}/year in pet insurance provides financial protection against emergency vet bills.`,
      detail: `Pet insurance can pay for itself in a single major incident. The peace of mind and financial predictability are often worth the premium.`,
    });
  }

  // 4. Invested alternative — what it costs vs investing
  if (invested > lifetime) {
    results.push({
      id: "pet.opportunity-cost",
      type: "info",
      message: `Over ${years} years, the $${yearly.toLocaleString()}/year invested at 7% would grow to $${invested.toLocaleString()} — the opportunity cost of pet ownership.`,
      detail: `This doesn't mean pets aren't worth it — the joy and companionship are real. But knowing the number helps with informed financial planning.`,
    });
  }

  // 5. Misc cost check
  if (misc > 500) {
    results.push({
      id: "pet.misc-costs",
      type: "info",
      message: `$${misc.toLocaleString()}/year in grooming, boarding, and accessories. These discretionary costs are the easiest to reduce if budgets tighten.`,
      detail: `Boarding is often the biggest discretionary item. Building a trusted pet-sitting network can reduce this category by 50% or more.`,
    });
  }

  // 6. Monthly budget framing
  results.push({
    id: "pet.monthly-budget",
    type: "info",
    message: `Budget $${monthly.toLocaleString()}/month as a fixed pet line item. Treating it like a bill — not a variable expense — prevents under-budgeting.`,
    detail: `Unexpected vet bills are the #1 source of pet-related financial stress. A dedicated pet fund of 1–2 months of costs provides a meaningful buffer.`,
  });

  return results;
}
