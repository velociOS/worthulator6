"use client";

/**
 * Client-side loader for ConcreteSlabCalculator.
 * `ssr: false` must live inside a Client Component per Next.js lazy-loading docs.
 */
import dynamic from "next/dynamic";

const ConcreteSlabCalculatorDynamic = dynamic(
  () => import("./ConcreteSlabCalculator"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

export default function ConcreteSlabCalculatorLoader() {
  return <ConcreteSlabCalculatorDynamic />;
}
