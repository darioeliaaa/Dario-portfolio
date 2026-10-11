"use client";

import { useSyncExternalStore } from "react";

/**
 * Stato della tastiera 3D condiviso tra chi la monta (AnimatedBackground) e chi
 * deve sapere se c'è davvero (la sezione Competenze, per decidere tra la
 * tastiera e la griglia 2D).
 *
 *   "loading"  → non ancora pronta (o non montata): si presume che arrivi
 *   "ready"    → il motore gira e la tastiera è a schermo
 *   "failed"   → niente WebGL, errore del motore o chunk non scaricabile:
 *                la pagina deve cavarsela da sola in 2D
 */
export type Keyboard3DStatus = "loading" | "ready" | "failed";

let status: Keyboard3DStatus = "loading";
const listeners = new Set<() => void>();

export function setKeyboard3DStatus(next: Keyboard3DStatus) {
  if (next === status) return;
  status = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = (): Keyboard3DStatus => status;
const getServerSnapshot = (): Keyboard3DStatus => "loading";

export function useKeyboard3DStatus(): Keyboard3DStatus {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
