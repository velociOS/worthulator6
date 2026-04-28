"use client";

/**
 * Client-side loader for TakeHomePayCalculator.
 * `ssr: false` must live inside a Client Component per Next.js lazy-loading docs.
 * Server Component pages import this instead of the heavy component directly.
 */
import dynamic from "next/dynamic";

const TakeHomePayCalculatorLoader = dynamic(
  () => import("./TakeHomePayCalculator"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

export default TakeHomePayCalculatorLoader;
