import { ImageResponse } from "next/og";
import { renderSiteIcon } from "@/lib/site-icon";

// Convenzione di file di Next: genera in automatico la rotta /apple-icon e il
// relativo <link rel="apple-touch-icon">. Prima non esisteva — su iOS,
// "Aggiungi a Home" pescava uno screenshot generico della pagina invece di
// un'icona disegnata.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(renderSiteIcon(size.width), { ...size });
}
