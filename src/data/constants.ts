// Le tue skill principali! Il valore di ogni voce (la stringa a destra) DEVE
// combaciare ESATTAMENTE col nome del layer del tasto sulla tastiera Spline
// originale — è quello con cui il codice riconosce quale tasto è stato
// premuto — non con l'etichetta che ha il tasto stesso.
//
// Alcuni tasti sono stati "riassegnati": la tastiera 3D originale (un asset
// da editor Spline, non modificabile da qui — servirebbe riaprire il file
// in spline.design) aveva un set fisso di loghi web/JS incisi. Non
// rappresentavano le tue vere competenze, quindi il CONTENUTO di quei tasti è
// stato sostituito con le tecnologie reali (Kotlin/Java/C/C++/Python/Android
// Studio) mantenendo lo stesso valore-tasto sottostante. Il logo inciso sul
// tasto fisico resta quello vecchio.
export enum SkillNames {
    JS = "js",
    TS = "ts",
    HTML = "html",
    CSS = "css",
    REACT = "react",
    // Era il tasto "Vue.js" — riassegnato a Kotlin.
    KOTLIN = "vue",
    NEXTJS = "nextjs",
    TAILWIND = "tailwind",
    // Era il tasto "Node.js" ("node" non combaciava col vero nome tasto
    // "nodejs", quindi non era mai cliccabile) — riassegnato ad Android Studio.
    ANDROID_STUDIO = "nodejs",
    // Era il tasto "Express" — riassegnato a Python.
    PYTHON = "express",
    POSTGRES = "postgres",
    // Era il tasto "MongoDB" — riassegnato a C.
    C = "mongodb",
    GIT = "git",
    GITHUB = "github",
    PRISMA = "prisma",
    NPM = "npm",
    // Era il tasto "WordPress" — riassegnato a Java.
    JAVA = "wordpress",
    LINUX = "linux",
    DOCKER = "docker",
    NGINX = "nginx",
    AWS = "aws",
    VERCEL = "vercel",
    // Era il tasto "Firebase" — riassegnato a C++.
    CPLUSPLUS = "firebase",
    VIM = "vim",
    PRETTIER = "prettier",
}

export type Skill = {
    id: number;
    name: string;
    label: string;
    shortDescription: string;
    color: string;
    icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
    [SkillNames.JS]: {
        id: 1,
        name: "js",
        label: "JavaScript",
        shortDescription: "Il motore del web. Fa muovere e funzionare letteralmente tutto ⚡",
        color: "#f0db4f",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    },
    [SkillNames.TS]: {
        id: 2,
        name: "ts",
        label: "TypeScript",
        shortDescription: "JavaScript, ma con i superpoteri e senza errori a sorpresa 🛡️",
        color: "#007acc",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    },
    [SkillNames.HTML]: {
        id: 3,
        name: "html",
        label: "HTML",
        shortDescription: "L'ossatura di internet. Il fondamento di ogni progetto web 🏗️",
        color: "#e34c26",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    },
    [SkillNames.CSS]: {
        id: 4,
        name: "css",
        label: "CSS",
        shortDescription: "Per dare stile e rendere tutto bellissimo. Addio siti anni '90 🎨",
        color: "#563d7c",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    },
    [SkillNames.REACT]: {
        id: 5,
        name: "react",
        label: "React",
        shortDescription: "La libreria per eccellenza per creare interfacce dinamiche ⚛️",
        color: "#61DAFB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    [SkillNames.KOTLIN]: {
        id: 6,
        name: "vue",
        label: "Kotlin",
        shortDescription: "Linguaggio moderno per Android: conciso e sicuro, la base di Jetpack Compose 🤖",
        color: "#7F52FF",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    },
    [SkillNames.NEXTJS]: {
        id: 7,
        name: "nextjs",
        label: "Next.js",
        shortDescription: "Il framework React per la produzione: veloce e SEO-friendly 🚀",
        color: "#000000",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    },
    [SkillNames.TAILWIND]: {
        id: 8,
        name: "tailwind",
        label: "Tailwind",
        shortDescription: "Stile rapido e pulito tramite utility classes. Una rivoluzione 🌪️",
        color: "#38bdf8",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    [SkillNames.ANDROID_STUDIO]: {
        id: 9,
        name: "nodejs",
        label: "Android Studio",
        shortDescription: "L'IDE ufficiale per lo sviluppo Android: emulatori, debug e build in un colpo solo 🤖",
        color: "#3DDC84",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
    },
    [SkillNames.PYTHON]: {
        id: 10,
        name: "express",
        label: "Python",
        shortDescription: "Sintassi pulita e una libreria per (quasi) tutto: script, dati, backend 🐍",
        color: "#3776AB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    [SkillNames.POSTGRES]: {
        id: 11,
        name: "postgres",
        label: "PostgreSQL",
        shortDescription: "Il database relazionale open source più potente e affidabile 🐘",
        color: "#336791",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    },
    [SkillNames.C]: {
        id: 12,
        name: "mongodb",
        label: "C",
        shortDescription: "Vicino al metallo: memoria, puntatori e le basi vere di come gira un computer ⚙️",
        color: "#A8B9CC",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
    },
    [SkillNames.GIT]: {
        id: 13,
        name: "git",
        label: "Git",
        shortDescription: "La macchina del tempo per il codice. Assolutamente indispensabile 🔄",
        color: "#f1502f",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    [SkillNames.GITHUB]: {
        id: 14,
        name: "github",
        label: "GitHub",
        shortDescription: "Il social network dei programmatori e la casa dei repository 🐙",
        color: "#000000",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    },
    [SkillNames.PRISMA]: {
        id: 15,
        name: "prisma",
        label: "Prisma",
        shortDescription: "L'ORM di nuova generazione per interagire con i database in modo pulito 💎",
        color: "#2D3748",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    },
    [SkillNames.NPM]: {
        id: 16,
        name: "npm",
        label: "npm",
        shortDescription: "Il gestore di pacchetti che tiene in piedi l'intero ecosistema JavaScript 📦",
        color: "#CB3837",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg",
    },
    [SkillNames.JAVA]: {
        id: 17,
        name: "wordpress",
        label: "Java",
        shortDescription: "Il linguaggio enterprise per eccellenza: tipizzato, solido e ovunque nel backend ☕",
        color: "#ED8B00",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    },
    [SkillNames.LINUX]: {
        id: 18,
        name: "linux",
        label: "Linux",
        shortDescription: "Il sistema operativo dei server. La riga di comando è casa 🐧",
        color: "#FCC624",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    },
    [SkillNames.DOCKER]: {
        id: 19,
        name: "docker",
        label: "Docker",
        shortDescription: "Se funziona sul mio PC, funzionerà ovunque 🐳",
        color: "#2496ed",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    },
    [SkillNames.NGINX]: {
        id: 20,
        name: "nginx",
        label: "NGINX",
        shortDescription: "Web server, reverse proxy e bilanciatore di carico ultra-performante 🚦",
        color: "#009639",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    },
    [SkillNames.AWS]: {
        id: 21,
        name: "aws",
        label: "AWS",
        shortDescription: "Il cloud computing per far scalare le applicazioni a livello globale ☁️",
        color: "#FF9900",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    [SkillNames.VERCEL]: {
        id: 22,
        name: "vercel",
        label: "Vercel",
        shortDescription: "La piattaforma di deployment definitiva per frontend e framework moderni ▲",
        color: "#000000",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    },
    [SkillNames.CPLUSPLUS]: {
        id: 23,
        name: "firebase",
        label: "C++",
        shortDescription: "C con le sovrastrutture: OOP, performance e la base di tanti corsi di algoritmi 🧠",
        color: "#00599C",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    },
    [SkillNames.VIM]: {
        id: 24,
        name: "vim",
        label: "Vim",
        shortDescription: "L'editor da terminale che divide gli sviluppatori. Una volta imparato non si torna più indietro ⌨️",
        color: "#019733",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vim/vim-original.svg",
    },
    [SkillNames.PRETTIER]: {
        id: 25,
        name: "prettier",
        label: "Prettier",
        shortDescription: "Formatta il codice al posto tuo, sempre uguale, senza discussioni su tab o spazi 🎯",
        color: "#F7B93E",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/prettier.svg",
    },
};

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
            SkillNames.TS,
            SkillNames.JS,
            SkillNames.HTML,
            SkillNames.CSS,
            SkillNames.GIT,
            SkillNames.GITHUB,
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