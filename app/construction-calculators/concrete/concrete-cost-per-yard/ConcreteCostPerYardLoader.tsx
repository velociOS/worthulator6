"use client";
import dynamic from "next/dynamic";

const ConcreteCostPerYardCalculator = dynamic(
  () => import("./ConcreteCostPerYardCalculator"),
  { ssr: false }
);

export default function ConcreteCostPerYardLoader() {
  return <ConcreteCostPerYardCalculator />;
}
