"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function StudentLoanWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="student-loan-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="student-loan-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
