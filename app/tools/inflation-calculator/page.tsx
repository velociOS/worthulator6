import type { Metadata } from "next";
import RelatedTools from "@/components/RelatedTools";
import InflationCalculatorLoader from "./InflationCalculatorLoader";

export const metadata: Metadata = {
  title: "Inflation Calculator – See How Inflation Erodes Your Purchasing Power",
  description:
    "Use our free inflation calculator to see how inflation erodes purchasing power over time. Compare historical prices, project future costs, and understand the real value of money.",
  keywords: [
    "inflation calculator",
    "purchasing power calculator",
    "inflation rate calculator",
    "cost of living calculator",
    "inflation adjusted value",
    "real value of money",
    "historical inflation calculator",
    "future cost calculator",
  ],
  alternates: { canonical: "https://worthulator.com/tools/inflation-calculator" },
  robots: { index: true, follow: true },
};

export default function InflationCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Inflation Calculator",
      description:
        "Calculate how inflation erodes purchasing power, compare historical prices, and project future costs using compound inflation rates.",
      url: "https://worthulator.com/tools/inflation-calculator",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is inflation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Inflation is the rate at which the general level of prices for goods and services rises over time, reducing the purchasing power of money. It is typically measured as an annual percentage using the Consumer Price Index (CPI).",
          },
        },
        {
          "@type": "Question",
          name: "How does inflation affect savings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If your savings account earns less interest than the inflation rate, the real value of your savings decreases over time. At 3.2% inflation, $10,000 in a zero-interest account loses roughly $320 of purchasing power per year.",
          },
        },
        {
          "@type": "Question",
          name: "What is purchasing power?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Purchasing power is the amount of goods and services a unit of currency can buy. When inflation rises, each dollar buys less — so purchasing power falls. At 3.2% annual inflation, $1,000 today has the same purchasing power as roughly $446 did in 2000.",
          },
        },
        {
          "@type": "Question",
          name: "How much inflation is normal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The US Federal Reserve targets 2% annual inflation as a healthy benchmark. The post-war US average has been around 3.2%. High single digits (7–10%) is considered significant inflation; anything above 20% annually approaches hyperinflation.",
          },
        },
        {
          "@type": "Question",
          name: "How does inflation affect retirement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Inflation is one of the biggest risks for retirees. At 3.2% inflation, $500,000 in retirement savings has less than half its current purchasing power after 22 years — meaning your nest egg must grow faster than inflation just to maintain your standard of living.",
          },
        },
        {
          "@type": "Question",
          name: "How do you calculate inflation-adjusted value?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The formula is: Real Value = Nominal Amount ÷ (1 + inflation rate)^years. For example, $10,000 over 20 years at 3.2% = $10,000 ÷ (1.032)^20 = approximately $5,330 in today's purchasing power.",
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

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white px-5 py-14 sm:px-8 sm:py-24 lg:px-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-emerald-50/80 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gray-100/60 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
              Finance Tools &middot; Purchasing Power
            </p>
            <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-gray-950">
              Inflation Calculator
              <span className="block mt-2 text-base font-medium tracking-normal text-gray-400 sm:text-lg">
                See how inflation erodes your purchasing power and understand the real value of money over time.
              </span>
            </h1>
            <p className="mt-4 mx-auto max-w-lg text-sm leading-7 text-gray-500">
              Compare historical prices, project future costs, and explore how inflation silently impacts your savings, salary, and spending.
            </p>
            <ul className="mt-6 inline-flex flex-col items-start gap-2 text-left mx-auto">
              {[
                "See your real purchasing power in any year",
                "Compare against 5 different inflation scenarios",
                "Real-world price data for coffee, rent, gas, and more",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <span className="h-4 w-4 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-white px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <InflationCalculatorLoader />
        </div>
      </section>

      {/* INSIGHT STRIP */}
      <div className="bg-gray-50 px-5 py-5 sm:px-8 lg:px-16">
        <p className="mx-auto max-w-5xl text-sm font-medium text-gray-500">
          At 3.2% average US inflation,{" "}
          <span className="font-semibold text-gray-800">purchasing power halves every 22 years</span>
          {" "}— meaning money saved today buys half as much by 2048.
        </p>
      </div>

      {/* STAT CHIPS */}
      <section className="border-t border-gray-100 bg-white px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl grid gap-3 sm:grid-cols-3">
          {[
            { stat: "3.2%",  color: "text-emerald-600", label: "is the US post-war average annual inflation rate — used as the historical benchmark" },
            { stat: "22yrs", color: "text-amber-500",   label: "is how long it takes your purchasing power to halve at the US historical average rate" },
            { stat: "$5.50", color: "text-emerald-600", label: "is what a large coffee costs today — up from about $1.50 in 2000, a 267% increase" },
          ].map((item) => (
            <div key={item.stat} className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
              <p className={`text-3xl font-bold tracking-tight transition-transform duration-200 group-hover:scale-105 ${item.color}`}>{item.stat}</p>
              <p className="mt-1.5 text-xs leading-5 text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT IS INFLATION */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">What is inflation and why does it matter?</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
            Inflation is the gradual increase in prices across an economy over time. It means each dollar buys a little less than it did last year — quietly but persistently.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "📉",
                title: "Purchasing power erosion",
                body: "As prices rise, each unit of currency buys fewer goods and services. $100 today has less real value than $100 did a decade ago.",
              },
              {
                icon: "📊",
                title: "The silent tax",
                body: "Inflation acts as a hidden tax on savers. Money held in low-interest accounts loses real value every year inflation exceeds the interest rate.",
              },
              {
                icon: "⏱️",
                title: "Compound effect",
                body: "Small inflation rates compound significantly over time. 3.2% annually doesn't sound like much — but it halves your purchasing power in about 22 years.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-gray-100 bg-white px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">How the inflation calculator works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter your amount",
                body: "Type in any dollar value — savings, a salary, a price, or any amount you want to track across time.",
              },
              {
                step: "2",
                title: "Set your time range",
                body: "Choose a start year and end year. Use historical presets like 2000 → Today, or project into the future.",
              },
              {
                step: "3",
                title: "See the full picture",
                body: "Get purchasing power breakdown, real-world price comparisons, inflation scenario charts, and planning insights.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                  {item.step}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-10 text-gray-600">

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">How inflation erodes purchasing power</h2>
            <p className="mt-4 leading-[1.85]">
              Inflation does its damage slowly. It never takes money directly from your wallet — it just quietly reduces what that money can buy. At 3.2% annually, $10,000 in 2000 only has the purchasing power of roughly $4,460 in 2026. That&apos;s not a crash or a fraud — just 26 years of ordinary inflation.
            </p>
            <p className="mt-4 leading-[1.85]">
              The mechanism is compound: inflation in year two applies to a price level already elevated by year one. This is why the long-term effects of even modest inflation are so much larger than the annual rate suggests. A 3% annual rate creates cumulative inflation of over 100% in 24 years — prices more than double.
            </p>
            <p className="mt-4 leading-[1.85]">
              The practical impact is most visible in everyday items. A cup of coffee that cost $1.50 in 2000 costs around $5.50 today — a 267% increase. Gasoline has more than doubled. Monthly rent in many US cities has tripled. These aren&apos;t anomalies; they&apos;re the visible face of long-run inflation applied to things people buy every day.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">US historical inflation rates</h2>
            <p className="mt-4 leading-[1.85]">
              The US has experienced very different inflation environments over its history. Understanding these periods helps put current inflation in context.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Period</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Avg Annual Rate</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {([
                    ["1950s–1960s", "~2%",  "Post-war stability, Bretton Woods gold standard"],
                    ["1970s",       "~7.4%","Oil shocks, breakdown of gold standard, stagflation"],
                    ["1980–1990",   "~5.1%","Volcker Fed tightening, gradual normalisation"],
                    ["1990–2020",   "~2.5%","Great Moderation — long era of low stable inflation"],
                    ["2021–2023",   "~6.3%","Post-pandemic supply chain disruption and fiscal stimulus"],
                    ["Post-war avg","~3.2%","Long-run US Consumer Price Index average"],
                  ] as [string, string, string][]).map(([period, rate, context]) => (
                    <tr key={period} className="bg-white">
                      <td className="px-5 py-3 font-semibold text-gray-800">{period}</td>
                      <td className="px-5 py-3 font-bold text-emerald-700">{rate}</td>
                      <td className="px-5 py-3 text-gray-500">{context}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 leading-[1.85]">
              The post-war average of 3.2% is commonly used as a conservative long-run planning rate. For retirement projections, many financial planners use 2.5–3% to account for the Fed&apos;s 2% target while building in a buffer for periods of higher inflation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Inflation and retirement — the critical relationship</h2>
            <p className="mt-4 leading-[1.85]">
              For retirees, inflation is arguably the most significant long-term financial risk. Unlike working-age people who may receive salary increases that partially track inflation, retirees on fixed incomes face the full force of purchasing power erosion.
            </p>
            <p className="mt-4 leading-[1.85]">
              Consider a $500,000 retirement portfolio at age 65. At 3.2% inflation, by age 87 (22 years), that portfolio needs to have grown to $1,000,000 just to maintain the same purchasing power. Many retirees are drawing down on their principal during this period — not growing it — which means their real spending power can deteriorate faster than these numbers suggest.
            </p>
            <p className="mt-4 leading-[1.85]">
              This is why financial advisors commonly recommend holding inflation-hedging assets in retirement portfolios: equities, real estate, Treasury Inflation-Protected Securities (TIPS), and commodities. The goal isn&apos;t just capital preservation — it&apos;s purchasing power preservation. These are not the same thing in an inflationary environment.
            </p>
            <p className="mt-4 leading-[1.85]">
              Social Security does include a Cost of Living Adjustment (COLA) linked to CPI, which provides some protection. But the COLA often lags actual experienced inflation for retirees, who spend more on healthcare (which inflates faster than general CPI) and less on items like electronics (which deflate). For most retirees, Social Security alone cannot fully offset inflation risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Inflation vs salary growth — are you keeping up?</h2>
            <p className="mt-4 leading-[1.85]">
              A salary increase only improves your standard of living if it exceeds the inflation rate. A 3% raise in a 3.2% inflation year is actually a 0.2% real pay cut. This distinction between nominal (face value) and real (inflation-adjusted) changes is one of the most practically important concepts in personal finance — and one that most people rarely consider.
            </p>
            <p className="mt-4 leading-[1.85]">
              Median US wages have grown at roughly 3–4% annually over the past two decades, which has broadly kept pace with inflation for most workers. However, wages at the lower end of the distribution have grown more slowly, and for these workers, inflation has represented a genuine decline in real purchasing power. Meanwhile, asset prices — particularly housing and equities — have often outpaced both wages and inflation significantly.
            </p>
            <p className="mt-4 leading-[1.85]">
              To determine whether you&apos;re keeping up with inflation, compare your pay growth over time to CPI changes for the same period. A $60,000 salary in 2010 required a salary of approximately $83,000 in 2024 just to maintain equivalent purchasing power — a 38% increase. Workers who have not reached that threshold have experienced a real decline in living standards, even if their nominal salary has risen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Investing to beat inflation</h2>
            <p className="mt-4 leading-[1.85]">
              Inflation sets the minimum return threshold for any investment to be worthwhile in real terms. If inflation is 3.2% and a savings account pays 2%, you are losing 1.2% per year in real purchasing power — even as your nominal balance grows. This is why &ldquo;keeping money safe in cash&rdquo; is itself a risky strategy over long time horizons.
            </p>
            <p className="mt-4 leading-[1.85]">
              Historically, the US stock market (S&P 500) has returned approximately 10% annually in nominal terms. After 3.2% average inflation, the real return is approximately 6.8% — still a strong positive return, but meaningfully lower than the nominal figure. Bonds, which may yield 4–5% nominally, offer only 0.8–1.8% real returns in a 3.2% inflation environment. The compounding difference over 30 years is enormous.
            </p>
            <p className="mt-4 leading-[1.85]">
              This is why long-term investors are advised to hold equities even though they are volatile in the short run. Over 20–30 year periods, equity returns have historically outpaced inflation by a wide margin. The real risk is not short-term volatility — it is the silent, certain erosion of purchasing power from keeping too much in low-yielding cash and bonds over a lifetime.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "What is inflation?",
                  a: "Inflation is the rate at which prices for goods and services rise over time, reducing the purchasing power of money. It is measured by tracking price changes in a standard basket of goods using indexes like the Consumer Price Index (CPI).",
                },
                {
                  q: "How does inflation affect savings?",
                  a: "If your savings earn less interest than the inflation rate, the real value of your money decreases. At 3.2% inflation, $10,000 in a 1% savings account loses around $220 of real purchasing power per year.",
                },
                {
                  q: "What is purchasing power?",
                  a: "Purchasing power is how much your money can actually buy. When inflation rises, each dollar buys fewer goods. Your purchasing power is the inflation-adjusted value of your money — what it could buy in a base year's terms.",
                },
                {
                  q: "How much inflation is normal?",
                  a: "The US Federal Reserve targets 2% as an ideal annual rate. The post-war US average is about 3.2%. Rates of 7–10% indicate elevated inflation; anything above 20% is approaching hyperinflation territory.",
                },
                {
                  q: "How does inflation affect retirement?",
                  a: "Inflation is one of the biggest risks for retirees. Even at a 3.2% average rate, purchasing power halves every 22 years. A $500,000 retirement pot must double in value just to maintain today's spending power over a 22-year retirement.",
                },
                {
                  q: "How do you calculate inflation-adjusted value?",
                  a: "Use the formula: Real Value = Amount ÷ (1 + rate)^years. For $10,000 at 3.2% over 20 years: $10,000 ÷ (1.032)^20 ≈ $5,330. The calculator above does this automatically and breaks it down year by year.",
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
      <section className="border-t border-gray-100 bg-white px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <RelatedTools currentTool="inflation-calculator" />
        </div>
      </section>

    </main>
  );
}
