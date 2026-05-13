"use client";

import dynamic from "next/dynamic";

const RetirementCalculatorLoader = dynamic(
  () => import("@/components/calculators/RetirementCalculator"),
  { ssr: false }
);

export default RetirementCalculatorLoader;
