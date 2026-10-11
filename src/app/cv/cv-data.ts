/**
 * Contenuti del curriculum, trascritti dal PDF ufficiale (public/Dario_Elia_CV.pdf).
 * La pagina /cv ne è la versione web: quando il PDF cambia, si riallinea questo file.
 * Versione di ottobre 2026.
 */

/** Pezzo di testo in linea: una stringa semplice oppure un link. */
export type Part = string | { label: string; href: string };

export type Bullet = {
    text: string;
    /** Etichetta in grassetto davanti al testo (es. "La mia parte:"). */
    label?: string;
};

export type Entry = {
    title: string;
    when: string;
    meta?: Part[];
    bullets?: Bullet[];
    tags?: string[];
};

export type Card = {
    title: string;
    titleLink?: { label: string; href: string };
    meta?: Part[];
    text: Part[];
    mine?: { label: string; text: string };
};

export const ROLE_LINE = "Sviluppatore full-stack junior · Java · Angular · Kotlin";

export const PROFILE = "Studente di Informatica all'Unical, diplomato in Conduzione del Mezzo Navale. Costruisco applicazioni intere, dal database all'interfaccia: ho lavorato a un sistema a microservizi con app Android nativa in un team di quattro (autenticazione, API gateway, recensioni), ho consegnato il sito di una pizzeria reale e ho pubblicato altri dieci progetti web e desktop. Cerco la mia prima occasione come sviluppatore.";

export const EXPERIENCE_CV: Entry[] = [
    {
        title: "Ohimà Che Pizza! · Sviluppatore web (freelance)",
        when: "Apr – Set 2026",
        meta: [
            "Marina di Strongoli · progetto a pacchetto singolo · ",
            {
                label: "ohimachepizza.it",
                href: "https://www.ohimachepizza.it"
            }
        ],
        bullets: [
            {
                text: "Sito di una pizzeria reale, online su ohimachepizza.it: ho scritto tutto il frontend in Angular (menù illustrato, animazione della pizza che nasce allo scroll, versione mobile con barra di navigazione dedicata, pagine Chi siamo e Privacy) e l'ho pubblicato su Vercel."
            },
            {
                text: "La prima versione leggeva menù e prenotazioni da un backend Spring Boot con PostgreSQL (progetto di un collega di corso, che ho messo online su Render e Neon). Da luglio il menù è statico, più semplice da mantenere."
            }
        ],
        tags: [
            "Angular",
            "TypeScript",
            "CSS",
            "Vercel"
        ]
    },
    {
        title: "Assistente tecnico · Convention medica",
        when: "Giugno 2026",
        bullets: [
            {
                text: "Assistenza tecnica e gestione dell'infrastruttura informatica durante una convention di medici; trasferimento in tempo reale delle slide tra i relatori."
            }
        ]
    }
];

export const MAIN_PROJECTS: Entry[] = [
    {
        title: "Tripify · prenotazione viaggi a microservizi",
        when: "Apr – Set 2026",
        meta: [
            "Progetto di gruppo (4 persone, 343 commit, 128 miei) · corso di Enterprise Applications, Unical"
        ],
        bullets: [
            {
                text: "Backend a microservizi Spring Boot (gateway, autenticazione, catalogo, prenotazioni, chat e notifiche, itinerari), ciascuno con il proprio database PostgreSQL; pattern Saga per i checkout falliti; stack Docker Compose esposto in HTTPS con Cloudflare Tunnel."
            },
            {
                text: "servizio di autenticazione e profilo (Keycloak, OAuth2/OIDC con login Google; documenti di viaggio e metodi di pagamento con dati mascherati), API gateway con rate limiting, tema di login personalizzato, sistema di recensioni con voti e risposte, gestione dei token e schermate di profilo e organizzatori dell'app Android, con i relativi test JUnit.",
                label: "La mia parte:"
            }
        ],
        tags: [
            "Java",
            "Spring Boot",
            "Keycloak",
            "RabbitMQ",
            "Docker",
            "Kotlin",
            "Jetpack Compose",
            "PostgreSQL"
        ]
    },
    {
        title: "MoneyMind · budget e simulatore di trading",
        when: "Nov 2025 – Gen 2026",
        meta: [
            "Progetto universitario di gruppo (4 persone). L'ho avviato io: 469 commit su 740"
        ],
        bullets: [
            {
                text: "Budget personale, wallet condivisi tra utenti e simulatore di compravendita di azioni, ETF e crypto con quotazioni reali (Finnhub)."
            },
            {
                text: "frontend Angular (dashboard, grafici Chart.js), acquisto e vendita simulati con prezzo medio di carico in un'unica transazione, vista portafoglio e cache delle notizie con refresh ogni 30 minuti per rispettare i limiti di NewsAPI.",
                label: "La mia parte:"
            }
        ],
        tags: [
            "Angular",
            "TypeScript",
            "Chart.js",
            "Spring Boot",
            "Spring Data JPA",
            "PostgreSQL"
        ]
    }
];

export const UNI_PROJECTS: Card[] = [
    {
        title: "Wave.ly · music player desktop",
        meta: [
            "Progetto di gruppo (3 persone) · Java, JavaFX, SQLite · 2025"
        ],
        mine: {
            label: "La mia parte:",
            text: "interfaccia JavaFX (schermate FXML, tre temi grafici in CSS) e controller della schermata principale."
        },
        text: [
            "Applicazione desktop con libreria, playlist, coda di riproduzione e profili utente con password cifrate."
        ]
    },
    {
        title: "Bullone&Co · gestionale di magazzino",
        meta: [
            "Progetto di gruppo · Ingegneria del Software · Java, JavaFX, SQLite"
        ],
        text: [
            "Gestionale desktop per il magazzino e le operazioni di una ferramenta, con architettura a livelli e pattern Strategy."
        ]
    }
];

export const CASE_NOTE = "Progetti miei, non incarichi commissionati: ognuno parte da un'idea di prodotto e da un'identità grafica diversa. Tutti online.";

export const CASE_STUDIES: Card[] = [
    {
        title: "Ottone · telai su misura",
        meta: [
            {
                label: "ottone-telai.vercel.app",
                href: "https://ottone-telai.vercel.app"
            },
            " · Angular, Three.js, SSR"
        ],
        text: [
            "E-commerce con configuratore 3D: una sola funzione di geometria disegna il telaio e ne calcola le quote. Vista esplosa, taglia consigliata calcolata in un Web Worker, carrello su IndexedDB e proforma PDF generata nel browser."
        ]
    },
    {
        title: "Piccantomane · salse piccanti",
        meta: [
            {
                label: "piccantemane.vercel.app",
                href: "https://piccantemane.vercel.app"
            },
            " · Angular, Three.js, GLSL, SSR"
        ],
        text: [
            "E-commerce con catalogo di 12 salse filtrabile per piccantezza, bottiglia 3D costruita a runtime con etichetta disegnata su canvas, sfondo con shader GLSL scritto a mano, carrello persistente e checkout con Reactive Forms (pagamento simulato)."
        ]
    },
    {
        title: "Sìdero · cantina in Cirò",
        meta: [
            {
                label: "sidero-cantina.vercel.app",
                href: "https://sidero-cantina.vercel.app"
            },
            " · Angular, SSR"
        ],
        text: [
            "Sito aziendale bilingue italiano e inglese con contenuti diversi per mercato, URL distinti per lingua con hreflang, 30 pagine prerenderizzate, sitemap e robots.txt generati dalla build."
        ]
    },
    {
        title: "TREDICI · studio di tatuaggi",
        meta: [
            {
                label: "tredici-tattoo.vercel.app",
                href: "https://tredici-tattoo.vercel.app"
            },
            " · Angular, SSR"
        ],
        text: [
            "Sito multipagina con foglio flash di 12 pezzi, galleria filtrabile per stile, 6 pagine con routing lazy-loaded; Angular standalone e senza Zone.js, con stato gestito a signal."
        ]
    },
    {
        title: "Una Notte di Stelle · landing page",
        meta: [
            {
                label: "una-notte-di-stelle.vercel.app",
                href: "https://una-notte-di-stelle.vercel.app"
            },
            " · Angular, SSR"
        ],
        text: [
            "Landing per un evento di osservazione astronomica: cielo animato con stelle cadenti su canvas 2D, linea SVG che collega le sezioni durante lo scroll e countdown disegnato su misura, corretto anche nell'HTML prerenderizzato."
        ]
    },
    {
        title: "Azienda Agricola · sito vetrina",
        meta: [
            {
                label: "sito-pelaggi.vercel.app",
                href: "https://sito-pelaggi.vercel.app"
            },
            " · Angular, SSR"
        ],
        text: [
            "Sito di un'azienda olearia calabrese con rendering lato server, prerendering delle pagine e ottimizzazione SEO locale: title e meta description per pagina, Open Graph, HTML già pronto alla prima richiesta."
        ]
    }
];

export const PORTFOLIO_CARD: Card = {
    title: "darioelia.it · portfolio personale",
    titleLink: {
        label: "darioelia.it",
        href: "https://www.darioelia.it"
    },
    meta: [
        "Next.js, TypeScript, Tailwind CSS, Three.js, GSAP"
    ],
    text: [
        "Raccoglie tutti i progetti qui sopra con gallerie di schermate. Parte dal template open source di Naresh Khatri, che ho riscritto e personalizzato: tastiera 3D in Three.js (un tasto per ogni tecnologia), sezioni, gallerie, form contatti con validazione lato server, CV e SEO. Codice su ",
        {
            label: "github.com/darioeliaaa",
            href: "https://github.com/darioeliaaa"
        },
        "."
    ]
};

export const SKILL_GROUPS: { title: string; skills: string }[] = [
    { title: "Linguaggi", skills: "Java, TypeScript, JavaScript, Kotlin, SQL, C, C++. Python (basi universitarie)" },
    {
        title: "Backend",
        skills: "Spring Boot, Spring Security, JWT, OAuth2/OIDC con Keycloak, API REST, microservizi, WebSocket/STOMP, RabbitMQ",
    },
    { title: "Frontend", skills: "Angular (SSR, signal), React, Next.js, Tailwind CSS, Three.js, GSAP" },
    { title: "Mobile", skills: "Kotlin, Jetpack Compose, architettura MVVM" },
    { title: "Desktop", skills: "JavaFX, Java Swing" },
    { title: "Database", skills: "PostgreSQL, SQLite, SQL" },
    { title: "Strumenti e deploy", skills: "Git/GitHub, Docker e Compose, Maven, Vercel, Render, Neon, Cloudflare Tunnel" },
];

export const EDUCATION_CV: { title: string; org: string; when: string }[] = [
    {
        title: "Laurea triennale in Informatica",
        org: "Università della Calabria (Unical), DEMACS",
        when: "Settembre 2023 – in corso",
    },
    {
        title: "Diploma di Conduzione del Mezzo Navale",
        org: "Istituto Tecnico Nautico \"M. Ciliberto\"",
        when: "2017 – 2022",
    },
];

export const LANGUAGES: { name: string; level: string }[] = [
    { name: "Italiano", level: "Madrelingua" },
    { name: "Inglese", level: "B2" },
];

export const WORK_STYLE =
    "Lavoro in squadra con Git su progetti da 3-4 persone, scrivo codice documentato e imparo in fretta le tecnologie nuove.";

export const GDPR = "Autorizzo il trattamento dei miei dati personali presenti nel curriculum vitae ai sensi del Decreto Legislativo 30 giugno 2003, n. 196 e del GDPR (Regolamento UE 2016/679).";
