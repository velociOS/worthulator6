import type { Metadata } from "next";
import RelatedTools from "@/components/RelatedTools";
import HourlyToSalaryCalculator from "../hourly-to-salary-calculator/HourlyToSalaryCalculatorLoader";
import SimpleCalculatorShell from "@/components/calculators/SimpleCalculatorShell";
import LocaleSetter from "@/components/LocaleSetter";
import RegionToggle from "@/components/RegionToggle";

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator UK | Worthulator",
  description:
    "Convert your hourly rate to an annual salary in pounds (£). See your monthly, weekly, and daily income based on your hours and weeks worked. UK version.",
  keywords: [
    "hourly to salary calculator UK",
    "hourly rate to annual salary UK",
    "convert hourly wage to yearly UK",
    "contractor day rate to salary UK",
    "hourly pay annual equivalent UK",
  ],
  alternates: { canonical: "https://worthulator.com/tools/hourly-to-salary-calculator-uk" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hourly to Salary Calculator UK",
  description:
    "Convert your hourly rate to an annual salary in pounds. See your monthly, weekly, and daily income. UK version.",
  url: "https://worthulator.com/tools/hourly-to-salary-calculator-uk",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const heroCard = (
  <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gray-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
    <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
      Example &middot; £15/hr &middot; 37.5 hrs/wk
    </p>
    <p className="relative mt-3 text-5xl font-bold tracking-[-0.04em] text-emerald-400 [text-shadow:0_0_20px_rgba(52,211,153,0.28)]">
      £29,250
    </p>
    <p className="relative mt-1 text-sm text-gray-500">annual salary (gross)</p>
    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
      <div>
        <p className="text-lg font-bold text-emerald-400">£2,438</p>
        <p className="text-xs text-gray-500">/ month</p>
      </div>
      <div>
        <p className="text-lg font-bold text-emerald-400">£563</p>
        <p className="text-xs text-gray-500">/ week</p>
      </div>
      <div>
        <p className="text-lg font-bold text-emerald-400">£113</p>
        <p className="text-xs text-gray-500">/ day</p>
      </div>
    </div>
  </div>
);

const statChips = (
  <>
    {[
      {
        stat: "£15/hr",
        color: "text-emerald-600",
        label: "is approximately the UK median hourly wage for full-time workers in 2024",
      },
      {
        stat: "1,950",
        color: "text-blue-500",
        label: "hours in a standard full-time UK working year (37.5 hrs × 52 weeks)",
      },
      {
        stat: "5 secs",
        color: "text-orange-500",
        label: "to convert any hourly rate to an annual salary with this tool",
      },
    ].map((item) => (
      <div
        key={item.stat}
        className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
      >
        <p
          className={`text-3xl font-bold tracking-tight transition-transform duration-200 group-hover:scale-105 ${item.color}`}
        >
          {item.stat}
        </p>
        <p className="mt-1.5 text-xs leading-5 text-gray-500">{item.label}</p>
      </div>
    ))}
  </>
);

export default function HourlyToSalaryUKPage() {
  return (
    <>
      {/* Forces locale to UK so the calculator displays £ */}
      <LocaleSetter locale="UK" />

      <SimpleCalculatorShell
        jsonLd={jsonLd}
        category="🇬🇧 United Kingdom · Income Tools"
        title="Hourly to Salary Calculator UK"
        subtitle="know what your time is worth in pounds."
        description={
          <>
            <p>
              Enter your hourly rate and working hours to instantly see your annual salary,
              monthly income, and daily pay — displayed in GBP (£).
            </p>
            <RegionToggle
              current="uk"
              usPath="/tools/hourly-to-salary-calculator"
              ukPath="/tools/hourly-to-salary-calculator-uk"
              theme="light"
            />
          </>
        }
        heroCard={heroCard}
        statChips={statChips}
        calculator={<HourlyToSalaryCalculator />}
        insightText={
          <>
            A standard full-time UK working year is{" "}
            <span className="font-semibold text-gray-800">1,950 hours</span>{" "}
            (37.5 hrs × 52 weeks). Adjust hours and weeks to match your contract.
          </>
        }
      >
        {/* EXPLAINER */}
        <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">
              How the hourly to salary conversion works in the UK
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
              The formula is the same worldwide:{" "}
              <span className="font-semibold text-gray-700">
                hourly rate × hours per week × weeks per year
              </span>
              . In the UK, standard full-time contracts are typically 37.5 hours per week, which
              gives a working year of 1,950 hours — slightly shorter than the US standard of 2,080.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: "🕐",
                  title: "UK standard hours",
                  body: "Most UK full-time contracts are 37.5 hrs/week, not 40. Using 40 hours will overestimate your annual salary. Adjust the slider to match your contract.",
                },
                {
                  icon: "📅",
                  title: "Holiday entitlement",
                  body: "UK workers are entitled to at least 28 days of paid holiday. Reducing weeks worked to around 47–48 reflects typical paid-holiday adjusted earnings.",
                },
                {
                  icon: "💡",
                  title: "Gross figures only",
                  body: "This calculator shows your gross salary before tax and National Insurance. Use our Take Home Pay Calculator to see what lands in your account.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-500">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UK-SPECIFIC CONTEXT */}
        <section className="border-t border-gray-100 bg-white px-5 py-14 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">
              UK hourly pay facts
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "National Living Wage (2025/26)",
                  body: "The UK National Living Wage for workers aged 21+ is £12.21 per hour as of April 2025. This converts to approximately £23,800 annually at 37.5 hrs/week.",
                },
                {
                  title: "Contractor day rates",
                  body: "To convert a day rate to hourly, divide by your contracted hours per day (usually 7.5 or 8). A £300/day rate at 7.5 hrs = £40/hr, or roughly £78,000 per year.",
                },
                {
                  title: "Zero-hours contracts",
                  body: "On a zero-hours contract, reduce the weeks-per-year slider to reflect your actual average working weeks rather than assuming 52.",
                },
                {
                  title: "Part-time workers",
                  body: "If you work part-time (e.g. 20 hrs/week), the calculator still works — just enter your actual contracted hours. Your annualised salary will reflect those hours.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-5"
                >
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools currentTool="hourly-to-salary-calculator" />

        {/* FAQ */}
        <section className="border-t border-gray-100 bg-white px-5 py-14 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "How do I calculate my annual salary from an hourly rate in the UK?",
                  a: "Multiply your hourly rate by your hours per week, then multiply by your weeks worked per year. The standard full-time formula is: hourly rate × 37.5 hours × 52 weeks = £72,800 for a £37.44/hr rate. Adjust the weeks figure to account for unpaid holiday or part-time arrangements.",
                },
                {
                  q: "What is the standard UK working week for salary calculations?",
                  a: "Most UK full-time contracts specify 37.5 hours per week, although some industries (including healthcare and retail) use 40 hours. Your employment contract will specify your contracted hours. Use the hours figure from your contract for an accurate conversion.",
                },
                {
                  q: "Does holiday entitlement affect my annual salary?",
                  a: "No — holiday pay is part of your salary, not in addition to it. Your annual salary already includes the pay you receive during the UK’s statutory minimum of 28 days (5.6 weeks) paid holiday. If you are paid hourly for actual hours worked only, deduct your holiday weeks from the total to get a more accurate gross figure.",
                },
                {
                  q: "What is the UK National Living Wage 2025/26?",
                  a: "The National Living Wage (for workers aged 21 and over) is £12.21 per hour from April 2025. At 37.5 hours per week and 52 weeks per year, that equals £23,810 per year gross. The National Minimum Wage for 18-20 year olds is £10.00/hr.",
                },
                {
                  q: "Is this calculator showing gross or net (take-home) salary?",
                  a: "This calculator shows gross salary only — before income tax, National Insurance, and pension deductions. To see your estimated take-home pay, use our Take Home Pay Calculator UK.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SimpleCalculatorShell>
    </>
  );
}
