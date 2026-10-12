"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { SKILLS, type Skill } from "@/data/constants";
import { SKILL_KEYS, type SkillNames } from "@/data/skill-keys";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { setKeyboard3DStatus } from "@/hooks/use-keyboard-3d-status";
import { usePreloader } from "./preloader";
import { useSounds } from "./realtime/hooks/use-sounds";
import { KeyCard } from "./keyboard/key-card";
// Solo tipi: il motore (three.js + loghi, circa 170 KB compressi) è un chunk a parte,
// scaricato con l'import dinamico qui sotto solo quando la scena parte davvero.
import type { KeyboardEngine, KeyboardTheme } from "./keyboard/keyboard-engine";
import { Section, getKeyboardState } from "./animated-background-config";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_QUERY = "(max-width: 767px)";
const TAU = Math.PI * 2;

// Da quale punto di scroll comanda ciascuna sezione (stessi start di sempre).
// About ed esperienza non hanno una posa propria: la tastiera resta come l'ha lasciata la sezione prima.
const SECTION_TRIGGERS: { id: Section; start: string }[] = [
  { id: "skills", start: "top 50%" },
  { id: "projects", start: "top 70%" },
  { id: "contact", start: "top 30%" },
];

// Il preloader non resta su meno di così, anche se il motore è pronto subito:
// altrimenti il conteggio lampeggia e sparisce.
const MIN_SPLASH_MS = 1300;
// Dopo la fine del preloader, il tempo di far scorrere via la tendina prima dell'intro dei tasti.
const REVEAL_DELAY = 0.35;
// Quanto resta aperta la scheda dopo un tap (sul touch non c'è un "esci dal tasto").
const TOUCH_HOLD_MS = 2600;
// Respiro prima di chiudere la scheda quando il puntatore passa da un tasto all'altro.
const CARD_CLOSE_MS = 220;

/** Tasti raggiungibili da tastiera fisica: la prima lettera dell'etichetta (premi di nuovo per scorrere i tasti con la stessa iniziale). */
const LETTER_KEYS = SKILL_KEYS.reduce((map, key) => {
  const letter = key.label.charAt(0).toLowerCase();
  map.set(letter, [...(map.get(letter) ?? []), key.id]);
  return map;
}, new Map<string, SkillNames[]>());

// In contatti la tastiera sta dietro titolo, form e card: più tenue, per lasciare leggere il testo.
const SECTION_OPACITY: Partial<Record<Section, number>> = { contact: 0.55 };

const isInputFocused = () => {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
};

/**
 * Coreografia della tastiera: posa per sezione legata allo scroll, rotazione continua in hero,
 * ondeggio e float in contatti, cambio breakpoint e resize. Lavora solo sulla `pose` del motore
 * (che GSAP anima direttamente) e su setExcited/setMobile. `onSkillsToggle` dice quando la
 * pagina è davvero nella sezione competenze (l'unica in cui la scheda con nome e descrizione si mostra).
 */
function runChoreography(engine: KeyboardEngine, host: HTMLElement, onSkillsToggle: (active: boolean) => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  let isMobile = mq.matches;
  let section: Section = "hero";
  // Rotazione e float partono a intro finita: prima i tasti stanno ancora cadendo.
  let intro = false;
  let ambient: gsap.core.Animation | null = null;
  let floatCall: gsap.core.Tween | null = null;
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  const { pose } = engine;

  /** Porta la tastiera sulla posa della sezione. `rotation: false` lascia stare la rotazione (resize). */
  const applyPose = (
    target: Section,
    { immediate = false, duration = 1, rotation = true }: { immediate?: boolean; duration?: number; rotation?: boolean } = {},
  ) => {
    const state = getKeyboardState({ section: target, isMobile });
    if (immediate) {
      gsap.killTweensOf([pose, pose.position, pose.rotation]);
      pose.scale = state.scale.x;
      gsap.set(pose.position, state.position);
      if (rotation) gsap.set(pose.rotation, state.rotation);
      return;
    }
    // overwrite "auto": una posa nuova toglie solo le proprietà che si sovrappongono a quelle ancora in corso.
    gsap.to(pose, { scale: state.scale.x, duration, overwrite: "auto" });
    gsap.to(pose.position, { ...state.position, duration, overwrite: "auto" });
    if (rotation) {
      // Dopo qualche giro in hero la y è lontana da quella di destinazione: si torna per la via più corta.
      const y = state.rotation.y + Math.round((pose.rotation.y - state.rotation.y) / TAU) * TAU;
      gsap.to(pose.rotation, { ...state.rotation, y, duration, overwrite: "auto" });
    }
  };

  const stopAmbient = () => {
    ambient?.kill();
    ambient = null;
    floatCall?.kill();
    floatCall = null;
  };

  const startAmbient = (target: Section, now = false) => {
    stopAmbient();
    if (!intro) return;

    if (target === "hero") {
      // Un giro completo e ritorno, lento e con un po' di rimbalzo (come prima).
      ambient = gsap.to(pose.rotation, {
        y: `+=${TAU}`,
        duration: 10,
        ease: "back.inOut",
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        overwrite: "auto",
      });
    } else if (target === "contact") {
      // Niente capovolgimento (mostrerebbe il fondo della scheda): la tastiera sta dritta,
      // ondeggia piano da una parte all'altra e i tasti galleggiano.
      const base = getKeyboardState({ section: "contact", isMobile }).rotation.y;
      const sway = 0.5;
      ambient = gsap
        .timeline({ delay: now ? 0 : 1.05 })
        .to(pose.rotation, { y: base - sway, duration: 1.4, ease: "sine.inOut", overwrite: "auto" })
        .to(pose.rotation, { y: base + sway, duration: 5.5, ease: "sine.inOut", repeat: -1, yoyo: true });
    }

    // Il float parte (o si ferma) un attimo dopo l'arrivo nella sezione, per non sovrapporsi allo spostamento.
    floatCall = gsap.delayedCall(now ? 0 : 0.6, () => engine.setExcited(target === "contact"));
  };

  /** L'indirizzo segue la sezione: replaceState, così la cronologia non si riempie di una voce per sezione. */
  const syncHash = (target: Section) => {
    const hash = target === "hero" ? "" : `#${target}`;
    if (window.location.hash === hash) return;
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search + hash);
  };

  const setSection = (next: Section) => {
    if (next === section) return;
    section = next;
    host.style.opacity = String(SECTION_OPACITY[next] ?? 1);
    syncHash(next);
    applyPose(next);
    startAmbient(next);
  };

  // I punti di cambio sezione. Tutti i passaggi richiamano lo stesso calcolo: con un salto di scroll
  // che scavalca più sezioni l'ordine dei callback non conta, vince la sezione in cui si è davvero.
  const entries = SECTION_TRIGGERS.filter(({ id }) => document.getElementById(id));
  let armed = false;
  const sync = () => {
    if (armed) setSection(sectionAtScroll());
  };
  const triggers = entries.map(({ id, start }) =>
    ScrollTrigger.create({
      trigger: `#${id}`,
      start,
      end: "bottom bottom",
      onEnter: sync,
      onEnterBack: sync,
      onLeave: sync,
      onLeaveBack: sync,
      onRefresh: sync,
    }),
  );

  /** Sezione "in carica" allo scroll attuale: l'ultima il cui start è stato superato. */
  function sectionAtScroll(): Section {
    let current: Section = "hero";
    triggers.forEach((trigger, i) => {
      if (trigger.scroll() >= trigger.start) current = entries[i].id;
    });
    return current;
  }

  // La sezione competenze "vera": dal suo inizio (stesso punto della posa) fino a metà schermo sul suo fondo.
  // Esperienza non ha una posa propria, quindi la tastiera ci resta dietro in posa skills, ma la scheda no.
  const skillsTrigger = document.getElementById("skills")
    ? ScrollTrigger.create({
        trigger: "#skills",
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => onSkillsToggle(self.isActive),
        onRefresh: (self) => onSkillsToggle(self.isActive),
      })
    : null;
  onSkillsToggle(skillsTrigger?.isActive ?? false);

  // Posa iniziale (anche se la pagina si apre a metà): subito, senza tween e senza toccare l'indirizzo.
  section = sectionAtScroll();
  host.style.opacity = String(SECTION_OPACITY[section] ?? 1);
  applyPose(section, { immediate: true });
  armed = true;

  const onBreakpoint = (e: MediaQueryListEvent) => {
    isMobile = e.matches;
    engine.setMobile(isMobile);
    applyPose(section, { duration: 1.2 });
    startAmbient(section, true);
  };
  mq.addEventListener("change", onBreakpoint);

  // La scala dipende dalla larghezza della finestra: dopo un resize si riallinea la posa.
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => applyPose(section, { duration: 0.3, rotation: false }), 80);
  };
  window.addEventListener("resize", onResize, { passive: true });

  return {
    /** Da chiamare quando l'intro dei tasti è finita. */
    onRevealed() {
      intro = true;
      startAmbient(section, true);
    },
    dispose() {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onBreakpoint);
      stopAmbient();
      triggers.forEach((trigger) => trigger.kill());
      skillsTrigger?.kill();
      gsap.killTweensOf([pose, pose.position, pose.rotation]);
    },
  };
}

const KeyboardScene = ({ maxDpr }: { maxDpr: number }) => {
  const { isLoading, bypassLoading } = usePreloader();
  const { resolvedTheme } = useTheme();
  const theme: KeyboardTheme = resolvedTheme === "light" ? "light" : "dark";
  const { playPressSound, playReleaseSound } = useSounds();

  const hostRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<KeyboardEngine | null>(null);
  const revealRef = useRef<(() => void) | null>(null);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  // Ultimo tasto mostrato: resta nella scheda mentre si dissolve.
  const [cardSkill, setCardSkill] = useState<Skill | null>(null);

  // I valori che il motore (creato una volta sola) deve poter leggere aggiornati.
  const live = useRef({ theme, maxDpr, isLoading, bypassLoading, playPressSound, playReleaseSound });
  live.current = { theme, maxDpr, isLoading, bypassLoading, playPressSound, playReleaseSound };

  /** Mette la scheda sotto la tastiera, centrata sui suoi tasti, e dentro lo schermo. */
  const placeCard = () => {
    const engine = engineRef.current;
    const card = cardRef.current;
    if (!engine || !card) return;
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const { id } of SKILL_KEYS) {
      const p = engine.getKeyScreenPosition(id);
      if (!p) continue;
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
    if (!Number.isFinite(minX)) return;
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const gap = Math.min(Math.max(engine.getBounds().height * 0.19, 28), 100);
    const x = Math.min(Math.max((minX + maxX) / 2, width / 2 + 12), window.innerWidth - width / 2 - 12);
    const y = Math.min(maxY + gap, window.innerHeight - height - 16);
    card.style.transform = `translate(${Math.round(x - width / 2)}px, ${Math.round(y)}px)`;
  };
  const placeCardRef = useRef(placeCard);
  placeCardRef.current = placeCard;

  // La scheda segue la tastiera finché è aperta (la posa può muoversi, il layout cambiare).
  useEffect(() => {
    placeCardRef.current();
    if (!selectedSkill) return;
    const timer = setInterval(() => placeCardRef.current(), 120);
    return () => clearInterval(timer);
  }, [selectedSkill, cardSkill]);

  // Tema, pixel ratio e fine del preloader arrivano al motore già creato.
  useEffect(() => {
    engineRef.current?.setTheme(theme);
  }, [theme]);
  useEffect(() => {
    engineRef.current?.setMaxDpr(maxDpr);
  }, [maxDpr]);
  useEffect(() => {
    if (!isLoading) revealRef.current?.();
  }, [isLoading]);

  // Ciclo di vita del motore: un canvas e un motore per ogni montaggio (StrictMode e
  // Fast Refresh compresi), tutto smontato per intero a cleanup.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let teardown: (() => void) | null = null;

    setKeyboard3DStatus("loading");

    const fail = (reason?: unknown) => {
      if (cancelled) return;
      if (reason) console.warn("Tastiera 3D non disponibile, resta la versione 2D.", reason);
      setKeyboard3DStatus("failed");
      live.current.bypassLoading();
    };

    import("./keyboard/keyboard-engine")
      .then(({ KeyboardEngine }) => {
        if (cancelled) return;
        if (!KeyboardEngine.isWebGLAvailable()) return fail();

        // Il canvas lo creo qui, non in JSX: ogni motore ha il suo e dispose(true) può rilasciare il contesto GL.
        const canvas = document.createElement("canvas");
        canvas.setAttribute("aria-hidden", "true");
        canvas.className = "block h-full w-full";
        host.appendChild(canvas);

        let engine: KeyboardEngine | null = null;
        const timers = new Set<ReturnType<typeof setTimeout>>();
        let choreography: ReturnType<typeof runChoreography> | null = null;
        let revealCall: gsap.core.Tween | null = null;
        let selectedId: SkillNames | null = null;
        // Il tasto si preme e suona sempre; nome e descrizione compaiono solo nella sezione competenze.
        let inSkills = false;
        let heldCode: string | null = null;
        let lastPointer = "mouse";
        const letterCycle = new Map<string, number>();

        const after = (ms: number, fn: () => void) => {
          const t = setTimeout(() => {
            timers.delete(t);
            fn();
          }, ms);
          timers.add(t);
          return t;
        };
        let closeTimer: ReturnType<typeof setTimeout> | undefined;
        let touchTimer: ReturnType<typeof setTimeout> | undefined;
        const cancel = (t: ReturnType<typeof setTimeout> | undefined) => {
          if (t === undefined) return;
          clearTimeout(t);
          timers.delete(t);
        };

        // --- Selezione: stessa logica sonora di prima (suono al cambio di tasto, release in uscita) ---

        const clearSelection = (withSound: boolean) => {
          cancel(touchTimer);
          if (selectedId === null) return;
          selectedId = null;
          if (withSound) live.current.playReleaseSound();
          cancel(closeTimer);
          closeTimer = after(CARD_CLOSE_MS, () => setSelectedSkill(null));
        };

        const select = (id: SkillNames | null) => {
          if (id === selectedId) return;
          if (id === null) return clearSelection(true);
          if (selectedId !== null) live.current.playReleaseSound();
          live.current.playPressSound();
          selectedId = id;
          cancel(closeTimer);
          if (!inSkills) return;
          const skill = SKILLS[id];
          setCardSkill(skill);
          setSelectedSkill(skill);
        };

        /** Entrando in competenze con un tasto già sotto il puntatore la scheda si apre; uscendo si chiude. */
        const setInSkills = (active: boolean) => {
          if (active === inSkills) return;
          inSkills = active;
          cancel(closeTimer);
          if (!active || selectedId === null) return setSelectedSkill(null);
          const skill = SKILLS[selectedId];
          setCardSkill(skill);
          setSelectedSkill(skill);
        };

        const onPointerType = (e: PointerEvent) => {
          lastPointer = e.pointerType;
        };
        window.addEventListener("pointerdown", onPointerType, { capture: true, passive: true });
        window.addEventListener("pointermove", onPointerType, { capture: true, passive: true });

        // Il tasto fisico "evoca" il tasto della tastiera 3D con la stessa iniziale.
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1 || document.hidden || isInputFocused()) return;
          // Con una finestra aperta (galleria, menu) i tasti servono a lei, non alla tastiera sullo sfondo.
          if (document.querySelector('[role="dialog"]')) return;
          const letter = e.key.toLowerCase();
          const ids = LETTER_KEYS.get(letter);
          if (!ids || !engine) return;
          const step = ((letterCycle.get(letter) ?? -1) + 1) % ids.length;
          letterCycle.set(letter, step);
          heldCode = e.code;
          cancel(touchTimer);
          void engine.pressKey(ids[step], 220);
          select(ids[step]);
        };
        const onKeyUp = (e: KeyboardEvent) => {
          if (heldCode === null || e.code !== heldCode) return;
          heldCode = null;
          clearSelection(true);
        };
        // Se la finestra perde il focus a tasto premuto il keyup non arriva: si lascia andare il tasto.
        const onBlur = () => {
          if (heldCode === null) return;
          heldCode = null;
          clearSelection(false);
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("blur", onBlur);

        let splashCall: ReturnType<typeof setTimeout> | undefined;

        const dispose = () => {
          window.removeEventListener("pointerdown", onPointerType, { capture: true });
          window.removeEventListener("pointermove", onPointerType, { capture: true });
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("keyup", onKeyUp);
          window.removeEventListener("blur", onBlur);
          timers.forEach((t) => clearTimeout(t));
          timers.clear();
          clearTimeout(splashCall);
          revealCall?.kill();
          revealRef.current = null;
          engineRef.current = null;
          choreography?.dispose();
          host.style.opacity = "";
          if (engine) {
            engine.onHover = null;
            engine.onPress = null;
            engine.dispose(true);
          }
          canvas.remove();
        };

        try {
          engine = new KeyboardEngine({
            canvas,
            theme: live.current.theme,
            mobile: window.matchMedia(MOBILE_QUERY).matches,
            maxDpr: live.current.maxDpr,
          });
          engineRef.current = engine;
          const kb = engine;

          kb.onHover = (id) => {
            // Sul touch l'hover scatta anche all'inizio di uno scroll: conta solo il tap (onPress).
            if (lastPointer === "touch") return;
            select(id);
          };
          kb.onPress = (id, down) => {
            if (!down) return;
            select(id);
            if (lastPointer === "touch") {
              cancel(touchTimer);
              touchTimer = after(TOUCH_HOLD_MS, () => clearSelection(true));
            }
          };

          choreography = runChoreography(kb, host, setInSkills);

          // Intro: appena il preloader è finito (se lo è già, subito).
          let revealStarted = false;
          revealRef.current = () => {
            if (revealStarted || live.current.isLoading) return;
            revealStarted = true;
            revealCall = gsap.delayedCall(REVEAL_DELAY, () => {
              void kb.reveal().then(() => {
                if (!cancelled) choreography?.onRevealed();
              });
            });
          };
          revealRef.current();

          setKeyboard3DStatus("ready");
          // La tendina del preloader serviva a coprire il caricamento della scena: ora che c'è, via.
          splashCall = setTimeout(() => live.current.bypassLoading(), Math.max(0, MIN_SPLASH_MS - performance.now()));
        } catch (error) {
          dispose();
          return fail(error);
        }

        teardown = dispose;
      })
      .catch(fail);

    return () => {
      cancelled = true;
      teardown?.();
      teardown = null;
      setKeyboard3DStatus("loading");
    };
  }, []);

  return (
    <>
      <div ref={hostRef} className="w-full h-[100dvh] fixed inset-0 transition-opacity duration-700" />
      <KeyCard skill={cardSkill} open={selectedSkill !== null} cardRef={cardRef} />
    </>
  );
};

/**
 * Gate della scena WebGL su rilevamento dispositivo e preferenze.
 *
 * Il gate sta qui nel genitore (non dentro KeyboardScene) apposta: quando il 3D viene
 * disabilitato (es. si attiva la riduzione del movimento) KeyboardScene si SMONTA per
 * intero: motore, tween GSAP, ScrollTrigger e canvas spariscono, e riattivando riparte
 * da zero. Aspettare `ready` evita anche di scaricare il chunk del motore prima che
 * il rilevamento sia avvenuto; il Preloader salta la tendina quando il 3D è disabilitato.
 */
const AnimatedBackground = () => {
  const { disable3D, maxDpr, ready } = usePerfProfile();
  if (!ready || disable3D) return null;
  return <KeyboardScene maxDpr={maxDpr} />;
};

export default AnimatedBackground;
