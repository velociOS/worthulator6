"use client";

// ─── SavingsGoalWithInsights ──────────────────────────────────────────────────
//
// PHASE 6D: Savings Goal Calculator + Live WorthCore Insights
//
// ─────────────────────────────────────────────────────────────────────────────

import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

export default function SavingsGoalWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="savings-goal-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock
          slug="savings-goal-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
