import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concrete Slab Cost Calculator 2026 | Worthulator",
  description:
    "Calculate the cost of a concrete slab instantly. Get accurate estimates for driveways, patios, foundations, and floors based on size, thickness, and finish.",
  keywords: [
    "concrete slab cost calculator",
    "how much does a concrete slab cost",
    "concrete slab calculator",
    "cost of concrete slab per square foot",
    "concrete driveway cost",
    "concrete patio cost 2026",
    "pour concrete slab cost",
  ],
  alternates: {
    canonical:
      "https://www.worthulator.com/tools/cost-calculators/home-improvement/concrete-slab-calculator",
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Concrete Slab Cost Calculator",
    description:
      "Estimate the cost of a concrete slab for driveways, patios, and foundations.",
    url: "https://www.worthulator.com/tools/cost-calculators/home-improvement/concrete-slab-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a concrete slab cost per square foot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard concrete slab typically costs $4–$8 per square foot for a basic pour. With finishing, reinforcement, and labour, costs can reach $8–$15+ per square foot depending on thickness and complexity.",
        },
      },
      {
        "@type": "Question",
        name: "How thick should a concrete slab be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard residential slab is 4 inches thick. Driveways typically need 4–6 inches, while commercial or heavy-load slabs may require 6–8 inches.",
        },
      },
      {
        "@type": "Question",
        name: "How much concrete do I need for a 10x10 slab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 10x10 ft slab at 4 inches thick requires approximately 1.23 cubic yards of concrete. At $125–$150 per cubic yard, that's roughly $150–$185 in material costs, plus labour.",
        },
      },
    ],
  },
];

export default function ConcreteSlabCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="bg-gray-950 px-5 py-16 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
              Cost Calculators · Home Improvement
            </p>
            <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
              Concrete Slab Cost Calculator
              <span className="mt-1 block font-semibold text-gray-400">2026 US Estimates</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-400">
              Estimate the cost of a concrete slab for your driveway, patio, garage floor, or
              foundation — adjusted for size, thickness, and finish type.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-gray-300">
                <span className="font-bold text-orange-400">$4–$15</span>
                <span className="ml-1.5">per sq ft installed</span>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-gray-300">
                <span className="font-bold text-orange-400">4–6 in</span>
                <span className="ml-1.5">typical thickness</span>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-gray-300">
                <span className="font-bold text-orange-400">1–3 days</span>
                <span className="ml-1.5">typical project time</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Calculator placeholder ────────────────────────────────── */}
        <section className="bg-gray-50 px-5 py-12 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
              <p className="text-2xl font-bold text-gray-900">Calculator Coming Soon</p>
              <p className="mx-auto mt-3 max-w-lg text-base text-gray-500">
                Our interactive concrete slab cost calculator is being built. In the meantime,
                use the cost guide below to estimate your project.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { size: "10×10 ft",  cost: "$600–$1,500",  note: "small patio" },
                  { size: "20×20 ft",  cost: "$2,400–$6,000", note: "standard garage" },
                  { size: "30×40 ft",  cost: "$7,200–$18,000", note: "large driveway" },
                ].map((item) => (
                  <div key={item.size} className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-500">{item.size}</p>
                    <p className="mt-1 text-xl font-bold text-orange-500">{item.cost}</p>
                    <p className="text-xs text-gray-400">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Cost guide ───────────────────────────────────────────── */}
        <section className="bg-white px-5 py-16 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl space-y-14">

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                Average Concrete Slab Costs in 2026
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-500">
                Concrete slab costs depend on the size, thickness, finish, reinforcement, and local
                labour rates. Here are typical installed costs (materials + labour) for the US.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Slab size</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">4&quot; thick</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">6&quot; thick</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { size: "10×10 ft (100 sq ft)",   four: "$600–$1,500",    six: "$900–$2,000" },
                      { size: "12×12 ft (144 sq ft)",   four: "$865–$2,160",    six: "$1,300–$2,880" },
                      { size: "20×20 ft (400 sq ft)",   four: "$2,400–$6,000",  six: "$3,600–$8,000" },
                      { size: "24×24 ft (576 sq ft)",   four: "$3,456–$8,640",  six: "$5,180–$11,520" },
                      { size: "30×30 ft (900 sq ft)",   four: "$5,400–$13,500", six: "$8,100–$18,000" },
                    ].map((row) => (
                      <tr key={row.size} className="bg-white">
                        <td className="px-5 py-3 font-medium text-gray-800">{row.size}</td>
                        <td className="px-5 py-3 text-gray-600">{row.four}</td>
                        <td className="px-5 py-3 text-gray-600">{row.six}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                What Affects Concrete Slab Cost?
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: "📐", title: "Size and thickness", desc: "The biggest cost driver. A 4-inch slab uses 1.23 cu yd per 100 sq ft. Doubling thickness nearly doubles material cost." },
                  { icon: "🔩", title: "Reinforcement", desc: "Wire mesh adds $0.15–$0.30/sq ft. Rebar adds $0.50–$1.50/sq ft but is required for driveways, foundations, and heavy loads." },
                  { icon: "🎨", title: "Finish type", desc: "Broom finish is cheapest. Exposed aggregate adds $2–$4/sq ft. Stamped or coloured concrete adds $8–$20+/sq ft." },
                  { icon: "🚜", title: "Site preparation", desc: "Excavation, gravel base, and formwork can add $1–$4/sq ft depending on access and soil conditions." },
                  { icon: "📍", title: "Location", desc: "Labour costs vary significantly. Urban areas and the Northeast/West Coast typically cost 20–40% more than rural Midwest." },
                  { icon: "🏗️", title: "Accessibility", desc: "Difficult access for concrete trucks or tight residential lots can add $500–$2,000 to the overall cost." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <span className="mt-0.5 text-xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  {
                    q: "How much does a concrete slab cost per square foot?",
                    a: "A basic concrete slab costs $4–$8 per square foot installed. With premium finishes, reinforcement, and site prep, costs can reach $12–$20+ per square foot.",
                  },
                  {
                    q: "How much concrete do I need for a 20x20 slab?",
                    a: "A 20×20 ft slab at 4 inches thick requires approximately 5 cubic yards of concrete. At $125–$150/cu yd for ready-mix, that's $625–$750 in materials alone — labour is additional.",
                  },
                  {
                    q: "Can I pour a concrete slab myself?",
                    a: "Small slabs (under 50 sq ft) are DIY-friendly. Larger pours require a concrete truck, proper forming, and finishing skills. Mistakes in levelling or curing can cause cracking, so hiring a professional is usually worth it for driveways and foundations.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-bold text-gray-900">{faq.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── Related tools ─────────────────────────────────────────── */}
        <section className="bg-gray-50 px-5 py-12 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-lg font-bold text-gray-900">Related Calculators</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Roof Replacement Cost", href: "/tools/cost-calculators/home-improvement/roof-replacement-cost", note: "Estimate full roof replacement cost" },
                { label: "Concrete Slab Calculator UK", href: "/tools/cost-calculators/home-improvement/concrete-slab-calculator-uk", note: "UK prices in £ and m²" },
                { label: "Home Improvement Calculators", href: "/tools/cost-calculators/home-improvement", note: "All home improvement cost tools" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-gray-900">{tool.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{tool.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
