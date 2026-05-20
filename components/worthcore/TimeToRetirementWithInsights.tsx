"use client";

// ─── TimeToRetirementWithInsights ─────────────────────────────────────────────
//
// PHASE 6D: Time to Retirement Calculator + Live WorthCore Insights
//
// ─────────────────────────────────────────────────────────────────────────────

import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

export default function TimeToRetirementWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="time-to-retirement-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock
          slug="time-to-retirement-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
