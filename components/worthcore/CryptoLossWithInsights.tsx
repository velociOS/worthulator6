"use client";

import CalculatorEngine from "@/components/calculator-engine/CalculatorEngine";
import LiveInsightBlock from "@/components/worthcore/LiveInsightBlock";

export default function CryptoLossWithInsights() {
  return (
    <CalculatorEngine
      slug="crypto-loss-calculator"
      afterResults={(outputs, values) => (
        <LiveInsightBlock
          slug="crypto-loss-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
