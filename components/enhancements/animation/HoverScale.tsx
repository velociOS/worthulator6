"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverScaleProps {
  children: ReactNode;
  /** Scale factor on hover (e.g. 1.03) */
  scale?: number;
  /** Scale factor on tap/click */
  tapScale?: number;
  /** Transition duration in seconds */
  duration?: number;
  className?: string;
}

export default function HoverScale({
  children,
  scale = 1.03,
  tapScale = 0.97,
  duration = 0.18,
  className,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: tapScale }}
      transition={{ duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
