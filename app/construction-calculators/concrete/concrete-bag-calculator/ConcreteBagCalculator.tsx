"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

// Bag sizes: label, weight, cubic-yard yield
const BAG_SIZES = [
  { label: "40 lb", weight: 40, yardYield: 0.011 },
  { label: "60 lb", weight: 60, yardYield: 0.017 },
  { label: "80 lb", weight: 80, yardYield: 0.022 },
] as const;

type BagWeight = 40 | 60 | 80;

const DEFAULT_RATE = 150; // $ per cubic yard

export default function ConcreteBagCalculator() {
  // ── Inputs ─────────────────────────────────────────────────────────────
  const [length,   setLength]   = useState(12);
  const [width,    setWidth]    = useState(10);
  const [depth,    setDepth]    = useState(4);     // inches
  const [lenI,     setLenI]     = useState("12");
  const [widI,     setWidI]     = useState("10");
  const [depI,     setDepI]     = useState("4");
  const [waste,    setWaste]    = useState(5);     // % — default 5%
  const [wasteI,   setWasteI]   = useState("5");
  const [bagWeight, setBagWeight] = useState<BagWeight>(80);

  // ── Advanced panel ─────────────────────────────────────────────────────
  const [showAdv,  setShowAdv]  = useState(false);
  const [rateI,    setRateI]    = useState(String(DEFAULT_RATE));
  const [rate,     setRate]     = useState(DEFAULT_RATE);

  // ── Flash ──────────────────────────────────────────────────────────────
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  }, [length, width, depth, waste, bagWeight, rate]);

  // ── Calculation ────────────────────────────────────────────────────────
  // (L ft × W ft × D in ÷ 12) ÷ 27 = cubic yards
  const volumeYd   = (length * width * (depth / 12)) / 27;
  const adjustedYd = volumeYd * (1 + waste / 100);

  const bagSize     = BAG_SIZES.find((b) => b.weight === bagWeight)!;
  const bagsNeeded  = Math.ceil(adjustedYd / bagSize.yardYield);
  const costEst     = Math.round(adjustedYd * rate);

  const isChanged = rate !== DEFAULT_RATE || waste !== 5;

  // ── Helpers ────────────────────────────────────────────────────────────
  function syncDim(
    raw: string,
    setter: (n: number) => void,
    setSI: (s: string) => void,
    min: number,
    max: number,
  ) {
    setSI(raw);
    const n = parseFloat(raw);
    if (!isNaN(n) && n >= min && n <= max) setter(n);
  }

  const quickDepths = [2, 3, 4, 6, 8];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* ── INPUTS ──────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Length */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Length <span className="font-normal text-gray-400">(ft)</span>
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={lenI}
                onChange={(e) => syncDim(e.target.value, setLength, setLenI, 1, 500)}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={1} max={200} step={1}
              value={[length]}
              onValueChange={([v]) => { setLength(v); setLenI(String(v)); }}
              className="mt-3"
            />
          </div>

          {/* Width */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Width <span className="font-normal text-gray-400">(ft)</span>
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={widI}
                onChange={(e) => syncDim(e.target.value, setWidth, setWidI, 1, 500)}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={1} max={100} step={1}
              value={[width]}
              onValueChange={([v]) => { setWidth(v); setWidI(String(v)); }}
              className="mt-3"
            />
          </div>

          {/* Depth */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Thickness <span className="font-normal text-gray-400">(in)</span>
              </label>
              <input
                type="number"
                min={1}
                max={24}
                value={depI}
                onChange={(e) => syncDim(e.target.value, setDepth, setDepI, 1, 24)}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={1} max={24} step={1}
              value={[depth]}
              onValueChange={([v]) => { setDepth(v); setDepI(String(v)); }}
              className="mt-3"
            />
            {/* Quick-select thickness chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {quickDepths.map((d) => (
                <button
                  key={d}
                  onClick={() => { setDepth(d); setDepI(String(d)); }}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    depth === d
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  {d}&Prime;
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">Enter in inches — we convert automatically</p>
          </div>

          {/* Bag size selector */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Bag size</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {BAG_SIZES.map((b) => (
                <button
                  key={b.weight}
                  onClick={() => setBagWeight(b.weight as BagWeight)}
                  className={`rounded-xl border py-2 text-sm font-semibold transition-colors ${
                    bagWeight === b.weight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced toggle */}
          <div>
            <button
              onClick={() => setShowAdv((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              <svg
                className={`h-3.5 w-3.5 transition-transform ${showAdv ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              Adjust waste &amp; price
            </button>

            {showAdv && (
              <div className="mt-4 space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                {/* Waste % */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600">Waste factor (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={wasteI}
                      onChange={(e) => {
                        setWasteI(e.target.value);
                        const n = parseFloat(e.target.value);
                        if (!isNaN(n) && n >= 0 && n <= 50) setWaste(n);
                      }}
                      className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-right text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                {/* Rate */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600">
                      Rate ($ per cu&nbsp;yd)
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={500}
                      value={rateI}
                      onChange={(e) => {
                        setRateI(e.target.value);
                        const n = parseFloat(e.target.value);
                        if (!isNaN(n) && n >= 50 && n <= 500) setRate(n);
                      }}
                      className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                {isChanged && (
                  <button
                    onClick={() => {
                      setWaste(5); setWasteI("5");
                      setRate(DEFAULT_RATE); setRateI(String(DEFAULT_RATE));
                    }}
                    className="text-xs font-semibold text-gray-400 underline hover:text-gray-600"
                  >
                    Reset to defaults
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── RESULTS ─────────────────────────────────────────────────── */}
        <div
          className={`flex flex-col justify-start gap-4 transition-opacity duration-300 ${
            flash ? "opacity-60" : "opacity-100"
          }`}
        >
          {/* Volume card */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Total volume
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              {volumeYd.toFixed(2)}
              <span className="ml-1.5 text-lg font-normal text-gray-400">cu&nbsp;yd</span>
            </p>
            <p className="mt-1 text-xs text-gray-400">
              +{waste}% waste → {adjustedYd.toFixed(2)} cu&nbsp;yd to order
            </p>

            {/* Live summary sentence */}
            <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-800">
              Your <strong>{length} × {width} ft</strong> slab at{" "}
              <strong>{depth} in</strong> thick needs{" "}
              <strong>{volumeYd.toFixed(2)} cu yd</strong> — order{" "}
              <strong>{bagsNeeded} × {bagSize.label}</strong> bags with {waste}% waste included.
            </p>
          </div>

          {/* Bags card */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
              {bagSize.label} bags needed
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-700">
              {bagsNeeded}
            </p>
            <p className="mt-1 text-xs text-emerald-600/70">
              Includes {waste}% waste allowance
            </p>
          </div>

          {/* Cost card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Est. material cost
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              ${costEst.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Based on ${rate}/cu&nbsp;yd · adjust above
            </p>
          </div>

          {/* Bag comparison table */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
              All bag sizes at this volume
            </p>
            <div className="space-y-2">
              {BAG_SIZES.map((b) => {
                const n = Math.ceil(adjustedYd / b.yardYield);
                return (
                  <div key={b.weight} className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                    b.weight === bagWeight ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-white"
                  }`}>
                    <span className={`text-sm font-semibold ${
                      b.weight === bagWeight ? "text-emerald-700" : "text-gray-600"
                    }`}>{b.label}</span>
                    <span className={`text-sm font-bold ${
                      b.weight === bagWeight ? "text-emerald-700" : "text-gray-900"
                    }`}>{n} bags</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ready-mix suggestion */}
          {volumeYd > 1.5 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">Consider ready-mix at this volume</p>
              <p className="mt-1.5 text-xs leading-relaxed text-amber-700">
                At {volumeYd.toFixed(2)} cu yd, ready-mix concrete is usually cheaper and faster
                than mixing {bagsNeeded} bags by hand. Expect $120–200/yd plus a delivery fee.
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs leading-relaxed text-gray-400">
            This calculator provides estimates only and should be used for planning
            purposes. Actual quantities and costs may vary.
          </p>
        </div>
      </div>
    </div>
  );
}
