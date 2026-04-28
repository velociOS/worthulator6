/**
 * Country configuration system.
 *
 * Add a new Country to the union and a matching entry in COUNTRY_CONFIGS
 * to support additional regions.
 */

export type Country = "US" | "UK";

export interface CountryConfig {
  /** ISO 4217 currency code */
  currency: string;
  /** Currency symbol used for display */
  currencySymbol: string;
  /** BCP 47 locale string for number / date formatting */
  locale: string;
  /** Whether lead capture is enabled by default for this country */
  leadCaptureDefault: boolean;
  /** Human-readable country name */
  label: string;
  /** Flag emoji */
  flag: string;
}

const COUNTRY_CONFIGS: Record<Country, CountryConfig> = {
  US: {
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    leadCaptureDefault: true,
    label: "United States",
    flag: "🇺🇸",
  },
  UK: {
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    leadCaptureDefault: true,
    label: "United Kingdom",
    flag: "🇬🇧",
  },
};

/**
 * Per-calculator lead capture overrides.
 * Key = US version slug (canonical).
 * Only add entries where the default differs.
 */
const LEAD_CAPTURE_OVERRIDES: Partial<Record<string, Record<Country, boolean>>> = {
  "pi-calculator": { US: false, UK: true },
};

export function getCountryConfig(country: Country): CountryConfig {
  return COUNTRY_CONFIGS[country];
}

/**
 * Returns whether lead capture is enabled for a given calculator + country.
 * Uses per-calculator overrides where defined; falls back to country default.
 */
export function getLeadCaptureEnabled(slug: string, country: Country): boolean {
  const override = LEAD_CAPTURE_OVERRIDES[slug];
  if (override !== undefined) return override[country];
  return COUNTRY_CONFIGS[country].leadCaptureDefault;
}

/**
 * Formats a numeric value as currency for the given country.
 * e.g. formatAmount(52000, "US") → "$52,000"
 *      formatAmount(40000, "UK") → "£40,000"
 */
export function formatAmount(value: number, country: Country): string {
  const { currencySymbol, locale } = COUNTRY_CONFIGS[country];
  return currencySymbol + Math.round(value).toLocaleString(locale);
}
