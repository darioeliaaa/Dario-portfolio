"use client";

import { EXPERIENCE, SkillNames, SKILLS, type Experience } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

const ExperienceSection = () => {
  return (
    <SectionWrapper
      id="experience"
      className="flex flex-col items-center justify-center py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
        <SectionHeader
          id="experience"
          eyebrow="Percorso"
          index={3}
          title="Formazione & Esperienza"
          desc="Dove ho studiato, cosa ho costruito e cosa mi ha portato fin qui."
          className="static mb-14 md:mb-20"
        />

        {/* One continuous rail on the left; every entry hangs off it. The old
            layout put the rail at 50% *behind* full-width cards, so it only
            ever showed as a stray line crossing the text. */}
        <ol className="relative flex flex-col gap-6 md:gap-8">
          <span
            aria-hidden
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-[15px]"
          />
          {EXPERIENCE.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  const Icon = experience.kind === "work" ? Briefcase : GraduationCap;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className="relative pl-10 md:pl-14"
    >
      {/* Rail node */}
      <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background md:h-8 md:w-8">
        <Icon className="h-3 w-3 text-muted-foreground md:h-3.5 md:w-3.5" />
        {experience.current && (
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-spark" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-spark ring-2 ring-background" />
          </span>
        )}
      </span>

      <article
        className={cn(
          "pointer-events-auto rounded-xl border border-border bg-card/70 p-5 backdrop-blur-md md:p-6",
          "lift"
        )}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight tracking-tight md:text-xl">
              {experience.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground md:text-base">
              {experience.company}
            </p>
          </div>

          <span
            className={cn(
              "w-fit shrink-0 rounded-full border px-3 py-1 text-[11px] tracking-wide",
              experience.current
                ? "border-spark/40 bg-spark-soft text-foreground"
                : "border-border text-muted-foreground"
            )}
          >
            {experience.startDate} — {experience.endDate}
          </span>
        </div>

        <ul className="mt-4 space-y-2.5">
          {experience.description.map((point, i) => (
            <li
              key={i}
              className="relative pl-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-muted-foreground/50"
              />
              {point}
            </li>
          ))}
        </ul>

        {experience.skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {experience.skills.map((skillName) => {
              const skill = SKILLS[skillName as SkillNames];
              if (!skill) return null;
              return (
                <span
                  key={skillName}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-3.5 w-3.5 object-contain"
                  />
                  {skill.label}
                </span>
              );
            })}
          </div>
        )}
      </article>
    </motion.li>
  );
};

export default ExperienceSection;
