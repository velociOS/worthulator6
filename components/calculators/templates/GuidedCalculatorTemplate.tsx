/**
 * GuidedCalculatorTemplate
 *
 * COPY THIS FILE to start a new guided (multi-step) calculator.
 * Steps:
 *   1. Rename the file and component export
 *   2. Replace STEP_LABELS with your real step names
 *   3. Replace each renderStep() case with your real step components
 *   4. Replace the result calculation + ResultScreen with your real output
 *   5. Optionally wire up leadCapture
 *
 * Shell used: GuidedCalculatorShell
 * Calculator type: "guided"
 */

"use client";

import { useState } from "react";
import GuidedCalculatorShell from "@/components/calculators/GuidedCalculatorShell";

// ─── Step labels ──────────────────────────────────────────────────────────────
// The last label is the "Results" screen — the shell hides the disclaimer there.

const STEP_LABELS = [
  "Step One",   // replace
  "Step Two",   // replace
  "Step Three", // replace
  "Results",    // always last
];

const TOTAL_STEPS  = STEP_LABELS.length - 1; // excludes Results
const RESULT_STEP  = STEP_LABELS.length;      // 1-based index of the result screen

const DISCLAIMER = "Estimates only. Not professional advice."; // replace

// ─── Form state ───────────────────────────────────────────────────────────────
// Replace with your real form shape.

interface FormState {
  fieldOne: string;
  fieldTwo: number;
  fieldThree: string;
}

const INITIAL_STATE: FormState = {
  fieldOne:   "",
  fieldTwo:   0,
  fieldThree: "",
};

// ─── Result type ──────────────────────────────────────────────────────────────
// Replace with your real result shape.

interface CalcResult {
  primary: number;
  label: string;
}

function calculate(form: FormState): CalcResult {
  // Replace with real calculation logic
  return {
    primary: form.fieldTwo * 2,
    label:   "Estimated value",
  };
}

// ─── Step components ──────────────────────────────────────────────────────────
// Each step owns ONLY its form fields.
// Navigation is handled by the shell (onNext / onBack props).
// Copy the pattern from the PI step components for input styling.

function StepOne({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 1 of {TOTAL_STEPS}
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Step One title</h2>
        <p className="mb-6 text-sm text-slate-500">Describe what the user is doing in this step.</p>
      </div>

      {/* Replace with real inputs */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Field label</label>
        <p className="mb-2 text-xs text-slate-400">Helper text for this field.</p>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter value…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
        />
      </div>
    </div>
  );
}

function StepTwo({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 2 of {TOTAL_STEPS}
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Step Two title</h2>
        <p className="mb-6 text-sm text-slate-500">Describe what the user is doing in this step.</p>
      </div>

      {/* Replace with real inputs */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Numeric field</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
        />
      </div>
    </div>
  );
}

function StepThree({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Step 3 of {TOTAL_STEPS}
        </h3>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Step Three title</h2>
        <p className="mb-6 text-sm text-slate-500">Describe what the user is doing in this step.</p>
      </div>

      {/* Replace with real inputs */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Select field</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
        >
          <option value="">— Select —</option>
          <option value="option_a">Option A</option>
          <option value="option_b">Option B</option>
        </select>
      </div>
    </div>
  );
}

// ─── Result screen ────────────────────────────────────────────────────────────

function ResultScreen({
  result,
  onReset,
}: {
  result: CalcResult;
  onReset: () => void;
}) {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
          Your Result
        </h3>
        <h2 className="text-2xl font-bold text-slate-900">{result.label}</h2>
      </div>

      {/* Primary value card */}
      <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-6 shadow-md">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-600">
          {result.label}
        </p>
        <p className="text-4xl font-bold text-emerald-700">
          {result.primary.toLocaleString()}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-[11px] leading-relaxed text-slate-400">{DISCLAIMER}</p>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-slate-400 underline-offset-2 hover:text-slate-700 hover:underline"
        >
          Start over
        </button>
      </div>

    </div>
  );
}

// ─── Lead capture block ───────────────────────────────────────────────────────
// Rendered below the result card via the shell's leadCapture prop.
// Wire up to your CRM / email service inside handleSubmit.

function LeadCapture() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    // TODO: integrate with CRM / email service
    console.info("Lead captured:", email);
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xl">📋</span>
        <h4 className="text-base font-bold text-emerald-900">
          Get your full report
        </h4>
      </div>
      <p className="mb-4 text-sm text-emerald-700">
        Receive a detailed breakdown sent to your inbox.
      </p>

      {submitted ? (
        <div className="rounded-xl border border-emerald-300 bg-white px-4 py-3 text-sm font-semibold text-emerald-700">
          ✅ Thank you — your report is on its way.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-500"
          >
            Send my report →
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MyGuidedCalculator() {
  const [step, setStep]   = useState(1);
  const [form, setForm]   = useState<FormState>(INITIAL_STATE);
  const [result, setResult] = useState<CalcResult | null>(null);

  // Patch a subset of form state
  function patch<K extends keyof FormState>(updates: Pick<FormState, K>) {
    setForm((prev) => ({ ...prev, ...updates }));
  }

  // Validate current step before allowing Next
  function canProceed(): boolean {
    if (step === 1) return form.fieldOne.trim() !== "";
    if (step === 2) return form.fieldTwo > 0;
    if (step === 3) return form.fieldThree !== "";
    return true;
  }

  function next() {
    if (step === TOTAL_STEPS) {
      setResult(calculate(form));
      setStep(RESULT_STEP);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function reset() {
    setForm(INITIAL_STATE);
    setResult(null);
    setStep(1);
  }

  // Render the active step's form fields only (nav handled by shell)
  function renderStep() {
    switch (step) {
      case 1:
        return (
          <StepOne
            value={form.fieldOne}
            onChange={(v) => patch({ fieldOne: v })}
          />
        );
      case 2:
        return (
          <StepTwo
            value={form.fieldTwo}
            onChange={(v) => patch({ fieldTwo: v })}
          />
        );
      case 3:
        return (
          <StepThree
            value={form.fieldThree}
            onChange={(v) => patch({ fieldThree: v })}
          />
        );
      default:
        return null;
    }
  }

  const inResultMode = step === RESULT_STEP && result !== null;

  return (
    <GuidedCalculatorShell
      stepLabels={STEP_LABELS}
      currentStep={step}
      disclaimer={DISCLAIMER}
      // Shell-managed nav — only active during step mode
      onNext={!inResultMode ? next : undefined}
      onBack={!inResultMode && step > 1 ? back : undefined}
      canProceed={canProceed()}
      nextLabel={step === TOTAL_STEPS ? "Calculate →" : `Next: ${STEP_LABELS[step]} →`}
      // Result mode
      showResult={inResultMode}
      result={result ? <ResultScreen result={result} onReset={reset} /> : undefined}
      // Lead capture below the result card
      leadCapture={<LeadCapture />}
    >
      {renderStep()}
    </GuidedCalculatorShell>
  );
}
