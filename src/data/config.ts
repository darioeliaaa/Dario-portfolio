/**
 * Single source of truth for identity, copy and links.
 *
 * ⚠️ Da compilare prima del deploy:
 *   - `email`  → lasciata vuota di proposito: appena la inserisci compare
 *                automaticamente nella sezione Contatti e nel footer.
 *   - `site`   → l'URL di produzione (serve per OG image, sitemap e canonical).
 */
const config = {
    title: "Dario Elia | Full-Stack Developer",
    role: "Junior Full-Stack Developer",
    /** Ruoli che ruotano sotto il nome nella hero. */
    roles: [
        "Junior Full-Stack Developer",
        "Studente di Informatica @ Unical",
        "Creative Frontend & Web 3D",
        "Java · Spring Boot · Angular",
    ],
    /** Frase breve sotto i ruoli, nella hero. */
    tagline:
        "Costruisco interfacce fuori dagli schemi e backend che reggono il peso. Dal primo pixel al deploy.",
    description: {
        long: "Ciao, sono Dario. Ho 23 anni e sono uno sviluppatore con il pallino per le interfacce fuori dagli schemi. Le mie competenze spaziano dal software development classico fino alla sperimentazione con il web 3D e il frontend creativo. Studio Informatica all'Università della Calabria (Unical) e mi piace trasformare concetti complessi in codice elegante ed esperienze digitali immersive.",
        short:
            "Junior Full Stack Developer e studente all'Unical. Appassionato di interfacce creative, backend solido ed esperienze digitali interattive.",
    },
    keywords: [
        "Dario Elia",
        "portfolio",
        "full-stack developer",
        "junior developer",
        "sviluppatore web",
        "siti web Calabria",
        "web development",
        "Unical",
        "Java",
        "Spring Boot",
        "Angular",
        "PostgreSQL",
        "3D animations",
        "creative frontend",
    ],
    author: "Dario Elia",
    location: "Calabria, Italia",
    /** Mostrato come badge "disponibile" nella hero. Metti a false quando sei pieno. */
    available: true,
    availabilityLabel: "Disponibile per nuovi progetti",
    /** ⚠️ Inserisci qui la tua email pubblica per attivarne la visualizzazione. */
    email: "",
    /**
     * Foto profilo per la sezione "Chi sono". Lascia vuoto per mostrare il
     * monogramma disegnato; metti una tua foto in /public/assets e indicala qui
     * (es. "/assets/dario.jpg") per sostituirlo.
     */
    avatar: "",
    site: "https://dario-portfolio-phi.vercel.app",

    // for github stars button
    githubUsername: "darioeliaaa",
    githubRepo: "Dario-portfolio",

    /**
     * L'immagine di anteprima social è GENERATA da src/app/opengraph-image.tsx
     * a partire da questi dati: non serve nessun PNG statico da tenere
     * aggiornato a mano.
     */
    get ogImg() {
        return this.site + "/opengraph-image";
    },
    social: {
        twitter: "",
        linkedin: "https://www.linkedin.com/in/dario-elia-2610b3375/",
        instagram: "https://www.instagram.com/darioeliaaa/",
        facebook: "",
        github: "https://github.com/darioeliaaa",
    },
};
export { config };
