# Dario Elia — Portfolio

Portfolio personale di **Dario Elia**, Junior Full-Stack Developer e studente di
Informatica all'Università della Calabria.

Sito 3D interattivo: una tastiera meccanica in Three.js, scritta a mano, dove
**ogni keycap è una tecnologia** (37 tasti, dai linguaggi agli strumenti di
deploy), animazioni scroll-driven con GSAP, sezione tariffe per i lavori
freelance e un CV generato dagli stessi dati del sito.

> Basato sul template open source
> [Naresh-Khatri/3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio),
> riscritto e personalizzato.

---

## ✨ Cosa c'è dentro

| | |
|---|---|
| **Tastiera 3D interattiva** | Scena Three.js scritta a mano (`src/components/keyboard/`): 37 keycap, uno per tecnologia, con il logo sul tasto; i tasti si premono ovunque, con suoni reali; nella sezione Competenze hover/press mostrano anche nome e descrizione della tecnologia |
| **Scroll choreography** | GSAP + ScrollTrigger + Lenis: la tastiera si sposta, ruota e ondeggia seguendo le sezioni |
| **Chi sono** | Bio, statistiche e aree di competenza |
| **Progetti** | Card con anteprima animata dello screenshot + modale con stack e case study |
| **Tariffe** | Listino trasparente con CTA verso il form contatti |
| **CV** | `/cv` — curriculum generato da `src/data/`, stampabile in PDF dal browser |
| **Tema chiaro/scuro** | Con View Transitions API e toast ironici |
| **Progressive enhancement** | Su `prefers-reduced-motion` / Data Saver il 3D sparisce e le skill diventano una griglia HTML reale |
| **SEO** | metadata completi, JSON-LD `Person`, `sitemap.xml`, `robots.txt`, OG image |
| **A11y** | Skip link, focus ring visibili, form con `aria-invalid`/`role="alert"`, alternative testuali |

---

## 🛠️ Stack

| Layer | Tecnologie |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui, Aceternity UI |
| **Animazioni** | GSAP + ScrollTrigger, Motion (Framer Motion), Lenis |
| **3D** | Three.js (tastiera della home, motore scritto a mano) · Spline Runtime solo per la scena della pagina 404 |
| **Form** | Rotta interna `/api/contact` + Resend, validazione Zod su client e server |

---

## 🚀 Avvio in locale

```bash
npm install
cp .env.example .env.local   # opzionale: tutte le variabili sono facoltative
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

> **Se `next dev` si blocca senza stampare nulla**, c'è un lock stantio:
> `rm -rf .next` e riprova.

---

## ⚙️ Personalizzazione

Quasi tutto si cambia dai file dentro `src/data/`:

| File | Cosa contiene |
|---|---|
| `src/data/config.ts` | Nome, ruoli, tagline, email, URL del sito, social, disponibilità, foto profilo |
| `src/data/skill-keys.ts` | I 37 tasti della tastiera 3D: id (`SkillNames`), categoria, etichetta e ordine di lettura |
| `src/data/constants.ts` | Descrizione e colore di ogni skill (uno per keycap) + formazione ed esperienze |
| `src/components/keyboard/` | Tastiera 3D: motore Three.js (`keyboard-engine.ts`), disposizione dei tasti (`keyboard-layout.ts`), geometrie (`keycap-geometry.ts`), icone dei tasti (`key-icons.ts`, `skill-icon.tsx`) |
| `src/data/projects.tsx` | Progetti: titolo, categoria, screenshot, stack, case study |
| `scripts/gallery/config.mjs` | Galleria di ogni progetto: schermate in ordine e didascalie |
| `src/components/sections/pricing.tsx` | Listino servizi |
| `src/components/header/config.ts` | Voci del menu |

### Gallerie dei progetti

Ogni scheda progetto si apre con una galleria scorrevole (desktop e, per i
siti, anche telefono) con vista a schermo intero. Per aggiornarla metti le
schermate originali in una cartella `<raw>/<id-progetto>/<desktop|mobile>/`,
elencale in `scripts/gallery/config.mjs` e lancia:

```bash
node scripts/gallery/build.mjs <raw> [id-progetto ...]
```

Lo script crea le versioni WebP in `public/assets/gallery/` (una per lo
scorrimento, una a piena risoluzione) e rigenera `src/data/galleries.ts`.

### Tastiera 3D

La tastiera della home è una scena Three.js scritta a mano, senza modelli
scaricati: tasti, scheda e luci sono generati da codice. Se il WebGL non c'è
(o con `prefers-reduced-motion` / Data Saver) restano le skill in HTML.

Per aggiungere o cambiare un tasto servono tre voci, tutte tipizzate: se ne
manca una, `tsc` lo segnala.

1. `src/data/skill-keys.ts`: valore in `SkillNames` e voce in `SKILL_KEYS`
   (categoria, etichetta, posizione nell'ordine di lettura).
2. `src/data/constants.ts`: descrizione breve in `DESCRIZIONI` (compare su
   hover e tap).
3. `src/components/keyboard/key-icons.ts`: logo in `KEY_ICONS` (path SVG) e
   colore di marca in `BRAND_COLORS`.

La disposizione (`keyboard-layout.ts`) aggiunge righe da sola se i tasti
crescono: ricontrolla a occhio l'ingombro, soprattutto da mobile.

### ⚠️ Da compilare prima del deploy

1. `config.email` — è **vuota**: appena la inserisci compare in Contatti, nel footer e nel CV.
2. `config.site` — l'URL di produzione (serve per OG image, canonical e sitemap).
3. `config.avatar` — opzionale: metti una tua foto in `/public/assets` e indicala qui, altrimenti resta il monogramma.

### Variabili d'ambiente (tutte opzionali)

| Variabile | Serve per |
|---|---|
| `RESEND_API_KEY` | **Obbligatoria.** Chiave [Resend](https://resend.com) con cui `/api/contact` invia le email del form |
| `CONTACT_TO_EMAIL` | Destinatario dei messaggi (default: `config.contactEmail`) |
| `CONTACT_FROM_EMAIL` | Mittente, su dominio verificato in Resend (default: `onboarding@resend.dev`) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Opzionale: servizio esterno (Formspree, Basin…) al posto della rotta interna |
| `NEXT_PUBLIC_WS_URL` | Funzionalità realtime (cursori live, presenza) — vuoto = disattivate |
| `UMAMI_DOMAIN`, `UMAMI_SITE_ID` | Analytics Umami |
| `NEXT_PUBLIC_GA_ID` | Google Analytics |

---

## 📦 Build

```bash
npm run build && npm start
```

---

## 📄 Licenza

Template originale open source di
[Naresh Khatri](https://github.com/Naresh-Khatri/3d-portfolio) — un link di
credito è sempre apprezzato.

I loghi sui tasti vengono da [Simple Icons](https://simpleicons.org) (CC0) e
[devicon](https://devicon.dev) (MIT); le sigle SQL, REST e MVVM sono contorni
di Space Grotesk (SIL OFL) e alcuni glifi sono disegnati a mano. I marchi
appartengono ai rispettivi proprietari e sono usati solo per indicare le
tecnologie citate.
