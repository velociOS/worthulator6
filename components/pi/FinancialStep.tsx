"use client";

import { useState } from "react";

interface Props {
  medicalCosts: number;
  lostWages: number;
  futureMedical: number;
  futureLoss: number;
  propertyDamage: number;
  onChange: (updates: {
    medicalCosts?: number;
    lostWages?: number;
    futureMedical?: number;
    futureLoss?: number;
    propertyDamage?: number;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

function fmt(value: number): string {
  if (value === 0) return "";
  return value.toLocaleString("en-US");
}

function parse(str: string): number {
  const cleaned = str.replace(/[^0-9]/g, "");
  return cleaned === "" ? 0 : parseInt(cleaned, 10);
}

interface FieldProps {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  optional?: boolean;
}

function CurrencyField({ label, hint, value, onChange, optional }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const displayVal = focused ? (value === 0 ? "" : String(value)) : fmt(value);

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        {optional && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">
            Optional
          </span>
        )}
      </div>
      <p className="mb-2 text-xs text-slate-400">{hint}</p>
      <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400">
        <span className="pl-4 text-sm font-semibold text-slate-400">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={displayVal}
          placeholder="0"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(parse(e.target.value))}
          className="w-full bg-transparent px-2 py-3 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-300"
        />
      </div>
    </div>
  );
}

export default function FinancialStep({
  medicalCosts,
  lostWages,
  futureMedical,
  futureLoss,
  propertyDamage,
  onChange,
  onNext,
  onBack,
}: Props) {
  const total =
    medicalCosts + lostWages + futureMedical + futureLoss + propertyDamage;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 3 of 5
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Financial losses
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Enter your documented and projected financial losses. These form the
          economic foundation of your claim.
        </p>

        <div className="space-y-5">
          <CurrencyField
            label="Medical bills to date"
            hint="All treatment costs incurred since the incident — hospital, physio, surgery, medication."
            value={medicalCosts}
            onChange={(v) => onChange({ medicalCosts: v })}
          />
          <CurrencyField
            label="Lost wages to date"
            hint="Income you have lost due to inability to work since the incident."
            value={lostWages}
            onChange={(v) => onChange({ lostWages: v })}
          />
          <CurrencyField
            label="Future medical costs"
            hint="Estimated ongoing or future treatment, rehabilitation or care costs."
            value={futureMedical}
            onChange={(v) => onChange({ futureMedical: v })}
            optional
          />
          <CurrencyField
            label="Future income loss"
            hint="Projected loss of earning capacity if injuries affect your long-term work ability."
            value={futureLoss}
            onChange={(v) => onChange({ futureLoss: v })}
            optional
          />
          <CurrencyField
            label="Property damage"
            hint="Vehicle, equipment or other property damaged in the incident."
            value={propertyDamage}
            onChange={(v) => onChange({ propertyDamage: v })}
            optional
          />
        </div>
      </div>

      {/* Running total */}
      {total > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <span className="text-sm font-semibold text-emerald-800">
            Total economic damages
          </span>
          <span className="text-lg font-bold text-emerald-700">
            ${total.toLocaleString("en-US")}
          </span>
        </div>
      )}

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
          className="rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-400"
        >
          Next: Pain & Impact →
        </button>
      </div>
    </div>
  );
}
