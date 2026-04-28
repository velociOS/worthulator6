"use client";

import { useState } from "react";
import { US_STATES } from "@/lib/pi/data";

interface Props {
  state: string;
  policyLimit: number;
  onChange: (updates: { state?: string; policyLimit?: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

const POLICY_PRESETS = [
  { label: "$15,000", value: 15_000 },
  { label: "$25,000", value: 25_000 },
  { label: "$50,000", value: 50_000 },
  { label: "$100,000", value: 100_000 },
  { label: "$250,000", value: 250_000 },
  { label: "$500,000", value: 500_000 },
  { label: "$1M+", value: 1_000_000 },
  { label: "Unknown", value: 0 },
];

function parse(str: string): number {
  const cleaned = str.replace(/[^0-9]/g, "");
  return cleaned === "" ? 0 : parseInt(cleaned, 10);
}

export default function InsuranceStep({
  state,
  policyLimit,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState(
    policyLimit > 0 ? policyLimit.toLocaleString("en-US") : ""
  );

  const canProceed = state !== "";

  function handlePreset(value: number) {
    setCustomMode(false);
    onChange({ policyLimit: value });
  }

  function handleCustomChange(raw: string) {
    setCustomInput(raw.replace(/[^0-9,]/g, ""));
    onChange({ policyLimit: parse(raw) });
  }

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 5 of 5
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Insurance & jurisdiction
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Your state and the at-fault party's policy limit both affect what you
          can realistically recover.
        </p>

        {/* State */}
        <div className="mb-8">
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Which state did the incident occur in?
          </label>
          <p className="mb-3 text-xs text-slate-400">
            Jurisdiction significantly affects jury award tendencies and damage
            cap rules.
          </p>
          <select
            value={state}
            onChange={(e) => onChange({ state: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          >
            <option value="">— Select state —</option>
            {US_STATES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Policy limit */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            At-fault party's insurance policy limit
          </label>
          <p className="mb-3 text-xs text-slate-400">
            If the at-fault party's policy limit is lower than your damages, it
            caps your recovery unless additional coverage exists. Select
            "Unknown" if you don't know yet.
          </p>

          <div className="flex flex-wrap gap-2">
            {POLICY_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePreset(preset.value)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  !customMode && policyLimit === preset.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustomMode(true)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                customMode
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              Custom
            </button>
          </div>

          {customMode && (
            <div className="mt-3 flex items-center rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400">
              <span className="pl-4 text-sm font-semibold text-slate-400">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={customInput}
                placeholder="Enter policy limit"
                onChange={(e) => handleCustomChange(e.target.value)}
                className="w-full bg-transparent px-2 py-3 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-300"
              />
            </div>
          )}

          {policyLimit === 0 && !customMode && (
            <p className="mt-2 text-xs text-slate-400">
              With an unknown policy limit, no cap will be applied to your
              estimate.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Calculate My Case Value →
        </button>
      </div>
    </div>
  );
}
