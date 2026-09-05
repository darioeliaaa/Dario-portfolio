"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const SectionWrapper = ({ id, className, children, ...props }: SectionWrapperProps) => {
  const containerRef = useRef<HTMLElement>(null);
  // A `transform` on this wrapper (even a no-op `scale(1)` — Framer Motion
  // still writes the CSS property once the style is set at all) sits on top
  // of every horizontally-scrollable strip and every form field in every
  // section, and iOS Safari has real, documented issues recognizing drag
  // gestures and focusing inputs through a transformed ancestor: the mobile
  // project/pricing carousels wouldn't swipe and the contact form wouldn't
  // even focus. Skip the transform on mobile — the fade/scale reveal is a
  // nice-to-have there, working touch input isn't optional.
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        // `key` forces a full remount when `isMobile` flips instead of just
        // patching props on the same instance — otherwise the very first
        // render (before the media-query effect resolves, always `false`
        // initially) can apply a `transform` that a later prop update simply
        // stops mentioning rather than actually clearing, leaving the
        // section stuck scaled down forever on mobile.
        key={isMobile ? "mobile" : "desktop"}
        style={isMobile ? { opacity } : { opacity, scale }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
