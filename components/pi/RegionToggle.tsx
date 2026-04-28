"use client";

import RegionToggle from "@/components/RegionToggle";

interface Props {
  current: "us" | "uk";
}

/**
 * PI-calculator-specific region toggle.
 * Thin wrapper around the generic RegionToggle with hardcoded PI paths.
 */
export default function PIRegionToggle({ current }: Props) {
  return (
    <RegionToggle
      current={current}
      usPath="/tools/pi-calculator"
      ukPath="/tools/personal-injury-calculator-uk"
    />
  );
}
