"use client";

import { useRef } from "react";

const FLICK_VELOCITY = 0.35; // px/ms — above this, a release commits to the next/previous card regardless of how far the drag got.

/**
 * Manual pointer-driven horizontal drag-to-scroll, for containers where the
 * browser's own native touch-scroll can't be trusted to kick in — this app
 * has Lenis, GSAP-driven section transforms and Framer Motion all reaching
 * into scroll/gesture handling at once, and after several rounds of
 * touch-action/data-lenis-prevent/transform fixes the mobile project and
 * pricing carousels still wouldn't respond to a real swipe. This bypasses
 * that stack entirely for the horizontal axis: `touch-action: pan-y` on the
 * element (set by the caller) tells the browser it may still handle
 * *vertical* panning natively — so the page keeps scrolling normally when a
 * drag starts on a card — while leaving horizontal movement uncommitted, so
 * every pixel of *that* axis comes from directly setting `scrollLeft` here.
 *
 * `scrollLeft` writes are batched onto a single rAF per frame rather than
 * applied straight from `pointermove` — writing on every raw event forced a
 * layout on each one and felt visibly stuttery.
 *
 * On release, animates to a target card chosen from both position (nearest
 * to centered) and gesture speed (a fast flick commits to the next/previous
 * card even if the drag itself didn't travel that far) — the CSS `snap-*`
 * classes only engage for scroll driven by the browser's own gesture
 * handling, not for `element.scrollLeft = x` assignments, so alignment has
 * to happen by hand too.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const drag = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    rafId: 0,
    pendingScrollLeft: null as number | null,
  });

  const flushScroll = () => {
    const el = ref.current;
    const d = drag.current;
    d.rafId = 0;
    if (el && d.pendingScrollLeft !== null) {
      el.scrollLeft = d.pendingScrollLeft;
      d.pendingScrollLeft = null;
    }
  };

  const onPointerDown = (e: React.PointerEvent<T>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      lastX: e.clientX,
      lastT: e.timeStamp,
      velocity: 0,
      rafId: 0,
      pendingScrollLeft: null,
    };
  };

  const onPointerMove = (e: React.PointerEvent<T>) => {
    const el = ref.current;
    const d = drag.current;
    if (!d.active || !el || e.pointerId !== d.pointerId) return;

    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;

    d.pendingScrollLeft = d.startScrollLeft - (e.clientX - d.startX);
    if (!d.rafId) d.rafId = requestAnimationFrame(flushScroll);
  };

  const snapToTarget = (velocity: number, startScrollLeft: number) => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (cards.length === 0) return;

    const indexNearest = (scrollLeft: number) => {
      const center = scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    let targetIndex = indexNearest(el.scrollLeft);
    if (Math.abs(velocity) > FLICK_VELOCITY) {
      // A quick flick commits at least one card past wherever the drag
      // *started* — dragging left (negative clientX delta => negative
      // velocity here) advances to the next card, the mirror for the
      // previous one — even if the drag itself only travelled a little way.
      const startIndex = indexNearest(startScrollLeft);
      targetIndex =
        velocity < 0
          ? Math.min(startIndex + 1, cards.length - 1)
          : Math.max(startIndex - 1, 0);
    }

    const card = cards[targetIndex];
    const target = card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const endDrag = (e: React.PointerEvent<T>) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    d.active = false;
    if (d.rafId) {
      cancelAnimationFrame(d.rafId);
      flushScroll();
    }
    snapToTarget(d.velocity, d.startScrollLeft);
  };

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };
}
