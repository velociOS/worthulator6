"use client";

import { useState } from "react";
import LiabilityStep from "./LiabilityStep";
import InjurySelector from "./InjurySelector";
import FinancialStep from "./FinancialStep";
import ImpactStep from "./ImpactStep";
import InsuranceStep from "./InsuranceStep";
import ResultPanel from "./ResultPanel";
import GuidedCalculatorShell from "@/components/calculators/GuidedCalculatorShell";
import { calculateCaseValue, type InjurySelection, type CaseResult } from "@/lib/pi/engine";
import type { ImpactLevel, EvidenceStrength } from "@/lib/pi/factors";
import type { IncidentType } from "@/lib/pi/data";
import { SHORT_DISCLAIMER } from "@/lib/pi/disclaimer";

// ─── State shape ─────────────────────────────────────────────────────────────

interface FormState {
  // Step 1 — Liability
  incidentType: IncidentType | null;
  faultPercent: number;
  evidenceStrength: EvidenceStrength;
  // Step 2 — Injuries
  injuries: InjurySelection[];
  // Step 3 — Financials
  medicalCosts: number;
  lostWages: number;
  futureMedical: number;
  futureLoss: number;
  propertyDamage: number;
  // Step 4 — Impact
  painScale: number;
  impactLevel: ImpactLevel;
  // Step 5 — Insurance
  state: string;
  policyLimit: number;
}

const INITIAL: FormState = {
  incidentType: null,
  faultPercent: 0,
  evidenceStrength: "moderate",
  injuries: [],
  medicalCosts: 0,
  lostWages: 0,
  futureMedical: 0,
  futureLoss: 0,
  propertyDamage: 0,
  painScale: 5,
  impactLevel: "minor",
  state: "",
  policyLimit: 0,
};

const STEP_LABELS = [
  "Liability",
  "Injuries",
  "Financials",
  "Impact",
  "Insurance",
  "Results",
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function StepFlow() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [result, setResult] = useState<CaseResult | null>(null);

  function patch<K extends keyof FormState>(updates: Pick<FormState, K>) {
    setForm((prev) => ({ ...prev, ...updates }));
  }

  function next() {
    if (step === 5) {
      // Calculate
      const res = calculateCaseValue({
        incidentType: form.incidentType ?? "motor_vehicle",
        injuries: form.injuries,
        painScale: form.painScale,
        impactLevel: form.impactLevel,
        faultPercent: form.faultPercent,
        evidenceStrength: form.evidenceStrength,
        medicalCosts: form.medicalCosts,
        lostWages: form.lostWages,
        futureMedical: form.futureMedical,
        futureLoss: form.futureLoss,
        propertyDamage: form.propertyDamage,
        policyLimit: form.policyLimit,
        state: form.state,
      });
      setResult(res);
      setStep(6);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function reset() {
    setForm(INITIAL);
    setResult(null);
    setStep(1);
  }

  return (
    <GuidedCalculatorShell
      stepLabels={STEP_LABELS}
      currentStep={step}
      disclaimer={SHORT_DISCLAIMER}
    >
      <>
        {step === 1 && (
          <LiabilityStep
            incidentType={form.incidentType}
            faultPercent={form.faultPercent}
            evidenceStrength={form.evidenceStrength}
            onChange={(u) => patch(u as Partial<FormState> as Pick<FormState, keyof typeof u>)}
            onNext={next}
          />
        )}
        {step === 2 && (
          <InjurySelector
            injuries={form.injuries}
            onChange={(injuries) => patch({ injuries })}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <FinancialStep
            medicalCosts={form.medicalCosts}
            lostWages={form.lostWages}
            futureMedical={form.futureMedical}
            futureLoss={form.futureLoss}
            propertyDamage={form.propertyDamage}
            onChange={(u) => patch(u as Pick<FormState, keyof typeof u>)}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <ImpactStep
            painScale={form.painScale}
            impactLevel={form.impactLevel}
            onChange={(u) => patch(u as Pick<FormState, keyof typeof u>)}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 5 && (
          <InsuranceStep
            state={form.state}
            policyLimit={form.policyLimit}
            onChange={(u) => patch(u as Pick<FormState, keyof typeof u>)}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 6 && result && (
          <ResultPanel result={result} state={form.state} onReset={reset} />
        )}
      </>
    </GuidedCalculatorShell>
  );
}
