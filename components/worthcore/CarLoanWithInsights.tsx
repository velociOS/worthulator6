"use client";

// ─── CarLoanWithInsights ──────────────────────────────────────────────────────
//
// PHASE 6C: Car Loan Calculator + Live WorthCore Insights
//
// SYNCHRONIZATION ARCHITECTURE (Phase 6B render-prop pattern):
//   1. CalculatorEngineLoader renders with afterResults render prop
//   2. User clicks Calculate → engine shows results
//   3. afterResults fires with live (outputs, values) from engine
//   4. LiveInsightBlock routes to generateCarLoanInsights with actual values
//   5. User adjusts ANY slider → engine re-renders → afterResults fires again
//      → fresh insights computed synchronously from live state
//
// SAFETY INVARIANTS:
//   ✅ No engine modification — insights via render-prop extension only
//   ✅ No calculation modification — insights consume outputs only
//   ✅ No async — all insight logic is synchronous pure functions
//   ✅ No hydration risk — engine is ssr:false
//   ✅ No reset loops
//   ✅ Live sync — insights reflect actual slider positions
//
// USAGE:
//   Replace <CalculatorEngineLoader slug="car-loan-calculator" /> with
//   <CarLoanWithInsights /> on the car-loan-calculator page.
//
// ─────────────────────────────────────────────────────────────────────────────

import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";

// ─── Component ────────────────────────────────────────────────────────────────

export default function CarLoanWithInsights() {
  return (
    <CalculatorEngineLoader
      slug="car-loan-calculator"
      afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
        <LiveInsightBlock
          slug="car-loan-calculator"
          outputs={outputs}
          values={values}
        />
      )}
    />
  );
}
