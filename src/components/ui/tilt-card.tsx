"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { usePerfProfile } from "@/hooks/use-perf-profile";

/**
 * Wraps children in a card that tilts toward the cursor (perspective +
 * rotateX/rotateY) and carries a soft radial "sheen" that follows the
 * pointer — the tactile, premium-feeling hover every high-end portfolio
 * leans on for its project grid. Springs everything, so it settles instead
 * of snapping; falls back to a plain static card under reduced motion.
 */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = usePerfProfile();

  // Pointer position as 0–1 fractions of the card, for the sheen's origin.
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const springPx = useSpring(px, { stiffness: 200, damping: 24 });
  const springPy = useSpring(py, { stiffness: 200, damping: 24 });
  const sheen = useMotionTemplate`radial-gradient(480px circle at ${springPx}% ${springPy}%, hsl(var(--foreground) / 0.08), transparent 60%)`;

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const fracX = (e.clientX - rect.left) / rect.width;
    const fracY = (e.clientY - rect.top) / rect.height;
    px.set(fracX * 100);
    py.set(fracY * 100);
    rotateY.set((fracX - 0.5) * 10);
    rotateX.set((0.5 - fracY) * 10);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformPerspective: 900,
      }}
      className={cn("group/tilt relative", className)}
    >
      {children}
      {!reducedMotion && (
        <motion.span
          aria-hidden
          style={{ backgroundImage: sheen }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
    </motion.div>
  );
}

export default TiltCard;
