import type { OutputConfig, CalculatorValues, CalculatorOutputs } from "./types";

interface OutputCardProps {
  output: OutputConfig;
  value: number | undefined;
  inputs: CalculatorValues;
  allOutputs: CalculatorOutputs;
}

function formatValue(value: number, output: OutputConfig): string {
  if (!isFinite(value)) return "—";

  const symbol = output.currencySymbol ?? "$";

  switch (output.format) {
    case "currency":
      return `${symbol}${Math.round(value).toLocaleString()}`;
    case "integer":
      return Math.ceil(value).toLocaleString();
    case "percent":
      return `${value.toFixed(1)}%`;
    case "decimal":
    default: {
      const places = output.decimalPlaces ?? 2;
      return value.toFixed(places);
    }
  }
}

/**
 * Renders a single calculator output.
 * highlight=true → emerald card (primary result)
 * highlight=false/undefined → neutral gray card
 */
export default function OutputCard({
  output,
  value,
  inputs,
  allOutputs,
}: OutputCardProps) {
  const safe = value ?? 0;
  const formatted = formatValue(safe, output);
  const sublabel = output.sublabel?.(inputs, allOutputs);

  if (output.highlight) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
          {output.label}
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-700">
          {formatted}
          {output.unit && (
            <span className="ml-1.5 text-lg font-normal text-emerald-500/70">
              {output.unit}
            </span>
          )}
        </p>
        {sublabel && (
          <p className="mt-1 text-xs text-emerald-600/70">{sublabel}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {output.label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
        {formatted}
        {output.unit && (
          <span className="ml-1.5 text-lg font-normal text-gray-400">
            {output.unit}
          </span>
        )}
      </p>
      {sublabel && (
        <p className="mt-1 text-xs text-gray-400">{sublabel}</p>
      )}
    </div>
  );
}
