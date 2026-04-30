/**
 * ROI Calculation Helpers
 */

export interface ROIInput {
  /** Total investment / upfront cost */
  investment: number;
  /** Total returns / revenue generated */
  returns: number;
}

export interface ROIResult {
  netGain: number;
  roiPercent: number;
  multiplier: number;
}

/**
 * Calculates return on investment.
 * ROI % = ((returns - investment) / investment) × 100
 */
export function calculateROI({ investment, returns }: ROIInput): ROIResult {
  if (investment === 0) {
    return { netGain: returns, roiPercent: 0, multiplier: 0 };
  }

  const netGain = returns - investment;
  const roiPercent = (netGain / investment) * 100;
  const multiplier = returns / investment;

  return {
    netGain,
    roiPercent,
    multiplier,
  };
}

/**
 * Annualised ROI over a given number of years.
 * Formula: (returns / investment)^(1/years) - 1
 */
export function annualisedROI(
  investment: number,
  returns: number,
  years: number
): number {
  if (investment === 0 || years === 0) return 0;
  return (Math.pow(returns / investment, 1 / years) - 1) * 100;
}
