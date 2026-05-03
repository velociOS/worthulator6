"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type Finish        = "brushed" | "aggregate" | "stamped";
type Reinforcement = "none"    | "mesh"      | "rebar";

const FINISH_OPTIONS: { value: Finish; label: string; addon: number; note: string }[] = [
  { value: "brushed",   label: "Brushed finish",       addon: 0,  note: "Standard" },
  { value: "aggregate", label: "Exposed aggregate",    addon: 20, note: "+£20/m²" },
  { value: "stamped",   label: "Pattern imprinted",    addon: 60, note: "+£60/m²" },
];

const REINF_OPTIONS: { value: Reinforcement; label: string; addon: number; note: string }[] = [
  { value: "none", label: "No reinforcement", addon: 0, note: "Small slabs" },
  { value: "mesh", label: "A142 mesh",        addon: 3, note: "+£3/m²" },
  { value: "rebar", label: "T10 rebar",       addon: 8, note: "+£8/m²" },
];

// 1 × 25kg bag ≈ 0.012 m³ finished concrete → ~83 bags per m³
const BAGS_PER_M3 = 83;

export default function ConcreteSlabCalculatorUK() {
  // ── Dimension state ─────────────────────────────────────────────────
  const [length, setLength] = useState(6);
  const [width,  setWidth]  = useState(6);
  const [depth,  setDepth]  = useState(100);
  const [lenI,   setLenI]   = useState("6");
  const [widI,   setWidI]   = useState("6");
  const [depI,   setDepI]   = useState("100");

  // ── Options state ────────────────────────────────────────────────────
  const [finish, setFinish] = useState<Finish>("brushed");
  const [reinf,  setReinf]  = useState<Reinforcement>("none");

  // ── Advanced overrides ───────────────────────────────────────────────
  const [showAdv,  setShowAdv]  = useState(false);
  const [priceI,   setPriceI]   = useState("95");
  const [priceVal, setPriceVal] = useState(95);
  const [laborI,   setLaborI]   = useState("55");
  const [laborVal, setLaborVal] = useState(55);
  const [wasteI,   setWasteI]   = useState("10");
  const [wastePct, setWastePct] = useState(10);

  // ── Flash on result change ───────────────────────────────────────────
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  }, [length, width, depth, finish, reinf, priceVal, laborVal, wastePct]);

  // ── Calculations ─────────────────────────────────────────────────────
  const sqm         = length * width;                         // m²
  const volume      = sqm * (depth / 1000);                   // m³
  const wasteFactor = 1 + wastePct / 100;
  const volW        = volume * wasteFactor;                   // m³ with waste
  const bags        = Math.ceil(volume * BAGS_PER_M3);        // 25kg bags exact
  const bagsW       = Math.ceil(volW   * BAGS_PER_M3);        // with waste

  const finishAddon = FINISH_OPTIONS.find((f) => f.value === finish)!.addon;
  const reinfAddon  = REINF_OPTIONS.find((r)  => r.value === reinf)!.addon;

  const materialCost = Math.round(volW * priceVal);
  const laborRate    = laborVal + finishAddon + reinfAddon;
  const laborCost    = Math.round(sqm * laborRate);
  const totalCost    = materialCost + laborCost;
  const perSqm       = sqm > 0 ? (totalCost / sqm) : 0;

  // ── Chart data ────────────────────────────────────────────────────────
  const costChartData = [
    { name: "Materials", value: materialCost, fill: "#10b981" },
    { name: "Labour",    value: laborCost,    fill: "#3b82f6" },
  ];
  const pctMaterial = totalCost > 0 ? Math.round((materialCost / totalCost) * 100) : 0;

  const fmtGBP = (n: number) =>
    "\u00a3" + n.toLocaleString("en-GB");

  // ── Shared class strings ──────────────────────────────────────────────
  const cardCls =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg";
  const inputCls =
    "w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-10 text-right text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100";
  const sliderWrapCls =
    "mt-5 **:[[role=slider]]:h-5 **:[[role=slider]]:w-5 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:hover:scale-[1.1] **:[[role=slider]]:active:scale-[1.15] **:[[role=slider]]:active:cursor-grabbing";

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">

      {/* ═══════════════════════════════════════════════════
          INPUTS
      ═══════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-5">

        {/* ── Length ────────────────────────────────────── */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="csc-uk-length" className="block text-sm font-semibold text-gray-700">Length</label>
              <p className="mt-0.5 text-xs text-gray-400">Slab length in metres</p>
            </div>
            <div className="relative">
              <input
                id="csc-uk-length"
                type="number" min={0.5} max={100} step={0.5}
                value={lenI}
                onChange={(e) => {
                  setLenI(e.target.value);
                  const v = Math.max(0.5, Math.min(100, Number(e.target.value)));
                  if (!isNaN(v)) setLength(v);
                }}
                onBlur={() => setLenI(String(length))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">m</span>
            </div>
          </div>
          <div className={sliderWrapCls}>
            <Slider
              min={0.5} max={30} step={0.5}
              value={[Math.min(length, 30)]}
              onValueChange={([v]) => { setLength(v); setLenI(String(v)); }}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>0.5 m</span><span>15 m</span><span>30 m</span>
            </div>
          </div>
        </div>

        {/* ── Width ─────────────────────────────────────── */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="csc-uk-width" className="block text-sm font-semibold text-gray-700">Width</label>
              <p className="mt-0.5 text-xs text-gray-400">Slab width in metres</p>
            </div>
            <div className="relative">
              <input
                id="csc-uk-width"
                type="number" min={0.5} max={100} step={0.5}
                value={widI}
                onChange={(e) => {
                  setWidI(e.target.value);
                  const v = Math.max(0.5, Math.min(100, Number(e.target.value)));
                  if (!isNaN(v)) setWidth(v);
                }}
                onBlur={() => setWidI(String(width))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">m</span>
            </div>
          </div>
          <div className={sliderWrapCls}>
            <Slider
              min={0.5} max={30} step={0.5}
              value={[Math.min(width, 30)]}
              onValueChange={([v]) => { setWidth(v); setWidI(String(v)); }}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>0.5 m</span><span>15 m</span><span>30 m</span>
            </div>
          </div>
        </div>

        {/* ── Thickness ─────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="csc-uk-depth" className="block text-sm font-semibold text-gray-700">Thickness</label>
              <p className="mt-0.5 text-xs text-gray-400">Enter in millimetres</p>
            </div>
            <div className="relative">
              <input
                id="csc-uk-depth"
                type="number" min={50} max={300} step={5}
                value={depI}
                onChange={(e) => {
                  setDepI(e.target.value);
                  const v = Math.max(50, Math.min(300, Number(e.target.value)));
                  if (!isNaN(v)) setDepth(v);
                }}
                onBlur={() => setDepI(String(depth))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">mm</span>
            </div>
          </div>
          <div className="mt-4 **:[[role=slider]]:h-4 **:[[role=slider]]:w-4 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:active:cursor-grabbing">
            <Slider
              min={50} max={300} step={5}
              value={[depth]}
              onValueChange={([v]) => { setDepth(v); setDepI(String(v)); }}
            />
            <div className="mt-1.5 flex justify-between text-xs text-gray-400">
              <span>50 mm</span><span>300 mm</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[75, 100, 125, 150, 200].map((qd) => (
              <button
                key={qd}
                type="button"
                onClick={() => { setDepth(qd); setDepI(String(qd)); }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${
                  depth === qd
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {qd} mm
              </button>
            ))}
          </div>
        </div>

        {/* ── Finish type ───────────────────────────────── */}
        <div className={cardCls}>
          <p className="text-sm font-semibold text-gray-700">Finish type</p>
          <p className="mt-0.5 text-xs text-gray-400">Affects labour cost estimate</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {FINISH_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFinish(opt.value)}
                className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${
                  finish === opt.value
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-gray-200 bg-gray-50 hover:border-emerald-200 hover:bg-emerald-50"
                }`}
              >
                <span className={`text-xs font-bold leading-snug ${finish === opt.value ? "text-emerald-800" : "text-gray-700"}`}>
                  {opt.label}
                </span>
                <span className={`mt-0.5 text-[10px] ${finish === opt.value ? "text-emerald-600" : "text-gray-400"}`}>
                  {opt.note}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Reinforcement ─────────────────────────────── */}
        <div className={cardCls}>
          <p className="text-sm font-semibold text-gray-700">Reinforcement</p>
          <p className="mt-0.5 text-xs text-gray-400">Required for driveways and heavy loads</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {REINF_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setReinf(opt.value)}
                className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${
                  reinf === opt.value
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-gray-200 bg-gray-50 hover:border-emerald-200 hover:bg-emerald-50"
                }`}
              >
                <span className={`text-xs font-bold leading-snug ${reinf === opt.value ? "text-emerald-800" : "text-gray-700"}`}>
                  {opt.label}
                </span>
                <span className={`mt-0.5 text-[10px] ${reinf === opt.value ? "text-emerald-600" : "text-gray-400"}`}>
                  {opt.note}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Advanced overrides ────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdv((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span>Adjust price, labour &amp; waste</span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showAdv ? "rotate-180" : ""}`}
              viewBox="0 0 12 12" fill="none" aria-hidden="true"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showAdv && (
            <div className="border-t border-gray-100 px-5 py-5 space-y-5">
              {/* Price per m³ */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Price per m³ (ready-mix)</p>
                  <p className="mt-0.5 text-xs text-gray-400">Default: £95</p>
                </div>
                <div className="relative shrink-0">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-bold text-gray-400">{"\u00a3"}</span>
                  <input
                    type="number" min={0} step={5}
                    value={priceI}
                    onChange={(e) => {
                      setPriceI(e.target.value);
                      const v = Math.max(0, Number(e.target.value));
                      if (!isNaN(v)) setPriceVal(v);
                    }}
                    onBlur={() => {
                      const v = Math.max(0, Number(priceI));
                      if (isNaN(v) || priceI === "") { setPriceVal(95); setPriceI("95"); }
                      else setPriceI(String(v));
                    }}
                    className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-7 pr-3 text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Base labour per m² */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Base labour (per m²)</p>
                  <p className="mt-0.5 text-xs text-gray-400">Default: £55/m² — finish adds on top</p>
                </div>
                <div className="relative shrink-0">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-bold text-gray-400">{"\u00a3"}</span>
                  <input
                    type="number" min={0} step={5}
                    value={laborI}
                    onChange={(e) => {
                      setLaborI(e.target.value);
                      const v = Math.max(0, Number(e.target.value));
                      if (!isNaN(v)) setLaborVal(v);
                    }}
                    onBlur={() => {
                      const v = Math.max(0, Number(laborI));
                      if (isNaN(v) || laborI === "") { setLaborVal(55); setLaborI("55"); }
                      else setLaborI(String(v));
                    }}
                    className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-7 pr-3 text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Waste factor */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Waste factor</p>
                  <p className="mt-0.5 text-xs text-gray-400">Default: 10%</p>
                </div>
                <div className="relative shrink-0">
                  <input
                    type="number" min={0} max={50} step={1}
                    value={wasteI}
                    onChange={(e) => {
                      setWasteI(e.target.value);
                      const v = Math.max(0, Math.min(50, Number(e.target.value)));
                      if (!isNaN(v)) setWastePct(v);
                    }}
                    onBlur={() => {
                      const v = Math.max(0, Math.min(50, Number(wasteI)));
                      if (isNaN(v) || wasteI === "") { setWastePct(10); setWasteI("10"); }
                      else setWasteI(String(v));
                    }}
                    className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-right text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">%</span>
                </div>
              </div>

              {(priceVal !== 95 || laborVal !== 55 || wastePct !== 10) && (
                <button
                  type="button"
                  onClick={() => {
                    setPriceVal(95); setPriceI("95");
                    setLaborVal(55); setLaborI("55");
                    setWastePct(10); setWasteI("10");
                  }}
                  className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
                >
                  Reset to defaults
                </button>
              )}
            </div>
          )}
        </div>

      </div>{/* /INPUTS */}

      {/* ═══════════════════════════════════════════════════
          RESULT
      ═══════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">

        {/* ── Volume card ───────────────────────────────── */}
        <div
          className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 ${
            flash ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Concrete Volume</p>
          <p
            className={`mt-2 text-5xl font-bold tracking-tight transition-colors duration-300 ${
              flash ? "text-emerald-600" : "text-gray-950"
            }`}
          >
            {volume.toFixed(2)}
            <span className="ml-2 text-xl font-semibold text-gray-400">m³</span>
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Order <strong className="text-gray-700">{bagsW}</strong> &times; 25 kg bags (incl. {wastePct}% waste)
          </p>

          {/* Volume bar: net vs waste */}
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="flex h-full">
              <div
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{ width: volW > 0 ? `${(volume / volW) * 100}%` : "100%" }}
              />
              <div className="h-full flex-1 bg-amber-300" />
            </div>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />Net ({volume.toFixed(2)} m³)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-300" />Waste ({wastePct}%)
            </span>
          </div>

          {/* Stats grid */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-gray-100 pt-4">
            <div className="rounded-xl bg-gray-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Area</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{sqm.toLocaleString("en-GB")} <span className="text-xs font-semibold text-gray-400">m²</span></p>
            </div>
            <div className="rounded-xl bg-gray-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">With waste</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{volW.toFixed(2)} <span className="text-xs font-semibold text-gray-400">m³</span></p>
            </div>
            <div className="rounded-xl bg-emerald-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Bags (exact)</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{bags} <span className="text-xs font-semibold text-gray-400">bags</span></p>
            </div>
            <div className="rounded-xl bg-amber-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">Bags + waste</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{bagsW} <span className="text-xs font-semibold text-gray-400">bags</span></p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-gray-400">
            Estimates only. Verify with your supplier before ordering.
          </p>
        </div>

        {/* ── Cost + donut chart ────────────────────────── */}
        <div
          className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
            flash ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-white"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Installed Cost Estimate</p>
          <p
            className={`mt-2 text-4xl font-bold tracking-tight transition-colors duration-300 ${
              flash ? "text-orange-500" : "text-gray-950"
            }`}
          >
            {fmtGBP(totalCost)}
          </p>
          <p className="mt-1 mb-5 text-sm font-semibold text-gray-400">&asymp; {fmtGBP(Math.round(perSqm))} per m²</p>

          {/* Donut chart */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <PieChart width={120} height={120}>
                <Pie
                  data={costChartData}
                  cx={60} cy={60}
                  innerRadius={36} outerRadius={54}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={600}
                  strokeWidth={0}
                >
                  {costChartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [fmtGBP(Number(value)), ""]}
                  contentStyle={{ borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                />
              </PieChart>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[13px] font-bold leading-none text-gray-900">{pctMaterial}%</p>
                  <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-gray-400">materials</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {costChartData.map((entry) => (
                <div key={entry.name} className="flex items-start gap-2.5">
                  <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: entry.fill }} />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{entry.name}</p>
                    <p className="text-xs text-gray-400">
                      {fmtGBP(entry.value)} &middot; {totalCost > 0 ? Math.round((entry.value / totalCost) * 100) : 0}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost rows */}
          <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />Material (concrete)
              </p>
              <p className="text-sm font-semibold text-gray-700">{fmtGBP(materialCost)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Labour{finish !== "brushed" || reinf !== "none" ? " + finish" : ""}
              </p>
              <p className="text-sm font-semibold text-gray-700">{fmtGBP(laborCost)}</p>
            </div>
            {reinf !== "none" && (
              <div className="flex items-center justify-between">
                <p className="pl-4 text-sm text-gray-400">Reinforcement add-on</p>
                <p className="text-sm font-semibold text-gray-700">{fmtGBP(Math.round(sqm * reinfAddon))}</p>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <p className="text-sm font-semibold text-gray-700">Total installed</p>
              <p className="text-base font-bold text-orange-600">{fmtGBP(totalCost)}</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-gray-400">
            UK national averages 2026. Labour rates vary by region and contractor.
          </p>
        </div>

        {/* ── Ready-mix tip ─────────────────────────────── */}
        {volume > 1 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">Consider ready-mix at this volume</p>
            <p className="mt-1.5 text-xs leading-relaxed text-amber-700">
              At {volume.toFixed(2)} m³, ready-mix is usually faster and cheaper than
              mixing {bagsW} bags by hand. UK ready-mix typically costs {"\u00a3"}80&ndash;{"\u00a3"}110/m³
              plus a delivery charge.
            </p>
          </div>
        )}

        {/* ── Formula card ──────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            How it&apos;s calculated
          </p>
          <p className="text-xs leading-relaxed text-gray-500">
            Volume (m³) = Length (m) &times; Width (m) &times; (Thickness (mm) &divide; 1,000)
            <br /><br />
            Volume incl. waste = Volume &times; (1 + waste&nbsp;%)
            <br /><br />
            Material cost = volume incl. waste &times; price per m³
            <br />
            Labour cost = area (m²) &times; labour + finish + reinforcement per m²
          </p>
        </div>

      </div>{/* /RESULT */}
    </div>
  );
}
