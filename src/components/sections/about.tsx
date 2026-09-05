"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Code2, Boxes, Sparkles, GraduationCap, ArrowUpRight } from "lucide-react";
import { config } from "@/data/config";
import { SKILLS } from "@/data/constants";
import projects from "@/data/projects";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Button } from "../ui/button";
import { AnimatedCounter } from "../ui/animated-counter";

const FOCUS = [
  {
    icon: Code2,
    title: "Frontend",
    desc: "Interfacce reattive con Angular, React e Next.js. Attenzione maniacale a dettagli, accessibilità e micro-interazioni.",
  },
  {
    icon: Boxes,
    title: "Backend",
    desc: "API REST solide in Java e Spring Boot, database relazionali progettati per reggere davvero il carico.",
  },
  {
    icon: Sparkles,
    title: "Web 3D & Motion",
    desc: "Scene interattive, animazioni scroll-driven e quel tocco in più che fa ricordare un sito.",
  },
];

/** Split the bio into paragraphs so it doesn't read as one intimidating block. */
const BIO = config.description.long
  .split(". ")
  .reduce<string[]>((acc, sentence, i) => {
    const idx = i < 2 ? 0 : 1;
    acc[idx] = (acc[idx] ? acc[idx] + " " : "") + sentence.replace(/\.?$/, ".");
    return acc;
  }, []);

const STATS = [
  { value: 23, suffix: "", label: "anni" },
  { value: projects.length, suffix: "", label: "progetti" },
  { value: Object.keys(SKILLS).length, suffix: "+", label: "tecnologie" },
  { value: 2023, suffix: "", label: "dal" },
];

const AboutSection = () => {
  return (
    <SectionWrapper
      id="about"
      className="relative flex w-full flex-col justify-center overflow-hidden px-4 py-24 md:py-32"
    >
      <span
        aria-hidden
        className="glow-orb left-1/2 top-0 h-[24rem] w-[36rem] -translate-x-1/2 bg-spark-2/10 dark:bg-spark-2/15"
      />

      <SectionHeader
        id="about"
        eyebrow="Chi sono"
        index={1}
        title="Dietro al codice"
        desc="Uno studente di Informatica che tratta ogni progetto come se fosse il proprio."
        className="static mb-12 md:mb-16"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto mx-auto w-full max-w-5xl overflow-hidden rounded-2xl surface"
        )}
      >
        <div className="grid gap-8 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-10">
          {/* Identity tile — a photo when one is configured, otherwise a
              monogram so the layout never shows a broken/placeholder image. */}
          <div className="mx-auto w-fit md:mx-0">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-border bg-secondary/40 md:h-40 md:w-40">
              {config.avatar ? (
                <Image
                  src={config.avatar}
                  alt={config.author}
                  fill
                  sizes="160px"
                  className="object-cover"
                  priority={false}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                      backgroundSize: "12px 12px",
                    }}
                  />
                  <span className="relative font-display text-4xl font-bold tracking-tight text-gradient md:text-5xl">
                    {config.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground md:justify-start">
              <GraduationCap className="h-3.5 w-3.5" />
              Unical · DEMACS
            </div>
          </div>

          <div>
            {BIO.map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  "text-base leading-relaxed text-muted-foreground",
                  i > 0 && "mt-4"
                )}
              >
                {paragraph}
              </p>
            ))}

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="group bg-card px-4 py-4 text-center transition-colors duration-300 hover:bg-secondary/30"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="block font-display text-2xl font-bold leading-none tabular-nums transition-colors group-hover:text-accent-gradient md:text-3xl"
                    />
                    <span className="mt-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="grid gap-px border-t border-border bg-border md:grid-cols-3">
          {FOCUS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative bg-card p-6 transition-colors duration-300 hover:bg-secondary/40"
            >
              <span className="accent-gradient inline-flex h-10 w-10 items-center justify-center rounded-xl opacity-90 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-3 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto mt-8 flex w-full max-w-5xl justify-center md:justify-end">
        <Link href="/cv">
          <Button variant="outline">
            Curriculum completo
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
