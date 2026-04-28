"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

// UK bag sizes: label, kg weight, m³ yield
const BAG_SIZES = [
  { label: "20 kg", kg: 20, m3Yield: 0.0095 },
  { label: "25 kg", kg: 25, m3Yield: 0.012  },
] as const;

type BagKg = 20 | 25;

const DEFAULT_RATE = 110; // £ per m³

export default function ConcreteBagCalculatorUK() {
  // ── Inputs (all in metres) ──────────────────────────────────────────────
  const [length,   setLength]   = useState(3);
  const [width,    setWidth]    = useState(2);
  const [depth,    setDepth]    = useState(0.1);   // m — default 100 mm
  const [lenI,     setLenI]     = useState("3.00");
  const [widI,     setWidI]     = useState("2.00");
  const [depI,     setDepI]     = useState("0.10");
  const [waste,    setWaste]    = useState(5);     // % — default 5%
  const [wasteI,   setWasteI]   = useState("5");
  const [bagKg,    setBagKg]    = useState<BagKg>(25);

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
  }, [length, width, depth, waste, bagKg, rate]);

  // ── Calculation ────────────────────────────────────────────────────────
  // L(m) × W(m) × D(m) = m³
  const volumeM3    = length * width * depth;
  const adjustedM3  = volumeM3 * (1 + waste / 100);

  const bagSize    = BAG_SIZES.find((b) => b.kg === bagKg)!;
  const bagsNeeded = Math.ceil(adjustedM3 / bagSize.m3Yield);
  const costEst    = Math.round(adjustedM3 * rate);

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

  // Quick-select depth chips (mm values → converted to m)
  const quickDepths: { label: string; val: number }[] = [
    { label: "75 mm",  val: 0.075 },
    { label: "100 mm", val: 0.10  },
    { label: "125 mm", val: 0.125 },
    { label: "150 mm", val: 0.15  },
    { label: "200 mm", val: 0.20  },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* ── INPUTS ──────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Length */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Length <span className="font-normal text-gray-400">(m)</span>
              </label>
              <input
                type="number"
                min={0.1}
                max={100}
                step={0.1}
                value={lenI}
                onChange={(e) => syncDim(e.target.value, setLength, setLenI, 0.1, 100)}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={0.5} max={50} step={0.1}
              value={[length]}
              onValueChange={([v]) => { setLength(v); setLenI(v.toFixed(2)); }}
              className="mt-3"
            />
          </div>

          {/* Width */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Width <span className="font-normal text-gray-400">(m)</span>
              </label>
              <input
                type="number"
                min={0.1}
                max={100}
                step={0.1}
                value={widI}
                onChange={(e) => syncDim(e.target.value, setWidth, setWidI, 0.1, 100)}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={0.5} max={30} step={0.1}
              value={[width]}
              onValueChange={([v]) => { setWidth(v); setWidI(v.toFixed(2)); }}
              className="mt-3"
            />
          </div>

          {/* Depth */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Depth <span className="font-normal text-gray-400">(m)</span>
              </label>
              <input
                type="number"
                min={0.05}
                max={0.5}
                step={0.005}
                value={depI}
                onChange={(e) => syncDim(e.target.value, setDepth, setDepI, 0.05, 0.5)}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={0.05} max={0.5} step={0.005}
              value={[depth]}
              onValueChange={([v]) => { setDepth(v); setDepI(v.toFixed(3)); }}
              className="mt-3"
            />
            {/* Quick-select depth chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {quickDepths.map(({ label, val }) => (
                <button
                  key={label}
                  onClick={() => { setDepth(val); setDepI(val.toFixed(3)); }}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    Math.abs(depth - val) < 0.0001
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Tip: drawings show depth in mm — divide by 1,000 to get metres
            </p>
          </div>

          {/* Bag size selector */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Bag size</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {BAG_SIZES.map((b) => (
                <button
                  key={b.kg}
                  onClick={() => setBagKg(b.kg as BagKg)}
                  className={`rounded-xl border py-2 text-sm font-semibold transition-colors ${
                    bagKg === b.kg
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
                      Rate (£ per m³)
                    </label>
                    <input
                      type="number"
                      min={30}
                      max={500}
                      value={rateI}
                      onChange={(e) => {
                        setRateI(e.target.value);
                        const n = parseFloat(e.target.value);
                        if (!isNaN(n) && n >= 30 && n <= 500) setRate(n);
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
              {volumeM3.toFixed(3)}
              <span className="ml-1.5 text-lg font-normal text-gray-400">m³</span>
            </p>
            <p className="mt-1 text-xs text-gray-400">
              +{waste}% waste → {adjustedM3.toFixed(3)} m³ to order
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
              £{costEst.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Based on £{rate}/m³ · adjust above
            </p>
          </div>

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
