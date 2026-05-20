"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function InflationImpactWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="inflation-impact-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="inflation-impact-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
