"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function SocialMediaTimeWithInsights() {
  return (
    <CalculatorEngine
      slug="social-media-time-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="social-media-time-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
