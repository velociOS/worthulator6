"use client";

import dynamic from "next/dynamic";
import type { PassiveIncomeCalculatorProps } from "./PassiveIncomeCalculator";

const PassiveIncomeCalculatorDynamic =
  dynamic<PassiveIncomeCalculatorProps>(
    () => import("./PassiveIncomeCalculator"),
    {
      ssr: false,
      loading: () => (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-24 animate-pulse rounded-2xl bg-emerald-50" />
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-50" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  );

export default function PassiveIncomeCalculatorLoader({
  currency,
  region,
}: PassiveIncomeCalculatorProps) {
  return <PassiveIncomeCalculatorDynamic currency={currency} region={region} />;
}
