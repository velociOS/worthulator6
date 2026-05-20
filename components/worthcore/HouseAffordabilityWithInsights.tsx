"use client";

// ─── HouseAffordabilityWithInsights ──────────────────────────────────────────
//
// PHASE 6D: House Affordability Calculator + Live WorthCore Insights
//
// Connects the engine's render-prop to generateHouseAffordabilityInsights.
// Insights update live on every slider change via the Phase 6B pattern.
//
// USAGE:
//   Replace <CalculatorEngineLoader slug="house-affordability-calculator" />
//   with <HouseAffordabilityWithInsights /> on the page.
//
// ─────────────────────────────────────────────────────────────────────────────

import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

export default function HouseAffordabilityWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="house-affordability-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock
          slug="house-affordability-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
