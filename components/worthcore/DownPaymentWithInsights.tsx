"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function DownPaymentWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="down-payment-countdown"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="down-payment-countdown" outputs={outputs} values={values} />
      )}
    />
  );
}
