"use client";

import dynamic from "next/dynamic";

const InvestmentCalculatorLoader = dynamic(
  () => import("@/components/calculators/InvestmentCalculator"),
  { ssr: false }
);

export default InvestmentCalculatorLoader;
