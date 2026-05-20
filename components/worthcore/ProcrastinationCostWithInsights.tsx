"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function ProcrastinationCostWithInsights() {
  return (
    <CalculatorEngine
      slug="procrastination-cost"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="procrastination-cost"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
