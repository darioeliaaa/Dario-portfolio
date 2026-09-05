"use client";
import React from "react";
import {
    ResponsiveDialog,
    ResponsiveDialogContent,
    ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";
import { ArrowUpRight, Github, Maximize2 } from "lucide-react";

import projects, { Project } from "@/data/projects";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TiltCard } from "../ui/tilt-card";

const ProjectsSection = () => {
    return (
        <SectionWrapper id="projects" className="mx-auto max-w-7xl px-4 md:min-h-[130vh]">
            <SectionHeader
                id="projects"
                eyebrow={`${projects.length} progetti`}
                index={4}
                title="Progetti"
                desc="Cose che ho progettato, sviluppato e messo online. Clicca su una card per i dettagli."
            />
            {/* Phones get a swipeable, one-card-at-a-time strip instead of a
                cramped single-column stack — native scroll-snap, no JS. The
                bento grid (sm+) stays exactly as it was. */}
            <div className="-mx-4 sm:hidden">
                <div
                    className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-webkit-overflow-scrolling:touch] [touch-action:pan-x]"
                    data-lenis-prevent
                    style={{ transform: "translateZ(0)" }}
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="w-[86vw] shrink-0 snap-center first:ml-0 last:mr-4"
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                    {projects.map((project) => (
                        <span
                            key={project.id}
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
                        />
                    ))}
                </div>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                    Scorri per vedere tutti i progetti →
                </p>
            </div>

            {/* Bento: the first project gets a bigger, 2-column stage on
                lg+ — a "featured" slot instead of every card fighting for
                the same weight. */}
            <div className="hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        featured={i === 0}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
};

const ProjectCard = ({
    project,
    featured = false,
}: {
    project: Project;
    featured?: boolean;
}) => {
    const stack = [
        ...(project.skills.frontend ?? []),
        ...(project.skills.backend ?? []),
    ];

    return (
        <ResponsiveDialog>
            <ResponsiveDialogTrigger
                aria-label={`Apri i dettagli del progetto ${project.title}`}
                className={cn(
                    "group pointer-events-auto block w-full bg-transparent text-left",
                    "rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    featured && "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                )}
            >
                <TiltCard
                    className={cn(
                        "h-full w-full overflow-hidden rounded-2xl border border-border bg-card",
                        "lift"
                    )}
                >
                    <div
                        className={cn(
                            "relative w-full overflow-hidden",
                            featured ? "aspect-[3/2] lg:aspect-[16/13]" : "aspect-[3/2]"
                        )}
                    >
                        <ScrollingPreview
                            src={project.src}
                            alt={project.title}
                            bg={`/assets/backgrounds/${project.id}.jpg`}
                        />
                        {/* Legibility scrim for the title block below. */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-card via-card/85 to-transparent" />

                        {/* Hover affordance — makes it obvious the card opens. */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/70 opacity-0 backdrop-blur-md transition-all duration-300 ease-smooth group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                            <Maximize2 className="h-3.5 w-3.5" />
                        </span>

                        {featured && (
                            <span className="accent-gradient absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-elevated">
                                In evidenza
                            </span>
                        )}

                        <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-5">
                            <span className="inline-block rounded-full border border-border bg-background/70 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-md">
                                {project.category}
                            </span>
                            <h3
                                className={cn(
                                    "mt-2 font-display font-bold leading-tight",
                                    featured ? "text-xl md:text-2xl" : "text-lg"
                                )}
                            >
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Stack strip — the tech is the first thing a recruiter scans for. */}
                    <div className="flex items-center gap-2 border-t border-border px-4 py-3">
                        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                            {stack.slice(0, 4).map((skill, i) => (
                                <span
                                    key={`${project.id}-${i}`}
                                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2 py-1 text-[11px] text-muted-foreground"
                                >
                                    <span className="flex h-3.5 shrink-0 items-center justify-center leading-none [&_span]:text-[9px] [&_span]:leading-none">
                                        {skill.icon}
                                    </span>
                                    {skill.title}
                                </span>
                            ))}
                            {stack.length > 4 && (
                                <span className="text-[11px] text-muted-foreground">
                                    +{stack.length - 4}
                                </span>
                            )}
                        </div>
                        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                </TiltCard>
            </ResponsiveDialogTrigger>

            <ResponsiveDialogContent className="flex h-[85vh] w-full flex-col gap-0 overflow-hidden p-0 md:max-w-4xl">
                <DialogTitle className="sr-only">{project.title}</DialogTitle>

                {/* HEADER */}
                <div className="z-20 w-full shrink-0 border-b border-border bg-background/95 p-4 backdrop-blur-sm md:p-6">
                    <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex w-full flex-col items-start gap-1">
                            <h4 className="font-display text-xl font-bold leading-tight text-foreground md:text-2xl">
                                {project.title}
                            </h4>
                            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground md:text-[11px]">
                                {project.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {project.github && project.github !== "#" && (
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
                                >
                                    <Github className="h-3.5 w-3.5" />
                                    Codice
                                </Link>
                            )}
                            {project.live && project.live !== "#" && (
                                <Link
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-88"
                                >
                                    Visita <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* SCROLL AREA — native scrolling, with vaul drag + Lenis disabled inside. */}
                <div
                    className="w-full flex-1 overflow-y-auto overscroll-contain"
                    data-vaul-no-drag
                    data-lenis-prevent
                >
                    <div className="flex w-full flex-col gap-8 overflow-x-hidden p-4 md:p-8">
                        {/* MOBILE: compact chips */}
                        <div className="flex w-full flex-col gap-5 md:hidden">
                            {(["frontend", "backend"] as const).map((group) =>
                                project.skills[group]?.length > 0 ? (
                                    <div key={group} className="flex flex-col gap-2">
                                        <span className="eyebrow">{group}</span>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skills[group].map((skill, i) => (
                                                <div
                                                    key={`mob-${group}-${i}`}
                                                    className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-2 py-1.5 text-xs"
                                                >
                                                    <div className="flex h-4 w-4 items-center justify-center">
                                                        {skill.icon}
                                                    </div>
                                                    <span>{skill.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null
                            )}
                        </div>

                        {/* DESKTOP: floating dock */}
                        <div className="hidden w-full flex-col gap-8 md:flex">
                            {(["frontend", "backend"] as const).map((group) =>
                                project.skills[group]?.length > 0 ? (
                                    <div key={group} className="flex flex-col items-start gap-2">
                                        <span className="eyebrow">{group}</span>
                                        <FloatingDock items={project.skills[group]} />
                                    </div>
                                ) : null
                            )}
                        </div>

                        <div className="h-px w-full bg-border" />

                        <div className="w-full break-words pb-10 text-base leading-relaxed">
                            {project.content}
                        </div>
                    </div>
                </div>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
};

export default ProjectsSection;
