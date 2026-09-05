"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Printer,
  MapPin,
  Mail,
  Globe,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { config } from "@/data/config";
import { EXPERIENCE, SKILLS, SkillNames } from "@/data/constants";
import projects from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Curriculum generated from the same data the homepage uses — one source of
 * truth, so it can never drift out of date. "Salva PDF" goes through the
 * browser's own print dialog (see the @media print block in globals.css), which
 * means there's no binary to keep in sync either.
 */

const SKILL_GROUPS: { title: string; skills: SkillNames[] }[] = [
  {
    title: "Linguaggi",
    skills: [SkillNames.JS, SkillNames.TS, SkillNames.HTML, SkillNames.CSS],
  },
  {
    title: "Frontend",
    skills: [
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.VUE,
      SkillNames.TAILWIND,
    ],
  },
  {
    title: "Backend & Dati",
    skills: [
      SkillNames.NODE,
      SkillNames.EXPRESS,
      SkillNames.POSTGRES,
      SkillNames.MONGODB,
      SkillNames.PRISMA,
    ],
  },
  {
    title: "Tooling & Cloud",
    skills: [
      SkillNames.GIT,
      SkillNames.GITHUB,
      SkillNames.DOCKER,
      SkillNames.LINUX,
      SkillNames.NGINX,
      SkillNames.VERCEL,
      SkillNames.AWS,
    ],
  },
];

export default function CvView() {
  const education = EXPERIENCE.filter((e) => e.kind === "education");
  const work = EXPERIENCE.filter((e) => e.kind === "work");

  return (
    <div className="min-h-screen font-sans">
      {/* Toolbar */}
      <div className="no-print mx-auto w-full max-w-3xl px-4 pt-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al portfolio
          </Link>
          <Button onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Salva come PDF
          </Button>
        </motion.div>
      </div>

      {/* Document */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="print-plain mx-auto mb-24 w-full max-w-3xl rounded-2xl border border-border bg-card p-7 shadow-float md:p-12"
      >
        {/* Head */}
        <header className="border-b border-border pb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {config.author}
          </h1>
          <p className="mt-1.5 text-base text-muted-foreground">{config.role}</p>

          <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {config.location}
            </li>
            {config.email && (
              <li className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <a href={`mailto:${config.email}`} className="hover:text-foreground">
                  {config.email}
                </a>
              </li>
            )}
            <li className="inline-flex items-center gap-1.5">
              <SiGithub className="h-3.5 w-3.5" />
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                github.com/{config.githubUsername}
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <SiLinkedin className="h-3.5 w-3.5" />
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              <a
                href={config.site}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Portfolio
              </a>
            </li>
          </ul>
        </header>

        <Section title="Profilo">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {config.description.long}
          </p>
        </Section>

        {education.length > 0 && (
          <Section title="Formazione" icon={GraduationCap}>
            <div className="flex flex-col gap-5">
              {education.map((item) => (
                <EntryBlock key={item.id} item={item} />
              ))}
            </div>
          </Section>
        )}

        {work.length > 0 && (
          <Section title="Esperienza" icon={Briefcase}>
            <div className="flex flex-col gap-5">
              {work.map((item) => (
                <EntryBlock key={item.id} item={item} />
              ))}
            </div>
          </Section>
        )}

        <Section title="Competenze tecniche">
          <div className="grid gap-4 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed">
                  {group.skills.map((s) => SKILLS[s].label).join(" · ")}
                </p>
              </div>
            ))}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Altro
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed">
                Java · Spring Boot · Angular · JavaFX · SQLite · Spline (Web 3D)
              </p>
            </div>
          </div>
        </Section>

        <Section title="Progetti selezionati">
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-sm font-semibold">{project.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {project.category}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {[
                    ...(project.skills.frontend ?? []),
                    ...(project.skills.backend ?? []),
                  ]
                    .map((s) => s.title)
                    .join(" · ")}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-foreground"
                    >
                      Sito
                    </a>
                  )}
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-foreground"
                    >
                      Codice
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <p className="mt-10 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
          Autorizzo il trattamento dei miei dati personali ai sensi del Reg. UE
          2016/679 (GDPR) e del D.Lgs. 196/2003.
        </p>
      </motion.article>
    </div>
  );
}

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <section className="mt-8">
    <h2 className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {title}
    </h2>
    {children}
  </section>
);

const EntryBlock = ({ item }: { item: (typeof EXPERIENCE)[number] }) => (
  <div>
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <h3 className="text-sm font-semibold">{item.title}</h3>
      <span className="shrink-0 text-xs text-muted-foreground">
        {item.startDate} — {item.endDate}
      </span>
    </div>
    <p className="text-sm text-muted-foreground">{item.company}</p>
    <ul className={cn("mt-2 space-y-1.5")}>
      {item.description.map((point, i) => (
        <li
          key={i}
          className="relative pl-4 text-sm leading-relaxed text-muted-foreground"
        >
          <span
            aria-hidden
            className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-muted-foreground/50"
          />
          {point}
        </li>
      ))}
    </ul>
  </div>
);
