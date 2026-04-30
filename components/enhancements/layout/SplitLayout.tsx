import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SplitLayoutProps {
  /** Left/top content (typically text) */
  text: ReactNode;
  /** Right/bottom content (typically image or visual) */
  visual: ReactNode;
  /** Which side the visual appears on — desktop only */
  visualSide?: "left" | "right";
  /** Vertical alignment */
  align?: "start" | "center" | "end";
  /** Ratio: text takes this fraction of the grid */
  textSpan?: "half" | "third" | "twoThirds";
  className?: string;
}

const textSpanClass: Record<string, string> = {
  half: "lg:col-span-1",
  third: "lg:col-span-1",
  twoThirds: "lg:col-span-2",
};

const visualSpanClass: Record<string, string> = {
  half: "lg:col-span-1",
  third: "lg:col-span-2",
  twoThirds: "lg:col-span-1",
};

const gridCols: Record<string, string> = {
  half: "lg:grid-cols-2",
  third: "lg:grid-cols-3",
  twoThirds: "lg:grid-cols-3",
};

const alignClass: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

export default function SplitLayout({
  text,
  visual,
  visualSide = "right",
  align = "center",
  textSpan = "half",
  className,
}: SplitLayoutProps) {
  const textEl = (
    <div className={textSpanClass[textSpan]}>{text}</div>
  );
  const visualEl = (
    <div className={visualSpanClass[textSpan]}>{visual}</div>
  );

  return (
    <div
      className={cn(
        "grid gap-8",
        gridCols[textSpan],
        alignClass[align],
        className
      )}
    >
      {visualSide === "right" ? (
        <>
          {textEl}
          {visualEl}
        </>
      ) : (
        <>
          {visualEl}
          {textEl}
        </>
      )}
    </div>
  );
}
