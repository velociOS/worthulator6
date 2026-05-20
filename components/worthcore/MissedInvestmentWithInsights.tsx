"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function MissedInvestmentWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="missed-investment"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="missed-investment" outputs={outputs} values={values} />
      )}
    />
  );
}
