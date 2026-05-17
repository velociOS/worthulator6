import type { Metadata } from "next";
import DebtPayoffCalculatorLoader from "./DebtPayoffCalculatorLoader";
import SimpleCalculatorHero from "@/src/templates/take-home-pay/SimpleCalculatorHero";
import StandardFAQSection from "@/src/templates/take-home-pay/StandardFAQSection";
import {
  StatChipsRow, ContentCardGrid, SEOTextBlock, InsightStrip, RelatedCalcCards,
} from "@/src/templates/take-home-pay/StandardSEOSection";
import InsightTable from "@/components/insights/InsightTable";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator 2026 – Avalanche vs Snowball, Debt-Free Date",
  description:
    "Calculate exactly when you'll be debt-free using the avalanche or snowball method. See interest saved, months shaved off, and your burn-down timeline across multiple debts.",
  keywords: ["debt payoff calculator", "avalanche vs snowball", "debt snowball calculator", "debt free date calculator", "credit card payoff calculator"],
  alternates: { canonical: "https://worthulator.com/tools/debt-payoff-calculator" },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    q: "What is the debt avalanche method?",
    a: "The avalanche method targets the debt with the highest interest rate first, while paying minimums on everything else. Once the first debt is paid off, you roll that payment to the next highest-rate debt. This method minimises total interest paid and is mathematically optimal.",
  },
  {
    q: "What is the debt snowball method?",
    a: "The snowball method targets the smallest balance first, regardless of interest rate. Once the first debt is gone, you roll the freed payment to the next smallest. It's not the cheapest method, but the quick wins provide powerful psychological motivation.",
  },
  {
    q: "Which method is better — avalanche or snowball?",
    a: "Mathematically, avalanche saves more money. Psychologically, snowball keeps more people on track. Research suggests that for many people, the snowball's quick wins lead to higher completion rates. The best method is the one you actually stick to.",
  },
  {
    q: "How much does an extra $100/month actually help?",
    a: "Dramatically more than most people expect. On $20,000 of credit card debt at 19% APR with $400/month in minimums, an extra $100/month saves about $4,200 in interest and cuts payoff time by almost 2 years. Use the What-If buttons in the calculator to see your specific scenario.",
  },
  {
    q: "What happens to freed-up minimum payments?",
    a: "In both the avalanche and snowball simulations, freed minimums 'snowball' — once a debt is eliminated, the payment you were making on it gets redirected to the next priority debt. This is what makes the strategies so powerful.",
  },
  {
    q: "Should I pay off debt or invest?",
    a: "A common rule of thumb: if your debt interest rate is higher than an expected investment return (say 7% for a diversified index fund), paying debt is the better guaranteed return. High-interest consumer debt (credit cards at 18–25%) should almost always be prioritised over new investments.",
  },
];

const STATS = [
  { stat: "25%",    color: "text-red-600",     accent: "bg-red-500",     label: "Average credit card APR in 2024 — paying only minimums doubles your actual cost" },
  { stat: "$7,951", color: "text-orange-600",  accent: "bg-orange-500",  label: "Average American credit card balance — at 20% APR with minimums, that takes 20+ years to pay off" },
  { stat: "20yrs",  color: "text-amber-600",   accent: "bg-amber-500",   label: "How long minimum payments can keep you in debt on a $10,000 credit card balance" },
];

const CONTENT_CARDS = [
  {
    icon: "🏔️",
    title: "Avalanche: the math-optimal method",
    body: "Target your highest-rate debt first. Every dollar applied to a 22% APR card does more work than any dollar applied to a 6% car loan. Over years, this difference in interest compounds massively in your favour.",
  },
  {
    icon: "⛄",
    title: "Snowball: the psychology-driven method",
    body: "Small wins matter. Eliminating a debt completely triggers a dopamine response that keeps motivation high. Studies show many people who use the snowball method complete their debt payoff — even if they pay slightly more total interest.",
  },
  {
    icon: "💡",
    title: "The freed-payment snowball effect",
    body: "When you eliminate one debt, that minimum payment doesn't go back into daily spending — it attacks the next debt. This growing 'snowball' of freed payments accelerates payoff dramatically as you progress. The last few debts get eliminated very quickly.",
  },
];

const RELATED_CALCS = [
  {
    title: "Loan Calculator",
    description: "Calculate monthly payments and total cost on any loan.",
    href: "/tools/loan-calculator",
    icon: "🏦",
    accent: "bg-blue-500/10",
  },
  {
    title: "Mortgage Calculator",
    description: "Model your mortgage payments, amortisation, and total cost.",
    href: "/tools/mortgage-calculator",
    icon: "🏠",
    accent: "bg-emerald-500/10",
  },
  {
    title: "Savings Calculator",
    description: "Build a savings projection with goals and monthly contributions.",
    href: "/tools/savings-calculator",
    icon: "💰",
    accent: "bg-amber-500/10",
  },
  {
    title: "ROI Calculator",
    description: "Calculate real investment returns after fees and inflation.",
    href: "/tools/roi-calculator",
    icon: "📈",
    accent: "bg-purple-500/10",
  },
];

export default function DebtPayoffCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Debt Payoff Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: "Calculate your debt-free date using the avalanche or snowball method. Compare strategies and see interest saved.",
      url: "https://worthulator.com/tools/debt-payoff-calculator",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <main className="bg-white text-gray-900">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <SimpleCalculatorHero
        eyebrowIcon="🏔️"
        eyebrowText="Debt · Payoff Planning"
        title="Debt Payoff Calculator"
        description="Find your exact debt-free date. Compare avalanche vs snowball strategies and see how much interest you can save."
        chips={["Avalanche & snowball strategies", "Debt-free date", "Interest saved vs minimum"]}
      >
        <DebtPayoffCalculatorLoader />
      </SimpleCalculatorHero>

      <InsightStrip
        text='At minimum payments, a $10,000 credit card balance at 20% APR takes <span class="font-semibold text-gray-900">over 20 years</span> to clear and costs nearly $25,000 total. One strategy change fixes this.'
      />

      <StatChipsRow stats={STATS} />

      <ContentCardGrid
        title="Two strategies. One goal: debt freedom."
        subtitle="The right approach depends on your psychology as much as the math."
        cards={CONTENT_CARDS}
      />

      <section className="border-t border-gray-100 bg-white px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-white/8 bg-gray-900 p-6 sm:p-8">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Example scenario</p>
            <h2 className="mt-3 text-xl font-bold text-white">How credit card debt grows on minimum payments</h2>
            <p className="mt-2 text-sm text-gray-400 mb-6">
              At 19.99% APR, paying the minimum means most of each payment goes to interest — barely denting the balance.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-500">
                    <th className="pb-3 pr-6 text-xs font-semibold uppercase tracking-wide">Balance</th>
                    <th className="pb-3 pr-6 text-xs font-semibold uppercase tracking-wide">APR</th>
                    <th className="pb-3 pr-6 text-xs font-semibold uppercase tracking-wide">Min payment</th>
                    <th className="pb-3 pr-6 text-xs font-semibold uppercase tracking-wide">Time to pay off</th>
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide">Total interest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="py-3 pr-6 font-semibold text-white">$5,000</td>
                    <td className="py-3 pr-6 text-gray-400">19.99%</td>
                    <td className="py-3 pr-6 text-gray-400">$100/mo</td>
                    <td className="py-3 pr-6 text-gray-400">~9 years</td>
                    <td className="py-3 font-semibold text-red-400">$4,300</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="py-3 pr-6 font-semibold text-white">$10,000</td>
                    <td className="py-3 pr-6 text-gray-400">19.99%</td>
                    <td className="py-3 pr-6 text-gray-400">$200/mo</td>
                    <td className="py-3 pr-6 text-gray-400">~20 years</td>
                    <td className="py-3 font-semibold text-red-400">$14,000+</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="py-3 pr-6 font-semibold text-white">$20,000</td>
                    <td className="py-3 pr-6 text-gray-400">19.99%</td>
                    <td className="py-3 pr-6 text-gray-400">$400/mo</td>
                    <td className="py-3 pr-6 text-gray-400">~28 years</td>
                    <td className="py-3 font-semibold text-red-400">$31,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The avalanche method — targeting the highest-rate debt first — eliminates interest at its source. Switching from minimum payments to a fixed $500/month on $15,000 at 22% APR saves over $5,000 in interest and cuts payoff time from 47 months to 27.
            </p>
            <details className="mt-5">
              <summary className="cursor-pointer text-sm text-emerald-400 hover:text-emerald-300">How does monthly interest work on credit cards?</summary>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                Each month, your lender calculates interest as: <span className="font-mono text-gray-300">Balance × (APR ÷ 12)</span>. On a $10,000 balance at 20% APR, that&apos;s $167 in interest every month. A $200 minimum payment only reduces your balance by $33. That&apos;s why debt at high APRs can take decades to clear on minimums alone.
              </p>
            </details>
          </div>
        </div>
      </section>

      <SEOTextBlock
        title="How the Debt Payoff Calculator Works"
        formula={`Monthly interest = Balance × (APR / 12 / 100)

Principal paid = Payment − Monthly interest

Avalanche: Sort debts by interest rate (highest first)
Snowball:   Sort debts by balance (lowest first)

Freed minimum: When a debt reaches $0, its minimum payment
rolls into the next debt's payment automatically.

Interest saved = Minimum-only total interest − Strategy total interest`}
        steps={[
          { label: "Add your debts", description: "Enter each debt: name, balance, interest rate, and minimum payment." },
          { label: "Choose a strategy", description: "Avalanche saves the most money. Snowball provides the most motivation." },
          { label: "Set extra payments", description: "Even $50/month extra makes a dramatic difference on high-interest debt." },
          { label: "Add a lump sum", description: "Got a tax refund or bonus? Apply it immediately for maximum interest savings." },
          { label: "See your debt-free date", description: "The exact month and year you'll be completely debt-free, with interest saved." },
        ]}
        paragraphs={[
          "This calculator runs a full month-by-month simulation for both your chosen strategy and minimum-only payments, so you can see exactly what you save. The burn-down chart shows your declining balance over time.",
          "The 'freed minimum' mechanic is key: every time you eliminate one debt, that payment doesn't disappear — it gets added to the next debt's attack. This is why the final debts get eliminated so fast, and why starting is the hardest and most important step.",
        ]}
      />

      <StandardFAQSection faqs={FAQS} bg="bg-gray-50" />

      <RelatedCalcCards
        title="Related Calculators"
        subtitle="Tools to take control of your complete financial picture."
        items={RELATED_CALCS}
      />
    </main>
  );
}
