"use client";

import { useState } from "react";
import type { UKCaseResult } from "@/lib/pi-uk/engine";
import { getUKDisclaimer, UK_SHORT_DISCLAIMER } from "@/lib/pi-uk/disclaimer";
import { UK_JURISDICTIONS } from "@/lib/pi-uk/data";
import type { CaseStrength } from "@/lib/pi-uk/factors";

interface Props {
  result: UKCaseResult;
  jurisdiction: string;
  onReset: () => void;
}

function fmt(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function StrengthBadge({ strength }: { strength: CaseStrength }) {
  const map: Record<CaseStrength, { bg: string; text: string; dot: string }> = {
    Strong:   { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    Moderate: { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
    Weak:     { bg: "bg-rose-50",    text: "text-rose-700",    dot: "bg-rose-500"    },
  };
  const s = map[strength];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${s.bg} ${s.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {strength} Prospects
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

export default function ResultPanel({ result, jurisdiction, onReset }: Props) {
  const [email, setEmail]       = useState("");
  const [consent, setConsent]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const jurisdictionName =
    UK_JURISDICTIONS.find((j) => j.value === jurisdiction)?.label ?? jurisdiction;

  const disclaimer = getUKDisclaimer(jurisdictionName || undefined);
  const faultPct   = Math.round((1 - result.faultFactor) * 100);

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubmitted(true);
    // NOTE: No auto-collection — user explicitly submitted with consent.
    // Integrate with your CRM / email service here.
    console.info("UK Lead capture:", { email, result });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Compensation Estimate
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Your Potential Payout Range
          </h2>
          <StrengthBadge strength={result.caseStrength} />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Based on typical UK case data and the information you provided.
        </p>
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
            Early resolution / lower end of typical range
          </p>
        </div>

        {/* Likely — highlighted */}
        <div className="flex flex-col rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 shadow-md ring-1 ring-emerald-500">
          <div className="mb-1 flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Most Likely Payout
            </p>
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
              Most likely
            </span>
          </div>
          <p className="text-3xl font-bold text-emerald-700">
            {fmt(result.likely)}
          </p>
          <p className="mt-1 text-xs leading-snug text-emerald-600">
            Negotiated outcome with solid evidence and legal representation
          </p>
        </div>

        {/* Maximum */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Maximum Estimate
          </p>
          <p className="text-2xl font-bold text-slate-700">
            {fmt(result.aggressive)}
          </p>
          <p className="mt-1 text-xs leading-snug text-slate-400">
            Favourable court outcome / full damages awarded
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
            Special Damages (financial losses)
          </div>
          <BreakdownRow label="Medical treatment costs"  value={result.breakdown.medicalCosts}   />
          <BreakdownRow label="Lost earnings"            value={result.breakdown.lostWages}      />
          <BreakdownRow label="Future medical costs"     value={result.breakdown.futureMedical}  />
          <BreakdownRow label="Future loss of earnings"  value={result.breakdown.futureLoss}     />
          <BreakdownRow label="Property damage"          value={result.breakdown.propertyDamage} />
          <div className="flex items-center justify-between py-2 font-semibold">
            <span className="text-sm text-slate-700">Special damages subtotal</span>
            <span className="text-sm text-slate-700">
              {fmt(result.specialDamagesRaw)}
            </span>
          </div>

          <div className="pb-1 pt-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            General Damages (PSLA)
          </div>
          <BreakdownRow
            label="Pain, suffering &amp; loss of amenity"
            value={result.breakdown.generalDamages}
          />
        </div>

        {/* Contributory negligence note */}
        <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-500">
          {faultPct > 0 ? (
            <>
              <span className="font-semibold">
                Contributory negligence: {faultPct}% deducted
              </span>{" "}
              — All figures above reflect a proportional reduction per the Law
              Reform (Contributory Negligence) Act 1945.
            </>
          ) : (
            <>
              <span className="font-semibold">No contributory negligence applied</span>{" "}
              — Full compensation estimate shown.
            </>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <h4 className="mb-3 text-sm font-bold text-slate-800">
          Assessment summary
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">
          {result.explanation}
        </p>
      </div>

      {/* Lead capture */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h4 className="text-base font-bold text-emerald-900">
            Get a More Detailed Breakdown
          </h4>
        </div>
        <p className="mb-4 text-sm text-emerald-700">
          If you would like a more detailed breakdown of how your estimate was
          calculated, or wish to explore your options, you can request
          additional information below. This website is not a law firm and does
          not provide legal advice.
        </p>

        {submitted ? (
          <div className="rounded-xl border border-emerald-300 bg-white px-4 py-3 text-sm font-semibold text-emerald-700">
            ✅ Thank you — your request has been received. We will be in touch.
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                {emailError && (
                  <p className="mt-1 text-xs text-rose-600">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={!consent}
                className="shrink-0 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Request Information →
              </button>
            </div>

            {/* Consent checkbox — required for UK GDPR compliance */}
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="uk-lead-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-emerald-300 accent-emerald-600"
              />
              <label
                htmlFor="uk-lead-consent"
                className="cursor-pointer text-xs leading-relaxed text-emerald-700"
              >
                I agree to be contacted by third-party service providers who
                may be able to assist with my situation. I understand this
                website is not a law firm and does not provide legal advice.
              </label>
            </div>
            <p className="text-[10px] leading-relaxed text-emerald-600">
              We may share your information with relevant partners for
              informational purposes.
            </p>
          </form>
        )}
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
          Start a new estimate
        </button>
      </div>

      {/* Sticky footer disclaimer on mobile */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-100 bg-white/90 px-4 py-2 text-center text-[10px] font-medium text-slate-400 backdrop-blur-sm sm:hidden">
        {UK_SHORT_DISCLAIMER}
      </div>
    </div>
  );
}
