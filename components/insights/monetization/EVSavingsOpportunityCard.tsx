"use client";

// ─── EVSavingsOpportunityCard ─────────────────────────────────────────────────
//
// PURPOSE:
//   Intent-aware monetization CTA. Renders contextually inside the insight
//   flow when high annual fuel spend is detected in the commute or fuel
//   cost calculators.
//
// USAGE:
//   <EVSavingsOpportunityCard
//     annualFuelCost={3200}
//     annualEvEstimate={800}
//   />
//
// RULES:
//   ✅ Appears INSIDE the insight flow — never a detached section
//   ✅ Contextual — only shown when fuel spend is meaningfully high
//   ✅ No async — pure props → UI
//   ✅ SSR-safe
//
// ─────────────────────────────────────────────────────────────────────────────

interface EVSavingsOpportunityCardProps {
  annualFuelCost:    number;
  annualEvEstimate?: number;
}

export default function EVSavingsOpportunityCard({
  annualFuelCost,
  annualEvEstimate = Math.round(annualFuelCost * 0.28),
}: EVSavingsOpportunityCardProps) {
  const annualSavings = Math.round(annualFuelCost - annualEvEstimate);
  const tenYearSavings = annualSavings * 10;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-teal-50 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
          ⚡
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-emerald-900">
            Could an EV cut this cost?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            At <span className="font-semibold text-gray-800">${annualFuelCost.toLocaleString()}/year</span> in
            fuel, switching to an EV could reduce that to roughly{" "}
            <span className="font-semibold text-emerald-700">${annualEvEstimate.toLocaleString()}/year</span> —
            saving <span className="font-semibold text-emerald-800">${annualSavings.toLocaleString()}/year</span>{" "}
            or <span className="font-semibold">${tenYearSavings.toLocaleString()} over 10 years</span>.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="/tools/ev-vs-gas"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Run the EV comparison →
            </a>
            <a
              href="https://www.edmunds.com/electric-car/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-gray-200 transition hover:bg-white"
            >
              Browse EVs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
