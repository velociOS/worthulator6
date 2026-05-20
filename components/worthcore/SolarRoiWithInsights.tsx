"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function SolarRoiWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="solar-roi"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="solar-roi" outputs={outputs} values={values} />
      )}
    />
  );
}
