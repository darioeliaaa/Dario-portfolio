import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";

const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor).
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
    <span
        role="img"
        aria-label={title}
        className="block bg-current"
        style={{
            width: "1em",
            height: "1em",
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
        }}
    />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
            {live && live !== "#" && (
                <Link
                    className="font-mono underline flex gap-2"
                    rel="noopener"
                    target="_new"
                    href={live}
                >
                    <Button variant={"default"} size={"sm"}>
                        Visit Website
                        <ArrowUpRight className="ml-3 w-5 h-5" />
                    </Button>
                </Link>
            )}
            {repo && repo !== "#" && (
                <Link
                    className="font-mono underline flex gap-2"
                    rel="noopener"
                    target="_new"
                    href={repo}
                >
                    <Button variant={"default"} size={"sm"}>
                        Github
                        <ArrowUpRight className="ml-3 w-5 h-5" />
                    </Button>
                </Link>
            )}
        </div>
    );
};

export type Skill = {
    title: string;
    bg: string;
    fg: string;
    icon: ReactNode;
};

const brand = (title: string, file: string): Skill => ({
    title,
    bg: "black",
    fg: "white",
    icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const PROJECT_SKILLS = {
    next: brand("Next.js", "nextdotjs-mono.svg"),
    ts: brand("TypeScript", "typescript-mono.svg"),
    tailwind: brand("Tailwind CSS", "tailwind-css-mono.svg"),
    postgres: brand("PostgreSQL", "postgresql-mono.svg"),
    react: brand("React.js", "react-mono.svg"),
    docker: brand("Docker", "docker-mono.svg"),
    html: {
        title: "HTML/CSS",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">UI</span>,
    },
    java: {
        title: "Java",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">Java</span>,
    },
    springBoot: {
        title: "Spring Boot",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">Boot</span>,
    },
    angular: {
        title: "Angular",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">Ng</span>,
    },
    sqlite: {
        title: "SQLite",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">SQL</span>,
    },
    javaFX: {
        title: "JavaFX",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">FX</span>,
    },
    spline: {
        title: "Spline",
        bg: "black",
        fg: "white",
        icon: <SiThreedotjs />,
    },
    vercel: {
        title: "Vercel",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">▲</span>,
    },
    render: {
        title: "Render",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">R</span>,
    },
    neon: {
        title: "Neon DB",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">Neon</span>,
    },
};

export type Project = {
    id: string;
    category: string;
    title: string;
    src: string;
    screenshots: string[];
    skills: { frontend: Skill[]; backend: Skill[] };
    content: React.ReactNode | any;
    github?: string;
    live: string;
};

const projects: Project[] = [
    {
        id: "ohima",
        category: "Sito Web & Gestionale",
        title: "Ohima che pizza",
        src: "/assets/projects-screenshots/ohimachepizza/home.png",
        screenshots: ["landing.png"],
        live: "https://www.ohimachepizza.it",
        github: "https://github.com/darioeliaaa/ohima-che-pizza",
        skills: {
            frontend: [
                PROJECT_SKILLS.angular,
                PROJECT_SKILLS.vercel,
            ],
            backend: [
                PROJECT_SKILLS.springBoot,
                PROJECT_SKILLS.neon,
                PROJECT_SKILLS.render,
            ],
        },
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Piattaforma web full-stack per la pizzeria "Ohima che pizza".
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Sviluppo di un ecosistema digitale completo gestendo l'intero ciclo di vita del software, dal frontend interattivo fino all'infrastruttura cloud e al database serverless.
                    </TypographyP>
                    <ProjectsLinks live={this.live} repo={this.github} />

                    <TypographyH3 className="my-4 mt-8">🚀 Architettura e Stack</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Frontend:</strong> Componenti reattivi e modulari sviluppati in Angular, con deploy continuo e ottimizzato su Vercel.</li>
                        <li><strong>Backend:</strong> Sviluppo di API RESTful robuste e sicure in Java con Spring Boot, ospitate sull'infrastruttura cloud di Render.</li>
                        <li><strong>Database:</strong> Utilizzo di Neon (PostgreSQL in ambiente serverless) per garantire uno storage dei dati affidabile e ad alte prestazioni.</li>
                    </ul>
                </div>
            );
        },
    },
    {
        id: "moneymind",
        category: "Gestionale Fondi",
        title: "MoneyMind",
        src: "/assets/projects-screenshots/moneyMind/home.png",
        screenshots: ["landing.png"],
        skills: {
            frontend: [
                PROJECT_SKILLS.html,
                PROJECT_SKILLS.tailwind,
                PROJECT_SKILLS.angular,
            ],
            backend: [
                PROJECT_SKILLS.springBoot,
                PROJECT_SKILLS.postgres,
            ],
        },
        live: "#",
        github: "https://github.com/darioeliaaa/PROG-WEB",
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Un ecosistema finanziario all-in-one per il budget quotidiano e la simulazione di investimenti reali.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Ho sviluppato MoneyMind per unire il tracciamento delle spese personali e il mondo del trading in un'unica piattaforma intuitiva e reattiva, affrontando sfide architetturali legate alla concorrenza transazionale e all'ottimizzazione delle API.
                    </TypographyP>
                    <ProjectsLinks live={this.live} repo={this.github} />

                    <TypographyH3 className="my-4 mt-8">✨ Funzionalità Principali</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Gestione Budget:</strong> Tracciamento dettagliato di entrate e uscite con grafici interattivi (Chart.js).</li>
                        <li><strong>Wallet Condivisi:</strong> Portafogli in comune con logiche avanzate di limiti di spesa e deposito minimo.</li>
                        <li><strong>Trading & Market Live:</strong> Simulazione di compravendita di Azioni, ETF e Crypto collegata a dati reali (Finnhub/NewsAPI) per il calcolo in tempo reale del PMC.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">🛠️ Dietro le quinte</TypographyH3>
                    <p className="font-mono mb-2">
                        <strong>Integrità Transazionale:</strong> Spostare soldi verso wallet condivisi richiede precisione assoluta. Ho gestito l'atomicità con transazioni ACID (<code>@Transactional</code>) in Spring Boot.
                    </p>
                    <p className="font-mono mb-2">
                        <strong>Caching & API:</strong> Per superare i rate-limit esterni, ho implementato un sistema di cache applicativa aggiornata in background tramite <code>@Scheduled</code>, riducendo a zero i colli di bottiglia di rete.
                    </p>
                </div>
            );
        },
    },
    {
        id: "tripify",
        category: "Enterprise Travel App",
        title: "Tripify",
        src: "/assets/projects-screenshots/tripify/Title.jpg",
        screenshots: ["landing.png"],
        skills: {
            frontend: [
                PROJECT_SKILLS.angular,
                PROJECT_SKILLS.ts,
                PROJECT_SKILLS.tailwind,
            ],
            backend: [
                PROJECT_SKILLS.java,
                PROJECT_SKILLS.springBoot,
                PROJECT_SKILLS.postgres,
                PROJECT_SKILLS.docker,
            ],
        },
        live: "#",
        github: "https://github.com/Matteoiazz/Enterprise-Project",
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Piattaforma enterprise per la gestione dei viaggi e delle prenotazioni, sviluppata in team.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Progetto universitario enterprise realizzato tra Aprile e Luglio collaborando in un team di 4 persone. Tripify offre un'esperienza completa per la pianificazione e l'organizzazione di itinerari complessi.
                    </TypographyP>
                    <ProjectsLinks live={this.live} repo={this.github} />

                    <TypographyH3 className="my-4 mt-8">Sviluppo in Team & Architettura</TypographyH3>
                    <p className="font-mono mb-2">
                        Lavorare in un gruppo di 4 ha richiesto una forte coordinazione, un flusso Git ben strutturato e una rigorosa suddivisione dei task. L'applicazione si basa su un'architettura robusta in Spring Boot per gestire entità relazionali complesse legate a voli, hotel e utenti.
                    </p>
                </div>
            );
        },
    },
    {
        id: "wavely",
        category: "Streaming Musicale",
        title: "Wave.ly",
        src: "/assets/projects-screenshots/wave.ly/home.png",
        screenshots: ["landing.png"],
        skills: {
            frontend: [
                PROJECT_SKILLS.javaFX,
            ],
            backend: [
                PROJECT_SKILLS.java,
                PROJECT_SKILLS.sqlite,
            ],
        },
        live: "#",
        github: "https://github.com/darioeliaaa",
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Un’applicazione desktop per lo streaming musicale ispirata a Spotify.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Wave.ly consente agli utenti di esplorare playlist, artisti e brani, con una coda di riproduzione dinamica e un'interfaccia interattiva progettata in JavaFX.
                    </TypographyP>
                    <ProjectsLinks live={this.live} repo={this.github} />

                    <TypographyH3 className="my-4 mt-8">🎵 Funzionalità Sviluppate</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li>Sistema di riproduzione con gestione della coda dinamica.</li>
                        <li>Ricerca avanzata di brani, playlist e artisti.</li>
                        <li>Profilo utente persistente su database SQLite.</li>
                        <li>Architettura MVC organizzata con controller JavaFX e Scene Builder.</li>
                    </ul>
                </div>
            );
        },
    },
    {
        id: "bulloneco",
        category: "Gestionale Ferramenta",
        title: "Bullone&Co",
        src: "/assets/projects-screenshots/bulloneeco/home.png",
        screenshots: ["landing.png"],
        skills: {
            frontend: [
                PROJECT_SKILLS.javaFX,
                PROJECT_SKILLS.html,
            ],
            backend: [
                PROJECT_SKILLS.java,
                PROJECT_SKILLS.sqlite,
            ],
        },
        live: "#",
        github: "https://github.com/Giammy-bug66/INGSW",
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Gestionale desktop per ottimizzare il magazzino e le operazioni di una ferramenta.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Una sfida che mi ha permesso di mettere in pratica concetti avanzati di ingegneria del software e design pattern architetturali per garantire massima scalabilità.
                    </TypographyP>
                    <ProjectsLinks live={this.live} repo={this.github} />

                    <TypographyH3 className="my-4 mt-8">✨ UI/UX & Pattern</TypographyH3>
                    <p className="font-mono mb-2">
                        <strong>Architettura a Livelli:</strong> Struttura solida basata sulla separazione tra strato Dati (DAO), Logica di Business (Service) e Presentazione (Controller).
                    </p>
                    <p className="font-mono mb-2">
                        <strong>Pattern Strategy:</strong> Utilizzato per il calcolo dinamico del valore del magazzino, scambiando a runtime algoritmi di pricing e svalutazione temporale.
                    </p>
                    <p className="font-mono mb-2">
                        <strong>Dashboard:</strong> Interfaccia con tema CSS "Deep Blue Clarity" e KPI card interattive aggiornate live.
                    </p>
                </div>
            );
        },
    },
    {
        id: "portfolio",
        category: "Portfolio Personale",
        title: "Dario Elia - Portfolio",
        src: "/assets/projects-screenshots/portfolio/landing.png",
        screenshots: ["landing.png"],
        live: "https://dario-portfolio-phi.vercel.app",
        github:"https://github.com/darioeliaaa/Dario-portfolio",
        skills: {
            frontend: [
                PROJECT_SKILLS.ts,
                PROJECT_SKILLS.next,
                PROJECT_SKILLS.tailwind,
                PROJECT_SKILLS.spline,
            ],
            backend: [],
        },
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Il mio biglietto da visita digitale, riprogettato da zero.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Progettato e sviluppato per raccontare chi sono e i progetti che ho realizzato. Ho puntato su un'interfaccia moderna e "fuori dagli schemi", integrando animazioni fluide e web 3D.
                    </TypographyP>
                    <ProjectsLinks live={this.live} repo={this.github} />

                    <TypographyH3 className="my-4 mt-8">Esperienza Immersiva</TypographyH3>
                    <p className="font-mono mb-2">
                        Non è solo un semplice contenitore di informazioni, ma la dimostrazione pratica della mia cura per il frontend. Dai dettagli della tastiera interattiva Spline 3D fino all'adattabilità responsiva garantita da Tailwind CSS.
                    </p>
                </div>
            );
        },
    },
];

export default projects;