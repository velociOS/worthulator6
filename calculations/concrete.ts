// ─── Concrete calculation module ──────────────────────────────────────────────
// Pure functions only. No UI. No hardcoded values.
// All constants come from the data layer via the `data` argument.

import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

// ─── Data interfaces ──────────────────────────────────────────────────────────
// These describe what each function needs from the data layer.

export interface ConcreteBagData {
  /** Map from bag size string key (e.g. "80") to volume yield per bag */
  bagYields: Record<string, number>;
  /** Cost per volume unit ($ per cu yd or £ per m³) */
  ratePerUnit: number;
  /** Divide raw depth input by this to convert to base length unit (12 for in→ft, 1000 for mm→m) */
  depthDivisor: number;
  /** Divide L×W×D volume by this to get the output volume unit (27 for cu yd, 1 for m³) */
  volumeDivisor: number;
}

export interface ConcreteVolumeData {
  /** Cost per volume unit */
  ratePerUnit: number;
  /** Divide depth by this to get base length unit */
  depthDivisor: number;
  /** Divide L×W×D volume by this to get output volume unit */
  volumeDivisor: number;
}

// ─── Modules ──────────────────────────────────────────────────────────────────

/**
 * Concrete bag calculator.
 * Works for both US (cubic yards, lb bags) and UK (m³, kg bags)
 * — the difference lives entirely in the data object.
 */
export function calculateConcreteBag(
  inputs: CalculatorValues,
  data: ConcreteBagData,
): CalculatorOutputs {
  const length = Number(inputs.length);
  const width  = Number(inputs.width);
  const depth  = Number(inputs.depth);
  const waste  = Number(inputs.waste);
  const bagKey = String(inputs.bagSize);

  // Guard invalid inputs — engine will show zeros rather than NaN/Infinity
  if (!isFinite(length) || !isFinite(width) || !isFinite(depth) || length <= 0 || width <= 0 || depth <= 0) {
    return { volume: 0, adjustedVolume: 0, bags: 0, cost: 0 };
  }

  // Fall back to the last (largest) bag size if key is unknown
  const yieldValues = Object.values(data.bagYields);
  const yieldPerBag = data.bagYields[bagKey] ?? yieldValues[yieldValues.length - 1] ?? 0.022;

  const volume         = (length * width * (depth / data.depthDivisor)) / data.volumeDivisor;
  const adjustedVolume = volume * (1 + waste / 100);
  const bags           = Math.ceil(adjustedVolume / yieldPerBag);
  const cost           = Math.round(adjustedVolume * data.ratePerUnit);

  return { volume, adjustedVolume, bags, cost };
}

/**
 * Concrete volume calculator (ready-mix / volume-only — no bag count).
 * Works for both US and UK.
 */
export function calculateConcreteVolume(
  inputs: CalculatorValues,
  data: ConcreteVolumeData,
): CalculatorOutputs {
  const length = Number(inputs.length);
  const width  = Number(inputs.width);
  const depth  = Number(inputs.depth);
  const waste  = Number(inputs.waste);

  if (!isFinite(length) || !isFinite(width) || !isFinite(depth) || length <= 0 || width <= 0 || depth <= 0) {
    return { volume: 0, adjustedVolume: 0, cost: 0 };
  }

  const volume         = (length * width * (depth / data.depthDivisor)) / data.volumeDivisor;
  const adjustedVolume = volume * (1 + waste / 100);
  const cost           = Math.round(adjustedVolume * data.ratePerUnit);

  return { volume, adjustedVolume, cost };
}
