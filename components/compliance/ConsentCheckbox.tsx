import Link from "next/link";
import type { UseFormRegister, FieldError } from "react-hook-form";

interface ConsentCheckboxProps {
  /** react-hook-form register output for the "consent" field */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  /** Field error from react-hook-form */
  error?: FieldError;
}

/**
 * ConsentCheckbox
 *
 * Required consent checkbox for all lead-gen / data-collection forms.
 * Blocks form submission unless checked.
 *
 * Wires directly to react-hook-form. The form's schema MUST include a
 * `consent: boolean` field (required: true).
 *
 * Usage:
 *   const { register, formState: { errors } } = useForm(...)
 *   <ConsentCheckbox register={register} error={errors.consent} />
 */
export default function ConsentCheckbox({
  register,
  error,
}: ConsentCheckboxProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id="consent-terms"
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-emerald-600"
          {...register("consent", {
            required: "You must agree to the terms to continue",
          })}
        />
        <label
          htmlFor="consent-terms"
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
          constitute professional advice. <span className="text-red-500">*</span>
        </label>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
}
