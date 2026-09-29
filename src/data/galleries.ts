// Generato da scripts/gallery/build.mjs: modifica scripts/gallery/config.mjs e rilancia lo script.

export type GalleryShot = {
    label: string;
    /** Percorso mostrato nella barra dell'indirizzo (solo siti web). */
    path?: string;
    w: number;
    h: number;
    rail: string;
    railW: number;
    full: string;
};

export type GalleryView = "desktop" | "mobile";

export type Gallery = {
    /** "web": finestra del browser; "app": finestra di un'app desktop; "mobile": solo telefono. */
    kind: "web" | "app" | "mobile";
    /** Dominio nella barra dell'indirizzo, per i siti. */
    host?: string;
    /** Nome nella barra della finestra, per le app. */
    title?: string;
    views: Partial<Record<GalleryView, GalleryShot[]>>;
};

export const galleries: Record<string, Gallery> = {
    "tripify": {
        "kind": "mobile",
        "title": "Tripify",
        "views": {
            "mobile": [
                {
                    "label": "Accesso",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-01-accesso-a0f87a29-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-01-accesso-a0f87a29-1080.webp"
                },
                {
                    "label": "Registrazione",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-02-registrazione-81f51b75-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-02-registrazione-81f51b75-1080.webp"
                },
                {
                    "label": "Home",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-03-home-5ba8a5e4-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-03-home-5ba8a5e4-1080.webp"
                },
                {
                    "label": "Ricerca",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-04-ricerca-90119be0-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-04-ricerca-90119be0-1080.webp"
                },
                {
                    "label": "Hotel · date e camere",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-05-hotel-b2c291cd-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-05-hotel-b2c291cd-1080.webp"
                },
                {
                    "label": "Hotel · servizi e mappa",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-06-hotel-2-8c29689b-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-06-hotel-2-8c29689b-1080.webp"
                },
                {
                    "label": "Volo · classi e passeggeri",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-07-volo-2a9a97d0-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-07-volo-2a9a97d0-1080.webp"
                },
                {
                    "label": "Esperienza",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-08-esperienza-c91a9b83-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-08-esperienza-c91a9b83-1080.webp"
                },
                {
                    "label": "Recensioni",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-09-recensioni-25e5ca13-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-09-recensioni-25e5ca13-1080.webp"
                },
                {
                    "label": "Filtri avanzati",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-10-filtri-89c37484-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-10-filtri-89c37484-1080.webp"
                },
                {
                    "label": "Itinerari pubblici",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-11-itinerari-84d0020a-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-11-itinerari-84d0020a-1080.webp"
                },
                {
                    "label": "Dettaglio itinerario",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-12-itinerario-5deebd8b-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-12-itinerario-5deebd8b-1080.webp"
                },
                {
                    "label": "Carrello",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-13-carrello-820e82d2-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-13-carrello-820e82d2-1080.webp"
                },
                {
                    "label": "Checkout",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-14-checkout-b6f0330d-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-14-checkout-b6f0330d-1080.webp"
                },
                {
                    "label": "Le mie prenotazioni",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-15-prenotazioni-e72e70bf-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-15-prenotazioni-e72e70bf-1080.webp"
                },
                {
                    "label": "Chat con l'organizzatore",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-16-chat-c39b1bdc-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-16-chat-c39b1bdc-1080.webp"
                },
                {
                    "label": "Profilo",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-17-profilo-378f223e-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-17-profilo-378f223e-1080.webp"
                },
                {
                    "label": "Documenti di viaggio",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-18-documenti-85d32fcc-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-18-documenti-85d32fcc-1080.webp"
                },
                {
                    "label": "Compagni di viaggio",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-19-compagni-18893b98-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-19-compagni-18893b98-1080.webp"
                },
                {
                    "label": "Metodi di pagamento",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-20-portafoglio-eda17231-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-20-portafoglio-eda17231-1080.webp"
                },
                {
                    "label": "Agenzie",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-21-organizzatori-7408984a-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-21-organizzatori-7408984a-1080.webp"
                },
                {
                    "label": "Vetrina organizzatore",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-22-vetrina-9e533a8d-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-22-vetrina-9e533a8d-1080.webp"
                },
                {
                    "label": "Organizzatore · prenotazioni e incassi",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-23-org-prenotazioni-76d955b1-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-23-org-prenotazioni-76d955b1-1080.webp"
                },
                {
                    "label": "Organizzatore · annunci",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-24-org-annunci-0a345683-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-24-org-annunci-0a345683-1080.webp"
                },
                {
                    "label": "Organizzatore · nuovo annuncio",
                    "w": 1080,
                    "h": 2400,
                    "rail": "/assets/gallery/tripify/m-25-org-nuovo-1be99142-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/tripify/m-25-org-nuovo-1be99142-1080.webp"
                }
            ]
        }
    },
    "wavely": {
        "kind": "app",
        "title": "Wave.ly",
        "views": {
            "desktop": [
                {
                    "label": "Accesso",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/01-accesso-6446832d-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/01-accesso-6446832d-2880.webp"
                },
                {
                    "label": "Registrazione",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/01b-registrati-efd33f35-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/01b-registrati-efd33f35-2880.webp"
                },
                {
                    "label": "Home",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/02-home-04592fdd-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/02-home-04592fdd-2880.webp"
                },
                {
                    "label": "Album",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/03-album-c008e6cd-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/03-album-c008e6cd-2880.webp"
                },
                {
                    "label": "Artista",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/04-artista-034a561c-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/04-artista-034a561c-2880.webp"
                },
                {
                    "label": "Playlist",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/05-playlist-95c6c760-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/05-playlist-95c6c760-2880.webp"
                },
                {
                    "label": "Ricerca",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/06-ricerca-8294491d-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/06-ricerca-8294491d-2880.webp"
                },
                {
                    "label": "Libreria",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/07-libreria-879b03d8-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/07-libreria-879b03d8-2880.webp"
                },
                {
                    "label": "Lettore a schermo intero",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/08-palco-edaf7682-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/08-palco-edaf7682-2880.webp"
                },
                {
                    "label": "Coda di riproduzione",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/10-coda-38478e95-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/10-coda-38478e95-2880.webp"
                },
                {
                    "label": "Statistiche d'ascolto",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/11-rewind-7e98bc70-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/11-rewind-7e98bc70-2880.webp"
                },
                {
                    "label": "Equalizzatore",
                    "w": 2880,
                    "h": 1828,
                    "rail": "/assets/gallery/wavely/12-mixer-2c9aeb09-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/wavely/12-mixer-2c9aeb09-2880.webp"
                }
            ]
        }
    },
    "bulloneco": {
        "kind": "app",
        "title": "Bullone&Co",
        "views": {
            "desktop": [
                {
                    "label": "Accesso",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/01-accesso-b2ab63be-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/01-accesso-b2ab63be-2880.webp"
                },
                {
                    "label": "Registrazione",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/02-registrazione-62c2c3c0-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/02-registrazione-62c2c3c0-2880.webp"
                },
                {
                    "label": "Catalogo",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/03-catalogo-555e9223-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/03-catalogo-555e9223-2880.webp"
                },
                {
                    "label": "Scheda articolo",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/04-scheda-e3e75750-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/04-scheda-e3e75750-2880.webp"
                },
                {
                    "label": "Carrello",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/05-cassetta-f3b19271-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/05-cassetta-f3b19271-2880.webp"
                },
                {
                    "label": "I miei ordini",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/06-ordini-eee4c0fb-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/06-ordini-eee4c0fb-2880.webp"
                },
                {
                    "label": "Richieste al negozio",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/07-richieste-714e6de1-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/07-richieste-714e6de1-2880.webp"
                },
                {
                    "label": "Profilo",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/08-profilo-f167beab-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/08-profilo-f167beab-2880.webp"
                },
                {
                    "label": "Admin · Magazzino",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/09-registro-b1f13414-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/09-registro-b1f13414-2880.webp"
                },
                {
                    "label": "Admin · Report",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/10-report-08aaee05-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/10-report-08aaee05-2880.webp"
                },
                {
                    "label": "Admin · Ordini",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/11-ordini-admin-30819e99-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/11-ordini-admin-30819e99-2880.webp"
                },
                {
                    "label": "Admin · Richieste",
                    "w": 2880,
                    "h": 1872,
                    "rail": "/assets/gallery/bulloneco/12-richieste-admin-95d016f4-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/bulloneco/12-richieste-admin-95d016f4-2880.webp"
                }
            ]
        }
    },
    "ottone": {
        "kind": "web",
        "host": "ottone-telai.vercel.app",
        "views": {
            "desktop": [
                {
                    "label": "Home",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/01-home-c39a3e54-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/01-home-c39a3e54-2880.webp"
                },
                {
                    "label": "I quattro telai",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/02-quattro-telai-774b56a2-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/02-quattro-telai-774b56a2-2880.webp"
                },
                {
                    "label": "Dalla misura alla consegna",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/03-processo-06830597-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/03-processo-06830597-2880.webp"
                },
                {
                    "label": "Catalogo con filtri",
                    "path": "/telai",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/04-catalogo-9d72a44c-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/04-catalogo-9d72a44c-2880.webp"
                },
                {
                    "label": "Scheda telaio",
                    "path": "/telai/turchino",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/05-scheda-64070d7e-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/05-scheda-64070d7e-2880.webp"
                },
                {
                    "label": "Geometrie e tubi",
                    "path": "/telai/turchino",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/06-geometrie-b017caf4-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/06-geometrie-b017caf4-2880.webp"
                },
                {
                    "label": "Configuratore 3D",
                    "path": "/configura/turchino",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/07-configuratore-8d9773a8-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/07-configuratore-8d9773a8-2880.webp"
                },
                {
                    "label": "Verniciatura e giunti",
                    "path": "/configura/turchino",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/08-finiture-d5b64d30-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/08-finiture-d5b64d30-2880.webp"
                },
                {
                    "label": "Progetti salvati",
                    "path": "/carrello",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/10-progetti-db4afb3b-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/10-progetti-db4afb3b-2880.webp"
                },
                {
                    "label": "L'officina",
                    "path": "/officina",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/11-officina-94e7a2d1-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/11-officina-94e7a2d1-2880.webp"
                },
                {
                    "label": "Le cinque fasi",
                    "path": "/officina",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/12-fasi-b2b95204-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/12-fasi-b2b95204-2880.webp"
                },
                {
                    "label": "Area rivenditori",
                    "path": "/rivenditori",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/13-rivenditori-e3ca690b-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/13-rivenditori-e3ca690b-2880.webp"
                },
                {
                    "label": "Listino e proforma",
                    "path": "/rivenditori",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/14-listino-314d2d76-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/14-listino-314d2d76-2880.webp"
                },
                {
                    "label": "Contatti",
                    "path": "/contatti",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ottone/15-contatti-3258bcc7-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ottone/15-contatti-3258bcc7-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Home",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ottone/m-01-home-63ca6f00-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ottone/m-01-home-63ca6f00-1170.webp"
                },
                {
                    "label": "Catalogo",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ottone/m-02-catalogo-98666bea-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ottone/m-02-catalogo-98666bea-1170.webp"
                },
                {
                    "label": "Scheda telaio",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ottone/m-03-scheda-168d1620-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ottone/m-03-scheda-168d1620-1170.webp"
                },
                {
                    "label": "Configuratore 3D",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ottone/m-04-configuratore-67978410-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ottone/m-04-configuratore-67978410-1170.webp"
                },
                {
                    "label": "Progetti salvati",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ottone/m-05-progetti-ca4d5cc5-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ottone/m-05-progetti-ca4d5cc5-1170.webp"
                },
                {
                    "label": "L'officina",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ottone/m-06-officina-05e122bf-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ottone/m-06-officina-05e122bf-1170.webp"
                }
            ]
        }
    },
    "piccantomane": {
        "kind": "web",
        "host": "piccantemane.vercel.app",
        "views": {
            "desktop": [
                {
                    "label": "Home",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/01-home-e3006abe-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/01-home-e3006abe-2880.webp"
                },
                {
                    "label": "Le quattro linee",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/02-linee-9ea0a045-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/02-linee-9ea0a045-2880.webp"
                },
                {
                    "label": "In etichetta",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/03-etichetta-c206a405-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/03-etichetta-c206a405-2880.webp"
                },
                {
                    "label": "Diamante di degustazione",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/04-degustazione-4ffb8abf-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/04-degustazione-4ffb8abf-2880.webp"
                },
                {
                    "label": "Negozio",
                    "path": "/negozio",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/05-negozio-24a8385f-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/05-negozio-24a8385f-2880.webp"
                },
                {
                    "label": "Scheda prodotto",
                    "path": "/prodotto/riserva-extrema",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/06-prodotto-7d617cd8-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/06-prodotto-7d617cd8-2880.webp"
                },
                {
                    "label": "Scala Scoville",
                    "path": "/prodotto/riserva-extrema",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/07-scala-32d82367-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/07-scala-32d82367-2880.webp"
                },
                {
                    "label": "Carrello",
                    "path": "/carrello",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/08-carrello-ae6d3cd4-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/08-carrello-ae6d3cd4-2880.webp"
                },
                {
                    "label": "Checkout",
                    "path": "/checkout",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/09-checkout-204943d3-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/09-checkout-204943d3-2880.webp"
                },
                {
                    "label": "Registro ordini",
                    "path": "/registro-ordini",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/10-registro-03926c86-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/10-registro-03926c86-2880.webp"
                },
                {
                    "label": "Il marchio",
                    "path": "/il-marchio",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/11-marchio-2fbc84b3-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/11-marchio-2fbc84b3-2880.webp"
                },
                {
                    "label": "Spedizioni",
                    "path": "/spedizioni",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/12-spedizioni-aa06d045-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/12-spedizioni-aa06d045-2880.webp"
                },
                {
                    "label": "Contatti",
                    "path": "/contatti",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/piccantomane/13-contatti-cb6edfe2-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/piccantomane/13-contatti-cb6edfe2-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Home",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/piccantomane/m-01-home-3de7ec23-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/piccantomane/m-01-home-3de7ec23-1170.webp"
                },
                {
                    "label": "Negozio",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/piccantomane/m-02-negozio-b5d2b411-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/piccantomane/m-02-negozio-b5d2b411-1170.webp"
                },
                {
                    "label": "Scheda prodotto",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/piccantomane/m-03-prodotto-ffd6f28e-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/piccantomane/m-03-prodotto-ffd6f28e-1170.webp"
                },
                {
                    "label": "Scala Scoville",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/piccantomane/m-04-scala-c0076caf-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/piccantomane/m-04-scala-c0076caf-1170.webp"
                },
                {
                    "label": "Carrello",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/piccantomane/m-05-carrello-da5fa6f3-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/piccantomane/m-05-carrello-da5fa6f3-1170.webp"
                },
                {
                    "label": "Checkout",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/piccantomane/m-06-checkout-bb673d60-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/piccantomane/m-06-checkout-bb673d60-1170.webp"
                }
            ]
        }
    },
    "sidero": {
        "kind": "web",
        "host": "sidero-cantina.vercel.app",
        "views": {
            "desktop": [
                {
                    "label": "Home",
                    "path": "/it",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/01-home-52fd99d3-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/01-home-52fd99d3-2880.webp"
                },
                {
                    "label": "Le etichette",
                    "path": "/it",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/02-etichette-b7c61b63-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/02-etichette-b7c61b63-2880.webp"
                },
                {
                    "label": "Mappa delle parcelle",
                    "path": "/it",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/03-tavola-5d25e3f5-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/03-tavola-5d25e3f5-2880.webp"
                },
                {
                    "label": "L'anno in vigna",
                    "path": "/it",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/04-anno-fab58b4a-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/04-anno-fab58b4a-2880.webp"
                },
                {
                    "label": "Dal diario",
                    "path": "/it",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/05-diario-home-47a24150-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/05-diario-home-47a24150-2880.webp"
                },
                {
                    "label": "I vini",
                    "path": "/it/vini",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/06-vini-24c01a73-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/06-vini-24c01a73-2880.webp"
                },
                {
                    "label": "Scheda vino",
                    "path": "/it/vini/riserva",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/07-riserva-ef13f060-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/07-riserva-ef13f060-2880.webp"
                },
                {
                    "label": "Scheda vino · rosato",
                    "path": "/it/vini/punta-alice",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/08-punta-alice-d19a6d48-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/08-punta-alice-d19a6d48-2880.webp"
                },
                {
                    "label": "Territorio",
                    "path": "/it/territorio",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/09-territorio-da1dcfeb-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/09-territorio-da1dcfeb-2880.webp"
                },
                {
                    "label": "Visite e degustazioni",
                    "path": "/it/visite",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/10-visite-23756d4b-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/10-visite-23756d4b-2880.webp"
                },
                {
                    "label": "Diario",
                    "path": "/it/diario",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/11-diario-780fd22c-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/11-diario-780fd22c-2880.webp"
                },
                {
                    "label": "La cantina",
                    "path": "/it/cantina",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/12-cantina-b2350c79-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/12-cantina-b2350c79-2880.webp"
                },
                {
                    "label": "Distribuzione",
                    "path": "/it/distribuzione",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/13-distribuzione-2e32f474-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/13-distribuzione-2e32f474-2880.webp"
                },
                {
                    "label": "Contatti",
                    "path": "/it/contatti",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/sidero/14-contatti-32160cdd-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/sidero/14-contatti-32160cdd-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Home",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/sidero/m-01-home-2698eed3-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/sidero/m-01-home-2698eed3-1170.webp"
                },
                {
                    "label": "Scheda vino",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/sidero/m-02-riserva-576957e2-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/sidero/m-02-riserva-576957e2-1170.webp"
                },
                {
                    "label": "Mappa delle parcelle",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/sidero/m-03-tavola-9bd8c2fd-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/sidero/m-03-tavola-9bd8c2fd-1170.webp"
                },
                {
                    "label": "L'anno in vigna",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/sidero/m-04-anno-3e111807-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/sidero/m-04-anno-3e111807-1170.webp"
                },
                {
                    "label": "Visite",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/sidero/m-05-visite-cc2b97d5-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/sidero/m-05-visite-cc2b97d5-1170.webp"
                },
                {
                    "label": "I vini",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/sidero/m-06-vini-154a12f3-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/sidero/m-06-vini-154a12f3-1170.webp"
                }
            ]
        }
    },
    "pelaggi": {
        "kind": "web",
        "host": "sito-pelaggi.vercel.app",
        "views": {
            "desktop": [
                {
                    "label": "Home",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/pelaggi/01-home-7fae6043-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/pelaggi/01-home-7fae6043-2880.webp"
                },
                {
                    "label": "I tre pilastri",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/pelaggi/02-pilastri-1bfb3946-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/pelaggi/02-pilastri-1bfb3946-2880.webp"
                },
                {
                    "label": "Dalla terra alla tavola",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/pelaggi/03-tavola-5819352c-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/pelaggi/03-tavola-5819352c-2880.webp"
                },
                {
                    "label": "Il frantoio",
                    "path": "/frantoio",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/pelaggi/04-frantoio-07aa3f3c-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/pelaggi/04-frantoio-07aa3f3c-2880.webp"
                },
                {
                    "label": "I nostri lavori",
                    "path": "/frantoio",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/pelaggi/05-lavori-f0178fb4-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/pelaggi/05-lavori-f0178fb4-2880.webp"
                },
                {
                    "label": "La nostra storia",
                    "path": "/chi-siamo",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/pelaggi/06-chi-siamo-91591d9e-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/pelaggi/06-chi-siamo-91591d9e-2880.webp"
                },
                {
                    "label": "Contatti",
                    "path": "/contatti",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/pelaggi/07-contatti-0e7720bd-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/pelaggi/07-contatti-0e7720bd-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Home",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/pelaggi/m-01-home-d7506af3-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/pelaggi/m-01-home-d7506af3-1170.webp"
                },
                {
                    "label": "I tre pilastri",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/pelaggi/m-02-pilastri-430fcae2-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/pelaggi/m-02-pilastri-430fcae2-1170.webp"
                },
                {
                    "label": "Il frantoio",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/pelaggi/m-03-frantoio-c5d10d04-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/pelaggi/m-03-frantoio-c5d10d04-1170.webp"
                },
                {
                    "label": "I nostri lavori",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/pelaggi/m-04-lavori-40a8146d-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/pelaggi/m-04-lavori-40a8146d-1170.webp"
                },
                {
                    "label": "La nostra storia",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/pelaggi/m-05-chi-siamo-a643e1b6-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/pelaggi/m-05-chi-siamo-a643e1b6-1170.webp"
                }
            ]
        }
    },
    "trediciTattoo": {
        "kind": "web",
        "host": "tredici-tattoo.vercel.app",
        "views": {
            "desktop": [
                {
                    "label": "Home",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/01-home-aa915000-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/01-home-aa915000-2880.webp"
                },
                {
                    "label": "Ultimi arrivi sul foglio",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/02-foglio-33b76f2e-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/02-foglio-33b76f2e-2880.webp"
                },
                {
                    "label": "Come funziona",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/03-come-funziona-f98f5bd2-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/03-come-funziona-f98f5bd2-2880.webp"
                },
                {
                    "label": "Foglio flash",
                    "path": "/galleria",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/04-galleria-b9074d1d-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/04-galleria-b9074d1d-2880.webp"
                },
                {
                    "label": "Artisti",
                    "path": "/artisti",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/05-artisti-72e00905-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/05-artisti-72e00905-2880.webp"
                },
                {
                    "label": "Stili",
                    "path": "/stili-prezzi",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/06-stili-44efc26b-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/06-stili-44efc26b-2880.webp"
                },
                {
                    "label": "Prezzi indicativi",
                    "path": "/stili-prezzi",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/07-prezzi-5ac6e977-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/07-prezzi-5ac6e977-2880.webp"
                },
                {
                    "label": "Richiesta di prenotazione",
                    "path": "/prenota",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/08-prenota-3bc481ac-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/08-prenota-3bc481ac-2880.webp"
                },
                {
                    "label": "Contatti",
                    "path": "/contatti",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/trediciTattoo/09-contatti-6a6c61bd-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/trediciTattoo/09-contatti-6a6c61bd-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Home",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/trediciTattoo/m-01-home-f8e82037-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/trediciTattoo/m-01-home-f8e82037-1170.webp"
                },
                {
                    "label": "Foglio flash",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/trediciTattoo/m-02-galleria-18d8ea05-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/trediciTattoo/m-02-galleria-18d8ea05-1170.webp"
                },
                {
                    "label": "Artisti",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/trediciTattoo/m-03-artisti-4573c7d2-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/trediciTattoo/m-03-artisti-4573c7d2-1170.webp"
                },
                {
                    "label": "Stili",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/trediciTattoo/m-04-stili-d39203d4-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/trediciTattoo/m-04-stili-d39203d4-1170.webp"
                },
                {
                    "label": "Prenotazione",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/trediciTattoo/m-05-prenota-5fc25ded-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/trediciTattoo/m-05-prenota-5fc25ded-1170.webp"
                }
            ]
        }
    },
    "unaNotteDiStelle": {
        "kind": "web",
        "host": "una-notte-di-stelle.vercel.app",
        "views": {
            "desktop": [
                {
                    "label": "Apertura e conto alla rovescia",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/unaNotteDiStelle/01-apertura-142cd850-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/unaNotteDiStelle/01-apertura-142cd850-2880.webp"
                },
                {
                    "label": "Perché quella notte",
                    "path": "/#perche",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/unaNotteDiStelle/02-perche-d28b73c7-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/unaNotteDiStelle/02-perche-d28b73c7-2880.webp"
                },
                {
                    "label": "Il programma",
                    "path": "/#programma",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/unaNotteDiStelle/03-programma-020c0ecc-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/unaNotteDiStelle/03-programma-020c0ecc-2880.webp"
                },
                {
                    "label": "Cosa portare",
                    "path": "/#portare",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/unaNotteDiStelle/04-portare-ec167394-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/unaNotteDiStelle/04-portare-ec167394-2880.webp"
                },
                {
                    "label": "Dove",
                    "path": "/#dove",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/unaNotteDiStelle/05-dove-46a36079-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/unaNotteDiStelle/05-dove-46a36079-2880.webp"
                },
                {
                    "label": "Prenotazione",
                    "path": "/#prenota",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/unaNotteDiStelle/06-prenota-0f41a9c7-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/unaNotteDiStelle/06-prenota-0f41a9c7-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Apertura",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/unaNotteDiStelle/m-01-apertura-1da11688-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/unaNotteDiStelle/m-01-apertura-1da11688-1170.webp"
                },
                {
                    "label": "Perché quella notte",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/unaNotteDiStelle/m-02-perche-0883534d-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/unaNotteDiStelle/m-02-perche-0883534d-1170.webp"
                },
                {
                    "label": "Il programma",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/unaNotteDiStelle/m-03-programma-57e00261-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/unaNotteDiStelle/m-03-programma-57e00261-1170.webp"
                },
                {
                    "label": "Dove",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/unaNotteDiStelle/m-04-dove-36a061b1-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/unaNotteDiStelle/m-04-dove-36a061b1-1170.webp"
                },
                {
                    "label": "Prenotazione",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/unaNotteDiStelle/m-05-prenota-4dff56b7-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/unaNotteDiStelle/m-05-prenota-4dff56b7-1170.webp"
                }
            ]
        }
    },
    "ohima": {
        "kind": "web",
        "host": "ohimachepizza.it",
        "views": {
            "desktop": [
                {
                    "label": "Home",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/01-home-455b0db2-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/01-home-455b0db2-2880.webp"
                },
                {
                    "label": "Come nasce una Ohimà",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/02-impasto-95ff3480-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/02-impasto-95ff3480-2880.webp"
                },
                {
                    "label": "Il forno a 400 gradi",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/03-impasto-2-c9ecddac-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/03-impasto-2-c9ecddac-2880.webp"
                },
                {
                    "label": "Le speciali",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/04-speciali-3e6dee96-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/04-speciali-3e6dee96-2880.webp"
                },
                {
                    "label": "Recensioni",
                    "path": "/#recensioni",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/05-recensioni-6353072a-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/05-recensioni-6353072a-2880.webp"
                },
                {
                    "label": "Dove siamo",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/06-dove-813651d6-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/06-dove-813651d6-2880.webp"
                },
                {
                    "label": "Menù",
                    "path": "/menu",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/07-menu-3a687b3d-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/07-menu-3a687b3d-2880.webp"
                },
                {
                    "label": "Menù per sezioni",
                    "path": "/menu",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/08-menu-lista-d2a30b27-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/08-menu-lista-d2a30b27-2880.webp"
                },
                {
                    "label": "Chi siamo",
                    "path": "/chi-siamo",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/ohima/09-chi-siamo-57a00a59-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/ohima/09-chi-siamo-57a00a59-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Home",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ohima/m-01-home-bad02176-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ohima/m-01-home-bad02176-1170.webp"
                },
                {
                    "label": "Le speciali",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ohima/m-02-speciali-58fe22ec-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ohima/m-02-speciali-58fe22ec-1170.webp"
                },
                {
                    "label": "Recensioni",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ohima/m-03-recensioni-f8bf084b-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ohima/m-03-recensioni-f8bf084b-1170.webp"
                },
                {
                    "label": "Menù",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ohima/m-04-menu-ae66b0bb-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ohima/m-04-menu-ae66b0bb-1170.webp"
                },
                {
                    "label": "Menù per sezioni",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ohima/m-05-menu-lista-f7e4742c-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ohima/m-05-menu-lista-f7e4742c-1170.webp"
                },
                {
                    "label": "Chi siamo",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/ohima/m-06-chi-siamo-c25ceaa6-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/ohima/m-06-chi-siamo-c25ceaa6-1170.webp"
                }
            ]
        }
    },
    "portfolio": {
        "kind": "web",
        "host": "darioelia.it",
        "views": {
            "desktop": [
                {
                    "label": "Home",
                    "path": "/",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/01-hero-f72b3ebe-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/01-hero-f72b3ebe-2880.webp"
                },
                {
                    "label": "Chi sono",
                    "path": "/#about",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/02-chi-sono-3e943e52-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/02-chi-sono-3e943e52-2880.webp"
                },
                {
                    "label": "Stack tecnologico in 3D",
                    "path": "/#skills",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/03-competenze-ad9eed4c-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/03-competenze-ad9eed4c-2880.webp"
                },
                {
                    "label": "Formazione ed esperienza",
                    "path": "/#experience",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/04-esperienza-182ee9b2-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/04-esperienza-182ee9b2-2880.webp"
                },
                {
                    "label": "Progetti",
                    "path": "/#projects",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/05-progetti-c01574da-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/05-progetti-c01574da-2880.webp"
                },
                {
                    "label": "Scheda progetto con galleria",
                    "path": "/#projects",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/06-scheda-progetto-074b4d0d-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/06-scheda-progetto-074b4d0d-2880.webp"
                },
                {
                    "label": "Progetti dimostrativi",
                    "path": "/#demo",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/07-demo-049ae80d-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/07-demo-049ae80d-2880.webp"
                },
                {
                    "label": "Servizi e prezzi",
                    "path": "/#tariffe",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/08-tariffe-87b74229-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/08-tariffe-87b74229-2880.webp"
                },
                {
                    "label": "Contatti",
                    "path": "/#contact",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/09-contatti-40110e6c-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/09-contatti-40110e6c-2880.webp"
                },
                {
                    "label": "Curriculum",
                    "path": "/cv",
                    "w": 2880,
                    "h": 1800,
                    "rail": "/assets/gallery/portfolio/10-cv-781d3181-1280.webp",
                    "railW": 1280,
                    "full": "/assets/gallery/portfolio/10-cv-781d3181-2880.webp"
                }
            ],
            "mobile": [
                {
                    "label": "Home",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/portfolio/m-01-hero-102199ba-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/portfolio/m-01-hero-102199ba-1170.webp"
                },
                {
                    "label": "Chi sono",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/portfolio/m-02-chi-sono-5aa5be80-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/portfolio/m-02-chi-sono-5aa5be80-1170.webp"
                },
                {
                    "label": "Progetti",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/portfolio/m-03-progetti-cbe5d359-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/portfolio/m-03-progetti-cbe5d359-1170.webp"
                },
                {
                    "label": "Scheda progetto",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/portfolio/m-04-scheda-progetto-c4923e88-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/portfolio/m-04-scheda-progetto-c4923e88-1170.webp"
                },
                {
                    "label": "Servizi e prezzi",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/portfolio/m-05-tariffe-2f47d609-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/portfolio/m-05-tariffe-2f47d609-1170.webp"
                },
                {
                    "label": "Contatti",
                    "w": 1170,
                    "h": 2532,
                    "rail": "/assets/gallery/portfolio/m-06-contatti-81106a4b-640.webp",
                    "railW": 640,
                    "full": "/assets/gallery/portfolio/m-06-contatti-81106a4b-1170.webp"
                }
            ]
        }
    }
};
