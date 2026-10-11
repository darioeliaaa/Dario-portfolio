// Disposizione dei 37 tasti sulla scheda. Funzioni pure, senza three.js né DOM:
// si possono importare ovunque (anche lato server) e testare da sole.
import { SKILL_KEYS, type SkillCategory, type SkillNames } from "@/data/skill-keys";

export type KeyPlacement = {
    id: SkillNames;
    category: SkillCategory;
    /** Posizione nell'ordine di lettura di SKILL_KEYS. */
    index: number;
    row: number;
    col: number;
    /** Centro del tasto sul piano della scheda, in unità native, origine al centro della scheda. */
    x: number;
    z: number;
};

export type KeyboardLayout = {
    mobile: boolean;
    /** Passo tra i tasti (unità native): 1 "u" = `pitch`. */
    pitch: number;
    /** Tasti nell'ordine di SKILL_KEYS. */
    keys: readonly KeyPlacement[];
    /** Quanti tasti ha ogni riga. */
    rows: readonly number[];
    /** Dimensioni della scheda (unità native): larghezza lungo x, profondità lungo z. */
    width: number;
    depth: number;
};

type LayoutSpec = {
    pitch: number;
    rows: readonly number[];
    /** Sfalsamento orizzontale di ogni riga, in u (come in una tastiera vera). */
    offsets: readonly number[];
};

// Desktop: 5 righe sfalsate come una tastiera (8/7/8/7/7). Il passo è calibrato
// perché, con le pose di STATES, l'ingombro resti simile a quello della vecchia
// tastiera Spline (circa 700 px di larghezza nella sezione competenze).
const DESKTOP: LayoutSpec = {
    pitch: 235,
    rows: [8, 7, 8, 7, 7],
    offsets: [0, 0.5, 0, 0.5, 0.5],
};

// Mobile: 8 righe a nido d'ape su 5 colonne (5/4/5/4/5/4/5/5): la scheda è stretta e alta, come lo
// schermo di un telefono, e con la vista frontale (rotazione y della posa = azimut della camera) i
// tasti prendono tutta la larghezza: circa 60 px di passo a 390 px contro i 35 di una griglia 6x7
// ruotata a rombo, e i loghi restano dritti.
const MOBILE: LayoutSpec = {
    pitch: 210,
    rows: [5, 4, 5, 4, 5, 4, 5, 5],
    offsets: [0, 0.5, 0, 0.5, 0, 0.5, 0, 0],
};

/** Bordo della scheda attorno ai tasti, in u. */
export const BOARD_MARGIN = 0.5;

const cache = new Map<boolean, KeyboardLayout>();

function build(spec: LayoutSpec, mobile: boolean): KeyboardLayout {
    const rows = [...spec.rows];
    // Se in futuro SKILL_KEYS cresce, le righe in più ripetono la larghezza massima.
    const widest = Math.max(...rows);
    let total = rows.reduce((a, b) => a + b, 0);
    while (total < SKILL_KEYS.length) {
        rows.push(Math.min(widest, SKILL_KEYS.length - total));
        total += rows[rows.length - 1];
    }

    // Coordinate in u: colonna 0 a sinistra, riga 0 in fondo (z negativo)
    const raw: { col: number; row: number; ux: number; uz: number }[] = [];
    let idx = 0;
    for (let r = 0; r < rows.length && idx < SKILL_KEYS.length; r++) {
        const offset = spec.offsets[r] ?? 0;
        for (let c = 0; c < rows[r] && idx < SKILL_KEYS.length; c++, idx++) {
            raw.push({ col: c, row: r, ux: offset + c + 0.5, uz: r + 0.5 });
        }
    }

    let minX = Infinity;
    let maxX = -Infinity;
    for (const k of raw) {
        minX = Math.min(minX, k.ux - 0.5);
        maxX = Math.max(maxX, k.ux + 0.5);
    }
    const usedRows = raw[raw.length - 1].row + 1;
    const cx = (minX + maxX) / 2;
    const cz = usedRows / 2;

    const keys: KeyPlacement[] = raw.map((k, i) => ({
        id: SKILL_KEYS[i].id,
        category: SKILL_KEYS[i].category,
        index: i,
        row: k.row,
        col: k.col,
        x: (k.ux - cx) * spec.pitch,
        z: (k.uz - cz) * spec.pitch,
    }));

    return {
        mobile,
        pitch: spec.pitch,
        keys,
        rows,
        width: (maxX - minX + BOARD_MARGIN * 2) * spec.pitch,
        depth: (usedRows + BOARD_MARGIN * 2) * spec.pitch,
    };
}

/** Layout dei tasti per desktop o mobile (calcolato una volta e riusato). */
export function getKeyboardLayout(mobile: boolean): KeyboardLayout {
    let layout = cache.get(mobile);
    if (!layout) {
        layout = build(mobile ? MOBILE : DESKTOP, mobile);
        cache.set(mobile, layout);
    }
    return layout;
}
