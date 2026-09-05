"use client";

import React from "react";
import { config } from "@/data/config";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import { useToast } from "./ui/use-toast";

/** Playful title shown while the tab is in the background — restored on focus. */
const AWAY_TITLES = [
  "👋 Torna qui!",
  "Il codice non si scrive da solo... 🥲",
  "😳 Non te ne andare",
];

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * The hero tooltip promises "una piccola sorpresa nei devtools" — this is it.
 *
 * A styled console banner is printed once on mount (so it's already waiting
 * whenever the console gets opened), and opening the devtools also pops a
 * one-off toast. Two more tucked in here: the tab title teases you back when
 * you wander off, and the Konami code triggers a confetti reward for anyone
 * who still remembers it.
 */
const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  const { toast } = useToast();
  const greeted = React.useRef(false);
  const toasted = React.useRef(false);

  React.useEffect(() => {
    if (greeted.current) return;
    greeted.current = true;

    const title = [
      "%c",
      "  ██████╗  █████╗ ██████╗ ██╗ ██████╗ ",
      "  ██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗",
      "  ██║  ██║███████║██████╔╝██║██║   ██║",
      "  ██║  ██║██╔══██║██╔══██╗██║██║   ██║",
      "  ██████╔╝██║  ██║██║  ██║██║╚██████╔╝",
      "  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝ ",
      "",
    ].join("\n");

    console.log(title, "font-family:monospace;font-size:12px;line-height:1.1");
    console.log(
      `%c${config.role}%c · ${config.location}`,
      "font-weight:700;font-size:13px",
      "font-size:13px;opacity:.7"
    );
    console.log(
      "%cCurioso di vedere com'è fatto? Il codice è qui 👇",
      "font-size:12px;opacity:.7"
    );
    console.log(`   ${config.social.github}`);
    console.log(
      "%cE se stai leggendo questo, probabilmente dovremmo lavorare insieme. 😉",
      "font-size:12px;opacity:.7"
    );
  }, []);

  React.useEffect(() => {
    if (!isDevToolsOpen || toasted.current) return;
    toasted.current = true;
    toast({
      title: "Beccato! 👀",
      description: "Dai un'occhiata alla console, ti ho lasciato un messaggio.",
      className: "top-0 mx-auto flex fixed md:top-4 md:right-4",
    });
  }, [isDevToolsOpen, toast]);

  // Tease whoever tabs away with a rotating away-title, restore the real one on return.
  React.useEffect(() => {
    const originalTitle = document.title;
    let awayIndex = 0;

    const onVisibilityChange = () => {
      if (document.hidden) {
        document.title = AWAY_TITLES[awayIndex % AWAY_TITLES.length];
        awayIndex++;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.title = originalTitle;
    };
  }, []);

  // Konami code — the classic cheat for the classic developer flex.
  React.useEffect(() => {
    let progress = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      const expected = KONAMI[progress];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === expected ? progress + 1 : key === KONAMI[0] ? 1 : 0;

      if (progress === KONAMI.length) {
        progress = 0;
        import("canvas-confetti").then(({ default: confetti }) => {
          confetti({
            particleCount: 140,
            spread: 100,
            startVelocity: 45,
            colors: ["#61A6FA", "#B877F9", "#ffffff"],
            origin: { y: 0.6 },
          });
        });
        toast({
          title: "Konami Code! 🎮",
          description: "Ok, sei ufficialmente un vero developer. Rispetto.",
          className: "top-0 mx-auto flex fixed md:top-4 md:right-4",
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toast]);

  return null;
};

export default EasterEggs;
