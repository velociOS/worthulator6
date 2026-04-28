"use client";

import { useRouter } from "next/navigation";

interface Props {
  current: "us" | "uk";
}

const PAGES = {
  us: "/tools/pi-calculator",
  uk: "/tools/personal-injury-calculator-uk",
};

export default function RegionToggle({ current }: Props) {
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex w-full items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 sm:w-auto">
        <button
          type="button"
          onClick={() => current !== "us" && router.push(PAGES.us)}
          className={`flex-1 rounded-full px-4 py-1.5 text-center text-xs font-semibold transition-colors sm:flex-none ${
            current === "us"
              ? "bg-white text-slate-900"
              : "text-slate-400 hover:text-white"
          }`}
        >
          🇺🇸 United States
        </button>
        <button
          type="button"
          onClick={() => current !== "uk" && router.push(PAGES.uk)}
          className={`flex-1 rounded-full px-4 py-1.5 text-center text-xs font-semibold transition-colors sm:flex-none ${
            current === "uk"
              ? "bg-white text-slate-900"
              : "text-slate-400 hover:text-white"
          }`}
        >
          🇬🇧 United Kingdom
        </button>
      </div>
      <p className="text-xs text-slate-500">
        Looking for a different region?{" "}
        <button
          type="button"
          onClick={() => router.push(current === "us" ? PAGES.uk : PAGES.us)}
          className="font-medium text-slate-300 underline underline-offset-2 hover:text-white"
        >
          Switch to {current === "us" ? "UK" : "US"} version
        </button>
      </p>
    </div>
  );
}
