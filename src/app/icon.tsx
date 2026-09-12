import { ImageResponse } from "next/og";
import { renderSiteIcon } from "@/lib/site-icon";

// Convenzione di file di Next: genera in automatico la rotta /icon e il
// relativo <link rel="icon">, accanto al favicon.ico statico già in
// public/. A 512px serve principalmente come icona grande per Android
// "Aggiungi a Home"/manifest — il browser sceglie da sé la misura giusta
// per la scheda in base a quelle disponibili.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(renderSiteIcon(size.width), { ...size });
}
