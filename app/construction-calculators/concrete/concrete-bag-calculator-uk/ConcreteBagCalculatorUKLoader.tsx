"use client";

import dynamic from "next/dynamic";

const ConcreteBagCalculatorUKDynamic = dynamic(
  () => import("./ConcreteBagCalculatorUK"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

export default function ConcreteBagCalculatorUKLoader() {
  return <ConcreteBagCalculatorUKDynamic />;
}
