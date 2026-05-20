"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function BiologicalAgeWithInsights() {
  return (
    <CalculatorEngine
      slug="biological-age-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="biological-age-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
