"use client";

import { useState, useEffect, useRef } from "react";

function calculateDecimalHours(hours: number, minutes: number): number {
  return Math.round((hours + minutes / 60) * 100) / 100;
}

function fmt(n: number) {
  return n.toFixed(2);
}

const QUICK_EXAMPLES = [
  { h: 1,  m: 15, label: "1h 15m" },
  { h: 1,  m: 30, label: "1h 30m" },
  { h: 2,  m: 45, label: "2h 45m" },
  { h: 7,  m: 15, label: "7h 15m" },
  { h: 8,  m: 0,  label: "8h 00m" },
];

export default function HoursToDecimalCalculator() {
  const [hours, setHours]     = useState(7);
  const [minutes, setMinutes] = useState(30);
  const [flashing, setFlashing] = useState(false);
  const prevResult = useRef<number | null>(null);

  const result = calculateDecimalHours(hours, minutes);

  useEffect(() => {
    if (prevResult.current !== null && prevResult.current !== result) {
      setFlashing(true);
      const t = setTimeout(() => setFlashing(false), 400);
      return () => clearTimeout(t);
    }
    prevResult.current = result;
  }, [result]);

  function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val));
  }

  function handleHours(raw: string) {
    const n = parseInt(raw, 10);
    setHours(isNaN(n) ? 0 : clamp(n, 0, 999));
  }

  function handleMinutes(raw: string) {
    const n = parseInt(raw, 10);
    setMinutes(isNaN(n) ? 0 : clamp(n, 0, 59));
  }

  function applyQuick(h: number, m: number) {
    setHours(h);
    setMinutes(m);
  }

  return (
    <div className="space-y-4">

      {/* Result display */}
      <div
        className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
          flashing
            ? "border-emerald-400 bg-emerald-50"
            : "border-gray-200 bg-white"
        } shadow-sm`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Decimal hours
        </p>
        <p
          className={`mt-2 text-[clamp(3rem,10vw,5rem)] font-bold leading-none tracking-[-0.04em] transition-colors duration-300 ${
            flashing ? "text-emerald-500" : "text-gray-950"
          }`}
        >
          {fmt(result)}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {hours}h {minutes}m = <span className="font-semibold text-gray-700">{fmt(result)} hours</span>
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Hours
          </label>
          <input
            type="number"
            min={0}
            max={999}
            value={hours}
            onChange={(e) => handleHours(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-2xl font-bold text-gray-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Minutes <span className="normal-case font-normal text-gray-400">(0–59)</span>
          </label>
          <input
            type="number"
            min={0}
            max={59}
            value={minutes}
            onChange={(e) => handleMinutes(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-2xl font-bold text-gray-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      {/* Quick picks */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Quick pick
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => applyQuick(ex.h, ex.m)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                hours === ex.h && minutes === ex.m
                  ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Formula</p>
        <p className="mt-1.5 font-mono text-sm text-gray-700">
          {hours} + ({minutes} ÷ 60) = <span className="font-bold text-gray-950">{fmt(result)}</span>
        </p>
      </div>

    </div>
  );
}
