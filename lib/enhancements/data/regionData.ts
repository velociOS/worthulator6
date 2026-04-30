/**
 * Region-specific data constants used across enhancement modules.
 */

export type RegionCode = "US" | "UK" | "CA" | "AU";

export interface RegionMeta {
  code: RegionCode;
  label: string;
  currencyCode: string;
  currencySymbol: string;
  locale: string;
  /** Default hourly rate benchmark (USD-equivalent) */
  medianHourlyRate: number;
  /** Rough effective tax rate for a median salary */
  typicalEffectiveTaxRate: number;
}

export const REGION_DATA: Record<RegionCode, RegionMeta> = {
  US: {
    code: "US",
    label: "United States",
    currencyCode: "USD",
    currencySymbol: "$",
    locale: "en-US",
    medianHourlyRate: 28,
    typicalEffectiveTaxRate: 22,
  },
  UK: {
    code: "UK",
    label: "United Kingdom",
    currencyCode: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    medianHourlyRate: 18,
    typicalEffectiveTaxRate: 25,
  },
  CA: {
    code: "CA",
    label: "Canada",
    currencyCode: "CAD",
    currencySymbol: "$",
    locale: "en-CA",
    medianHourlyRate: 24,
    typicalEffectiveTaxRate: 24,
  },
  AU: {
    code: "AU",
    label: "Australia",
    currencyCode: "AUD",
    currencySymbol: "$",
    locale: "en-AU",
    medianHourlyRate: 26,
    typicalEffectiveTaxRate: 23,
  },
};

export function getRegion(code: RegionCode): RegionMeta {
  return REGION_DATA[code];
}

export const ALL_REGIONS: RegionMeta[] = Object.values(REGION_DATA);
