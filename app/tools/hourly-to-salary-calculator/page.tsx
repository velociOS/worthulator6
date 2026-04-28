import type { Metadata } from "next";
import RelatedTools from "@/components/RelatedTools";
import HourlyToSalaryCalculator from "./HourlyToSalaryCalculator";
import SimpleCalculatorShell from "@/components/calculators/SimpleCalculatorShell";

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator | Worthulator",
  description:
    "Convert your hourly rate to an annual salary instantly. See your monthly, weekly, and daily income based on your hours and weeks worked.",
  alternates: { canonical: "https://worthulator.com/tools/hourly-to-salary-calculator" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hourly to Salary Calculator",
  description:
    "Convert your hourly rate to an annual salary instantly. See your monthly, weekly, and daily income based on your hours and weeks worked.",
  url: "https://worthulator.com/tools/hourly-to-salary-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const heroCard = (
  <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gray-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
    <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Example &middot; $25/hr &middot; 40 hrs/wk</p>
    <p className="relative mt-3 text-5xl font-bold tracking-[-0.04em] text-emerald-400 [text-shadow:0_0_20px_rgba(52,211,153,0.28)]">$52,000</p>
    <p className="relative mt-1 text-sm text-gray-500">annual salary (gross)</p>
    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
      <div>
        <p className="text-lg font-bold text-emerald-400">$4,333</p>
        <p className="text-xs text-gray-500">/ month</p>
      </div>
      <div>
        <p className="text-lg font-bold text-emerald-400">$1,000</p>
        <p className="text-xs text-gray-500">/ week</p>
      </div>
      <div>
        <p className="text-lg font-bold text-emerald-400">$200</p>
        <p className="text-xs text-gray-500">/ day</p>
      </div>
    </div>
  </div>
);

const statChips = (
  <>
    {[
      { stat: "$25/hr",  color: "text-emerald-600", label: "is the approximate US median hourly wage in 2024" },
      { stat: "2,080",   color: "text-blue-500",    label: "hours in a standard full-time working year (40 hrs × 52 wks)" },
      { stat: "5 secs",  color: "text-orange-500",  label: "to convert any hourly rate to an annual salary with this tool" },
    ].map((item) => (
      <div key={item.stat} className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
        <p className={`text-3xl font-bold tracking-tight transition-transform duration-200 group-hover:scale-105 ${item.color}`}>{item.stat}</p>
        <p className="mt-1.5 text-xs leading-5 text-gray-500">{item.label}</p>
      </div>
    ))}
  </>
);

export default function HourlyToSalaryPage() {
  return (
    <SimpleCalculatorShell
      jsonLd={jsonLd}
      title="Hourly to Salary Calculator"
      subtitle="know what your time is worth."
      description="Enter your hourly rate and working hours to instantly see your annual salary, monthly income, and daily pay."
      heroCard={heroCard}
      statChips={statChips}
      calculator={<HourlyToSalaryCalculator />}
      insightText={
        <>
          A standard full-time year is{" "}
          <span className="font-semibold text-gray-800">2,080 hours</span>{" "}
          (40 hrs × 52 weeks). Adjust weeks worked to account for vacation or part-time hours.
        </>
      }
    >

      {/* EXPLAINER */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">How the conversion works</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
            Converting hourly to salary is straightforward. The formula is: <span className="font-semibold text-gray-700">hourly rate × hours per week × weeks per year</span>.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🕐",
                title: "Hours matter",
                body: "Working 35 hours instead of 40 reduces your annual salary by 12.5%. Part-time or reduced hours make a significant difference to your yearly total.",
              },
              {
                icon: "📅",
                title: "Weeks worked",
                body: "Most people work fewer than 52 weeks once vacation is factored in. Reduce weeks to get a more accurate picture of your actual annual earnings.",
              },
              {
                icon: "💡",
                title: "Gross only",
                body: "This calculator shows your gross salary before tax. Use our Take Home Pay Calculator to see what actually lands in your bank account.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO + FAQ */}
      <section className="border-t border-gray-100 bg-white px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Hourly rate vs annual salary</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              Many job offers quote either an hourly rate or an annual salary, not both. This makes direct comparison difficult. Converting hourly to annual is the quickest way to compare offers on equal footing.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              A standard full-time year is 2,080 hours (40h × 52 weeks). Part-time roles, seasonal contracts, or jobs with regular overtime will have a different effective annual value — adjust weeks and hours accordingly.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">This is a gross estimate</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              The figure shown is gross — before income tax, Social Security, Medicare, or any other deductions. Your actual take-home will be lower. Use the{" "}
              <a href="/tools/take-home-pay-calculator" className="font-semibold text-gray-700 underline underline-offset-2 hover:text-emerald-700">Take Home Pay Calculator</a>{" "}
              to see your net income based on your state and filing status.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Important</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Results are estimates only. This tool does not account for overtime, bonuses, taxes, benefits, or unpaid leave. Not financial advice.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "How do I convert an hourly rate to an annual salary?",
                  a: "Multiply your hourly rate by your weekly hours, then multiply by the number of weeks you work per year. At $25/hr, 40 hours/week, 52 weeks: $25 × 40 × 52 = $52,000/year.",
                },
                {
                  q: "What is a full-time annual salary based on $25/hour?",
                  a: "At the standard 40 hours/week and 52 weeks/year, $25/hr equals $52,000 per year gross. Adjust weeks worked to account for vacation or unpaid time off.",
                },
                {
                  q: "Does this include tax?",
                  a: "No — the figure shown is your gross annual salary before any deductions. Use the Take Home Pay Calculator to estimate your after-tax income.",
                },
                {
                  q: "How do I compare a day rate to an hourly rate?",
                  a: "Divide your day rate by the number of hours in your working day. For example, a $200/day rate on an 8-hour day equals $25/hr. Then use this tool to convert that hourly rate to an annual figure.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED TOOLS */}
      <RelatedTools currentTool="hourly-to-salary-calculator" />

    </SimpleCalculatorShell>
  );
}
