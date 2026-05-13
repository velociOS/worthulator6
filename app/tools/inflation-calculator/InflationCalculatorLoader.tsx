"use client";

/**
 * Client-side loader for InflationCalculator.
 * `ssr: false` must live inside a Client Component per Next.js lazy-loading docs.
 * Server Component pages import this instead of the heavy calculator directly.
 */
import dynamic from "next/dynamic";

const InflationCalculatorLoader = dynamic(
  () => import("./InflationCalculator"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

export default InflationCalculatorLoader;
