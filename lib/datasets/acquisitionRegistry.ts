// ─── WorthCore Acquisition Registry ──────────────────────────────────────────
//
// PURPOSE:
//   Master roadmap for all benchmark intelligence acquisition.
//   Maps every benchmark field to the calculator(s) that consume it,
//   the source that provides it, and the dataset that stores it.
//
// THIS IS NOT:
//   - Runtime infrastructure
//   - A live API dependency
//   - A scraping engine
//
// THIS IS:
//   The permanent blueprint for WorthCore's benchmark manufacturing layer.
//   Every field listed here is either acquired today (active) or on the
//   roadmap (planned/backlog). Nothing in WorthCore is acquired on a whim.
//
// ARCHITECTURE:
//   Apify/FRED/Yahoo → transform → normalize → local dataset → intelligence → calculators
//
// USAGE:
//   import { ACQUISITION_REGISTRY, getAcquisitionByCategory } from "@/lib/datasets/acquisitionRegistry";
//   const housing = getAcquisitionByCategory("housing-ownership");
//   const forCalculator = getAcquisitionByCalculator("mortgage");

import type { RefreshCadence } from "./refreshRegistry";

// ─── Types ───────────────────────────────────────────────────────────────────

export type AcquisitionCategory =
  | "cost-of-living"       // Consumer prices, lifestyle, daily spending
  | "housing-ownership"    // Rent, buying, mortgages, moving
  | "construction"         // Materials, labor, home improvement
  | "energy-transport"     // Fuel, EV, electricity, transit, travel
  | "salary-work"          // Wages, freelance, contractor rates, productivity
  | "life-events";         // Weddings, pets, legal, relocation

export type AcquisitionSource =
  | "apify-expatistan"     // Apify → Expatistan city cost pages
  | "apify-numbeo"         // Apify → Numbeo city cost pages
  | "apify-zillow"         // Apify → Zillow rental/sale listings
  | "apify-redfin"         // Apify → Redfin home price data
  | "apify-homeadvisor"    // Apify → HomeAdvisor project cost pages
  | "apify-angi"           // Apify → Angi contractor rates
  | "apify-gasbuddy"       // Apify → GasBuddy fuel price pages
  | "apify-linkedin"       // Apify → LinkedIn job salary pages
  | "apify-glassdoor"      // Apify → Glassdoor salary data pages
  | "apify-upwork"         // Apify → Upwork freelance rate pages
  | "apify-home-depot"     // Apify → Home Depot product pricing
  | "apify-lowes"          // Apify → Lowe's product pricing
  | "apify-uhaul"          // Apify → U-Haul truck/storage pricing
  | "apify-retailer"       // Apify → generic retailer (Walmart, Target, etc.)
  | "apify-vendor"         // Apify → vendor/marketplace pricing (pet, wedding, etc.)
  | "fred"                 // St. Louis Fed FRED API
  | "yahoo-finance"        // Yahoo Finance quote/screener API
  | "bls"                  // Bureau of Labor Statistics public API
  | "manual-survey";       // Annual published surveys — manual refresh

/** Acquisition status of a benchmark field */
export type BenchmarkStatus =
  | "active"    // Field exists in local dataset and is refreshed on schedule
  | "planned"   // Dataset file is designed; acquisition script is next milestone
  | "backlog";  // Identified but not yet scoped — future expansion

export interface AcquisitionEntry {
  /**
   * Normalized benchmark field name (camelCase).
   * Must match the actual TypeScript field name in the target dataset.
   */
  readonly field: string;

  /** Human-readable benchmark label */
  readonly label: string;

  /** Unit description — what the number represents */
  readonly unit: string;

  /** Which WorthCore calculators consume this benchmark */
  readonly calculators: readonly string[];

  /** Which domain category this benchmark belongs to */
  readonly category: AcquisitionCategory;

  /** Primary acquisition source */
  readonly source: AcquisitionSource;

  /** Target local dataset file (relative to project root) */
  readonly dataset: string;

  /** Recommended refresh cadence */
  readonly cadence: RefreshCadence;

  /** Current acquisition status */
  readonly status: BenchmarkStatus;

  /** Optional notes: source URL patterns, series IDs, scraping approach */
  readonly notes?: string;
}

// ─── Registry ─────────────────────────────────────────────────────────────────

export const ACQUISITION_REGISTRY = [

  // ╔══════════════════════════════════════════════════════════════════════════╗
  // ║  CATEGORY 1 — COST OF LIVING / LIFESTYLE                                ║
  // ╚══════════════════════════════════════════════════════════════════════════╝

  {
    field:       "groceriesMonthlyUs",
    label:       "Monthly Grocery Spend (2-adult household)",
    unit:        "USD/month",
    calculators: ["budget-calculator", "grocery-unit-price", "meal-prep"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'monthly food basket' category. 8-city US average.",
  },
  {
    field:       "coffeePerCupUs",
    label:       "Coffee Per Cup (café)",
    unit:        "USD/cup",
    calculators: ["caffeine-half-life", "budget-calculator"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'cappuccino in expat area of the city'. 8-city avg.",
  },
  {
    field:       "coffeeAnnualIfDaily",
    label:       "Annual Coffee Cost (daily habit)",
    unit:        "USD/year",
    calculators: ["caffeine-half-life", "budget-calculator"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Derived: coffeePerCupUs × 365. Recalculated by updateCostBenchmarks.ts.",
  },
  {
    field:       "restaurantMealUs",
    label:       "Restaurant Meal Per Person",
    unit:        "USD/meal",
    calculators: ["budget-calculator", "relationship-cost", "meal-prep"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'dinner for two in neighborhood pub' ÷ 2. 8-city avg.",
  },
  {
    field:       "businessLunchUs",
    label:       "Business District Lunch",
    unit:        "USD/meal",
    calculators: ["wfh-savings-calculator", "commute-cost-calculator"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'basic lunchtime menu including a drink in the business district'.",
  },
  {
    field:       "utilitiesMonthlyUs",
    label:       "Monthly Utilities (electricity, gas, water)",
    unit:        "USD/month",
    calculators: ["budget-calculator", "appliance-energy-cost", "wfh-savings-calculator"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'utilities 1 month (heating, electricity, gas, water) for 2 people in 85m2 flat'.",
  },
  {
    field:       "gymMonthlyUs",
    label:       "Monthly Gym Membership",
    unit:        "USD/month",
    calculators: ["budget-calculator", "subscription-auditor"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'monthly gym membership in business district'. 8-city avg.",
  },
  {
    field:       "subscriptionsMonthlyUs",
    label:       "Monthly Digital Subscriptions (all-in)",
    unit:        "USD/month",
    calculators: ["subscription-auditor", "budget-calculator"],
    category:    "cost-of-living",
    source:      "manual-survey",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "Forbes/Chase Annual Subscription Spend Survey. Refresh Q1 each year.",
  },
  {
    field:       "streamingOnlyMonthlyUs",
    label:       "Monthly Streaming Subscriptions Only",
    unit:        "USD/month",
    calculators: ["subscription-auditor"],
    category:    "cost-of-living",
    source:      "manual-survey",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "Derived from Forbes survey: streaming-only subset of subscriptionsMonthlyUs.",
  },
  {
    field:       "childcareMonthlyUs",
    label:       "Monthly Infant Childcare (center-based)",
    unit:        "USD/month",
    calculators: ["budget-calculator", "child-support-calculator"],
    category:    "cost-of-living",
    source:      "manual-survey",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "HHS / Care.com Annual Cost of Care Survey. Refresh February each year.",
  },
  {
    field:       "cigarettesPerPackUs",
    label:       "Cigarettes Per Pack",
    unit:        "USD/pack",
    calculators: ["quit-smoking-calculator"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'package of Marlboro cigarettes'. 8-city avg. Incl. state taxes.",
  },
  {
    field:       "cigarettesAnnualIfDaily",
    label:       "Annual Cigarette Cost (1 pack/day)",
    unit:        "USD/year",
    calculators: ["quit-smoking-calculator"],
    category:    "cost-of-living",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Derived: cigarettesPerPackUs × 365. Recalculated by updateCostBenchmarks.ts.",
  },
  {
    field:       "vapingMonthlyUs",
    label:       "Monthly Vaping Cost",
    unit:        "USD/month",
    calculators: ["quit-smoking-calculator"],
    category:    "cost-of-living",
    source:      "apify-retailer",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Vape retailer product pages. Average pod/device consumption model.",
  },
  {
    field:       "petMonthlyDogUs",
    label:       "Monthly Dog Ownership Cost",
    unit:        "USD/month",
    calculators: ["pet-cost-calculator"],
    category:    "cost-of-living",
    source:      "manual-survey",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "APPA National Pet Owners Survey. Includes food, vet, grooming, supplies.",
  },
  {
    field:       "petMonthlyIns",
    label:       "Monthly Pet Insurance (dog)",
    unit:        "USD/month",
    calculators: ["pet-cost-calculator"],
    category:    "cost-of-living",
    source:      "apify-vendor",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Healthy Paws, Nationwide, Embrace pricing pages. Medium dog, accident+illness.",
  },

  // ╔══════════════════════════════════════════════════════════════════════════╗
  // ║  CATEGORY 2 — HOUSING / OWNERSHIP                                       ║
  // ╚══════════════════════════════════════════════════════════════════════════╝

  {
    field:       "rentNormalMonthlyUs",
    label:       "Monthly Rent — 900 sqft, Normal Area",
    unit:        "USD/month",
    calculators: ["rent-vs-buy-calculator", "house-affordability-calculator", "budget-calculator", "closing-cost-calculator"],
    category:    "housing-ownership",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'monthly rent 85m2 (900 sqft) furnished, normal area'. 8-city avg.",
  },
  {
    field:       "rentExpensiveMonthlyUs",
    label:       "Monthly Rent — 900 sqft, Expensive Area",
    unit:        "USD/month",
    calculators: ["rent-vs-buy-calculator", "house-affordability-calculator"],
    category:    "housing-ownership",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'monthly rent 85m2 (900 sqft) furnished, expensive area'. 8-city avg.",
  },
  {
    field:       "medianRent1BrUs",
    label:       "Median 1-Bedroom Rent",
    unit:        "USD/month",
    calculators: ["rent-vs-buy-calculator", "house-affordability-calculator"],
    category:    "housing-ownership",
    source:      "apify-zillow",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Zillow rental pages. US national median.",
  },
  {
    field:       "medianRent2BrUs",
    label:       "Median 2-Bedroom Rent",
    unit:        "USD/month",
    calculators: ["rent-vs-buy-calculator", "house-affordability-calculator", "budget-calculator"],
    category:    "housing-ownership",
    source:      "apify-zillow",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Zillow rental pages. US national median.",
  },
  {
    field:       "medianHomePriceUs",
    label:       "Median Home Sale Price",
    unit:        "USD",
    calculators: ["rent-vs-buy-calculator", "house-affordability-calculator", "closing-cost-calculator"],
    category:    "housing-ownership",
    source:      "apify-redfin",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Redfin Data Center median sale price page.",
  },
  {
    field:       "hoaMonthlyUs",
    label:       "Average Monthly HOA Fee",
    unit:        "USD/month",
    calculators: ["house-affordability-calculator", "rent-vs-buy-calculator"],
    category:    "housing-ownership",
    source:      "manual-survey",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Freddie Mac / Zillow HOA survey data. ~$200–$400/mo national avg.",
  },
  {
    field:       "propertyTaxRateUs",
    label:       "Effective Property Tax Rate (national avg)",
    unit:        "% of home value/year",
    calculators: ["house-affordability-calculator", "rent-vs-buy-calculator"],
    category:    "housing-ownership",
    source:      "manual-survey",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Tax Foundation / ATTOM annual property tax report.",
  },
  {
    field:       "homeInsuranceMonthlyUs",
    label:       "Monthly Homeowners Insurance",
    unit:        "USD/month",
    calculators: ["house-affordability-calculator", "closing-cost-calculator"],
    category:    "housing-ownership",
    source:      "manual-survey",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Insurance Information Institute / Bankrate annual survey.",
  },
  {
    field:       "movingCostLocalUs",
    label:       "Local Move Cost (< 100 miles)",
    unit:        "USD",
    calculators: ["moving-cost-calculator"],
    category:    "housing-ownership",
    source:      "apify-uhaul",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → U-Haul truck + moving company pricing pages. 2-bedroom move model.",
  },
  {
    field:       "movingCostInterstateUs",
    label:       "Interstate Move Cost (cross-state)",
    unit:        "USD",
    calculators: ["moving-cost-calculator"],
    category:    "housing-ownership",
    source:      "apify-uhaul",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → U-Haul + AMSA (American Moving & Storage Assoc.) pricing.",
  },
  {
    field:       "rentersInsuranceMonthlyUs",
    label:       "Monthly Renters Insurance",
    unit:        "USD/month",
    calculators: ["rent-vs-buy-calculator", "budget-calculator"],
    category:    "housing-ownership",
    source:      "manual-survey",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Insurance Information Institute. Avg ~$15–$30/mo.",
  },

  // ╔══════════════════════════════════════════════════════════════════════════╗
  // ║  CATEGORY 3 — CONSTRUCTION / HOME IMPROVEMENT                           ║
  // ╚══════════════════════════════════════════════════════════════════════════╝

  {
    field:       "flooringCostPerSqFtUs",
    label:       "Flooring Material Cost Per Sq Ft",
    unit:        "USD/sqft",
    calculators: ["flooring-cost-calculator"],
    category:    "construction",
    source:      "apify-home-depot",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Home Depot + Lowe's flooring category pages. Mid-range LVP baseline.",
  },
  {
    field:       "paintCostPerGallonUs",
    label:       "Interior Paint Per Gallon",
    unit:        "USD/gallon",
    calculators: ["paint-coverage-calculator"],
    category:    "construction",
    source:      "apify-home-depot",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Home Depot paint aisle. Mid-grade interior latex, 1-gallon.",
  },
  {
    field:       "tileCostPerSqFtUs",
    label:       "Tile Material Cost Per Sq Ft",
    unit:        "USD/sqft",
    calculators: ["tile-calculator"],
    category:    "construction",
    source:      "apify-home-depot",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Home Depot tile category. Mid-range porcelain baseline.",
  },
  {
    field:       "concretePerCubicYardUs",
    label:       "Ready-Mix Concrete Per Cubic Yard",
    unit:        "USD/cubic yard",
    calculators: ["concrete-calculator"],
    category:    "construction",
    source:      "apify-vendor",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → concrete supplier pricing pages. Regional avg. ~$150–$200/yd³.",
  },
  {
    field:       "laborRateDrywall",
    label:       "Drywall Installation Labor Per Sq Ft",
    unit:        "USD/sqft",
    calculators: [],
    category:    "construction",
    source:      "apify-angi",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Angi/HomeAdvisor project cost pages. Includes hang + tape + mud.",
  },
  {
    field:       "laborRatePlumbing",
    label:       "Plumber Hourly Rate",
    unit:        "USD/hour",
    calculators: [],
    category:    "construction",
    source:      "apify-angi",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Angi/HomeAdvisor plumber cost pages. Residential service call avg.",
  },
  {
    field:       "laborRateElectrical",
    label:       "Electrician Hourly Rate",
    unit:        "USD/hour",
    calculators: [],
    category:    "construction",
    source:      "apify-angi",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Angi/HomeAdvisor electrician cost pages. Licensed residential avg.",
  },
  {
    field:       "laborRatePainting",
    label:       "Interior Painting Labor Per Sq Ft",
    unit:        "USD/sqft",
    calculators: ["paint-coverage-calculator"],
    category:    "construction",
    source:      "apify-angi",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Angi/HomeAdvisor painting cost pages. 2 coats, walls only.",
  },
  {
    field:       "flooringInstallPerSqFtUs",
    label:       "Flooring Installation Labor Per Sq Ft",
    unit:        "USD/sqft",
    calculators: ["flooring-cost-calculator"],
    category:    "construction",
    source:      "apify-angi",
    dataset:     "lib/datasets/construction/constructionBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → Angi/HomeAdvisor flooring install pages. LVP click-lock baseline.",
  },

  // ╔══════════════════════════════════════════════════════════════════════════╗
  // ║  CATEGORY 4 — ENERGY / TRANSPORT                                        ║
  // ╚══════════════════════════════════════════════════════════════════════════╝

  {
    field:       "fuelPerGallonUs",
    label:       "Retail Fuel Price Per Gallon",
    unit:        "USD/gallon",
    calculators: ["commute-cost-calculator", "road-trip-calculator", "ev-vs-gas-calculator"],
    category:    "energy-transport",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: '1 liter (1/4 gallon) of gas' × 3.785. 8-city US avg.",
  },
  {
    field:       "publicTransitMonthlyUs",
    label:       "Monthly Public Transit Pass",
    unit:        "USD/month",
    calculators: ["commute-cost-calculator", "wfh-savings-calculator"],
    category:    "energy-transport",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/costs/costBenchmarks.ts",
    cadence:     "weekly",
    status:      "active",
    notes:       "Expatistan: 'monthly ticket public transport'. 8-city avg.",
  },
  {
    field:       "electricityPerKwhUs",
    label:       "Electricity Cost Per kWh",
    unit:        "USD/kWh",
    calculators: ["appliance-energy-cost", "ev-vs-gas-calculator", "solar-roi-calculator", "wfh-savings-calculator"],
    category:    "energy-transport",
    source:      "apify-expatistan",
    dataset:     "lib/datasets/energy/energyBenchmarks.ts",
    cadence:     "weekly",
    status:      "planned",
    notes:       "Expatistan: 'electricity per kWh'. Alternatively: GasBuddy equivalent for electricity.",
  },
  {
    field:       "evChargingPerKwhUs",
    label:       "EV Public Charging Cost Per kWh",
    unit:        "USD/kWh",
    calculators: ["ev-vs-gas-calculator", "commute-cost-calculator"],
    category:    "energy-transport",
    source:      "apify-vendor",
    dataset:     "lib/datasets/energy/energyBenchmarks.ts",
    cadence:     "weekly",
    status:      "planned",
    notes:       "Apify → ChargePoint / Blink / EVgo pricing pages. Level 2 and DC fast charge avg.",
  },
  {
    field:       "solarInstallPerWattUs",
    label:       "Solar Panel Installation Per Watt",
    unit:        "USD/watt",
    calculators: ["solar-roi-calculator"],
    category:    "energy-transport",
    source:      "apify-vendor",
    dataset:     "lib/datasets/energy/energyBenchmarks.ts",
    cadence:     "quarterly",
    status:      "planned",
    notes:       "Apify → solar installer quote pages + SEIA (Solar Energy Industries Assoc.) reports.",
  },
  {
    field:       "hotelNightUsAvg",
    label:       "Average Hotel Night (mid-range, US)",
    unit:        "USD/night",
    calculators: ["road-trip-calculator"],
    category:    "energy-transport",
    source:      "apify-vendor",
    dataset:     "lib/datasets/energy/energyBenchmarks.ts",
    cadence:     "weekly",
    status:      "planned",
    notes:       "Apify → Hotels.com / Booking.com search results. 3-star, 1 adult, 7-day advance.",
  },

  // ╔══════════════════════════════════════════════════════════════════════════╗
  // ║  CATEGORY 5 — SALARY / WORK / PRODUCTIVITY                              ║
  // ╚══════════════════════════════════════════════════════════════════════════╝

  {
    field:       "avgHourlyWageUs",
    label:       "Average Hourly Wage (all private sector)",
    unit:        "USD/hour",
    calculators: ["true-hourly-wage-calculator", "burnout-calculator", "meeting-cost-calculator", "salary-negotiation-calculator"],
    category:    "salary-work",
    source:      "bls",
    dataset:     "lib/datasets/salary/salaryBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "BLS CES: CES0500000003. Run: npx tsx scripts/updateBlsBenchmarks.ts",
  },
  {
    field:       "avgWeeklyHoursUs",
    label:       "Average Weekly Hours Worked",
    unit:        "hours/week",
    calculators: ["true-hourly-wage-calculator", "burnout-calculator"],
    category:    "salary-work",
    source:      "bls",
    dataset:     "lib/datasets/salary/salaryBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "BLS CES: CES0500000007. Total private sector, seasonally adjusted.",
  },
  {
    field:       "unemploymentRateUs",
    label:       "Unemployment Rate",
    unit:        "% of labor force",
    calculators: ["burnout-calculator", "salary-negotiation-calculator"],
    category:    "salary-work",
    source:      "bls",
    dataset:     "lib/datasets/salary/salaryBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "BLS: LNS14000000. Seasonally adjusted.",
  },
  {
    field:       "impliedAnnualSalaryUs",
    label:       "Implied Annual Salary (avg worker)",
    unit:        "USD/year",
    calculators: ["salary-negotiation-calculator", "budget-calculator", "retirement-calculator"],
    category:    "salary-work",
    source:      "bls",
    dataset:     "lib/datasets/salary/salaryBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "Derived: avgHourlyWageUs × avgWeeklyHoursUs × 52.",
  },
  {
    field:       "inflationRateUs",
    label:       "Year-Over-Year CPI Inflation Rate",
    unit:        "%",
    calculators: ["budget-calculator", "coast-fire-calculator", "401k-calculator", "retirement-calculator"],
    category:    "salary-work",
    source:      "bls",
    dataset:     "lib/datasets/salary/salaryBenchmarks.ts",
    cadence:     "monthly",
    status:      "active",
    notes:       "BLS CPI-U: CUUR0000SA0. 12-month change. Will migrate to FRED when planned script is built.",
  },
  {
    field:       "freelanceRateWebDevUs",
    label:       "Freelance Web Dev Hourly Rate",
    unit:        "USD/hour",
    calculators: ["freelance-rate-calculator", "true-hourly-wage-calculator"],
    category:    "salary-work",
    source:      "apify-upwork",
    dataset:     "lib/datasets/salary/freelanceBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Upwork search results: 'web developer'. Filter: Top Rated, hourly. Median rate.",
  },
  {
    field:       "freelanceRateDesignUs",
    label:       "Freelance Designer Hourly Rate",
    unit:        "USD/hour",
    calculators: ["freelance-rate-calculator"],
    category:    "salary-work",
    source:      "apify-upwork",
    dataset:     "lib/datasets/salary/freelanceBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Upwork search results: 'graphic designer / UI designer'. Median rate.",
  },
  {
    field:       "freelanceRateWritingUs",
    label:       "Freelance Writer Hourly Rate",
    unit:        "USD/hour",
    calculators: ["freelance-rate-calculator", "side-hustle-calculator"],
    category:    "salary-work",
    source:      "apify-upwork",
    dataset:     "lib/datasets/salary/freelanceBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Upwork search results: 'content writer / copywriter'. Median rate.",
  },
  {
    field:       "contractorDailyRateUs",
    label:       "Independent Contractor Daily Rate (avg)",
    unit:        "USD/day",
    calculators: ["freelance-rate-calculator", "true-hourly-wage-calculator"],
    category:    "salary-work",
    source:      "apify-glassdoor",
    dataset:     "lib/datasets/salary/freelanceBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → Glassdoor / LinkedIn contractor salary pages. 8-hour day model.",
  },

  // ╔══════════════════════════════════════════════════════════════════════════╗
  // ║  CATEGORY 6 — LIFE EVENTS / HUMAN BURDEN                                ║
  // ╚══════════════════════════════════════════════════════════════════════════╝

  {
    field:       "avgWeddingCostUs",
    label:       "Average Total US Wedding Cost",
    unit:        "USD",
    calculators: ["wedding-cost-calculator"],
    category:    "life-events",
    source:      "manual-survey",
    dataset:     "lib/datasets/events/eventBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "The Knot Real Weddings Survey. Refresh March each year. National median ~$30,000.",
  },
  {
    field:       "avgWeddingVenueUs",
    label:       "Average Wedding Venue Cost",
    unit:        "USD",
    calculators: ["wedding-cost-calculator"],
    category:    "life-events",
    source:      "apify-vendor",
    dataset:     "lib/datasets/events/eventBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → WeddingWire / The Knot venue pricing pages. 150 guests, Saturday model.",
  },
  {
    field:       "avgWeddingCateringPerGuestUs",
    label:       "Wedding Catering Cost Per Guest",
    unit:        "USD/guest",
    calculators: ["wedding-cost-calculator"],
    category:    "life-events",
    source:      "apify-vendor",
    dataset:     "lib/datasets/events/eventBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → catering vendor pricing pages. Plated dinner + bar package model.",
  },
  {
    field:       "petLifetimeCostDogUs",
    label:       "Lifetime Dog Ownership Cost",
    unit:        "USD",
    calculators: ["pet-cost-calculator"],
    category:    "life-events",
    source:      "manual-survey",
    dataset:     "lib/datasets/events/eventBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "APPA / ASPCA annual pet cost survey. Medium dog, 12-year lifespan model.",
  },
  {
    field:       "avgDivorceLegalFeeUs",
    label:       "Average Divorce Legal Fee",
    unit:        "USD",
    calculators: ["relationship-cost"],
    category:    "life-events",
    source:      "manual-survey",
    dataset:     "lib/datasets/events/eventBenchmarks.ts",
    cadence:     "monthly",
    status:      "backlog",
    notes:       "Martindale-Nolo Legal Research survey. Contested avg ~$15,000. Uncontested ~$4,000.",
  },
  {
    field:       "averageRelocationCostUs",
    label:       "Average Full Relocation Cost",
    unit:        "USD",
    calculators: ["moving-cost-calculator"],
    category:    "life-events",
    source:      "apify-uhaul",
    dataset:     "lib/datasets/housing/housingBenchmarks.ts",
    cadence:     "monthly",
    status:      "planned",
    notes:       "Apify → moving company + truck rental combined. Cross-state, 2-bedroom model.",
  },

] as const satisfies AcquisitionEntry[];

// ─── Accessors ────────────────────────────────────────────────────────────────

/** All entries for a given category */
export function getAcquisitionByCategory(
  category: AcquisitionCategory,
): AcquisitionEntry[] {
  return ACQUISITION_REGISTRY.filter((e) => e.category === category);
}

/** All entries that list a given calculator slug */
export function getAcquisitionByCalculator(calculatorSlug: string): AcquisitionEntry[] {
  return ACQUISITION_REGISTRY.filter((e) =>
    (e.calculators as readonly string[]).includes(calculatorSlug),
  );
}

/** All entries for a given acquisition status */
export function getAcquisitionByStatus(status: BenchmarkStatus): AcquisitionEntry[] {
  return ACQUISITION_REGISTRY.filter((e) => e.status === status);
}

/** All entries for a given data source */
export function getAcquisitionBySource(source: AcquisitionSource): AcquisitionEntry[] {
  return ACQUISITION_REGISTRY.filter((e) => e.source === source);
}

/** Summary counts by status — useful for progress reporting */
export function getAcquisitionSummary(): Record<BenchmarkStatus, number> {
  return ACQUISITION_REGISTRY.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<BenchmarkStatus, number>,
  );
}
