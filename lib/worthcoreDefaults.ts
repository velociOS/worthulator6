// ─── WorthCore Engine Defaults (WCD) ─────────────────────────────────────────
//
// PURPOSE:
//   Single import point for all WorthCore assumption values consumed as
//   default inputs inside calculatorConfigs.ts engine config objects.
//
// ARCHITECTURE ROLE:
//   calculatorConfigs.ts imports ONLY `WCD`.
//   WCD aggregates getters from lib/dataStore and lib/datasets/*.
//   This keeps calculatorConfigs.ts free of multiple WorthCore import lines
//   as the calculator count scales to 1000+.
//
// RULES (read before editing):
//   ✅ All values resolved at module evaluation time (synchronous)
//   ✅ SSR-safe — same result on server and client
//   ✅ Hydration-safe — CalculatorEngineLoader uses ssr:false; values only
//       consumed in client-side useState initializers (never server-rendered)
//   ✅ Add new WCD keys here when adding WorthCore-aware engine calculators
//   ❌ Never add async / fetch / React here
//   ❌ Never import from components/ or app/
//
// IMPORTANT — module-level freeze:
//   WCD values are resolved once at import time. A runtime Layer 2 update
//   (api/update-data) will update dataStore in memory, but WCD and the
//   input.default values derived from it are already frozen. Updates take
//   effect on the next cold start / deployment. This is by design and
//   consistent with all other module-level WorthCore integrations.
//
// ─────────────────────────────────────────────────────────────────────────────

import { getFinanceValue, getEnergyValue } from "@/lib/dataStore";
import { usCostDataset }                   from "@/lib/datasets/usCostOfLiving";

/**
 * WorthCore Defaults — resolved once at module load.
 * Use these as `default:` values in InputConfig objects inside calculatorConfigs.ts.
 *
 * @example
 *   { name: "gasPrice", default: WCD.fuelPricePerGallon, ... }
 */
export const WCD = {

  // ── Finance ─────────────────────────────────────────────────────────────────

  /** 30-year fixed mortgage rate (%) */
  mortgageRate:       getFinanceValue("mortgageRate"),

  /** Average new-car auto loan APR (%) */
  autoLoanRate:       getFinanceValue("autoLoanRateNew"),

  /** Historical S&P 500 inflation-adjusted annual return (%) */
  stockMarketReturn:  getFinanceValue("stockMarketReturn"),

  /** Fed / HYSA savings rate (%) */
  savingsRate:        getFinanceValue("savingsRate"),

  /** Average credit card APR (%) */
  creditCardAPR:      getFinanceValue("creditCardAPR"),

  // ── Energy ───────────────────────────────────────────────────────────────────

  /** US average price per gallon of regular unleaded gasoline ($) */
  fuelPricePerGallon: getEnergyValue("fuelPricePerGallonUs"),

  // ── Lifestyle ────────────────────────────────────────────────────────────────

  /** US national average price per pack of cigarettes ($) */
  cigarettePackPrice: usCostDataset.national.cigarettes,

};
