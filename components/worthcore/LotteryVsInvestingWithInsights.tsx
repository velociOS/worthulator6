"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function LotteryVsInvestingWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="lottery-vs-investing"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="lottery-vs-investing" outputs={outputs} values={values} />
      )}
    />
  );
}
