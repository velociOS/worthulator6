"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function PayRaiseWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="pay-raise"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="pay-raise" outputs={outputs} values={values} />
      )}
    />
  );
}
