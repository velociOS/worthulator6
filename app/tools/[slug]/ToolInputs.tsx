"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { getLocale, formatCurrency, type Locale } from "@/src/lib/locale";

export default function ToolInputs() {
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number[]>([5]);
  const [locale, setLocaleState] = useState<Locale>("US");

  // Read locale from localStorage after mount
  useEffect(() => {
    setLocaleState(getLocale());
    const handler = () => setLocaleState(getLocale());
    window.addEventListener("worthulator:locale", handler);
    return () => window.removeEventListener("worthulator:locale", handler);
  }, []);

  const symbol = locale === "US" ? "$" : "£";

  const yearly  = amount * (rate[0] / 100);
  const monthly = yearly / 12;
  const daily   = yearly / 365;

  return (
    <>
      <div className="mt-4 space-y-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount ({symbol})
          </label>
          <input
            id="amount"
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            Rate: <span className="font-semibold">{rate[0]}%</span>
          </label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={rate}
            onValueChange={setRate}
          />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">Results</h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-6xl font-bold tracking-tight text-gray-900">{formatCurrency(yearly, locale)}</p>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <dt className="text-sm text-gray-500">Yearly</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(yearly, locale)}</dd>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <dt className="text-sm text-gray-500">Monthly</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(monthly, locale)}</dd>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <dt className="text-sm text-gray-500">Daily</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(daily, locale)}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
