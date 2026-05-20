"use client";

// ─── RetirementGapOpportunityCard ────────────────────────────────────────────
//
// PURPOSE:
//   Intent-aware monetization CTA. Renders contextually inside the insight
//   flow when a retirement savings gap or long timeline to retirement
//   is detected in retirement/FIRE calculators.
//
// USAGE:
//   <RetirementGapOpportunityCard
//     retirementGap={420000}
//     yearsToRetire={18}
//     requiredMonthlyExtra={980}
//   />
//
// RULES:
//   ✅ Appears INSIDE the insight flow — never a detached section
//   ✅ Contextual — only shown on genuine retirement gap signals
//   ✅ No async — pure props → UI
//   ✅ SSR-safe
//
// ─────────────────────────────────────────────────────────────────────────────

interface RetirementGapOpportunityCardProps {
  retirementGap:        number;
  yearsToRetire:        number;
  requiredMonthlyExtra?: number;
}

export default function RetirementGapOpportunityCard({
  retirementGap,
  yearsToRetire,
  requiredMonthlyExtra,
}: RetirementGapOpportunityCardProps) {
  return (
    <div className="rounded-2xl border border-purple-200 bg-linear-to-br from-purple-50 to-violet-50 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl">
          📈
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-purple-900">
            Close the gap — investing the difference matters here
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            You have a{" "}
            <span className="font-semibold text-purple-800">${retirementGap.toLocaleString()}</span> gap
            to close in{" "}
            <span className="font-semibold text-gray-800">{yearsToRetire} years</span>.
            {requiredMonthlyExtra != null && requiredMonthlyExtra > 0 && (
              <>
                {" "}Investing an extra{" "}
                <span className="font-semibold text-purple-700">${requiredMonthlyExtra.toLocaleString()}/month</span>{" "}
                at 7% return would close this gap.
              </>
            )}{" "}
            A fee-free index fund or IRA could be the right vehicle.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://www.nerdwallet.com/best/investing/online-brokers-for-beginners"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
            >
              Compare investment accounts →
            </a>
            <a
              href="/tools/coast-fire-calculator"
              className="inline-flex items-center rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-gray-200 transition hover:bg-white"
            >
              Try FIRE calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
