"use client";

import dynamic from "next/dynamic";
import type { BlockRegion } from "./ConcreteBlockCalculator";

const ConcreteBlockCalculatorDynamic = dynamic(
  () => import("./ConcreteBlockCalculator"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
    ),
  },
);

interface Props {
  region: BlockRegion;
}

export default function ConcreteBlockCalculatorLoader({ region }: Props) {
  return <ConcreteBlockCalculatorDynamic region={region} />;
}
