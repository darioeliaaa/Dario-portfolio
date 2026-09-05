import { ImageResponse } from "next/og";
import { config } from "@/data/config";

/**
 * Social preview card, generated from `config` at build time.
 *
 * The repo previously shipped a static `og-image.png` inherited from the
 * template — it still had the original author's name on it, so every share of
 * this site advertised someone else. Generating it means it can never drift.
 */
export const alt = `${config.author} — ${config.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [firstName, ...rest] = config.author.split(" ");

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
          {config.availabilityLabel}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 116,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          <span>{firstName}</span>
          <span style={{ color: "#a8b6cc" }}>{rest.join(" ")}</span>
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
          {config.site.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
