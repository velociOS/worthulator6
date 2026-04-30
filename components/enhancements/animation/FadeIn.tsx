"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Direction to fade in from */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance to travel in px */
  distance?: number;
  /** Only animate once */
  once?: boolean;
  className?: string;
}

const directionOffset = (
  direction: FadeInProps["direction"],
  distance: number
): { x?: number; y?: number } => {
  switch (direction) {
    case "up":    return { y: distance };
    case "down":  return { y: -distance };
    case "left":  return { x: distance };
    case "right": return { x: -distance };
    default:      return {};
  }
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.45,
  direction = "up",
  distance = 20,
  once = true,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  const offset = directionOffset(direction, distance);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
