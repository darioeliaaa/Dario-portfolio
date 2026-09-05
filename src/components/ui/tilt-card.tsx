"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Wraps children in a card that tilts toward the cursor (perspective +
 * rotateX/rotateY) and carries a soft radial "sheen" that follows the
 * pointer — the tactile, premium-feeling hover every high-end portfolio
 * leans on for its project grid. Springs everything, so it settles instead
 * of snapping; falls back to a plain static card under reduced motion.
 *
 * Skipped on mobile entirely, not just visually inert: there's no cursor to
 * track, so it's pure downside there — a `transform` (even the identity
 * `perspective(900px) rotateX(0) rotateY(0)` this sits at when nothing is
 * hovering) on an ancestor breaks iOS Safari's handling of drag gestures and
 * input focus for anything nested inside it. Confirmed on real devices: it
 * silently broke the mobile carousels' swipe and made the contact form's
 * fields impossible to focus.
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
  const isMobile = useMediaQuery("(max-width: 767px)");

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

  const disableTilt = reducedMotion || isMobile;

  return (
    <motion.div
      // Forces a full remount when `disableTilt` flips instead of patching
      // props on the same instance — `isMobile`/`reducedMotion` both start
      // out `false` for one render before their detection effects resolve,
      // and a prop update that just stops mentioning rotateX/rotateY doesn't
      // necessarily clear the `transform` those already wrote, leaving the
      // card stuck mid-tilt (visually scaled/skewed) instead of flat.
      key={disableTilt ? "flat" : "tilt"}
      ref={ref}
      onMouseMove={disableTilt ? undefined : handleMove}
      onMouseLeave={disableTilt ? undefined : handleLeave}
      // Omitting rotateX/rotateY/transformPerspective entirely on mobile
      // (not just zeroing them) matters: Framer Motion writes a `transform`
      // string onto the element as soon as any of these keys are present in
      // `style`, even in their neutral 0deg/perspective(900px) state.
      style={disableTilt ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={cn("group/tilt relative", className)}
    >
      {children}
      {!disableTilt && (
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
