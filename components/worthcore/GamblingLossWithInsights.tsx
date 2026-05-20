"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function GamblingLossWithInsights() {
  return (
    <CalculatorEngine
      slug="gambling-loss-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="gambling-loss-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
