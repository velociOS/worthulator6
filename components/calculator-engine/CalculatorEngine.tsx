"use client";

import { CALCULATOR_CONFIGS } from "./calculatorConfigs";
import { useCalculator } from "./useCalculator";
import InputField from "./InputField";
import OutputCard from "./OutputCard";
import DisclaimerBlock from "@/components/compliance/DisclaimerBlock";

export interface CalculatorEngineProps {
  /**
   * Calculator ID — must match a key in CALCULATOR_CONFIGS.
   * e.g. "concrete-bag", "concrete-bag-uk", "concrete-volume"
   */
  type: string;
  /**
   * Optional region override. When "UK", looks up "<type>-uk" first,
   * falling back to "<type>" if no UK variant exists.
   */
  region?: "US" | "UK";
}

export default function CalculatorEngine({
  type,
  region = "US",
}: CalculatorEngineProps) {
  // Resolve config: prefer "<type>-uk" for UK, fall back to "<type>"
  const key = region === "UK" ? `${type}-uk` : type;
  const config = CALCULATOR_CONFIGS[key] ?? CALCULATOR_CONFIGS[type];

  if (!config) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">
        No calculator config found for <code className="font-mono">{key}</code>.
        Add it to <code className="font-mono">calculatorConfigs.ts</code>.
      </div>
    );
  }

  const { values, setValue, outputs } = useCalculator(config);

  const volume = outputs["volume"] ?? 0;
  const insightText = config.insight?.(values, outputs);
  const showReadyMix =
    config.readyMixThreshold !== undefined && volume > config.readyMixThreshold;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-2">

        {/* ── INPUTS ──────────────────────────────────────────────────── */}
        <div className="space-y-6">
          {config.inputs.map((input) => (
            <InputField
              key={input.name}
              input={input}
              value={values[input.name]}
              onChange={(v) => setValue(input.name, v)}
            />
          ))}
        </div>

        {/* ── OUTPUTS ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Live summary sentence */}
          {insightText && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-800">
              {insightText}
            </p>
          )}

          {/* Result cards */}
          {config.outputs.map((output) => (
            <OutputCard
              key={output.key}
              output={output}
              value={outputs[output.key]}
              inputs={values}
              allOutputs={outputs}
            />
          ))}

          {/* Ready-mix callout */}
          {showReadyMix && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">
                Consider ready-mix at this volume
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-amber-700">
                At {volume.toFixed(2)} {region === "UK" ? "m³" : "cu yd"}, ready-mix
                concrete is usually cheaper and faster than mixing bags by hand.
                {region === "UK"
                  ? " Expect £90–160/m³ plus a delivery charge."
                  : " Expect $120–200/yd plus a delivery fee."}
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <DisclaimerBlock />
        </div>
      </div>
    </div>
  );
}
