import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
  /** Max width constraint */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Center content horizontally */
  center?: boolean;
  className?: string;
}

const sizeClass: Record<string, string> = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  full: "max-w-none",
};

export default function ContentContainer({
  children,
  size = "xl",
  center = true,
  className,
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        sizeClass[size],
        center && "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
