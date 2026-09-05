"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      Torna su
      <ArrowUp className="h-3.5 w-3.5" />
    </button>
  );
}
