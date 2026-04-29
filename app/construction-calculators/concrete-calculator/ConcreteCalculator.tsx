"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export type Region = "US" | "UK";

export default function ConcreteCalculator({ region }: { region: Region }) {
  const isUS = region === "US";

  // ── Labels & units ─────────────────────────────────────────────────────
  const depthLabel = isUS ? "Thickness" : "Depth";
  const lenUnit    = isUS ? "ft"        : "m";
  const depUnit    = isUS ? "in"        : "m";
  const volUnit    = isUS ? "cu yd"     : "m³";
  const bagLabel   = isUS ? "80 lb bags" : "25 kg bags";
  const depHint    = isUS
    ? "Enter in inches — we convert automatically"
    : "Typical slab is 0.10–0.15 m (100–150 mm)";

  // ── Slider config ──────────────────────────────────────────────────────
  const lenMax  = isUS ? 100  : 30;
  const lenStep = isUS ? 1    : 0.1;
  const depMin  = isUS ? 1    : 0.05;
  const depMax  = isUS ? 24   : 0.5;
  const depStep = isUS ? 1    : 0.01;

  // ── Default values ─────────────────────────────────────────────────────
  const lenDefault = isUS ? 12  : 4;
  const widDefault = isUS ? 10  : 3;
  const depDefault = isUS ? 4   : 0.1;

  // Formats a dimension value for display in the text input
  const fmtN = (v: number) => (isUS ? String(v) : v.toFixed(2));

  // ── State ──────────────────────────────────────────────────────────────
  const [length,       setLength]       = useState(lenDefault);
  const [width,        setWidth]        = useState(widDefault);
  const [depth,        setDepth]        = useState(depDefault);
  const [lenI,         setLenI]         = useState(fmtN(lenDefault));
  const [widI,         setWidI]         = useState(fmtN(widDefault));
  const [depI,         setDepI]         = useState(fmtN(depDefault));
  const [flash,        setFlash]        = useState(false);
  // ── Advanced overrides (collapsed by default) ──────────────────────────
  const defaultRate                     = isUS ? 150 : 110;
  const [showAdv,      setShowAdv]      = useState(false);
  const [priceI,       setPriceI]       = useState(String(defaultRate));
  const [priceVal,     setPriceVal]     = useState(defaultRate);
  const [wasteI,       setWasteI]       = useState("10");
  const [wastePct,     setWastePct]     = useState(10);

  // ── Calculation ────────────────────────────────────────────────────────
  // US:  ft × ft × (in ÷ 12) ÷ 27  = cubic yards
  // UK:  m  × m  × m               = cubic metres
  const volume = isUS
    ? (length * width * (depth / 12)) / 27
    : length * width * depth;

  const wasteFactor = 1 + wastePct / 100;
  // US: 80 lb bag ≈ 0.45 cu ft → 27 cu ft/cu yd ÷ 0.45 = 60 bags per cu yd
  // UK: 25 kg bag ≈ 0.012 m³
  const bags  = isUS ? Math.ceil(volume * 60)            : Math.ceil(volume / 0.012);
  const volW  = volume * wasteFactor;
  const bagsW = isUS ? Math.ceil(volW * 60)              : Math.ceil(volW / 0.012);

  // Material cost estimate (waste-adjusted volume × effective rate)
  const sym  = isUS ? "$" : "£";
  const cost = Math.round(volW * priceVal);

  const fmtV = (v: number) => (isUS ? v.toFixed(2) : v.toFixed(3));

  // ── Flash on result change ─────────────────────────────────────────────
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  }, [length, width, depth, priceVal, wastePct]);

  const quickDepths = isUS ? [2, 4, 6, 8, 12] : [0.08, 0.1, 0.15, 0.2, 0.3];

  // ── Shared class strings ───────────────────────────────────────────────
  const cardCls =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg";
  const inputCls =
    "w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-10 text-right text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100";
  const sliderWrapCls =
    "mt-5 **:[[role=slider]]:h-5 **:[[role=slider]]:w-5 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:hover:scale-[1.1] **:[[role=slider]]:active:scale-[1.15] **:[[role=slider]]:active:cursor-grabbing";

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">

      {/* ── INPUTS ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">

        {/* Length */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="cc-length" className="block text-sm font-semibold text-gray-700">
                Length
              </label>
              <p className="mt-0.5 text-xs text-gray-400">Slab or pour length</p>
            </div>
            <div className="relative">
              <input
                id="cc-length"
                type="number"
                min={0.1}
                max={lenMax}
                step={lenStep}
                value={lenI}
                onChange={(e) => {
                  setLenI(e.target.value);
                  const v = Math.max(0.1, Math.min(lenMax, Number(e.target.value)));
                  if (!isNaN(v)) setLength(v);
                }}
                onBlur={() => setLenI(fmtN(length))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">
                {lenUnit}
              </span>
            </div>
          </div>
          <div className={sliderWrapCls}>
            <Slider
              min={0.1}
              max={lenMax}
              step={lenStep}
              value={[length]}
              onValueChange={([v]) => { setLength(v); setLenI(fmtN(v)); }}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>{lenMax / 2} {lenUnit}</span>
              <span>{lenMax} {lenUnit}</span>
            </div>
          </div>
        </div>

        {/* Width */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="cc-width" className="block text-sm font-semibold text-gray-700">
                Width
              </label>
              <p className="mt-0.5 text-xs text-gray-400">Slab or pour width</p>
            </div>
            <div className="relative">
              <input
                id="cc-width"
                type="number"
                min={0.1}
                max={lenMax}
                step={lenStep}
                value={widI}
                onChange={(e) => {
                  setWidI(e.target.value);
                  const v = Math.max(0.1, Math.min(lenMax, Number(e.target.value)));
                  if (!isNaN(v)) setWidth(v);
                }}
                onBlur={() => setWidI(fmtN(width))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">
                {lenUnit}
              </span>
            </div>
          </div>
          <div className={sliderWrapCls}>
            <Slider
              min={0.1}
              max={lenMax}
              step={lenStep}
              value={[width]}
              onValueChange={([v]) => { setWidth(v); setWidI(fmtN(v)); }}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>{lenMax / 2} {lenUnit}</span>
              <span>{lenMax} {lenUnit}</span>
            </div>
          </div>
        </div>

        {/* Thickness / Depth — has quick-pick chips */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="cc-depth" className="block text-sm font-semibold text-gray-700">
                {depthLabel}
              </label>
              <p className="mt-0.5 text-xs text-gray-400">{depHint}</p>
            </div>
            <div className="relative">
              <input
                id="cc-depth"
                type="number"
                min={depMin}
                max={depMax}
                step={depStep}
                value={depI}
                onChange={(e) => {
                  setDepI(e.target.value);
                  const v = Math.max(depMin, Math.min(depMax, Number(e.target.value)));
                  if (!isNaN(v)) setDepth(v);
                }}
                onBlur={() => setDepI(fmtN(depth))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">
                {depUnit}
              </span>
            </div>
          </div>

          <div className="mt-4 **:[[role=slider]]:h-4 **:[[role=slider]]:w-4 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:active:cursor-grabbing">
            <Slider
              min={depMin}
              max={depMax}
              step={depStep}
              value={[depth]}
              onValueChange={([v]) => { setDepth(v); setDepI(fmtN(v)); }}
            />
            <div className="mt-1.5 flex justify-between text-xs text-gray-400">
              <span>{depMin} {depUnit}</span>
              <span>{depMax} {depUnit}</span>
            </div>
          </div>

          {/* Quick-pick chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {quickDepths.map((qd) => (
              <button
                key={qd}
                type="button"
                onClick={() => { setDepth(qd); setDepI(fmtN(qd)); }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${
                  Math.abs(depth - qd) < 0.001
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {fmtN(qd)} {depUnit}
              </button>
            ))}
          </div>
        </div>

        {/* ── Advanced: price & waste override ──────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdv((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span>Adjust price &amp; waste</span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showAdv ? "rotate-180" : ""}`}
              viewBox="0 0 12 12" fill="none" aria-hidden="true"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showAdv && (
            <div className="border-t border-gray-100 px-5 py-5 space-y-5">
              {/* Price per unit */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Price per {volUnit}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Default: {sym}{defaultRate}
                  </p>
                </div>
                <div className="relative shrink-0">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-bold text-gray-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={priceI}
                    onChange={(e) => {
                      setPriceI(e.target.value);
                      const v = Math.max(0, Number(e.target.value));
                      if (!isNaN(v)) setPriceVal(v);
                    }}
                    onBlur={() => {
                      const v = Math.max(0, Number(priceI));
                      if (isNaN(v) || priceI === "") { setPriceVal(defaultRate); setPriceI(String(defaultRate)); }
                      else setPriceI(String(v));
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
                    type="number"
                    min={0}
                    max={50}
                    step={1}
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

              {(priceVal !== defaultRate || wastePct !== 10) && (
                <button
                  type="button"
                  onClick={() => {
                    setPriceVal(defaultRate); setPriceI(String(defaultRate));
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
      </div>

      {/* ── RESULT ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">

        {/* Volume card */}
        <div
          className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 ${
            flash ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Concrete Volume
          </p>
          <p
            className={`mt-3 text-5xl font-bold tracking-tight transition-colors duration-300 ${
              flash ? "text-emerald-600" : "text-gray-950"
            }`}
          >
            {fmtV(volume)}
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-400">{volUnit}</p>

          {/* Live summary sentence */}
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-800">
            Your{" "}
            <strong>
              {isUS ? `${length} × ${width} ft` : `${fmtN(length)} × ${fmtN(width)} m`}
            </strong>{" "}
            slab at{" "}
            <strong>{isUS ? `${depth} in` : `${fmtN(depth)} m`}</strong> thick needs{" "}
            <strong>{fmtV(volume)} {volUnit}</strong> — order{" "}
            <strong>{bagsW} {bagLabel}</strong> with {wastePct}% waste included.
          </p>

          <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Bags (exact)</p>
              <p className="text-base font-bold text-gray-900">
                {bags}{" "}
                <span className="text-xs font-normal text-gray-400">{bagLabel}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">With {wastePct}% waste</p>
              <p className="text-sm font-semibold text-gray-700">{bagsW} bags</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Volume + 10%</p>
              <p className="text-sm font-semibold text-gray-700">
                {fmtV(volW)} {volUnit}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <p className="text-sm text-gray-500">Est. material cost</p>
              <p className="text-base font-bold text-emerald-700">
                {sym}{cost.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-snug text-gray-400">
            Prices vary by location and supplier. This is a rough estimate.
          </p>
        </div>

        {/* Ready-mix suggestion */}
        {isUS && volume > 1.5 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">Consider ready-mix at this volume</p>
            <p className="mt-1.5 text-xs leading-relaxed text-amber-700">
              At {fmtV(volume)} cu yd, ready-mix concrete is usually cheaper and faster than
              mixing {bagsW} bags by hand. Expect $120–200/yd plus a delivery fee.
            </p>
          </div>
        )}
        {!isUS && volume > 1.15 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">Consider ready-mix at this volume</p>
            <p className="mt-1.5 text-xs leading-relaxed text-amber-700">
              At {fmtV(volume)} m³, ordering ready-mix is typically more cost-effective than
              mixing {bagsW} bags by hand.
            </p>
          </div>
        )}

        {/* Formula card */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            How it&apos;s calculated
          </p>
          {isUS ? (
            <p className="text-xs leading-relaxed text-gray-500">
              Volume = Length × Width × (Thickness ÷ 12) ÷ 27
              <br /><br />
              ÷ 12 converts inches to feet.
              <br />
              ÷ 27 converts cubic feet to cubic yards.
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-gray-500">
              Volume = Length × Width × Depth
              <br /><br />
              All measurements in metres.
              <br />
              Result is in cubic metres (m³).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
