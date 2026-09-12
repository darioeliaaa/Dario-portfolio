import { ImageResponse } from "next/og";
import { config } from "@/data/config";

/**
 * Card social dedicata a /cv, stesso linguaggio visivo della home
 * (src/app/opengraph-image.tsx) ma testo diverso — Next sceglie in automatico
 * questo file invece di quello della home per qualsiasi URL sotto /cv, senza
 * bisogno di collegarlo a mano da nessuna parte. Prima /cv non ne aveva uno
 * proprio: condividere il link del curriculum mostrava comunque il titolo e
 * la descrizione generici della home.
 */
export const alt = `Curriculum di ${config.author} — ${config.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CvOpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background:
                        "radial-gradient(900px 600px at 78% 22%, #16203a 0%, #05070d 62%)",
                    color: "#f8fafc",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        fontSize: 24,
                        color: "#93a4bd",
                    }}
                >
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            background: "#3b82f6",
                        }}
                    />
                    Curriculum Vitae
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 28,
                        fontSize: 96,
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                    }}
                >
                    <span>{config.author}</span>
                </div>

                <div style={{ display: "flex", marginTop: 36, fontSize: 34, color: "#cbd5e1" }}>
                    {config.role}
                </div>

                <div
                    style={{
                        display: "flex",
                        marginTop: 18,
                        fontSize: 26,
                        color: "#64748b",
                    }}
                >
                    {config.site.replace(/^https?:\/\//, "")}/cv
                </div>
            </div>
        ),
        { ...size }
    );
}
