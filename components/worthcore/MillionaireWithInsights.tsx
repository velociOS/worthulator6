"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function MillionaireWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="millionaire-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="millionaire-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
