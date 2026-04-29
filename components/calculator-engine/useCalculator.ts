import { useState, useMemo } from "react";
import type { CalculatorConfig, CalculatorValues, CalculatorOutputs } from "./types";

interface UseCalculatorReturn {
  values: CalculatorValues;
  setValue: (name: string, value: number | string) => void;
  outputs: CalculatorOutputs;
}

/**
 * Manages input state and runs the calculator's pure `calculate` function
 * reactively on every input change.
 *
 * Designed to be minimal: no debouncing (calculations are synchronous math),
 * no side effects, no subscriptions. The config reference must be stable
 * (module-level constant) to avoid unnecessary recalculations.
 */
export function useCalculator(config: CalculatorConfig): UseCalculatorReturn {
  const [values, setValues] = useState<CalculatorValues>(() =>
    Object.fromEntries(config.inputs.map((i) => [i.name, i.default]))
  );

  function setValue(name: string, value: number | string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const outputs = useMemo<CalculatorOutputs>(() => {
    try {
      return config.calculate(values);
    } catch {
      return {};
    }
    // config.calculate is a stable function reference from the module-level registry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return { values, setValue, outputs };
}
