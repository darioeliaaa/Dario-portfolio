import type { MetadataRoute } from "next";
import { config } from "@/data/config";

/**
 * Convenzione di file di Next: genera /manifest.webmanifest e aggiunge da
 * solo <link rel="manifest"> nell'head — non va collegato a mano da nessuna
 * parte. Permette ad Android/Chrome di trattare "Aggiungi a Home" come
 * un'installazione vera (icona, nome, colori) invece che un semplice
 * segnalibro con lo screenshot della pagina.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: config.title,
        short_name: config.author,
        description: config.description.short,
        start_url: "/",
        display: "standalone",
        background_color: "#05070d",
        theme_color: "#05070d",
        icons: [
            { src: "/icon", sizes: "512x512", type: "image/png" },
            { src: "/apple-icon", sizes: "180x180", type: "image/png" },
        ],
    };
}
