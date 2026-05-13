"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine,
} from "recharts";
import {
  calculateMargin,
  marginFromMarkup,
  markupFromMargin,
  priceFromMargin,
  priceFromMarkup,
  type CalcMode,
} from "@/lib/calculators/marginEngine";

// ─── Calculating loader ───────────────────────────────────────────────────────

const CALC_STEPS = [
  "Reading your inputs…",
  "Calculating margins…",
  "Building your breakdown…",
  "Finishing up…",
];

function CalculatingLoader({ progress, step }: { progress: number; step: number }) {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-6 bg-gray-950 rounded-2xl text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 70%, #10b981 0%, transparent 65%)" }} />
      <div className="relative mb-7">
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-400 animate-spin"
          style={{ animationDuration: "0.85s" }} />
        <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center bg-white/5">
          <svg width="36" height="36" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 3L6 13L8 7L10 13L14 3" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="relative text-lg font-bold text-center text-white mb-1">{CALC_STEPS[step] ?? "Calculating…"}</p>
      <p className="relative text-xs text-white/40 mb-8">Analysing your pricing</p>
      <div className="relative w-full max-w-xs">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: progress + "%", background: "linear-gradient(90deg, #10b981, #2dd4bf)" }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-white/30">{Math.round(progress)}% complete</span>
          <span className="text-[10px] text-white/30">Step {step + 1} / {CALC_STEPS.length}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {CALC_STEPS.map((_, i) => (
          <div key={i} style={{
            height: 6, borderRadius: 3,
            width: i < step ? 20 : i === step ? 32 : 12,
            backgroundColor: i <= step ? "#34d399" : "rgba(255,255,255,0.15)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 0): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtPct(n: number, decimals = 1): string {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(decimals)}%`;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ─── Input component ──────────────────────────────────────────────────────────

function MoneyInput({
  label, hint, value, onChange, prefix = "$", suffix,
}: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; prefix?: string; suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-gray-400">{hint}</p>}
      <div className="relative mt-2 flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 text-sm font-bold text-gray-400 select-none">{prefix}</span>
        )}
        <input
          type="number"
          min={0}
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 ${prefix ? "pl-7 pr-3" : "px-3"} ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 text-sm font-semibold text-gray-400 select-none">{suffix}</span>
        )}
      </div>
    </div>
  );
}

// ─── Small stat card ──────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, highlight = false,
}: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-emerald-200 bg-emerald-50" : "border-gray-100 bg-gray-50"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className={`mt-1.5 text-xl font-bold tracking-tight ${highlight ? "text-emerald-700" : "text-gray-900"}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

// ─── Insight engine ───────────────────────────────────────────────────────────

interface Insight { type: "info" | "warn" | "tip"; text: string }

function buildInsights(marginPct: number, markupPct: number, monthlyProfit: number, monthlyUnits: number): Insight[] {
  const insights: Insight[] = [];

  if (marginPct < 0) {
    insights.push({ type: "warn", text: "You are selling below cost. Every unit sold loses money — review your pricing immediately." });
  } else if (marginPct < 10) {
    insights.push({ type: "warn", text: `Your margin of ${fmtPct(marginPct)} is very thin. Unexpected costs — shipping, returns, fees — could push this negative. Most sustainable businesses target at least 20%.` });
  } else if (marginPct >= 10 && marginPct < 20) {
    insights.push({ type: "info", text: `A ${fmtPct(marginPct)} margin is on the lower end. Retail averages 20–40%. Consider whether you can reduce cost or adjust your price slightly.` });
  } else if (marginPct >= 20 && marginPct < 50) {
    insights.push({ type: "info", text: `Your ${fmtPct(marginPct)} margin is solid — typical for retail and ecommerce. Protecting this as volume grows is key.` });
  } else if (marginPct >= 50) {
    insights.push({ type: "info", text: `A ${fmtPct(marginPct)} margin is excellent — common for software, consulting, and premium products. Focus on volume to maximize absolute profit.` });
  }

  if (markupPct > 0 && markupPct < 25) {
    insights.push({ type: "tip", text: `Your markup of ${fmtPct(markupPct)} is low. A common retail markup is 50–100%. Even a small increase in selling price can significantly boost margins.` });
  }

  if (monthlyUnits > 0 && monthlyProfit > 0) {
    const doubleProfit = monthlyProfit * 2;
    insights.push({ type: "tip", text: `Doubling your monthly sales volume would generate ${fmt(doubleProfit)} / month — ${fmt(doubleProfit * 12)} per year. Focus on customer acquisition if your margin is healthy.` });
  }

  if (marginPct > 0 && marginPct < 40) {
    const fiveMoreMargin = marginPct + 5;
    const newPrice = fiveMoreMargin < 100 ? (marginPct > 0 ? 0 : 0) : 0;
    void newPrice;
    insights.push({ type: "tip", text: `Raising your price by just 5% while keeping cost the same would increase your margin to roughly ${fmtPct(fiveMoreMargin)}. Even a small price increase has an outsized impact on profitability.` });
  }

  return insights.slice(0, 4);
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────

const chartTooltipStyle = {
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function MarginCalculator() {
  // ── Mode ──────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<CalcMode>("cost_price");

  // ── Raw string inputs (controlled) ────────────────────────────────────────
  const [costInput,   setCostInput]   = useState("50.00");
  const [priceInput,  setPriceInput]  = useState("79.99");
  const [marginInput, setMarginInput] = useState("37.5");
  const [markupInput, setMarkupInput] = useState("60.0");
  const [unitsInput,  setUnitsInput]  = useState("100");

  // ── Parsed numbers ────────────────────────────────────────────────────────
  const cost   = parseFloat(costInput)  || 0;
  const price  = parseFloat(priceInput) || 0;
  const desiredMargin = clamp(parseFloat(marginInput) || 0, 0, 99.9);
  const desiredMarkup = clamp(parseFloat(markupInput) || 0, 0, 10000);
  const monthlyUnits  = Math.max(0, parseInt(unitsInput) || 0);

  // ── Calculate + loader state ──────────────────────────────────────────────
  const [calculated,   setCalculated]   = useState(false);
  const [calculating,  setCalculating]  = useState(false);
  const [calcStep,     setCalcStep]     = useState(0);
  const [calcProgress, setCalcProgress] = useState(0);

  // ── Animated display values ───────────────────────────────────────────────
  const [displayMargin,  setDisplayMargin]  = useState(0);
  const [displayProfit,  setDisplayProfit]  = useState(0);
  const [flash,          setFlash]          = useState(false);
  const [showChange,     setShowChange]     = useState(false);
  const [changeAmount,   setChangeAmount]   = useState(0);
  const animRef          = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCalcRef      = useRef(false);
  const prevMarginRef    = useRef(0);
  const changeFadeRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Bidirectional sync ────────────────────────────────────────────────────
  // When user switches mode, keep values coherent
  useEffect(() => {
    if (mode === "cost_price" && cost > 0 && price > 0) {
      const m = ((price - cost) / price) * 100;
      const mu = ((price - cost) / cost) * 100;
      setMarginInput(m.toFixed(1));
      setMarkupInput(mu.toFixed(1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // When cost+price change in cost_price mode, sync margin/markup displays
  useEffect(() => {
    if (mode === "cost_price" && cost > 0 && price > 0) {
      const m = ((price - cost) / price) * 100;
      const mu = cost > 0 ? ((price - cost) / cost) * 100 : 0;
      setMarginInput(m.toFixed(1));
      setMarkupInput(mu.toFixed(1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costInput, priceInput]);

  // When desired margin changes, sync markup display
  useEffect(() => {
    if (mode === "target_margin") {
      setMarkupInput(markupFromMargin(desiredMargin).toFixed(1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marginInput]);

  // When desired markup changes, sync margin display
  useEffect(() => {
    if (mode === "target_markup") {
      setMarginInput(marginFromMarkup(desiredMarkup).toFixed(1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markupInput]);

  // ── Result (always calculated from current inputs) ────────────────────────
  const result = useMemo(() => calculateMargin({
    mode, cost, price,
    desiredMargin, desiredMarkup, monthlyUnits,
  }), [mode, cost, price, desiredMargin, desiredMarkup, monthlyUnits]);

  // ── Flash on result change ────────────────────────────────────────────────
  useEffect(() => {
    if (!calculated) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 450);
    return () => clearTimeout(t);
  }, [result.marginPct, calculated]);

  // ── Delta pill ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!calculated) return;
    const prev = prevMarginRef.current;
    const diff = result.marginPct - prev;
    if (prev !== 0 && Math.abs(diff) > 0.05) {
      setChangeAmount(diff);
      setShowChange(true);
      if (changeFadeRef.current) clearTimeout(changeFadeRef.current);
      changeFadeRef.current = setTimeout(() => setShowChange(false), 1800);
    }
    prevMarginRef.current = result.marginPct;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.marginPct]);

  // ── Live count-up when values change ─────────────────────────────────────
  useEffect(() => {
    if (!calculated || prevCalcRef.current === false) return;
    if (animRef.current) clearTimeout(animRef.current);
    const targetM = result.marginPct;
    const targetP = result.grossProfit;
    const startM = displayMargin;
    const startP = displayProfit;
    const diffM = targetM - startM;
    const diffP = targetP - startP;
    if (Math.abs(diffM) < 0.01 && Math.abs(diffP) < 0.01) return;
    const steps = 20;
    let step = 0;
    const tick = () => {
      step++;
      const t = step / steps;
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayMargin(startM + diffM * ease);
      setDisplayProfit(Math.round(startP + diffP * ease));
      if (step < steps) animRef.current = setTimeout(tick, 12);
      else { setDisplayMargin(targetM); setDisplayProfit(targetP); }
    };
    animRef.current = setTimeout(tick, 12);
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.marginPct, result.grossProfit, calculated]);

  // ── First reveal count-up ─────────────────────────────────────────────────
  useEffect(() => {
    if (!calculated || prevCalcRef.current) return;
    prevCalcRef.current = true;
    const targetM = result.marginPct;
    const targetP = result.grossProfit;
    const startM = targetM * 0.3;
    const startP = targetP * 0.3;
    const diffM = targetM - startM;
    const diffP = targetP - startP;
    const steps = 32;
    const c1 = 0.4; const c3 = c1 + 1;
    const easeOutBack = (t: number) => 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    let step = 0;
    const tick = () => {
      step++;
      const e = easeOutBack(step / steps);
      setDisplayMargin(startM + diffM * e);
      setDisplayProfit(Math.round(startP + diffP * e));
      if (step < steps) animRef.current = setTimeout(tick, 14);
      else { setDisplayMargin(targetM); setDisplayProfit(targetP); }
    };
    animRef.current = setTimeout(tick, 14);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculated]);

  // ── Trigger calculate ────────────────────────────────────────────────────
  function handleCalculate() {
    setCalculating(true);
    setCalcStep(0);
    setCalcProgress(0);
    const steps = CALC_STEPS.length;
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        setCalcStep(i);
        setCalcProgress(Math.round(((i + 1) / steps) * 100));
      }, i * 350);
    }
    setTimeout(() => {
      setCalculating(false);
      setCalculated(true);
    }, steps * 350);
  }

  // ── Derived UI values ─────────────────────────────────────────────────────
  const insights = useMemo(
    () => buildInsights(result.marginPct, result.markupPct, result.monthlyProfit, monthlyUnits),
    [result.marginPct, result.markupPct, result.monthlyProfit, monthlyUnits],
  );

  const modeLabel: Record<CalcMode, string> = {
    cost_price:    "Cost + Sell Price",
    target_margin: "Cost + Target Margin",
    target_markup: "Cost + Target Markup",
  };

  const marginColor = result.marginPct < 0 ? "text-red-400" : result.marginPct < 10 ? "text-amber-400" : "text-emerald-400";
  const marginGlow  = result.marginPct < 0
    ? "text-red-300 [text-shadow:0_0_40px_rgba(248,113,113,0.5)]"
    : result.marginPct < 10
    ? "text-amber-300 [text-shadow:0_0_40px_rgba(251,191,36,0.5)]"
    : "text-emerald-300 [text-shadow:0_0_40px_rgba(52,211,153,0.6)]";

  // Revenue breakdown pie data
  const pieData = [
    { name: "Your profit", value: Math.max(0, result.grossProfit), fill: "#34d399" },
    { name: "Cost",        value: Math.max(0, result.effectiveCost), fill: "#6b7280" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-10">

      {/* ── LEFT: INPUTS ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">

        {/* Mode selector */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Calculation Mode</p>
          </div>
          <div className="divide-y divide-gray-100">
            {(["cost_price", "target_margin", "target_markup"] as CalcMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-semibold transition-colors ${
                  mode === m ? "bg-emerald-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                  mode === m ? "border-white/40 bg-white/20 text-white" : "border-gray-300 text-gray-400"
                }`}>
                  {m === "cost_price" ? "1" : m === "target_margin" ? "2" : "3"}
                </span>
                {modeLabel[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Your Numbers</p>

          <MoneyInput
            label="Cost Price"
            hint="What you pay to produce or buy the item"
            value={costInput}
            onChange={setCostInput}
          />

          {mode === "cost_price" && (
            <MoneyInput
              label="Selling Price"
              hint="What you charge the customer"
              value={priceInput}
              onChange={setPriceInput}
            />
          )}

          {mode === "target_margin" && (
            <MoneyInput
              label="Target Margin"
              hint="The profit margin % you want to achieve"
              prefix=""
              suffix="%"
              value={marginInput}
              onChange={setMarginInput}
            />
          )}

          {mode === "target_markup" && (
            <MoneyInput
              label="Target Markup"
              hint="How much above cost you want to charge"
              prefix=""
              suffix="%"
              value={markupInput}
              onChange={setMarkupInput}
            />
          )}

          {/* Derived price display for non cost_price modes */}
          {mode !== "cost_price" && result.effectivePrice > 0 && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold text-emerald-600">Suggested selling price</p>
              <p className="mt-0.5 text-2xl font-bold text-emerald-800">{fmt(result.effectivePrice, 2)}</p>
            </div>
          )}

          <hr className="border-gray-100" />

          {/* Read-only derived fields */}
          {mode === "cost_price" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                <p className="text-xs font-semibold text-gray-400">Margin</p>
                <p className={`mt-0.5 text-base font-bold ${marginColor}`}>{fmtPct(result.marginPct)}</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                <p className="text-xs font-semibold text-gray-400">Markup</p>
                <p className="mt-0.5 text-base font-bold text-gray-700">{fmtPct(result.markupPct)}</p>
              </div>
            </div>
          )}

          <MoneyInput
            label="Monthly Units Sold"
            hint="Optional — used for revenue & profit projections"
            prefix=""
            value={unitsInput}
            onChange={setUnitsInput}
          />
        </div>

        {/* Quick scenarios */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Quick Scenarios</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "eCommerce product", cost: "12.00", price: "39.99" },
              { label: "Retail item",       cost: "20.00", price: "49.99" },
              { label: "Freelance day",     cost: "80.00", price: "350.00" },
              { label: "Restaurant dish",   cost: "4.50",  price: "14.00" },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setMode("cost_price");
                  setCostInput(s.cost);
                  setPriceInput(s.price);
                }}
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-left text-xs font-semibold text-gray-600 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {s.label}
                <span className="block mt-0.5 font-normal text-gray-400">${s.cost} → ${s.price}</span>
              </button>
            ))}
          </div>
        </div>

        {!calculated && (
          <button
            type="button"
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full rounded-2xl bg-gray-950 py-4 text-sm font-bold text-white tracking-wide shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {calculating ? "Calculating…" : "Calculate my margins →"}
          </button>
        )}
      </div>

      {/* ── RIGHT: OUTPUTS ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">

        {calculating && <CalculatingLoader progress={calcProgress} step={calcStep} />}

        {!calculated && !calculating && (
          <div className="relative flex flex-col items-center justify-center py-24 px-6 rounded-2xl overflow-hidden bg-gray-950 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute inset-0 opacity-20"
              style={{ background: "radial-gradient(ellipse at 50% 80%, #10b981 0%, transparent 60%)" }} />
            <div className="relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 12 L5 4 L8 9 L11 6 L14 10" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="relative text-sm font-semibold text-white/70">Enter your cost and price, then hit Calculate</p>
            <p className="relative mt-1 text-xs text-white/30">Your full margin breakdown will appear here</p>
          </div>
        )}

        {!calculating && calculated && (<>

          {/* Hero result card */}
          <div className={`relative overflow-hidden rounded-2xl border bg-gray-950 p-6 sm:p-8 transition-all duration-500 ${
            flash
              ? "border-emerald-500/20 shadow-[0_24px_100px_rgba(0,0,0,0.55),0_0_40px_rgba(52,211,153,0.1)]"
              : "border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          }`}>
            <div className={`pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl transition-all duration-500 ${flash ? "bg-emerald-500/25 scale-110" : "bg-emerald-500/15 scale-100"}`} />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-900/40 blur-3xl" />

            <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
              Profit Margin
            </p>
            <p className={`relative mt-3 text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-none tracking-[-0.04em] transition-all duration-500 ${
              flash ? marginGlow : marginColor
            }`}>
              {displayMargin.toFixed(1)}
              <span className="text-2xl font-normal opacity-60">%</span>
            </p>

            {/* Change delta */}
            <div className={`relative mt-1 h-6 overflow-hidden transition-all duration-700 ${showChange ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
              {changeAmount !== 0 && (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  changeAmount > 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                }`}>
                  {changeAmount > 0 ? "▲" : "▼"} {Math.abs(changeAmount).toFixed(1)}pp
                </span>
              )}
            </div>

            <div className="relative mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-sm font-medium text-gray-400">
                {fmt(result.effectivePrice, 2)} sell price &nbsp;&middot;&nbsp;
                <span className="font-bold text-white">{fmt(result.grossProfit, 2)}</span> profit per unit
              </p>
              {result.markupPct > 0 && (
                <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
                  {fmtPct(result.markupPct)} markup
                </span>
              )}
            </div>

            {/* Cost vs Profit bar */}
            <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full bg-emerald-400 transition-all duration-700"
                style={{ width: `${Math.max(0, result.profitSharePct)}%` }}
              />
              <div
                className="h-full bg-gray-500 transition-all duration-700 flex-1"
              />
            </div>
            <div className="mt-3 flex gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" />Profit ({fmtPct(result.profitSharePct, 0)})</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gray-500" />Cost ({fmtPct(result.costSharePct, 0)})</span>
            </div>
          </div>

          {/* 2×3 stat grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard label="Gross Profit"      value={fmt(result.grossProfit, 2)}    sub="per unit sold" highlight />
            <StatCard label="Markup"            value={fmtPct(result.markupPct)}       sub="above cost" />
            <StatCard label="Revenue per Unit"  value={fmt(result.effectivePrice, 2)} sub="selling price" />
            {monthlyUnits > 0 ? (<>
              <StatCard label="Monthly Revenue" value={fmt(result.monthlyRevenue)}     sub={`${monthlyUnits} units / mo`} />
              <StatCard label="Monthly Profit"  value={fmt(result.monthlyProfit)}      sub="after cost" highlight />
              <StatCard label="Annual Profit"   value={fmt(result.annualProfit)}       sub="projected" />
            </>) : (<>
              <StatCard label="Cost"            value={fmt(result.effectiveCost, 2)}  sub="per unit" />
              <StatCard label="Add units sold"  value="+ projection"                  sub="enter qty above" />
            </>)}
          </div>

          {/* Full breakdown rows */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-5 text-sm font-semibold text-gray-700">Full breakdown</p>
            <dl className="space-y-0">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3.5">
                <dt className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gray-300" />Cost Price
                </dt>
                <dd className="text-sm font-semibold text-gray-900">{fmt(result.effectiveCost, 2)}</dd>
              </div>
              <div className="px-5 py-1 text-xs text-gray-300 select-none">+</div>
              <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5">
                <dt className="flex items-center gap-2.5 text-sm font-medium text-emerald-700">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />Gross Profit
                </dt>
                <dd className="text-sm font-semibold text-emerald-700">+{fmt(result.grossProfit, 2)}</dd>
              </div>
              <div className="px-5 py-1 text-xs text-gray-300 select-none">↓</div>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5">
                <dt className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-gray-950">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />Selling Price
                  </span>
                  <span className="ml-5 text-xs text-gray-400">{fmtPct(result.marginPct)} margin · {fmtPct(result.markupPct)} markup</span>
                </dt>
                <dd className="text-xl font-bold tracking-tight text-emerald-600">{fmt(result.effectivePrice, 2)}</dd>
              </div>
            </dl>
          </div>

          {/* Charts section */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Revenue breakdown</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
              <div className="relative shrink-0">
                <PieChart width={140} height={140}>
                  <Pie data={pieData} cx={70} cy={70} innerRadius={42} outerRadius={64}
                    paddingAngle={2} dataKey="value" animationBegin={0} animationDuration={600} strokeWidth={0}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [fmt(Number(v), 2), ""]} contentStyle={chartTooltipStyle} />
                </PieChart>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[15px] font-bold leading-none text-gray-900">{fmtPct(result.marginPct, 0)}</p>
                    <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-gray-400">margin</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-start gap-2.5">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: entry.fill }} />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{entry.name}</p>
                      <p className="text-xs text-gray-400">{fmt(entry.value, 2)} · {fmtPct((entry.value / Math.max(1, result.effectivePrice)) * 100, 0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Margin sensitivity chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Margin sensitivity — price ±40%</p>
            <p className="mb-5 text-xs text-gray-400">How your margin changes as the selling price moves</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={result.sensitivityData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="marginGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="price" tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickFormatter={(v) => `$${v}`} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickFormatter={(v) => `${v}%`} width={36} />
                <Tooltip
                  formatter={(v, name) => [name === "margin" ? `${v}%` : fmt(Number(v)), name === "margin" ? "Margin" : "Profit"]}
                  labelFormatter={(v) => `Price: $${v}`}
                  contentStyle={chartTooltipStyle}
                />
                <ReferenceLine x={result.effectivePrice} stroke="#34d399" strokeDasharray="4 2" strokeWidth={1.5} />
                <Area type="monotone" dataKey="margin" stroke="#34d399" strokeWidth={2}
                  fill="url(#marginGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Volume profit projection (only if units > 0) */}
          {monthlyUnits > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Profit projection by volume</p>
              <p className="mb-5 text-xs text-gray-400">Monthly profit at various sales volumes</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={result.projectionData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="units" tick={{ fontSize: 10, fill: "#9ca3af" }}
                    tickFormatter={(v) => `${v}u`} />
                  <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={40} />
                  <Tooltip
                    formatter={(v) => [fmt(Number(v)), ""]}
                    labelFormatter={(v) => `${v} units/mo`}
                    contentStyle={chartTooltipStyle}
                  />
                  <Bar dataKey="profit" fill="#34d399" radius={[4, 4, 0, 0]} name="Profit" />
                  <Bar dataKey="revenue" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Industry comparison chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Industry comparison</p>
            <p className="mb-5 text-xs text-gray-400">How your margin stacks up against typical business benchmarks</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={result.scenarioData}
                layout="vertical"
                margin={{ top: 0, right: 24, bottom: 0, left: 72 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#4b5563" }} width={68} />
                <Tooltip formatter={(v) => [`${v}%`, "Margin"]} contentStyle={chartTooltipStyle} />
                <Bar dataKey="margin" radius={[0, 4, 4, 0]}>
                  {result.scenarioData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* What-if scenarios */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-700">What if your price changed?</p>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              Small price changes have an outsized impact on margin. Try a scenario below.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Price +5%",  s: "pos", apply: () => { const v = (result.effectivePrice * 1.05).toFixed(2); setPriceInput(v); setMode("cost_price"); } },
                { label: "Price +10%", s: "pos", apply: () => { const v = (result.effectivePrice * 1.10).toFixed(2); setPriceInput(v); setMode("cost_price"); } },
                { label: "Cost −10%",  s: "pos", apply: () => { const v = (result.effectiveCost * 0.90).toFixed(2); setCostInput(v); } },
                { label: "Price −5%",  s: "neg", apply: () => { const v = (result.effectivePrice * 0.95).toFixed(2); setPriceInput(v); setMode("cost_price"); } },
                { label: "20% margin", s: "neu", apply: () => { setMode("target_margin"); setMarginInput("20"); } },
                { label: "50% markup", s: "neu", apply: () => { setMode("target_markup"); setMarkupInput("50"); } },
              ].map((sc) => (
                <button
                  key={sc.label}
                  onClick={sc.apply}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.97] hover:-translate-y-px ${
                    sc.s === "pos"
                      ? "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      : sc.s === "neg"
                      ? "border-gray-200 bg-gray-50 text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>

            {/* Live preview */}
            <div className="mt-5 rounded-xl border border-white/7 bg-gray-950 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Live estimate</p>
              <p className={`mt-1 text-3xl font-bold tracking-[-0.03em] transition-all duration-500 ${flash ? "text-emerald-300 [text-shadow:0_0_20px_rgba(52,211,153,0.5)]" : "text-emerald-400"}`}>
                {fmtPct(result.marginPct)}<span className="ml-2 text-sm font-normal text-gray-500">margin</span>
              </p>
              <p className="mt-0.5 text-sm text-gray-400">
                {fmt(result.grossProfit, 2)} profit · {fmtPct(result.markupPct)} markup
              </p>
            </div>
          </div>

          {/* Insights */}
          {insights.length > 0 && (
            <div className="space-y-2">
              {insights.map((insight, i) => (
                <div key={i} className={`rounded-xl p-4 text-sm leading-relaxed ${
                  insight.type === "warn"
                    ? "border border-amber-200 bg-amber-50 text-amber-800"
                    : insight.type === "tip"
                    ? "border border-blue-100 bg-blue-50 text-blue-800"
                    : "border border-emerald-100 bg-emerald-50 text-emerald-800"
                }`}>
                  {insight.text}
                </div>
              ))}
            </div>
          )}

          {/* CTA to related tools */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
            <p className="text-sm font-bold text-emerald-800">Want to see how this grows over time?</p>
            <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
              Use the Passive Income Calculator to model how your business profits compound into long-term wealth.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="/tools/passive-income-calculator"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                Passive Income Calculator →
              </a>
              <a href="/tools/compound-interest-calculator"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors">
                Compound Interest Calculator
              </a>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-gray-400">
            Estimates only. Figures are pre-tax and do not account for overhead, shipping, returns, or other operating costs. Not financial or business advice.
          </p>

        </>)}
      </div>
    </div>
  );
}
