// Le tue skill principali: una voce per ogni tasto della tastiera 3D.
// Gli identificativi (l'enum `SkillNames`), le categorie e l'ordine dei tasti
// stanno in `skill-keys.ts`; qui ci sono i testi e il colore di ciascun tasto.
import {
    SKILL_CATEGORIES,
    SKILL_KEYS,
    SkillNames,
    type SkillCategory,
} from "./skill-keys";

export { SkillNames };

export type Skill = {
    /** Posizione (da 1) sulla tastiera, nell'ordine di `SKILL_KEYS`. */
    id: number;
    /** Identificativo stabile del tasto: coincide col valore di `SkillNames`. */
    name: string;
    label: string;
    shortDescription: string;
    /** Colore del tasto: quello della sua categoria. */
    color: string;
    category: SkillCategory;
};

// Descrizioni brevi (compaiono al passaggio del mouse o al tocco su un tasto).
// Devono reggere a un colloquio: dove una tecnologia viene da un corso o da una
// parte del progetto scritta da altri, lo dicono.
const DESCRIZIONI: Record<SkillNames, string> = {
    // Linguaggi
    [SkillNames.JAVA]: "Il linguaggio dei miei progetti più grandi: microservizi e app desktop ☕",
    [SkillNames.TS]: "JavaScript con la rete di sicurezza: Angular, Next.js e quasi tutto il mio frontend 🛡️",
    [SkillNames.JS]: "La base del web: lo uso soprattutto attraverso TypeScript, ma sotto c'è sempre lui ⚡",
    [SkillNames.KOTLIN]: "Il linguaggio dell'app Android di Tripify: login, token e schermate di profilo 🤖",
    [SkillNames.SQL]: "Query e schemi per PostgreSQL e SQLite, dai corsi di basi di dati ai miei progetti 🗃️",
    [SkillNames.C]: "Studiato agli esami all'Unical: puntatori, memoria e come ragiona un computer ⚙️",
    [SkillNames.CPP]: "Dagli esami universitari: lo conosco da studente, non l'ho usato nei miei progetti 🧠",
    [SkillNames.PYTHON]: "Solo le basi dei corsi universitari: i miei progetti sono in Java, TypeScript e Kotlin 🐍",

    // Backend
    [SkillNames.SPRING_BOOT]: "Il cuore dei miei backend: i microservizi di Tripify e il trading simulato di MoneyMind 🍃",
    [SkillNames.SPRING_SECURITY]: "In Tripify: il servizio di autenticazione valida i token JWT come resource server 🔐",
    [SkillNames.JWT]: "I token di accesso di Tripify: li verifica il backend e li rinnova l'app Android 🎟️",
    [SkillNames.OAUTH2]: "Il login di Tripify con Keycloak e Google, anche nell'app Android 🔑",
    [SkillNames.KEYCLOAK]: "Il server di identità di Tripify: il tema di login personalizzato l'ho fatto io 🎨",
    [SkillNames.REST]: "Le API dei miei backend Spring Boot, dal gateway di Tripify a MoneyMind 🔌",
    [SkillNames.MICROSERVICES]: "Tripify: sei servizi, un database ciascuno, un solo gateway davanti. Lavoro di squadra 🧩",
    [SkillNames.WEBSOCKET]: "La chat live di Tripify è opera di un compagno di team: io l'ho studiata da vicino 💬",
    [SkillNames.RABBITMQ]: "Le notifiche di Tripify viaggiano su RabbitMQ: parte di un compagno, io l'ho studiata 🐇",

    // Frontend
    [SkillNames.ANGULAR]: "Il framework dei miei siti: SSR, signal e componenti standalone, da Ohimà ai case study 🅰️",
    [SkillNames.REACT]: "La libreria sotto Next.js: ci è costruito questo portfolio, con componenti e hook ⚛️",
    [SkillNames.NEXTJS]: "Il framework di questo portfolio: App Router, metadata, SEO e rendering sul server 🚀",
    [SkillNames.TAILWIND]: "Le utility class con cui è stilizzato questo sito, tema chiaro e scuro compresi 🌪️",
    [SkillNames.THREEJS]: "Il 3D nel browser: il configuratore di Ottone e la bottiglia con shader di Piccantomane 🎲",
    [SkillNames.GSAP]: "Animazioni guidate dallo scroll: quelle che muovono le sezioni di questo portfolio 🎞️",

    // Mobile
    [SkillNames.COMPOSE]: "L'interfaccia dell'app Android di Tripify: profilo, documenti, pagamenti, organizzatori 📱",
    [SkillNames.MVVM]: "Come è organizzata l'app Android di Tripify: schermate, ViewModel e dati ben separati 🏗️",

    // Desktop
    [SkillNames.JAVAFX]: "Le app desktop di Wave.ly e Bullone&Co: schermate FXML, controller e temi in CSS 🖥️",
    [SkillNames.SWING]: "Il toolkit grafico storico di Java: lo conosco in teoria, le mie app usano JavaFX 🪟",

    // Database
    [SkillNames.POSTGRES]: "Il database relazionale di Tripify (uno per servizio) e di MoneyMind 🐘",
    [SkillNames.SQLITE]: "Il database leggero di Wave.ly e Bullone&Co: account, playlist e magazzino in un file 🪶",

    // Strumenti e deploy
    [SkillNames.GIT]: "Branch, merge e conflitti risolti nei miei progetti di gruppo da 3-4 persone 🌿",
    [SkillNames.GITHUB]: "Dove vivono i miei repository, le collaborazioni di gruppo e questo stesso portfolio 🐙",
    [SkillNames.DOCKER]: "Tripify gira con Docker Compose: ogni servizio nel suo container, tutto con un comando 🐳",
    [SkillNames.MAVEN]: "Gestisce build e dipendenze dei servizi Spring Boot di Tripify 📦",
    [SkillNames.VERCEL]: "Ci pubblico i miei siti Angular e Next.js, da Ohimà a questo portfolio ▲",
    [SkillNames.RENDER]: "Ci ho messo online il backend della prima versione di Ohimà (scritto da un collega) ☁️",
    [SkillNames.NEON]: "Il PostgreSQL serverless che ospitava i dati della prima versione di Ohimà ⚡",
    [SkillNames.CLOUDFLARE]: "Il tunnel che espone in HTTPS lo stack Docker di Tripify verso l'esterno 🚇",
};

/** Tutte le 37 tecnologie, nell'ordine di lettura della tastiera. */
export const SKILLS = Object.fromEntries(
    SKILL_KEYS.map((key, i): [SkillNames, Skill] => [
        key.id,
        {
            id: i + 1,
            name: key.id,
            label: key.label,
            shortDescription: DESCRIZIONI[key.id],
            color: SKILL_CATEGORIES[key.category].color,
            category: key.category,
        },
    ]),
) as Record<SkillNames, Skill>;

export type Experience = {
    id: number;
    startDate: string;
    endDate: string;
    title: string;
    company: string;
    description: string[];
    skills: SkillNames[];
    /** Distingue formazione ed esperienza lavorativa nella timeline. */
    kind: "education" | "work";
    /** Mostra il pallino "in corso" sulla timeline. */
    current?: boolean;
};

export const EXPERIENCE: Experience[] = [
    {
        id: 1,
        startDate: "Sep 2023",
        endDate: "In corso",
        title: "Laurea Triennale in Informatica",
        company: "Università della Calabria (Unical) - DEMACS",
        kind: "education",
        current: true,
        description: [
            "Percorso di studi fortemente orientato al problem-solving e alla progettazione di sistemi complessi.",
            "Solide basi teoriche in ingegneria del software, algoritmi, basi di dati, architetture di rete e intelligenza artificiale.",
            "Forte imprinting laboratoriale, affiancando la teoria matematica allo sviluppo pratico di codice.",
        ],
        skills: [
            SkillNames.JAVA,
            SkillNames.C,
            SkillNames.CPP,
            SkillNames.PYTHON,
            SkillNames.SQL,
            SkillNames.GIT,
            SkillNames.GITHUB,
        ],
    },
    {
        id: 4,
        startDate: "Apr 2026",
        endDate: "Set 2026",
        title: "Full-Stack Developer (Freelance)",
        company: "Ohimà Che Pizza! — Marina di Strongoli",
        kind: "work",
        description: [
            "Sito e gestionale per una pizzeria vera, progettato, sviluppato e consegnato come pacchetto chiuso: frontend Angular su Vercel, backend Spring Boot su Render, PostgreSQL su Neon. In produzione su ohimachepizza.it.",
            "Pannello admin protetto da JWT per gestire menù e prezzi senza toccare il codice; consegna finale con redesign completo dell'estetica (Pop-Art/Neubrutalist).",
        ],
        skills: [
            SkillNames.JAVA,
            SkillNames.TS,
            SkillNames.POSTGRES,
            SkillNames.VERCEL,
        ],
    },
    {
        id: 2,
        startDate: "Giu 2026",
        endDate: "Giu 2026",
        title: "Technical Assistant",
        company: "Medical Convention",
        kind: "work",
        description: [
            "Assistenza tecnica e gestione infrastruttura informatica durante convention di medici professionisti.",
            "Gestione dei trasferimenti live delle slide in tempo reale tramite TeamViewer.",
        ],
        skills: [],
    },
    {
        id: 3,
        startDate: "2017",
        endDate: "2022",
        title: "Diploma Conduzione del Mezzo Navale",
        company: "Istituto Tecnico Nautico 'Mario Ciliberto'",
        kind: "education",
        description: [
            "Studio approfondito di materie tecnico-scientifiche (matematica, fisica, navigazione elettronica).",
            "Forma mentis analitica basata su logica e precisione, sviluppata tramite la gestione di strumenti navali complessi sotto pressione.",
        ],
        skills: [],
    },
];

export const themeDisclaimers = {
    light: [
        "Attenzione: la modalità chiara emette una quantità pericolosa di lumen!",
        "Cautela: modalità chiara attivata! Non provateci a casa.",
        "Solo i professionisti possono gestire tutta questa luce. Indossa gli occhiali da sole!",
        "Preparati! La modalità chiara sta per illuminare tutto più del tuo futuro.",
        "Passaggio alla modalità chiara... Sei sicuro che i tuoi occhi siano pronti?",
    ],
    dark: [
        "Modalità chiara? Pensavo fossi impazzito... ben tornato nel lato oscuro!",
        "Passaggio alla modalità scura... Com'era la vita dal lato luminoso?",
        "Modalità scura attivata! Grazie dal profondo del mio cuore, e anche dai miei occhi.",
        "Benvenuto di nuovo nell'ombra. Riposati la vista.",
        "Modalità scura ON! Finalmente qualcuno che apprezza la vera eleganza.",
    ],
};