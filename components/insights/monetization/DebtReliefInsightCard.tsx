"use client";

// ─── DebtReliefInsightCard ────────────────────────────────────────────────────
//
// PURPOSE:
//   Intent-aware monetization CTA. Renders contextually inside the insight
//   flow when high debt burden, high interest, or long payoff timeline
//   is detected in debt-related calculators.
//
// USAGE:
//   <DebtReliefInsightCard
//     totalInterest={4800}
//     monthsToPayoff={38}
//     balance={8000}
//   />
//
// RULES:
//   ✅ Appears INSIDE the insight flow — never a detached section
//   ✅ Contextual — only shown on genuine debt pressure signals
//   ✅ No async — pure props → UI
//   ✅ SSR-safe
//
// ─────────────────────────────────────────────────────────────────────────────

interface DebtReliefInsightCardProps {
  totalInterest:  number;
  monthsToPayoff: number;
  balance:        number;
}

export default function DebtReliefInsightCard({
  totalInterest,
  monthsToPayoff,
  balance,
}: DebtReliefInsightCardProps) {
  const yearsLabel =
    monthsToPayoff >= 12
      ? `${Math.floor(monthsToPayoff / 12)} yr${Math.floor(monthsToPayoff / 12) !== 1 ? "s" : ""} ${monthsToPayoff % 12 > 0 ? `${monthsToPayoff % 12} mo` : ""}`
      : `${monthsToPayoff} months`;

  return (
    <div className="rounded-2xl border border-red-200 bg-linear-to-br from-red-50 to-orange-50 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl">
          💳
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-red-900">
            Consolidation could cut this significantly
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Paying off <span className="font-semibold text-gray-800">${balance.toLocaleString()}</span> at
            your current rate will take{" "}
            <span className="font-semibold text-red-700">{yearsLabel}</span> and cost{" "}
            <span className="font-semibold text-red-800">${totalInterest.toLocaleString()}</span> in
            interest. A balance transfer or personal loan at a lower rate could save hundreds.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://www.bankrate.com/personal-finance/debt/best-debt-consolidation-loans/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              See consolidation options →
            </a>
            <a
              href="https://www.bankrate.com/credit-cards/balance-transfer/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-gray-200 transition hover:bg-white"
            >
              0% balance transfers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
