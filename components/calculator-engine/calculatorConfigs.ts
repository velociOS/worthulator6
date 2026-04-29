// ─── Calculator Engine — Config registry ─────────────────────────────────────
//
// To add a new calculator:
//   1. Create a calculation module in /calculations/<name>.ts
//   2. Add data files in /data/us/ and /data/uk/ if needed
//   3. Add an entry here — no new component required
//
// Key convention:  "<id>"      → US / unit-agnostic
//                  "<id>-uk"   → UK variant

import type { CalculatorRegistry } from "./types";

// ─── Calculation modules — construction ──────────────────────────────────────
import { calculateConcreteBag, calculateConcreteVolume } from "@/calculations/construction/concrete";
import { calculateGravel } from "@/calculations/construction/gravel";

// ─── Data layer — US · construction ──────────────────────────────────────────
import { US_BAG_YIELDS, INCHES_TO_FEET_DIVISOR, CU_FT_TO_CU_YD_DIVISOR, GRAVEL_DENSITY_LBS_PER_CU_YD, LBS_PER_SHORT_TON } from "@/data/us/construction/constants";
import { US_CONSTRUCTION_PRICING } from "@/data/us/construction/pricing";

// ─── Data layer — UK · construction ──────────────────────────────────────────
import { UK_BAG_YIELDS, MM_TO_METRES_DIVISOR, M3_DIVISOR, GRAVEL_DENSITY_KG_PER_M3, KG_PER_TONNE } from "@/data/uk/construction/constants";
import { UK_CONSTRUCTION_PRICING } from "@/data/uk/construction/pricing";

// ─────────────────────────────────────────────────────────────────────────────

export const CALCULATOR_CONFIGS: CalculatorRegistry = {

  // ── Concrete Bag Calculator (US) ─────────────────────────────────────────
  "concrete-bag": {
    id: "concrete-bag",
    category: "construction",
    description: "How many 40, 60, or 80 lb bags you need for any rectangular slab or footing.",
    label: "Concrete Bag Calculator",
    inputs: [
      { name: "length", label: "Length", unit: "ft", type: "slider", min: 1, max: 200, step: 1, default: 12 },
      { name: "width",  label: "Width",  unit: "ft", type: "slider", min: 1, max: 100, step: 1, default: 10 },
      {
        name: "depth", label: "Thickness", unit: "in", type: "slider",
        min: 1, max: 24, step: 1, default: 4,
        hint: "Enter in inches — we convert automatically",
        quickPicks: [2, 3, 4, 6, 8],
      },
      {
        name: "bagSize", label: "Bag size", type: "select", default: 80,
        options: [
          { label: "40 lb", value: 40 },
          { label: "60 lb", value: 60 },
          { label: "80 lb", value: 80 },
        ],
      },
      { name: "waste", label: "Waste factor", unit: "%", type: "slider", min: 0, max: 30, step: 1, default: 5 },
    ],
    outputs: [
      {
        key: "volume", label: "Total volume", unit: "cu yd", format: "decimal", decimalPlaces: 2,
        sublabel: (inputs, outputs) =>
          `+${inputs.waste}% waste → ${outputs.adjustedVolume?.toFixed(2)} cu yd to order`,
      },
      {
        key: "bags", label: "Bags needed", format: "integer", highlight: true,
        sublabel: (inputs) => `Includes ${inputs.waste}% waste allowance`,
      },
      {
        key: "cost", label: "Est. material cost", format: "currency",
        sublabel: () => `Based on $${US_CONSTRUCTION_PRICING.concreteBagPerCuYd}/cu yd · adjust for your area`,
      },
    ],
    calculate: (inputs) => calculateConcreteBag(inputs, {
      bagYields:     US_BAG_YIELDS,
      ratePerUnit:   US_CONSTRUCTION_PRICING.concreteBagPerCuYd,
      depthDivisor:  INCHES_TO_FEET_DIVISOR,
      volumeDivisor: CU_FT_TO_CU_YD_DIVISOR,
    }),
    insight: (inputs, outputs) =>
      `Your ${inputs.length} × ${inputs.width} ft slab at ${inputs.depth} in thick needs ` +
      `${outputs.volume?.toFixed(2)} cu yd — order ${outputs.bags} × ${inputs.bagSize} lb bags ` +
      `with ${inputs.waste}% waste included.`,
    readyMixThreshold: 1.5,
  },

  // ── Concrete Bag Calculator (UK) ─────────────────────────────────────────
  "concrete-bag-uk": {
    id: "concrete-bag-uk",
    category: "construction",
    description: "How many 20 or 25 kg bags you need for any rectangular slab or footing (metric).",
    label: "Concrete Bag Calculator (UK)",
    inputs: [
      { name: "length", label: "Length", unit: "m",  type: "slider", min: 0.1, max: 60,  step: 0.1, default: 3.6 },
      { name: "width",  label: "Width",  unit: "m",  type: "slider", min: 0.1, max: 30,  step: 0.1, default: 3   },
      {
        name: "depth", label: "Thickness", unit: "mm", type: "slider",
        min: 50, max: 300, step: 10, default: 100,
        hint: "Enter in millimetres — we convert automatically",
        quickPicks: [75, 100, 150, 200],
      },
      {
        name: "bagSize", label: "Bag size", type: "select", default: 25,
        options: [
          { label: "20 kg", value: 20 },
          { label: "25 kg", value: 25 },
        ],
      },
      { name: "waste", label: "Waste factor", unit: "%", type: "slider", min: 0, max: 30, step: 1, default: 5 },
    ],
    outputs: [
      {
        key: "volume", label: "Total volume", unit: "m³", format: "decimal", decimalPlaces: 3,
        sublabel: (inputs, outputs) =>
          `+${inputs.waste}% waste → ${outputs.adjustedVolume?.toFixed(3)} m³ to order`,
      },
      {
        key: "bags", label: "Bags needed", format: "integer", highlight: true,
        sublabel: (inputs) => `Includes ${inputs.waste}% waste allowance`,
      },
      {
        key: "cost", label: "Est. material cost", format: "currency", currencySymbol: "£",
        sublabel: () => `Based on £${UK_CONSTRUCTION_PRICING.concreteBagPerM3}/m³ · adjust for your supplier`,
      },
    ],
    calculate: (inputs) => calculateConcreteBag(inputs, {
      bagYields:     UK_BAG_YIELDS,
      ratePerUnit:   UK_CONSTRUCTION_PRICING.concreteBagPerM3,
      depthDivisor:  MM_TO_METRES_DIVISOR,
      volumeDivisor: M3_DIVISOR,
    }),
    insight: (inputs, outputs) =>
      `Your ${inputs.length} × ${inputs.width} m slab at ${inputs.depth} mm thick needs ` +
      `${outputs.volume?.toFixed(3)} m³ — order ${outputs.bags} × ${inputs.bagSize} kg bags ` +
      `with ${inputs.waste}% waste included.`,
    readyMixThreshold: 1.15,
  },

  // ── Concrete Volume Calculator (US) ──────────────────────────────────────
  "concrete-volume": {
    id: "concrete-volume",
    category: "construction",
    description: "Volume of concrete in cubic yards for a rectangular pour — ready-mix quantities.",
    label: "Concrete Calculator (US)",
    inputs: [
      { name: "length", label: "Length", unit: "ft", type: "slider", min: 1, max: 200, step: 1, default: 12 },
      { name: "width",  label: "Width",  unit: "ft", type: "slider", min: 1, max: 100, step: 1, default: 10 },
      {
        name: "depth", label: "Thickness", unit: "in", type: "slider",
        min: 1, max: 24, step: 1, default: 4,
        hint: "Enter in inches — we convert automatically",
        quickPicks: [2, 3, 4, 6, 8],
      },
      { name: "waste", label: "Waste factor", unit: "%", type: "slider", min: 0, max: 20, step: 1, default: 5 },
    ],
    outputs: [
      {
        key: "volume", label: "Volume", unit: "cu yd", format: "decimal", decimalPlaces: 2,
        highlight: true,
        sublabel: (inputs, outputs) =>
          `+${inputs.waste}% waste → ${outputs.adjustedVolume?.toFixed(2)} cu yd to order`,
      },
      {
        key: "cost", label: "Est. ready-mix cost", format: "currency",
        sublabel: () => `Based on $${US_CONSTRUCTION_PRICING.concreteVolumePerCuYd}/cu yd · adjust for your supplier`,
      },
    ],
    calculate: (inputs) => calculateConcreteVolume(inputs, {
      ratePerUnit:   US_CONSTRUCTION_PRICING.concreteVolumePerCuYd,
      depthDivisor:  INCHES_TO_FEET_DIVISOR,
      volumeDivisor: CU_FT_TO_CU_YD_DIVISOR,
    }),
    insight: (inputs, outputs) =>
      `Your ${inputs.length} × ${inputs.width} ft slab at ${inputs.depth} in thick needs ` +
      `${outputs.volume?.toFixed(2)} cu yd — order ${outputs.adjustedVolume?.toFixed(2)} cu yd ` +
      `with ${inputs.waste}% waste included.`,
    readyMixThreshold: 1.5,
  },

  // ── Concrete Volume Calculator (UK) ──────────────────────────────────────
  "concrete-volume-uk": {
    id: "concrete-volume-uk",
    category: "construction",
    description: "Volume of concrete in cubic metres for a rectangular pour — ready-mix quantities.",
    label: "Concrete Calculator (UK)",
    inputs: [
      { name: "length", label: "Length", unit: "m",  type: "slider", min: 0.1, max: 60,  step: 0.1, default: 3.6 },
      { name: "width",  label: "Width",  unit: "m",  type: "slider", min: 0.1, max: 30,  step: 0.1, default: 3   },
      {
        name: "depth", label: "Thickness", unit: "mm", type: "slider",
        min: 50, max: 300, step: 10, default: 100,
        hint: "Enter in millimetres — we convert automatically",
        quickPicks: [75, 100, 150, 200],
      },
      { name: "waste", label: "Waste factor", unit: "%", type: "slider", min: 0, max: 20, step: 1, default: 5 },
    ],
    outputs: [
      {
        key: "volume", label: "Volume", unit: "m³", format: "decimal", decimalPlaces: 3,
        highlight: true,
        sublabel: (inputs, outputs) =>
          `+${inputs.waste}% waste → ${outputs.adjustedVolume?.toFixed(3)} m³ to order`,
      },
      {
        key: "cost", label: "Est. ready-mix cost", format: "currency", currencySymbol: "£",
        sublabel: () => `Based on £${UK_CONSTRUCTION_PRICING.concreteVolumePerM3}/m³ · adjust for your supplier`,
      },
    ],
    calculate: (inputs) => calculateConcreteVolume(inputs, {
      ratePerUnit:   UK_CONSTRUCTION_PRICING.concreteVolumePerM3,
      depthDivisor:  MM_TO_METRES_DIVISOR,
      volumeDivisor: M3_DIVISOR,
    }),
    insight: (inputs, outputs) =>
      `Your ${inputs.length} × ${inputs.width} m slab at ${inputs.depth} mm thick needs ` +
      `${outputs.volume?.toFixed(3)} m³ — order ${outputs.adjustedVolume?.toFixed(3)} m³ ` +
      `with ${inputs.waste}% waste included.`,
    readyMixThreshold: 1.15,
  },

  // ── Gravel Calculator (US) ────────────────────────────────────────────────
  "gravel": {
    id: "gravel",
    category: "construction",
    description: "Weight in short tons and cost of gravel or aggregate for any rectangular area.",
    label: "Gravel Calculator (US)",
    inputs: [
      { name: "length", label: "Length", unit: "ft", type: "slider", min: 1, max: 500, step: 1, default: 20 },
      { name: "width",  label: "Width",  unit: "ft", type: "slider", min: 1, max: 200, step: 1, default: 10 },
      {
        name: "depth", label: "Depth", unit: "in", type: "slider",
        min: 1, max: 12, step: 1, default: 3,
        hint: "Enter in inches — we convert automatically",
        quickPicks: [2, 3, 4, 6],
      },
      { name: "waste", label: "Waste factor", unit: "%", type: "slider", min: 0, max: 20, step: 1, default: 5 },
    ],
    outputs: [
      {
        key: "volume", label: "Volume", unit: "cu yd", format: "decimal", decimalPlaces: 2,
        sublabel: (_, outputs) =>
          `${outputs.adjustedVolume?.toFixed(2)} cu yd with waste`,
      },
      {
        key: "weight", label: "Weight", unit: "short tons", format: "decimal", decimalPlaces: 1,
        highlight: true,
        sublabel: () => "Approx. — varies by gravel type",
      },
      {
        key: "cost", label: "Est. cost", format: "currency",
        sublabel: () => `Based on $${US_CONSTRUCTION_PRICING.gravelPerShortTon}/ton · adjust for your supplier`,
      },
    ],
    calculate: (inputs) => calculateGravel(inputs, {
      depthDivisor:        INCHES_TO_FEET_DIVISOR,
      volumeDivisor:       CU_FT_TO_CU_YD_DIVISOR,
      densityPerVolumeUnit: GRAVEL_DENSITY_LBS_PER_CU_YD,
      massPerOutputUnit:   LBS_PER_SHORT_TON,
      ratePerMassUnit:     US_CONSTRUCTION_PRICING.gravelPerShortTon,
    }),
    insight: (_, outputs) =>
      `You need approximately ${outputs.weight?.toFixed(1)} short tons ` +
      `(${outputs.adjustedVolume?.toFixed(2)} cu yd) of gravel for this area.`,
  },

  // ── Gravel Calculator (UK) ────────────────────────────────────────────────
  "gravel-uk": {
    id: "gravel-uk",
    category: "construction",
    description: "Weight in tonnes and cost of gravel or aggregate for any rectangular area (metric).",
    label: "Gravel Calculator (UK)",
    inputs: [
      { name: "length", label: "Length", unit: "m", type: "slider", min: 0.5, max: 150, step: 0.5, default: 6 },
      { name: "width",  label: "Width",  unit: "m", type: "slider", min: 0.5, max: 60,  step: 0.5, default: 3 },
      {
        name: "depth", label: "Depth", unit: "mm", type: "slider",
        min: 25, max: 150, step: 5, default: 50,
        hint: "Enter in millimetres — we convert automatically",
        quickPicks: [25, 50, 75, 100],
      },
      { name: "waste", label: "Waste factor", unit: "%", type: "slider", min: 0, max: 20, step: 1, default: 5 },
    ],
    outputs: [
      {
        key: "volume", label: "Volume", unit: "m³", format: "decimal", decimalPlaces: 2,
        sublabel: (_, outputs) =>
          `${outputs.adjustedVolume?.toFixed(2)} m³ with waste`,
      },
      {
        key: "weight", label: "Weight", unit: "tonnes", format: "decimal", decimalPlaces: 1,
        highlight: true,
        sublabel: () => "Approx. — varies by aggregate type",
      },
      {
        key: "cost", label: "Est. cost", format: "currency", currencySymbol: "£",
        sublabel: () => `Based on £${UK_CONSTRUCTION_PRICING.gravelPerTonne}/tonne · adjust for your supplier`,
      },
    ],
    calculate: (inputs) => calculateGravel(inputs, {
      depthDivisor:        MM_TO_METRES_DIVISOR,
      volumeDivisor:       M3_DIVISOR,
      densityPerVolumeUnit: GRAVEL_DENSITY_KG_PER_M3,
      massPerOutputUnit:   KG_PER_TONNE,
      ratePerMassUnit:     UK_CONSTRUCTION_PRICING.gravelPerTonne,
    }),
    insight: (_, outputs) =>
      `You need approximately ${outputs.weight?.toFixed(1)} tonnes ` +
      `(${outputs.adjustedVolume?.toFixed(2)} m³) of gravel for this area.`,
  },
};
