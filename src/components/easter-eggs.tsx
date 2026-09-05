"use client";

import React from "react";
import { config } from "@/data/config";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import { useToast } from "./ui/use-toast";

/**
 * The hero tooltip promises "una piccola sorpresa nei devtools" — this is it.
 *
 * A styled console banner is printed once on mount (so it's already waiting
 * whenever the console gets opened), and opening the devtools also pops a
 * one-off toast.
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

  return null;
};

export default EasterEggs;
