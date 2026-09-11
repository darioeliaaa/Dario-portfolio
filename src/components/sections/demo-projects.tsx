"use client";

import React from "react";
import { FlaskConical } from "lucide-react";

import { demoProjects } from "@/data/projects";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { ProjectCard } from "./projects";
import { useDragScroll } from "@/hooks/use-drag-scroll";

/**
 * Progetti dimostrativi — case study di mia iniziativa, tenuti deliberatamente
 * fuori dalla sezione "Progetti".
 *
 * La separazione è il punto della sezione, non un dettaglio di layout: chi
 * guarda un portfolio dà per scontato che ogni cosa esposta sia stata pagata
 * da qualcuno. Mescolare un esercizio di stile con i lavori consegnati
 * davvero gonfierebbe il curriculum in silenzio, quindi questi stanno per
 * conto loro, con un cartello che dice cosa sono.
 *
 * La card è la stessa della sezione Progetti (importata, non riscritta), così
 * qualsiasi ritocco all'una si riflette sull'altra.
 */
const DemoProjectsSection = () => {
    const drag = useDragScroll<HTMLDivElement>();
    // Con un solo case study una griglia a tre colonne lascerebbe due buchi:
    // meglio una card sola, centrata e più larga, che si allarga a griglia
    // appena ne arriva un secondo.
    const isSingle = demoProjects.length === 1;

    return (
        <SectionWrapper id="demo" className="mx-auto max-w-7xl px-4 py-24 md:py-32">
            <SectionHeader
                id="demo"
                eyebrow="Esercizi di stile"
                index={5}
                title="Progetti dimostrativi"
                desc="Case study nati per mia iniziativa, non su commissione: li costruisco per mettere alla prova un'idea di design o una tecnologia. Nessun cliente dietro, dati e contatti sono segnaposto."
                className="static mb-14 md:mb-20"
            />

            <div className="mx-auto mb-8 flex max-w-2xl items-start gap-3 rounded-xl border border-dashed border-border bg-card/40 p-4 text-sm leading-relaxed text-muted-foreground backdrop-blur-md">
                <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
                <p>
                    Questi non sono lavori commissionati. I progetti realizzati per
                    clienti veri stanno nella sezione{" "}
                    <a
                        href="#projects"
                        className="underline underline-offset-2 transition-colors hover:text-foreground"
                    >
                        Progetti
                    </a>
                    .
                </p>
            </div>

            {/* Su telefono la stessa striscia trascinabile delle altre sezioni,
                ma solo quando c'è più di una card: con una sola non c'è niente
                da scorrere. */}
            {isSingle ? (
                <div className="mx-auto w-full max-w-3xl sm:hidden">
                    <ProjectCard project={demoProjects[0]} />
                </div>
            ) : (
                <div className="-mx-4 sm:hidden">
                    <div
                        ref={drag.ref}
                        onPointerDown={drag.onPointerDown}
                        onPointerMove={drag.onPointerMove}
                        onPointerUp={drag.onPointerUp}
                        onPointerCancel={drag.onPointerCancel}
                        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [touch-action:pan-y]"
                        data-lenis-prevent
                    >
                        {demoProjects.map((project) => (
                            <div
                                key={project.id}
                                className="w-[86vw] shrink-0 snap-center first:ml-0 last:mr-4"
                            >
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                        Scorri per vederli tutti →
                    </p>
                </div>
            )}

            <div
                className={
                    isSingle
                        ? "mx-auto hidden w-full max-w-3xl sm:block"
                        : "hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
                }
            >
                {demoProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </SectionWrapper>
    );
};

export default DemoProjectsSection;
