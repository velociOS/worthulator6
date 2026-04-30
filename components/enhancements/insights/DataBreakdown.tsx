"use client";

interface DataRow {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
}

interface DataBreakdownProps {
  rows: DataRow[];
  title?: string;
  currency?: boolean;
}

export default function DataBreakdown({
  rows,
  title,
  currency = false,
}: DataBreakdownProps) {
  const format = (value: string | number): string => {
    if (typeof value === "number" && currency) {
      return `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }
    return String(value);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
      {title && (
        <div className="border-b border-gray-100 px-5 py-3">
          <p className="text-sm font-semibold text-gray-700">{title}</p>
        </div>
      )}
      <ul className="divide-y divide-gray-100">
        {rows.map((row, i) => (
          <li
            key={i}
            className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
              row.highlight ? "bg-emerald-50" : ""
            }`}
          >
            <div>
              <p
                className={`text-sm ${
                  row.highlight
                    ? "font-semibold text-emerald-800"
                    : "text-gray-600"
                }`}
              >
                {row.label}
              </p>
              {row.sub && (
                <p className="mt-0.5 text-xs text-gray-400">{row.sub}</p>
              )}
            </div>
            <span
              className={`text-sm font-semibold ${
                row.highlight ? "text-emerald-700" : "text-gray-800"
              }`}
            >
              {format(row.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
