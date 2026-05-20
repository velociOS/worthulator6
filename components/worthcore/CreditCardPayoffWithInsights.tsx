"use client";

// ─── CreditCardPayoffWithInsights ─────────────────────────────────────────────
//
// PHASE 6D: Credit Card Payoff Calculator + Live WorthCore Insights
//
// Connects the engine's render-prop to generateCreditCardPayoffInsights.
// Insights update live on every slider change via the Phase 6B pattern.
//
// USAGE:
//   Replace <CalculatorEngineLoader slug="credit-card-payoff-calculator" ... />
//   with <CreditCardPayoffWithInsights /> on the page.
//
// ─────────────────────────────────────────────────────────────────────────────

import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

export default function CreditCardPayoffWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="credit-card-payoff-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock
          slug="credit-card-payoff-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
