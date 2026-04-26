import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TakeHomePayCalculator from "../TakeHomePayCalculator";
import RelatedTools from "@/components/RelatedTools";
import { stateTaxRates, stateNames, type StateCode } from "@/src/lib/stateTax";

// Pre-generate all state routes at build time
export function generateStaticParams() {
  return (Object.keys(stateTaxRates) as StateCode[]).map((code) => ({
    state: code.toLowerCase(),
  }));
}

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const code = state.toUpperCase() as StateCode;
  if (!(code in stateTaxRates)) return {};
  const name = stateNames[code];
  const rate = stateTaxRates[code];
  return {
    title: `Take Home Pay Calculator ${name} (After Tax Salary) — Worthulator`,
    description: `Estimate your take-home pay in ${name}, including federal${rate > 0 ? ` and state taxes (${rate}%)` : " taxes"}, Social Security, and Medicare. See your net income instantly.`,
    alternates: { canonical: `https://worthulator.com/tools/take-home-pay-calculator/${state}` },
    robots: { index: true, follow: true },
  };
}

const popularStates: StateCode[] = ["CA", "TX", "FL", "NY", "WA", "IL"];

// --- Composable insight system ---
type TaxLevel = "none" | "low" | "moderate" | "high";

function getTaxLevel(rate: number): TaxLevel {
  if (rate === 0) return "none";
  if (rate <= 3.5) return "low";
  if (rate <= 6) return "moderate";
  return "high";
}

/** Short state-specific nuance clause — no trailing period. */
const stateNuances: Partial<Record<StateCode, string>> = {
  AK: "and uniquely pays residents an annual Permanent Fund Dividend",
  AL: "and allows a deduction for federal taxes paid, which lowers effective liability",
  AR: "following multiple consecutive years of rate reductions",
  AZ: "a flat rate that makes estimating your take-home especially straightforward",
  CA: "with a top rate of 13.3% that applies to higher earners",
  CO: "making it easy to estimate your net income at any salary level",
  CT: "with exemptions that phase out for higher earners, nudging effective rates up",
  DC: "matching the third-highest effective rate in the country",
  DE: "with no sales tax adding pressure to the cost of living",
  FL: "a significant draw for high earners relocating from higher-tax states",
  GA: "with rates scheduled to drop further toward 4.99% in coming years",
  HI: "with 12 graduated brackets and a top rate of 11% for the highest earners",
  IA: "on track to fall to 3.9% as part of ongoing legislative reform",
  ID: "a flat rate with no local income taxes layered on top",
  IL: "a rate the state constitution mandates as flat — graduated rates are prohibited",
  IN: "though county-level taxes of 0.5%–3% are added depending on where you live",
  KS: "and Social Security income is fully exempt from state tax",
  KY: "a flat rate with relatively few deductions to offset liability",
  LA: "and a federal tax deduction can meaningfully lower your effective state rate",
  MA: "with an additional 4% surtax on income above $1 million since 2023",
  MD: "and county income taxes of 2.25%–3.2% stack on top of the state rate",
  ME: "with a generous standard deduction that shelters lower-income earners",
  MI: "though Detroit and a few cities layer on additional local income taxes",
  MN: "one of the highest top marginal rates in the Midwest",
  MO: "and Social Security income is fully exempt for most residents",
  MS: "on a legislative path toward full income tax elimination",
  MT: "with capital gains taxed at the same rate as regular income",
  NC: "with rates scheduled to drop to 3.99% by 2026",
  ND: "one of the lowest income tax burdens in the entire country",
  NE: "with annual rate cuts phasing in from recent legislative reform",
  NH: "having fully eliminated taxes on interest and dividends in 2025",
  NJ: "rising to 10.75% for the highest earners",
  NM: "with expanded child tax credits available to qualifying residents",
  NV: "with state services funded primarily through gaming and tourism taxes",
  NY: "and NYC residents pay an additional local tax of up to 3.876%",
  OH: "though most cities impose additional local income taxes of 1%–3%",
  OK: "with deductions available for Social Security and retirement contributions",
  OR: "as the state offsets having no sales tax with higher income taxes",
  PA: "though most municipalities add a local earned income tax of 1%–3%",
  RI: "with a standard deduction that reduces taxable income for most earners",
  SC: "and a 44% deduction for federal taxes paid can lower your effective state rate",
  SD: "with state services funded through sales and property taxes instead",
  TN: "after fully eliminating its Hall Tax on investment income in 2021",
  TX: "with state services funded through property and sales taxes instead",
  UT: "with a 6% nonrefundable credit that provides modest relief for lower earners",
  VA: "with the top bracket kicking in at just $17,000 of taxable income",
  VT: "with most middle-income earners landing in the 6.6% bracket",
  WA: "though a 7% capital gains tax applies to long-term investment gains above $250,000",
  WI: "one of the higher rates in the Midwest, with an added surcharge on capital gains",
  WV: "with further rate cuts scheduled as the state returns surplus revenue to residents",
  WY: "with the state funded largely by mineral extraction revenues",
};

const taxLevelTemplates: Record<
  TaxLevel,
  (name: string, rate: number, nuance: string) => string
> = {
  none: (name, _rate, nuance) =>
    nuance
      ? `${name} has no state income tax — ${nuance}, so your take-home is only reduced by federal deductions.`
      : `${name} has no state income tax, meaning your take-home is only reduced by federal taxes and FICA contributions.`,
  low: (name, rate, nuance) =>
    nuance
      ? `${name} applies a low state income tax of ${rate}% — ${nuance}, keeping the overall impact on your take-home relatively modest.`
      : `${name} applies a low state income tax of ${rate}%, so the state-level impact on your take-home remains relatively modest.`,
  moderate: (name, rate, nuance) =>
    nuance
      ? `${name} applies a moderate state income tax of ${rate}% — ${nuance}, which noticeably reduces your take-home on top of federal obligations.`
      : `${name} applies a moderate state income tax of ${rate}%, noticeably reducing your net income on top of federal taxes.`,
  high: (name, rate, nuance) =>
    nuance
      ? `${name} applies one of the higher state income tax rates at ${rate}% — ${nuance}, which can significantly cut into your take-home alongside federal taxes.`
      : `${name} applies one of the higher state income tax rates at ${rate}%, which can significantly reduce your take-home on top of federal obligations.`,
};

function buildInsight(code: StateCode, rate: number, name: string): string {
  const level = getTaxLevel(rate);
  const nuance = stateNuances[code] ?? "";
  return taxLevelTemplates[level](name, rate, nuance);
}



export default async function StateCalculatorPage({ params }: Props) {
  const { state } = await params;
  const code = state.toUpperCase() as StateCode;

  if (!(code in stateTaxRates)) notFound();

  const name = stateNames[code];
  const rate = stateTaxRates[code];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Take Home Pay Calculator ${name}`,
    description: `Estimate your take-home pay in ${name}, including federal${rate > 0 ? ` and state taxes (${rate}%)` : " taxes"}, Social Security, and Medicare. See your net income instantly.`,
    url: `https://worthulator.com/tools/take-home-pay-calculator/${state}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white px-5 py-14 sm:px-8 sm:py-24 lg:px-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-emerald-50/80 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gray-100/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">

          {/* Left — copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
              Money · Income Tools
            </p>
            <h1 className="mt-4 text-[clamp(2.4rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-gray-950">
              Take Home Pay Calculator{" "}
              <span className="block mt-1 font-semibold text-gray-400">for {name}</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-500">
              Use our take home pay calculator for {name} to estimate your after-tax income. This includes federal tax{rate > 0 ? ` and ${name} state income tax (${rate}%)` : ""}, giving you a clearer picture of what you actually take home.
            </p>
          </div>

          {/* Right — preview stat card */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gray-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">{name} · $50,000 salary</p>
              <p className="relative mt-3 text-5xl font-bold tracking-[-0.04em] text-emerald-400 [text-shadow:0_0_20px_rgba(52,211,153,0.28)]">
                ~{rate === 0 ? "65" : Math.max(55, 65 - Math.round(rate / 2))}%
              </p>
              <p className="relative mt-1 text-sm text-gray-500">estimated take-home rate in {name}</p>
              <p className="mt-4 text-xs text-gray-500">
                State income tax: <span className="font-semibold text-gray-300">{rate}%</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-white px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <TakeHomePayCalculator initialState={code} />
        </div>
      </section>

      {/* STATE-SPECIFIC INSIGHT */}
      <div className="bg-gray-50 px-5 py-5 sm:px-8 lg:px-16">
        <p className="mx-auto max-w-5xl text-sm font-medium text-gray-500">
          {buildInsight(code, rate, name)}
        </p>
      </div>

      {/* COMPARE WITH OTHER STATES */}
      <section className="border-t border-gray-100 bg-white px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Compare with other states</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {popularStates
              .filter((c) => c !== code)
              .map((c) => (
                <Link
                  key={c}
                  href={`/tools/take-home-pay-calculator/${c.toLowerCase()}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {stateNames[c]}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* RELATED TOOLS */}
      <RelatedTools currentTool="take-home-pay-calculator" heading="Other useful tools" bg="bg-gray-50" />

    </main>
  );
}
