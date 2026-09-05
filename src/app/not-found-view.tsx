"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePerfProfile } from "@/hooks/use-perf-profile";

export default function NotFoundView() {
  const { disable3D, ready } = usePerfProfile();

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* The 3D scene is decoration only — it's skipped entirely on reduced
          motion / data-saver, where the copy below carries the whole page. */}
      {ready && !disable3D && (
        <Suspense fallback={null}>
          <div aria-hidden className="absolute inset-0">
            <Spline scene="/assets/404.spline" style={{ height: "100dvh" }} />
          </div>
        </Suspense>
      )}

      <div className="pointer-events-none relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow">Errore 404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
          Questa pagina non esiste
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Il link potrebbe essere vecchio o sbagliato. Torna alla home: lì c&apos;è
          tutto quello che cerchi (e una tastiera 3D con cui giocare).
        </p>

        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button size="lg">
              <ArrowLeft className="h-4 w-4" />
              Torna alla home
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="outline" size="lg">
              <Mail className="h-4 w-4" />
              Contattami
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
