"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  currentRegion: "us" | "uk";
}

const PAGES = {
  us: "/tools/pi-calculator",
  uk: "/tools/personal-injury-calculator-uk",
};

/**
 * Detects browser locale and shows a subtle banner if the user might be on
 * the wrong regional version of the calculator.
 * UK locales: en-GB, en-IE, en-AU, en-NZ, en-ZA (broad anglosphere)
 */
function isUKLocale(lang: string) {
  return /^en-(GB|IE|AU|NZ|ZA)/i.test(lang);
}

export default function WrongRegionBanner({ currentRegion }: Props) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const lang = navigator.language || "";
    const userIsUK = isUKLocale(lang);
    // Show banner only when region mismatch is detected
    if (userIsUK && currentRegion === "us") setShow(true);
    if (!userIsUK && currentRegion === "uk") setShow(true);
  }, [currentRegion]);

  if (!show) return null;

  const targetRegion = currentRegion === "us" ? "uk" : "us";
  const label = currentRegion === "us" ? "UK version" : "US version";
  const targetPath = PAGES[targetRegion];

  return (
    <div className="border-b border-blue-100 bg-blue-50 px-4 py-2.5">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
        <p className="text-xs text-blue-700">
          {currentRegion === "us"
            ? "You're viewing the US version."
            : "You're viewing the UK version."}{" "}
          <button
            type="button"
            onClick={() => router.push(targetPath)}
            className="font-semibold underline underline-offset-2 hover:text-blue-900"
          >
            Switch to {label}?
          </button>
        </p>
        <button
          type="button"
          onClick={() => setShow(false)}
          aria-label="Dismiss"
          className="shrink-0 text-blue-400 hover:text-blue-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
