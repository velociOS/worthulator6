import Link from "next/link";

const quickTools = [
  {
    emoji: "📱",
    title: "Screen Time Tool",
    desc: "Estimate the value of time spent on your screen — and what it could be worth redirected.",
    href: "/tools/screen-time-impact",
    color: "bg-violet-50 border-violet-100",
    accent: "text-violet-600",
  },
  {
    emoji: "💳",
    title: "Subscription Tool",
    desc: "Tally your subscriptions and estimate what you could free up month by month.",
    href: "/tools/subscription-cost",
    color: "bg-sky-50 border-sky-100",
    accent: "text-sky-600",
  },
  {
    emoji: "💼",
    title: "Salary Tool",
    desc: "Break down your salary into daily and hourly estimates — and see what your time is really worth.",
    href: "/tools/salary-breakdown",
    color: "bg-emerald-50 border-emerald-100",
    accent: "text-emerald-600",
  },
  {
    emoji: "☕",
    title: "Spending Tool",
    desc: "Estimate how small daily spending habits add up — and what you might keep instead.",
    href: "/tools/coffee-cost-over-lifetime",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-600",
  },
];

const categories = [
  { label: "💰 Money", href: "/tools?category=money" },
  { label: "⏱ Time", href: "/tools?category=time" },
  { label: "🌿 Lifestyle", href: "/tools?category=lifestyle" },
  { label: "💼 Work", href: "/tools?category=work-career" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Estimates based on your numbers. Not financial advice.
          </div>

          <h1 className="text-balance text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-none tracking-[-0.04em] text-slate-950">
            Discover what you&apos;re worth.
            <br />
            <span className="text-slate-400">Then make it work harder.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-slate-500">
            Worthulator tools help you estimate what you spend, what you earn, and what your time is worth — so you can make smarter everyday decisions.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/tools"
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-slate-950 px-8 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_14px_40px_rgba(15,23,42,0.26)]"
            >
              Try a Tool →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── QUICK TOOLS ───────────────────────────────────────────── */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Popular tools
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`group flex flex-col gap-4 rounded-3xl border p-6 transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] ${tool.color}`}
              >
                <span className="text-3xl">{tool.emoji}</span>
                <div>
                  <h3 className={`text-base font-semibold ${tool.accent}`}>
                    {tool.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">
                    {tool.desc}
                  </p>
                </div>
                <span className="mt-auto text-xs font-semibold text-slate-400 transition-all group-hover:text-slate-700">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WOW SECTION ───────────────────────────────────────────── */}
      <section className="mx-5 mb-20 overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 text-white sm:mx-8 sm:mb-28 sm:px-14 sm:py-20 lg:mx-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
                Estimated value · screen time · 10 years · UK avg salary
              </p>
              <p className="mt-4 text-[clamp(3.5rem,10vw,7rem)] font-bold leading-none tracking-[-0.05em] text-white">
                £84,250
              </p>
              <p className="mt-4 max-w-md text-xl font-medium leading-[1.4] text-white/70">
                That&apos;s the estimated worth of screen time over 10 years based on average earnings. What would you do with yours?
              </p>
              <p className="mt-3 text-xs text-white/30">For illustrative purposes only. Not financial advice.</p>
            </div>
            <Link
              href="/tools/screen-time-impact"
              className="shrink-0 rounded-2xl bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_14px_40px_rgba(255,255,255,0.15)]"
            >
              Try the screen time tool →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ────────────────────────────────────────────── */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Browse by category
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_30px_rgba(15,23,42,0.09)]"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST LINE ────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 px-5 py-6 text-center text-sm font-medium tracking-wide text-slate-400">
        Estimates only · Not financial advice · Always worth knowing your numbers.
      </div>

    </div>
  );
}

