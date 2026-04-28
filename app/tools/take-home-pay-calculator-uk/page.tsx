import type { Metadata } from "next";
import RelatedTools from "@/components/RelatedTools";
import TakeHomePayCalculator from "../take-home-pay-calculator/TakeHomePayCalculatorLoader";
import LocaleSetter from "@/components/LocaleSetter";
import RegionToggle from "@/components/RegionToggle";

export const metadata: Metadata = {
  title: "Take Home Pay Calculator UK | PAYE & NI | Worthulator",
  description:
    "Calculate your UK take-home pay after income tax and National Insurance. See your net salary broken down by year, month, and week in pounds.",
  keywords: [
    "take home pay calculator UK",
    "UK net salary calculator",
    "PAYE calculator",
    "national insurance calculator",
    "UK income tax calculator",
    "net pay after tax UK",
  ],
  alternates: { canonical: "https://worthulator.com/tools/take-home-pay-calculator-uk" },
  robots: { index: true, follow: true },
};

export default function TakeHomePayUKPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Take Home Pay Calculator UK",
    description:
      "Calculate your UK take-home pay after PAYE income tax and National Insurance contributions.",
    url: "https://worthulator.com/tools/take-home-pay-calculator-uk",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  };

  return (
    <>
      {/* Forces locale to UK so the calculator switches to UK mode (PAYE/NI + £) */}
      <LocaleSetter locale="UK" />

      <main className="bg-white text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-gray-100 bg-white px-5 py-14 sm:px-8 sm:py-24 lg:px-16">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-50/80 blur-[80px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gray-100/60 blur-3xl" />

          <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            {/* Left — copy */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                🇬🇧 United Kingdom · Income Tools
              </p>
              <h1 className="mt-4 text-[clamp(2.4rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-gray-950">
                Take Home Pay Calculator UK
                <span className="mt-1 block font-semibold text-gray-400">
                  PAYE, National Insurance &amp; more.
                </span>
              </h1>
              <p className="mt-2 text-sm font-semibold tracking-tight text-emerald-600">
                See your net UK salary after tax and NI in seconds.
              </p>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-gray-500">
                Enter your gross annual salary to instantly see your take-home pay after PAYE
                income tax and National Insurance contributions — broken down by year, month, and
                week.
              </p>

              <RegionToggle
                current="uk"
                usPath="/tools/take-home-pay-calculator"
                ukPath="/tools/take-home-pay-calculator-uk"
                theme="light"
              />
            </div>

            {/* Right — preview stat card */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gray-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
                <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                  Example &middot; £35,000 salary
                </p>
                <p className="relative mt-3 text-5xl font-bold tracking-[-0.04em] text-emerald-400 [text-shadow:0_0_20px_rgba(52,211,153,0.28)]">
                  £27,486
                </p>
                <p className="relative mt-1 text-sm text-gray-500">estimated take-home per year</p>
                <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-white/8">
                  <div className="h-full bg-emerald-400" style={{ width: "79%" }} />
                  <div className="h-full bg-red-400" style={{ width: "12%" }} />
                  <div className="h-full flex-1 bg-orange-300" />
                </div>
                <div className="mt-3 flex gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Take-home
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    Income Tax
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-orange-300" />
                    NI
                  </span>
                </div>
                <p className="mt-5 text-xs text-gray-500">
                  79% of gross &mdash; adjust below to see yours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="bg-white px-5 py-12 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {[
                {
                  stat: "£12,570",
                  color: "text-emerald-600",
                  label:
                    "personal allowance for 2025/26 — earnings below this threshold are tax-free",
                },
                {
                  stat: "20%",
                  color: "text-red-500",
                  label:
                    "basic rate income tax on earnings between £12,571 and £50,270 under PAYE",
                },
                {
                  stat: "8%",
                  color: "text-amber-500",
                  label:
                    "National Insurance (Class 1) on earnings between £12,570 and £50,270 per year",
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
            </div>
            <TakeHomePayCalculator />
          </div>
        </section>

        {/* INSIGHT STRIP */}
        <div className="bg-gray-50 px-5 py-5 sm:px-8 lg:px-16">
          <p className="mx-auto max-w-5xl text-sm font-medium text-gray-500">
            Most UK workers take home between{" "}
            <span className="font-semibold text-gray-800">75–85% of their gross salary</span> —
            lower earners keep more because of the personal allowance; higher earners less due to
            the 40% tax band.
          </p>
        </div>

        {/* WHAT THIS MEANS */}
        <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">
              How UK take-home pay works
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
              Your UK take-home pay is your gross salary minus PAYE income tax and National
              Insurance contributions (NICs). Both are collected automatically by your employer
              through the HMRC payroll system.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: "💷",
                  title: "Personal allowance",
                  body: "Everyone gets a £12,570 tax-free personal allowance (2025/26). You only pay income tax on earnings above this — so your first £12,570 costs you nothing.",
                },
                {
                  icon: "📊",
                  title: "PAYE income tax bands",
                  body: "Basic rate (20%) applies to £12,571–£50,270. Higher rate (40%) applies to £50,271–£125,140. Additional rate (45%) applies above £125,140.",
                },
                {
                  icon: "🧾",
                  title: "National Insurance",
                  body: "Class 1 NI is 8% on earnings between £12,570 and £50,270, then 2% above. Unlike income tax, NI has no personal allowance — you pay from your first pound over the threshold.",
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

        {/* SEO CONTENT */}
        <section className="border-t border-gray-100 bg-white px-5 py-14 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-8 text-gray-600">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                What is take-home pay in the UK?
              </h2>
              <p className="mt-4 leading-[1.85] text-gray-600">
                Take-home pay — also called net pay — is the amount your employer pays into your
                bank account after PAYE income tax and National Insurance have been deducted from
                your gross salary. It&apos;s the money you actually have available to spend, save,
                or invest.
              </p>
              <p className="mt-4 leading-7">
                For most UK workers on a standard salary, take-home pay is between 75% and 85% of
                gross pay. Higher earners (over £50,270) see a bigger gap because they enter the
                40% income tax band. Earners above £100,000 also start to lose their personal
                allowance, making the effective rate even higher.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                Does the personal allowance affect my take-home?
              </h2>
              <p className="mt-4 leading-[1.85] text-gray-600">
                Yes — significantly. The £12,570 personal allowance means your first £12,570 of
                earnings is completely tax-free. This is automatically applied under PAYE. However,
                if your income exceeds £100,000, HMRC begins reducing your personal allowance by
                £1 for every £2 earned above that threshold — effectively creating a 60% marginal
                rate between £100,000 and £125,140.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                What about pension contributions?
              </h2>
              <p className="mt-4 leading-[1.85] text-gray-600">
                Workplace pension contributions under auto-enrolment reduce your taxable pay,
                which means you pay less income tax and NI on that portion of your earnings.
                This calculator shows gross-to-net before pension contributions. For a precise
                figure, subtract your pension contribution percentage from your salary first, then
                use this tool.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Important
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Estimates only. This tool does not account for personal tax codes, student loan
                repayments (Plan 1/2/4/5), pension contributions, benefits-in-kind, or other
                deductions. It is not financial or tax advice. Always check your payslip and
                consult HMRC or a qualified accountant for accurate figures.
              </p>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  {
                    q: "How is UK take-home pay calculated?",
                    a: "Your gross salary is reduced by PAYE income tax (applied after your personal allowance) and Class 1 National Insurance contributions. What remains is your net take-home pay.",
                  },
                  {
                    q: "Why does my payslip show a different amount?",
                    a: "Real payslips reflect your personal tax code, pension deductions, student loan repayments, benefits-in-kind, and other employer-specific items. Use this tool for ballpark planning, not exact figures.",
                  },
                  {
                    q: "What tax code is this calculator based on?",
                    a: "This calculator assumes the standard 1257L tax code, which gives you the full £12,570 personal allowance. If your tax code is different, your actual take-home may vary.",
                  },
                  {
                    q: "Does Scotland have different income tax rates?",
                    a: "Yes — Scotland has its own income tax bands set by the Scottish Government, which differ from the rest of the UK. This calculator uses the standard England/Wales/Northern Ireland PAYE rates.",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-gray-900">
                      {item.q}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RELATED TOOLS */}
        <RelatedTools currentTool="take-home-pay-calculator" bg="bg-gray-50" />
      </main>
    </>
  );
}
