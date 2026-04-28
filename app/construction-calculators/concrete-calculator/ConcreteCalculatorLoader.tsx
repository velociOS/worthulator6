"use client";

/**
 * Client-side loader for ConcreteCalculator.
 * `ssr: false` must live inside a Client Component per Next.js lazy-loading docs.
 * The `region` prop is forwarded to the underlying component.
 */
import dynamic from "next/dynamic";
import type { Region } from "./ConcreteCalculator";

const ConcreteCalculatorDynamic = dynamic<{ region: Region }>(
  () => import("./ConcreteCalculator"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

export default function ConcreteCalculatorLoader({ region }: { region: Region }) {
  return <ConcreteCalculatorDynamic region={region} />;
}
