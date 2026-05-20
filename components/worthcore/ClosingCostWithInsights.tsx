"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function ClosingCostWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="closing-cost-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="closing-cost-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
