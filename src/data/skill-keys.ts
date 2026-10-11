// Fonte unica delle tecnologie rappresentate dai tasti della tastiera 3D
// (e dalle griglie/ticker 2D). Una voce = un tasto. Qui ci sono solo i dati
// "strutturali" (id, categoria, etichetta, ordine sulla tastiera); testi
// descrittivi e colori dei tasti stanno in `constants.ts` (SKILLS).

/** Gruppi come nel CV: ognuno ha un colore, così la tastiera si legge a blocchi. */
export type SkillCategory =
    | "linguaggi"
    | "backend"
    | "frontend"
    | "mobile"
    | "desktop"
    | "database"
    | "strumenti";

export const SKILL_CATEGORIES: Record<SkillCategory, { label: string; color: string }> = {
    linguaggi: { label: "Linguaggi", color: "#EE8F0A" },
    backend: { label: "Backend", color: "#22A559" },
    frontend: { label: "Frontend", color: "#3B82F6" },
    mobile: { label: "Mobile", color: "#A855F7" },
    desktop: { label: "Desktop", color: "#E5484D" },
    database: { label: "Database", color: "#06A9C9" },
    strumenti: { label: "Strumenti e deploy", color: "#4F6078" },
};

/** Il valore (stringa) è l'identificativo stabile di un tasto nella scena 3D. */
export enum SkillNames {
    // Linguaggi
    JAVA = "java",
    TS = "typescript",
    JS = "javascript",
    KOTLIN = "kotlin",
    SQL = "sql",
    C = "c",
    CPP = "cpp",
    PYTHON = "python",
    // Backend
    SPRING_BOOT = "spring-boot",
    SPRING_SECURITY = "spring-security",
    JWT = "jwt",
    OAUTH2 = "oauth2",
    KEYCLOAK = "keycloak",
    REST = "rest",
    MICROSERVICES = "microservices",
    WEBSOCKET = "websocket",
    RABBITMQ = "rabbitmq",
    // Frontend
    ANGULAR = "angular",
    REACT = "react",
    NEXTJS = "nextjs",
    TAILWIND = "tailwind",
    THREEJS = "threejs",
    GSAP = "gsap",
    // Mobile
    COMPOSE = "compose",
    MVVM = "mvvm",
    // Desktop
    JAVAFX = "javafx",
    SWING = "swing",
    // Database
    POSTGRES = "postgresql",
    SQLITE = "sqlite",
    // Strumenti e deploy
    GIT = "git",
    GITHUB = "github",
    DOCKER = "docker",
    MAVEN = "maven",
    VERCEL = "vercel",
    RENDER = "render",
    NEON = "neon",
    CLOUDFLARE = "cloudflare",
}

export type SkillKeyDef = {
    id: SkillNames;
    category: SkillCategory;
    /** Etichetta breve (mostrata su hover, nei tile, nella marquee). */
    label: string;
};

/**
 * Ordine di lettura sulla tastiera (sinistra→destra, alto→basso). Le categorie
 * sono contigue, così i colori formano blocchi. 37 tasti in totale.
 */
export const SKILL_KEYS: readonly SkillKeyDef[] = [
    { id: SkillNames.JAVA, category: "linguaggi", label: "Java" },
    { id: SkillNames.TS, category: "linguaggi", label: "TypeScript" },
    { id: SkillNames.JS, category: "linguaggi", label: "JavaScript" },
    { id: SkillNames.KOTLIN, category: "linguaggi", label: "Kotlin" },
    { id: SkillNames.SQL, category: "linguaggi", label: "SQL" },
    { id: SkillNames.C, category: "linguaggi", label: "C" },
    { id: SkillNames.CPP, category: "linguaggi", label: "C++" },
    { id: SkillNames.PYTHON, category: "linguaggi", label: "Python" },

    { id: SkillNames.SPRING_BOOT, category: "backend", label: "Spring Boot" },
    { id: SkillNames.SPRING_SECURITY, category: "backend", label: "Spring Security" },
    { id: SkillNames.JWT, category: "backend", label: "JWT" },
    { id: SkillNames.OAUTH2, category: "backend", label: "OAuth2 / OIDC" },
    { id: SkillNames.KEYCLOAK, category: "backend", label: "Keycloak" },
    { id: SkillNames.REST, category: "backend", label: "API REST" },
    { id: SkillNames.MICROSERVICES, category: "backend", label: "Microservizi" },
    { id: SkillNames.WEBSOCKET, category: "backend", label: "WebSocket / STOMP" },
    { id: SkillNames.RABBITMQ, category: "backend", label: "RabbitMQ" },

    { id: SkillNames.ANGULAR, category: "frontend", label: "Angular" },
    { id: SkillNames.REACT, category: "frontend", label: "React" },
    { id: SkillNames.NEXTJS, category: "frontend", label: "Next.js" },
    { id: SkillNames.TAILWIND, category: "frontend", label: "Tailwind CSS" },
    { id: SkillNames.THREEJS, category: "frontend", label: "Three.js" },
    { id: SkillNames.GSAP, category: "frontend", label: "GSAP" },

    { id: SkillNames.COMPOSE, category: "mobile", label: "Jetpack Compose" },
    { id: SkillNames.MVVM, category: "mobile", label: "MVVM" },

    { id: SkillNames.JAVAFX, category: "desktop", label: "JavaFX" },
    { id: SkillNames.SWING, category: "desktop", label: "Java Swing" },

    { id: SkillNames.POSTGRES, category: "database", label: "PostgreSQL" },
    { id: SkillNames.SQLITE, category: "database", label: "SQLite" },

    { id: SkillNames.GIT, category: "strumenti", label: "Git" },
    { id: SkillNames.GITHUB, category: "strumenti", label: "GitHub" },
    { id: SkillNames.DOCKER, category: "strumenti", label: "Docker" },
    { id: SkillNames.MAVEN, category: "strumenti", label: "Maven" },
    { id: SkillNames.VERCEL, category: "strumenti", label: "Vercel" },
    { id: SkillNames.RENDER, category: "strumenti", label: "Render" },
    { id: SkillNames.NEON, category: "strumenti", label: "Neon" },
    { id: SkillNames.CLOUDFLARE, category: "strumenti", label: "Cloudflare Tunnel" },
];
