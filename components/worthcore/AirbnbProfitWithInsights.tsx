"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function AirbnbProfitWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="airbnb-profit"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="airbnb-profit" outputs={outputs} values={values} />
      )}
    />
  );
}
