// ─── UK construction pricing data ────────────────────────────────────────────
// All GBP prices for construction calculators live here.
// Updating this file changes costs across all UK construction calculators globally.

export const UK_CONSTRUCTION_PRICING = {
  /** £ per cubic metre — bag-mix equivalent for cost estimates */
  concreteBagPerM3: 120,

  /** Ready-mix truck cost range (used in callout copy) */
  readyMixLowPerM3: 90,
  readyMixHighPerM3: 160,

  /** Concrete volume/ready-mix rate */
  concreteVolumePerM3: 120,

  /** Gravel: £ per metric tonne */
  gravelPerTonne: 45,
} as const;
