"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function LifeInWeeksWithInsights() {
  return (
    <CalculatorEngine
      slug="life-in-weeks-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="life-in-weeks-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
