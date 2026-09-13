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

    return (
        <SectionWrapper id="demo" className="mx-auto max-w-7xl px-4 md:min-h-[130vh]">
            {/* Stesse identiche impostazioni della sezione Progetti, intestazione
                sticky compresa: le due sezioni devono sembrare due capitoli
                dello stesso sito, non due sezioni fatte in momenti diversi. */}
            <SectionHeader
                id="demo"
                eyebrow={`${demoProjects.length} esercizi di stile`}
                index={5}
                title="Progetti dimostrativi"
                desc="Case study nati per mia iniziativa, non su commissione: li costruisco per mettere alla prova un'idea di design o una tecnologia. Nessun cliente dietro, dati e contatti sono segnaposto."
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

            {/* Su telefono la stessa striscia trascinabile della sezione Progetti. */}
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
                <div className="mt-3 flex items-center justify-center gap-1.5">
                    {demoProjects.map((project) => (
                        <span
                            key={project.id}
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
                        />
                    ))}
                </div>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                    Scorri per vederli tutti →
                </p>
            </div>

            {/* Stessa griglia bento della sezione Progetti, con una differenza:
                lì il primo progetto è un riquadro alto due righe, qui è una
                fascia a tutta larghezza. Con quattro case study su tre colonne
                il riquadro alto lascerebbe due caselle vuote in fondo, la
                fascia no — e su tablet, dove le colonne sono due, le quattro
                card tornano tutte uguali in un quadrato perfetto. */}
            <div className="hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                {demoProjects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        layout={i === 0 ? "wide" : "default"}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
};

export default DemoProjectsSection;
