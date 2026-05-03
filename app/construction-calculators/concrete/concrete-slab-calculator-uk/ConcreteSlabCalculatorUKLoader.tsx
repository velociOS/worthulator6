"use client";

/**
 * Client-side loader for ConcreteSlabCalculatorUK.
 * `ssr: false` must live inside a Client Component per Next.js lazy-loading docs.
 */
import dynamic from "next/dynamic";

const ConcreteSlabCalculatorUKDynamic = dynamic(
  () => import("./ConcreteSlabCalculatorUK"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

export default function ConcreteSlabCalculatorUKLoader() {
  return <ConcreteSlabCalculatorUKDynamic />;
}
