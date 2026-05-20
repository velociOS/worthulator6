"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function CreditCardInterestWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="credit-card-interest"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="credit-card-interest" outputs={outputs} values={values} />
      )}
    />
  );
}
