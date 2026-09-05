"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePerfProfile } from "@/hooks/use-perf-profile";

/**
 * Cycles through a list of strings with a vertical swap.
 *
 * Reserves the tallest line's height so the surrounding layout never shifts,
 * and falls back to the first (static) entry when the user prefers reduced
 * motion — a looping animation next to the name would otherwise be
 * unavoidable for them.
 */
export function RotatingText({
  items,
  interval = 2600,
  className,
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const { reducedMotion } = usePerfProfile();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || items.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      interval
    );
    return () => clearInterval(id);
  }, [items.length, interval, reducedMotion]);

  if (reducedMotion) {
    return <span className={className}>{items[0]}</span>;
  }

  return (
    <span className={cn("relative inline-block align-bottom", className)}>
      {/* Invisible sizer: keeps the box as wide/tall as the longest entry. */}
      <span aria-hidden className="invisible block whitespace-nowrap">
        {items.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      {/* Keyed remount rather than AnimatePresence: an exit animation that gets
          paused (backgrounded tab, throttled RAF) leaves AnimatePresence
          waiting forever and the line renders blank. Remounting can only ever
          animate *in*. */}
      <motion.span
        key={items[index]}
        initial={{ y: "0.5em", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 whitespace-nowrap"
      >
        {items[index]}
      </motion.span>
    </span>
  );
}

export default RotatingText;
