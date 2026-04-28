"use client";

import { useState } from "react";
import LiabilityStep   from "./LiabilityStep";
import InjurySelector  from "./InjurySelector";
import FinancialStep   from "./FinancialStep";
import ImpactStep      from "./ImpactStep";
import JurisdictionStep from "./JurisdictionStep";
import ResultPanel     from "./ResultPanel";
import GuidedCalculatorShell from "@/components/calculators/GuidedCalculatorShell";
import { calculateUKCaseValue, type UKInjurySelection, type UKCaseResult } from "@/lib/pi-uk/engine";
import type { ImpactLevel, EvidenceStrength } from "@/lib/pi-uk/factors";
import type { UKIncidentType } from "@/lib/pi-uk/data";
import { UK_SHORT_DISCLAIMER } from "@/lib/pi-uk/disclaimer";

// ─── State shape ─────────────────────────────────────────────────────────────

interface FormState {
  // Step 1 — Liability
  incidentType:     UKIncidentType | null;
  faultPercent:     number;
  evidenceStrength: EvidenceStrength;
  // Step 2 — Injuries
  injuries: UKInjurySelection[];
  // Step 3 — Financials
  medicalCosts:   number;
  lostWages:      number;
  futureMedical:  number;
  futureLoss:     number;
  propertyDamage: number;
  // Step 4 — Impact
  painScale:   number;
  impactLevel: ImpactLevel;
  // Step 5 — Jurisdiction
  jurisdiction: string;
}

const INITIAL: FormState = {
  incidentType:     null,
  faultPercent:     0,
  evidenceStrength: "moderate",
  injuries:         [],
  medicalCosts:     0,
  lostWages:        0,
  futureMedical:    0,
  futureLoss:       0,
  propertyDamage:   0,
  painScale:        5,
  impactLevel:      "minor",
  jurisdiction:     "",
};

const STEP_LABELS = [
  "Liability",
  "Injuries",
  "Financials",
  "Impact",
  "Jurisdiction",
  "Results",
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function StepFlow() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState<FormState>(INITIAL);
  const [result, setResult] = useState<UKCaseResult | null>(null);

  function patch<K extends keyof FormState>(updates: Pick<FormState, K>) {
    setForm((prev) => ({ ...prev, ...updates }));
  }

  function next() {
    if (step === 5) {
      const res = calculateUKCaseValue({
        incidentType:     form.incidentType ?? "road_traffic",
        injuries:         form.injuries,
        painScale:        form.painScale,
        impactLevel:      form.impactLevel,
        faultPercent:     form.faultPercent,
        evidenceStrength: form.evidenceStrength,
        medicalCosts:     form.medicalCosts,
        lostWages:        form.lostWages,
        futureMedical:    form.futureMedical,
        futureLoss:       form.futureLoss,
        propertyDamage:   form.propertyDamage,
        jurisdiction:     form.jurisdiction,
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
      disclaimer={UK_SHORT_DISCLAIMER}
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
          <JurisdictionStep
            jurisdiction={form.jurisdiction}
            onChange={(u) => patch(u as Pick<FormState, keyof typeof u>)}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 6 && result && (
          <ResultPanel
            result={result}
            jurisdiction={form.jurisdiction}
            onReset={reset}
          />
        )}
      </>
    </GuidedCalculatorShell>
  );
}
