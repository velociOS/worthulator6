"use client";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
export default function ApplianceEnergyWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="appliance-energy-cost"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock slug="appliance-energy-cost" outputs={outputs} values={values} />
      )}
    />
  );
}
