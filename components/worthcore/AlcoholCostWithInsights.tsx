"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function AlcoholCostWithInsights() {
  return (
    <CalculatorEngine
      slug="alcohol-cost-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="alcohol-cost-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
