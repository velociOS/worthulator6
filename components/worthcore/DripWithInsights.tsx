"use client";

// ─── DripWithInsights ─────────────────────────────────────────────────────────
//
// PHASE 6D: DRIP Calculator + Live WorthCore Insights
//
// ─────────────────────────────────────────────────────────────────────────────

import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

export default function DripWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="drip-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock
          slug="drip-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
