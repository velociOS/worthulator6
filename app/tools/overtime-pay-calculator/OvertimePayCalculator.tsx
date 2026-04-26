"use client";

import { SHOW_INCOME_CTA } from "@/src/lib/featureFlags";

import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { formatCurrency, getLocale, type Locale } from "@/src/lib/locale";

// -- Calculation logic ----------------------------------------

interface OvertimeResult {
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  weeklyPay: number;
  dailyPay: number;
  monthlyPay: number;
  annualPay: number;
}

function calculateOvertime(
  hourlyRate: number,
  totalHours: number,
  multiplier: number,
): OvertimeResult {
  const regularHours  = Math.min(totalHours, 40);
  const overtimeHours = Math.max(0, totalHours - 40);
  const regularPay    = regularHours * hourlyRate;
  const overtimePay   = overtimeHours * hourlyRate * multiplier;
  const weeklyPay     = regularPay + overtimePay;
  const annualPay     = weeklyPay * 52;
  const monthlyPay    = annualPay / 12;
  const dailyPay      = weeklyPay / 5;
  return { regularHours, overtimeHours, regularPay, overtimePay, weeklyPay, dailyPay, monthlyPay, annualPay };
}

// -- Helpers --------------------------------------------------

type MultiplierMode = "1.5" | "2.0" | "custom";

// -- Component ------------------------------------------------

export default function OvertimePayCalculator() {
  const [hourlyRate,       setHourlyRate]       = useState<number>(25);
  const [hourlyRateInput,  setHourlyRateInput]  = useState<string>("25");
  const [totalHours,       setTotalHours]       = useState<number>(45);
  const [multiplierMode,   setMultiplierMode]   = useState<MultiplierMode>("1.5");
  const [customMultiplier, setCustomMultiplier] = useState<string>("2.0");
  const [flash,            setFlash]            = useState<boolean>(false);
  const [displayWeekly,    setDisplayWeekly]    = useState<number>(0);
  const [changeAmount,     setChangeAmount]     = useState<number>(0);
  const [showChange,       setShowChange]       = useState<boolean>(false);

  const animRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevRef       = useRef<number>(0);
  const changeFadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [locale, setLocaleState] = useState<Locale>("US");

  const multiplier =
    multiplierMode === "1.5" ? 1.5 :
    multiplierMode === "2.0" ? 2.0 :
    Math.max(1, Number(customMultiplier) || 1.5);

  const { regularHours, overtimeHours, regularPay, overtimePay, weeklyPay, dailyPay, monthlyPay, annualPay } =
    calculateOvertime(hourlyRate, totalHours, multiplier);

  const hasOvertime = overtimeHours > 0;

  // Flash on any input change
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 450);
    return () => clearTimeout(t);
  }, [hourlyRate, totalHours, multiplier]);

  // Change delta indicator
  useEffect(() => {
    const prev = prevRef.current;
    const diff = weeklyPay - prev;
    if (prev !== 0 && diff !== 0) {
      setChangeAmount(diff);
      setShowChange(true);
      if (changeFadeRef.current) clearTimeout(changeFadeRef.current);
      changeFadeRef.current = setTimeout(() => setShowChange(false), 1800);
    }
    prevRef.current = weeklyPay;
  }, [weeklyPay]);

  // Animated count-up/down toward target (easeOutBack)
  useEffect(() => {
    if (animRef.current) clearTimeout(animRef.current);
    const target   = weeklyPay;
    const startVal = displayWeekly;
    const diff     = target - startVal;
    if (diff === 0) return;
    const steps     = 24;
    const c1        = 0.4;
    const c3        = c1 + 1;
    const easeOutBack = (t: number) => 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    let step = 0;
    const tick = () => {
      step++;
      const ease = easeOutBack(step / steps);
      setDisplayWeekly(Math.round(startVal + diff * ease));
      if (step < steps) animRef.current = setTimeout(tick, 12);
      else setDisplayWeekly(target);
    };
    animRef.current = setTimeout(tick, 12);
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeklyPay]);

  useEffect(() => {
    setLocaleState(getLocale());
    const handler = () => setLocaleState(getLocale());
    window.addEventListener("worthulator:locale", handler);
    return () => window.removeEventListener("worthulator:locale", handler);
  }, []);

  const sym = locale === "US" ? "$" : "£";

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-10">

      {/* ── INPUTS ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">

        {/* Hourly Rate */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="hourly-rate" className="block text-sm font-semibold text-gray-700">
                Hourly Rate
              </label>
              <p className="mt-0.5 text-xs text-gray-400">Your base pay per hour</p>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-bold text-gray-400">
                {sym}
              </span>
              <input
                id="hourly-rate"
                type="number"
                min={0}
                max={500}
                step={0.5}
                value={hourlyRateInput}
                onChange={(e) => {
                  setHourlyRateInput(e.target.value);
                  const v = Math.max(0, Math.min(500, Number(e.target.value)));
                  if (!isNaN(v)) setHourlyRate(v);
                }}
                onBlur={() => setHourlyRateInput(String(hourlyRate))}
                className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-7 pr-3 text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="mt-5 **:[[role=slider]]:h-5 **:[[role=slider]]:w-5 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:hover:scale-[1.1] **:[[role=slider]]:active:scale-[1.15] **:[[role=slider]]:active:cursor-grabbing">
            <Slider
              min={0}
              max={200}
              step={0.5}
              value={[hourlyRate]}
              onValueChange={([v]) => { setHourlyRate(v); setHourlyRateInput(String(v)); }}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>{sym}0</span>
              <span>{sym}50</span>
              <span>{sym}100</span>
              <span>{sym}150</span>
              <span>{sym}200</span>
            </div>
          </div>

          {/* Quick-pick chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[15, 20, 25, 35, 50].map((v) => (
              <button
                key={v}
                onClick={() => { setHourlyRate(v); setHourlyRateInput(String(v)); }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${
                  hourlyRate === v
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {sym}{v}/hr
              </button>
            ))}
          </div>
        </div>

        {/* Hours Worked Per Week */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="total-hours" className="block text-sm font-semibold text-gray-700">
                Total Hours Worked (including overtime)
              </label>
              <p className="mt-0.5 text-xs text-gray-400">Overtime automatically applies after 40 hours</p>
            </div>
            <span
              className={`rounded-lg px-3 py-1.5 text-xl font-bold tracking-tight transition-colors duration-300 ${
                hasOvertime ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
              }`}
            >
              {totalHours}h
            </span>
          </div>

          <div className="mt-5 **:[[role=slider]]:h-5 **:[[role=slider]]:w-5 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:hover:scale-[1.1] **:[[role=slider]]:active:scale-[1.15] **:[[role=slider]]:active:cursor-grabbing">
            <Slider
              min={1}
              max={80}
              step={1}
              value={[totalHours]}
              onValueChange={([v]) => setTotalHours(v)}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>1h</span>
              <span>20h</span>
              <span>40h</span>
              <span>60h</span>
              <span>80h</span>
            </div>
          </div>

          {/* Overtime auto-detect callout */}
          {hasOvertime && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
              ⏱ {overtimeHours}h overtime detected — {regularHours}h regular + {overtimeHours}h at {multiplier}×
            </p>
          )}

          {/* Quick scenario buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setTotalHours((h) => Math.min(80, h + 5))}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500 transition-all duration-150 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 active:scale-[0.96]"
            >
              +5 hrs
            </button>
            <button
              onClick={() => setTotalHours((h) => Math.min(80, h + 10))}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500 transition-all duration-150 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 active:scale-[0.96]"
            >
              +10 hrs
            </button>
            <button
              onClick={() => setTotalHours(40)}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500 transition-all duration-150 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700 active:scale-[0.96]"
            >
              Reset to 40h
            </button>
          </div>
        </div>

        {/* Overtime Multiplier */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Overtime Multiplier</p>
          </div>
          <div className="grid grid-cols-3">
            {(["1.5", "2.0", "custom"] as MultiplierMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMultiplierMode(m)}
                className={`py-3 text-sm font-semibold transition-colors duration-150 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-gray-100 ${
                  multiplierMode === m
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {m === "1.5" ? "1.5× (time ½)" : m === "2.0" ? "2× (double)" : "Custom"}
              </button>
            ))}
          </div>
          {multiplierMode === "custom" && (
            <div className="border-t border-gray-100 px-5 py-4">
              <label htmlFor="custom-multiplier" className="text-xs font-semibold text-gray-500">
                Custom multiplier (e.g. 1.75)
              </label>
              <input
                id="custom-multiplier"
                type="number"
                min={1}
                max={5}
                step={0.1}
                value={customMultiplier}
                onChange={(e) => setCustomMultiplier(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="e.g. 1.75"
              />
            </div>
          )}
        </div>

      </div>

      {/* ── RESULTS ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">

        {/* Hero result */}
        <div
          className={`relative overflow-hidden rounded-2xl border bg-gray-950 p-8 transition-all duration-500 ${
            flash
              ? "border-emerald-500/20 shadow-[0_24px_100px_rgba(0,0,0,0.55),0_0_40px_rgba(52,211,153,0.1)]"
              : "border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          }`}
        >
          <div
            className={`pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl transition-all duration-500 ${
              flash ? "scale-110 bg-emerald-500/25" : "scale-100 bg-emerald-500/15"
            }`}
          />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-900/40 blur-3xl" />

          <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
            Weekly Pay (incl. overtime)
          </p>
          <p
            className={`relative mt-3 text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-none tracking-[-0.04em] transition-all duration-500 ${
              flash
                ? "text-emerald-300 [text-shadow:0_0_40px_rgba(52,211,153,0.6)]"
                : "text-emerald-400 [text-shadow:0_0_20px_rgba(52,211,153,0.28)]"
            }`}
          >
            {formatCurrency(displayWeekly, locale)}
          </p>

          {/* Change delta indicator */}
          <div
            className={`relative mt-1 h-6 overflow-hidden transition-all duration-700 ${
              showChange ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            {changeAmount !== 0 && (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  changeAmount > 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                }`}
              >
                {changeAmount > 0 ? "+" : ""}{formatCurrency(Math.abs(changeAmount), locale)}{" / wk"}
              </span>
            )}
          </div>

          <div className="relative mt-2 flex flex-wrap items-center gap-2.5">
            <p className="text-sm font-medium text-gray-400">
              per week &nbsp;&middot;&nbsp;{" "}
              <span className="font-bold text-white">{formatCurrency(annualPay, locale)}</span> / year
            </p>
            {hasOvertime && (
              <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                {overtimeHours}h overtime at {multiplier}×
              </span>
            )}
          </div>

          {/* Insight text */}
          {hourlyRate > 0 && (
            <p className="relative mt-2 text-sm font-medium text-emerald-400">
              Working <span className="font-bold text-emerald-300">{totalHours} hours</span> at{" "}
              <span className="font-bold text-emerald-300">{sym}{hourlyRate}/hour</span> earns you
              approximately <span className="font-bold text-emerald-300">{formatCurrency(weeklyPay, locale)}</span> per
              week{hasOvertime ? " including overtime" : ""}.
            </p>
          )}

          {/* Regular vs overtime colour bar */}
          <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full bg-emerald-400 transition-all duration-700"
              style={{ width: weeklyPay > 0 ? `${Math.round((regularPay / weeklyPay) * 100)}%` : "100%" }}
            />
            {overtimePay > 0 && (
              <div
                className="h-full bg-amber-400 transition-all duration-700"
                style={{ width: `${Math.round((overtimePay / weeklyPay) * 100)}%` }}
              />
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />Regular pay
            </span>
            {overtimePay > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />Overtime pay
              </span>
            )}
          </div>
        </div>

        {/* Breakdown cards — Regular / Overtime / Total Weekly */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Regular Pay</p>
            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-gray-900">{formatCurrency(regularPay, locale)}</p>
            <p className="mt-0.5 text-xs text-gray-400">{regularHours}h × {sym}{hourlyRate}</p>
          </div>

          <div
            className={`rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
              hasOvertime ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-white"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                hasOvertime ? "text-amber-500" : "text-gray-400"
              }`}
            >
              Overtime Pay
            </p>
            <p
              className={`mt-2 text-xl font-bold tracking-[-0.03em] ${
                hasOvertime ? "text-amber-700" : "text-gray-400"
              }`}
            >
              {formatCurrency(overtimePay, locale)}
            </p>
            <p className={`mt-0.5 text-xs ${hasOvertime ? "text-amber-500" : "text-gray-400"}`}>
              {overtimeHours}h × {sym}{hourlyRate} × {multiplier}×
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/6 bg-gray-900 p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Total Weekly</p>
            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-emerald-400">{formatCurrency(weeklyPay, locale)}</p>
            <p className="mt-0.5 text-xs text-gray-500">per week</p>
          </div>
        </div>

        {/* Daily / Monthly / Annual */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/6 bg-gray-900 p-4 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Daily Income</p>
            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-emerald-400">{formatCurrency(dailyPay, locale)}</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">approx. per day</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-gray-900 p-4 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Monthly Income</p>
            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-emerald-400">{formatCurrency(monthlyPay, locale)}</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">per month (avg)</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-gray-900 p-4 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Annual Income</p>
            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-emerald-400">{formatCurrency(annualPay, locale)}</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">per year (52 weeks)</p>
          </div>
        </div>

        {/* What if scenarios */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <p className="text-sm font-semibold text-gray-700">What if your hours changed?</p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            Try different overtime scenarios to see the instant impact on your weekly earnings.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "+5 hours",    s: "pos", apply: () => setTotalHours((h) => Math.min(80, h + 5))  },
              { label: "+10 hours",   s: "pos", apply: () => setTotalHours((h) => Math.min(80, h + 10)) },
              { label: "Exactly 40h", s: "neu", apply: () => setTotalHours(40)                           },
              { label: "60h week",    s: "neu", apply: () => setTotalHours(60)                           },
              { label: "Reset",       s: "neu", apply: () => { setTotalHours(45); setHourlyRate(25); setHourlyRateInput("25"); } },
            ].map((scenario) => (
              <button
                key={scenario.label}
                onClick={scenario.apply}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.97] hover:-translate-y-px hover:scale-[1.02] ${
                  scenario.s === "pos"
                    ? "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {scenario.label}
              </button>
            ))}
          </div>

          {/* Live preview */}
          <div className="mt-5 rounded-xl border border-white/7 bg-gray-950 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Live estimate</p>
            <p
              className={`mt-1 text-3xl font-bold tracking-[-0.03em] transition-all duration-500 ${
                flash
                  ? "text-emerald-300 [text-shadow:0_0_20px_rgba(52,211,153,0.5)]"
                  : "text-emerald-400"
              }`}
            >
              {formatCurrency(weeklyPay, locale)}<span className="ml-2 text-sm font-normal text-gray-500">/ week</span>
            </p>
            <p className="mt-0.5 text-sm text-gray-400">
              {formatCurrency(monthlyPay, locale)} / mo &nbsp;&middot;&nbsp; {formatCurrency(annualPay, locale)} / yr
            </p>
            {hasOvertime && (
              <p className="mt-2 text-xs text-gray-500">
                <span className="font-semibold text-amber-400">{formatCurrency(overtimePay, locale)}</span> of that is
                overtime pay ({overtimeHours}h × {multiplier}×).
              </p>
            )}
          </div>
        </div>

        {/* Microcopy */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
          <p className="text-xs leading-5 text-gray-500">
            This overtime calculator helps you calculate overtime pay, including time and a half and
            double time, based on your hourly rate and hours worked.
          </p>
        </div>

        {/* Income CTA */}
        {SHOW_INCOME_CTA && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-sm leading-6 text-gray-500">
            Working overtime —{" "}
            <span className="font-semibold text-gray-800">see how much you actually keep after tax.</span>
          </p>
          <div className="flex flex-col items-end gap-2">
            <span className="shrink-0 cursor-default rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white opacity-90 pointer-events-none">
              See after-tax overtime
            </span>
            <p className="text-xs text-gray-400">Coming soon — we&apos;re adding a tax-aware overtime view.</p>
          </div>
        </div>
        )}

        {/* Trust note */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <p className="text-xs font-medium text-gray-500">
            Overtime rules vary by country, state, and employer. This calculator provides estimates
            only and does not account for taxes or employer-specific policies.
          </p>
        </div>

      </div>
    </div>
  );
}
