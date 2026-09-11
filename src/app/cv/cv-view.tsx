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
import { EXPERIENCE } from "@/data/constants";
import projects from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Versione web del curriculum. Il documento *autoritativo* è il PDF reale in
 * /public (config.cv): è quello che il bottone consegna a chi scarica, ed è
 * quello che conta quando il CV finisce in mano a un recruiter. Questa pagina
 * è la sua trasposizione leggibile e indicizzabile, quindi i testi qui sotto
 * sono trascritti dal PDF e vanno riallineati a mano ogni volta che il PDF
 * cambia — meglio due file da tenere in pari che una pagina che promette
 * qualcosa di diverso dal file scaricato.
 *
 * Niente più "Salva come PDF" via window.print(): generava un *secondo* PDF,
 * diverso da quello ufficiale. Il print stylesheet resta comunque valido se
 * qualcuno stampa la pagina dal browser.
 *
 * Le skill sono stringhe semplici, non il `SkillNames`/`SKILLS` della
 * tastiera: quell'enum è legato a ciò che è fisicamente inciso sui tasti del
 * modello 3D, una preoccupazione diversa (e molto più volatile) da "cosa va
 * scritto sul CV". Condividerlo significava che un rimescolamento della
 * tastiera poteva riscrivere in silenzio le competenze dichiarate.
 */

/** Trascritto dal PDF — sezione PROFILO. */
const PROFILE =
  "Studente di Informatica all'Unical (DEMACS) con il pallino per le interfacce fuori dagli schemi. Costruisco applicazioni intere, dal database al pixel che l'utente tocca per primo: ho sviluppato e consegnato il sito e il gestionale di una pizzeria vera, ho fatto assistenza tecnica dal vivo sotto pressione, e all'università ho affrontato progetti via via più grandi, fino a un sistema a microservizi con app Android nativa realizzato in team. Cerco la mia prima occasione come sviluppatore full-stack junior.";

/** Trascritte dal PDF — sezione COMPETENZE TECNICHE. */
const SKILL_GROUPS: { title: string; skills: string[] }[] = [
  {
    title: "Linguaggi",
    skills: [
      "Java",
      "TypeScript",
      "JavaScript",
      "Kotlin",
      "Python",
      "C++",
      "C",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Spring Boot",
      "Spring Security",
      "JWT",
      "OAuth2/OIDC",
      "REST API",
      "Microservizi",
      "WebSocket",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "Angular",
      "React",
      "Next.js",
      "Tailwind CSS",
      "GSAP",
      "Three.js/Spline",
    ],
  },
  {
    title: "Mobile",
    skills: ["Kotlin", "Jetpack Compose"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "SQLite"],
  },
  {
    title: "Desktop UI",
    skills: ["JavaFX", "Java Swing"],
  },
  {
    title: "DevOps & Tool",
    skills: [
      "Docker",
      "Git/GitHub",
      "Vercel",
      "Render",
      "Keycloak",
      "RabbitMQ",
      "Maven",
    ],
  },
];

/** Trascritte dal PDF — sezione LINGUE. */
const LANGUAGES: { name: string; level: string }[] = [
  { name: "Italiano", level: "Madrelingua" },
  { name: "Inglese", level: "B2" },
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
            {PROFILE}
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
                  {group.skills.join(" · ")}
                </p>
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
