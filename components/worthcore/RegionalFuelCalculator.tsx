"use client";

// ─── RegionalFuelCalculator ───────────────────────────────────────────────────
//
// PURPOSE:
//   A reusable contextual wrapper that injects a US state fuel price as the
//   initial default into any fuel-consuming engine calculator.
//
// ARCHITECTURE NOTES:
//   • Completely synchronous — no fetch, no async, no API calls.
//   • The `key={selectedState}` prop forces a full React remount when the user
//     changes state, causing useCalculator's useState lazy initializer to re-run
//     with the updated fuel price. No useEffect, no stale state, no reset loops.
//   • Backward-compatible: the underlying CalculatorEngineLoader and all other
//     usages are unchanged — this component only adds an optional UI layer.
//   • Hydration-safe: CalculatorEngineLoader uses ssr:false. `defaults` is only
//     consumed in the client-side useState lazy initializer — never on the server.
//
// USAGE:
//   // commute-cost calculator (fuel input key = "gasPrice")
//   <RegionalFuelCalculator slug="commute-cost" />
//
//   // road-trip-cost calculator (fuel input key = "fuelPrice")
//   <RegionalFuelCalculator slug="road-trip-cost" fuelInputKey="fuelPrice" />
//
//   // ev-vs-gas calculator (fuel input key = "gasPrice")
//   <RegionalFuelCalculator slug="ev-vs-gas" />
//
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import CalculatorEngineLoader from "@/components/calculator-engine/CalculatorEngineLoader";
import {
  getUSStateFuelPrice,
  US_STATE_LIST,
} from "@/lib/datasets/usStateFuelPrices";

interface RegionalFuelCalculatorProps {
  /** Engine calculator slug, e.g. "commute-cost", "road-trip-cost" */
  slug: string;
  /**
   * The input name in the calculator config that receives the fuel price.
   * Defaults to "gasPrice" — override to "fuelPrice" for road-trip-cost.
   */
  fuelInputKey?: string;
  /** Optional content rendered below the calculator grid after results appear */
  afterResults?: React.ReactNode;
}

export default function RegionalFuelCalculator({
  slug,
  fuelInputKey = "gasPrice",
  afterResults,
}: RegionalFuelCalculatorProps) {
  const [selectedState, setSelectedState] = useState<string>("National");
  const fuelPrice = getUSStateFuelPrice(selectedState); // synchronous, never throws

  return (
    <div className="flex flex-col gap-6">
      {/* ── State selector ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
        <span className="shrink-0 text-sm font-semibold text-gray-700">
          Your state
        </span>
        <select
          id="fuel-state-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Select your US state for regional fuel price"
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
        key={selectedState} forces a full remount when the user changes state.
        useCalculator reinitializes with the new fuel price as the default.
        The user gets a fresh, region-accurate starting point each time.
      */}
      <CalculatorEngineLoader
        key={selectedState}
        slug={slug}
        defaults={{ [fuelInputKey]: fuelPrice }}
        afterResults={afterResults}
      />
    </div>
  );
}
