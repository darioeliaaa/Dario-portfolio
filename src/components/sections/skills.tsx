"use client";

import type { CSSProperties } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS } from "@/data/constants";
import { SKILL_CATEGORIES, type SkillCategory, type SkillNames } from "@/data/skill-keys";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useKeyboard3DStatus } from "@/hooks/use-keyboard-3d-status";
import { cn } from "@/lib/utils";
import { SkillIcon } from "../keyboard/skill-icon";

const ALL_SKILLS = Object.values(SKILLS);

// Le sette categorie del CV, nello stesso ordine e con gli stessi colori dei
// tasti della tastiera: così la griglia si legge a blocchi come la tastiera.
const SKILL_GROUPS = (Object.keys(SKILL_CATEGORIES) as SkillCategory[]).map(
  (category) => ({
    category,
    ...SKILL_CATEGORIES[category],
    skills: ALL_SKILLS.filter((skill) => skill.category === category),
  }),
);

// Su schermi larghi i gruppi stanno su due colonne (stessa sequenza, letta dall'alto
// in basso); sotto i 1024px le due colonne si impilano e l'ordine non cambia.
const GROUP_COLUMNS = [SKILL_GROUPS.slice(0, 3), SKILL_GROUPS.slice(3)];

const SkillGroup = ({ group }: { group: (typeof SKILL_GROUPS)[number] }) => (
  <div style={{ "--cat": group.color } as CSSProperties}>
    {/* titolo del gruppo: la legenda che lega il blocco al colore dei suoi tasti */}
    <h3 className="mb-3 flex items-center gap-2.5">
      <span
        aria-hidden
        style={{ background: "var(--cat)" }}
        className="h-2.5 w-2.5 shrink-0 rounded-full"
      />
      <span className="text-sm font-semibold tracking-tight">{group.label}</span>
      <span className="text-xs tabular-nums text-muted-foreground">
        {group.skills.length}
      </span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </h3>

    <ul className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-2.5">
      {group.skills.map((skill) => (
        <li
          key={skill.name}
          title={skill.shortDescription}
          style={{ "--skill": skill.color } as CSSProperties}
          className={cn(
            // the section sits inside `.canvas-overlay-mode` (pointer-events
            // disabled so the 3D canvas can be clicked through); re-enable on
            // the whole card so hover isn't limited to the icon/label.
            "pointer-events-auto",
            "group relative flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-2 py-4 md:py-5",
            "border border-border bg-card/60 backdrop-blur-sm",
            "transition-[transform,border-color,background-color,box-shadow] duration-300 ease-smooth",
            "hover:-translate-y-1 hover:border-[var(--skill)] hover:bg-card",
            "hover:shadow-[0_10px_40px_-12px_var(--skill)]",
          )}
        >
          {/* alone del colore della categoria */}
          <span
            aria-hidden
            style={{ background: "var(--skill)" }}
            className="pointer-events-none absolute -top-6 h-16 w-16 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
          />
          <SkillIcon
            id={skill.name as SkillNames}
            colored
            className="relative size-8 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 md:size-9"
          />
          <span className="relative text-balance text-center text-xs font-medium leading-tight text-foreground/80 transition-colors group-hover:text-foreground">
            {skill.label}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Tech-stack section.
 *
 * On capable devices the skills live in the interactive 3D keyboard's keycaps,
 * so this is mostly a header and the section is tall (the keyboard scrubs
 * through it on scroll) — with a marquee pinned near the bottom so the stack is
 * still readable (and indexable) for anyone who never touches the keyboard.
 * When the 3D scene is disabled (low-end / reduced-motion) or couldn't start
 * (no WebGL, engine error), the keyboard isn't there to convey the skills at
 * all — so we render them as a real HTML grid instead. Progressive
 * enhancement: the content survives without WebGL.
 */
const SkillsSection = () => {
  const { disable3D, ready } = usePerfProfile();
  const keyboard3D = useKeyboard3DStatus();
  const showGrid = ready && (disable3D || keyboard3D === "failed");

  if (showGrid) {
    return (
      <SectionWrapper
        id="skills"
        className="flex w-full min-h-screen flex-col justify-center py-24"
      >
        <SectionHeader
          id="skills"
          eyebrow="Competenze"
          index={2}
          title="Stack tecnologico"
          desc="Gli strumenti con cui costruisco, ogni giorno."
          className="static mb-14"
        />
        <div className="mx-auto grid w-full max-w-5xl gap-y-8 px-4 lg:grid-cols-2 lg:gap-x-10">
          {GROUP_COLUMNS.map((groups, i) => (
            <div key={i} className="space-y-8">
              {groups.map((group) => (
                <SkillGroup key={group.category} group={group} />
              ))}
            </div>
          ))}
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="skills"
      className="pointer-events-none w-full h-screen md:h-[150dvh]"
    >
      {/* SectionWrapper renders a `w-full h-full` motion.div around children,
          so the column lives here (one level in) for `mt-auto` to reach the
          bottom of the section. */}
      <div className="flex h-full flex-col">
        <SectionHeader
          id="skills"
          eyebrow="Competenze"
          title="Stack tecnologico"
          desc={
            <>
              Ogni tasto della tastiera è una tecnologia:{" "}
              {/* sul touch non c'è un "sopra": si tocca */}
              <span className="[@media(hover:none)]:hidden">passaci sopra o premine uno.</span>
              <span className="hidden [@media(hover:none)]:inline">toccane uno.</span>
            </>
          }
        />

        {/* Readable (and crawlable) fallback for anyone who never touches the
          3D keyboard — parked at the bottom so it never covers it. */}
        <div className="mt-auto w-full overflow-hidden pb-10 mask-x-fade">
          {/* 37 voci invece di 25: durata allungata per tenere la stessa velocità */}
          <div
            style={{ animationDuration: "60s" }}
            className="flex w-max animate-marquee items-center gap-3 pause-on-hover"
          >
            {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, i) => (
              <span
                key={`${skill.name}-${i}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md"
              >
                <SkillIcon
                  id={skill.name as SkillNames}
                  colored
                  className="h-3.5 w-3.5 shrink-0"
                />
                {skill.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
