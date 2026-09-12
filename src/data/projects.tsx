import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";

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
    kotlin: {
        title: "Kotlin",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">Kt</span>,
    },
    keycloak: {
        title: "Keycloak",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">Key</span>,
    },
    rabbitmq: {
        title: "RabbitMQ",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">MQ</span>,
    },
    cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
    ssr: {
        title: "Angular SSR",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">SSR</span>,
    },
    express: {
        title: "Express",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">Ex</span>,
    },
    androidStudio: {
        title: "Android Studio",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">AS</span>,
    },
    jetpackCompose: {
        title: "Jetpack Compose",
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-bold">JC</span>,
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
                PROJECT_SKILLS.kotlin,
                PROJECT_SKILLS.jetpackCompose,
                PROJECT_SKILLS.androidStudio,
            ],
            backend: [
                PROJECT_SKILLS.java,
                PROJECT_SKILLS.springBoot,
                PROJECT_SKILLS.postgres,
                PROJECT_SKILLS.docker,
                PROJECT_SKILLS.keycloak,
                PROJECT_SKILLS.rabbitmq,
                PROJECT_SKILLS.cloudflare,
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
                        Progetto universitario enterprise realizzato tra Aprile e Luglio collaborando in un team di 4 persone. Tripify offre un'esperienza completa per la pianificazione e l'organizzazione di itinerari complessi, con un backend a microservizi e un client mobile nativo.
                    </TypographyP>

                    <TypographyH3 className="my-4 mt-8">🏗️ Backend a Microservizi</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Servizi:</strong> Spring Boot su Java 17 e Maven, con Spring Cloud Gateway come unico punto d'ingresso verso i client.</li>
                        <li><strong>Dati:</strong> Spring Data JPA su PostgreSQL per entità relazionali complesse (voli, hotel, prenotazioni, utenti).</li>
                        <li><strong>Sicurezza:</strong> OAuth2/OIDC con Keycloak come authorization server, per l'autenticazione centralizzata di tutti i servizi.</li>
                        <li><strong>Comunicazione:</strong> REST sincrono via Feign, messaggistica asincrona con RabbitMQ e aggiornamenti realtime via WebSocket/STOMP.</li>
                        <li><strong>Infrastruttura:</strong> containerizzato con Docker Compose ed esposto in HTTPS tramite tunnel Cloudflare.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">📱 Client Mobile Nativo</TypographyH3>
                    <p className="font-mono mb-2">
                        App Android nativa in Kotlin e Jetpack Compose, con Retrofit/OkHttp verso il gateway, AppAuth per il login OIDC e DataStore per la persistenza locale di preferenze e token.
                    </p>

                    <TypographyH3 className="my-4 mt-8">👥 Sviluppo in Team</TypographyH3>
                    <p className="font-mono mb-2">
                        Lavorare in un gruppo di 4 ha richiesto una forte coordinazione, un flusso Git ben strutturato e una rigorosa suddivisione dei task tra backend, mobile e infrastruttura.
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
        live: "https://www.darioelia.it",
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

                    <TypographyH3 className="my-4 mt-8">Esperienza Immersiva</TypographyH3>
                    <p className="font-mono mb-2">
                        Non è solo un semplice contenitore di informazioni, ma la dimostrazione pratica della mia cura per il frontend. Dai dettagli della tastiera interattiva Spline 3D fino all'adattabilità responsiva garantita da Tailwind CSS.
                    </p>
                </div>
            );
        },
    },
];

/**
 * Progetti dimostrativi: case study nati di mia iniziativa, non commissionati
 * da nessun cliente. Stanno in un array separato — e in una sezione separata
 * del sito — proprio per non sembrare lavori pagati: il committente che
 * guarda il portfolio deve poter distinguere a colpo d'occhio cosa è stato
 * consegnato davvero e cosa è un esercizio di stile.
 */
const demoProjects: Project[] = [
    {
        id: "pelaggi",
        category: "Sito Vetrina · Case Study",
        title: "Azienda Agricola",
        src: "/assets/projects-screenshots/pelaggi/home.png",
        screenshots: ["home.png"],
        skills: {
            frontend: [
                PROJECT_SKILLS.angular,
                PROJECT_SKILLS.ts,
                PROJECT_SKILLS.html,
            ],
            backend: [PROJECT_SKILLS.ssr, PROJECT_SKILLS.express],
        },
        live: "https://sito-pelaggi.vercel.app",
        github: "https://github.com/darioeliaaa/sitoAziendaAgricola",
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Sito vetrina per un&apos;azienda agricola con frantoio di proprietà.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Un case study personale, non un incarico commissionato: l&apos;ho
                        costruito per mettere alla prova un&apos;estetica editoriale e il
                        rendering server-side di Angular su un sito dove la SEO locale è
                        tutto. I contatti e i dati aziendali nella demo sono volutamente
                        dei segnaposto.
                    </TypographyP>

                    <TypographyH3 className="my-4 mt-8">🎨 Design editoriale</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Tipografia:</strong> Playfair Display per i titoli e Inter per il testo, l&apos;accoppiata serif/sans che dà il tono da rivista.</li>
                        <li><strong>Palette:</strong> verde oliva, oro e crema come variabili CSS, così l&apos;intera identità si cambia da un punto solo.</li>
                        <li><strong>Angoli vivi:</strong> raggi di 2px invece dei soliti bordi morbidi, per un&apos;impaginazione più asciutta e stampata.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">⚙️ Architettura</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Angular 21</strong> con componenti standalone e routing su quattro pagine (Home, Frantoio, Chi Siamo, Contatti).</li>
                        <li><strong>SSR e prerendering:</strong> <code>@angular/ssr</code> su Express, con tutte le rotte generate staticamente in fase di build.</li>
                        <li><strong>Form reattivi:</strong> la pagina contatti usa i Reactive Forms con validazione su nome, email e messaggio.</li>
                        <li><strong>Galleria del frantoio:</strong> carosello scritto a mano, senza librerie, con navigazione avanti/indietro e puntini cliccabili.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">🔍 SEO locale</TypographyH3>
                    <p className="font-mono mb-2">
                        Il punto dell&apos;esercizio: title e meta description scritti attorno
                        alla query che conta davvero (&quot;olio extravergine a Strongoli&quot;),
                        Open Graph per l&apos;anteprima su WhatsApp e Instagram, <code>lang=&quot;it&quot;</code>,
                        theme-color per la barra del browser su mobile e HTML già renderizzato
                        alla prima richiesta, senza aspettare il JavaScript.
                    </p>
                </div>
            );
        },
    },
    {
        id: "trediciTattoo",
        category: "Sito Vetrina · Case Study",
        title: "TREDICI — Studio di Tatuaggi",
        src: "/assets/projects-screenshots/trediciTattoo/trediciTattoo.png",
        screenshots: ["trediciTattoo.png"],
        skills: {
            frontend: [
                PROJECT_SKILLS.angular,
                PROJECT_SKILLS.ts,
                PROJECT_SKILLS.html,
            ],
            backend: [PROJECT_SKILLS.ssr, PROJECT_SKILLS.express],
        },
        live: "https://tredici-tattoo.vercel.app",
        github: "https://github.com/darioeliaaa/tredici-tattoo",
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Sito vetrina multi-pagina per uno studio di tatuaggi indipendente.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Un case study personale, non un incarico commissionato: la fascia
                        &quot;Sito Vetrina&quot; del mio listino, portata al limite. Il punto
                        di partenza non era una griglia di card qualunque ma un vero foglio
                        flash da studio — carta chiara, inchiostro nero, un solo colore
                        d&apos;accento: il viola da stencil transfer, quello del ricalco
                        sulla pelle prima di tatuare.
                    </TypographyP>

                    <TypographyH3 className="my-4 mt-8">🖤 Un&apos;estetica fuori dagli schemi</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Foglio flash vero:</strong> i 12 pezzi disponibili sono card in stile flash sheet, con icone disegnate a mano (sprite SVG) invece delle solite foto stock.</li>
                        <li><strong>Tipografia da locandina:</strong> un display serif deciso per i titoli e un monospace da macchina da scrivere per il corpo, a rompere la solita coppia sans-serif/sans-serif dei siti generati con l&apos;IA.</li>
                        <li><strong>Un solo accento cromatico:</strong> il viola stencil compare col contagocce — su carta chiara e inchiostro nero, basta e avanza.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">⚙️ Architettura</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Angular 22</strong> standalone e <strong>zoneless</strong>, con routing lazy-loaded su 6 pagine (Home, Galleria, Artisti, Stili &amp; Prezzi, Prenota, Contatti).</li>
                        <li><strong>SSR e prerendering:</strong> <code>@angular/ssr</code>, tutte le rotte generate staticamente in build — zero server Node necessario in produzione.</li>
                        <li><strong>Galleria a signal:</strong> il filtro per stile (Blackwork/Fineline/Tradizionale) è un signal, non manipolazione diretta del DOM.</li>
                        <li><strong>Prenotazione:</strong> Reactive Form con upload di riferimento immagine e validazione su artista, stile, zona del corpo e dimensione.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">🔍 SEO &amp; dati locali</TypographyH3>
                    <p className="font-mono mb-2">
                        Ogni pagina imposta il proprio <code>title</code> e <code>description</code>
                        dal componente stesso, e nell&apos;<code>&lt;head&gt;</code> è iniettato
                        structured data schema.org (<code>TattooParlor</code>) con indirizzo e
                        orari leggibili direttamente da Google — lo stesso trattamento che
                        userei per un cliente vero con un negozio fisico da far trovare.
                    </p>
                </div>
            );
        },
    },
    {
        id: "unaNotteDiStelle",
        category: "Landing Page · Case Study",
        title: "Una Notte di Stelle",
        src: "/assets/projects-screenshots/unaNotteDiStelle/unaNotteDiStelle.png",
        screenshots: ["unaNotteDiStelle.png"],
        skills: {
            frontend: [
                PROJECT_SKILLS.angular,
                PROJECT_SKILLS.ts,
                PROJECT_SKILLS.html,
            ],
            backend: [PROJECT_SKILLS.ssr, PROJECT_SKILLS.express],
        },
        live: "https://una-notte-di-stelle.vercel.app",
        github: "https://github.com/darioeliaaa/una-notte-di-stelle",
        get content() {
            return (
                <div>
                    <TypographyP className="font-mono text-2xl text-center">
                        Landing page per un evento immaginario di osservazione astronomica.
                    </TypographyP>
                    <TypographyP className="font-mono mt-4">
                        Un case study personale, non un incarico commissionato: la fascia
                        &quot;Landing Page&quot; del mio listino, per un evento inventato di
                        osservazione delle Geminidi sul Piano di Lorica, in Sila. L&apos;idea
                        di partenza era trattare la pagina come una vera carta del cielo,
                        non l&apos;ennesima one-page a sezioni impilate.
                    </TypographyP>

                    <TypographyH3 className="my-4 mt-8">✦ Una pagina come una carta del cielo</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Cielo animato:</strong> un canvas 2D disegna a mano stelle e stelle cadenti, senza nessuna libreria di grafica di terze parti.</li>
                        <li><strong>Costellazione che si scrive:</strong> una linea SVG collega le sezioni una a una mentre scorri, invece del solito indicatore di progresso a barra.</li>
                        <li><strong>Countdown a quadrante:</strong> il conto alla rovescia è un quadrante con le tacche disegnato su misura, non l&apos;ennesimo orologio digitale copiaincollato.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">⚙️ Architettura</TypographyH3>
                    <ul className="list-disc list-inside font-mono mb-4 space-y-2">
                        <li><strong>Angular 22</strong> standalone e <strong>zoneless</strong>: countdown, form e animazioni di reveal allo scroll girano tutti su signal.</li>
                        <li><strong>SSR e prerendering:</strong> <code>@angular/ssr</code> genera HTML statico reale per i crawler, non una pagina vuota in attesa di JavaScript.</li>
                        <li><strong>Countdown SSR-corretto:</strong> il valore iniziale si calcola in modo sincrono nel costruttore (pura <code>Date</code>, nessun DOM), così anche l&apos;HTML pre-renderizzato mostra il numero vero.</li>
                        <li><strong>Form di prenotazione:</strong> Reactive Form per iscriversi alla serata, con validazione dei campi.</li>
                    </ul>

                    <TypographyH3 className="my-4 mt-8">🔍 SEO</TypographyH3>
                    <p className="font-mono mb-2">
                        Title e description impostati via <code>Title</code>/<code>Meta</code>
                        di Angular, Open Graph per l&apos;anteprima su WhatsApp e Instagram,
                        <code>lang=&quot;it&quot;</code>, <code>robots.txt</code> e
                        <code>sitemap.xml</code> — la data e il luogo dell&apos;evento nella
                        demo sono volutamente inventati.
                    </p>
                </div>
            );
        },
    },
];

export { demoProjects };
export default projects;