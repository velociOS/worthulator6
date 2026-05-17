import type { Metadata } from "next";
import RelatedTools from "@/components/RelatedTools";
import PercentageIncreaseCalculator from "@/components/calculators/PercentageIncreaseCalculator";
import InsightTable from "@/components/insights/InsightTable";

export const metadata: Metadata = {
  title: "Percentage Increase Calculator – Calculate % Change Instantly",
  description:
    "Calculate percentage increase, decrease, difference, and reverse percentages instantly. Includes salary, price, and stock change examples. Free and interactive.",
  keywords: [
    "percentage calculator",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percentage difference",
    "reverse percentage",
    "how to calculate percentage change",
    "percent increase formula",
  ],
  alternates: { canonical: "https://worthulator.com/tools/percentage-increase-calculator" },
  robots: { index: true, follow: true },
};

export default function PercentageIncreaseCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Percentage Increase Calculator",
      description: "Calculate percentage increase, decrease, difference, and reverse percentages instantly.",
      url: "https://worthulator.com/tools/percentage-increase-calculator",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I calculate a percentage increase?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To calculate a percentage increase: New value = Original × (1 + percentage ÷ 100). For example, a 15% increase on 100 = 100 × 1.15 = 115.",
          },
        },
        {
          "@type": "Question",
          name: "How do I work out percentage difference between two numbers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Percentage difference = (B − A) ÷ A × 100. If A = 80 and B = 100, the percentage change is (100 − 80) ÷ 80 × 100 = 25%.",
          },
        },
        {
          "@type": "Question",
          name: "What is reverse percentage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Reverse percentage lets you find the original value before a percentage change was applied. Formula: Original = Final ÷ (1 + percentage ÷ 100). Useful when you know the sale price and discount % and want the original price.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate a percentage decrease?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To calculate a percentage decrease: New value = Original × (1 − percentage ÷ 100). For example, a 20% decrease on 200 = 200 × 0.80 = 160.",
          },
        },
      ],
    },
  ];

  return (
    <main className="bg-white text-gray-900">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-emerald-50/80 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gray-100/60 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
            Money · Quick Maths
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-gray-950">
            Percentage Increase Calculator
          </h1>
          <p className="mt-4 mx-auto max-w-lg text-base leading-7 text-gray-500">
            Instantly calculate percentage increases, decreases, differences, and reverse percentages.
            Click an example to load a real-world scenario, or enter your own values.
          </p>
          <ul className="mt-6 inline-flex flex-col items-start gap-2 text-left mx-auto">
            {[
              "% increase, decrease, difference & reverse modes",
              "Instant animated results as you type",
              "Click real-world scenarios to explore instantly",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-500">
                <span className="h-4 w-4 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CALCULATOR ───────────────────────────────────────────────────── */}
      <section className="bg-white px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <PercentageIncreaseCalculator />
        </div>
      </section>

      {/* ── INSIGHT STRIP ────────────────────────────────────────────────── */}
      <div className="bg-gray-50 px-5 py-5 sm:px-8 lg:px-16">
        <p className="mx-auto max-w-5xl text-sm font-medium text-gray-500">
          A{" "}
          <span className="font-semibold text-gray-800">5% salary increase</span> on £40,000
          adds £2,000 per year — but after tax, the real take-home gain is typically closer to{" "}
          <span className="font-semibold text-gray-800">£1,300–£1,500</span>.
        </p>
      </div>

      {/* ── STAT CHIPS ───────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-white px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl grid gap-3 sm:grid-cols-3">
          {[
            { stat: "1.15×",  color: "text-emerald-600", label: "is the multiplier for a 15% increase — multiply any value by 1.15 to find the result instantly" },
            { stat: "÷1.2",   color: "text-violet-600",  label: "is how you reverse a 20% increase — divide the final value by 1.2 to get the original" },
            { stat: "Rule 72",color: "text-amber-500",   label: "divide 72 by an annual % growth rate to estimate how many years it takes a value to double" },
          ].map((item) => (
            <div key={item.stat} className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
              <p className={`text-3xl font-bold tracking-tight transition-transform duration-200 group-hover:scale-105 ${item.color}`}>{item.stat}</p>
              <p className="mt-1.5 text-xs leading-5 text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW EACH MODE WORKS ──────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">How each mode works</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
            The calculator has four modes — each solves a different type of percentage problem.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "↑",
                title: "Percentage increase",
                formula: "New value = A × (1 + B ÷ 100)",
                example: "100 + 15% = 115",
                body: "Use this to find a new price after a markup, calculate a salary after a raise, or see how a value grows by a fixed percentage.",
                color: "text-emerald-600",
                bg: "bg-emerald-50 border-emerald-100",
              },
              {
                icon: "↓",
                title: "Percentage decrease",
                formula: "New value = A × (1 − B ÷ 100)",
                example: "200 − 20% = 160",
                body: "Find the sale price after a discount, calculate a value after depreciation, or see the impact of a percentage reduction.",
                color: "text-rose-500",
                bg: "bg-rose-50 border-rose-100",
              },
              {
                icon: "↔",
                title: "Percentage difference",
                formula: "% change = (B − A) ÷ A × 100",
                example: "80 → 100 = +25%",
                body: "Find how much one value has changed relative to another. Use for year-on-year comparisons, stock price changes, or revenue growth.",
                color: "text-blue-600",
                bg: "bg-blue-50 border-blue-100",
              },
              {
                icon: "⟲",
                title: "Reverse percentage",
                formula: "Original = Final ÷ (1 + B ÷ 100)",
                example: "115 after +15% → 100 original",
                body: "Work backwards from a final value to the original. Useful for finding the pre-tax price from a VAT-inclusive amount, or the original price before a discount.",
                color: "text-violet-600",
                bg: "bg-violet-50 border-violet-100",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border p-6 ${item.bg}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xl font-bold ${item.color}`}>{item.icon}</span>
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">{item.title}</h3>
                </div>
                <code className="block rounded-lg bg-white/70 px-3 py-2 text-xs font-mono text-gray-700 mb-2">{item.formula}</code>
                <p className="text-xs font-semibold text-gray-500 mb-2">e.g. {item.example}</p>
                <p className="text-sm leading-6 text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-white px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Real-world use cases</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
            Percentages appear constantly in everyday life — here are the most common situations where this calculator helps.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                emoji: "💼",
                title: "Salary negotiations",
                body: "Use % increase to calculate exactly how much a 3%, 5%, or 10% pay rise adds to your salary in real pounds or dollars.",
              },
              {
                emoji: "🏷️",
                title: "Shopping discounts",
                body: "Use % decrease to find the final sale price after any discount — no mental arithmetic needed.",
              },
              {
                emoji: "📈",
                title: "Investment returns",
                body: "Use % difference to track how much your portfolio or individual stocks have grown from purchase price to today.",
              },
              {
                emoji: "🏠",
                title: "Property values",
                body: "Compare house prices year on year — quickly find the % increase or decrease in any property value.",
              },
              {
                emoji: "🧾",
                title: "VAT & tax",
                body: "Use reverse percentage to strip VAT from an inclusive price. Divide the final price by 1.2 to remove 20% VAT.",
              },
              {
                emoji: "📊",
                title: "Business metrics",
                body: "Track revenue growth, margin changes, conversion rate shifts, and cost increases month over month.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-10 text-gray-600">

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">How to calculate a percentage increase</h2>
            <p className="mt-4 leading-[1.85]">
              A percentage increase tells you how much a value has grown relative to its original amount. The formula is straightforward: multiply the original value by <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">(1 + percentage ÷ 100)</code>.
            </p>
            <p className="mt-4 leading-[1.85]">
              For example, to find a 15% increase on 200: <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">200 × 1.15 = 230</code>. The amount added is 30, and the new value is 230. This applies equally to salary increases, price markups, or any other value that grows by a percentage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">How to calculate a percentage decrease</h2>
            <p className="mt-4 leading-[1.85]">
              A percentage decrease follows the same logic in reverse. Multiply the original by <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">(1 − percentage ÷ 100)</code>. A 20% discount on a £250 item: <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">250 × 0.80 = 200</code>.
            </p>
            <p className="mt-4 leading-[1.85]">
              This is one of the most misunderstood percentage calculations. A 20% increase followed by a 20% decrease does not return you to the original value — it leaves you slightly below, because the decrease is applied to the larger number. Use the % difference mode to check the net change.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">How reverse percentage works</h2>
            <p className="mt-4 leading-[1.85]">
              Reverse percentage is used when you know the final value after a percentage has already been applied, and you want to recover the original. The formula is: <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">Original = Final ÷ (1 + percentage ÷ 100)</code>.
            </p>
            <p className="mt-4 leading-[1.85]">
              A common example is removing VAT from a price. If an item costs £120 including 20% VAT, the pre-VAT price is <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">120 ÷ 1.20 = 100</code>. A common mistake is to simply subtract 20% from £120 — that gives £96, not the correct £100. Always divide, not subtract.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">FAQ</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  q: "What is the difference between percentage change and percentage difference?",
                  a: "Percentage change is directional — it measures change from a specific starting point (A to B). Percentage difference is often used symmetrically between two values with no defined starting point. In practice, the two are often used interchangeably to mean the same calculation.",
                },
                {
                  q: "Can I calculate a negative percentage increase?",
                  a: "Yes — entering a negative percentage in the increase mode is equivalent to a decrease. The calculator handles this correctly. Alternatively, switch to % decrease mode for clearer labelling.",
                },
                {
                  q: "How do I find what percentage one number is of another?",
                  a: "Use the % difference mode with the smaller number as A and the larger as B. The result tells you the percentage change from one to the other. To find X as a percentage of Y directly, divide X by Y and multiply by 100.",
                },
                {
                  q: "Why does a 50% increase followed by a 50% decrease not equal zero?",
                  a: "Because each percentage is applied to a different base. A 50% increase on 100 gives 150. A 50% decrease on 150 gives 75 — not 100. The net effect is a 25% loss. This is why compounding works the way it does.",
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 leading-[1.85] text-gray-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── RELATED TOOLS ────────────────────────────────────────────────── */}
            <InsightTable slug="percentage-increase-calculator" />
      <RelatedTools currentTool="percentage-increase-calculator" bg="bg-white" />
    </main>
  );
}
