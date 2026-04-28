"use client";

import { incidentTypes, type UKIncidentType } from "@/lib/pi-uk/data";
import type { EvidenceStrength } from "@/lib/pi-uk/factors";

interface Props {
  incidentType: UKIncidentType | null;
  faultPercent: number;
  evidenceStrength: EvidenceStrength;
  onChange: (updates: {
    incidentType?: UKIncidentType;
    faultPercent?: number;
    evidenceStrength?: EvidenceStrength;
  }) => void;
  onNext: () => void;
}

const evidenceOptions: {
  value: EvidenceStrength;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "strong",
    label: "Strong",
    description: "Police report, CCTV, multiple witnesses, clear liability",
    icon: "✅",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "Some documentation, limited witnesses, partial evidence",
    icon: "⚠️",
  },
  {
    value: "weak",
    label: "Weak",
    description: "Minimal evidence, conflicting accounts, disputed liability",
    icon: "❌",
  },
];

export default function LiabilityStep({
  incidentType,
  faultPercent,
  evidenceStrength,
  onChange,
  onNext,
}: Props) {
  const canProceed = incidentType !== null;

  return (
    <div className="space-y-10">
      {/* Incident type */}
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 1 of 5
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          What happened?
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Select the type of incident that caused your injuries.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.entries(incidentTypes) as [UKIncidentType, (typeof incidentTypes)[UKIncidentType]][]).map(
            ([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => onChange({ incidentType: key })}
                className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-150 ${
                  incidentType === key
                    ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-2xl">{val.icon}</span>
                <span className="text-xs font-semibold leading-tight text-slate-800">
                  {val.label}
                </span>
                <span className="text-[11px] leading-snug text-slate-400">
                  {val.description}
                </span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Contributory negligence */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Your estimated contributory negligence
        </label>
        <p className="mb-4 text-xs text-slate-400">
          Under UK law, if you were partly responsible for the incident, your
          compensation is reduced proportionally. Be honest — courts and
          insurers will take this into account.
        </p>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={faultPercent}
            onChange={(e) =>
              onChange({ faultPercent: Number(e.target.value) })
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-500"
          />
          <span className="w-16 shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-center text-sm font-bold text-slate-800 shadow-sm">
            {faultPercent}%
          </span>
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-slate-400">
          <span>Not my fault</span>
          <span>Entirely my fault</span>
        </div>
        {faultPercent >= 50 && (
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
            At 50%+ contributory negligence your compensation will be
            significantly reduced. Unlike some US states, UK law does not bar
            your claim entirely — damages are simply reduced proportionally.
          </p>
        )}
      </div>

      {/* Evidence strength */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Strength of your evidence
        </label>
        <p className="mb-4 text-xs text-slate-400">
          Stronger evidence improves your prospects and increases your
          potential compensation estimate.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {evidenceOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ evidenceStrength: opt.value })}
              className={`flex flex-col gap-1.5 rounded-xl border p-4 text-left transition-all duration-150 ${
                evidenceStrength === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="text-sm font-bold text-slate-800">
                {opt.label}
              </span>
              <span className="text-xs leading-snug text-slate-400">
                {opt.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Next */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next: Injuries →
        </button>
      </div>
    </div>
  );
}
