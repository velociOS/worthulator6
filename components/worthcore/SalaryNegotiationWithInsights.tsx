"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function SalaryNegotiationWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="salary-negotiation-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="salary-negotiation-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
