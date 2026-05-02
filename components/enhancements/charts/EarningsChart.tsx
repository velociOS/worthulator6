"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface EarningsDataPoint {
  label: string;
  value: number;
  projected?: number;
}

interface EarningsChartProps {
  data: EarningsDataPoint[];
  title?: string;
  valueLabel?: string;
  projectedLabel?: string;
  color?: string;
  projectedColor?: string;
  height?: number;
}

export default function EarningsChart({
  data,
  title,
  valueLabel = "Earnings",
  projectedLabel = "Projected",
  color = "#10b981",
  projectedColor = "#6366f1",
  height = 300,
}: EarningsChartProps) {
  const hasProjected = data.some((d) => d.projected !== undefined);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900 p-5">
      {title && (
        <p className="mb-4 text-sm font-semibold text-white/70">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="label"
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) =>
              v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
            }
          />
          <Tooltip
            cursor={{ stroke: 'rgba(255,255,255,0.12)', strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: 12,
            }}
            formatter={(value, name) => [
              `$${Number(value).toLocaleString()}`,
              String(name),
            ] as [string, string]}
          />
          {(hasProjected) && (
            <Legend
              wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            name={valueLabel}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 3 }}
            activeDot={{ r: 5 }}
          />
          {hasProjected && (
            <Line
              type="monotone"
              dataKey="projected"
              name={projectedLabel}
              stroke={projectedColor}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
