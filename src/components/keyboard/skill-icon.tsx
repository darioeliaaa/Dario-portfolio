import { SkillNames } from "@/data/skill-keys";
import { BRAND_COLORS, KEY_ICONS, isDarkBrand } from "./key-icons";

type SkillIconProps = {
    id: SkillNames;
    className?: string;
    /** Colore unico (default `currentColor`). Ignorato se `colored` è attivo. */
    color?: string;
    /** Usa il colore di marca; i marchi quasi neri ripiegano su `currentColor` per restare leggibili sul tema scuro. */
    colored?: boolean;
};

/**
 * Icona di una tecnologia come <svg> inline: nessuno stato, usabile anche in un Server Component.
 * `overflow: visible` perché i loghi molto larghi sforano di poco il viewBox quadrato.
 */
export function SkillIcon({ id, className, color, colored }: SkillIconProps) {
    const spec = KEY_ICONS[id];
    const fill = colored
        ? isDarkBrand(id)
            ? "currentColor"
            : BRAND_COLORS[id]
        : (color ?? "currentColor");

    if (spec.kind === "text") {
        // Lunghezza stimata (~0.68em a carattere in grassetto) per far entrare la sigla nel riquadro
        const fontSize = Math.min(76 / (spec.text.length * 0.68), 56) * (spec.scale ?? 1);
        return (
            <svg
                viewBox="0 0 100 100"
                className={className}
                fill={fill}
                overflow="visible"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
            >
                <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily='ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif'
                    fontWeight={700}
                    fontSize={fontSize}
                >
                    {spec.text}
                </text>
            </svg>
        );
    }

    return (
        <svg
            viewBox={spec.viewBox}
            className={className}
            fill={fill}
            overflow="visible"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
        >
            {spec.paths.map((p, i) => (
                <path
                    key={i}
                    d={p.d}
                    fill={colored ? p.fill : undefined}
                    fillOpacity={p.opacity}
                    fillRule={p.fillRule}
                />
            ))}
        </svg>
    );
}
