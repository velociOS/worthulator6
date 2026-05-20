"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function SelfEmployedTaxWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="self-employed-tax"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="self-employed-tax" outputs={outputs} values={values} />
      )}
    />
  );
}
