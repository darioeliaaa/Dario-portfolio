import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Server, Globe, Database, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingPlans = [
    {
        name: "Landing Page",
        price: "A partire da 300€",
        description: "Una singola pagina d'impatto, perfetta per eventi, promozioni o lancio di servizi.",
        features: ["Sezioni a scorrimento", "Modulo di contatto", "Call-to-action chiare"],
        isPopular: false,
    },
    {
        name: "Sito Vetrina",
        price: "A partire da 600€",
        description: "Ideale per liberi professionisti e piccole attività che vogliono farsi trovare online.",
        features: ["Fino a 5/6 pagine", "Design responsivo", "Ottimizzazione SEO base"],
        isPopular: true,
    },
    {
        name: "Sito Aziendale",
        price: "A partire da 1.200€",
        description: "Struttura solida per PMI e studi associati, con funzionalità avanzate.",
        features: ["Fino a 15 pagine", "Supporto multilingua", "Integrazione newsletter/CRM"],
        isPopular: false,
    },
    {
        name: "E-Commerce Base",
        price: "A partire da 1.000€",
        description: "Per chi inizia a vendere online con un catalogo essenziale e pagamenti sicuri.",
        features: ["Fino a ~50 prodotti", "Carrello e pagamenti", "Pannello gestione ordini"],
        isPopular: false,
    },
    {
        name: "E-Commerce Avanzato",
        price: "A partire da 2.000€",
        description: "Soluzione completa per negozi affermati o attività con cataloghi complessi.",
        features: ["Gestione varianti complesse", "Filtri di ricerca avanzati", "Integrazione fatturazione"],
        isPopular: false,
    },
    {
        name: "Web App / Portali",
        price: "A partire da 1.800€",
        description: "Piattaforme collaborative su misura, app per prenotazioni o dashboard personalizzate.",
        features: ["Area riservata utenti", "Logiche di backend custom", "Database dedicato"],
        isPopular: false,
    }
];

export default function PricingSection() {
    return (
        <section id="tariffe" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                        Tariffe e Servizi
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Soluzioni trasparenti per ogni livello di progetto. Scegli l'opzione che fa per te.
                    </p>
                </motion.div>

                {/* Griglia dei Piani per i Siti */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-16">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col p-8 rounded-3xl border bg-white dark:bg-slate-900/50 backdrop-blur-sm transition-all",
                                plan.isPopular
                                    ? "border-blue-500 shadow-xl shadow-blue-500/10 md:-translate-y-2"
                                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                            )}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                                    Più richiesto
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                                    {plan.name}
                                </h3>
                                <div className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                                    {plan.price}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm min-h-[40px]">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Banner Manutenzione Mensile */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-3xl p-8 md:p-10 border border-slate-700 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">Manutenzione & Hosting (Opzionale)</h3>
                            <p className="text-slate-300 mb-6 max-w-2xl">
                                Sei libero di gestire l'infrastruttura del tuo sito in totale autonomia.
                                Se invece non vuoi preoccuparti di rinnovi, server e configurazioni, me ne occupo interamente io.
                                Il pacchetto copre tutte le spese di mantenimento dell'infrastruttura.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Globe className="w-4 h-4 text-blue-400" />
                                    <span>Rinnovo Dominio</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Cpu className="w-4 h-4 text-blue-400" />
                                    <span>Frontend (Vercel)</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Server className="w-4 h-4 text-blue-400" />
                                    <span>Backend (Render)*</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Database className="w-4 h-4 text-blue-400" />
                                    <span>Database (Neon)*</span>
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs mt-4">
                                *Backend e Database sono inclusi e configurati solo per i progetti che ne richiedono l'utilizzo (es. E-Commerce o Web App).
                            </p>
                        </div>

                        <div className="text-center bg-white/10 p-6 rounded-2xl backdrop-blur-md min-w-[200px]">
                            <div className="text-sm text-blue-300 font-medium mb-1">Tutto incluso a</div>
                            <div className="text-4xl font-bold text-white mb-1">50€<span className="text-xl text-slate-400 font-normal">/mese</span></div>
                            <div className="text-xs text-slate-300">Nessun costo nascosto</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}