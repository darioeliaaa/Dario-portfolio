export const opacity = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 }
  }
};

// L'uscita sposta il pannello con una trasformazione (`y`), non con `top`:
// animare `top` forza il layout a ogni fotogramma e il browser lo registra come
// spostamento di layout (CLS ~0,5 sul sito), mentre `transform` resta sulla GPU.
export const slideUp = {
  initial: {
    y: 0,
    pointerEvents: "auto" as const,
  },
  exit: {
    y: '-100dvh',
    // Not a value Framer Motion can interpolate, so it's applied immediately
    // once the exit starts rather than tweened alongside `top` — meaning it
    // stops this full-screen overlay from blocking every click/tap even if
    // the slide-up itself never gets to finish (a backgrounded/throttled tab
    // during load can leave rAF-driven tweens — this one included — stuck).
    pointerEvents: "none" as const,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
  }
};
