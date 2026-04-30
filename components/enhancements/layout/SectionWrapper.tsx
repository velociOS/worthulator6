import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  /** Background variant */
  bg?: "white" | "gray" | "dark" | "none";
  /** Vertical padding size */
  spacing?: "sm" | "md" | "lg" | "xl";
  /** Top border divider */
  divider?: boolean;
  className?: string;
  id?: string;
}

const bgClass: Record<string, string> = {
  white: "bg-white",
  gray: "bg-gray-50",
  dark: "bg-slate-900",
  none: "",
};

const spacingClass: Record<string, string> = {
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-24",
};

export default function SectionWrapper({
  children,
  bg = "white",
  spacing = "lg",
  divider = false,
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        bgClass[bg],
        spacingClass[spacing],
        divider && "border-t border-gray-100",
        "px-5 sm:px-8 lg:px-16",
        className
      )}
    >
      {children}
    </section>
  );
}
