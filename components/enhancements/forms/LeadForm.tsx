"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

export interface LeadFormValues {
  name: string;
  email: string;
  message?: string;
  /** Required — user must accept Terms, Privacy Policy, and estimates-only notice */
  consent: boolean;
  /** Optional — user opts in to be contacted by relevant service providers */
  marketingConsent?: boolean;
}

interface LeadFormProps {
  /** Called with validated form data on successful submit */
  onSubmit: SubmitHandler<LeadFormValues>;
  /** Show/hide the free-text message field */
  showMessage?: boolean;
  /** Custom CTA label */
  submitLabel?: string;
  /** Loading/pending state controlled by parent */
  loading?: boolean;
  /** Success state — replaces form with confirmation */
  success?: boolean;
  /** Title shown above the form */
  title?: string;
  /** Subtitle / value proposition */
  subtitle?: string;
}

export default function LeadForm({
  onSubmit,
  showMessage = true,
  submitLabel = "Get in touch",
  loading = false,
  success = false,
  title,
  subtitle,
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    defaultValues: { consent: false, marketingConsent: false },
  });

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
        <p className="text-lg font-bold text-emerald-700">Message sent!</p>
        <p className="mt-2 text-sm text-emerald-600">
          We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {title && (
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      )}
      {subtitle && (
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 space-y-4"
        noValidate
      >
        {/* Name */}
        <div>
          <label
            htmlFor="lf-name"
            className="mb-1.5 block text-xs font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            id="lf-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
              errors.name
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100"
            }`}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="lf-email"
            className="mb-1.5 block text-xs font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            id="lf-email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Optional message */}
        {showMessage && (
          <div>
            <label
              htmlFor="lf-message"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Message{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              id="lf-message"
              rows={3}
              placeholder="How can we help?"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              {...register("message")}
            />
          </div>
        )}

        {/* Required consent — Terms + Privacy + estimates acknowledgement */}
        <div>
          <div className="flex items-start gap-3">
            <input
              id="lf-consent"
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-emerald-600"
              {...register("consent", {
                required: "You must agree to the terms to continue",
              })}
            />
            <label
              htmlFor="lf-consent"
              className="text-xs leading-relaxed text-gray-500"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-semibold text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-semibold text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              , and I understand that all results are estimates only and do not
              constitute professional advice.{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="mt-1 text-xs text-red-500">{errors.consent.message}</p>
          )}
        </div>

        {/* Optional marketing consent — must NOT be pre-checked */}
        <div className="flex items-start gap-3">
          <input
            id="lf-marketing"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-emerald-600"
            {...register("marketingConsent")}
          />
          <label
            htmlFor="lf-marketing"
            className="text-xs leading-relaxed text-gray-500"
          >
            I agree to be contacted by relevant service providers who may be
            able to help with my enquiry. (Optional)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending…" : submitLabel}
        </button>
      </form>
    </div>
  );
}
