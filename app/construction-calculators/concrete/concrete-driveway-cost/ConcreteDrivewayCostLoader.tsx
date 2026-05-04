"use client";
import dynamic from "next/dynamic";

const ConcreteDrivewayCostCalculator = dynamic(
  () => import("./ConcreteDrivewayCostCalculator"),
  { ssr: false }
);

export default function ConcreteDrivewayCostLoader() {
  return <ConcreteDrivewayCostCalculator />;
}
