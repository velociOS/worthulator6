"use client";

import { useState } from "react";
import {
  physicalInjuries,
  psychiatricInjuries,
  recoveryOptions,
  type UKPhysicalInjuryKey,
  type UKPsychiatricInjuryKey,
  type InjuryType,
  type UKSeverity,
} from "@/lib/pi-uk/data";
import type { UKInjurySelection } from "@/lib/pi-uk/engine";

interface Props {
  injuries: UKInjurySelection[];
  onChange: (injuries: UKInjurySelection[]) => void;
  onNext: () => void;
  onBack: () => void;
}

type AnyKey = UKPhysicalInjuryKey | UKPsychiatricInjuryKey;

export default function InjurySelector({
  injuries,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [tab, setTab] = useState<InjuryType>("physical");

  const allPhysical = Object.entries(physicalInjuries) as [
    UKPhysicalInjuryKey,
    (typeof physicalInjuries)[UKPhysicalInjuryKey]
  ][];
  const allPsychiatric = Object.entries(psychiatricInjuries) as [
    UKPsychiatricInjuryKey,
    (typeof psychiatricInjuries)[UKPsychiatricInjuryKey]
  ][];

  const isSelected = (type: InjuryType, key: AnyKey) =>
    injuries.some((i) => i.type === type && i.key === key);

  const getSelected = (type: InjuryType, key: AnyKey) =>
    injuries.find((i) => i.type === type && i.key === key);

  function toggleInjury(
    type: InjuryType,
    key: AnyKey,
    availableSeverities: UKSeverity[]
  ) {
    if (isSelected(type, key)) {
      onChange(injuries.filter((i) => !(i.type === type && i.key === key)));
    } else {
      const defaultSeverity = availableSeverities[0];
      onChange([
        ...injuries,
        { type, key, severity: defaultSeverity, recoveryMonths: 2 },
      ]);
    }
  }

  function updateInjury(
    type: InjuryType,
    key: AnyKey,
    updates: Partial<Pick<UKInjurySelection, "severity" | "recoveryMonths">>
  ) {
    onChange(
      injuries.map((i) =>
        i.type === type && i.key === key ? { ...i, ...updates } : i
      )
    );
  }

  // suppress unused warning — kept for symmetry with US component
  void getSelected;

  const canProceed = injuries.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 2 of 5
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Select your injuries
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Choose all injuries sustained. You can add multiple.
        </p>

        {/* Category tabs */}
        <div className="mb-5 flex w-fit gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {(["physical", "psychiatric"] as InjuryType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t === "physical" ? "🦴 Physical" : "🧠 Psychological"}
            </button>
          ))}
        </div>

        {/* Injury cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(tab === "physical" ? allPhysical : allPsychiatric).map(
            ([key, entry]) => {
              const selected = isSelected(tab, key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    toggleInjury(tab, key, entry.availableSeverities)
                  }
                  className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-150 ${
                    selected
                      ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xl">{entry.icon}</span>
                    <span
                      className={`h-4 w-4 rounded-full border-2 transition-colors ${
                        selected
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-300 bg-white"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-semibold leading-tight text-slate-800">
                    {entry.label}
                  </span>
                  <span className="text-[11px] leading-snug text-slate-400">
                    {entry.description}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Configuration for selected injuries */}
      {injuries.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-4 text-sm font-bold text-slate-700">
            Configure selected injuries
          </h3>
          <div className="space-y-5">
            {injuries.map((inj) => {
              const entry =
                inj.type === "physical"
                  ? physicalInjuries[inj.key as UKPhysicalInjuryKey]
                  : psychiatricInjuries[inj.key as UKPsychiatricInjuryKey];
              if (!entry) return null;

              return (
                <div
                  key={`${inj.type}-${inj.key}`}
                  className="rounded-xl border border-white bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">
                      {entry.icon} {entry.label}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange(
                          injuries.filter(
                            (i) => !(i.type === inj.type && i.key === inj.key)
                          )
                        )
                      }
                      className="text-xs font-medium text-slate-400 hover:text-rose-500"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Severity */}
                  <div className="mb-3">
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      Severity
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.availableSeverities.map((sev) => (
                        <button
                          key={sev}
                          type="button"
                          onClick={() =>
                            updateInjury(inj.type, inj.key, { severity: sev })
                          }
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                            inj.severity === sev
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {entry.severityLabels[sev] ?? sev}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recovery duration */}
                  <div>
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      Expected recovery duration
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recoveryOptions.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() =>
                            updateInjury(inj.type, inj.key, {
                              recoveryMonths: opt.months,
                            })
                          }
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                            inj.recoveryMonths === opt.months
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
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
          Next: Financial Losses →
        </button>
      </div>
    </div>
  );
}
