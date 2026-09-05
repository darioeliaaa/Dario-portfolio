export const opacity = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 }
  }
};

export const slideUp = {
  initial: {
    top: 0,
    pointerEvents: "auto" as const,
  },
  exit: {
    top: '-100dvh',
    // Not a value Framer Motion can interpolate, so it's applied immediately
    // once the exit starts rather than tweened alongside `top` — meaning it
    // stops this full-screen overlay from blocking every click/tap even if
    // the slide-up itself never gets to finish (a backgrounded/throttled tab
    // during load can leave rAF-driven tweens — this one included — stuck).
    pointerEvents: "none" as const,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
  }
};
