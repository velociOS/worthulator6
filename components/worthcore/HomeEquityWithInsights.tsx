"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function HomeEquityWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="home-equity-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="home-equity-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
