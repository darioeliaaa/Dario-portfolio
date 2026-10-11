/**
 * Motore Three.js della tastiera 3D del portfolio (sostituisce la scena Spline).
 * Scena pura: nessun React, nessun accesso a window/document a livello di modulo
 * (importabile in un componente client senza problemi di SSR).
 *
 * ── Uso ───────────────────────────────────────────────────────────────────────
 *   const kb = new KeyboardEngine({ canvas, theme: "dark", mobile: false, maxDpr: 2 });
 *   kb.onHover = (id) => { ... };            // SkillNames | null (base/sfondo/uscita)
 *   kb.onPress = (id, down) => { ... };      // mouse e touch (tap = down + up)
 *   gsap.to(kb.pose.position, { x: 225, y: -100, duration: 1 });
 *   kb.reveal().then(...);                   // intro: i tasti cadono e rimbalzano (~1.9 s)
 *   ...
 *   kb.dispose();                            // allo smontaggio
 *
 * ── Canvas e rendering ────────────────────────────────────────────────────────
 *  - Il canvas deve avere una dimensione CSS (es. fixed inset-0, h-[100dvh]): il motore
 *    legge clientWidth/clientHeight e usa un ResizeObserver; `resize()` forza la lettura.
 *  - Sfondo trasparente (alpha), antialias, pixel ratio = min(devicePixelRatio, maxDpr).
 *  - Nessuna shadow map né post-processing: ombre a contatto e bagliore sono "finte".
 *  - Il loop gira solo quando serve: si ferma da solo quando nulla si muove, in pausa,
 *    con la tab nascosta o con la tastiera nascosta; si risveglia da solo (pose, eventi, API).
 *  - Se WebGL non è disponibile il costruttore lancia un Error con messaggio chiaro.
 *  - Il puntatore è ascoltato sul canvas (`pointerTarget` per cambiare): il canvas deve ricevere gli
 *    eventi, cioè i contenuti sopra devono avere pointer-events: none dove non sono interattivi.
 *
 * ── Pose (unità di STATES in animated-background-config.ts) ──────────────────────
 *  `pose` si anima direttamente con GSAP (le proprietà sono accessor: ogni scrittura risveglia il loop).
 *    pose.scale        un numero (non più {x,y,z}); 1 unità nativa = 1 px CSS a scale 1
 *    pose.position     {x,y,z}: px CSS dal centro del canvas, y verso l'alto, come in Spline
 *    pose.rotation     {x,y,z}: radianti, ordine XYZ (come Three/Spline); y = giro sul proprio asse
 *  La camera è ortografica isometrica (azimut -30°, elevazione 45°), la stessa vista della scena Spline:
 *  con rotation = 0 la tastiera appare come nell'hero originale e position x/y si proiettano come lì
 *  (x sposta anche in verticale: è l'effetto della vista isometrica). Il pivot sta a metà dello spessore.
 *  Misure native (scale 1): desktop 2115 x 1410 (passo 235), mobile 1260 x 1890 (passo 210);
 *  con le pose di STATES l'ingombro sullo schermo è quello della vecchia tastiera (circa 700 px in
 *  competenze su desktop). `getBounds()` le restituisce già moltiplicate per la pose corrente.
 *
 * ── API ───────────────────────────────────────────────────────────────────────
 *  reveal(): Promise<void>          intro; idempotente (le chiamate successive restituiscono la stessa promessa).
 *                                   Fino al reveal() il canvas resta vuoto.
 *  setExcited(on)                   oscillazione "float" dolce dei tasti (sezione competenze/contatti).
 *  setTheme("dark" | "light")       transizione morbida di scheda, luci e ombre (~0.5 s).
 *  setMobile(boolean)               cambia layout con animazione (desktop 8/7/8/7/7, mobile 5/4/5/4/5/4/5/5);
 *                                   prima del reveal() il cambio è immediato. Non tocca la pose.
 *  setVisible(boolean)              mostra/nasconde con transizione di scala; nascosta = nessun rendering.
 *  setMaxDpr(n), resize()           pixel ratio massimo / rilettura della dimensione del canvas.
 *  pause() / resume()               ferma/riprende il loop (mantiene lo stato).
 *  pressKey(id, holdMs = 160)       pressione programmatica (solo visiva, non chiama onPress).
 *  highlight(ids | null)            evidenzia alcuni tasti e attenua gli altri.
 *  getKeyScreenPosition(id)         {x,y} in px CSS del canvas della cima del tasto, o null.
 *  getBounds()                      {width,height} in px CSS della scheda con scala e rotazione y correnti.
 *  getInfo()                        draw call, triangoli, geometrie e texture vivi (per debug).
 *  dispose(releaseContext = false)  idempotente: ferma il loop, toglie i listener, libera geometrie,
 *                                   materiali, texture e renderer. Di norma non rilascia il contesto WebGL,
 *                                   così lo stesso canvas si può riusare (es. StrictMode); con `true`
 *                                   lo rilascia subito (poi quel canvas non è più utilizzabile).
 *  KeyboardEngine.isWebGLAvailable(): boolean
 *
 * Eventi: `onHover` scatta solo quando cambia il tasto sotto il puntatore (null su base/sfondo/uscita).
 * Su touch il tap fa hover + press + release e l'hover sparisce dopo ~1 s; uno scroll non è un tap.
 */
import {
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    Color,
    DirectionalLight,
    DynamicDrawUsage,
    CylinderGeometry,
    Group,
    LinearFilter,
    LinearMipmapLinearFilter,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    InstancedMesh,
    Matrix4,
    MeshStandardMaterial,
    NeutralToneMapping,
    NoColorSpace,
    OrthographicCamera,
    PlaneGeometry,
    PMREMGenerator,
    Raycaster,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer,
    type Intersection,
    type WebGLRenderTarget,
} from "three";
import { SKILL_CATEGORIES, SKILL_KEYS, type SkillNames } from "@/data/skill-keys";
import { createStudioEnvironment } from "./keyboard-environment";
import { drawKeyIcon } from "./key-icons";
import { BOARD, KEYCAP, createBoardGeometry, createDecalGeometry, createKeycapGeometry } from "./keycap-geometry";
import { getKeyboardLayout, type KeyboardLayout } from "./keyboard-layout";

export { getKeyboardLayout } from "./keyboard-layout";
export type { KeyboardLayout, KeyPlacement } from "./keyboard-layout";

export type KeyboardTheme = "dark" | "light";

export type KeyboardEngineOptions = {
    canvas: HTMLCanvasElement;
    theme?: KeyboardTheme;
    mobile?: boolean;
    /** Pixel ratio massimo (usePerfProfile().maxDpr). */
    maxDpr?: number;
    powerPreference?: WebGLPowerPreference;
    /** Dove ascoltare il puntatore (default: il canvas). Con `window` il tasto reagisce anche sotto altri elementi. */
    pointerTarget?: EventTarget;
};

export type KeyboardPose = {
    scale: number;
    readonly position: { x: number; y: number; z: number };
    readonly rotation: { x: number; y: number; z: number };
};

// ---------------------------------------------------------------------------
// Costanti di scena
// ---------------------------------------------------------------------------

const AZIMUTH = (-30 * Math.PI) / 180;
const ELEVATION = (45 * Math.PI) / 180;
/** Direzione (unitaria) dal centro della scena verso la camera. */
const CAM_DIR = new Vector3(
    Math.sin(AZIMUTH) * Math.cos(ELEVATION),
    Math.sin(ELEVATION),
    Math.cos(AZIMUTH) * Math.cos(ELEVATION),
);
const CAM_DISTANCE = 6000;

/** Quanto il contenuto è alzato rispetto al pivot della pose (unità native): allinea il baricentro visivo a quello della scena Spline. */
const PIVOT_OFFSET = 80;

const ATLAS_CELL = 192;
const ATLAS_COLS = 7;
const DECAL_HALF = 0.3;

// Spostamenti dei tasti, in u
const HOVER_LIFT = 0.2;
const PRESS_DEPTH = 0.24;
const FLOAT_AMP = 0.36;
const DROP_HEIGHT = 3.4;
const HOP_HEIGHT = 0.6;

const REVEAL_SPREAD = 0.78; // secondi tra il primo e l'ultimo tasto che cade
const REVEAL_FALL = 1.05; // durata della caduta di un tasto
const MORPH_DURATION = 1.25;

type ThemeSpec = {
    caseColor: number;
    plateColor: number;
    underColor: number;
    caseRoughness: number;
    env: number;
    key: number;
    rim: number;
    shadow: number;
    /** Opacità dell'ombra a contatto sotto ogni tasto. */
    ao: number;
    glow: number;
    glowColor: number;
};

const THEME_SPECS: Record<KeyboardTheme, ThemeSpec> = {
    dark: {
        caseColor: 0x15171d,
        plateColor: 0x0a0b0f,
        underColor: 0x0d0e12,
        caseRoughness: 0.5,
        env: 1,
        key: 1.9,
        rim: 0.9,
        shadow: 0.55,
        ao: 0.5,
        glow: 0.2,
        glowColor: 0x6f5cf6,
    },
    light: {
        caseColor: 0xdfe3ec,
        plateColor: 0xc4cad6,
        underColor: 0x9ea5b4,
        caseRoughness: 0.3,
        env: 1.05,
        key: 1.7,
        rim: 0.6,
        shadow: 0.3,
        ao: 0.36,
        glow: 0,
        glowColor: 0x7aa2ff,
    },
};

// ---------------------------------------------------------------------------
// Utilità
// ---------------------------------------------------------------------------

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => {
    const c1 = 1.6;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const bounceOut = (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
};

/** Rettangolo arrotondato come tracciato corrente (ctx.roundRect non esiste nei Safari meno recenti). */
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
}

/** Variazione deterministica in [-1, 1] per tasto (stesso risultato a ogni avvio). */
const keyNoise = (i: number, salt: number) => {
    const s = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return (s - Math.floor(s)) * 2 - 1;
};

class PoseVec {
    private _x = 0;
    private _y = 0;
    private _z = 0;
    private readonly onChange: () => void;
    constructor(onChange: () => void) {
        this.onChange = onChange;
    }
    get x() {
        return this._x;
    }
    set x(v: number) {
        if (v !== this._x) {
            this._x = v;
            this.onChange();
        }
    }
    get y() {
        return this._y;
    }
    set y(v: number) {
        if (v !== this._y) {
            this._y = v;
            this.onChange();
        }
    }
    get z() {
        return this._z;
    }
    set z(v: number) {
        if (v !== this._z) {
            this._z = v;
            this.onChange();
        }
    }
}

class Pose implements KeyboardPose {
    readonly position: PoseVec;
    readonly rotation: PoseVec;
    private _scale = 0.25;
    private readonly onChange: () => void;
    constructor(onChange: () => void) {
        this.onChange = onChange;
        this.position = new PoseVec(onChange);
        this.rotation = new PoseVec(onChange);
    }
    get scale() {
        return this._scale;
    }
    set scale(v: number) {
        if (v !== this._scale) {
            this._scale = v;
            this.onChange();
        }
    }
}

// ---------------------------------------------------------------------------
// Motore
// ---------------------------------------------------------------------------

export class KeyboardEngine {
    /** Pose della tastiera: si anima con GSAP. */
    readonly pose: KeyboardPose;
    onHover: ((id: SkillNames | null) => void) | null = null;
    onPress: ((id: SkillNames, down: boolean) => void) | null = null;

    private readonly canvas: HTMLCanvasElement;
    private readonly renderer: WebGLRenderer;
    private readonly scene = new Scene();
    private readonly camera = new OrthographicCamera(-1, 1, 1, -1, 500, 12000);
    private readonly rig = new Group();
    /** Contenuto (tasti, scheda, ombre) rialzato rispetto al pivot: il centro di rotazione sta a metà dello spessore. */
    private readonly content = new Group();
    private readonly pointerTarget: EventTarget;

    private disposed = false;
    private paused = false;
    private contextLost = false;
    private raf = 0;
    private last = 0;
    private time = 0;
    private idleFrames = 0;
    private dirty = true;
    private drawn = false;
    private maxDpr: number;
    private width = 0;
    private height = 0;

    // Risorse condivise
    private readonly disposables: { dispose(): void }[] = [];
    private envTarget: WebGLRenderTarget | null = null;
    private readonly keyGeometry: BufferGeometry;
    private readonly boardMaterials: MeshPhysicalMaterial[];
    private readonly keyLight: DirectionalLight;
    private readonly rimLight: DirectionalLight;
    private readonly glow: Mesh;
    private readonly glowMaterial: MeshBasicMaterial;

    // Tasti
    private readonly n = SKILL_KEYS.length;
    private readonly keyMeshes: Mesh[] = [];
    private readonly keyMaterials: MeshPhysicalMaterial[] = [];
    private readonly decalMeshes: Mesh[] = [];
    // Ombre a contatto di tutti i tasti: un'unica mesh, riscritta a ogni frame (posizione e opacità)
    private aoMesh!: Mesh;
    private aoPos!: Float32Array;
    private aoCol!: Float32Array;
    private aoPosAttr!: BufferAttribute;
    private aoColAttr!: BufferAttribute;
    private readonly baseColors: Color[] = [];
    private readonly keyIndex = new Map<SkillNames, number>();

    // Molle per tasto (valore, velocità, bersaglio)
    private readonly hov = new Float32Array(this.n);
    private readonly hovV = new Float32Array(this.n);
    private readonly hovT = new Float32Array(this.n);
    private readonly prs = new Float32Array(this.n);
    private readonly prsV = new Float32Array(this.n);
    private readonly prsT = new Float32Array(this.n);
    private readonly progPress = new Uint8Array(this.n);
    private readonly dim = new Float32Array(this.n).fill(1);
    private readonly dimV = new Float32Array(this.n);
    private readonly dimT = new Float32Array(this.n).fill(1);
    private readonly hlT = new Float32Array(this.n);
    private readonly hl = new Float32Array(this.n);
    private readonly phase = new Float32Array(this.n);
    private readonly omega = new Float32Array(this.n);
    private readonly amp = new Float32Array(this.n);
    private readonly revDelay = new Float32Array(this.n);
    private readonly revDur = new Float32Array(this.n);

    // Layout e morph
    private layout: KeyboardLayout;
    // Scheda: una sola mesh, la cui geometria si ridimensiona nel cambio layout
    private boardGroup!: Group;
    private boardMesh!: Mesh;
    private boardGeo!: BufferGeometry;
    private boardPos0!: Float32Array;
    private boardSx!: Int8Array;
    private boardSz!: Int8Array;
    private boardW0 = 0;
    private boardD0 = 0;
    private boardW = 0;
    private boardD = 0;
    private boardPitch = 1;
    private feet!: InstancedMesh;
    private shadowMesh!: Mesh;
    private shadowMat!: MeshBasicMaterial;
    private shadowTex!: [CanvasTexture, CanvasTexture];
    private shadowTexIdx = 0;
    private fW = 0;
    private fD = 0;
    private fBP = 1;
    private tW = 0;
    private tD = 0;
    private tBP = 1;
    private readonly kx = new Float32Array(this.n);
    private readonly kz = new Float32Array(this.n);
    private readonly kp = new Float32Array(this.n);
    private readonly fx = new Float32Array(this.n);
    private readonly fz = new Float32Array(this.n);
    private readonly fp = new Float32Array(this.n);
    private readonly tx = new Float32Array(this.n);
    private readonly tz = new Float32Array(this.n);
    private readonly tp = new Float32Array(this.n);
    private morphT = -1;

    // Stato globale
    private excited = false;
    private floatAmt = 0;
    private visTarget = 1;
    private vis = 1;
    private themeTarget: KeyboardTheme;
    private themeMix: number;
    private themeLive = -1;
    private highlightOn = false;

    // Intro
    private revealState: 0 | 1 | 2 = 0;
    private revealT = 0;
    private revealPromise: Promise<void> | null = null;
    private revealResolve: (() => void) | null = null;

    // Puntatore
    private pointerInside = false;
    private px = 0;
    private py = 0;
    private pickPending = false;
    private lastRepick = 0;
    private hoverIdx = -1;
    private pressIdx = -1;
    private touchPress: { x: number; y: number; t: number; idx: number } | null = null;
    private touchClear: ReturnType<typeof setTimeout> | null = null;
    private readonly timers = new Set<ReturnType<typeof setTimeout>>();
    private readonly raycaster = new Raycaster();
    private readonly ndc = new Vector2();
    private readonly hits: Intersection[] = [];
    private readonly lastPose = new Float64Array(7).fill(NaN);
    private readonly tmpV = new Vector3();
    private readonly feetMatrix = new Matrix4();
    private readonly cResize: ResizeObserver | null;

    private readonly cFrom = new Color();
    private readonly cTo = new Color();

    constructor(opts: KeyboardEngineOptions) {
        this.canvas = opts.canvas;
        this.maxDpr = Math.max(1, opts.maxDpr ?? 2);
        this.pointerTarget = opts.pointerTarget ?? opts.canvas;
        this.themeTarget = opts.theme ?? "dark";
        this.themeMix = this.themeTarget === "light" ? 1 : 0;
        this.layout = getKeyboardLayout(!!opts.mobile);
        this.pose = new Pose(() => this.wake());

        let renderer: WebGLRenderer;
        try {
            renderer = new WebGLRenderer({
                canvas: opts.canvas,
                alpha: true,
                antialias: true,
                powerPreference: opts.powerPreference ?? "default",
            });
        } catch (err) {
            const reason = err instanceof Error ? err.message : String(err);
            throw new Error(`KeyboardEngine: impossibile creare il contesto WebGL (${reason})`);
        }
        this.renderer = renderer;

        try {
            renderer.setClearColor(0x000000, 0);
            renderer.toneMapping = NeutralToneMapping;
            renderer.toneMappingExposure = 1;

            this.scene.add(this.rig);
            this.rig.add(this.content);
            this.content.position.y = PIVOT_OFFSET;
            this.camera.position.copy(CAM_DIR).multiplyScalar(CAM_DISTANCE);
            this.camera.lookAt(0, 0, 0);

            // Luci: direzionale morbida da sinistra-alto + controluce freddo
            this.keyLight = new DirectionalLight(0xffffff, 2.3);
            this.keyLight.position.set(-1.1, 2.4, 1.3);
            this.rimLight = new DirectionalLight(0xb8c8ff, 0.9);
            this.rimLight.position.set(1.6, 1.2, -1.4);
            this.scene.add(this.keyLight, this.rimLight);

            this.buildEnvironment();
            this.keyGeometry = createKeycapGeometry();
            this.disposables.push(this.keyGeometry);

            // Scheda (materiali)
            const caseMat = new MeshPhysicalMaterial({ color: 0x15171d, roughness: 0.5, metalness: 0.1, clearcoat: 0.3, clearcoatRoughness: 0.35 });
            const plateMat = new MeshPhysicalMaterial({ color: 0x0a0b0f, roughness: 0.7, metalness: 0.05 });
            // Fondo opaco con piedini in gomma (si vede solo se la tastiera viene capovolta)
            const underMat = new MeshPhysicalMaterial({ color: 0x0d0e12, roughness: 0.85, metalness: 0 });
            this.boardMaterials = [caseMat, plateMat, underMat];
            this.disposables.push(caseMat, plateMat, underMat);

            this.buildKeys();

            // Bagliore dietro la tastiera
            const glowTex = this.makeGlowTexture();
            this.glowMaterial = new MeshBasicMaterial({
                map: glowTex,
                transparent: true,
                depthWrite: false,
                toneMapped: false,
                opacity: 0,
            });
            const glowGeo = new PlaneGeometry(1, 1);
            this.glow = new Mesh(glowGeo, this.glowMaterial);
            this.glow.quaternion.copy(this.camera.quaternion);
            this.glow.renderOrder = -10;
            this.glow.frustumCulled = false;
            this.scene.add(this.glow);
            this.disposables.push(glowTex, glowGeo, this.glowMaterial);

            // Layout iniziale (istantaneo)
            this.buildBoard(this.layout);
            this.applyLayoutInstant(this.layout);

            this.applyTheme(this.themeMix);
            this.themeLive = this.themeMix;
        } catch (err) {
            this.disposeResources();
            throw err;
        }

        this.rig.visible = false; // fino al reveal() non si vede nulla

        this.canvas.addEventListener("webglcontextlost", this.onContextLost);
        this.canvas.addEventListener("webglcontextrestored", this.onContextRestored);
        this.pointerTarget.addEventListener("pointermove", this.onPointerMove as EventListener);
        this.pointerTarget.addEventListener("pointerdown", this.onPointerDown as EventListener);
        this.pointerTarget.addEventListener("pointerleave", this.onPointerLeave as EventListener);
        window.addEventListener("pointerup", this.onPointerUp);
        window.addEventListener("pointercancel", this.onPointerUp);
        document.addEventListener("visibilitychange", this.onVisibility);
        this.cResize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => this.resize()) : null;
        this.cResize?.observe(this.canvas);

        this.resize();
        this.wake();
    }

    /** True se il browser sa creare un contesto WebGL (per decidere il ripiego prima di montare). */
    static isWebGLAvailable(): boolean {
        try {
            const c = document.createElement("canvas");
            return !!(c.getContext("webgl2") || c.getContext("webgl"));
        } catch {
            return false;
        }
    }

    // -----------------------------------------------------------------------
    // API pubblica
    // -----------------------------------------------------------------------

    reveal(): Promise<void> {
        if (this.disposed) return Promise.resolve();
        if (this.revealPromise) return this.revealPromise;
        this.revealState = 1;
        this.revealT = 0;
        this.rig.visible = true;
        this.revealPromise = new Promise<void>((resolve) => {
            this.revealResolve = resolve;
        });
        this.wake();
        return this.revealPromise;
    }

    setExcited(on: boolean): void {
        if (this.excited === on) return;
        this.excited = on;
        this.wake();
    }

    setTheme(theme: KeyboardTheme): void {
        if (this.themeTarget === theme) return;
        this.themeTarget = theme;
        this.wake();
    }

    setMobile(mobile: boolean): void {
        if (this.disposed || this.layout.mobile === mobile) return;
        const next = getKeyboardLayout(mobile);
        this.layout = next;
        if (this.revealState !== 2) {
            // Ancora nascosta o in caduta: si passa subito al nuovo layout
            this.applyLayoutInstant(next);
            this.morphT = -1;
            this.wake();
            return;
        }
        for (let i = 0; i < this.n; i++) {
            this.fx[i] = this.kx[i];
            this.fz[i] = this.kz[i];
            this.fp[i] = this.kp[i];
            const k = next.keys[i];
            this.tx[i] = k.x;
            this.tz[i] = k.z;
            this.tp[i] = next.pitch;
        }
        this.fW = this.boardW;
        this.fD = this.boardD;
        this.fBP = this.boardPitch;
        this.tW = next.width / next.pitch;
        this.tD = next.depth / next.pitch;
        this.tBP = next.pitch;
        this.morphT = 0;
        this.wake();
    }

    setVisible(visible: boolean): void {
        if (this.visTarget === (visible ? 1 : 0)) return;
        this.visTarget = visible ? 1 : 0;
        this.wake();
    }

    setMaxDpr(maxDpr: number): void {
        this.maxDpr = Math.max(1, maxDpr);
        this.resize();
    }

    resize(): void {
        if (this.disposed) return;
        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight;
        if (w < 1 || h < 1) return;
        const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, this.maxDpr);
        this.renderer.setPixelRatio(dpr);
        this.renderer.setSize(w, h, false);
        this.width = w;
        this.height = h;
        const cam = this.camera;
        cam.left = -w / 2;
        cam.right = w / 2;
        cam.top = h / 2;
        cam.bottom = -h / 2;
        cam.updateProjectionMatrix();
        this.wake();
    }

    pause(): void {
        this.paused = true;
        this.stopLoop();
    }

    resume(): void {
        if (!this.paused) return;
        this.paused = false;
        this.wake();
    }

    pressKey(id: SkillNames, holdMs = 160): Promise<void> {
        const i = this.keyIndex.get(id);
        if (i === undefined || this.disposed) return Promise.resolve();
        this.progPress[i] = 1;
        this.syncPressTarget(i);
        this.wake();
        return new Promise<void>((resolve) => {
            const t = setTimeout(() => {
                this.timers.delete(t);
                this.progPress[i] = 0;
                this.syncPressTarget(i);
                this.wake();
                resolve();
            }, holdMs);
            this.timers.add(t);
        });
    }

    highlight(ids: SkillNames[] | null): void {
        this.highlightOn = !!ids && ids.length > 0;
        const set = new Set(ids ?? []);
        for (let i = 0; i < this.n; i++) {
            const on = set.has(this.layout.keys[i].id);
            this.hlT[i] = this.highlightOn && on ? 1 : 0;
            this.dimT[i] = this.highlightOn && !on ? 0.4 : 1;
        }
        this.wake();
    }

    /** Centro della cima del tasto in px CSS relativi al canvas (per posizionare un'etichetta HTML). */
    getKeyScreenPosition(id: SkillNames): { x: number; y: number } | null {
        const i = this.keyIndex.get(id);
        if (i === undefined || this.width === 0 || this.revealState === 0) return null;
        const mesh = this.keyMeshes[i];
        this.rig.updateMatrixWorld(true);
        this.tmpV.set(0, KEYCAP.height, 0).applyMatrix4(mesh.matrixWorld).project(this.camera);
        return { x: (this.tmpV.x * 0.5 + 0.5) * this.width, y: (-this.tmpV.y * 0.5 + 0.5) * this.height };
    }

    /**
     * Ingombro della scheda in px CSS con la pose corrente (scala e rotazione y; ignora inclinazioni
     * attorno a x/z). Serve all'integrazione per dimensionare la scala sul viewport.
     */
    getBounds(): { width: number; height: number } {
        const s = this.pose.scale * this.boardPitch;
        const a = this.pose.rotation.y - AZIMUTH;
        const c = Math.abs(Math.cos(a));
        const sn = Math.abs(Math.sin(a));
        const hx = this.boardW / 2;
        const hz = this.boardD / 2;
        const round = BOARD.radius * (c + sn - 1);
        const w = 2 * (hx * c + hz * sn - round);
        const d = 2 * (hx * sn + hz * c - round);
        return { width: w * s, height: (d * Math.sin(ELEVATION) + BOARD.thickness * Math.cos(ELEVATION)) * s };
    }

    getInfo(): { drawCalls: number; triangles: number; geometries: number; textures: number; programs: number } {
        const info = this.renderer.info;
        return {
            drawCalls: info.render.calls,
            triangles: info.render.triangles,
            geometries: info.memory.geometries,
            textures: info.memory.textures,
            programs: info.programs?.length ?? 0,
        };
    }

    dispose(releaseContext = false): void {
        if (this.disposed) return;
        this.disposed = true;
        this.stopLoop();
        this.timers.forEach((t) => clearTimeout(t));
        this.timers.clear();
        this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
        this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
        this.pointerTarget.removeEventListener("pointermove", this.onPointerMove as EventListener);
        this.pointerTarget.removeEventListener("pointerdown", this.onPointerDown as EventListener);
        this.pointerTarget.removeEventListener("pointerleave", this.onPointerLeave as EventListener);
        window.removeEventListener("pointerup", this.onPointerUp);
        window.removeEventListener("pointercancel", this.onPointerUp);
        document.removeEventListener("visibilitychange", this.onVisibility);
        this.cResize?.disconnect();
        this.canvas.style.cursor = "";
        this.onHover = null;
        this.onPress = null;
        this.disposeResources(releaseContext);
        this.revealResolve?.();
        this.revealResolve = null;
    }

    // -----------------------------------------------------------------------
    // Costruzione
    // -----------------------------------------------------------------------

    private disposeResources(releaseContext = false): void {
        // Prima gli oggetti, poi il renderer: i contatori di memoria si azzerano
        for (const d of this.disposables) d.dispose();
        this.disposables.length = 0;
        this.envTarget?.dispose();
        this.envTarget = null;
        this.scene.environment = null;
        for (const m of this.keyMaterials) m.dispose();
        // Un nuovo renderer sullo stesso canvas (es. StrictMode) parte da uno stato noto
        const gl = this.renderer.getContext();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        this.renderer.dispose();
        if (releaseContext) this.renderer.forceContextLoss();
    }

    private buildEnvironment(): void {
        const pmrem = new PMREMGenerator(this.renderer);
        const studio = createStudioEnvironment();
        this.envTarget?.dispose();
        this.envTarget = pmrem.fromScene(studio.scene, 0.03);
        this.scene.environment = this.envTarget.texture;
        studio.dispose();
        pmrem.dispose();
    }

    private makeAtlas(): CanvasTexture {
        const rows = Math.ceil(this.n / ATLAS_COLS);
        const canvas = document.createElement("canvas");
        canvas.width = ATLAS_COLS * ATLAS_CELL;
        canvas.height = rows * ATLAS_CELL;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("KeyboardEngine: canvas 2D non disponibile");
        // Bianco su nero: il canale verde fa da maschera (alphaMap), senza aloni di bordo
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.n; i++) {
            const x = (i % ATLAS_COLS) * ATLAS_CELL;
            const y = Math.floor(i / ATLAS_COLS) * ATLAS_CELL;
            drawKeyIcon(ctx, SKILL_KEYS[i].id, x, y, ATLAS_CELL, "#ffffff");
        }
        const tex = new CanvasTexture(canvas);
        tex.colorSpace = NoColorSpace; // maschera lineare, non colore
        tex.generateMipmaps = true;
        tex.minFilter = LinearMipmapLinearFilter;
        tex.magFilter = LinearFilter;
        tex.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
        return tex;
    }

    private buildKeys(): void {
        const atlas = this.makeAtlas();
        this.disposables.push(atlas);
        const rows = Math.ceil(this.n / ATLAS_COLS);

        const decalMaterial = new MeshStandardMaterial({
            color: 0xffffff,
            alphaMap: atlas,
            transparent: true,
            depthWrite: false,
            roughness: 0.42,
            metalness: 0,
            emissive: 0xffffff,
            emissiveIntensity: 0.2,
            polygonOffset: true,
            polygonOffsetFactor: -2,
            polygonOffsetUnits: -2,
        });
        this.disposables.push(decalMaterial);

        // Ombra a contatto sotto ogni tasto: resta sul piano mentre il tasto si alza
        const aoTex = this.makeContactTexture();
        const aoGeo = new BufferGeometry();
        this.aoPos = new Float32Array(this.n * 12);
        this.aoCol = new Float32Array(this.n * 16);
        const aoUv = new Float32Array(this.n * 8);
        const aoIdx = new Uint16Array(this.n * 6);
        for (let i = 0; i < this.n; i++) {
            aoUv.set([0, 0, 1, 0, 1, 1, 0, 1], i * 8);
            const v = i * 4;
            aoIdx.set([v, v + 3, v + 1, v + 1, v + 3, v + 2], i * 6);
        }
        this.aoPosAttr = new BufferAttribute(this.aoPos, 3).setUsage(DynamicDrawUsage);
        this.aoColAttr = new BufferAttribute(this.aoCol, 4).setUsage(DynamicDrawUsage);
        aoGeo.setAttribute("position", this.aoPosAttr);
        aoGeo.setAttribute("color", this.aoColAttr);
        aoGeo.setAttribute("uv", new BufferAttribute(aoUv, 2));
        aoGeo.setIndex(new BufferAttribute(aoIdx, 1));
        const aoMat = new MeshBasicMaterial({
            map: aoTex,
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            toneMapped: false,
        });
        this.aoMesh = new Mesh(aoGeo, aoMat);
        this.aoMesh.frustumCulled = false;
        this.aoMesh.renderOrder = -4;
        this.content.add(this.aoMesh);
        this.disposables.push(aoTex, aoGeo, aoMat);

        const hsl = { h: 0, s: 0, l: 0 };
        for (let i = 0; i < this.n; i++) {
            const def = SKILL_KEYS[i];
            this.keyIndex.set(def.id, i);

            const color = new Color(SKILL_CATEGORIES[def.category].color);
            color.getHSL(hsl);
            color.setHSL(
                (hsl.h + keyNoise(i, 1) * 0.008 + 1) % 1,
                clamp01(hsl.s + keyNoise(i, 2) * 0.04),
                clamp01(hsl.l + keyNoise(i, 3) * 0.045),
            );
            this.baseColors.push(color);

            const mat = new MeshPhysicalMaterial({
                color: color.clone(),
                roughness: 0.5,
                metalness: 0,
                clearcoat: 0.45,
                clearcoatRoughness: 0.28,
                emissive: color.clone(),
                emissiveIntensity: 0,
            });
            this.keyMaterials.push(mat);

            const mesh = new Mesh(this.keyGeometry, mat);
            mesh.visible = false;
            this.keyMeshes.push(mesh);

            const col = i % ATLAS_COLS;
            const row = Math.floor(i / ATLAS_COLS);
            const decalGeo = createDecalGeometry(
                col / ATLAS_COLS,
                1 - (row + 1) / rows,
                (col + 1) / ATLAS_COLS,
                1 - row / rows,
                DECAL_HALF,
            );
            this.disposables.push(decalGeo);
            const decal = new Mesh(decalGeo, decalMaterial);
            decal.renderOrder = 1;
            mesh.add(decal);
            this.decalMeshes.push(decal);
            this.content.add(mesh);

            this.phase[i] = (keyNoise(i, 4) * 0.5 + 0.5) * Math.PI * 2;
            this.omega[i] = 1.25 + (keyNoise(i, 5) * 0.5 + 0.5) * 1.1;
            this.amp[i] = 0.7 + (keyNoise(i, 6) * 0.5 + 0.5) * 0.3;
            this.revDelay[i] = (i / (this.n - 1)) * REVEAL_SPREAD + (keyNoise(i, 7) * 0.5 + 0.5) * 0.12;
            this.revDur[i] = REVEAL_FALL * (0.9 + (keyNoise(i, 8) * 0.5 + 0.5) * 0.2);
        }
    }

    private makeGlowTexture(): CanvasTexture {
        const size = 256;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
            g.addColorStop(0, "rgba(255,255,255,1)");
            g.addColorStop(0.35, "rgba(255,255,255,0.45)");
            g.addColorStop(0.7, "rgba(255,255,255,0.1)");
            g.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, size, size);
        }
        return new CanvasTexture(canvas);
    }

    private makeContactTexture(): CanvasTexture {
        const size = 128;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const offset = 4000;
            const body = size * 0.6;
            ctx.shadowColor = "rgba(0,0,0,1)";
            ctx.shadowBlur = size * 0.2;
            ctx.shadowOffsetX = offset;
            ctx.fillStyle = "#000";
            roundedRect(ctx, (size - body) / 2 - offset, (size - body) / 2, body, body, body * 0.22);
            ctx.fill();
        }
        return new CanvasTexture(canvas);
    }

    private makeShadowTexture(layout: KeyboardLayout, padU: number): CanvasTexture {
        const ppu = 26;
        const wU = layout.width / layout.pitch + padU * 2;
        const dU = layout.depth / layout.pitch + padU * 2;
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(wU * ppu);
        canvas.height = Math.ceil(dU * ppu);
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const offset = 4000;
            const w = (layout.width / layout.pitch - 0.3) * ppu;
            const d = (layout.depth / layout.pitch - 0.3) * ppu;
            const x = (canvas.width - w) / 2 - offset;
            const y = (canvas.height - d) / 2;
            const r = 0.7 * ppu;
            ctx.shadowColor = "rgba(0,0,0,1)";
            ctx.shadowBlur = padU * ppu * 0.9;
            ctx.shadowOffsetX = offset;
            ctx.fillStyle = "#000";
            roundedRect(ctx, x, y, w, d, r);
            ctx.fill();
        }
        return new CanvasTexture(canvas);
    }

    private buildBoard(layout: KeyboardLayout): void {
        const wU = layout.width / layout.pitch;
        const dU = layout.depth / layout.pitch;
        const geo = createBoardGeometry(wU, dU);
        const mesh = new Mesh(geo, this.boardMaterials);
        this.boardGeo = geo;
        this.boardMesh = mesh;
        this.boardW0 = this.boardW = wU;
        this.boardD0 = this.boardD = dU;
        this.boardPitch = layout.pitch;

        // Per ridimensionare la scheda basta spostare ogni vertice di mezza differenza, nel verso del suo angolo
        const pos = geo.getAttribute("position").array as Float32Array;
        this.boardPos0 = new Float32Array(pos);
        this.boardSx = new Int8Array(pos.length / 3);
        this.boardSz = new Int8Array(pos.length / 3);
        for (let v = 0; v < this.boardSx.length; v++) {
            const x = pos[v * 3];
            const z = pos[v * 3 + 2];
            this.boardSx[v] = x > 1e-6 ? 1 : x < -1e-6 ? -1 : 0;
            this.boardSz[v] = z > 1e-6 ? 1 : z < -1e-6 ? -1 : 0;
        }

        // Ombra morbida sotto la scheda: due texture, una per forma di layout
        const padU = 1.1;
        const texD = this.makeShadowTexture(getKeyboardLayout(false), padU);
        const texM = this.makeShadowTexture(getKeyboardLayout(true), padU);
        this.shadowTex = [texD, texM];
        this.shadowTexIdx = layout.mobile ? 1 : 0;
        this.shadowMat = new MeshBasicMaterial({
            map: this.shadowTex[this.shadowTexIdx],
            transparent: true,
            depthWrite: false,
            toneMapped: false,
            opacity: 0,
        });
        const shGeo = new PlaneGeometry(1, 1);
        this.shadowMesh = new Mesh(shGeo, this.shadowMat);
        this.shadowMesh.rotation.x = -Math.PI / 2;
        this.shadowMesh.position.y = BOARD.bottomY - 0.01;
        this.shadowMesh.renderOrder = -5;

        // Quattro piedini sotto la scheda (si vedono solo se la tastiera viene capovolta)
        const feetGeo = new CylinderGeometry(0.2, 0.22, 0.09, 20);
        this.feet = new InstancedMesh(feetGeo, this.boardMaterials[2], 4);
        this.feet.frustumCulled = false;

        this.boardGroup = new Group();
        this.boardGroup.add(mesh, this.feet, this.shadowMesh);
        this.boardGroup.visible = false;
        this.content.add(this.boardGroup);
        this.disposables.push(geo, texD, texM, this.shadowMat, shGeo, feetGeo, this.feet);
        this.applyBoardSize(wU, dU);
    }

    /** Ridimensiona scheda, piedini e ombra (dimensioni in u). */
    private applyBoardSize(wU: number, dU: number): void {
        this.boardW = wU;
        this.boardD = dU;
        const pos = this.boardGeo.getAttribute("position") as BufferAttribute;
        const arr = pos.array as Float32Array;
        const p0 = this.boardPos0;
        const sx = this.boardSx;
        const sz = this.boardSz;
        const dx = (wU - this.boardW0) / 2;
        const dz = (dU - this.boardD0) / 2;
        for (let v = 0, o = 0; v < sx.length; v++, o += 3) {
            arr[o] = p0[o] + sx[v] * dx;
            arr[o + 2] = p0[o + 2] + sz[v] * dz;
        }
        pos.needsUpdate = true;
        // Il raycast ricalcola i volumi di contenimento alla prossima richiesta
        this.boardGeo.boundingSphere = null;
        this.boardGeo.boundingBox = null;

        const fx = wU / 2 - 1.05;
        const fz = dU / 2 - 1.05;
        const m = this.feetMatrix;
        const y = BOARD.bottomY - 0.04;
        for (let i = 0; i < 4; i++) {
            m.makeTranslation(i & 1 ? fx : -fx, y, i & 2 ? fz : -fz);
            this.feet.setMatrixAt(i, m);
        }
        this.feet.instanceMatrix.needsUpdate = true;
        this.shadowMesh.scale.set(wU + 2.2, dU + 2.2, 1);
    }

    private applyLayoutInstant(layout: KeyboardLayout): void {
        for (let i = 0; i < this.n; i++) {
            const k = layout.keys[i];
            this.kx[i] = this.fx[i] = this.tx[i] = k.x;
            this.kz[i] = this.fz[i] = this.tz[i] = k.z;
            this.kp[i] = this.fp[i] = this.tp[i] = layout.pitch;
        }
        this.boardPitch = layout.pitch;
        this.applyBoardSize(layout.width / layout.pitch, layout.depth / layout.pitch);
        this.useShadowTexture(layout.mobile ? 1 : 0);
    }

    private useShadowTexture(idx: number): void {
        if (this.shadowTexIdx === idx) return;
        this.shadowTexIdx = idx;
        this.shadowMat.map = this.shadowTex[idx];
        this.shadowMat.needsUpdate = true;
    }

    // -----------------------------------------------------------------------
    // Tema
    // -----------------------------------------------------------------------

    private applyTheme(m: number): void {
        const D = THEME_SPECS.dark;
        const L = THEME_SPECS.light;
        const [caseMat, plateMat, underMat] = this.boardMaterials;
        this.cFrom.setHex(D.caseColor);
        this.cTo.setHex(L.caseColor);
        caseMat.color.lerpColors(this.cFrom, this.cTo, m);
        caseMat.roughness = lerp(D.caseRoughness, L.caseRoughness, m);
        this.cFrom.setHex(D.plateColor);
        this.cTo.setHex(L.plateColor);
        plateMat.color.lerpColors(this.cFrom, this.cTo, m);
        this.cFrom.setHex(D.underColor);
        this.cTo.setHex(L.underColor);
        underMat.color.lerpColors(this.cFrom, this.cTo, m);
        this.scene.environmentIntensity = lerp(D.env, L.env, m);
        this.keyLight.intensity = lerp(D.key, L.key, m);
        this.rimLight.intensity = lerp(D.rim, L.rim, m);
        this.cFrom.setHex(D.glowColor);
        this.cTo.setHex(L.glowColor);
        this.glowMaterial.color.lerpColors(this.cFrom, this.cTo, m);
    }

    // -----------------------------------------------------------------------
    // Loop
    // -----------------------------------------------------------------------

    private wake(): void {
        this.dirty = true;
        this.idleFrames = 0;
        if (this.raf || this.disposed || this.paused || this.contextLost || typeof document === "undefined") return;
        if (document.hidden) return;
        this.last = 0;
        this.raf = requestAnimationFrame(this.frame);
    }

    private stopLoop(): void {
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = 0;
    }

    private readonly frame = (now: number): void => {
        this.raf = 0;
        if (this.disposed || this.paused) return;
        const dt = this.last ? Math.min((now - this.last) / 1000, 0.05) : 1 / 60;
        this.last = now;
        this.time += dt;

        let active = this.dirty;
        this.dirty = false;
        if (this.step(dt)) active = true;

        if (this.pickPending) {
            this.pickPending = false;
            this.doPick();
            active = true;
        }

        if (active && this.rig.visible) {
            this.renderer.render(this.scene, this.camera);
            this.drawn = true;
            this.idleFrames = 0;
        } else {
            if (active && this.drawn) {
                // Appena nascosta: si cancella l'ultimo fotogramma
                this.renderer.clear();
                this.drawn = false;
            }
            this.idleFrames++;
        }

        // Si ferma da solo quando tutto è fermo (wake() può averlo già riprogrammato durante il frame)
        if (this.idleFrames > 6 && !this.dirty) return;
        if (!this.raf) this.raf = requestAnimationFrame(this.frame);
    };

    /** Aggiorna animazioni e trasformazioni. Ritorna true se qualcosa è cambiato (serve ridisegnare). */
    private step(dt: number): boolean {
        let active = false;
        const n = this.n;

        // Pose (il motore la legge a ogni frame)
        const p = this.pose;
        const lp = this.lastPose;
        if (
            lp[0] !== p.scale ||
            lp[1] !== p.position.x ||
            lp[2] !== p.position.y ||
            lp[3] !== p.position.z ||
            lp[4] !== p.rotation.x ||
            lp[5] !== p.rotation.y ||
            lp[6] !== p.rotation.z
        ) {
            lp[0] = p.scale;
            lp[1] = p.position.x;
            lp[2] = p.position.y;
            lp[3] = p.position.z;
            lp[4] = p.rotation.x;
            lp[5] = p.rotation.y;
            lp[6] = p.rotation.z;
            active = true;
            if (this.pointerInside && this.time - this.lastRepick > 0.12) {
                this.pickPending = true;
                this.lastRepick = this.time;
            }
        }

        // Visibilità (scala 0 -> 1)
        if (this.vis !== this.visTarget) {
            this.vis += (this.visTarget - this.vis) * (1 - Math.exp(-dt * 7));
            if (Math.abs(this.vis - this.visTarget) < 0.002) this.vis = this.visTarget;
            active = true;
        }
        const visMul = easeOutCubic(this.vis);
        const shown = this.vis > 0.004 && this.revealState !== 0;
        this.rig.visible = shown;
        this.glow.visible = shown;

        // Tema
        if (this.themeLive !== (this.themeTarget === "light" ? 1 : 0)) {
            const target = this.themeTarget === "light" ? 1 : 0;
            this.themeMix += (target - this.themeMix) * (1 - Math.exp(-dt * 6));
            if (Math.abs(this.themeMix - target) < 0.003) this.themeMix = target;
            this.applyTheme(this.themeMix);
            this.themeLive = this.themeMix === target ? target : -1;
            active = true;
        }

        // Intro
        let boardPop = 1;
        if (this.revealState === 1) {
            this.revealT += dt;
            boardPop = easeOutBack(clamp01(this.revealT / 0.8));
            if (this.revealT >= REVEAL_SPREAD + REVEAL_FALL * 1.1 + 0.15) {
                this.revealState = 2;
                this.revealResolve?.();
                this.revealResolve = null;
            }
            active = true;
        } else if (this.revealState === 0) {
            boardPop = 0;
        }

        // Float
        const floatTarget = this.excited ? 1 : 0;
        if (this.floatAmt !== floatTarget) {
            this.floatAmt += (floatTarget - this.floatAmt) * (1 - Math.exp(-dt * 2.4));
            if (Math.abs(this.floatAmt - floatTarget) < 0.002) this.floatAmt = floatTarget;
            active = true;
        }
        if (this.floatAmt > 0) active = true;

        // Cambio layout: tasti e scheda si muovono insieme
        let morphing = false;
        if (this.morphT >= 0) {
            morphing = true;
            this.morphT += dt / MORPH_DURATION;
            const done = this.morphT >= 1;
            const eb = done ? 1 : easeInOutCubic(clamp01((this.morphT - 0.08) / 0.78));
            this.boardPitch = lerp(this.fBP, this.tBP, eb);
            this.applyBoardSize(lerp(this.fW, this.tW, eb), lerp(this.fD, this.tD, eb));
            if (eb > 0.5) this.useShadowTexture(this.layout.mobile ? 1 : 0);
            if (done) {
                this.morphT = -1;
                morphing = false;
                for (let i = 0; i < n; i++) {
                    this.kx[i] = this.tx[i];
                    this.kz[i] = this.tz[i];
                    this.kp[i] = this.tp[i];
                }
            }
            active = true;
        }

        // Scheda: comparsa all'intro e ombra
        const board = this.boardGroup;
        board.visible = boardPop > 0.002;
        board.scale.setScalar(Math.max(this.boardPitch * boardPop, 1e-4));
        this.shadowMat.opacity = lerp(THEME_SPECS.dark.shadow, THEME_SPECS.light.shadow, this.themeMix) * clamp01(boardPop);

        // Molle per tasto
        const steps = Math.max(1, Math.ceil(dt / 0.008));
        const h = dt / steps;
        for (let i = 0; i < n; i++) {
            for (let s = 0; s < steps; s++) {
                let v = this.hovV[i] + (260 * (this.hovT[i] - this.hov[i]) - 22 * this.hovV[i]) * h;
                this.hov[i] += v * h;
                this.hovV[i] = v;
                v = this.prsV[i] + (520 * (this.prsT[i] - this.prs[i]) - 26 * this.prsV[i]) * h;
                this.prs[i] += v * h;
                this.prsV[i] = v;
                v = this.dimV[i] + (120 * (this.dimT[i] - this.dim[i]) - 20 * this.dimV[i]) * h;
                this.dim[i] += v * h;
                this.dimV[i] = v;
            }
            this.hl[i] += (this.hlT[i] - this.hl[i]) * (1 - Math.exp(-dt * 9));
            if (
                Math.abs(this.hovT[i] - this.hov[i]) > 0.0008 ||
                Math.abs(this.hovV[i]) > 0.002 ||
                Math.abs(this.prsT[i] - this.prs[i]) > 0.0008 ||
                Math.abs(this.prsV[i]) > 0.002 ||
                Math.abs(this.dimT[i] - this.dim[i]) > 0.0008 ||
                Math.abs(this.dimV[i]) > 0.002 ||
                Math.abs(this.hlT[i] - this.hl[i]) > 0.002
            ) {
                active = true;
            }
        }

        // Trasformazione di ogni tasto
        const t = this.time;
        const floatAmt = this.floatAmt;
        const revealing = this.revealState === 1;
        const rt = this.revealT;
        const floorY = BOARD.floorY;
        const aoBase = lerp(THEME_SPECS.dark.ao, THEME_SPECS.light.ao, this.themeMix);
        const aoPos = this.aoPos;
        const aoCol = this.aoCol;
        const boardMix = clamp01(boardPop);
        for (let i = 0; i < n; i++) {
            const mesh = this.keyMeshes[i];
            let pitch = this.kp[i];
            let x = this.kx[i];
            let z = this.kz[i];
            let y = 0;
            let pop = 1;

            if (morphing) {
                const d = (i / (n - 1)) * 0.32;
                const pk = clamp01((this.morphT - d) / 0.68);
                const e = easeInOutCubic(pk);
                x = lerp(this.fx[i], this.tx[i], e);
                z = lerp(this.fz[i], this.tz[i], e);
                pitch = lerp(this.fp[i], this.tp[i], e);
                y += Math.sin(Math.PI * pk) * HOP_HEIGHT;
                this.kx[i] = x;
                this.kz[i] = z;
                this.kp[i] = pitch;
                // x/z/pitch sono i valori correnti: il prossimo frame riparte dagli stessi from/to
            }

            let visible = shown;
            if (this.revealState === 0) visible = false;
            if (revealing) {
                const local = rt - this.revDelay[i];
                if (local < 0) {
                    visible = false;
                } else {
                    const pr = clamp01(local / this.revDur[i]);
                    y += DROP_HEIGHT * (1 - bounceOut(pr));
                    pop = 0.55 + 0.45 * easeOutCubic(clamp01(pr * 3));
                }
            }
            mesh.visible = visible;
            if (!visible) {
                const c = i * 16 + 3;
                aoCol[c] = aoCol[c + 4] = aoCol[c + 8] = aoCol[c + 12] = 0;
                continue;
            }

            y += HOVER_LIFT * this.hov[i] - PRESS_DEPTH * this.prs[i] + HOVER_LIFT * 0.8 * this.hl[i];
            let rx = 0;
            let rz = 0;
            if (floatAmt > 0) {
                const a = t * this.omega[i] + this.phase[i];
                y += floatAmt * FLOAT_AMP * this.amp[i] * (0.5 + 0.5 * Math.sin(a));
                rx = floatAmt * 0.07 * Math.sin(a + 1.1);
                rz = floatAmt * 0.07 * Math.sin(a * 0.8 + 2.3);
            }
            const lift = y > 0 ? y : 0;
            const half = (pitch * (1.5 + 0.7 * lift)) / 2;
            const ay = (floorY + 0.004) * pitch;
            const o = i * 12;
            aoPos[o] = aoPos[o + 9] = x - half;
            aoPos[o + 3] = aoPos[o + 6] = x + half;
            aoPos[o + 1] = aoPos[o + 4] = aoPos[o + 7] = aoPos[o + 10] = ay;
            aoPos[o + 2] = aoPos[o + 5] = z - half;
            aoPos[o + 8] = aoPos[o + 11] = z + half;
            const a = aoBase * boardMix * (1 - 0.65 * clamp01(lift / 1.5));
            const c = i * 16 + 3;
            aoCol[c] = aoCol[c + 4] = aoCol[c + 8] = aoCol[c + 12] = a;
            mesh.position.set(x, (floorY + y) * pitch, z);
            mesh.rotation.set(rx, 0, rz);
            mesh.scale.setScalar(pitch * pop);

            // Aspetto: bagliore al passaggio, attenuazione quando altri sono evidenziati
            const mat = this.keyMaterials[i];
            mat.emissiveIntensity = this.hov[i] * 0.3 + this.hl[i] * 0.25 + this.prs[i] * 0.08;
            if (this.dim[i] !== 1 || this.highlightOn) {
                mat.color.copy(this.baseColors[i]).multiplyScalar(this.dim[i]);
            } else {
                mat.color.copy(this.baseColors[i]);
            }
        }

        this.aoPosAttr.needsUpdate = true;
        this.aoColAttr.needsUpdate = true;
        this.aoMesh.visible = shown;

        // Rig: pose
        const sc = Math.max(p.scale * (0.02 + 0.98 * visMul), 1e-5);
        this.rig.position.set(p.position.x, p.position.y, p.position.z);
        this.rig.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
        this.rig.scale.setScalar(sc);
        // Ombra visibile solo con la tastiera "dritta"
        const up = Math.cos(p.rotation.x) * Math.cos(p.rotation.z);
        this.shadowMesh.visible = up > 0.15;

        // Bagliore: sempre dietro la tastiera, grande quanto la scheda
        const gm = this.glowMaterial;
        gm.opacity = lerp(THEME_SPECS.dark.glow, THEME_SPECS.light.glow, this.themeMix) * clamp01(boardPop) * visMul;
        const gsz = Math.hypot(this.boardW, this.boardD) * this.boardPitch * sc * 1.15;
        this.glow.scale.set(gsz, gsz, 1);
        this.glow.position
            .set(p.position.x, p.position.y, p.position.z)
            .addScaledVector(CAM_DIR, -3000);

        return active;
    }

    // -----------------------------------------------------------------------
    // Puntatore
    // -----------------------------------------------------------------------

    private readonly onPointerMove = (e: PointerEvent): void => {
        if (e.pointerType === "touch") return;
        this.px = e.clientX;
        this.py = e.clientY;
        this.pointerInside = true;
        this.pickPending = true;
        this.wake();
    };

    private readonly onPointerLeave = (e: PointerEvent): void => {
        if (e.pointerType === "touch") return;
        this.pointerInside = false;
        this.pickPending = false;
        this.setHover(-1);
    };

    private readonly onPointerDown = (e: PointerEvent): void => {
        if (this.revealState === 0 || (e.pointerType === "mouse" && e.button !== 0)) return;
        this.px = e.clientX;
        this.py = e.clientY;
        this.pointerInside = true;
        const idx = this.pickNow();
        if (e.pointerType === "touch") {
            if (this.touchClear) {
                clearTimeout(this.touchClear);
                this.timers.delete(this.touchClear);
                this.touchClear = null;
            }
            this.touchPress = { x: e.clientX, y: e.clientY, t: performance.now(), idx };
            this.setHover(idx);
            if (idx >= 0) this.setPressed(idx, true, false);
            return;
        }
        this.setHover(idx);
        if (idx >= 0) this.setPressed(idx, true, true);
    };

    private readonly onPointerUp = (e: PointerEvent): void => {
        if (e.pointerType === "touch") {
            const tp = this.touchPress;
            this.touchPress = null;
            if (!tp) return;
            const tap =
                e.type === "pointerup" &&
                Math.hypot(e.clientX - tp.x, e.clientY - tp.y) < 14 &&
                performance.now() - tp.t < 600;
            if (tp.idx >= 0) {
                this.setPressed(tp.idx, false, false);
                if (tap) {
                    const id = this.layout.keys[tp.idx].id;
                    this.onPress?.(id, true);
                    const t = setTimeout(() => {
                        this.timers.delete(t);
                        this.onPress?.(id, false);
                    }, 90);
                    this.timers.add(t);
                }
            }
            if (!tap) this.setHover(-1);
            else {
                const t = setTimeout(() => {
                    this.timers.delete(t);
                    this.touchClear = null;
                    this.setHover(-1);
                }, 1100);
                this.touchClear = t;
                this.timers.add(t);
            }
            return;
        }
        if (this.pressIdx >= 0) this.setPressed(this.pressIdx, false, true);
    };

    private readonly onVisibility = (): void => {
        if (document.hidden) this.stopLoop();
        else this.wake();
    };

    private readonly onContextLost = (e: Event): void => {
        e.preventDefault();
        this.stopLoop();
        this.contextLost = true;
    };

    private readonly onContextRestored = (): void => {
        if (this.disposed) return;
        // Gli oggetti GPU sono andati persi: l'ambiente va rigenerato, il resto lo ricarica three
        this.envTarget = null;
        this.buildEnvironment();
        this.contextLost = false;
        this.wake();
    };

    private syncPressTarget(i: number): void {
        this.prsT[i] = this.progPress[i] || this.pressIdx === i || this.touchPress?.idx === i ? 1 : 0;
    }

    private setPressed(i: number, down: boolean, notify: boolean): void {
        if (notify) this.pressIdx = down ? i : -1;
        this.syncPressTarget(i);
        if (notify) this.onPress?.(this.layout.keys[i].id, down);
        this.wake();
    }

    private setHover(idx: number): void {
        if (idx === this.hoverIdx) return;
        this.hoverIdx = idx;
        for (let i = 0; i < this.n; i++) this.hovT[i] = i === idx ? 1 : 0;
        this.canvas.style.cursor = idx >= 0 ? "pointer" : "";
        this.onHover?.(idx >= 0 ? this.layout.keys[idx].id : null);
        this.wake();
    }

    private doPick(): void {
        if (!this.pointerInside) return;
        this.setHover(this.pickNow());
    }

    /** Indice del tasto sotto il puntatore, -1 per scheda/sfondo. */
    private pickNow(): number {
        if (this.width === 0 || !this.rig.visible) return -1;
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return -1;
        this.ndc.set(((this.px - rect.left) / rect.width) * 2 - 1, -((this.py - rect.top) / rect.height) * 2 + 1);
        this.raycaster.setFromCamera(this.ndc, this.camera);
        this.rig.updateMatrixWorld(true);

        let best = Infinity;
        let bestIdx = -1;
        const hits = this.hits;
        for (let i = 0; i < this.n; i++) {
            const mesh = this.keyMeshes[i];
            if (!mesh.visible) continue;
            hits.length = 0;
            this.raycaster.intersectObject(mesh, false, hits);
            if (hits.length && hits[0].distance < best) {
                best = hits[0].distance;
                bestIdx = i;
            }
        }
        if (this.boardGroup.visible) {
            hits.length = 0;
            this.raycaster.intersectObject(this.boardMesh, false, hits);
            if (hits.length && hits[0].distance < best) bestIdx = -1;
        }
        hits.length = 0;
        return bestIdx;
    }
}
