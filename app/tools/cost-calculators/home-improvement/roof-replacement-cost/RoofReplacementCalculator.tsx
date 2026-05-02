"use client";

import { useState, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
  type BarProps,
} from "recharts";
import {
  calculateRoofCost,
  MATERIAL_LABELS,
  MATERIAL_LIFESPAN,
  type Material,
  type PropertyType,
  type Condition,
  type Complexity,
  type LocationCost,
  type Urgency,
} from "@/calculations/construction/roofReplacement";
import DisclaimerBlock from "@/components/compliance/DisclaimerBlock";
import { saveLead } from "@/lib/leads";

interface LeadFields {
  name: string;
  email: string;
  phone?: string;
  timeline: string;
  address_line?: string;
  consent: boolean;
}

// ── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── dynamic insight generator ─────────────────────────────────────────────────

function buildInsights(
  material: Material,
  condition: Condition,
  urgency: Urgency,
  avgCost: number,
  minCost: number,
  maxCost: number,
): string[] {
  const insights: string[] = [];

  if (condition === "severe") {
    insights.push(
      `Your roof is in severe condition. Delaying replacement could increase total costs by up to 25% due to structural damage and water ingress.`,
    );
  }
  if (condition === "repairable") {
    insights.push(
      `Your roof may only need repairs rather than a full replacement — our estimate reflects that. Get a professional inspection to confirm.`,
    );
  }
  insights.push(
    `Most homeowners in your situation spend between ${fmt(minCost)}–${fmt(maxCost)} for a reliable long-term solution.`,
  );
  if (material === "asphalt") {
    insights.push(
      `Asphalt shingles offer the lowest upfront cost but have a shorter lifespan (20–30 years). If you plan to stay in the home long-term, metal or tile may offer better value.`,
    );
  }
  if (material === "metal") {
    insights.push(
      `Metal roofing has a higher upfront cost but typically lasts 40–70 years — often the most cost-effective choice over time.`,
    );
  }
  if (urgency === "urgent") {
    insights.push(
      `Urgent replacements typically cost 15–20% more due to premium scheduling. If you can wait 4–6 weeks, you may save ${fmt(Math.round(avgCost * 0.15))} or more.`,
    );
  }
  if (material === "tile") {
    insights.push(
      `Tile and slate roofs are premium products. Expect labour costs to be higher due to the skill and time required for installation.`,
    );
  }
  return insights.slice(0, 3);
}

// ── main component ────────────────────────────────────────────────────────────

export default function RoofReplacementCalculator() {
  const [roofSize,     setRoofSize]     = useState<number>(1500);
  const [sizeInput,    setSizeInput]    = useState<string>("1500");
  const [propertyType, setPropertyType] = useState<PropertyType>("detached");
  const [material,     setMaterial]     = useState<Material>("asphalt");
  const [condition,    setCondition]    = useState<Condition>("worn");
  const [complexity,   setComplexity]   = useState<Complexity>("medium");
  const [locationCost, setLocationCost] = useState<LocationCost>("average");
  const [urgency,      setUrgency]      = useState<Urgency>("within-6-months");

  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadError,  setLeadError]  = useState<string>("");
  const [postcode,     setPostcode]     = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const leadFormRef = useRef<HTMLDivElement>(null);

  const result = useMemo(
    () =>
      calculateRoofCost({
        roofSize,
        propertyType,
        material,
        condition,
        complexity,
        locationCost,
        urgency,
      }),
    [roofSize, propertyType, material, condition, complexity, locationCost, urgency],
  );

  const insights = useMemo(
    () => buildInsights(material, condition, urgency, result.avgCost, result.minCost, result.maxCost),
    [material, condition, urgency, result],
  );

  // Chart data
  const breakdownData = [
    { label: "Materials", value: result.breakdown.materials, fill: "#10b981" },
    { label: "Labour",    value: result.breakdown.labour,    fill: "#6366f1" },
    { label: "Other",     value: result.breakdown.other,     fill: "#f59e0b" },
  ];

  const materialCompareData = (
    [
      ["asphalt", 1500],
      ["metal",   1500],
      ["tile",    1500],
      ["flat",    1500],
    ] as [Material, number][]
  ).map(([mat, size]) => {
    const r = calculateRoofCost({
      roofSize: size,
      propertyType,
      material: mat,
      condition,
      complexity,
      locationCost,
      urgency,
    });
    return { label: MATERIAL_LABELS[mat], value: r.avgCost };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFields>({ defaultValues: { consent: false, timeline: "", address_line: "", phone: "" } });

  const onLeadSubmit: SubmitHandler<LeadFields> = async (fields) => {
    setLeadStatus("loading");
    setLeadError("");

    const res = await saveLead({
      calculator_type: "roof-replacement-cost",
      name:            fields.name,
      email:           fields.email,
      phone:           fields.phone ?? "",
      location:        { postcode },
      address_line:    fields.address_line ?? "",
      timeline:        fields.timeline,
      estimated_cost:  result.avgCost,
      inputs: {
        roofSize,
        propertyType,
        material,
        condition,
        complexity,
        locationCost,
        urgency,
      },
      results: {
        minCost:    result.minCost,
        maxCost:    result.maxCost,
        avgCost:    result.avgCost,
        monthlyEst: result.monthlyEst,
        breakdown:  result.breakdown,
      },
      marketing_consent: true,
    });

    if (res.success) {
      setLeadStatus("success");
    } else {
      setLeadStatus("error");
      setLeadError(res.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div id="calculator" className="space-y-8">
      {/* ── Input + Output grid ───────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">

        {/* INPUTS */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
            Your Details
          </p>
          <div className="space-y-5">
            {/* Roof size */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Roof Size (sq ft)
              </label>
              <input
                type="number"
                min={100}
                max={20000}
                value={sizeInput}
                onChange={(e) => {
                  setSizeInput(e.target.value);
                  const n = Number(e.target.value);
                  if (!isNaN(n) && n > 0) setRoofSize(n);
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder="e.g. 1500"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Typical homes: 1,200–2,500 sq ft
              </p>
            </div>

            <SelectField
              label="Property Type"
              value={propertyType}
              onChange={setPropertyType}
              options={[
                { value: "bungalow",       label: "Bungalow" },
                { value: "terraced",       label: "Terraced" },
                { value: "semi-detached",  label: "Semi-Detached" },
                { value: "detached",       label: "Detached" },
                { value: "commercial",     label: "Commercial" },
              ]}
            />

            <SelectField
              label="Roofing Material"
              value={material}
              onChange={setMaterial}
              options={[
                { value: "asphalt", label: "Asphalt Shingles ($4–$7/sq ft)" },
                { value: "metal",   label: "Metal Roofing ($8–$14/sq ft)" },
                { value: "tile",    label: "Tile / Slate ($10–$20/sq ft)" },
                { value: "flat",    label: "Flat Roof ($5–$10/sq ft)" },
              ]}
            />

            <SelectField
              label="Current Roof Condition"
              value={condition}
              onChange={setCondition}
              options={[
                { value: "repairable", label: "Repairable (minor issues)" },
                { value: "worn",       label: "Worn (general deterioration)" },
                { value: "severe",     label: "Severe (structural damage)" },
              ]}
            />

            <SelectField
              label="Roof Complexity"
              value={complexity}
              onChange={setComplexity}
              options={[
                { value: "low",    label: "Low (simple, flat pitch)" },
                { value: "medium", label: "Medium (standard pitch)" },
                { value: "high",   label: "High (steep / complex)" },
              ]}
            />

            <SelectField
              label="Your Location (Cost Area)"
              value={locationCost}
              onChange={setLocationCost}
              options={[
                { value: "low",     label: "Low cost area" },
                { value: "average", label: "Average cost area" },
                { value: "high",    label: "High cost area (NYC, LA, etc.)" },
              ]}
            />

            <SelectField
              label="Urgency"
              value={urgency}
              onChange={setUrgency}
              options={[
                { value: "not-urgent",       label: "Not urgent (planning ahead)" },
                { value: "within-6-months",  label: "Within 6 months" },
                { value: "urgent",           label: "Urgent (leaking / failing)" },
              ]}
            />
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="flex flex-col gap-5">

          {/* Primary result card */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-950 to-gray-950 p-7 shadow-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">
              Estimated Cost Range
            </p>
            <div className="relative mt-3 flex items-end gap-3">
              <span className="text-5xl font-bold tracking-[-0.04em] text-white [text-shadow:0_0_24px_rgba(52,211,153,0.3)]">
                {fmt(result.minCost)}
              </span>
              <span className="mb-1.5 text-xl font-semibold text-emerald-400">–</span>
              <span className="text-5xl font-bold tracking-[-0.04em] text-white [text-shadow:0_0_24px_rgba(52,211,153,0.3)]">
                {fmt(result.maxCost)}
              </span>
            </div>
            <p className="relative mt-2 text-sm text-gray-400">
              for a {roofSize.toLocaleString()} sq ft {MATERIAL_LABELS[material].toLowerCase()} roof
            </p>

            <div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
              <div>
                <p className="text-xs text-gray-500">Most homeowners pay</p>
                <p className="mt-0.5 text-2xl font-bold text-emerald-400">{fmt(result.avgCost)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Spread over 3 years</p>
                <p className="mt-0.5 text-2xl font-bold text-emerald-400">{fmt(result.monthlyEst)}<span className="text-sm font-normal text-gray-400">/mo</span></p>
              </div>
            </div>

            <div className="relative mt-4 text-xs text-gray-500">
              Lifespan of {MATERIAL_LABELS[material]}: <span className="font-semibold text-gray-400">{MATERIAL_LIFESPAN[material]}</span>
            </div>
          </div>

          {/* Scenario cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Budget",    value: result.minCost,  sub: "Minimum viable",        color: "text-blue-600",    border: "border-blue-100",   bg: "bg-blue-50"   },
              { label: "Realistic", value: result.avgCost,  sub: "Most homeowners pay",   color: "text-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50", highlight: true },
              { label: "Premium",   value: result.maxCost,  sub: "High-spec / complex",   color: "text-purple-600",  border: "border-purple-100", bg: "bg-white"     },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border p-4 ${s.border} ${s.bg} ${s.highlight ? "ring-1 ring-emerald-400" : ""}`}
              >
                {s.highlight && (
                  <span className="mb-2 inline-block rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    Most likely
                  </span>
                )}
                <p className="text-xs font-semibold text-gray-500">{s.label}</p>
                <p className={`mt-1 text-xl font-bold ${s.color}`}>{fmt(s.value)}</p>
                <p className="mt-0.5 text-[11px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Dynamic insights */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Smart Insights
            </p>
            <ul className="space-y-3">
              {insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <p className="text-sm leading-relaxed text-gray-600">{insight}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Charts — hidden on mobile, same pattern as hourly-to-salary ── */}
      <div className="hidden sm:grid gap-6 sm:grid-cols-2">

        {/* Cost breakdown — donut pie */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <p className="mb-4 text-sm font-semibold text-white/70">
            Cost Breakdown — {fmt(result.avgCost)} average
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {breakdownData.map((entry) => (
                  <Cell key={entry.label} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: 12,
                }}
                formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`, "Cost"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-1 flex justify-center gap-5">
            {breakdownData.map((entry) => (
              <div key={entry.label} className="flex items-center gap-1.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: entry.fill }} />
                <span className="text-[11px] text-white/45">{entry.label}</span>
                <span className="text-[11px] font-semibold text-white/65">{fmt(entry.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Material comparison */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <p className="mb-4 text-sm font-semibold text-white/70">
            Material Cost Comparison — 1,500 sq ft
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={materialCompareData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                type="number"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                width={100}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: 12,
                }}
                labelStyle={{ color: "rgba(255,255,255,0.55)", marginBottom: 2 }}
                itemStyle={{ color: "#fff" }}
                formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`, "Avg Cost"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}
                activeBar={(props: Parameters<NonNullable<BarProps["activeBar"] & ((...a: unknown[]) => unknown)>>[0]) => {
                  const x = Number((props as Record<string, unknown>).x ?? 0) - 1;
                  const y = Number((props as Record<string, unknown>).y ?? 0) - 1;
                  const width = Number((props as Record<string, unknown>).width ?? 0) + 2;
                  const height = Number((props as Record<string, unknown>).height ?? 0) + 2;
                  const fill = String((props as Record<string, unknown>).fill ?? "#10b981");
                  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={5} ry={5} />;
                }}
              >
                {materialCompareData.map((entry, i) => (
                  <Cell
                    key={entry.label}
                    fill={entry.label === MATERIAL_LABELS[material] ? "#10b981" : `rgba(99,102,241,${0.5 + i * 0.15})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DisclaimerBlock />

      {/* ── Get Free Quotes lead form ──────────────────────────── */}
      <div id="get-quotes" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Free Quotes</p>
          <h3 className="mt-2 text-xl font-bold text-gray-900">
            Get quotes from trusted roofing contractors near you
          </h3>
          <p className="mt-1.5 text-sm text-gray-500">
            Your estimate: <span className="font-semibold text-emerald-700">${result.avgCost.toLocaleString()}</span> — enter your details and we&apos;ll connect you with verified local roofers.
          </p>
        </div>

        {leadStatus === "success" ? (
          <div className="rounded-xl border border-emerald-300 bg-emerald-100 px-6 py-8 text-center">
            <p className="text-lg font-bold text-emerald-800">Request received!</p>
            <p className="mt-1 text-sm text-emerald-700">
              We&apos;ll be in touch with quotes based on your {roofSize.toLocaleString()} sq ft {MATERIAL_LABELS[material].toLowerCase()} roof.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Step 1 — postcode */}
            {!showLeadForm ? (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Your postcode / ZIP code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 90210 or SW1A 1AA"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && postcode.trim()) { setShowLeadForm(true); setTimeout(() => leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); } }}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    type="button"
                    disabled={!postcode.trim()}
                    onClick={() => { setShowLeadForm(true); setTimeout(() => leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Check prices
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-400">No spam. Used only to match you with local contractors.</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm">
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

            {/* Step 2 — full form, revealed after postcode */}
            {showLeadForm && (
              <form ref={leadFormRef} onSubmit={handleSubmit(onLeadSubmit)} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="rrc-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Your name
                    </label>
                    <input
                      id="rrc-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                        errors.name
                          ? "border-red-300 focus:ring-red-100"
                          : "border-gray-200 bg-white focus:border-emerald-400 focus:ring-emerald-100"
                      }`}
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                      })}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="rrc-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="rrc-email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                        errors.email
                          ? "border-red-300 focus:ring-red-100"
                          : "border-gray-200 bg-white focus:border-emerald-400 focus:ring-emerald-100"
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                      })}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="rrc-phone" className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Phone number{" "}
                    <span className="font-normal text-gray-400">(optional — contractors can call with quotes faster)</span>
                  </label>
                  <input
                    id="rrc-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. 07700 900123"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    {...register("phone")}
                  />
                  <p className="mt-1 text-[11px] text-emerald-600 font-medium">Adding a phone number increases your chances of getting faster quotes.</p>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="rrc-timeline" className="mb-1.5 block text-xs font-semibold text-gray-700">
                    When are you planning this?
                  </label>
                  <select
                    id="rrc-timeline"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                      errors.timeline
                        ? "border-red-300 focus:ring-red-100"
                        : "border-gray-200 bg-white focus:border-emerald-400 focus:ring-emerald-100"
                    }`}
                    {...register("timeline", { required: "Please select a timeline" })}
                  >
                    <option value="">Select a timeline…</option>
                    <option value="researching">Just researching</option>
                    <option value="within-6-months">Within 6 months</option>
                    <option value="urgent">Urgent (leaking / failing)</option>
                  </select>
                  {errors.timeline && <p className="mt-1 text-xs text-red-500">{errors.timeline.message}</p>}
                </div>

                {/* Address (optional) */}
                <div>
                  <label htmlFor="rrc-address" className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Street address{" "}
                    <span className="font-normal text-gray-400">(optional — helps contractors quote accurately)</span>
                  </label>
                  <input
                    id="rrc-address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="123 Main St"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    {...register("address_line")}
                  />
                </div>

                {/* Required consent */}
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id="rrc-consent"
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-emerald-600"
                      {...register("consent", {
                        required: "You must agree to continue",
                        validate: (v) => v === true || "You must agree to continue",
                      })}
                    />
                    <label htmlFor="rrc-consent" className="text-xs leading-relaxed text-gray-500">
                      I agree to the{" "}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Terms</a>
                      {" "}and{" "}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Privacy Policy</a>
                      . I consent to my name, email, and calculator inputs (roof size, material, condition, and estimated cost) being stored and shared with relevant roofing contractors so they can provide accurate quotes. I understand that all results are estimates only and do not constitute professional advice.{" "}
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
                  className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
                >
                  {leadStatus === "loading" ? "Sending…" : "Get free quotes →"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
