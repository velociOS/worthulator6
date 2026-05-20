"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function ScreenTimeWithInsights() {
  return (
    <CalculatorEngine
      slug="screen-time-impact"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="screen-time-impact"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
