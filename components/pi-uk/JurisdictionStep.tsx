"use client";

import { UK_JURISDICTIONS } from "@/lib/pi-uk/data";

interface Props {
  jurisdiction: string;
  onChange: (updates: { jurisdiction?: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const JURISDICTION_NOTES: Record<string, string> = {
  england_wales:
    "England & Wales follow the same legal framework. Compensation is assessed using the Judicial College Guidelines (JCG).",
  scotland:
    "Scotland has a separate legal system. Cases are heard in the Sheriff Court or Court of Session. Compensation levels are broadly similar to England & Wales but may differ in complex cases.",
  northern_ireland:
    "Northern Ireland follows broadly similar principles to England & Wales. Compensation levels are generally consistent with — but may be marginally below — those in England & Wales.",
};

export default function JurisdictionStep({
  jurisdiction,
  onChange,
  onNext,
  onBack,
}: Props) {
  const canProceed = jurisdiction !== "";
  const note = JURISDICTION_NOTES[jurisdiction];

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 5 of 5
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Jurisdiction
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Where in the UK did the incident occur? Different parts of the UK
          have separate legal systems, which can affect how compensation is
          assessed.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {UK_JURISDICTIONS.map((j) => (
            <button
              key={j.value}
              type="button"
              onClick={() => onChange({ jurisdiction: j.value })}
              className={`flex flex-col gap-2 rounded-xl border p-5 text-left transition-all duration-150 ${
                jurisdiction === j.value
                  ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-sm font-bold text-slate-800">
                {j.label}
              </span>
            </button>
          ))}
        </div>

        {note && (
          <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs leading-relaxed text-slate-500">{note}</p>
          </div>
        )}
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
          Calculate My Compensation →
        </button>
      </div>
    </div>
  );
}
