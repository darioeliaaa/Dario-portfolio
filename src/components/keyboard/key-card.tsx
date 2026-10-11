"use client";

import type { Ref } from "react";
import { SKILL_CATEGORIES, type SkillNames } from "@/data/skill-keys";
import type { Skill } from "@/data/constants";
import { cn } from "@/lib/utils";
import { SkillIcon } from "./skill-icon";

/**
 * Scheda sotto la tastiera col tasto selezionato (hover, tap o tasto fisico).
 * La posizione la imposta chi la monta (`ref`: serve conoscere dove sta la tastiera
 * sullo schermo); qui c'è solo l'aspetto e l'annuncio per gli screen reader.
 * Il contenuto resta anche quando la scheda si chiude, per non svuotarsi a metà dissolvenza.
 */
export function KeyCard({
  skill,
  open,
  cardRef,
}: {
  skill: Skill | null;
  open: boolean;
  cardRef: Ref<HTMLDivElement>;
}) {
  const category = skill ? SKILL_CATEGORIES[skill.category] : null;

  return (
    <div
      ref={cardRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        // fixed + left/top a 0: la posizione arriva dal transform impostato da fuori
        "pointer-events-none fixed left-0 top-0 z-30 w-[min(21rem,calc(100vw-2rem))]",
        "transition-opacity duration-200 ease-out",
        open ? "opacity-100" : "opacity-0",
      )}
    >
      {skill && category && (
        <div className="surface flex items-start gap-3 rounded-2xl p-3.5">
          <span
            aria-hidden
            style={{ background: skill.color }}
            className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm"
          >
            <SkillIcon id={skill.name as SkillNames} color="#fff" className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="flex flex-wrap items-baseline gap-x-2 leading-tight">
              <span className="font-display text-sm font-semibold text-foreground">
                {skill.label}
              </span>
              <span
                style={{ color: skill.color }}
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              >
                {category.label}
              </span>
            </p>
            <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
              {skill.shortDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
