import Link from "next/link";

interface DisclaimerBlockProps {
  /** Additional className for the wrapper */
  className?: string;
}

/**
 * DisclaimerBlock
 *
 * Renders the standard estimates-only disclaimer beneath every calculator result.
 * Drop this component anywhere you display calculation outputs.
 *
 * Usage:
 *   <DisclaimerBlock />
 */
export default function DisclaimerBlock({ className }: DisclaimerBlockProps) {
  return (
    <div
      className={`rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 ${className ?? ""}`}
    >
      <p className="text-xs leading-relaxed text-amber-800">
        <span className="font-semibold">Estimates only</span> — these results are
        estimates and may not reflect actual costs or outcomes. No financial, legal,
        medical, or professional advice is provided. Always consult a qualified
        professional before making decisions.{" "}
        <Link
          href="/disclaimer"
          className="underline underline-offset-2 hover:text-amber-900"
        >
          Full disclaimer
        </Link>
        .
      </p>
    </div>
  );
}
