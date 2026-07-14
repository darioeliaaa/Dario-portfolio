"use client";
import React from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { FloatingDock } from "../ui/floating-dock";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import projects, { Project } from "@/data/projects";
import { SectionHeader } from "./section-header";

import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto md:min-h-[130vh] px-4">
      <SectionHeader id="projects" title="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="flex items-center justify-center">
            <ResponsiveDialog>
                <ResponsiveDialogTrigger className="bg-transparent flex justify-center w-full">
                    <div
                        className="group relative w-full max-w-[400px] h-auto rounded-lg overflow-hidden ring-1 ring-white/5"
                        style={{ aspectRatio: "3/2" }}
                    >
                        <ScrollingPreview
                            src={project.src}
                            alt={project.title}
                            bg={`/assets/backgrounds/${project.id}.jpg`}
                        />
                        <div className="absolute w-full h-24 bottom-0 left-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10">
                            <div className="flex flex-col h-full items-start justify-end p-4">
                                <div className="text-lg text-left [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                                    {project.title}
                                </div>
                                <div className="text-xs bg-primary text-primary-foreground rounded-lg w-fit px-2">
                                    {project.category}
                                </div>
                            </div>
                        </div>
                    </div>
                </ResponsiveDialogTrigger>

                {/* MODAL CONTENT: Versione Blindata per Mobile */}
                <ResponsiveDialogContent className="flex flex-col h-[85vh] w-full md:max-w-4xl overflow-hidden p-0 gap-0">

                    {/* HEADER: Titolo a capo automatico e zero tagli */}
                    <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur-sm p-4 md:p-6 w-full z-20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                            <div className="flex flex-col items-start gap-1 w-full">
                                <h4 className="font-display text-xl md:text-2xl font-bold text-foreground text-wrap leading-tight">
                                    {project.title}
                                </h4>
                                <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2 py-0.5">
                  {project.category}
                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {project.github && project.github !== "#" && (
                                    <Link href={project.github} target="_blank" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2">
                                        Source
                                    </Link>
                                )}
                                {project.live && project.live !== "#" && (
                                    <Link href={project.live} target="_blank">
                                        <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full hover:bg-primary/80">
                                            Visit <ArrowUpRight className="w-3.5 h-3.5" />
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* AREA SCORREVOLE: Scorrimento nativo (no ScrollArea) con blocco trascinamento Drawer */}
                    <div className="flex-1 overflow-y-auto overscroll-contain w-full" data-vaul-no-drag>
                        <div className="p-4 md:p-8 flex flex-col gap-8 w-full overflow-x-hidden">

                            {/* SKILLS SU MOBILE: Etichette minimal per non rompere lo schermo */}
                            <div className="flex flex-col gap-5 md:hidden w-full">
                                {project.skills.frontend?.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Frontend</span>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skills.frontend.map((skill, i) => (
                                                <div key={`mob-fe-${i}`} className="flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-1.5 rounded-md text-xs font-mono">
                                                    <div className="w-4 h-4 flex items-center justify-center">{skill.icon}</div>
                                                    <span>{skill.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {project.skills.backend?.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Backend</span>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skills.backend.map((skill, i) => (
                                                <div key={`mob-be-${i}`} className="flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-1.5 rounded-md text-xs font-mono">
                                                    <div className="w-4 h-4 flex items-center justify-center">{skill.icon}</div>
                                                    <span>{skill.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* SKILLS SU DESKTOP: Floating Dock originale */}
                            <div className="hidden md:flex flex-col gap-8 w-full">
                                {project.skills.frontend?.length > 0 && (
                                    <div className="flex flex-col items-start gap-2">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Frontend</span>
                                        <FloatingDock items={project.skills.frontend} />
                                    </div>
                                )}
                                {project.skills.backend?.length > 0 && (
                                    <div className="flex flex-col items-start gap-2">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Backend</span>
                                        <FloatingDock items={project.skills.backend} />
                                    </div>
                                )}
                            </div>

                            <div className="h-px w-full bg-border/50" />

                            {/* CONTENUTO PROGETTO */}
                            <div className="w-full text-base leading-relaxed text-wrap break-words pb-10">
                                {project.content}
                            </div>
                        </div>
                    </div>
                </ResponsiveDialogContent>
            </ResponsiveDialog>
        </div>
    );
};

export default ProjectsSection;