// ─── Gravel calculation module ────────────────────────────────────────────────
// Pure functions only. No UI. No hardcoded values.

import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

export interface GravelData {
  /** Divide depth input by this to convert to base length unit */
  depthDivisor: number;
  /** Divide L×W×D volume by this to get output volume unit */
  volumeDivisor: number;
  /** Bulk density: mass per volume unit (lbs/cu yd or kg/m³) */
  densityPerVolumeUnit: number;
  /** Mass units per output unit (2000 lbs/short ton, 1000 kg/tonne) */
  massPerOutputUnit: number;
  /** Cost per output mass unit ($ per short ton or £ per tonne) */
  ratePerMassUnit: number;
}

/**
 * Gravel / aggregate calculator.
 * Works for US (tons, cubic yards) and UK (tonnes, m³).
 */
export function calculateGravel(
  inputs: CalculatorValues,
  data: GravelData,
): CalculatorOutputs {
  const length = Number(inputs.length);
  const width  = Number(inputs.width);
  const depth  = Number(inputs.depth);
  const waste  = Number(inputs.waste);

  if (!isFinite(length) || !isFinite(width) || !isFinite(depth) || length <= 0 || width <= 0 || depth <= 0) {
    return { volume: 0, adjustedVolume: 0, weight: 0, cost: 0 };
  }

  const volume         = (length * width * (depth / data.depthDivisor)) / data.volumeDivisor;
  const adjustedVolume = volume * (1 + waste / 100);
  const weight         = (adjustedVolume * data.densityPerVolumeUnit) / data.massPerOutputUnit;
  const cost           = Math.round(weight * data.ratePerMassUnit);

  return { volume, adjustedVolume, weight, cost };
}
