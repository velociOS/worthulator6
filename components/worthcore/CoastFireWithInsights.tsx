"use client";

// ─── CoastFireWithInsights ────────────────────────────────────────────────────
//
// PHASE 6D: Coast FIRE Calculator + Live WorthCore Insights
//
// ─────────────────────────────────────────────────────────────────────────────

import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

export default function CoastFireWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="coast-fire-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock
          slug="coast-fire-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
