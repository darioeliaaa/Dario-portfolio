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
        "Kotlin · App Android native",
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
        "sviluppatore app",
        "siti web Calabria",
        "app mobile Calabria",
        "web development",
        "Unical",
        "Java",
        "Spring Boot",
        "Angular",
        "Kotlin",
        "Android",
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
     * Link Calendly per una call conoscitiva telefonica. Vuoto = niente
     * bottone: mai un link morto pubblicato per errore.
     */
    calendly: "https://calendly.com/darioelia61/30min",
    /**
     * Dove arrivano i messaggi del form contatti. Lo legge solo il server
     * (src/app/api/contact/route.ts), quindi non finisce mai nel bundle né
     * viene stampato come testo nella pagina — è `email` qui sopra a decidere
     * cosa è visibile — e non diventa l'ennesimo indirizzo raccolto dagli
     * scraper. Sovrascrivibile con la variabile CONTACT_TO_EMAIL.
     */
    contactEmail: "darioelia61@gmail.com",
    /**
     * Foto profilo per la sezione "Chi sono". Lascia vuoto per mostrare il
     * monogramma disegnato; metti una tua foto in /public/assets e indicala qui
     * (es. "/assets/dario.jpg") per sostituirlo.
     */
    avatar: "",
    /**
     * Dominio vero e proprio — quello che finisce, letteralmente, dentro le
     * anteprime social: è il testo che l'immagine OG stampa in basso, ed è il
     * valore di og:url/canonical/sitemap. Era rimasto sull'URL provvisorio di
     * Vercel da prima che darioelia.it fosse collegato: chiunque condivideva
     * il sito vedeva la card con scritto "dario-portfolio-phi.vercel.app"
     * invece del dominio vero.
     */
    site: "https://www.darioelia.it",

    /**
     * Il CV vero e proprio, quello che viene scaricato dalla pagina /cv.
     * È il PDF autentico messo in /public: la pagina /cv ne è la versione
     * web (stessi contenuti, leggibile e indicizzabile), ma il file che
     * finisce in mano a un recruiter è ESATTAMENTE questo.
     *
     * Per aggiornarlo: sostituisci public/Dario_Elia_CV.pdf con la nuova
     * versione (stesso nome, così il link non cambia mai) e allinea i
     * contenuti di src/app/cv/cv-view.tsx.
     */
    cv: {
        href: "/Dario_Elia_CV.pdf",
        /** Nome con cui il file viene salvato sul computer di chi scarica. */
        filename: "Dario_Elia_CV_2026.pdf",
    },

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
