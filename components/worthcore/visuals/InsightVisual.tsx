"use client";

// ─── InsightVisual ─────────────────────────────────────────────────────────────
//
// Renders the visual primitive attached to a WorthCore Insight.
// Pattern: each insight renders [visual] → [title + body].
//
// Primitives:
//   benchmark-bar   — two horizontal bars: user value vs benchmark
//   delta-card      — before / after / delta three-column layout
//   projection-line — recharts line chart showing growth over time
//   donut           — recharts donut chart for spending breakdown
//
// RULES:
//   ✅ "use client" — recharts requires browser
//   ✅ No data fetching — all data passed as props
//   ✅ No useEffect / no setState — pure render
//   ✅ SSR-safe structure — no window references at module scope
//
// ─────────────────────────────────────────────────────────────────────────────

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type {
  InsightVisualization,
  BenchmarkBarVisualization,
  DeltaCardVisualization,
  ProjectionLineVisualization,
  DonutVisualization,
  InsightVisFormat,
} from "@/lib/insights/types";

// ─── Formatter ────────────────────────────────────────────────────────────────

function fmtV(v: number, format: InsightVisFormat): string {
  if (format === "currency") {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000)     return `$${Math.round(v / 1_000)}k`;
    return `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
  if (format === "percent") return `${v.toFixed(1)}%`;
  return v.toLocaleString();
}

// ─── BenchmarkBar ─────────────────────────────────────────────────────────────
// Two horizontal bars: user value (colored) vs benchmark (grey)

function BenchmarkBar({ vis }: { vis: BenchmarkBarVisualization }) {
  const max      = Math.max(vis.userValue, vis.benchmarkValue) * 1.08;
  const userPct  = Math.min((vis.userValue      / max) * 100, 100);
  const benchPct = Math.min((vis.benchmarkValue / max) * 100, 100);
  const userIsBetter = vis.userValue <= vis.benchmarkValue;

  return (
    <div className="space-y-3 rounded-xl bg-gray-50 px-4 py-4">
      <div className="flex items-center gap-3">
        <span className="w-24 shrink-0 text-right text-[11px] font-medium leading-tight text-gray-500">
          {vis.userLabel}
        </span>
        <div className="relative flex-1 h-7 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full flex items-center justify-end px-2.5 transition-all duration-700 ${
              userIsBetter ? "bg-emerald-500" : "bg-amber-400"
            }`}
            style={{ width: `${userPct}%`, minWidth: "3rem" }}
          >
            <span className="whitespace-nowrap text-[11px] font-bold text-white">
              {fmtV(vis.userValue, vis.format)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="w-24 shrink-0 text-right text-[11px] font-medium leading-tight text-gray-400">
          {vis.benchmarkLabel}
        </span>
        <div className="relative flex-1 h-7 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full flex items-center justify-end px-2.5 bg-gray-400"
            style={{ width: `${benchPct}%`, minWidth: "3rem" }}
          >
            <span className="whitespace-nowrap text-[11px] font-bold text-white">
              {fmtV(vis.benchmarkValue, vis.format)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DeltaCard ────────────────────────────────────────────────────────────────
// Three-column: Before → After + Delta

function DeltaCardVis({ vis }: { vis: DeltaCardVisualization }) {
  return (
    <div className="flex items-stretch gap-2 rounded-xl bg-gray-50 p-3">
      {/* Before — neutral: the old baseline */}
      <div className="flex-1 rounded-xl border border-gray-200 bg-white p-3 text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {vis.before.label}
        </p>
        <p className="text-xl font-black text-gray-600">{vis.before.value}</p>
      </div>

      {/* Arrow */}
      <div className="flex items-center text-gray-300 text-base select-none px-0.5">→</div>

      {/* After — emerald: the new reality */}
      <div className="flex-1 rounded-xl border border-emerald-200 bg-white p-3 text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
          {vis.after.label}
        </p>
        <p className="text-xl font-black text-emerald-600">{vis.after.value}</p>
      </div>

      {/* Delta — brand hero */}
      <div className="flex-1 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-center">
        <p className={`mb-2 text-[10px] font-bold uppercase tracking-widest ${
          vis.delta.positive ? "text-emerald-600" : "text-amber-500"
        }`}>
          {vis.delta.label}
        </p>
        <p className={`text-xl font-black ${
          vis.delta.positive ? "text-emerald-700" : "text-amber-600"
        }`}>
          {vis.delta.value}
        </p>
      </div>
    </div>
  );
}

// ─── ProjectionLine ───────────────────────────────────────────────────────────
// Recharts line chart showing growth at each year milestone

function ProjectionLine({ vis }: { vis: ProjectionLineVisualization }) {
  const data  = vis.points.map((p) => ({ name: p.label, value: p.value }));
  const color = vis.color ?? "#10b981";

  return (
    <div className="rounded-xl bg-gray-50 px-4 pt-4 pb-2">
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => fmtV(v, vis.format)}
            width={48}
          />
          <Tooltip
            formatter={(v: unknown) => [fmtV(Number(v), vis.format), vis.yLabel ?? "Value"]}
            contentStyle={{
              fontSize: 11,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              color: "#111827",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
            cursor={{ stroke: "#d1fae5" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 4, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Donut ────────────────────────────────────────────────────────────────────
// Recharts donut chart for spending breakdowns

function DonutChart({ vis }: { vis: DonutVisualization }) {
  const data = vis.segments.map((s) => ({ name: s.label, value: s.value }));

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={44}
            outerRadius={68}
          >
            {vis.segments.map((s, i) => (
              <Cell key={i} fill={s.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: unknown, name: unknown) => [
              fmtV(Number(v), vis.format),
              String(name),
            ]}
            contentStyle={{
              fontSize: 11,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              color: "#111827",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {vis.segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[11px] text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export default function InsightVisual({ vis }: { vis: InsightVisualization }) {
  switch (vis.type) {
    case "benchmark-bar":   return <BenchmarkBar    vis={vis} />;
    case "delta-card":      return <DeltaCardVis    vis={vis} />;
    case "projection-line": return <ProjectionLine  vis={vis} />;
    case "donut":           return <DonutChart       vis={vis} />;
  }
}
