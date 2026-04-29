"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const featuredTools = [
  {
    emoji: "⏱️",
    title: "Overtime Pay Calculator",
    desc: "See exactly what your overtime hours are worth after multipliers.",
    href: "/tools/overtime-pay-calculator",
    tag: "Income",
    tagColor: "bg-rose-50 text-rose-600",
    preview: {
      inputs: ["$25/hr base", "8 hrs overtime", "1.5× rate"],
      result: "$300",
      resultSub: "Overtime earnings",
    },
  },
  {
    emoji: "🏠",
    title: "Take Home Pay Calculator",
    desc: "See what you actually earn after tax.",
    href: "/tools/take-home-pay-calculator",
    tag: "Income",
    tagColor: "bg-sky-50 text-sky-600",
    preview: {
      inputs: ["$55,000/yr", "Standard tax", "No pension"],
      result: "$3,200/mo",
      resultSub: "After all deductions",
    },
  },
  {
    emoji: "📈",
    title: "Compound Interest Calculator",
    desc: "Visualise how your investments grow over time.",
    href: "/tools/compound-interest",
    tag: "Investments",
    tagColor: "bg-violet-50 text-violet-600",
    preview: {
      inputs: ["$50,000", "7% return", "10 years"],
      result: "$120,000",
      resultSub: "↑ 140% growth",
    },
  },
  {
    emoji: "💼",
    title: "Freelance Rate Calculator",
    desc: "Calculate what you should charge per hour.",
    href: "/tools/freelance-rate",
    tag: "Work",
    tagColor: "bg-emerald-50 text-emerald-600",
    preview: {
      inputs: ["$80k target", "48 weeks", "40 hrs/wk"],
      result: "$41/hr",
      resultSub: "Your recommended rate",
    },
  },
];

const categories = [
  { emoji: "💰", label: "Money",           href: "/tools?category=money"       },
  { emoji: "⏱️", label: "Time",            href: "/tools?category=time"        },
  { emoji: "🧠", label: "Lifestyle",       href: "/tools?category=lifestyle"   },
  { emoji: "💼", label: "Work & Career",   href: "/tools?category=work-career" },
  { emoji: "🏠", label: "Home & Living",   href: "/tools?category=home-living" },
];

const trustItems = [
  {
    icon: "⚡",
    title: "Fast, no sign-up tools",
    desc: "Open any calculator and get results instantly — no account, no email, no waiting.",
  },
  {
    icon: "🎯",
    title: "Built for real-world decisions",
    desc: "Every tool is designed around the questions people actually ask about money.",
  },
  {
    icon: "🔍",
    title: "Designed to reveal hidden costs",
    desc: "We show you what your time, habits, and choices are really worth — in numbers.",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <motion.section
        className="relative overflow-hidden bg-slate-950 px-6 pb-24 pt-24 sm:px-12 sm:pb-32 sm:pt-32 lg:px-20"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >

        {/* Background glows */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          <div className="absolute -right-32 -top-16 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute right-16 top-40 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Free · No sign-up required · Estimates only
          </div>

          {/* Headline */}
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            See what your time, money, and decisions are{" "}
            <span className="text-emerald-400">really worth.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Instant calculators that break down salaries, investments, and real-world costs — so you can make smarter decisions fast.
          </p>

          {/* Benefit points */}
          <ul className="mt-6 space-y-2">
            {[
              "Understand your real earnings",
              "Spot hidden costs instantly",
              "Make better financial decisions",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-slate-300">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">✓</span>
                {point}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/tools"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-400"
              >
                Explore Calculators →
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/tools"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-sm font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10"
              >
                Browse all tools
              </Link>
            </motion.div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-bold text-white">40+</p>
              <p className="mt-0.5 text-xs text-slate-500">Financial tools</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Free</p>
              <p className="mt-0.5 text-xs text-slate-500">Always</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Instant</p>
              <p className="mt-0.5 text-xs text-slate-500">Results in seconds</p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* ─── FEATURED CALCULATORS ──────────────────────────────────────────── */}
      <motion.section
        className="px-6 py-20 sm:px-12 sm:py-24 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        custom={0.1}
      >
        <div className="mx-auto max-w-6xl">

          {/* Section header */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Most popular
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Start with these
              </h2>
            </div>
            <Link
              href="/tools"
              className="hidden text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline sm:block"
            >
              View all →
            </Link>
          </div>

          {/* Product cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <motion.div
                key={tool.href}
                whileHover={{ scale: 1.03, boxShadow: "0 24px 60px rgba(15,23,42,0.14)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="rounded-2xl"
              >
              <Link
                href={tool.href}
                className="group flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-slate-300"
              >
                {/* Category tag */}
                <span className={`mb-4 self-start rounded-lg px-2.5 py-1 text-xs font-semibold ${tool.tagColor}`}>
                  {tool.tag}
                </span>

                {/* Mini calculator preview */}
                <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  {/* Fake input chips */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {tool.preview.inputs.map((input) => (
                      <span
                        key={input}
                        className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-500 shadow-sm"
                      >
                        {input}
                      </span>
                    ))}
                  </div>
                  {/* Divider */}
                  <div className="mb-3 border-t border-slate-200" />
                  {/* Result */}
                  <p className="text-xl font-bold tracking-tight text-slate-900">{tool.preview.result}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-400">{tool.preview.resultSub}</p>
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tool.emoji}</span>
                  <h3 className="text-sm font-bold leading-snug text-slate-900">
                    {tool.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {tool.desc}
                </p>

                {/* Link cue */}
                <span className="mt-5 text-xs font-semibold text-slate-400 transition-colors duration-200 group-hover:text-slate-900">
                  Check yours →
                </span>
              </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile: view all */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/tools"
              className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              View all tools →
            </Link>
          </div>

        </div>
      </motion.section>

      {/* ─── CATEGORY STRIP ────────────────────────────────────────────────── */}
      <motion.section
        className="border-y border-slate-100 bg-slate-50/60 px-6 py-16 sm:px-12 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={0.1}
      >
        <div className="mx-auto max-w-6xl">

          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Explore
            </p>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Explore by category
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <motion.div
                key={cat.label}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href={cat.href}
                  className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:shadow-md"
                >
                  <span className="text-base">{cat.emoji}</span>
                  {cat.label}
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ─── TRUST / VALUE ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-12 sm:py-24 lg:px-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Why Worthulator
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why use Worthulator?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-950 px-6 py-20 sm:px-12 sm:py-24 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Start exploring and see what your numbers really mean
          </h2>
          <p className="mt-4 text-slate-400">
            Every calculator is free, instant, and built to give you a clearer picture.
          </p>
          <motion.div
            className="mt-8 inline-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link
              href="/tools"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-10 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-400"
            >
              Browse All Calculators →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER LINE ───────────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 px-6 py-6 text-center text-sm font-medium tracking-wide text-slate-400">
        Estimates only · Not financial advice · Always worth knowing your numbers.
      </div>

    </div>
  );
}

