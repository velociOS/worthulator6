"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function SalaryToHourlyWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="salary-to-hourly"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="salary-to-hourly" outputs={outputs} values={values} />
      )}
    />
  );
}
