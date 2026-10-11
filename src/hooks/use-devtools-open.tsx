import { useEffect, useState } from "react";
import { addListener, launch, stop } from "devtools-detector";

export const useDevToolsOpen = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Su telefoni e tablet non si possono aprire gli strumenti per sviluppatori:
    // inutile far girare il controllo (che lavora a intervalli di mezzo secondo).
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let started = false;
    // Parte dopo qualche secondo, a pagina già caricata, per non rubare tempo
    // al caricamento della scena 3D.
    const timer = window.setTimeout(() => {
      addListener((isOpen) => {
        if (isOpen) {
          setIsDevToolsOpen(true);
          stop();
        }
      });
      launch();
      started = true;
    }, 5000);
    return () => {
      window.clearTimeout(timer);
      if (started) stop();
    };
  }, []);
  return { isDevToolsOpen };
};
