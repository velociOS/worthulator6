"use client";

import type { ReactNode } from "react";
import ProgressBar from "./ProgressBar";

/**
 * GuidedCalculatorShell
 *
 * Reusable chrome for multi-step / complex calculators.
 * Extracted from the PI calculator — no visual changes.
 *
 * Three usage modes (all optional, fully composable):
 *
 * ① Children-only (current PI calculator pattern — steps own their nav):
 *     <GuidedCalculatorShell stepLabels={…} currentStep={step} disclaimer={…}>
 *       {renderStep()}
 *     </GuidedCalculatorShell>
 *
 * ② Shell-managed navigation (steps contain only their form fields):
 *     <GuidedCalculatorShell
 *       stepLabels={…} currentStep={step} disclaimer={…}
 *       onNext={next} onBack={back} canProceed={isValid}
 *       nextLabel="Next: Injuries →"
 *     >
 *       {renderStep()}
 *     </GuidedCalculatorShell>
 *
 * ③ Full flow — steps → result → lead capture:
 *     <GuidedCalculatorShell
 *       stepLabels={…} currentStep={step} disclaimer={…}
 *       onNext={next} onBack={back}
 *       showResult={step > totalSteps} result={<MyResultPanel />}
 *       leadCapture={<MyLeadForm />}
 *     >
 *       {renderStep()}
 *     </GuidedCalculatorShell>
 */

interface GuidedCalculatorShellProps {
  // ── Core ──────────────────────────────────────────────────────────────────
  /** Ordered list of step names — drives the ProgressBar and total-step count */
  stepLabels: string[];
  /** Current 1-based step index */
  currentStep: number;
  /**
   * Short disclaimer text rendered below the card.
   * Hidden automatically when in result mode or on the final step.
   */
  disclaimer?: string;
  /** The active step content — form fields, result panel, etc. */
  children: ReactNode;

  // ── Shell-managed navigation (optional) ───────────────────────────────────
  /** Called when the user clicks Next / Calculate. Omit to let the step own its nav. */
  onNext?: () => void;
  /** Called when the user clicks Back. Omit to hide the back button. */
  onBack?: () => void;
  /** Disables the Next button when false. Defaults to true. */
  canProceed?: boolean;
  /** Label for the Next button. Defaults to "Next →". */
  nextLabel?: string;

  // ── Result mode (optional) ────────────────────────────────────────────────
  /** When true, renders `result` inside the card instead of `children`. */
  showResult?: boolean;
  /** Result panel content — rendered inside the white card when showResult is true. */
  result?: ReactNode;

  // ── Lead capture (optional) ───────────────────────────────────────────────
  /**
   * Lead capture section rendered BELOW the card when showResult is true.
   * Use this when lead capture lives outside the result panel (new calculators).
   * The PI calculator has lead capture built into ResultPanel — it does not use this.
   */
  leadCapture?: ReactNode;
}

export default function GuidedCalculatorShell({
  stepLabels,
  currentStep,
  disclaimer,
  children,
  onNext,
  onBack,
  canProceed = true,
  nextLabel = "Next →",
  showResult = false,
  result,
  leadCapture,
}: GuidedCalculatorShellProps) {
  const isFinalStep     = currentStep === stepLabels.length;
  const shellOwnsNav    = !showResult && (onNext !== undefined || onBack !== undefined);
  const showDisclaimer  = !!disclaimer && !showResult && !isFinalStep;

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar step={currentStep} stepLabels={stepLabels} />

      {/* ── White card ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        {/* Step content or result panel */}
        {showResult ? result : children}

        {/* Shell-managed nav buttons — only rendered when onNext/onBack are provided
            and we are NOT in result mode. Steps that own their own nav buttons
            (like all current PI steps) simply don't pass these props. */}
        {shellOwnsNav && (
          <div className={`mt-8 flex ${onBack ? "justify-between" : "justify-end"}`}>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                ← Back
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={!canProceed}
                className="rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {nextLabel}
              </button>
            )}
          </div>
        )}

      </div>

      {/* ── Disclaimer (step mode only) ────────────────────────── */}
      {showDisclaimer && (
        <p className="mt-4 text-center text-[11px] text-slate-400">
          {disclaimer}
        </p>
      )}

      {/* ── Lead capture (result mode only) ───────────────────── */}
      {showResult && leadCapture && (
        <div className="mt-6">{leadCapture}</div>
      )}
    </div>
  );
}
