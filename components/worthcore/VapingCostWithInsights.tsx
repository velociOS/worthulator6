"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function VapingCostWithInsights() {
  return (
    <CalculatorEngine
      slug="vaping-cost-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="vaping-cost-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
