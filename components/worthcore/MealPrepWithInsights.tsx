"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export function MealPrepWithInsights() {
  return (
    <CalculatorEngine
      slug="meal-prep-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock slug="meal-prep-calculator" outputs={outputs} values={values} />
      )}
    />
  );
}
