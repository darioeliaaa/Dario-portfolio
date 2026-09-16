/**
 * Il listino, in un solo posto.
 *
 * Prima viveva dentro pricing-section.tsx: andava bene finché nessun altro
 * componente aveva bisogno di sapere nome e prezzo di un pacchetto. Ora che
 * il bottone "Richiedi un preventivo" passa il pacchetto scelto al modulo di
 * contatto, la fonte deve essere una sola — altrimenti prima o poi il prezzo
 * scritto nel form e quello scritto in tariffe finiscono per non combaciare
 * più.
 */
export type Plan = {
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
};

export const pricingPlans: Plan[] = [
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
    {
        name: "App Mobile",
        // ⚠️ Prezzo di partenza indicativo, non verificato con te: un'app
        // nativa costa di più di un sito perché ci sono più fasi (backend
        // dedicato, test su più dispositivi, pubblicazione sullo store).
        // Cambialo pure con un numero in cui ti riconosci.
        price: "2.500€",
        description:
            "App nativa Android su misura, dal backend fino alla pubblicazione sullo store.",
        features: ["Backend dedicato incluso", "Pubblicazione su Google Play", "Notifiche push"],
    },
];

/**
 * A quale voce del menu "Di cosa hai bisogno?" del form corrisponde un
 * pacchetto. Le opzioni del form sono volutamente più larghe dei sei
 * pacchetti (altrimenti il menu diventerebbe lungo quanto il listino), ma
 * non è questo campo a togliere l'ambiguità — ci pensa il messaggio
 * precompilato, che nomina il pacchetto esatto per intero.
 */
export function subjectForPlan(planName: string): string {
    switch (planName) {
        case "Landing Page":
        case "Sito Vetrina":
        case "Sito Aziendale":
            return "Sito vetrina / Landing page";
        case "E-Commerce Base":
        case "E-Commerce Avanzato":
            return "E-commerce";
        case "Web App / Portali":
            return "Web app / Portale su misura";
        case "App Mobile":
            return "App mobile";
        default:
            return "Altro";
    }
}

export function planByName(name: string): Plan | undefined {
    return pricingPlans.find((p) => p.name === name);
}
