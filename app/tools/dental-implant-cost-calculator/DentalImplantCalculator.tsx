"use client";

import { useState, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import {
  calculateDentalImplantCost,
  TREATMENT_LABELS,
  type TreatmentType,
  type ImplantQuality,
  type ClinicType,
  type BoneGraft,
} from "@/calculations/health/dentalImplant";
import { saveLead } from "@/lib/leads";

// ── Types ────────────────────────────────────────────────────────────────────

interface LeadFields {
  name: string;
  email: string;
  phone?: string;
  timeline: string;
  address_line?: string;
  consent: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

function PillGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; sub?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-150 active:scale-[0.97] ${
            value === o.value
              ? "border-sky-400 bg-sky-50 text-sky-700 shadow-sm"
              : "border-gray-200 bg-white text-gray-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
          }`}
        >
          {o.label}
          {o.sub && <span className="ml-1 text-xs font-normal text-current/60">{o.sub}</span>}
        </button>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DentalImplantCalculator() {
  const [treatment,  setTreatment]  = useState<TreatmentType>("single");
  const [toothCount, setToothCount] = useState(2);
  const [quality,    setQuality]    = useState<ImplantQuality>("standard");
  const [clinic,     setClinic]     = useState<ClinicType>("private");
  const [graft,      setGraft]      = useState<BoneGraft>("no");

  // Lead form state
  const [postcode,      setPostcode]      = useState("");
  const [showLeadForm,  setShowLeadForm]  = useState(false);
  const [leadStatus,    setLeadStatus]    = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadError,     setLeadError]     = useState<string | null>(null);
  const leadFormRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFields>({
    defaultValues: { consent: false, timeline: "", address_line: "", phone: "" },
  });

  // ── Calculation ──────────────────────────────────────────────────────────

  const result = useMemo(
    () =>
      calculateDentalImplantCost({
        treatmentType: treatment,
        toothCount,
        quality,
        clinicType: clinic,
        boneGraft: graft,
        country: "us",
      }),
    [treatment, toothCount, quality, clinic, graft],
  );

  // ── Lead submit ──────────────────────────────────────────────────────────

  const onLeadSubmit: SubmitHandler<LeadFields> = async (fields) => {
    setLeadStatus("loading");
    setLeadError(null);
    const res = await saveLead({
      calculator_type: "dental_implant",
      name:            fields.name,
      email:           fields.email,
      phone:           fields.phone ?? "",
      location:        { postcode },
      address_line:    fields.address_line,
      timeline:        fields.timeline,
      estimated_cost:  result.avgCost,
      inputs:  { treatment, toothCount, quality, clinic, graft },
      results: {
        minCost:      result.minCost,
        maxCost:      result.maxCost,
        avgCost:      result.avgCost,
        costPerTooth: result.costPerTooth,
        monthlyEst:   result.monthlyEst,
      },
      marketing_consent: fields.consent,
    });
    if (res.success) {
      setLeadStatus("success");
    } else {
      setLeadStatus("error");
      setLeadError(res.error ?? "Something went wrong. Please try again.");
    }
  };

  // ── Chart data ───────────────────────────────────────────────────────────

  const barData = [
    { label: "Minimum",  value: result.minCost,  fill: "#94a3b8" },
    { label: "Typical",  value: result.avgCost,  fill: "#0ea5e9" },
    { label: "Maximum",  value: result.maxCost,  fill: "#0284c7" },
  ];

  const pieData = [
    { name: "Implants",   value: result.breakdown.implants,   fill: "#0ea5e9" },
    { name: "Crowns",     value: result.breakdown.crowns,     fill: "#38bdf8" },
    { name: "Surgery",    value: result.breakdown.surgery,    fill: "#7dd3fc" },
    { name: "Additional", value: result.breakdown.additional, fill: "#bae6fd" },
  ];

  // ── Insights ─────────────────────────────────────────────────────────────

  const insights: string[] = [];

  if (treatment === "all-on-4") {
    insights.push("All-on-4 implants use just 4 titanium posts per arch to support a full set of teeth — typically 30–50% cheaper than individual full-mouth implants.");
  }
  if (treatment === "full-mouth") {
    insights.push("Full-mouth implants involve replacing every tooth individually. Costs can be significantly reduced with All-on-4 or implant-supported dentures.");
  }
  if (graft === "yes") {
    insights.push("Bone grafting adds $800–$3,000+ per site and extends treatment by 3–6 months. It's required when the jaw lacks sufficient bone density.");
  }
  if (graft === "unsure") {
    insights.push("Whether you need a bone graft is determined by a CT scan. Roughly 40–50% of patients require some grafting — budget for it just in case.");
  }
  if (quality === "premium") {
    insights.push("Premium implants (Straumann, Nobel Biocare) typically carry 10–25 year warranties and have higher success rates — often worth the investment.");
  }
  if (quality === "budget") {
    insights.push("Budget implants may have shorter lifespans and fewer warranty guarantees. Ensure your clinician uses implants with documented clinical evidence.");
  }
  if (clinic === "specialist") {
    insights.push("Specialist implant clinics charge more but offer advanced imaging, sedation options, and complex case experience — worth it for multi-tooth or full-mouth cases.");
  }
  if (result.avgCost > 20000) {
    insights.push("For large treatment plans, ask clinics about staged payment plans or dental finance — many offer 0% over 12–24 months.");
  }
  insights.push("Always get at least 2–3 quotes. Prices vary significantly between clinics even within the same city.");

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-10">

      {/* ── LEFT: Inputs ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">

        {/* Treatment type */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="mb-3 block text-sm font-semibold text-gray-700">Treatment type</label>
          <PillGroup<TreatmentType>
            value={treatment}
            onChange={setTreatment}
            options={[
              { value: "single",       label: "Single tooth" },
              { value: "multiple",     label: "Multiple teeth" },
              { value: "full-mouth",   label: "Full mouth" },
              { value: "all-on-4",     label: "All-on-4" },
            ]}
          />
          {treatment === "multiple" && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Number of teeth</span>
                <span className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-bold text-sky-700">
                  {toothCount}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={14}
                step={1}
                value={toothCount}
                onChange={(e) => setToothCount(Number(e.target.value))}
                className="mt-2 w-full accent-sky-500"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>2</span><span>8</span><span>14</span>
              </div>
            </div>
          )}
        </div>

        {/* Implant quality */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="mb-3 block text-sm font-semibold text-gray-700">Implant quality</label>
          <PillGroup<ImplantQuality>
            value={quality}
            onChange={setQuality}
            options={[
              { value: "budget",   label: "Budget",   sub: "~30% less" },
              { value: "standard", label: "Standard", sub: "most common" },
              { value: "premium",  label: "Premium",  sub: "~45% more" },
            ]}
          />
          <p className="mt-2.5 text-xs text-gray-400">
            {quality === "budget"   && "Lower-cost brands with adequate but limited clinical history."}
            {quality === "standard" && "Mid-range brands (e.g. BioHorizons, Dentsply Sirona). Most clinics use these."}
            {quality === "premium"  && "Straumann, Nobel Biocare, Zimmer — longest track record and warranties."}
          </p>
        </div>

        {/* Clinic type */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="mb-3 block text-sm font-semibold text-gray-700">Clinic type</label>
          <PillGroup<ClinicType>
            value={clinic}
            onChange={setClinic}
            options={[
              { value: "budget",     label: "Budget clinic"   },
              { value: "private",    label: "Private dental"  },
              { value: "specialist", label: "Implant specialist" },
            ]}
          />
        </div>

        {/* Bone graft */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="mb-3 block text-sm font-semibold text-gray-700">
            Bone graft needed?
          </label>
          <PillGroup<BoneGraft>
            value={graft}
            onChange={setGraft}
            options={[
              { value: "no",     label: "No"     },
              { value: "unsure", label: "Unsure" },
              { value: "yes",    label: "Yes"    },
            ]}
          />
          <p className="mt-2.5 text-xs text-gray-400">
            A bone graft is required when your jaw bone has insufficient density to hold an implant.
          </p>
        </div>


      </div>

      {/* ── RIGHT: Outputs ───────────────────────────────────────── */}
      <div className="flex flex-col gap-6">

        {/* Hero result card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gray-950 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-900/40 blur-3xl" />

          <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
            {TREATMENT_LABELS[treatment]} Implant Cost
          </p>
          <p className="relative mt-3 text-[clamp(2.4rem,5vw,4rem)] font-bold leading-none tracking-[-0.04em] text-sky-400 [text-shadow:0_0_30px_rgba(14,165,233,0.35)]">
            {fmt(result.minCost)} – {fmt(result.maxCost)}
          </p>

          <div className="relative mt-4 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-gray-500">Typical cost</p>
              <p className="text-2xl font-bold tracking-tight text-white">{fmt(result.avgCost)}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-xs text-gray-500">Monthly estimate</p>
              <p className="text-2xl font-bold tracking-tight text-sky-300">{fmt(result.monthlyEst)}<span className="ml-1 text-sm font-normal text-gray-500">/mo</span></p>
            </div>
            {treatment !== "full-mouth" && treatment !== "all-on-4" && (
              <>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-xs text-gray-500">Per tooth</p>
                  <p className="text-2xl font-bold tracking-tight text-white">{fmt(result.costPerTooth)}</p>
                </div>
              </>
            )}
          </div>

          <p className="relative mt-3 text-xs text-gray-500">
            Based on US prices. Monthly estimate over 36 months.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Minimum",       value: fmt(result.minCost),       sub: "low estimate"  },
            { label: "Typical",       value: fmt(result.avgCost),       sub: "most likely"   },
            { label: "Maximum",       value: fmt(result.maxCost),       sub: "high estimate" },
            { label: "Per month",     value: fmt(result.monthlyEst),    sub: "over 36 months" },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-white/6 bg-gray-900 p-4 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{card.label}</p>
              <p className="mt-2 text-lg font-bold tracking-tight text-sky-400">{card.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Cost breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-gray-700">Cost breakdown</p>
          <dl className="space-y-2">
            {[
              { label: "Implant fixtures",     value: result.breakdown.implants,   color: "bg-sky-500"   },
              { label: "Crowns & abutments",   value: result.breakdown.crowns,     color: "bg-sky-400"   },
              { label: "Surgery & imaging",    value: result.breakdown.surgery,    color: "bg-sky-300"   },
              { label: "Additional / grafting",value: result.breakdown.additional, color: "bg-sky-200"   },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${row.color}`} />
                <span className="flex-1 text-sm text-gray-600">{row.label}</span>
                <span className="text-sm font-semibold text-gray-900">{fmt(row.value)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <span className="text-sm font-bold text-gray-900">Total (typical)</span>
              <span className="text-lg font-bold text-sky-600">{fmt(result.avgCost)}</span>
            </div>
          </dl>
        </div>

        {/* Charts */}
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Bar chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-gray-700">Cost range</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} barSize={36} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v: number) => [fmt(v), "Cost"]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-gray-700">What you&apos;re paying for</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={76}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [fmt(v), ""]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {pieData.map((d) => (
                <span key={d.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.fill }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Insights</p>
            <ul className="space-y-2">
              {insights.slice(0, 4).map((insight, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-sky-800">
                  <span className="mt-0.5 shrink-0 text-sky-400">→</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lead capture */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
            Get local quotes
          </p>
          <h3 className="mt-1.5 text-lg font-bold text-gray-900">
            Find dental implant clinics near you
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your estimate is based on typical costs. Local clinics may vary — we&apos;ll connect
            you with verified dental implant providers for accurate quotes.
          </p>

          {leadStatus === "success" ? (
            <div className="mt-5 rounded-xl border border-sky-200 bg-sky-50 px-5 py-6 text-center">
              <p className="text-base font-bold text-sky-800">Request received!</p>
              <p className="mt-1 text-sm text-sky-600">
                We&apos;ll be in touch with quotes from clinics near you.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">

              {/* Step 1 — ZIP */}
              {!showLeadForm ? (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Your ZIP code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 90210"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && postcode.trim()) {
                          setShowLeadForm(true);
                          setTimeout(() => leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                        }
                      }}
                      className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                    <button
                      type="button"
                      disabled={!postcode.trim()}
                      onClick={() => {
                        setShowLeadForm(true);
                        setTimeout(() => leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                      }}
                      className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
                    >
                      Check prices
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">No spam. Used only to match you with local clinics.</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm">
                  <span className="text-base">📍</span>
                  <span className="font-medium text-gray-700">{postcode}</span>
                  <button
                    type="button"
                    onClick={() => { setShowLeadForm(false); setPostcode(""); }}
                    className="ml-auto text-xs text-gray-400 underline hover:text-gray-600"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Step 2 — full form */}
              {showLeadForm && (
                <form ref={leadFormRef} onSubmit={handleSubmit(onLeadSubmit)} noValidate className="space-y-4">

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="dic-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                        Your name
                      </label>
                      <input
                        id="dic-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${errors.name ? "border-red-300 focus:ring-red-100" : "border-gray-200 bg-white focus:border-sky-400 focus:ring-sky-100"}`}
                        {...register("name", {
                          required: "Name is required",
                          minLength: { value: 2, message: "At least 2 characters" },
                        })}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="dic-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="dic-email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@example.com"
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${errors.email ? "border-red-300 focus:ring-red-100" : "border-gray-200 bg-white focus:border-sky-400 focus:ring-sky-100"}`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                        })}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="dic-phone" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Phone number{" "}
                      <span className="font-normal text-gray-400">(optional — clinics can call with quotes faster)</span>
                    </label>
                    <input
                      id="dic-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. 07700 900123"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                      {...register("phone")}
                    />
                  </div>

                  {/* Timeline */}
                  <div>
                    <label htmlFor="dic-timeline" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      When are you planning treatment?
                    </label>
                    <select
                      id="dic-timeline"
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${errors.timeline ? "border-red-300 focus:ring-red-100" : "border-gray-200 bg-white focus:border-sky-400 focus:ring-sky-100"}`}
                      {...register("timeline", { required: "Please select a timeline" })}
                    >
                      <option value="">Select a timeline…</option>
                      <option value="researching">Just researching</option>
                      <option value="within-6-months">Within 6 months</option>
                      <option value="urgent">As soon as possible</option>
                    </select>
                    {errors.timeline && <p className="mt-1 text-xs text-red-500">{errors.timeline.message}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="dic-address" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Street address{" "}
                      <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="dic-address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="123 Main St"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                      {...register("address_line")}
                    />
                  </div>

                  {/* Consent */}
                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        id="dic-consent"
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-sky-600"
                        {...register("consent", {
                          required: "You must agree to continue",
                          validate: (v) => v === true || "You must agree to continue",
                        })}
                      />
                      <label htmlFor="dic-consent" className="text-xs leading-relaxed text-gray-500">
                        I agree to the{" "}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-600 underline underline-offset-2">Terms</a>
                        {" "}and{" "}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-600 underline underline-offset-2">Privacy Policy</a>
                        . I consent to my details and calculator inputs being shared with dental clinics so they can provide accurate quotes.{" "}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent.message}</p>}
                  </div>

                  {leadError && (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-600">
                      {leadError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="w-full rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
                  >
                    {leadStatus === "loading" ? "Sending…" : "Get free quotes →"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
