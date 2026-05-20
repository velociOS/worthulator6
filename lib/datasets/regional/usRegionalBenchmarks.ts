// ─── US State Food & Dining Benchmarks ───────────────────────────────────────
//
// PURPOSE:
//   Per-state food cost benchmarks for all 50 US states + national average.
//   Consumed by WorthCore calculators to inject state-level contextual
//   defaults into insight generators.
//
// RULES:
//   ✅ Pure TypeScript — no async, no fetch, no React
//   ✅ SSR-safe — safe to import in server and client components
//   ✅ getRegionalBenchmarks() always returns a value — never throws
//   ✅ "National" is always the fallback for unknown states
//   ❌ Never import from components/ or app/
//
// METHODOLOGY:
//   Each state has a food cost index relative to the national average (1.00).
//   Indices derived from BLS Regional Price Parities + Numbeo city data (2024-25).
//   State benchmark = national baseline × state index (rounded to 2dp).
//
// ─────────────────────────────────────────────────────────────────────────────

export interface RegionalBenchmarks {
  /** Inexpensive restaurant meal, 1 person ($) */
  restaurantMeal: number;
  /** Fast food combo meal ($) */
  fastFoodCombo: number;
  /** Delivery app meal including fees & tip ($) */
  deliveryMeal: number;
  /** Monthly grocery budget for 1 person ($) */
  groceryMonthly: number;
  /** Display label used in benchmark visualizations */
  label: string;
}

// ─── National baselines (fallback / "National" selection) ─────────────────────

const NATIONAL: Omit<RegionalBenchmarks, "label"> = {
  restaurantMeal: 16.00,
  fastFoodCombo:  10.50,
  deliveryMeal:   22.00,
  groceryMonthly: 300,
};

// ─── Per-state food cost index (1.00 = national average) ─────────────────────
// Source: BLS Regional Price Parities 2024, Numbeo metro cost data 2025

const STATE_INDEX: Record<string, number> = {
  "Alabama":        0.88,
  "Alaska":         1.45,
  "Arizona":        1.05,
  "Arkansas":       0.87,
  "California":     1.38,
  "Colorado":       1.12,
  "Connecticut":    1.22,
  "Delaware":       1.05,
  "Florida":        1.08,
  "Georgia":        0.96,
  "Hawaii":         1.55,
  "Idaho":          0.98,
  "Illinois":       1.10,
  "Indiana":        0.91,
  "Iowa":           0.90,
  "Kansas":         0.89,
  "Kentucky":       0.87,
  "Louisiana":      0.92,
  "Maine":          1.05,
  "Maryland":       1.15,
  "Massachusetts":  1.25,
  "Michigan":       0.95,
  "Minnesota":      1.00,
  "Mississippi":    0.85,
  "Missouri":       0.89,
  "Montana":        1.00,
  "Nebraska":       0.90,
  "Nevada":         1.08,
  "New Hampshire":  1.10,
  "New Jersey":     1.20,
  "New Mexico":     0.94,
  "New York":       1.32,
  "North Carolina": 0.93,
  "North Dakota":   0.94,
  "Ohio":           0.90,
  "Oklahoma":       0.88,
  "Oregon":         1.10,
  "Pennsylvania":   1.05,
  "Rhode Island":   1.12,
  "South Carolina": 0.93,
  "South Dakota":   0.90,
  "Tennessee":      0.90,
  "Texas":          0.96,
  "Utah":           1.02,
  "Vermont":        1.10,
  "Virginia":       1.05,
  "Washington":     1.18,
  "West Virginia":  0.86,
  "Wisconsin":      0.92,
  "Wyoming":        0.96,
};

// ─── Lookup ───────────────────────────────────────────────────────────────────

/**
 * Returns food benchmarks for the given US state name.
 * Falls back to national average for "National" or unknown values.
 */
export function getRegionalBenchmarks(state: string): RegionalBenchmarks {
  if (!state || state === "National") {
    return { ...NATIONAL, label: "National" };
  }
  const idx = STATE_INDEX[state] ?? 1.0;
  return {
    restaurantMeal: Math.round(NATIONAL.restaurantMeal * idx * 100) / 100,
    fastFoodCombo:  Math.round(NATIONAL.fastFoodCombo  * idx * 100) / 100,
    deliveryMeal:   Math.round(NATIONAL.deliveryMeal   * idx * 100) / 100,
    groceryMonthly: Math.round(NATIONAL.groceryMonthly * idx),
    label:          state,
  };
}

// ─── Dropdown options (for CalculatorEngine dropdown inputs) ─────────────────

export const US_STATE_OPTIONS: { label: string; value: string }[] = [
  { label: "National average",  value: "National"        },
  { label: "Alabama",           value: "Alabama"         },
  { label: "Alaska",            value: "Alaska"          },
  { label: "Arizona",           value: "Arizona"         },
  { label: "Arkansas",          value: "Arkansas"        },
  { label: "California",        value: "California"      },
  { label: "Colorado",          value: "Colorado"        },
  { label: "Connecticut",       value: "Connecticut"     },
  { label: "Delaware",          value: "Delaware"        },
  { label: "Florida",           value: "Florida"         },
  { label: "Georgia",           value: "Georgia"         },
  { label: "Hawaii",            value: "Hawaii"          },
  { label: "Idaho",             value: "Idaho"           },
  { label: "Illinois",          value: "Illinois"        },
  { label: "Indiana",           value: "Indiana"         },
  { label: "Iowa",              value: "Iowa"            },
  { label: "Kansas",            value: "Kansas"          },
  { label: "Kentucky",          value: "Kentucky"        },
  { label: "Louisiana",         value: "Louisiana"       },
  { label: "Maine",             value: "Maine"           },
  { label: "Maryland",          value: "Maryland"        },
  { label: "Massachusetts",     value: "Massachusetts"   },
  { label: "Michigan",          value: "Michigan"        },
  { label: "Minnesota",         value: "Minnesota"       },
  { label: "Mississippi",       value: "Mississippi"     },
  { label: "Missouri",          value: "Missouri"        },
  { label: "Montana",           value: "Montana"         },
  { label: "Nebraska",          value: "Nebraska"        },
  { label: "Nevada",            value: "Nevada"          },
  { label: "New Hampshire",     value: "New Hampshire"   },
  { label: "New Jersey",        value: "New Jersey"      },
  { label: "New Mexico",        value: "New Mexico"      },
  { label: "New York",          value: "New York"        },
  { label: "North Carolina",    value: "North Carolina"  },
  { label: "North Dakota",      value: "North Dakota"    },
  { label: "Ohio",              value: "Ohio"            },
  { label: "Oklahoma",          value: "Oklahoma"        },
  { label: "Oregon",            value: "Oregon"          },
  { label: "Pennsylvania",      value: "Pennsylvania"    },
  { label: "Rhode Island",      value: "Rhode Island"    },
  { label: "South Carolina",    value: "South Carolina"  },
  { label: "South Dakota",      value: "South Dakota"    },
  { label: "Tennessee",         value: "Tennessee"       },
  { label: "Texas",             value: "Texas"           },
  { label: "Utah",              value: "Utah"            },
  { label: "Vermont",           value: "Vermont"         },
  { label: "Virginia",          value: "Virginia"        },
  { label: "Washington",        value: "Washington"      },
  { label: "West Virginia",     value: "West Virginia"   },
  { label: "Wisconsin",         value: "Wisconsin"       },
  { label: "Wyoming",           value: "Wyoming"         },
];
