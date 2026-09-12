/**
 * Monogramma condiviso da icon.tsx e apple-icon.tsx — stessa identità visiva
 * (sfondo scuro + blu accento) della card OG generata in opengraph-image.tsx,
 * così il sito ha una faccia coerente ovunque compaia: scheda del browser,
 * home schermata di un telefono, anteprima social.
 *
 * Volutamente uno sfondo pieno, non trasparente: l'icona per iOS non deve
 * avere angoli arrotondati né trasparenza — è iOS stesso ad applicare la sua
 * maschera — e un favicon trasparente su sfondo chiaro sparisce.
 */
export const renderSiteIcon = (size: number) => (
    <div
        style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at 70% 25%, #16203a 0%, #05070d 70%)",
            fontFamily: "sans-serif",
        }}
    >
        <span
            style={{
                fontSize: size * 0.46,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#f8fafc",
                lineHeight: 1,
            }}
        >
            DE
        </span>
        <div
            style={{
                position: "absolute",
                width: size * 0.09,
                height: size * 0.09,
                borderRadius: 999,
                background: "#3b82f6",
                right: size * 0.16,
                bottom: size * 0.18,
            }}
        />
    </div>
);
