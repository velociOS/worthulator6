import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cost Calculators | Worthulator",
  description:
    "Free cost calculators for home improvement, construction, and renovation projects. Get accurate estimates for roofing, concrete, dental work, and more.",
  alternates: {
    canonical: "https://www.worthulator.com/tools/cost-calculators",
  },
  robots: { index: true, follow: true },
};

const CATEGORIES = [
  {
    title: "Home Improvement",
    href: "/tools/cost-calculators/home-improvement",
    description: "Roofing, concrete, renovation, and structural cost estimators.",
    emoji: "🏠",
    tools: [
      { name: "Roof Replacement Cost Calculator", href: "/tools/cost-calculators/home-improvement/roof-replacement-cost", description: "Estimate full roof replacement cost by size, material, and location." },
      { name: "Concrete Slab Cost Calculator", href: "/tools/cost-calculators/home-improvement/concrete-slab-calculator", description: "Calculate concrete slab costs for driveways, patios, and foundations." },
      { name: "Concrete Slab Cost Calculator UK", href: "/tools/cost-calculators/home-improvement/concrete-slab-calculator-uk", description: "UK concrete slab cost estimates in £/m²." },
    ],
  },
  {
    title: "Health",
    href: "/tools/dental-implant-cost-calculator",
    description: "Medical and dental procedure cost estimators.",
    emoji: "🦷",
    tools: [
      { name: "Dental Implant Cost Calculator", href: "/tools/dental-implant-cost-calculator", description: "Estimate dental implant costs for single tooth, full mouth, and All-on-4." },
    ],
  },
];

export default function CostCalculatorsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gray-950 px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
            Worthulator · Cost Calculators
          </p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
            Cost Calculators
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-400">
            Accurate cost estimators for home improvement, construction, medical, and everyday
            projects — updated with 2026 prices.
          </p>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────── */}
      <section className="px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl space-y-14">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.emoji}</span>
                <div>
                  <Link href={cat.href} className="text-xl font-bold text-gray-900 hover:text-orange-600">
                    {cat.title}
                  </Link>
                  <p className="text-sm text-gray-500">{cat.description}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:shadow-md"
                  >
                    <p className="text-sm font-bold text-gray-900">{tool.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-base text-gray-500">
            Looking for income or financial calculators?{" "}
            <Link href="/tools" className="font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-700">
              Browse all tools →
            </Link>
          </p>
        </div>
      </section>

    </main>
  );
}
