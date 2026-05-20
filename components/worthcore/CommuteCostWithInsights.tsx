"use client";

// ─── CommuteCostWithInsights ──────────────────────────────────────────────────
//
// PHASE 6B: Commute Cost Calculator + Live WorthCore Insights
//
// SYNCHRONIZATION ARCHITECTURE (Phase 6B render-prop pattern):
//   1. State selector → getUSStateFuelPrice() (sync) → fuelPrice
//   2. key={selectedState} forces remount → engine initializes with fuelPrice
//   3. User clicks Calculate → engine shows results
//   4. afterResults render prop fires with live (outputs, values) from engine
//   5. LiveInsightBlock routes to generateCommuteInsights with actual values
//   6. User adjusts ANY slider → engine re-renders → afterResults fires again
//      → fresh insights computed synchronously from live state
//
// SAFETY INVARIANTS:
//   ✅ No engine modification beyond the render-prop extension
//   ✅ No calculation modification — insights consume outputs only
//   ✅ No async — all insight logic is synchronous pure functions
//   ✅ No hydration risk — engine is ssr:false
//   ✅ No reset loops — key only changes on user state selection
//   ✅ Live sync — insights reflect actual slider positions, not just defaults
//
// USAGE:
//   Replace <CalculatorEngineLoader slug="commute-cost" /> with
//   <CommuteCostWithInsights /> on the commute-cost page.
//
// ─────────────────────────────────────────────────────────────────────────────

import { useState }           from "react";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import LiveInsightBlock       from "@/components/worthcore/LiveInsightBlock";
import type { CalculatorValues, CalculatorOutputs } from "@/components/calculator-engine/types";
import { getUSStateFuelPrice, US_STATE_LIST } from "@/lib/datasets/usStateFuelPrices";

// ─── Component ────────────────────────────────────────────────────────────────

export default function CommuteCostWithInsights() {
  const [selectedState, setSelectedState] = useState<string>("National");

  // Synchronous — local dataset lookup, never throws
  const fuelPrice = getUSStateFuelPrice(selectedState);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Regional state selector ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
        <span className="shrink-0 text-sm font-semibold text-gray-700">
          Your state
        </span>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Select your US state to apply regional fuel price"
        >
          <option value="National">National average</option>
          {US_STATE_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
          ${fuelPrice.toFixed(2)}&thinsp;/&thinsp;gal
        </span>
      </div>

      {/*
        key={selectedState} → clean remount on state change (Phase 5A pattern).
        afterResults render prop → live insight sync on every slider change
        (Phase 6B pattern). The engine calls afterResults(outputs, values)
        synchronously in its render path after each recalculation.
      */}
      <CalculatorEngineLoader
        key={selectedState}
        slug="commute-cost"
        defaults={{ gasPrice: fuelPrice }}
        afterResults={(outputs: CalculatorOutputs, values: CalculatorValues) => (
          <LiveInsightBlock
            slug="commute-cost"
            outputs={outputs}
            values={values}
            context={{ state: selectedState }}
          />
        )}
      />
    </div>
  );
}
