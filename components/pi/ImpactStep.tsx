"use client";

import type { ImpactLevel } from "@/lib/pi/factors";

interface Props {
  painScale: number;
  impactLevel: ImpactLevel;
  onChange: (updates: {
    painScale?: number;
    impactLevel?: ImpactLevel;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const impactOptions: {
  value: ImpactLevel;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "none",
    label: "No significant impact",
    description: "Daily activities and routines remain largely unaffected.",
    icon: "😐",
  },
  {
    value: "minor",
    label: "Minor disruption",
    description: "Some activities affected temporarily. Mostly manageable.",
    icon: "😟",
  },
  {
    value: "moderate",
    label: "Moderate impact",
    description:
      "Work, home or social activities significantly disrupted for 3+ months.",
    icon: "😣",
  },
  {
    value: "severe",
    label: "Severe / Permanent",
    description:
      "Permanent lifestyle changes. Unable to work or care for self as before.",
    icon: "🛑",
  },
];

const PAIN_LABELS: Record<number, string> = {
  0: "No pain",
  1: "Minimal",
  2: "Very mild",
  3: "Mild",
  4: "Mild-moderate",
  5: "Moderate",
  6: "Moderate-severe",
  7: "Severe",
  8: "Very severe",
  9: "Intense",
  10: "Worst possible",
};

export default function ImpactStep({
  painScale,
  impactLevel,
  onChange,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 4 of 5
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Pain & life impact
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          This section captures non-economic damages — pain, suffering and life
          disruption. Be as accurate as possible.
        </p>

        {/* Pain scale */}
        <div className="mb-10">
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Average pain level
          </label>
          <p className="mb-4 text-xs text-slate-400">
            Rate your average day-to-day pain since the incident on a 0–10
            scale.
          </p>

          {/* Number buttons */}
          <div className="mb-3 flex gap-1.5">
            {Array.from({ length: 11 }, (_, i) => i).map((n) => {
              const isSelected = painScale === n;
              const color =
                n <= 3
                  ? "bg-emerald-500"
                  : n <= 6
                  ? "bg-amber-400"
                  : "bg-rose-500";
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange({ painScale: n })}
                  className={`h-9 w-full rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? `${color} text-white shadow-md scale-110`
                      : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          <div className="text-center">
            <span
              className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold ${
                painScale <= 3
                  ? "bg-emerald-50 text-emerald-700"
                  : painScale <= 6
                  ? "bg-amber-50 text-amber-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {painScale} / 10 — {PAIN_LABELS[painScale]}
            </span>
          </div>
        </div>

        {/* Life impact */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Impact on daily life
          </label>
          <p className="mb-4 text-xs text-slate-400">
            How significantly have the injuries affected your ability to live,
            work and function normally?
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {impactOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ impactLevel: opt.value })}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150 ${
                  impactLevel === opt.value
                    ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="mt-0.5 text-2xl">{opt.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {opt.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-slate-400">
                    {opt.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
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
          className="rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-400"
        >
          Next: Insurance →
        </button>
      </div>
    </div>
  );
}
