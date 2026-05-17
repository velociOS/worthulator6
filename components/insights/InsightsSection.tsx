"use client";

import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";
import { INSIGHT_CONFIGS } from "./insightConfigs";
import type {
  InsightBlock,
  ChartConfig,
  HeroInsightBlock,
  ComparisonBlock,
  ProjectionBlock,
  BreakdownBlock,
  ExplanationBlock,
} from "./insightConfigs";

// ── Formatter ─────────────────────────────────────────────────────────────────
function fmtVal(v: number, format?: "currency" | "months" | "number"): string {
  if (format === "currency") {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000)     return `$${Math.round(v / 1_000)}k`;
    return `$${Math.round(v)}`;
  }
  if (format === "months") {
    const y = Math.floor(v / 12);
    const m = Math.round(v % 12);
    if (y === 0) return `${m}mo`;
    if (m === 0) return `${y}yr`;
    return `${y}yr ${m}mo`;
  }
  return String(Math.round(v));
}

// ── Accent colours (dark stat cards) ─────────────────────────────────────────
const DARK_ACCENT = {
  emerald: { stat: "text-emerald-400", glow: "bg-emerald-500/15", border: "border-emerald-500/25" },
  red:     { stat: "text-red-400",     glow: "bg-red-500/15",     border: "border-red-500/25"     },
  amber:   { stat: "text-amber-400",   glow: "bg-amber-500/15",   border: "border-amber-500/25"   },
  blue:    { stat: "text-blue-400",    glow: "bg-blue-500/15",    border: "border-blue-500/25"    },
} as const;

// ── HeroInsight — dark dramatic stat card ─────────────────────────────────────
function HeroInsight({ block }: { block: HeroInsightBlock }) {
  const a = DARK_ACCENT[block.accent ?? "emerald"];
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${a.border} bg-slate-950 p-6 sm:p-8`}>
      <div className={`pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full ${a.glow} blur-3xl`} />
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">Key insight</p>
      <p className={`text-5xl font-black leading-none tracking-tight sm:text-6xl ${a.stat}`}>
        {block.stat}
      </p>
      <p className="mt-3 max-w-lg text-[15px] font-medium leading-snug text-white/65">
        {block.label}
      </p>
      {block.subStat && (
        <p className="mt-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/40">
          {block.subStat}
        </p>
      )}
    </div>
  );
}

// ── Comparison — dark side-by-side card ───────────────────────────────────────
function Comparison({ block }: { block: ComparisonBlock }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {block.title && (
        <p className="mb-4 text-sm font-semibold text-gray-800">{block.title}</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {[block.left, block.right].map((item, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 ${
              item.highlight
                ? "border border-emerald-200 bg-emerald-50"
                : "border border-gray-100 bg-gray-50"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">{item.label}</p>
            <p className={`mt-1 text-2xl font-black ${item.highlight ? "text-emerald-600" : "text-gray-500"}`}>
              {item.value}
            </p>
            {item.note && <p className="mt-1 text-[11px] text-gray-400">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Projection (chart) — dark chart card ──────────────────────────────────────
function Projection({ block }: { block: ProjectionBlock }) {
  return <ChartCard chart={block.chart} />;
}

// ── Breakdown — white stat grid ───────────────────────────────────────────────
function Breakdown({ block }: { block: BreakdownBlock }) {
  const cols = block.items.length === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className={`grid ${cols} gap-3`}>
      {block.items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">{item.label}</p>
          <p className="mt-1.5 text-2xl font-black text-gray-900">{item.value}</p>
          {item.note && <p className="mt-1 text-[11px] text-gray-400">{item.note}</p>}
        </div>
      ))}
    </div>
  );
}

// ── Explanation — coloured insight text card ──────────────────────────────────
function Explanation({ block }: { block: ExplanationBlock }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-400" />
      <p className="text-[14px] leading-relaxed text-blue-800">{block.text}</p>
    </div>
  );
}

// ── Chart cards ───────────────────────────────────────────────────────────────
function BarChartCard({ chart }: { chart: ChartConfig }) {
  const { title, data, xKey, bars, yFormat, stacked } = chart;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-gray-800">{title}</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barCategoryGap="28%" margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => fmtVal(v, yFormat)} width={48} />
          <Tooltip formatter={(value, name) => [fmtVal(Number(value), yFormat), name as string]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, color: "#111", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          {bars.length > 1 && <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 12, color: "#6b7280", paddingTop: 10 }} />}
          {bars.map((b, i) => (
            <Bar key={b.key} dataKey={b.key} name={b.label} fill={b.color} stackId={stacked ? "s" : undefined} radius={!stacked || i === bars.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LineChartCard({ chart }: { chart: ChartConfig }) {
  const { title, data, xKey, bars, yFormat } = chart;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-gray-800">{title}</p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => fmtVal(v, yFormat)} width={48} />
          <Tooltip formatter={(value, name) => [fmtVal(Number(value), yFormat), name as string]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, color: "#111", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} cursor={{ stroke: "#e5e7eb" }} />
          {bars.length > 1 && <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 12, color: "#6b7280", paddingTop: 10 }} />}
          {bars.map((b) => (
            <Line key={b.key} type="monotone" dataKey={b.key} name={b.label} stroke={b.color} strokeWidth={2.5} dot={{ r: 3, fill: b.color, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function PieChartCard({ chart }: { chart: ChartConfig }) {
  const { title, data, bars, yFormat } = chart;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-gray-800">{title}</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={36}>
            {data.map((_, i) => (<Cell key={i} fill={bars[i]?.color ?? "#666"} />))}
          </Pie>
          <Tooltip formatter={(value, name) => [fmtVal(Number(value), yFormat), name as string]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, color: "#111", fontSize: 12 }} />
          <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 12, color: "#6b7280", paddingTop: 10 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartCard({ chart }: { chart: ChartConfig }) {
  if (chart.type === "line") return <LineChartCard chart={chart} />;
  if (chart.type === "pie")  return <PieChartCard  chart={chart} />;
  return <BarChartCard chart={chart} />;
}

// ── Block dispatcher ──────────────────────────────────────────────────────────
function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "hero":        return <HeroInsight block={block} />;
    case "comparison":  return <Comparison  block={block} />;
    case "projection":  return <Projection  block={block} />;
    case "breakdown":   return <Breakdown   block={block} />;
    case "explanation": return <Explanation block={block} />;
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function InsightsSection({ slug }: { slug: string }) {
  const config = INSIGHT_CONFIGS[slug];
  if (!config) return null;

  return (
    <div className="mt-10 space-y-4">
      {/* Section header */}
      <h3 className="text-sm font-semibold text-gray-800">What the numbers actually mean</h3>

      {/* Individual floating blocks */}
      {config.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}

    </div>
  );
}


