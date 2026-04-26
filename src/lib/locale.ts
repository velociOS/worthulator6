export type Locale = "US" | "UK";

const STORAGE_KEY = "worthulator_locale";

/**
 * Returns the active locale.
 * Reads from localStorage if available (set by the locale switcher),
 * otherwise defaults to "US".
 */
export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "US" || stored === "UK") return stored;
  }
  return "US";
}

/**
 * Persists the chosen locale to localStorage.
 */
export function setLocale(locale: Locale): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }
}

/**
 * Formats a number as currency for the given locale.
 * US → $1,234   UK → £1,234
 */
export function formatCurrency(value: number, locale: Locale): string {
  const rounded = Math.round(value);
  const formatted = rounded.toLocaleString(locale === "US" ? "en-US" : "en-GB");
  return locale === "US" ? `$${formatted}` : `£${formatted}`;
}
