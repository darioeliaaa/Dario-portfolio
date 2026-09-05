"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, Server, Globe, Database, Cpu, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Button } from "../ui/button";

type Plan = {
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
};

const pricingPlans: Plan[] = [
    {
        name: "Landing Page",
        price: "300€",
        description:
            "Una singola pagina d'impatto, perfetta per eventi, promozioni o lancio di servizi.",
        features: ["Sezioni a scorrimento", "Modulo di contatto", "Call-to-action chiare"],
    },
    {
        name: "Sito Vetrina",
        price: "600€",
        description:
            "Ideale per liberi professionisti e piccole attività che vogliono farsi trovare online.",
        features: ["Fino a 5/6 pagine", "Design responsivo", "Ottimizzazione SEO base"],
        isPopular: true,
    },
    {
        name: "Sito Aziendale",
        price: "1.200€",
        description:
            "Struttura solida per PMI e studi associati, con funzionalità avanzate.",
        features: ["Fino a 15 pagine", "Supporto multilingua", "Integrazione newsletter/CRM"],
    },
    {
        name: "E-Commerce Base",
        price: "1.000€",
        description:
            "Per chi inizia a vendere online con un catalogo essenziale e pagamenti sicuri.",
        features: ["Fino a ~50 prodotti", "Carrello e pagamenti", "Pannello gestione ordini"],
    },
    {
        name: "E-Commerce Avanzato",
        price: "2.000€",
        description:
            "Soluzione completa per negozi affermati o attività con cataloghi complessi.",
        features: [
            "Gestione varianti complesse",
            "Filtri di ricerca avanzati",
            "Integrazione fatturazione",
        ],
    },
    {
        name: "Web App / Portali",
        price: "1.800€",
        description:
            "Piattaforme collaborative su misura, app per prenotazioni o dashboard personalizzate.",
        features: ["Area riservata utenti", "Logiche di backend custom", "Database dedicato"],
    },
];

const MAINTENANCE = [
    { icon: Globe, label: "Rinnovo dominio" },
    { icon: Cpu, label: "Frontend (Vercel)" },
    { icon: Server, label: "Backend (Render)*" },
    { icon: Database, label: "Database (Neon)*" },
];

const PlanCard = ({ plan, index = 0 }: { plan: Plan; index?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
            duration: 0.5,
            delay: (index % 3) * 0.08,
            ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
            "pointer-events-auto relative flex h-full flex-col rounded-2xl border bg-card/70 p-7 backdrop-blur-md",
            "lift glow-border",
            plan.isPopular
                ? "border-spark/45 shadow-elevated md:-translate-y-2"
                : "border-border"
        )}
    >
        {plan.isPopular && (
            <>
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-spark to-transparent"
                />
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-spark/45 bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
                    Più richiesto
                </span>
            </>
        )}

        <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>

        <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-xs text-muted-foreground">da</span>
            <span className="font-display text-3xl font-bold leading-none">
                {plan.price}
            </span>
        </div>

        <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-muted-foreground">
            {plan.description}
        </p>

        <ul className="mt-6 flex-grow space-y-3 border-t border-border pt-6">
            {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-spark-soft">
                        <Check className="h-2.5 w-2.5 text-spark" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
            ))}
        </ul>

        <Link href="#contact" className="mt-7 block">
            <Button variant={plan.isPopular ? "default" : "outline"} className="w-full">
                Richiedi un preventivo
                <ArrowUpRight className="h-4 w-4" />
            </Button>
        </Link>
    </motion.div>
);

export default function PricingSection() {
    return (
        <SectionWrapper id="tariffe" className="py-24 md:py-32">
            <div className="container relative z-10 mx-auto max-w-7xl px-4">
                <SectionHeader
                    id="tariffe"
                    eyebrow="Tariffe"
                    index={5}
                    title="Servizi e prezzi"
                    desc="Prezzi di partenza trasparenti. Ogni preventivo finale dipende da funzionalità, contenuti e tempi — ne parliamo insieme, senza sorprese."
                    className="static mb-14 md:mb-20"
                />

                <div className="mb-16">
                    {/* Phones get the same swipeable, one-card-at-a-time strip as
                        the Projects section — a 6-card single-column stack made
                        every plan feel like a wall of text to scroll past. The
                        grid (sm+) stays exactly as it was. */}
                    <div className="-mx-4 sm:hidden">
                        <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-webkit-overflow-scrolling:touch]">
                            {pricingPlans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className="w-[86vw] shrink-0 snap-center first:ml-0 last:mr-4"
                                >
                                    <PlanCard plan={plan} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 flex items-center justify-center gap-1.5">
                            {pricingPlans.map((plan) => (
                                <span
                                    key={plan.name}
                                    aria-hidden
                                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
                                />
                            ))}
                        </div>
                        <p className="mt-1 text-center text-xs text-muted-foreground">
                            Scorri per vedere tutti i piani →
                        </p>
                    </div>

                    <div className="hidden items-stretch gap-5 sm:grid md:grid-cols-2 lg:grid-cols-3">
                        {pricingPlans.map((plan, index) => (
                            <PlanCard key={plan.name} plan={plan} index={index} />
                        ))}
                    </div>
                </div>

                {/* Maintenance / hosting */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md"
                >
                    <div className="flex flex-col items-center gap-8 p-7 md:flex-row md:justify-between md:p-10">
                        <div className="flex-1">
                            <span className="eyebrow">Opzionale</span>
                            <h3 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">
                                Manutenzione &amp; Hosting
                            </h3>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                                Sei libero di gestire l&apos;infrastruttura del tuo sito in totale
                                autonomia. Se invece non vuoi preoccuparti di rinnovi, server e
                                configurazioni, me ne occupo interamente io: il pacchetto copre
                                tutte le spese di mantenimento.
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                                {MAINTENANCE.map(({ icon: Icon, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs text-muted-foreground"
                                    >
                                        <Icon className="h-3.5 w-3.5 shrink-0 text-spark" />
                                        <span className="truncate">{label}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-4 text-xs text-muted-foreground/70">
                                *Backend e Database sono inclusi e configurati solo per i progetti
                                che ne richiedono l&apos;utilizzo (es. E-Commerce o Web App).
                            </p>
                        </div>

                        <div className="w-full min-w-[210px] shrink-0 rounded-xl border border-border bg-secondary/40 p-6 text-center md:w-auto">
                            <div className="eyebrow justify-center">Tutto incluso</div>
                            <div className="mt-3 font-display text-4xl font-bold leading-none">
                                50€
                                <span className="text-lg font-normal text-muted-foreground">
                                    /mese
                                </span>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                                Nessun costo nascosto
                            </div>
                            <Link href="#contact" className="mt-5 block">
                                <Button variant="outline" size="sm" className="w-full">
                                    Parliamone
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
