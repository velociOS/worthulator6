"use client";

/**
 * Client-side loader for PI (UK) StepFlow.
 * `ssr: false` must live inside a Client Component per Next.js lazy-loading docs.
 */
import dynamic from "next/dynamic";

const StepFlowLoader = dynamic(
  () => import("./StepFlow"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-3xl">
        <div className="h-[560px] w-full animate-pulse rounded-2xl bg-slate-800/40" />
      </div>
    ),
  },
);

export default StepFlowLoader;
