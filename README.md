# Dario Elia — Portfolio

Portfolio personale di **Dario Elia**, Junior Full-Stack Developer e studente di
Informatica all'Università della Calabria.

Sito 3D interattivo: una tastiera meccanica in Spline dove **ogni keycap è una
tecnologia**, animazioni scroll-driven con GSAP, sezione tariffe per i lavori
freelance e un CV generato dagli stessi dati del sito.

> Basato sul template open source
> [Naresh-Khatri/3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio),
> riscritto e personalizzato.

---

## ✨ Cosa c'è dentro

| | |
|---|---|
| **Tastiera 3D interattiva** | Scene Spline con keycap-skill: hover/press mostrano nome e descrizione della tecnologia, con suoni reali |
| **Scroll choreography** | GSAP + ScrollTrigger + Lenis: la tastiera si sposta, ruota e si smonta seguendo le sezioni |
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
| **3D** | Spline Runtime |
| **Form** | Formspree + validazione Zod |

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
| `src/data/constants.ts` | Skill (keycap della tastiera 3D) + formazione ed esperienze |
| `src/data/projects.tsx` | Progetti: titolo, categoria, screenshot, stack, case study |
| `src/components/sections/pricing.tsx` | Listino servizi |
| `src/components/header/config.ts` | Voci del menu |

### ⚠️ Da compilare prima del deploy

1. `config.email` — è **vuota**: appena la inserisci compare in Contatti, nel footer e nel CV.
2. `config.site` — l'URL di produzione (serve per OG image, canonical e sitemap).
3. `config.avatar` — opzionale: metti una tua foto in `/public/assets` e indicala qui, altrimenti resta il monogramma.

### Variabili d'ambiente (tutte opzionali)

| Variabile | Serve per |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Endpoint del form contatti (default: Formspree già configurato) |
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
