"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

// ── Config ─────────────────────────────────────────────────────────────────

export type BlockRegion = "US" | "UK";

interface BlockSizeOption {
  label: string;
  /** face area in square feet (US) or square metres (UK) */
  faceArea: number;
}

const BLOCK_SIZES_US: BlockSizeOption[] = [
  { label: '8" × 8" × 16"',  faceArea: (16 / 12) * (8 / 12) },   // ≈ 0.8889 sq ft
  { label: '8" × 4" × 16"',  faceArea: (16 / 12) * (4 / 12) },   // ≈ 0.4444 sq ft
  { label: '12" × 8" × 16"', faceArea: (16 / 12) * (8 / 12) },   // same face area
];

const BLOCK_SIZES_UK: BlockSizeOption[] = [
  { label: "440 × 215 mm",   faceArea: 0.44 * 0.215 },           // ≈ 0.0946 m²
  { label: "440 × 140 mm",   faceArea: 0.44 * 0.14  },           // ≈ 0.0616 m²
  { label: "390 × 190 mm",   faceArea: 0.39 * 0.19  },           // ≈ 0.0741 m²
];

const DEFAULT_WASTE   = 5;   // %
const DEFAULT_RATE_US = 3;   // $ per block
const DEFAULT_RATE_UK = 2;   // £ per block

// ── Component ──────────────────────────────────────────────────────────────

interface Props {
  region: BlockRegion;
}

export default function ConcreteBlockCalculator({ region }: Props) {
  const isUS = region === "US";

  const blockSizes    = isUS ? BLOCK_SIZES_US : BLOCK_SIZES_UK;
  const defaultRate   = isUS ? DEFAULT_RATE_US : DEFAULT_RATE_UK;
  const currency      = isUS ? "$" : "£";
  const areaUnit      = isUS ? "sq ft" : "m²";
  const lengthUnit    = isUS ? "ft" : "m";
  const heightUnit    = isUS ? "ft" : "m";

  // ── Inputs ──────────────────────────────────────────────────────────────
  const [length,      setLength]      = useState(isUS ? 20 : 6);
  const [height,      setHeight]      = useState(isUS ? 8  : 2.4);
  const [lenI,        setLenI]        = useState(isUS ? "20" : "6");
  const [htI,         setHtI]         = useState(isUS ? "8"  : "2.4");
  const [blockIdx,    setBlockIdx]    = useState(0);
  const [waste,       setWaste]       = useState(DEFAULT_WASTE);
  const [wasteI,      setWasteI]      = useState(String(DEFAULT_WASTE));

  // ── Advanced panel ───────────────────────────────────────────────────────
  const [showAdv,     setShowAdv]     = useState(false);
  const [rate,        setRate]        = useState(defaultRate);
  const [rateI,       setRateI]       = useState(String(defaultRate));

  // Reset all state when region prop changes (shouldn't happen mid-session, but safety net)
  useEffect(() => {
    setLength(isUS ? 20 : 6);
    setHeight(isUS ? 8 : 2.4);
    setLenI(isUS ? "20" : "6");
    setHtI(isUS ? "8" : "2.4");
    setBlockIdx(0);
    setWaste(DEFAULT_WASTE);
    setWasteI(String(DEFAULT_WASTE));
    setRate(defaultRate);
    setRateI(String(defaultRate));
    setShowAdv(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  // ── Flash ────────────────────────────────────────────────────────────────
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  }, [length, height, blockIdx, waste, rate]);

  // ── Calculation ──────────────────────────────────────────────────────────
  const wallArea      = length * height;
  const blockFaceArea = blockSizes[blockIdx].faceArea;
  const rawBlocks     = wallArea / blockFaceArea;
  const blocksNeeded  = Math.ceil(rawBlocks * (1 + waste / 100));
  const costEst       = Math.round(blocksNeeded * rate);

  const isChanged = rate !== defaultRate || waste !== DEFAULT_WASTE;

  // ── Helpers ──────────────────────────────────────────────────────────────
  function syncDim(
    raw: string,
    setter: (n: number) => void,
    setI: (s: string) => void,
    min: number,
    max: number,
  ) {
    setI(raw);
    const n = parseFloat(raw);
    if (!isNaN(n) && n >= min && n <= max) setter(n);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-2">

        {/* ── INPUTS ────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Length */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Wall length{" "}
                <span className="font-normal text-gray-400">({lengthUnit})</span>
              </label>
              <input
                type="number"
                min={0.1}
                max={isUS ? 500 : 200}
                step={isUS ? 1 : 0.1}
                value={lenI}
                onChange={(e) =>
                  syncDim(e.target.value, setLength, setLenI, 0.1, isUS ? 500 : 200)
                }
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={isUS ? 1 : 0.5}
              max={isUS ? 100 : 50}
              step={isUS ? 1 : 0.5}
              value={[length]}
              onValueChange={([v]) => { setLength(v); setLenI(String(v)); }}
              className="mt-3"
            />
          </div>

          {/* Height */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Wall height{" "}
                <span className="font-normal text-gray-400">({heightUnit})</span>
              </label>
              <input
                type="number"
                min={0.1}
                max={isUS ? 30 : 10}
                step={isUS ? 1 : 0.1}
                value={htI}
                onChange={(e) =>
                  syncDim(e.target.value, setHeight, setHtI, 0.1, isUS ? 30 : 10)
                }
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <Slider
              min={isUS ? 1 : 0.5}
              max={isUS ? 20 : 6}
              step={isUS ? 1 : 0.1}
              value={[height]}
              onValueChange={([v]) => { setHeight(v); setHtI(String(v)); }}
              className="mt-3"
            />
          </div>

          {/* Block size */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Block size</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {blockSizes.map((b, i) => (
                <button
                  key={b.label}
                  onClick={() => setBlockIdx(i)}
                  className={`rounded-xl border py-2 text-xs font-semibold transition-colors ${
                    blockIdx === i
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
                    <label className="text-xs font-semibold text-gray-600">
                      Waste factor (%)
                    </label>
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
                      Cost per block ({currency})
                    </label>
                    <input
                      type="number"
                      min={0.1}
                      max={isUS ? 50 : 50}
                      step={0.1}
                      value={rateI}
                      onChange={(e) => {
                        setRateI(e.target.value);
                        const n = parseFloat(e.target.value);
                        if (!isNaN(n) && n >= 0.1 && n <= 50) setRate(n);
                      }}
                      className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                {isChanged && (
                  <button
                    onClick={() => {
                      setWaste(DEFAULT_WASTE); setWasteI(String(DEFAULT_WASTE));
                      setRate(defaultRate); setRateI(String(defaultRate));
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

        {/* ── RESULTS ───────────────────────────────────────────────── */}
        <div
          className={`flex flex-col justify-start gap-4 transition-opacity duration-300 ${
            flash ? "opacity-60" : "opacity-100"
          }`}
        >
          {/* Wall area card */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Wall area
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              {wallArea.toFixed(isUS ? 1 : 2)}
              <span className="ml-1.5 text-lg font-normal text-gray-400">{areaUnit}</span>
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {length} × {height} {lengthUnit}
            </p>
          </div>

          {/* Blocks card */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
              Blocks required
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-700">
              {blocksNeeded}
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
              {currency}{costEst.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Based on {currency}{rate.toFixed(2)} per block · adjust above
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
