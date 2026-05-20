"use client";

// ─── RefinancingOpportunityCard ───────────────────────────────────────────────
//
// PURPOSE:
//   Intent-aware monetization CTA. Renders contextually inside the insight
//   flow when a high-APR signal is detected (rate-above-market rule fires).
//
// USAGE:
//   <RefinancingOpportunityCard
//     currentRate={9.5}
//     marketRate={7.1}
//     loanAmount={22000}
//   />
//
// RULES:
//   ✅ Appears INSIDE the insight flow — never detached or in a separate section
//   ✅ Contextual — only shown when a genuine refinance opportunity exists
//   ✅ No async — pure props → UI
//   ✅ SSR-safe — no useEffect, no client-only APIs
//
// ─────────────────────────────────────────────────────────────────────────────

interface RefinancingOpportunityCardProps {
  currentRate: number;
  marketRate:  number;
  loanAmount:  number;
}

export default function RefinancingOpportunityCard({
  currentRate,
  marketRate,
  loanAmount,
}: RefinancingOpportunityCardProps) {
  const rateDiff     = (currentRate - marketRate).toFixed(1);
  const estSavings   = Math.round(((currentRate - marketRate) / 100 / 12) * loanAmount * 60 * 0.6);
  const savingsLabel = estSavings > 0 ? `~$${estSavings.toLocaleString()} over your loan term` : "potentially significant";

  return (
    <div className="rounded-2xl border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
          🔄
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-blue-900">
            Refinancing opportunity
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Your rate of <span className="font-semibold text-gray-800">{currentRate}%</span> is{" "}
            <span className="font-semibold text-amber-700">+{rateDiff}%</span> above the current
            market average of {marketRate}%. Refinancing could save you{" "}
            <span className="font-semibold text-blue-800">{savingsLabel}</span>.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://www.bankrate.com/loans/auto-loans/auto-loan-refinance-rates/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Compare refinance rates →
            </a>
            <span className="inline-flex items-center rounded-xl bg-white/70 px-3 py-2 text-xs text-gray-500 ring-1 ring-gray-200">
              No impact on your credit score to compare
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
