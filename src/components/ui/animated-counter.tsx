"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { usePerfProfile } from "@/hooks/use-perf-profile";

/**
 * Counts up from 0 to `value` once it scrolls into view. A spring rather than
 * a linear tween — it overshoots and settles slightly, reading as far less
 * mechanical than a bare number tick.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { reducedMotion } = usePerfProfile();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (!ref.current) return;
    if (reducedMotion) {
      // No count-up for reduced-motion users — land straight on the value.
      ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, value, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

export default AnimatedCounter;
