/**
 * General utility functions for the enhancement layer.
 */

// ─── formatCurrency ───────────────────────────────────────────────────────────

/**
 * Formats a number as a currency string.
 * @example formatCurrency(1500)         → "$1,500"
 * @example formatCurrency(1500, "GBP")  → "£1,500"
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US",
  decimals = 0
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// ─── formatPercentage ─────────────────────────────────────────────────────────

/**
 * Formats a number as a percentage string.
 * @example formatPercentage(22.5)             → "22.5%"
 * @example formatPercentage(5, 0, true)       → "+5%"
 */
export function formatPercentage(
  value: number,
  decimals = 1,
  includeSign = false
): string {
  const sign = includeSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

// ─── debounce ─────────────────────────────────────────────────────────────────

/**
 * Returns a debounced version of the provided function.
 * The debounced function delays invoking `fn` until `wait` ms have elapsed
 * since the last call.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

// ─── clamp ────────────────────────────────────────────────────────────────────

/** Clamps a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─── capitalize ───────────────────────────────────────────────────────────────

/** Capitalises the first letter of a string. */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── truncate ─────────────────────────────────────────────────────────────────

/** Truncates a string to `maxLength` and appends an ellipsis. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + "…";
}
