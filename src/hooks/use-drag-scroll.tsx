"use client";

import { useRef } from "react";

/**
 * Manual pointer-driven horizontal drag-to-scroll, for containers where the
 * browser's own native touch-scroll can't be trusted to kick in — this app
 * has Lenis, GSAP-driven section transforms and Framer Motion all reaching
 * into scroll/gesture handling at once, and after several rounds of
 * touch-action/data-lenis-prevent/transform fixes the mobile project and
 * pricing carousels still wouldn't respond to a real swipe. This bypasses
 * that stack entirely: `touch-action: none` on the element (set by the
 * caller) tells the browser not to try recognizing the gesture itself, and
 * every pixel of scroll comes from directly setting `scrollLeft` here.
 *
 * On release, animates to whichever card is closest to centered — the CSS
 * `snap-*` classes only engage for scroll driven by the browser's own
 * gesture handling, not for `element.scrollLeft = x` assignments, so a plain
 * drag would otherwise leave the strip parked at an arbitrary offset instead
 * of aligned on a card.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const drag = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
  });

  const onPointerDown = (e: React.PointerEvent<T>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
    };
  };

  const onPointerMove = (e: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!drag.current.active || !el || e.pointerId !== drag.current.pointerId) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.startScrollLeft - dx;
  };

  const snapToNearest = () => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest: HTMLElement | null = null;
    let nearestDist = Infinity;
    for (const child of Array.from(el.children)) {
      const item = child as HTMLElement;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(itemCenter - center);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = item;
      }
    }
    if (nearest) {
      const target = nearest.offsetLeft + nearest.offsetWidth / 2 - el.clientWidth / 2;
      el.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  const endDrag = (e: React.PointerEvent<T>) => {
    if (!drag.current.active || e.pointerId !== drag.current.pointerId) return;
    drag.current.active = false;
    snapToNearest();
  };

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };
}
