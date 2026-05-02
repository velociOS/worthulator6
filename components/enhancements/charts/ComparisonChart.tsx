"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface ComparisonDataPoint {
  label: string;
  [key: string]: string | number;
}

interface SeriesConfig {
  key: string;
  name: string;
  color: string;
}

interface ComparisonChartProps {
  data: ComparisonDataPoint[];
  series: SeriesConfig[];
  title?: string;
  height?: number;
  layout?: "vertical" | "horizontal";
}

export default function ComparisonChart({
  data,
  series,
  title,
  height = 300,
  layout = "horizontal",
}: ComparisonChartProps) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900 p-5">
      {title && (
        <p className="mb-4 text-sm font-semibold text-white/70">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          {layout === "horizontal" ? (
            <>
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
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                }
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                width={100}
              />
            </>
          )}
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
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
          <Legend
            wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}
          />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color}
              radius={[4, 4, 0, 0]}
              activeBar={(props: Record<string, unknown>) => {
                const x = Number(props.x ?? 0) - 1;
                const y = Number(props.y ?? 0) - 1;
                const width = Number(props.width ?? 0) + 2;
                const height = Number(props.height ?? 0) + 2;
                return <rect x={x} y={y} width={width} height={height} fill={s.color} rx={5} ry={5} />;
              }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
