"use client";

import { useRouter } from "next/navigation";

export interface RegionToggleProps {
  /** Which region this page represents */
  current: "us" | "uk";
  /** Full pathname of the US version, e.g. "/tools/hourly-to-salary-calculator" */
  usPath: string;
  /** Full pathname of the UK version, e.g. "/tools/hourly-to-salary-calculator-uk" */
  ukPath: string;
  /**
   * Colour scheme:
   * "dark"  — for dark (slate-950) hero backgrounds (default)
   * "light" — for white/light hero backgrounds
   */
  theme?: "dark" | "light";
}

/**
 * Generic region toggle used on all calculator pages that have both a US and
 * UK version. Navigates between pages rather than switching state internally.
 *
 * Mobile-friendly: pill expands full-width on small screens, each button gets
 * equal flex-1 width, reverts to auto-width at sm breakpoint.
 */
export default function RegionToggle({
  current,
  usPath,
  ukPath,
  theme = "dark",
}: RegionToggleProps) {
  const router = useRouter();
  const targetPath = current === "us" ? ukPath : usPath;
  const targetLabel = current === "us" ? "UK" : "US";

  const isDark = theme === "dark";

  const pillBorder = isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-100";
  const activeBtn = isDark ? "bg-white text-slate-900" : "bg-slate-900 text-white";
  const inactiveBtn = isDark
    ? "text-slate-400 hover:text-white"
    : "text-slate-500 hover:text-slate-900";
  const switchText = isDark ? "text-slate-500" : "text-slate-400";
  const switchLink = isDark
    ? "text-slate-300 hover:text-white"
    : "text-slate-600 hover:text-slate-900";

  return (
    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      {/* Pill toggle — full width on mobile, auto on sm+ */}
      <div
        className={`flex w-full items-center gap-1 rounded-full border p-1 sm:w-auto ${pillBorder}`}
      >
        <button
          type="button"
          onClick={() => current !== "us" && router.push(usPath)}
          aria-pressed={current === "us"}
          className={`flex-1 rounded-full px-4 py-1.5 text-center text-xs font-semibold transition-colors sm:flex-none ${
            current === "us" ? activeBtn : inactiveBtn
          }`}
        >
          🇺🇸 United States
        </button>
        <button
          type="button"
          onClick={() => current !== "uk" && router.push(ukPath)}
          aria-pressed={current === "uk"}
          className={`flex-1 rounded-full px-4 py-1.5 text-center text-xs font-semibold transition-colors sm:flex-none ${
            current === "uk" ? activeBtn : inactiveBtn
          }`}
        >
          🇬🇧 United Kingdom
        </button>
      </div>

      {/* Switch prompt */}
      <p className={`text-xs ${switchText}`}>
        Looking for a different region?{" "}
        <button
          type="button"
          onClick={() => router.push(targetPath)}
          className={`font-medium underline underline-offset-2 ${switchLink}`}
        >
          Switch to {targetLabel} version
        </button>
      </p>
    </div>
  );
}
