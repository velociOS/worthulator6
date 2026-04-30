/**
 * Number and value formatting helpers
 */

// ─── Currency ────────────────────────────────────────────────────────────────

export function formatCurrency(
  value: number,
  options: {
    currency?: string;
    locale?: string;
    decimals?: number;
    compact?: boolean;
  } = {}
): string {
  const { currency = "USD", locale = "en-US", decimals = 0, compact = false } = options;

  if (compact && Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  if (compact && Math.abs(value) >= 1_000) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// ─── Percentage ──────────────────────────────────────────────────────────────

export function formatPercentage(
  value: number,
  options: {
    decimals?: number;
    includeSign?: boolean;
  } = {}
): string {
  const { decimals = 1, includeSign = false } = options;
  const sign = includeSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

// ─── Number ──────────────────────────────────────────────────────────────────

export function formatNumber(
  value: number,
  options: {
    locale?: string;
    decimals?: number;
    compact?: boolean;
  } = {}
): string {
  const { locale = "en-US", decimals = 0, compact = false } = options;

  return new Intl.NumberFormat(locale, {
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// ─── Duration ────────────────────────────────────────────────────────────────

export function formatMonths(months: number): string {
  const y = Math.floor(months / 12);
  const m = Math.round(months % 12);
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} yr${y !== 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} mo`);
  return parts.join(" ") || "0 mo";
}

// ─── Ordinal ─────────────────────────────────────────────────────────────────

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
