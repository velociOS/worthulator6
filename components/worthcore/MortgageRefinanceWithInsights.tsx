"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function MortgageRefinanceWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="mortgage-refinance-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="mortgage-refinance-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
