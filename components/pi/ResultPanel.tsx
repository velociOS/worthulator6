"use client";

import type { CaseResult } from "@/lib/pi/engine";
import { getDisclaimer, SHORT_DISCLAIMER } from "@/lib/pi/disclaimer";
import { US_STATES } from "@/lib/pi/data";
import type { CaseStrength } from "@/lib/pi/factors";

interface Props {
  result: CaseResult;
  state: string;
  onReset: () => void;
}

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function StrengthBadge({ strength }: { strength: CaseStrength }) {
  const map: Record<CaseStrength, { bg: string; text: string; dot: string }> = {
    Strong: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    Moderate: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
    Weak: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  };
  const s = map[strength];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${s.bg} ${s.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {strength} Case
    </span>
  );
}

function BreakdownRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  if (value === 0) return null;
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        highlight ? "font-bold text-slate-900" : "text-slate-600"
      }`}
    >
      <span className="text-sm">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-emerald-600" : ""}`}>
        {fmt(value)}
      </span>
    </div>
  );
}

export default function ResultPanel({ result, state, onReset }: Props) {
  const stateName = US_STATES.find((s) => s.value === state)?.label ?? state;
  const disclaimer = getDisclaimer(stateName || undefined);

  const liabilityPct = Math.round(result.liabilityFactor * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Case Evaluation
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Your Estimated Case Value
          </h2>
          <StrengthBadge strength={result.caseStrength} />
        </div>
        {result.policyCapped && (
          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
            ⚠️ Estimate capped at reported policy limit. Actual damages may
            exceed available coverage.
          </p>
        )}
      </div>

      {/* Three-tier value cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Conservative */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Conservative
          </p>
          <p className="text-2xl font-bold text-slate-700">
            {fmt(result.conservative)}
          </p>
          <p className="mt-1 text-xs leading-snug text-slate-400">
            Early settlement / quick resolution scenario
          </p>
        </div>

        {/* Likely — highlighted */}
        <div className="flex flex-col rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 shadow-md ring-1 ring-emerald-500">
          <div className="mb-1 flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Likely Settlement
            </p>
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
              Most likely
            </span>
          </div>
          <p className="text-3xl font-bold text-emerald-700">
            {fmt(result.likely)}
          </p>
          <p className="mt-1 text-xs leading-snug text-emerald-600">
            Negotiated settlement with strong documentation
          </p>
        </div>

        {/* Aggressive */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Aggressive / Trial
          </p>
          <p className="text-2xl font-bold text-slate-700">
            {fmt(result.aggressive)}
          </p>
          <p className="mt-1 text-xs leading-snug text-slate-400">
            Favorable jury verdict / maximum damages scenario
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h4 className="mb-3 text-sm font-bold text-slate-800">
          Damages breakdown
        </h4>
        <div className="divide-y divide-slate-100">
          <div className="pb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Economic
          </div>
          <BreakdownRow label="Medical costs" value={result.breakdown.medicalCosts} />
          <BreakdownRow label="Lost wages" value={result.breakdown.lostWages} />
          <BreakdownRow label="Future medical" value={result.breakdown.futureMedical} />
          <BreakdownRow label="Future income loss" value={result.breakdown.futureLoss} />
          <BreakdownRow label="Property damage" value={result.breakdown.propertyDamage} />
          <div className="flex items-center justify-between py-2 font-semibold">
            <span className="text-sm text-slate-700">Economic subtotal</span>
            <span className="text-sm text-slate-700">{fmt(result.economic)}</span>
          </div>

          <div className="pb-1 pt-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Non-economic
          </div>
          <BreakdownRow
            label="Pain, suffering & life impact"
            value={result.breakdown.painSuffering}
          />
        </div>

        {/* Liability adjustment note */}
        <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-500">
          <span className="font-semibold">Liability factor: {liabilityPct}%</span> — All
          figures above are after applying your {100 - liabilityPct}% fault
          reduction and evidence weighting.
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <h4 className="mb-3 text-sm font-bold text-slate-800">
          Case evaluation summary
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">
          {result.explanation}
        </p>
      </div>

      {/* Informational CTA (no data collection) */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xl">📖</span>
          <h4 className="text-base font-bold text-slate-800">
            Next steps — for informational purposes only
          </h4>
        </div>
        <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-slate-400">→</span>
            Learn how personal injury claims are evaluated in your state — laws
            and damage caps vary significantly by jurisdiction.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-slate-400">→</span>
            Understand general compensation factors such as liability rules,
            evidence requirements, and recovery timelines.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-slate-400">→</span>
            Review your state&apos;s statute of limitations — most personal injury
            claims have strict filing deadlines.
          </li>
        </ul>
        <p className="mt-4 text-xs text-slate-400">
          This tool is for informational and educational purposes only. It does
          not constitute legal advice and does not facilitate any legal referral.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-[11px] leading-relaxed text-slate-400">{disclaimer}</p>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-slate-400 underline-offset-2 hover:text-slate-700 hover:underline"
        >
          Start a new evaluation
        </button>
      </div>

      {/* Sticky footer disclaimer on mobile */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-100 bg-white/90 px-4 py-2 text-center text-[10px] font-medium text-slate-400 backdrop-blur-sm sm:hidden">
        {SHORT_DISCLAIMER}
      </div>
    </div>
  );
}
