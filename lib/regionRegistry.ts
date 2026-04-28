/**
 * Region registry — maps every US calculator path to its UK counterpart.
 *
 * To add a new calculator with a UK version:
 * 1. Create the UK page at /tools/<slug>-uk/page.tsx
 * 2. Add an entry to REGION_REGISTRY below
 * 3. The header toggle and RegionToggle will automatically handle navigation
 */

export interface RegionPair {
  /** Full pathname of the US version */
  us: string;
  /** Full pathname of the UK version */
  uk: string;
}

export const REGION_REGISTRY: RegionPair[] = [
  {
    us: "/construction-calculators/concrete-calculator",
    uk: "/construction-calculators/concrete-calculator-uk",
  },
  {
    us: "/construction-calculators/concrete/concrete-bag-calculator",
    uk: "/construction-calculators/concrete/concrete-bag-calculator-uk",
  },
  {
    us: "/construction-calculators/concrete/concrete-block-calculator",
    uk: "/construction-calculators/concrete/concrete-block-calculator-uk",
  },
  {
    us: "/tools/pi-calculator",
    uk: "/tools/personal-injury-calculator-uk",
  },
  {
    us: "/tools/hourly-to-salary-calculator",
    uk: "/tools/hourly-to-salary-calculator-uk",
  },
  {
    us: "/tools/overtime-pay-calculator",
    uk: "/tools/overtime-pay-calculator-uk",
  },
  {
    us: "/tools/take-home-pay-calculator",
    uk: "/tools/take-home-pay-calculator-uk",
  },
];

/** Returns the RegionPair whose us or uk path matches the current pathname. */
export function getRegionPair(pathname: string): RegionPair | null {
  return (
    REGION_REGISTRY.find(
      (pair) =>
        pathname === pair.us ||
        pathname.startsWith(pair.us + "/") ||
        pathname === pair.uk ||
        pathname.startsWith(pair.uk + "/"),
    ) ?? null
  );
}

/** Returns "us" | "uk" | null for a given pathname. */
export function detectRegion(pathname: string): "us" | "uk" | null {
  const pair = getRegionPair(pathname);
  if (!pair) return null;
  if (pathname === pair.uk || pathname.startsWith(pair.uk + "/")) return "uk";
  if (pathname === pair.us || pathname.startsWith(pair.us + "/")) return "us";
  return null;
}
