import type { Metadata } from "next";
import Link from "next/link";
import SimpleCalculatorShell from "@/components/calculators/SimpleCalculatorShell";
import ConcreteCalculatorLoader from "./ConcreteCalculatorLoader";
import RegionToggle from "@/components/RegionToggle";

export const metadata: Metadata = {
  title: "Concrete Calculator (US) – Cubic Yards | Worthulator",
  description:
    "Calculate how much concrete you need in cubic yards. Enter length, width, and thickness to get your volume and bag count instantly — free US concrete calculator.",
  keywords: [
    "concrete calculator",
    "cubic yards of concrete calculator",
    "concrete slab calculator",
    "how much concrete do I need",
    "concrete bag calculator",
    "cubic yard concrete",
    "how many bags of concrete",
    "concrete cost per cubic yard",
  ],
  alternates: {
    canonical: "https://www.worthulator.com/construction-calculators/concrete-calculator",
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Concrete Calculator (US)",
    description:
      "Calculate how much concrete you need in cubic yards. Enter length, width, and thickness for slabs, driveways, or footings.",
    url: "https://www.worthulator.com/construction-calculators/concrete-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate cubic yards of concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply length (ft) × width (ft) × thickness (ft — divide inches by 12) to get cubic feet, then divide by 27 to get cubic yards. Add 10% for waste. For example: a 20 × 12 ft slab at 4 in = (20 × 12 × 0.333) ÷ 27 = 2.96 cubic yards.",
        },
      },
      {
        "@type": "Question",
        name: "How many 80 lb bags of concrete per cubic yard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "About 60 bags. An 80 lb bag yields roughly 0.45 cubic feet, and a cubic yard is 27 cubic feet (27 ÷ 0.45 = 60). Always buy at least 10% extra — that's 66 bags per cubic yard.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between cubic feet and cubic yards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "One cubic yard equals exactly 27 cubic feet (3 ft × 3 ft × 3 ft). Ready-mix suppliers quote in cubic yards. If your calculation gives cubic feet, divide by 27 before ordering.",
        },
      },
      {
        "@type": "Question",
        name: "How thick should a concrete slab be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Residential driveways: 4 inches minimum, 6 inches for heavy vehicles. Patios and walkways: 3–4 inches. Garage floors: 4–6 inches. Footings vary by soil type and structural load.",
        },
      },
      {
        "@type": "Question",
        name: "What does a yard of concrete cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ready-mix typically costs $120–200 per cubic yard plus a delivery charge of $100–200. Bagged concrete (80 lb at $5–8 each) works out to $300–480 per equivalent cubic yard — only cost-effective for small pours under 1 yard.",
        },
      },
      {
        "@type": "Question",
        name: "When should I order ready-mix instead of bags?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At 1.5 cubic yards or more, ready-mix is usually cheaper and faster. Mixing 90 bags by hand takes hours and risks inconsistent strength. Ready-mix ensures a uniform pour.",
        },
      },
    ],
  },
];

const heroCard = (
  <div className="rounded-2xl border border-white/10 bg-slate-900 p-7 text-white shadow-2xl">
    <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
      Example — 12 × 10 ft driveway
    </p>
    <div className="mt-5 space-y-1">
      <p className="text-4xl font-bold tracking-tight">1.48</p>
      <p className="text-sm font-semibold text-white/50">cubic yards</p>
    </div>
    <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
      <div className="flex justify-between">
        <span className="text-white/50">Bags (exact)</span>
        <span className="font-semibold">89 × 80 lb</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/50">With 10% waste</span>
        <span className="font-semibold">98 bags</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/50">Thickness</span>
        <span className="font-semibold">4 in</span>
      </div>
    </div>
  </div>
);

export default function ConcreteCalculatorPage() {
  return (
    <SimpleCalculatorShell
      jsonLd={jsonLd}
      category="Construction · Materials"
      title="Concrete Calculator"
      subtitle="Calculate cubic yards for slabs, driveways, footings, and pours."
      description={
        <>
          Enter your slab dimensions and get the concrete volume in cubic yards plus
          the number of 80 lb bags you need — instantly.{" "}
          <span className="mt-2 block text-sm text-gray-400">
            For educational purposes only. Always verify with your supplier before ordering.
          </span>
          <RegionToggle
            current="us"
            usPath="/construction-calculators/concrete-calculator"
            ukPath="/construction-calculators/concrete-calculator-uk"
            theme="light"
          />
        </>
      }
      heroCard={heroCard}
      calculator={<ConcreteCalculatorLoader region="US" />}
      insightText={
        <>
          A standard 4-inch driveway at{" "}
          <strong>12 × 10 ft needs about 1.5 cubic yards</strong> — roughly 90 bags.
          Always order 10% extra to allow for spillage and waste.
        </>
      }
    >
      {/* ── HOW TO CALCULATE IN CUBIC YARDS ─────────────────────────────── */}
      <section className="border-t border-gray-100 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to calculate concrete in cubic yards
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-500">
            All concrete in the US is ordered and priced by the cubic yard. To find the
            volume you need, multiply the length and width of your slab (both in feet)
            by the thickness — but because thickness is usually given in inches, you
            first divide it by 12 to convert to feet. That gives you cubic feet, and
            since there are 27 cubic feet in one cubic yard, you divide by 27 to get
            your final number.
          </p>
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Formula</p>
            <p className="mt-3 font-mono text-sm text-gray-700">
              Cubic yards = (Length ft × Width ft × Thickness in ÷ 12) ÷ 27
            </p>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-500">
            It helps to think of it in two steps: first get cubic feet, then convert.
            A slab that is 10 ft × 10 ft × 4 inches thick contains 33.3 cubic feet.
            Divide by 27 and you get 1.23 cubic yards. That&apos;s a manageable amount
            to mix by hand with bags — anything above 1.5 cubic yards is usually more
            practical to order as ready-mix.
          </p>
        </div>
      </section>

      {/* ── WORKED EXAMPLE ──────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Worked example: 20 × 12 ft driveway slab
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-500">
            Say you&apos;re pouring a driveway that is 20 feet long, 12 feet wide, and
            4 inches thick — a common residential size. Here&apos;s the step-by-step:
          </p>
          <div className="mt-6 space-y-3">
            {[
              { step: "1", label: "Convert thickness to feet",   value: "4 in ÷ 12 = 0.333 ft" },
              { step: "2", label: "Calculate cubic feet",        value: "20 × 12 × 0.333 = 80 cu ft" },
              { step: "3", label: "Convert to cubic yards",      value: "80 ÷ 27 = 2.96 cu yd" },
              { step: "4", label: "Add 10% waste",               value: "2.96 × 1.10 = 3.26 cu yd to order" },
            ].map(({ step, label, value }) => (
              <div key={step} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  {step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{label}</p>
                  <p className="mt-0.5 font-mono text-sm text-gray-500">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-500">
            At 4 inches thick, this driveway needs just under 3 cubic yards. Bump it
            to 6 inches — the thickness recommended if you park trucks or an RV —
            and the same footprint jumps to 4.44 cubic yards. Getting the thickness
            right before ordering is the single most important step.
          </p>
        </div>
      </section>

      {/* ── BAG CALCULATIONS ────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How many 80 lb bags of concrete do you need?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-500">
            An 80 lb bag of premix concrete (such as Quikrete or Sakrete) covers
            approximately 0.45 cubic feet when mixed. Since there are 27 cubic feet
            in a cubic yard, you need about 60 bags per cubic yard. Here&apos;s a
            quick reference for common project sizes:
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { vol: "0.5 cu yd", bags: "30 bags",  waste: "33 bags" },
              { vol: "1 cu yd",   bags: "60 bags",  waste: "66 bags" },
              { vol: "2 cu yd",   bags: "120 bags", waste: "132 bags" },
              { vol: "3 cu yd",   bags: "180 bags", waste: "198 bags" },
            ].map((row) => (
              <div key={row.vol} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-base font-bold text-emerald-600">{row.vol}</p>
                <p className="mt-2 text-sm font-semibold text-gray-700">{row.bags}</p>
                <p className="mt-0.5 text-xs text-gray-400">+10% waste: {row.waste}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-500">
            Mixing 60 bags by hand is a full day&apos;s work for one person. At around
            2 cubic yards and above, most contractors switch to ready-mix, which arrives
            pre-blended and pours quickly. Bags are best for small pours, repairs, or
            projects where you need to work in stages.
          </p>
        </div>
      </section>

      {/* ── CONCRETE COST PER CUBIC YARD ────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">
            What does concrete cost per cubic yard?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-500">
            Concrete pricing varies by region, season, and supply method. These are
            rough national averages for 2025–2026:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-gray-700">Bagged concrete (80 lb)</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">$5–8 per bag</p>
              <p className="mt-1 text-xs text-gray-400">≈ $300–480 per cubic yard equivalent</p>
              <p className="mt-3 text-sm text-gray-500">
                Best for small pours under 1 yard. Convenient but expensive at scale.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-gray-700">Ready-mix (truck delivery)</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">$120–200 per yard</p>
              <p className="mt-1 text-xs text-gray-400">Plus delivery fee, typically $100–200</p>
              <p className="mt-3 text-sm text-gray-500">
                Most cost-effective for anything over 1–2 yards. Consistent quality, faster pour.
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-500">
            For a 3-yard driveway using ready-mix, expect to pay $360–600 for the concrete
            alone, plus delivery and any finishing or labor costs. Always get at least two
            quotes from local suppliers — regional prices can differ by 30% or more.
          </p>
        </div>
      </section>

      {/* ── COMMON MISTAKES ─────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Common mistakes when estimating concrete
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Skipping the waste buffer",
                body: "Ordering exactly what the formula says almost always leaves you short. Ground isn't perfectly level, forms shift, and mixing absorbs extra. Always add at least 10%.",
              },
              {
                title: "Mixing up cubic feet and cubic yards",
                body: "Many people calculate in cubic feet and forget to divide by 27. One cubic yard is 27 cubic feet — a mistake here means ordering 27× too much or too little.",
              },
              {
                title: "Underestimating slab thickness",
                body: "A 4-inch slab and a 6-inch slab of the same footprint require 50% more concrete. Confirm thickness requirements before calculating, especially under driveways.",
              },
              {
                title: "Forgetting the sub-base",
                body: "Concrete poured directly onto soft soil can crack and sink. A 4–6 inch compacted gravel base is standard. This doesn't change your concrete volume but affects overall excavation depth.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-gray-700">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE IS THIS USED ───────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Where this calculator is used
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-500">
            This tool works for any rectangular concrete pour. Common uses include:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Driveways",     note: "Typically 4–6 in thick. Single-car: ~2–3 cu yd. Double: 4–6 cu yd." },
              { name: "Patios",        note: "Usually 3–4 in. A 16 × 20 ft patio at 4 in = ~4 cu yd." },
              { name: "Garage floors", note: "Minimum 4 in — 6 in if supporting vehicles. 20 × 20 ft = ~5 cu yd." },
              { name: "Footings",      note: "Depth varies by frost line and load. Poured separately from the slab." },
              { name: "Fence posts",   note: "Small individual pours. Use the calculator per post for bag counts." },
              { name: "Shed slabs",    note: "3–4 in is typical. A 12 × 16 ft shed base needs roughly 1.8 cu yd." },
            ].map(({ name, note }) => (
              <div key={name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-gray-700">{name}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {[
              {
                q: "How do I calculate cubic yards of concrete?",
                a: "Multiply length (ft) × width (ft) × thickness (ft — convert inches by dividing by 12). That gives cubic feet. Divide by 27 to get cubic yards. Then add 10% for waste.",
              },
              {
                q: "How many 80 lb bags of concrete per cubic yard?",
                a: "Approximately 60 bags. An 80 lb bag yields about 0.45 cubic feet. Since a cubic yard equals 27 cubic feet: 27 ÷ 0.45 = 60 bags. Buy 66 if adding 10% waste.",
              },
              {
                q: "What is the difference between cubic feet and cubic yards?",
                a: "One cubic yard equals exactly 27 cubic feet (3 ft × 3 ft × 3 ft). Ready-mix suppliers always quote in cubic yards. If your calculator gives cubic feet, divide by 27 before ordering.",
              },
              {
                q: "How thick should a concrete slab be?",
                a: "Residential driveways: 4 inches minimum, 6 inches if you park heavy vehicles. Patios and walkways: 3–4 inches. Garage floors: 4–6 inches. Footings vary by soil and load.",
              },
              {
                q: "What does a yard of concrete cost?",
                a: "Ready-mix typically runs $120–200 per cubic yard plus a delivery charge of $100–200. Bagged concrete (80 lb bags at $5–8 each) works out to $300–480 per equivalent cubic yard — cost-effective only for small jobs.",
              },
              {
                q: "When should I use ready-mix instead of bags?",
                a: "Once you're at 1.5 cubic yards or more, ready-mix is usually cheaper and far faster. Mixing 90 bags by hand takes several hours and risks an uneven mix. Ready-mix ensures consistent strength throughout the pour.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-800">{q}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-gray-800">Disclaimer</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            This calculator provides estimates only and should be used for planning
            purposes. Actual concrete quantities depend on ground conditions, form
            accuracy, pour technique, and material yield — all of which vary in
            practice. Always confirm quantities with your supplier before ordering.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Cost figures are approximate national averages and may not reflect your
            local market. Bag yields are based on manufacturer averages — check the
            label for the specific product you buy.
          </p>
        </div>
      </section>

      {/* ── RELATED TOOLS ───────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-gray-800">Related calculators</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Concrete Slab Calculator",     href: "/tools/cost-calculators/home-improvement/concrete-slab-calculator",   note: "Calculate slab volume and cost" },
              { label: "Concrete Bag Calculator",      href: "/construction-calculators/concrete/concrete-bag-calculator",    note: "Bags needed for any pour" },
              { label: "Concrete Calculator (UK)",     href: "/construction-calculators/concrete-calculator-uk",     note: "Switch to metric / cubic metres" },
              { label: "All Construction Calculators", href: "/construction-calculators",                             note: "Browse the full set" },
            ].map(({ label, href, note }) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-emerald-700">{label}</p>
                <p className="mt-1 text-xs text-gray-400">{note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SimpleCalculatorShell>
  );
}
