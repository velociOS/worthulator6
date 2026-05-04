"use client";
import dynamic from "next/dynamic";

const HoursToDecimalCalculator = dynamic(
  () => import("./HoursToDecimalCalculator"),
  { ssr: false }
);

export default function HoursToDecimalLoader() {
  return <HoursToDecimalCalculator />;
}
