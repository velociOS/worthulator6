// ─── US pricing data ──────────────────────────────────────────────────────────
// All US dollar prices live here.
// Updating this file changes costs across all US calculators globally.

export const US_PRICING = {
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
