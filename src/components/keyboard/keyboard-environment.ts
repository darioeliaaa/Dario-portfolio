// Ambiente procedurale "da studio" per i riflessi: una stanza scura con alcuni
// pannelli luminosi (softbox). Si passa a PMREMGenerator una volta sola; la
// camera della scena guarda da azimut -30° ed elevazione 45°, quindi il
// pannello principale sta nella direzione in cui le facce superiori dei tasti
// vedono il loro riflesso.
import { BackSide, BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Vector3 } from "three";

type Panel = {
    /** Direzione dal centro verso il pannello. */
    dir: [number, number, number];
    distance: number;
    size: [number, number];
    color: [number, number, number];
    /** Intensità (HDR): oltre 1 il pannello "accende" i riflessi. */
    power: number;
};

const PANELS: Panel[] = [
    // Principale: grande e morbido, in alto a destra/dietro (riflesso delle cime dei tasti)
    { dir: [0.55, 0.62, -0.5], distance: 20, size: [16, 12], color: [1, 0.98, 0.95], power: 5 },
    // Controluce freddo, stretto, a sinistra
    { dir: [-0.95, 0.25, -0.2], distance: 20, size: [4, 16], color: [0.7, 0.8, 1], power: 4.5 },
    // Riempimento davanti, molto tenue
    { dir: [-0.2, 0.35, 0.9], distance: 22, size: [18, 8], color: [1, 1, 1], power: 1.4 },
    // Rimbalzo dal basso (dà una luce alla base dei fianchi)
    { dir: [0.1, -0.95, 0.2], distance: 18, size: [30, 30], color: [0.8, 0.85, 1], power: 0.55 },
];

export function createStudioEnvironment(): { scene: Scene; dispose: () => void } {
    const scene = new Scene();
    const box = new BoxGeometry(80, 80, 80);
    const room = new MeshBasicMaterial({ side: BackSide });
    room.color.setRGB(0.05, 0.055, 0.07);
    scene.add(new Mesh(box, room));

    const plane = new PlaneGeometry(1, 1);
    const materials: MeshBasicMaterial[] = [room];
    const target = new Vector3();
    for (const p of PANELS) {
        const mat = new MeshBasicMaterial({ side: DoubleSide });
        mat.color.setRGB(p.color[0] * p.power, p.color[1] * p.power, p.color[2] * p.power);
        const mesh = new Mesh(plane, mat);
        target.set(p.dir[0], p.dir[1], p.dir[2]).normalize();
        mesh.position.copy(target).multiplyScalar(p.distance);
        mesh.scale.set(p.size[0], p.size[1], 1);
        mesh.lookAt(0, 0, 0);
        scene.add(mesh);
        materials.push(mat);
    }

    return {
        scene,
        dispose: () => {
            box.dispose();
            plane.dispose();
            for (const m of materials) m.dispose();
        },
    };
}
