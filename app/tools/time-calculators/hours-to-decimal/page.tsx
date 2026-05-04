import type { Metadata } from "next";
import Link from "next/link";
import HoursToDecimalLoader from "./HoursToDecimalLoader";

export const metadata: Metadata = {
  title: "Hours to Decimal Calculator (Convert Time Instantly)",
  description:
    "Convert hours and minutes into decimal hours instantly. Perfect for timesheets, payroll, and billing.",
  keywords: [
    "hours to decimal calculator",
    "hour to decimal calculator",
    "calculate hours to decimals",
    "decimal to hours calculator",
    "convert time to decimal",
    "timesheet decimal calculator",
    "minutes to decimal hours",
  ],
  alternates: {
    canonical: "https://www.worthulator.com/tools/time-calculators/hours-to-decimal",
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hours to Decimal Calculator",
    description:
      "Convert hours and minutes into decimal hours instantly for timesheets, payroll, and billing.",
    url: "https://www.worthulator.com/tools/time-calculators/hours-to-decimal",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is 45 minutes in decimal hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "45 minutes equals 0.75 decimal hours. To work this out: 45 ÷ 60 = 0.75. So 1 hour 45 minutes would be 1.75.",
        },
      },
      {
        "@type": "Question",
        name: "How do you convert time to decimal hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divide the minutes by 60 and add the result to the hours. For example, 2 hours 30 minutes: 30 ÷ 60 = 0.5, so 2 + 0.5 = 2.5 decimal hours.",
        },
      },
      {
        "@type": "Question",
        name: "Why use decimal hours for payroll?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Payroll systems and billing software multiply hours worked by an hourly rate. Decimal hours make this multiplication straightforward — 1.5 hours × $20/hr = $30. Time in HH:MM format can't be multiplied directly.",
        },
      },
    ],
  },
];

export default function HoursToDecimalPage() {
  return (
    <main className="bg-white text-gray-900">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white px-5 py-14 sm:px-8 sm:py-24 lg:px-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-emerald-50/80 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gray-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">

          {/* Left — copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
              Time Tools
            </p>
            <h1 className="mt-4 text-[clamp(2.4rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-gray-950">
              Hours to Decimal Calculator
              <span className="mt-1 block text-xl font-semibold text-gray-400">
                Work out time instantly — convert hours and minutes into decimal hours in seconds.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-500">
              Enter your hours and minutes below and instantly see the decimal equivalent.
              Perfect for timesheets, payroll, freelance billing, and project tracking.
            </p>
          </div>

          {/* Right — preview card */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gray-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                Example &middot; 7 hours 30 minutes
              </p>
              <p className="relative mt-3 text-6xl font-bold tracking-[-0.04em] text-emerald-400 [text-shadow:0_0_20px_rgba(52,211,153,0.28)]">
                7.50
              </p>
              <p className="relative mt-1 text-sm text-gray-500">decimal hours</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { t: "1:30", d: "1.50" },
                  { t: "2:45", d: "2.75" },
                  { t: "7:15", d: "7.25" },
                ].map((ex) => (
                  <div key={ex.t} className="rounded-xl bg-white/6 p-2">
                    <p className="text-sm font-bold text-white">{ex.d}</p>
                    <p className="text-xs text-gray-500">{ex.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STAT CHIPS ──────────────────────────────────────── */}
      <section className="bg-white px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {[
              { stat: "÷ 60",   color: "text-emerald-600", label: "is all you need — divide minutes by 60 and add to your hours" },
              { stat: "0.75",   color: "text-blue-500",    label: "is what 45 minutes looks like in decimal — the most common conversion" },
              { stat: "2 secs", color: "text-gray-700",    label: "to get your decimal hours — no maths required" },
            ].map((item) => (
              <div key={item.stat} className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
                <p className={`text-3xl font-bold tracking-tight transition-transform duration-200 group-hover:scale-105 ${item.color}`}>{item.stat}</p>
                <p className="mt-1.5 text-xs leading-5 text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>

          {/* CALCULATOR */}
          <HoursToDecimalLoader />

          <p className="mt-4 text-xs leading-5 text-gray-400">
            Decimal hours are rounded to 2 decimal places. Results update live as you type.
          </p>
        </div>
      </section>

      {/* ── INSIGHT STRIP ───────────────────────────────────── */}
      <div className="bg-gray-50 px-5 py-5 sm:px-8 lg:px-16">
        <p className="mx-auto max-w-5xl text-sm font-medium text-gray-500">
          Divide minutes by 60 and add to hours.{" "}
          <span className="font-semibold text-gray-800">That&rsquo;s all there is to it.</span>
        </p>
      </div>

      {/* ── QUICK EXAMPLES ──────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-12 md:py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Quick examples</h2>
          <p className="mt-2 text-base text-gray-500">Common time conversions at a glance.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { time: "1:15", decimal: "1.25", calc: "15 ÷ 60 = 0.25" },
              { time: "1:30", decimal: "1.50", calc: "30 ÷ 60 = 0.50" },
              { time: "2:45", decimal: "2.75", calc: "45 ÷ 60 = 0.75" },
              { time: "4:20", decimal: "4.33", calc: "20 ÷ 60 = 0.33" },
              { time: "7:15", decimal: "7.25", calc: "15 ÷ 60 = 0.25" },
              { time: "8:00", decimal: "8.00", calc: "0 ÷ 60 = 0.00"  },
            ].map((ex) => (
              <div key={ex.time} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-bold text-gray-900">{ex.decimal}</p>
                <p className="mt-0.5 text-sm text-gray-500">{ex.time} &rarr; {ex.decimal}</p>
                <p className="mt-2 font-mono text-xs text-gray-400">{ex.calc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMON CONVERSIONS TABLE ─────────────────────────── */}
      <section className="border-t border-gray-100 px-5 py-12 md:py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Minutes to decimal conversion table</h2>
          <p className="mt-2 text-base text-gray-500">
            Every 5-minute increment from 5 to 60 minutes, converted to decimal.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Minutes</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Decimal hours</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden sm:table-cell">Calculation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[5,10,15,20,25,30,35,40,45,50,55,60].map((m) => (
                  <tr key={m} className="bg-white">
                    <td className="px-5 py-3 font-medium text-gray-800">{m} min</td>
                    <td className="px-5 py-3 font-bold text-emerald-600">{(m / 60).toFixed(2)}</td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-400 hidden sm:table-cell">{m} ÷ 60 = {(m / 60).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-12 md:py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">How it works</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-500">
            Divide minutes by 60 and add to hours.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "⏱️", title: "Take your hours",   body: "Start with the whole number of hours. 3 hours is simply 3.00 in decimal." },
              { icon: "➗", title: "Divide the minutes", body: "Divide your minutes by 60. 30 minutes → 30 ÷ 60 = 0.50. 45 minutes → 0.75." },
              { icon: "➕", title: "Add them together",  body: "Add both numbers. 3 hours 30 minutes = 3 + 0.50 = 3.50 decimal hours." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY USE DECIMAL HOURS ───────────────────────────── */}
      <section className="border-t border-gray-100 bg-white px-5 py-12 md:py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Why use decimal hours?</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
            Payroll and billing systems multiply hours worked by an hourly rate. That multiplication
            only works cleanly with decimal numbers, not HH:MM format.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: "💼", title: "Timesheets",  body: "Most timesheet and payroll software — including Xero, QuickBooks, and Gusto — expect hours entered as decimals. 1h 45m should be entered as 1.75." },
              { icon: "🧾", title: "Billing",     body: "Freelancers and consultants who bill by the hour need decimal hours to calculate invoice totals. 2h 20m × $120/hr = 2.33 × $120 = $280." },
              { icon: "📊", title: "Spreadsheets", body: "Excel, Google Sheets, and other tools handle decimal hours natively. Summing decimal columns is instant — HH:MM requires special formulas." },
              { icon: "⏰", title: "Overtime",    body: "Overtime calculations compare total hours worked against thresholds. Converting to decimal first makes the comparison and calculation straightforward." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <span className="mt-0.5 text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-12 md:py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {[
              {
                q: "What is 45 minutes in decimal hours?",
                a: "45 minutes is 0.75 decimal hours. Divide 45 by 60 to get 0.75. So 1 hour 45 minutes = 1.75, and 2 hours 45 minutes = 2.75.",
              },
              {
                q: "How do you convert time to decimal hours?",
                a: "Divide the minutes by 60 and add to the hours. For example: 3 hours 20 minutes → 20 ÷ 60 = 0.333 → 3 + 0.333 = 3.33 decimal hours.",
              },
              {
                q: "Why use decimal hours for payroll?",
                a: "Payroll systems multiply hours by an hourly rate to calculate pay. This only works with decimal numbers. 1h 30m can't be directly multiplied — 1.5 can. Most payroll software expects decimal input.",
              },
              {
                q: "What is 30 minutes in decimal?",
                a: "30 minutes = 0.50 decimal hours. 30 ÷ 60 = 0.5. So 2 hours 30 minutes = 2.50 decimal hours.",
              },
              {
                q: "How many decimal hours is 15 minutes?",
                a: "15 minutes = 0.25 decimal hours. 15 ÷ 60 = 0.25. Quarter-hour increments are very common in billing: 0.25, 0.50, 0.75, 1.00.",
              },
              {
                q: "Can I convert decimal hours back to minutes?",
                a: "Yes — multiply the decimal part by 60. For example: 2.75 hours → 0.75 × 60 = 45 minutes → 2 hours 45 minutes. Use our decimal-to-hours calculator for this.",
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-800">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-white px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm leading-relaxed text-gray-400">
            Results are rounded to 2 decimal places. For payroll or legal purposes,
            verify calculations with your employer or payroll provider.
          </p>
        </div>
      </section>

      {/* ── RELATED TOOLS ───────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-bold text-gray-900">Related Time Calculators</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Decimal to Hours",       href: "/tools/time-calculators/decimal-to-hours",       note: "Convert decimal back to HH:MM" },
              { label: "Timesheet Calculator",   href: "/tools/time-calculators/timesheet-calculator",   note: "Total up a full week of hours" },
              { label: "Overtime Pay Calculator", href: "/tools/overtime-pay-calculator",                  note: "Work out your overtime earnings" },
              { label: "Hourly to Salary",        href: "/tools/hourly-to-salary-calculator",             note: "Convert your hourly rate to annual" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <p className="text-sm font-bold text-gray-900">{tool.label}</p>
                <p className="mt-1 text-xs text-gray-500">{tool.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
