const config = {
    title: "Dario Elia | Full-Stack Developer",
    description: {
        long: "Ciao, sono Dario. Ho 22 anni e sono uno sviluppatore con il pallino per le interfacce fuori dagli schemi. Le mie competenze spaziano dal software development classico fino alla sperimentazione con il web 3D e il frontend creativo. Studio Informatica all'Università della Calabria (Unical) e mi piace trasformare concetti complessi in codice elegante ed esperienze digitali immersive.",
        short:
            "Junior Full Stack Developer e studente all'Unical. Appassionato di interfacce creative, backend solido ed esperienze digitali interattive.",
    },
    keywords: [
        "Dario Elia",
        "portfolio",
        "full-stack developer",
        "junior developer",
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
    email: "tua.email@example.com", // Inserisci qui la tua email reale per ricevere i contatti
    site: "https://iltuodominio.vercel.app", // Sostituisci con il link di Vercel quando lo metterai online

    // for github stars button
    githubUsername: "darioeliaaa",
    githubRepo: "Dario-portfolio",

    get ogImg() {
        return this.site + "/assets/seo/og-image.png";
    },
    social: {
        twitter: "", // Puoi lasciarlo vuoto o rimuovere la riga
        linkedin: "https://www.linkedin.com/in/dario-elia-2610b3375/",
        instagram: "https://www.instagram.com/darioeliaaa/",
        facebook: "", // Puoi lasciarlo vuoto o rimuovere la riga
        github: "https://github.com/darioeliaaa",
    },
};
export { config };