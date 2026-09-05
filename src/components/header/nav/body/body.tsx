import { motion } from "motion/react";
import Link from "next/link";
import styles from "./style.module.scss";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useParams();
  const [currentHref, setCurrentHref] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, hash } = window.location;
    setCurrentHref(pathname + hash);
  }, [params]);

  const getChars = (word: string) => {
    let chars: React.JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {/* A literal " " as the sole content of its own inline box gets
              trimmed away by normal CSS whitespace collapsing — multi-word
              titles ("Chi sono") rendered as "Chisono". nbsp isn't subject
              to that collapsing. */}
          {char === " " ? " " : char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-end md:flex-row")}>
      <FunnyThemeToggle className="mb-2 mr-0 flex h-6 w-6 self-end md:mb-0 md:mr-6 md:hidden" />
      {links.map((link, index) => {
        const { title, href, target } = link;
        const isCurrent = currentHref === href;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            className="group/navlink cursor-can-hover flex w-full items-baseline justify-end gap-3 rounded-lg md:w-auto md:justify-start"
            onMouseOver={() => setSelectedLink({ isActive: true, index })}
            onMouseLeave={() => setSelectedLink({ isActive: false, index })}
          >
            {/* Index number — editorial touch, and doubles as the "current
                page" indicator via the accent color so the plain underline
                the old design relied on isn't the only signal. */}
            <span
              className={cn(
                "font-mono text-xs tabular-nums tracking-wider transition-colors duration-300 md:text-sm",
                isCurrent
                  ? "text-spark"
                  : "text-muted-foreground/50 group-hover/navlink:text-spark"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <motion.p
              className={cn(
                "font-display rounded-lg transition-colors duration-300",
                isCurrent
                  ? "text-foreground"
                  : "text-muted-foreground group-hover/navlink:text-foreground"
              )}
              onClick={() => setIsActive(false)}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
              {isCurrent && (
                <span
                  aria-hidden
                  className="ml-2 inline-block h-2 w-2 rounded-full bg-spark align-middle"
                />
              )}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
