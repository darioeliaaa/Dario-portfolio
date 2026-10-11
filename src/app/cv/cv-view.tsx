"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  MapPin,
  Mail,
  Globe,
  Briefcase,
  GraduationCap,
  Languages,
} from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import {
  CASE_NOTE,
  CASE_STUDIES,
  EDUCATION_CV,
  EXPERIENCE_CV,
  GDPR,
  LANGUAGES,
  MAIN_PROJECTS,
  PORTFOLIO_CARD,
  PROFILE,
  ROLE_LINE,
  SKILL_GROUPS,
  UNI_PROJECTS,
  WORK_STYLE,
  type Card,
  type Entry,
  type Part,
} from "./cv-data";

/**
 * Versione web del curriculum. Il documento *autoritativo* è il PDF reale in
 * /public (config.cv): è quello che il bottone consegna a chi scarica, ed è
 * quello che conta quando il CV finisce in mano a un recruiter. Questa pagina
 * è la sua trasposizione leggibile e indicizzabile: i testi stanno in
 * ./cv-data.ts, trascritti dal PDF, e vanno riallineati ogni volta che il PDF
 * cambia — meglio due file da tenere in pari che una pagina che promette
 * qualcosa di diverso dal file scaricato.
 *
 * Niente "Salva come PDF" via window.print(): generava un *secondo* PDF,
 * diverso da quello ufficiale. Il print stylesheet resta comunque valido se
 * qualcuno stampa la pagina dal browser.
 *
 * Le schede progetto del portfolio (src/data/projects.tsx) e l'esperienza
 * della home (src/data/constants.ts) sono un'altra cosa: qui conta solo ciò
 * che c'è scritto nel PDF.
 */

export default function CvView() {
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
          {/* Link diretto al PDF vero, non una stampa della pagina: chi
              scarica deve ritrovarsi in mano esattamente il documento
              ufficiale. `download` impone anche il nome del file salvato.
              È un <a> con lo stile del bottone, non <Button asChild>: quel
              componente inietta `pointer-events-none` in tutti i figli e
              passa un array a Radix Slot, che finirebbe per non renderizzare
              nulla. */}
          <a
            href={config.cv.href}
            download={config.cv.filename}
            className={cn(buttonVariants(), "cursor-can-hover")}
          >
            <Download className="h-4 w-4" />
            Scarica il CV (PDF)
          </a>
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
          <p className="mt-1.5 text-base text-muted-foreground">{ROLE_LINE}</p>

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
            {PROFILE}
          </p>
        </Section>

        <Section title="Esperienza" icon={Briefcase}>
          <div className="flex flex-col gap-5">
            {EXPERIENCE_CV.map((item) => (
              <EntryBlock key={item.title} item={item} />
            ))}
          </div>
        </Section>

        <Section title="Progetti principali">
          <div className="flex flex-col gap-5">
            {MAIN_PROJECTS.map((item) => (
              <EntryBlock key={item.title} item={item} />
            ))}
          </div>
        </Section>

        <Section title="Altri progetti universitari">
          <div className="grid gap-5 sm:grid-cols-2">
            {UNI_PROJECTS.map((item) => (
              <CardBlock key={item.title} item={item} />
            ))}
          </div>
        </Section>

        <Section title="Case study personali">
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {CASE_NOTE}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {CASE_STUDIES.map((item) => (
              <CardBlock key={item.title} item={item} />
            ))}
          </div>
        </Section>

        <Section title="Portfolio">
          <CardBlock item={PORTFOLIO_CARD} />
        </Section>

        <Section title="Competenze">
          <div className="grid gap-4 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed">{group.skills}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Istruzione" icon={GraduationCap}>
          <div className="flex flex-col gap-4">
            {EDUCATION_CV.map((item) => (
              <div key={item.title}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.when}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.org}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Lingue" icon={Languages}>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {LANGUAGES.map((lang) => (
              <p key={lang.name} className="text-sm">
                {lang.name}{" "}
                <span className="text-muted-foreground">— {lang.level}</span>
              </p>
            ))}
          </div>
        </Section>

        <Section title="Come lavoro">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {WORK_STYLE}
          </p>
        </Section>

        <p className="mt-10 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
          {GDPR}
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

/** Testo in linea con eventuali link, come nel PDF. */
const Parts = ({ parts }: { parts: Part[] }) => (
  <>
    {parts.map((part, i) =>
      typeof part === "string" ? (
        <React.Fragment key={i}>{part}</React.Fragment>
      ) : (
        <a
          key={i}
          href={part.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          {part.label}
        </a>
      )
    )}
  </>
);

const EntryBlock = ({ item }: { item: Entry }) => (
  <div>
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <h3 className="text-sm font-semibold">{item.title}</h3>
      <span className="shrink-0 text-xs text-muted-foreground">{item.when}</span>
    </div>
    {item.meta && (
      <p className="text-sm text-muted-foreground">
        <Parts parts={item.meta} />
      </p>
    )}
    {item.bullets && (
      <ul className="mt-2 space-y-1.5">
        {item.bullets.map((bullet, i) => (
          <li
            key={i}
            className="relative pl-4 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden
              className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-muted-foreground/50"
            />
            {bullet.label && (
              <strong className="font-semibold text-foreground">
                {bullet.label}{" "}
              </strong>
            )}
            {bullet.text}
          </li>
        ))}
      </ul>
    )}
    {item.tags && (
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

const CardBlock = ({ item }: { item: Card }) => (
  <div>
    <h3 className="text-sm font-semibold">
      {item.titleLink ? (
        <>
          <a
            href={item.titleLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {item.titleLink.label}
          </a>
          {item.title.replace(item.titleLink.label, "")}
        </>
      ) : (
        item.title
      )}
    </h3>
    {item.meta && (
      <p className="mt-0.5 text-xs text-muted-foreground">
        <Parts parts={item.meta} />
      </p>
    )}
    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
      <Parts parts={item.text} />
      {item.mine && (
        <>
          {" "}
          <strong className="font-semibold text-foreground">
            {item.mine.label}
          </strong>{" "}
          {item.mine.text}
        </>
      )}
    </p>
  </div>
);
