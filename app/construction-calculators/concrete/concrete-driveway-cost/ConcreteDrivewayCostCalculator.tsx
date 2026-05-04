"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type Finish       = "broom" | "exposed" | "stamped";
type Reinf        = "none" | "mesh" | "rebar";
type Removal      = "none" | "asphalt" | "concrete";

const FINISH_OPTIONS: { value: Finish; label: string; addon: number; note: string }[] = [
  { value: "broom",    label: "Broom finish",       addon: 0,   note: "Standard" },
  { value: "exposed",  label: "Exposed aggregate",  addon: 2.5, note: "+$2.50/sqft" },
  { value: "stamped",  label: "Stamped concrete",   addon: 12,  note: "+$12/sqft" },
];

const REINF_OPTIONS: { value: Reinf; label: string; addon: number; note: string }[] = [
  { value: "none",  label: "No reinforcement", addon: 0,    note: "Small slabs" },
  { value: "mesh",  label: "Wire mesh",         addon: 0.25, note: "+$0.25/sqft" },
  { value: "rebar", label: "Rebar grid",        addon: 1.00, note: "+$1.00/sqft" },
];

const REMOVAL_OPTIONS: { value: Removal; label: string; cost: number; note: string }[] = [
  { value: "none",     label: "No removal",        cost: 0,    note: "New pour" },
  { value: "asphalt",  label: "Remove asphalt",    cost: 2.5,  note: "~$2.50/sqft" },
  { value: "concrete", label: "Remove concrete",   cost: 4.0,  note: "~$4.00/sqft" },
];

export default function ConcreteDrivewayCostCalculator() {
  const [length, setLength] = useState(20);
  const [lenI,   setLenI]   = useState("20");
  const [width,  setWidth]  = useState(20);
  const [widI,   setWidI]   = useState("20");
  const [finish, setFinish] = useState<Finish>("broom");
  const [reinf,  setReinf]  = useState<Reinf>("mesh");
  const [removal, setRemoval] = useState<Removal>("none");

  const [showAdv,  setShowAdv]  = useState(false);
  const [laborI,   setLaborI]   = useState("5");
  const [laborVal, setLaborVal] = useState(5);
  const [priceI,   setPriceI]   = useState("150");
  const [priceVal, setPriceVal] = useState(150);
  const [thickI,   setThickI]   = useState("4");
  const [thickVal, setThickVal] = useState(4);
  const [wasteI,   setWasteI]   = useState("10");
  const [wastePct, setWastePct] = useState(10);

  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  }, [length, width, finish, reinf, removal, laborVal, priceVal, thickVal, wastePct]);

  // Calculations
  const sqft       = length * width;
  const cubicFt    = sqft * (thickVal / 12);
  const cubicYds   = cubicFt / 27;
  const cubicYdsW  = cubicYds * (1 + wastePct / 100);

  const finishAddon  = FINISH_OPTIONS.find((f) => f.value === finish)!.addon;
  const reinfAddon   = REINF_OPTIONS.find((r) => r.value === reinf)!.addon;
  const removalCost  = REMOVAL_OPTIONS.find((r) => r.value === removal)!.cost;

  const materialCost = Math.round(cubicYdsW * priceVal);
  const laborRate    = laborVal + finishAddon + reinfAddon;
  const laborCost    = Math.round(sqft * laborRate);
  const demolCost    = Math.round(sqft * removalCost);
  const totalCost    = materialCost + laborCost + demolCost;
  const perSqft      = sqft > 0 ? (totalCost / sqft) : 0;

  const chartData = [
    { name: "Materials", value: materialCost, fill: "#10b981" },
    { name: "Labour",    value: laborCost,    fill: "#3b82f6" },
    ...(demolCost > 0 ? [{ name: "Removal", value: demolCost, fill: "#f59e0b" }] : []),
  ];
  const pctMaterial = totalCost > 0 ? Math.round((materialCost / totalCost) * 100) : 0;

  const fmt = (n: number) => "$" + n.toLocaleString("en-US");

  const cardCls =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg";
  const inputCls =
    "w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-10 text-right text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100";
  const sliderWrapCls =
    "mt-5 **:[[role=slider]]:h-5 **:[[role=slider]]:w-5 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:hover:scale-[1.1] **:[[role=slider]]:active:scale-[1.15] **:[[role=slider]]:active:cursor-grabbing";

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">

      {/* ── INPUTS ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">

        {/* Length */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="cdc-length" className="block text-sm font-semibold text-gray-700">Length</label>
              <p className="mt-0.5 text-xs text-gray-400">Driveway length in feet</p>
            </div>
            <div className="relative">
              <input
                id="cdc-length" type="number" min={5} max={300} step={1}
                value={lenI}
                onChange={(e) => { setLenI(e.target.value); const v = Math.max(1, Math.min(300, Number(e.target.value))); if (!isNaN(v)) setLength(v); }}
                onBlur={() => setLenI(String(length))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">ft</span>
            </div>
          </div>
          <div className={sliderWrapCls}>
            <Slider min={5} max={100} step={1} value={[Math.min(length, 100)]}
              onValueChange={([v]) => { setLength(v); setLenI(String(v)); }} className="h-3" />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>5 ft</span><span>50 ft</span><span>100 ft</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[18, 20, 24, 40, 60].map((v) => (
              <button key={v} type="button"
                onClick={() => { setLength(v); setLenI(String(v)); }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${length === v ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"}`}>
                {v} ft
              </button>
            ))}
          </div>
        </div>

        {/* Width */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="cdc-width" className="block text-sm font-semibold text-gray-700">Width</label>
              <p className="mt-0.5 text-xs text-gray-400">Single car ≈ 9–10 ft, double ≈ 18–20 ft</p>
            </div>
            <div className="relative">
              <input
                id="cdc-width" type="number" min={5} max={60} step={1}
                value={widI}
                onChange={(e) => { setWidI(e.target.value); const v = Math.max(1, Math.min(60, Number(e.target.value))); if (!isNaN(v)) setWidth(v); }}
                onBlur={() => setWidI(String(width))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">ft</span>
            </div>
          </div>
          <div className={sliderWrapCls}>
            <Slider min={5} max={40} step={1} value={[Math.min(width, 40)]}
              onValueChange={([v]) => { setWidth(v); setWidI(String(v)); }} className="h-3" />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>5 ft</span><span>20 ft</span><span>40 ft</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[9, 10, 18, 20, 24].map((v) => (
              <button key={v} type="button"
                onClick={() => { setWidth(v); setWidI(String(v)); }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${width === v ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"}`}>
                {v} ft
              </button>
            ))}
          </div>
        </div>

        {/* Finish */}
        <div className={cardCls}>
          <p className="text-sm font-semibold text-gray-700">Finish type</p>
          <p className="mt-0.5 text-xs text-gray-400">Affects labour cost estimate</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {FINISH_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => setFinish(opt.value)}
                className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${finish === opt.value ? "border-emerald-400 bg-emerald-50" : "border-gray-200 bg-gray-50 hover:border-emerald-200 hover:bg-emerald-50"}`}>
                <span className={`text-xs font-bold leading-snug ${finish === opt.value ? "text-emerald-800" : "text-gray-700"}`}>{opt.label}</span>
                <span className={`mt-0.5 text-[10px] ${finish === opt.value ? "text-emerald-600" : "text-gray-400"}`}>{opt.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reinforcement */}
        <div className={cardCls}>
          <p className="text-sm font-semibold text-gray-700">Reinforcement</p>
          <p className="mt-0.5 text-xs text-gray-400">Wire mesh is standard for most driveways</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {REINF_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => setReinf(opt.value)}
                className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${reinf === opt.value ? "border-emerald-400 bg-emerald-50" : "border-gray-200 bg-gray-50 hover:border-emerald-200 hover:bg-emerald-50"}`}>
                <span className={`text-xs font-bold leading-snug ${reinf === opt.value ? "text-emerald-800" : "text-gray-700"}`}>{opt.label}</span>
                <span className={`mt-0.5 text-[10px] ${reinf === opt.value ? "text-emerald-600" : "text-gray-400"}`}>{opt.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Old surface removal */}
        <div className={cardCls}>
          <p className="text-sm font-semibold text-gray-700">Existing surface removal</p>
          <p className="mt-0.5 text-xs text-gray-400">Include demolition cost if replacing an old driveway</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {REMOVAL_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => setRemoval(opt.value)}
                className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${removal === opt.value ? "border-orange-300 bg-orange-50" : "border-gray-200 bg-gray-50 hover:border-orange-200 hover:bg-orange-50"}`}>
                <span className={`text-xs font-bold leading-snug ${removal === opt.value ? "text-orange-800" : "text-gray-700"}`}>{opt.label}</span>
                <span className={`mt-0.5 text-[10px] ${removal === opt.value ? "text-orange-600" : "text-gray-400"}`}>{opt.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button type="button" onClick={() => setShowAdv((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <span>Adjust thickness, labour &amp; concrete price</span>
            <svg className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showAdv ? "rotate-180" : ""}`}
              viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {showAdv && (
            <div className="border-t border-gray-100 px-5 py-5 space-y-5">
              {[
                { id: "cdc-thick", label: "Slab thickness", sub: "Default: 4 in — use 6 in for heavy vehicles", val: thickI, unit: "in",
                  setter: (s: string) => { setThickI(s); const v = Math.max(2, Math.min(12, Number(s))); if (!isNaN(v)) setThickVal(v); },
                  blur: () => { const v = Math.max(2, Math.min(12, Number(thickI))); if (isNaN(v) || thickI === "") { setThickVal(4); setThickI("4"); } else setThickI(String(v)); },
                  prefix: false },
                { id: "cdc-labor", label: "Base labour (per sqft)", sub: "Default: $5/sqft — finish type adds on top", val: laborI, unit: "",
                  setter: (s: string) => { setLaborI(s); const v = Math.max(0, Number(s)); if (!isNaN(v)) setLaborVal(v); },
                  blur: () => { const v = Math.max(0, Number(laborI)); if (isNaN(v) || laborI === "") { setLaborVal(5); setLaborI("5"); } else setLaborI(String(v)); },
                  prefix: true },
                { id: "cdc-price", label: "Concrete price (per yd³)", sub: "Default: $150/yd³", val: priceI, unit: "",
                  setter: (s: string) => { setPriceI(s); const v = Math.max(0, Number(s)); if (!isNaN(v)) setPriceVal(v); },
                  blur: () => { const v = Math.max(0, Number(priceI)); if (isNaN(v) || priceI === "") { setPriceVal(150); setPriceI("150"); } else setPriceI(String(v)); },
                  prefix: true },
              ].map((f) => (
                <div key={f.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{f.label}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{f.sub}</p>
                  </div>
                  <div className="relative shrink-0">
                    {f.prefix && <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-bold text-gray-400">$</span>}
                    <input type="number" id={f.id} value={f.val}
                      onChange={(e) => f.setter(e.target.value)}
                      onBlur={f.blur}
                      className={`w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100 ${f.prefix ? "pl-7 pr-3" : "pl-3 pr-8 text-right"}`}
                    />
                    {!f.prefix && f.unit && <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">{f.unit}</span>}
                  </div>
                </div>
              ))}
              {/* Waste */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Waste factor</p>
                  <p className="mt-0.5 text-xs text-gray-400">Default: 10%</p>
                </div>
                <div className="relative shrink-0">
                  <input type="number" min={0} max={50} step={1} value={wasteI}
                    onChange={(e) => { setWasteI(e.target.value); const v = Math.max(0, Math.min(50, Number(e.target.value))); if (!isNaN(v)) setWastePct(v); }}
                    onBlur={() => { const v = Math.max(0, Math.min(50, Number(wasteI))); if (isNaN(v) || wasteI === "") { setWastePct(10); setWasteI("10"); } else setWasteI(String(v)); }}
                    className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-right text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">%</span>
                </div>
              </div>
              {(laborVal !== 5 || priceVal !== 150 || thickVal !== 4 || wastePct !== 10) && (
                <button type="button" onClick={() => { setLaborVal(5); setLaborI("5"); setPriceVal(150); setPriceI("150"); setThickVal(4); setThickI("4"); setWastePct(10); setWasteI("10"); }}
                  className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors">
                  Reset to defaults
                </button>
              )}
            </div>
          )}
        </div>

      </div>{/* /INPUTS */}

      {/* ── RESULT ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">

        {/* Total cost */}
        <div className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 ${flash ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Estimated Total Cost</p>
          <p className={`mt-2 text-5xl font-bold tracking-tight transition-colors duration-300 ${flash ? "text-emerald-600" : "text-gray-950"}`}>
            {fmt(totalCost)}
          </p>
          <p className="mt-1 mb-5 text-sm text-gray-400">
            &asymp; {fmt(Math.round(perSqft))} per sqft &middot; {sqft.toLocaleString()} sqft
          </p>

          {/* Donut */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <PieChart width={120} height={120}>
                <Pie data={chartData} cx={60} cy={60} innerRadius={36} outerRadius={54}
                  paddingAngle={2} dataKey="value" animationBegin={0} animationDuration={600} strokeWidth={0}>
                  {chartData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
                <Tooltip formatter={(v) => [fmt(Number(v)), ""]}
                  contentStyle={{ borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
              </PieChart>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[13px] font-bold leading-none text-gray-900">{pctMaterial}%</p>
                  <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-gray-400">material</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {chartData.map((entry) => (
                <div key={entry.name} className="flex items-start gap-2.5">
                  <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: entry.fill }} />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{entry.name}</p>
                    <p className="text-xs text-gray-400">{fmt(entry.value)} &middot; {totalCost > 0 ? Math.round((entry.value / totalCost) * 100) : 0}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost rows */}
          <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-500"><span className="h-2 w-2 rounded-full bg-emerald-400" />Concrete ({cubicYdsW.toFixed(2)} yd³)</span>
              <span className="font-semibold text-gray-700">{fmt(materialCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-500"><span className="h-2 w-2 rounded-full bg-blue-400" />Labour{finish !== "broom" || reinf !== "none" ? " + finish" : ""}</span>
              <span className="font-semibold text-gray-700">{fmt(laborCost)}</span>
            </div>
            {demolCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-500"><span className="h-2 w-2 rounded-full bg-amber-400" />Demolition / removal</span>
                <span className="font-semibold text-gray-700">{fmt(demolCost)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-2">
              <span className="text-sm font-semibold text-gray-700">Total installed</span>
              <span className="text-base font-bold text-orange-600">{fmt(totalCost)}</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-gray-400">
            US national averages 2026. Labour rates vary by region and contractor.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "Area", value: `${sqft.toLocaleString()} sqft`, sub: `${length} × ${width} ft` },
            { label: "Concrete", value: `${cubicYdsW.toFixed(2)} yd³`, sub: `incl. ${wastePct}% waste` },
            { label: "Thickness", value: `${thickVal} in`, sub: thickVal >= 6 ? "Heavy vehicle" : "Standard" },
            { label: "Per sqft", value: fmt(Math.round(perSqft)), sub: "installed" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{s.label}</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Formula */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">How it&apos;s calculated</p>
          <p className="text-xs leading-relaxed text-gray-500">
            Volume (yd³) = Length &times; Width &times; (Thickness ÷ 12) ÷ 27
            <br /><br />
            Material cost = volume with waste &times; price per yd³<br />
            Labour cost = sqft &times; (base rate + finish + reinforcement)<br />
            {demolCost > 0 && "Demolition = sqft × removal rate per sqft"}
          </p>
        </div>

      </div>
    </div>
  );
}
