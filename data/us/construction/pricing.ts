// ─── US construction pricing data ────────────────────────────────────────────
// All US dollar prices for construction calculators live here.
// Updating this file changes costs across all US construction calculators globally.

export const US_CONSTRUCTION_PRICING = {
  /** $ per cubic yard — bag-mix equivalent for cost estimates */
  concreteBagPerCuYd: 150,

  /** Ready-mix truck cost range (used in callout copy) */
  readyMixLowPerCuYd: 120,
  readyMixHighPerCuYd: 200,

  /** Concrete volume/ready-mix rate */
  concreteVolumePerCuYd: 150,

  /** Gravel: $ per short ton */
  gravelPerShortTon: 40,
} as const;
