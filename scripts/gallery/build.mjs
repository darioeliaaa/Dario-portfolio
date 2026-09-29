/**
 * Builds the project galleries shown inside each project modal.
 *
 *   node scripts/gallery/build.mjs <raw-dir> [projectId ...]
 *
 * <raw-dir> holds the untouched captures, one folder per project and view:
 *   <raw-dir>/<projectId>/<desktop|mobile>/<file>.png
 *
 * For every shot listed in ./config.mjs it writes two WebP files to
 * public/assets/gallery/<projectId>/ — a rail-sized one and the full
 * resolution one used by the full-screen viewer — with a content hash in the
 * name (/assets is served `immutable`, so a changed image must get a new URL).
 * Then it regenerates src/data/galleries.ts from the config plus the real
 * image sizes. Projects not named on the command line keep their current
 * entry and files, so one project can be re-shot without touching the rest.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import config from "./config.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "public/assets/gallery");
const DATA = join(ROOT, "src/data/galleries.ts");

// Rail images: sharp on a 2x screen at the rail's size. Full: the capture itself, capped.
const SIZES = {
  desktop: { rail: 1280, full: 2880 },
  mobile: { rail: 640, full: 1290 },
};

const [rawDir, ...only] = process.argv.slice(2);
if (!rawDir) {
  console.error("uso: node scripts/gallery/build.mjs <raw-dir> [projectId ...]");
  process.exit(1);
}

const MARK = "export const galleries: Record<string, Gallery> = ";
const previous = (() => {
  if (!existsSync(DATA)) return {};
  const text = readFileSync(DATA, "utf8");
  const at = text.indexOf(MARK);
  return at < 0 ? {} : JSON.parse(text.slice(at + MARK.length).trim().replace(/;$/, ""));
})();

async function encode(file, width, quality) {
  return sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, smartSubsample: true, effort: 6 })
    .toBuffer({ resolveWithObject: true });
}

async function buildShot(id, view, shot) {
  const file = join(rawDir, id, view, shot.file + ".png");
  if (!existsSync(file)) throw new Error(`manca ${file}`);
  const size = SIZES[view];
  const full = await encode(file, size.full, 90);
  const rail = await encode(file, size.rail, 88);
  const hash = createHash("sha1").update(full.data).digest("hex").slice(0, 8);
  const name = (w) => `${view === "mobile" ? "m-" : ""}${shot.file}-${hash}-${w}.webp`;
  writeFileSync(join(OUT, id, name(rail.info.width)), rail.data);
  writeFileSync(join(OUT, id, name(full.info.width)), full.data);
  const kb = Math.round((rail.data.length + full.data.length) / 1024);
  console.log(`  ${view}/${shot.file}  ${full.info.width}x${full.info.height}  ${kb} KB`);
  return {
    label: shot.label,
    ...(shot.path ? { path: shot.path } : {}),
    w: full.info.width,
    h: full.info.height,
    rail: `/assets/gallery/${id}/${name(rail.info.width)}`,
    railW: rail.info.width,
    full: `/assets/gallery/${id}/${name(full.info.width)}`,
  };
}

const galleries = {};
for (const [id, g] of Object.entries(config)) {
  if (only.length && !only.includes(id)) {
    if (previous[id]) galleries[id] = previous[id];
    continue;
  }
  console.log(id);
  const dir = join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const views = {};
  for (const [view, shots] of Object.entries(g.views)) {
    views[view] = [];
    for (const shot of shots) views[view].push(await buildShot(id, view, shot));
  }
  const { views: _, ...meta } = g;
  galleries[id] = { ...meta, views };
}

// Folders of projects that left the config.
if (existsSync(OUT)) {
  for (const d of readdirSync(OUT)) if (!config[d]) rmSync(join(OUT, d), { recursive: true, force: true });
}

writeFileSync(
  DATA,
  `// Generato da scripts/gallery/build.mjs: modifica scripts/gallery/config.mjs e rilancia lo script.

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

${MARK}${JSON.stringify(galleries, null, 4)};
`
);
console.log("scritto", DATA);
