"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** Thin reading-progress rail pinned above the header. */
export default function ScrollProgress({ className }: { className?: string }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden
            className={cn(
                // Above the header (z-[1000]) so it's never clipped by it.
                "no-print pointer-events-none fixed inset-x-0 top-0 z-[1001] h-[3px] origin-left bg-spark",
                className
            )}
            style={{ scaleX }}
        />
    );
}
