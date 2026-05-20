// ─── Worthulator Central Data Store ──────────────────────────────────────────
//
// PURPOSE:
//   Single source of truth for all default values used across calculators.
//   Calculators read from here instead of hardcoding values inline.
//
// RULES (read before editing):
//   ✅ Pure TypeScript only — no async, no fetch, no React, no Supabase
//   ✅ SSR-safe — safe to import in server components and client components
//   ✅ Read-only from calculators — use pattern: value = userInput || dataStore.x
//   ✅ Future API updates will overwrite these values at runtime (see LAYER 2)
//   ❌ Never import from components/ or app/ (circular deps)
//   ❌ Never call fetch() or any I/O here
//
// USAGE PATTERN IN CALCULATORS:
//   import { dataStore } from "@/lib/dataStore";
//   const rate = userRate ?? dataStore.finance.mortgageRate;
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FinanceData {
  /** 30-year fixed mortgage rate (%) — US national average */
  mortgageRate: number;
  /** Fed target / average HYSA savings rate (%) */
  savingsRate: number;
  /** Average money market / short-term yield (%) */
  moneyMarketRate: number;
  /** CPI-based annual inflation rate (%) */
  inflationRate: number;
  /** Historical S&P 500 average annual return (%) */
  stockMarketReturn: number;
  /** 10-year treasury yield (%) */
  bondYield: number;
  /** Average 15-year fixed mortgage rate (%) */
  mortgageRate15yr: number;
  /** Average personal loan APR (%) */
  personalLoanRate: number;
  /** Average auto loan APR — new car (%) */
  autoLoanRateNew: number;
  /** Average auto loan APR — used car (%) */
  autoLoanRateUsed: number;
  /** Average credit card APR (%) */
  creditCardAPR: number;
  /** Average student loan interest rate — federal (%) */
  studentLoanRate: number;
  /** Average rental yield on residential property (%) */
  rentalYield: number;
  /** Average US home price appreciation YoY (%) */
  homeAppreciation: number;
}

export interface TaxData {
  /** US federal standard deduction — single filer ($) */
  standardDeductionSingle: number;
  /** US federal standard deduction — married filing jointly ($) */
  standardDeductionMarried: number;
  /** Social Security employee rate (%) */
  socialSecurityRate: number;
  /** Medicare employee rate (%) */
  medicareRate: number;
  /** Social Security wage base ($) */
  socialSecurityWageBase: number;
  /** Long-term capital gains rate — 0% bracket ceiling, single ($) */
  ltcgZeroRateCeilingSingle: number;
  /** 401(k) annual contribution limit ($) */
  k401ContributionLimit: number;
  /** 401(k) catch-up contribution limit — age 50+ ($) */
  k401CatchUpLimit: number;
  /** IRA annual contribution limit ($) */
  iraContributionLimit: number;
  /** HSA annual contribution limit — individual ($) */
  hsaLimitIndividual: number;
  /** HSA annual contribution limit — family ($) */
  hsaLimitFamily: number;
  /** UK standard personal allowance (£) */
  ukPersonalAllowance: number;
  /** UK basic rate (%) */
  ukBasicRate: number;
  /** UK higher rate (%) */
  ukHigherRate: number;
  /** UK higher rate threshold (£) */
  ukHigherRateThreshold: number;
  /** UK National Insurance primary rate (%) */
  ukNationalInsuranceRate: number;
}

export interface ConstructionData {
  // ── Concrete ──────────────────────────────────────────────────────────────
  /** Bag-mix equivalent cost per cubic yard ($) — US */
  concreteCostPerCuYd: number;
  /** Ready-mix low estimate per cubic yard ($) — US */
  readyMixLowPerCuYd: number;
  /** Ready-mix high estimate per cubic yard ($) — US */
  readyMixHighPerCuYd: number;
  /** Concrete cost per m³ (£) — UK */
  concreteCostPerM3Uk: number;

  // ── Gravel / Aggregate ────────────────────────────────────────────────────
  /** Gravel cost per short ton ($) — US */
  gravelPerShortTon: number;
  /** Gravel cost per tonne (£) — UK */
  gravelPerTonneUk: number;

  // ── Roofing ───────────────────────────────────────────────────────────────
  /** Average asphalt shingle replacement cost per sq ft ($) — US */
  roofReplacementPerSqFt: number;
  /** Average roof replacement cost per m² (£) — UK */
  roofReplacementPerM2Uk: number;

  // ── General Labour ────────────────────────────────────────────────────────
  /** Average contractor day rate ($) — US */
  contractorDayRateUs: number;
  /** Average contractor day rate (£) — UK */
  contractorDayRateUk: number;
}

export interface EnergyData {
  /** Average US residential electricity price ($/kWh) */
  electricityPriceUs: number;
  /** Average UK residential electricity price (£/kWh) */
  electricityPriceUk: number;
  /** Average US residential natural gas price ($/therm) */
  gasPriceUs: number;
  /** Average UK residential natural gas price (£/kWh) */
  gasPriceUk: number;
  /** Average solar panel system cost ($/watt) — US installed */
  solarInstallCostPerWattUs: number;
  /** Average solar panel system cost (£/watt) — UK installed */
  solarInstallCostPerWattUk: number;
  /** Average solar system size for a home (kW) */
  typicalSolarSystemKw: number;
  /** Average EV home charger installation cost ($) — US */
  evChargerInstallUs: number;
  /** Average EV home charger installation cost (£) — UK */
  evChargerInstallUk: number;
  /** US average fuel price per gallon ($) */
  fuelPricePerGallonUs: number;
  /** UK average fuel price per litre (£) */
  fuelPricePerLitreUk: number;
}

export interface HealthData {
  /** Average dental implant cost per tooth ($) — US */
  dentalImplantUs: number;
  /** Average dental implant cost per tooth (£) — UK private */
  dentalImplantUk: number;
  /** Average gym membership per month ($) — US */
  gymMembershipUs: number;
  /** Average NHS dental check-up fee (£) — UK Band 1 */
  nhsDentalBand1: number;
}

export interface DataStore {
  finance: FinanceData;
  tax: TaxData;
  construction: ConstructionData;
  energy: EnergyData;
  health: HealthData;
  /** ISO 8601 date — when these defaults were last verified/updated */
  lastUpdated: string;
  /** Data version — increment when making breaking changes to shape */
  version: number;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
// Values reflect US/UK market conditions as of May 2026.
// Sources: Fed, BLS, IRS Rev. Proc. 2025-28, HMRC 2026-27, EIA, OFGEM.

const FINANCE_DEFAULTS: FinanceData = {
  mortgageRate:       6.7,
  mortgageRate15yr:   6.1,
  savingsRate:        4.5,
  moneyMarketRate:    4.2,
  inflationRate:      3.2,
  stockMarketReturn:  7.0,
  bondYield:          4.4,
  personalLoanRate:  11.5,
  autoLoanRateNew:    7.1,
  autoLoanRateUsed:  11.3,
  creditCardAPR:     20.7,
  studentLoanRate:    6.5,
  rentalYield:        5.2,
  homeAppreciation:   4.0,
};

const TAX_DEFAULTS: TaxData = {
  // US 2026 — IRS Rev. Proc. 2025-28
  standardDeductionSingle:      14_600,
  standardDeductionMarried:     29_200,
  socialSecurityRate:           0.062,
  medicareRate:                 0.0145,
  socialSecurityWageBase:      180_000,
  ltcgZeroRateCeilingSingle:    48_350,
  k401ContributionLimit:        23_500,
  k401CatchUpLimit:              7_500,
  iraContributionLimit:          7_000,
  hsaLimitIndividual:            4_300,
  hsaLimitFamily:                8_550,
  // UK 2026-27 — HMRC
  ukPersonalAllowance:          12_570,
  ukBasicRate:                  0.20,
  ukHigherRate:                 0.40,
  ukHigherRateThreshold:        50_270,
  ukNationalInsuranceRate:      0.08,
};

const CONSTRUCTION_DEFAULTS: ConstructionData = {
  // Concrete
  concreteCostPerCuYd:   150,
  readyMixLowPerCuYd:    120,
  readyMixHighPerCuYd:   200,
  concreteCostPerM3Uk:   140,
  // Gravel
  gravelPerShortTon:      40,
  gravelPerTonneUk:       35,
  // Roofing
  roofReplacementPerSqFt: 5.5,
  roofReplacementPerM2Uk: 55,
  // Labour
  contractorDayRateUs:   450,
  contractorDayRateUk:   300,
};

const ENERGY_DEFAULTS: EnergyData = {
  electricityPriceUs:        0.17,
  electricityPriceUk:        0.29,
  gasPriceUs:                1.20,
  gasPriceUk:                0.06,
  solarInstallCostPerWattUs: 2.90,
  solarInstallCostPerWattUk: 2.10,
  typicalSolarSystemKw:      6,
  evChargerInstallUs:        1_200,
  evChargerInstallUk:          900,
  fuelPricePerGallonUs:      3.85,
  fuelPricePerLitreUk:       1.50,
};

const HEALTH_DEFAULTS: HealthData = {
  dentalImplantUs:  4_500,
  dentalImplantUk:  2_500,
  gymMembershipUs:     55,
  nhsDentalBand1:       26,
};

// ─── Central Store ────────────────────────────────────────────────────────────
// This object is intentionally mutable so LAYER 2 (api/update-data) can
// overwrite individual keys at runtime without touching calculator code.

export const dataStore: DataStore = {
  finance:      { ...FINANCE_DEFAULTS },
  tax:          { ...TAX_DEFAULTS },
  construction: { ...CONSTRUCTION_DEFAULTS },
  energy:       { ...ENERGY_DEFAULTS },
  health:       { ...HEALTH_DEFAULTS },
  lastUpdated:  "2026-05-19",
  version:      1,
};

// ─── Getter Functions (safe fallbacks) ────────────────────────────────────────
// Prefer these over direct property access in calculators.
// They always return a valid typed object — never undefined / null.

/**
 * Returns current finance defaults.
 * Safe to call on server and client.
 */
export function getFinanceData(): FinanceData {
  return { ...FINANCE_DEFAULTS, ...dataStore.finance };
}

/**
 * Returns current tax defaults.
 * Safe to call on server and client.
 */
export function getTaxData(): TaxData {
  return { ...TAX_DEFAULTS, ...dataStore.tax };
}

/**
 * Returns current construction cost defaults.
 * Safe to call on server and client.
 */
export function getConstructionData(): ConstructionData {
  return { ...CONSTRUCTION_DEFAULTS, ...dataStore.construction };
}

/**
 * Returns current energy price defaults.
 * Safe to call on server and client.
 */
export function getEnergyData(): EnergyData {
  return { ...ENERGY_DEFAULTS, ...dataStore.energy };
}

/**
 * Returns current health cost defaults.
 * Safe to call on server and client.
 */
export function getHealthData(): HealthData {
  return { ...HEALTH_DEFAULTS, ...dataStore.health };
}

/**
 * Returns the ISO 8601 date the store was last updated.
 */
export function getLastUpdated(): string {
  return dataStore.lastUpdated;
}

/**
 * Returns a single finance value by key, with guaranteed fallback.
 *
 * @example
 * const rate = userRate ?? getFinanceValue("mortgageRate");
 */
export function getFinanceValue<K extends keyof FinanceData>(key: K): FinanceData[K] {
  return dataStore.finance[key] ?? FINANCE_DEFAULTS[key];
}

/**
 * Returns a single construction value by key, with guaranteed fallback.
 *
 * @example
 * const price = userPrice ?? getConstructionValue("concreteCostPerCuYd");
 */
export function getConstructionValue<K extends keyof ConstructionData>(key: K): ConstructionData[K] {
  return dataStore.construction[key] ?? CONSTRUCTION_DEFAULTS[key];
}

/**
 * Returns a single energy value by key, with guaranteed fallback.
 *
 * @example
 * const price = userPrice ?? getEnergyValue("electricityPriceUs");
 */
export function getEnergyValue<K extends keyof EnergyData>(key: K): EnergyData[K] {
  return dataStore.energy[key] ?? ENERGY_DEFAULTS[key];
}

/**
 * Returns a single tax value by key, with guaranteed fallback.
 *
 * @example
 * const ssRate = getTaxValue("socialSecurityRate");
 */
export function getTaxValue<K extends keyof TaxData>(key: K): TaxData[K] {
  return dataStore.tax[key] ?? TAX_DEFAULTS[key];
}
