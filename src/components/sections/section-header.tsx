import { cn } from "@/lib/utils";
import Link from "next/link";
import { BoxReveal } from "../reveal-animations";
import { ReactNode } from "react";

/**
 * Sticky section title.
 *
 * The default `sticky top-[70px] mb-96` is deliberate: the heading pins to the
 * top while the 3D keyboard scrubs through the tall section behind it. Pass a
 * `className` with `static`/`relative` to opt out (contact & the 2D fallbacks).
 */
export const SectionHeader = ({
  id,
  title,
  desc,
  eyebrow,
  index,
  className,
}: {
  id: string;
  title: string | ReactNode;
  desc?: string;
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  /** 1-based section order — renders as a giant faint numeral behind the
      title, the "editorial index" signature used across the whole site. */
  index?: number;
  className?: string;
}) => {
  return (
    <div className={cn("top-[70px] sticky mb-96", className)}>
      <div className="relative flex flex-col items-center">
        {typeof index === "number" && (
          <span aria-hidden className="ghost-number">
            {String(index).padStart(2, "0")}
          </span>
        )}

        {eyebrow && (
          <div className="relative z-10 mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 rule-fade" aria-hidden />
            <span className="eyebrow">{eyebrow}</span>
            <span className="h-px w-8 rule-fade" aria-hidden />
          </div>
        )}

        <Link
          href={`#${id}`}
          aria-label={typeof title === "string" ? title : id}
          className="relative z-10"
        >
          <BoxReveal width="100%">
            <h2
              className={cn(
                "text-center text-4xl font-bold tracking-tight md:text-7xl lg:text-8xl",
                "text-gradient"
              )}
            >
              {title}
            </h2>
          </BoxReveal>
        </Link>

        {desc && (
          <p className="relative z-10 mx-auto mt-4 max-w-2xl text-center text-base font-normal leading-relaxed text-muted-foreground">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
};
