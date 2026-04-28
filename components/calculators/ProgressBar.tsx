"use client";

/**
 * ProgressBar
 *
 * Reusable step-progress indicator extracted from the PI calculator.
 * Renders numbered step bubbles with labels and a fill bar.
 *
 * Props:
 *   step        — current 1-based step index
 *   stepLabels  — ordered array of step name strings
 */

interface ProgressBarProps {
  step: number;
  stepLabels: string[];
}

export default function ProgressBar({ step, stepLabels }: ProgressBarProps) {
  const total = stepLabels.length;
  const pct   = Math.round((step / total) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          {stepLabels.map((label, i) => {
            const isActive = i === step - 1;
            const isDone   = i < step - 1;
            return (
              <div key={label} className="flex items-center gap-1">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </span>
                <span
                  className={`hidden text-xs font-semibold sm:block ${
                    isActive ? "text-slate-900" : isDone ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
                {i < total - 1 && (
                  <span className="mx-0.5 hidden text-slate-300 sm:block">›</span>
                )}
              </div>
            );
          })}
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {step < total ? `${pct}%` : "Complete"}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
