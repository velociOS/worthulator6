"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function LifeExpectancyWithInsights() {
  return (
    <CalculatorEngine
      slug="life-expectancy-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="life-expectancy-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
