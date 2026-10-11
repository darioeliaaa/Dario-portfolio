// Geometrie procedurali della tastiera: keycap, scheda e "decalcomania" del logo.
// Tutto è espresso in u (1 u = passo tra i tasti): il motore scala le mesh del passo
// del layout. Le geometrie sono create una volta sola e condivise.
import { BufferGeometry, Float32BufferAttribute } from "three";

type Ring = {
    /** Semilati del rettangolo arrotondato della sezione. */
    hx: number;
    hz: number;
    /** Raggio degli angoli (in pianta). */
    c: number;
    y: number;
    /** Normale nel piano del profilo: componente verso l'esterno (ns) e verso l'alto (ny). */
    ns: number;
    ny: number;
    /** 0..1: quanto la normale in pianta segue la direzione radiale dal centro invece di quella della sezione. */
    radial?: number;
};

type LoftOptions = {
    /** Chiude il fondo con un disco (vertici separati, normale verso il basso). */
    bottomCap: boolean;
    /** Se presente, chiude l'ultima sezione con un ventaglio verso il centro. */
    topCenter?: { y: number };
    /** Dalla striscia tra le sezioni r e r+1 (con r >= questo valore) in poi, ventaglio compreso, si usa il materiale 1. */
    secondMaterialFrom?: number;
    /** Materiale del disco di fondo (se diverso dal materiale 0). */
    bottomMaterial?: number;
};

const HALF_PI = Math.PI / 2;
const CORNER_SIGNS: ReadonlyArray<readonly [number, number]> = [
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],
];

/**
 * Costruisce una superficie "a sezioni": ogni sezione è un rettangolo arrotondato
 * (stesso numero di punti per tutte) e le normali arrivano dal profilo, non dalla
 * media delle facce: i riflessi risultano morbidi anche con poche sezioni.
 */
function buildLoft(rings: Ring[], cornerSegments: number, opts: LoftOptions): BufferGeometry {
    const n = (cornerSegments + 1) * 4;
    const pos: number[] = [];
    const nor: number[] = [];
    const idx: number[] = [];

    const pushRing = (ring: Ring, down: boolean) => {
        for (let q = 0; q < 4; q++) {
            const [sx, sz] = CORNER_SIGNS[q];
            for (let j = 0; j <= cornerSegments; j++) {
                const a = q * HALF_PI + (j * HALF_PI) / cornerSegments;
                const dx = Math.cos(a);
                const dz = Math.sin(a);
                const x = sx * (ring.hx - ring.c) + ring.c * dx;
                const z = sz * (ring.hz - ring.c) + ring.c * dz;
                pos.push(x, ring.y, z);
                if (down) {
                    nor.push(0, -1, 0);
                } else if (ring.radial) {
                    // Conca: una normale radiale evita i "raggi" lungo le diagonali del quadrato arrotondato
                    const len = Math.hypot(x, z) || 1;
                    const mx = dx * (1 - ring.radial) + (x / len) * ring.radial;
                    const mz = dz * (1 - ring.radial) + (z / len) * ring.radial;
                    const ml = Math.hypot(mx, mz) || 1;
                    nor.push((mx / ml) * ring.ns, ring.ny, (mz / ml) * ring.ns);
                } else {
                    nor.push(dx * ring.ns, ring.ny, dz * ring.ns);
                }
            }
        }
    };

    // Fondo: sezione duplicata (spigolo netto) con normale verso il basso, più il centro
    if (opts.bottomCap) {
        const base = pos.length / 3;
        pushRing(rings[0], true);
        pos.push(0, rings[0].y, 0);
        nor.push(0, -1, 0);
        const center = base + n;
        for (let k = 0; k < n; k++) idx.push(base + k, base + ((k + 1) % n), center);
    }
    const capEnd = idx.length;

    const wallsBase = pos.length / 3;
    for (const ring of rings) pushRing(ring, false);

    let split = -1;
    for (let r = 0; r < rings.length - 1; r++) {
        if (r === opts.secondMaterialFrom) split = idx.length;
        const r0 = wallsBase + r * n;
        const r1 = r0 + n;
        for (let k = 0; k < n; k++) {
            const k1 = (k + 1) % n;
            idx.push(r0 + k, r1 + k, r0 + k1, r0 + k1, r1 + k, r1 + k1);
        }
    }

    if (opts.topCenter) {
        const center = pos.length / 3;
        pos.push(0, opts.topCenter.y, 0);
        nor.push(0, 1, 0);
        const last = wallsBase + (rings.length - 1) * n;
        for (let k = 0; k < n; k++) idx.push(last + k, center, last + ((k + 1) % n));
    }

    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new Float32BufferAttribute(nor, 3));
    g.setIndex(idx);
    if (split >= 0) {
        if (opts.bottomMaterial !== undefined && opts.bottomCap) {
            g.addGroup(0, capEnd, opts.bottomMaterial);
            g.addGroup(capEnd, split - capEnd, 0);
        } else {
            g.addGroup(0, split, 0);
        }
        g.addGroup(split, idx.length - split, 1);
    }
    return g;
}

// ---------------------------------------------------------------------------
// Keycap
// ---------------------------------------------------------------------------

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Misure del keycap (in u), usate anche per decal e calcoli del motore. */
export const KEYCAP = (() => {
    const bottom = 0.46; // semilato alla base
    const height = 0.64;
    const bevel = 0.075; // raggio del raccordo tra fianco e cima
    const sigma = rad(5); // inclinazione dei fianchi
    const gamma = rad(14); // inclinazione della conca sul bordo
    const yc = height - bevel;
    const sc = bottom - Math.tan(sigma) * (yc + bevel * Math.sin(sigma)) - bevel * Math.cos(sigma);
    const rim = sc - bevel * Math.sin(gamma); // semilato della cima dove inizia la conca
    const rimY = yc + bevel * Math.cos(gamma);
    const dish = (Math.tan(gamma) * rim) / 2; // profondità della conca
    return {
        bottom,
        height,
        bevel,
        sigma,
        gamma,
        yc,
        sc,
        rim,
        rimY,
        dish,
        cornerBottom: 0.15,
        cornerTop: 0.115,
    };
})();

/** Altezza della superficie concava a distanza `s` (norma "quadrato arrotondato") dal centro. */
export function keycapDishY(s: number): number {
    const u = Math.min(s / KEYCAP.rim, 1);
    return KEYCAP.rimY - KEYCAP.dish + KEYCAP.dish * u * u;
}

export function createKeycapGeometry(): BufferGeometry {
    const K = KEYCAP;
    const rings: Ring[] = [];
    const sq = (s: number, c: number, y: number, ns: number, ny: number, radial = 0) =>
        rings.push({ hx: s, hz: s, c: Math.min(c, s), y, ns, ny, radial });

    // Fianco (leggermente rastremato)
    const yTan = K.yc + K.bevel * Math.sin(K.sigma);
    const wallSteps = 3;
    for (let j = 0; j <= wallSteps; j++) {
        const y = (yTan * j) / wallSteps;
        const s = K.bottom - Math.tan(K.sigma) * y;
        sq(s, K.cornerBottom + (K.cornerTop - K.cornerBottom) * (y / yTan), y, Math.cos(K.sigma), Math.sin(K.sigma));
    }
    // Raccordo tra fianco e cima, fino a raggiungere la pendenza della conca
    const arcSteps = 8;
    const thetaEnd = HALF_PI + K.gamma;
    for (let j = 1; j <= arcSteps; j++) {
        const th = K.sigma + ((thetaEnd - K.sigma) * j) / arcSteps;
        sq(K.sc + K.bevel * Math.cos(th), K.cornerTop, K.yc + K.bevel * Math.sin(th), Math.cos(th), Math.sin(th));
    }
    // Conca: sezioni simili al bordo, sempre più piccole
    const dishSteps = 7;
    for (let j = 1; j < dishSteps; j++) {
        const u = 1 - j / dishSteps;
        const s = K.rim * u;
        const slope = (2 * K.dish * s) / (K.rim * K.rim);
        const len = Math.hypot(slope, 1);
        sq(s, K.cornerTop * u, K.rimY - K.dish + K.dish * u * u, -slope / len, 1 / len, 0.8);
    }

    return buildLoft(rings, 6, {
        bottomCap: true,
        topCenter: { y: K.rimY - K.dish },
    });
}

/**
 * Piano con il logo, appoggiato sulla conca del tasto. UV nel riquadro [u0,u1]x[v0,v1]
 * dell'atlas; orientamento: la "testa" del logo guarda verso -z (in fondo alla scheda).
 */
export function createDecalGeometry(
    u0: number,
    v0: number,
    u1: number,
    v1: number,
    halfSize = 0.25,
    segments = 10,
): BufferGeometry {
    const pos: number[] = [];
    const uv: number[] = [];
    const idx: number[] = [];
    const lift = 0.004;
    for (let j = 0; j <= segments; j++) {
        for (let i = 0; i <= segments; i++) {
            const fx = i / segments;
            const fz = j / segments;
            const x = (fx * 2 - 1) * halfSize;
            const z = (fz * 2 - 1) * halfSize;
            // Norma 5: segue le sezioni arrotondate della conca senza spigoli sulle diagonali
            const s = Math.pow(Math.pow(Math.abs(x), 5) + Math.pow(Math.abs(z), 5), 0.2);
            pos.push(x, keycapDishY(s) + lift, z);
            uv.push(u0 + (u1 - u0) * fx, v1 - (v1 - v0) * fz);
        }
    }
    const row = segments + 1;
    for (let j = 0; j < segments; j++) {
        for (let i = 0; i < segments; i++) {
            const p00 = j * row + i;
            const p10 = p00 + 1;
            const p01 = p00 + row;
            const p11 = p01 + 1;
            idx.push(p00, p01, p10, p10, p01, p11);
        }
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
}

// ---------------------------------------------------------------------------
// Scheda
// ---------------------------------------------------------------------------

/** Misure della scheda (in u). Il piano su cui poggiano i tasti è a y = BOARD.floorY. */
export const BOARD = {
    thickness: 0.9,
    radius: 0.8,
    fillet: 0.16,
    /** Larghezza della cornice (bordo rialzato) attorno al piano dei tasti. */
    frame: 0.3,
    floorY: -0.1,
    bottomY: -0.9,
};

/**
 * Scheda con bordo smussato e cornice rialzata attorno a un piano ribassato.
 * Gruppi: 0 = scocca (fianchi, cornice), 1 = piano ribassato, 2 = fondo.
 */
export function createBoardGeometry(widthU: number, depthU: number): BufferGeometry {
    const B = BOARD;
    const hx0 = widthU / 2;
    const hz0 = depthU / 2;
    const rings: Ring[] = [];
    const ring = (o: number, y: number, ns: number, ny: number) =>
        rings.push({ hx: hx0 - o, hz: hz0 - o, c: Math.max(B.radius - o, 0.04), y, ns, ny });

    const f = B.fillet;
    const arc = 5;
    // Raccordo inferiore
    for (let j = 0; j <= arc; j++) {
        const t = (HALF_PI * j) / arc;
        ring(f * (1 - Math.sin(t)), -B.thickness + f * (1 - Math.cos(t)), Math.sin(t), -Math.cos(t));
    }
    // Fianco
    ring(0, -f, 1, 0);
    // Raccordo superiore
    for (let j = 1; j <= arc; j++) {
        const t = (HALF_PI * j) / arc;
        ring(f * (1 - Math.cos(t)), -f + f * Math.sin(t), Math.cos(t), Math.sin(t));
    }
    // Cornice piana
    const g1 = 0.035;
    ring(B.frame - g1, 0, 0, 1);
    // Spigolo interno della cornice (convesso), poi parete
    const arc2 = 3;
    for (let j = 1; j <= arc2; j++) {
        const t = (HALF_PI * j) / arc2;
        ring(B.frame - g1 + g1 * Math.sin(t), -g1 + g1 * Math.cos(t), -Math.sin(t), Math.cos(t));
    }
    const g2 = 0.025;
    const floorY = B.floorY;
    const secondFrom = rings.length; // la parete e il piano usano il secondo materiale
    ring(B.frame, floorY + g2, -1, 0);
    // Raccordo concavo parete -> piano
    for (let j = 1; j <= arc2; j++) {
        const t = (HALF_PI * j) / arc2;
        ring(B.frame + g2 * (1 - Math.cos(t)), floorY + g2 * (1 - Math.sin(t)), -Math.cos(t), Math.sin(t));
    }

    return buildLoft(rings, 8, {
        bottomCap: true,
        topCenter: { y: floorY },
        secondMaterialFrom: secondFrom - 1,
        bottomMaterial: 2,
    });
}
