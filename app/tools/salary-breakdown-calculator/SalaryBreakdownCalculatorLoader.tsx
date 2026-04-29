"use client";

import dynamic from "next/dynamic";

const SalaryBreakdownCalculatorDynamic = dynamic(
  () => import("./SalaryBreakdownCalculator"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

export default function SalaryBreakdownCalculatorLoader({
  defaultRegion,
}: {
  defaultRegion?: "UK" | "US";
}) {
  return <SalaryBreakdownCalculatorDynamic defaultRegion={defaultRegion} />;
}
