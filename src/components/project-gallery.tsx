"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Monitor, Smartphone, X } from "lucide-react";

import { galleries, type Gallery, type GalleryShot, type GalleryView } from "@/data/galleries";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Index of the slide whose left edge sits closest to the rail's snap line. */
function nearestSlide(el: HTMLElement, left = el.scrollLeft) {
    const slides = Array.from(el.children) as HTMLElement[];
    if (!slides.length) return 0;
    if (left >= el.scrollWidth - el.clientWidth - 2) return slides.length - 1;
    const line = left + parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - line);
        if (d < bestDist) {
            bestDist = d;
            best = i;
        }
    });
    return best;
}

function slideLeft(el: HTMLElement, i: number) {
    const slide = el.children[i] as HTMLElement | undefined;
    if (!slide) return el.scrollLeft;
    return slide.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
}

/** Image that fades in once decoded, over a quiet placeholder of the right size. */
const FadeImage = ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const ref = useRef<HTMLImageElement>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
    }, []);
    return (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
            ref={ref}
            draggable={false}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={cn(
                "select-none transition-opacity duration-500 ease-smooth",
                loaded ? "opacity-100" : "opacity-0",
                className
            )}
            {...props}
        />
    );
};

/** The chrome around a screenshot: browser window, app window or phone. */
const Frame = ({
    gallery,
    view,
    shot,
    children,
}: {
    gallery: Gallery;
    view: GalleryView;
    shot: GalleryShot;
    children: React.ReactNode;
}) => {
    const ratio = { aspectRatio: `${shot.w} / ${shot.h}` };

    if (view === "mobile") {
        return (
            <div className="rounded-[1.6rem] border border-border bg-[#0a0b0e] p-[5px] shadow-elevated transition-shadow duration-300 group-hover:shadow-float">
                <div className="relative overflow-hidden rounded-[1.3rem] bg-muted" style={ratio}>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elevated transition-shadow duration-300 group-hover:shadow-float">
            <div className="flex h-7 items-center gap-1.5 border-b border-border bg-muted px-3">
                {[0, 1, 2].map((i) => (
                    <span key={i} aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-muted-foreground/30" />
                ))}
                {gallery.kind === "web" ? (
                    <span className="mx-auto max-w-[70%] truncate rounded-md bg-background px-2.5 py-0.5 text-[10px] leading-4 text-muted-foreground">
                        {gallery.host}
                        {shot.path && shot.path !== "/" ? shot.path : ""}
                    </span>
                ) : (
                    <span className="mx-auto truncate text-[10px] font-medium text-muted-foreground">
                        {gallery.title}
                    </span>
                )}
                {/* Balances the three dots so the address stays centred. */}
                <span aria-hidden className="w-[30px] shrink-0" />
            </div>
            <div className="relative bg-muted" style={ratio}>
                {children}
            </div>
        </div>
    );
};

/**
 * Horizontal gallery of a project's screens, shown at the top of its modal.
 * Scrolls natively (swipe, trackpad, shift+wheel), drags with the mouse, and
 * opens any screen full-screen at full resolution.
 */
export function ProjectGallery({ projectId, title }: { projectId: string; title: string }) {
    const gallery = galleries[projectId];
    const views = (["desktop", "mobile"] as const).filter((v) => gallery?.views[v]?.length);
    const [view, setView] = useState<GalleryView>(views[0] ?? "desktop");
    const [active, setActive] = useState(0);
    const [viewer, setViewer] = useState<number | null>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const frame = useRef(0);

    const shots = gallery?.views[view] ?? [];

    const onScroll = useCallback(() => {
        if (frame.current) return;
        frame.current = requestAnimationFrame(() => {
            frame.current = 0;
            if (railRef.current) setActive(nearestSlide(railRef.current));
        });
    }, []);

    const goTo = useCallback((i: number) => {
        const el = railRef.current;
        if (!el) return;
        const n = el.children.length;
        const target = Math.max(0, Math.min(n - 1, i));
        el.scrollTo({ left: slideLeft(el, target), behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }, []);

    // Switching desktop/phone starts the new set from the first screen.
    const switchView = (v: GalleryView) => {
        setView(v);
        setActive(0);
    };
    useEffect(() => {
        railRef.current?.scrollTo({ left: 0 });
    }, [view]);

    // Mouse drag. Touch and trackpads scroll natively; only a mouse needs help.
    const drag = useRef({ on: false, moved: false, x: 0, left: 0, lastX: 0, lastT: 0, v: 0 });
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse" || e.button !== 0 || !railRef.current) return;
        drag.current = { on: true, moved: false, x: e.clientX, left: railRef.current.scrollLeft, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
    };
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        const el = railRef.current;
        if (!d.on || !el) return;
        const dx = e.clientX - d.x;
        if (!d.moved) {
            if (Math.abs(dx) < 6) return;
            d.moved = true;
            el.setPointerCapture(e.pointerId);
            el.style.scrollSnapType = "none";
            el.style.cursor = "grabbing";
        }
        const dt = e.timeStamp - d.lastT;
        if (dt > 0) d.v = (e.clientX - d.lastX) / dt;
        d.lastX = e.clientX;
        d.lastT = e.timeStamp;
        el.scrollLeft = d.left - dx;
    };
    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        const el = railRef.current;
        if (!d.on || !el) return;
        d.on = false;
        if (!d.moved) return;
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        el.style.cursor = "";
        // A quick flick moves one screen on even if the drag itself was short.
        let target = nearestSlide(el);
        if (Math.abs(d.v) > 0.4) {
            const from = nearestSlide(el, d.left);
            target = d.v < 0 ? from + 1 : from - 1;
        }
        const left = slideLeft(el, Math.max(0, Math.min(el.children.length - 1, target)));
        el.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
        window.setTimeout(() => (el.style.scrollSnapType = ""), 450);
    };
    // A drag must not also count as a click on the screen under the mouse.
    const onClickCapture = (e: React.MouseEvent) => {
        if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(active + 1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(active - 1);
        }
    };

    // Closing the viewer leaves the rail, and the focus, on the screen that was being looked at.
    const closeViewer = (last: number) => {
        setViewer(null);
        const el = railRef.current;
        if (!el) return;
        el.scrollTo({ left: slideLeft(el, last) });
        el.children[last]?.querySelector("button")?.focus({ preventScroll: true });
    };

    if (!gallery || !shots.length) return null;

    const phone = view === "mobile";

    return (
        <section aria-label={`Galleria di ${title}`} className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-3">
                    <span className="eyebrow">Galleria</span>
                    <span className="text-xs tabular-nums text-muted-foreground" aria-live="polite">
                        {pad(active + 1)} / {pad(shots.length)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {views.length > 1 && (
                        <div role="radiogroup" aria-label="Versione" className="flex rounded-full border border-border p-0.5">
                            {views.map((v) => (
                                <button
                                    key={v}
                                    type="button"
                                    role="radio"
                                    aria-checked={view === v}
                                    onClick={() => switchView(v)}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-200",
                                        view === v
                                            ? "bg-foreground text-background"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {v === "desktop" ? <Monitor className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />}
                                    {v === "desktop" ? "Desktop" : "Telefono"}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="hidden items-center gap-1.5 md:flex">
                        <RoundButton label="Schermata precedente" disabled={active === 0} onClick={() => goTo(active - 1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </RoundButton>
                        <RoundButton label="Schermata successiva" disabled={active >= shots.length - 1} onClick={() => goTo(active + 1)}>
                            <ChevronRight className="h-4 w-4" />
                        </RoundButton>
                    </div>
                </div>
            </div>

            <div
                ref={railRef}
                role="group"
                aria-roledescription="carosello"
                aria-label={`Schermate di ${title}, scorri in orizzontale`}
                tabIndex={0}
                onScroll={onScroll}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onClickCapture={onClickCapture}
                className={cn(
                    "scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 pt-1 md:-mx-8 md:cursor-grab md:gap-5 md:px-8",
                    "[scroll-padding-inline:1rem] md:[scroll-padding-inline:2rem]",
                    "rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                )}
                style={{ "--rail-h": phone ? "clamp(300px, 52vh, 440px)" : "330px" } as React.CSSProperties}
            >
                {shots.map((shot, i) => (
                    <figure
                        key={shot.rail}
                        role="group"
                        aria-roledescription="schermata"
                        aria-label={`${i + 1} di ${shots.length}: ${shot.label}`}
                        className="m-0 shrink-0 snap-start"
                        style={{
                            width: phone
                                ? `calc(var(--rail-h) * ${(shot.w / shot.h).toFixed(4)} + 10px)`
                                : `min(calc(var(--rail-h) * ${(shot.w / shot.h).toFixed(4)}), 76vw)`,
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setViewer(i)}
                            aria-label={`Apri "${shot.label}" a schermo intero`}
                            className="group block w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            <Frame gallery={gallery} view={view} shot={shot}>
                                <FadeImage
                                    src={shot.rail}
                                    srcSet={`${shot.rail} ${shot.railW}w, ${shot.full} ${shot.w}w`}
                                    sizes={phone ? "(min-width: 768px) 210px, 45vw" : "(min-width: 768px) 520px, 76vw"}
                                    alt={`${title}: ${shot.label}`}
                                    loading={i < 2 ? "eager" : "lazy"}
                                    className="absolute inset-0 h-full w-full object-cover object-top"
                                />
                            </Frame>
                        </button>
                        <figcaption className="mt-2.5 flex items-baseline gap-2 px-0.5 text-xs leading-snug">
                            <span className="tabular-nums text-muted-foreground">{pad(i + 1)}</span>
                            <span className="font-medium text-foreground">{shot.label}</span>
                        </figcaption>
                    </figure>
                ))}
            </div>

            {/* One segment per screen: shows where you are and jumps on click. */}
            <div className="flex items-center gap-1" aria-hidden>
                {shots.map((shot, i) => (
                    <button
                        key={shot.rail}
                        type="button"
                        tabIndex={-1}
                        onClick={() => goTo(i)}
                        className="group flex h-3 flex-1 items-center"
                    >
                        <span
                            className={cn(
                                "h-[3px] w-full rounded-full transition-colors duration-300",
                                i === active ? "accent-gradient" : "bg-muted-foreground/20 group-hover:bg-muted-foreground/40"
                            )}
                        />
                    </button>
                ))}
            </div>

            <Viewer
                title={title}
                shots={shots}
                phone={phone}
                index={viewer}
                onClose={closeViewer}
            />
        </section>
    );
}

const RoundButton = ({
    label,
    disabled,
    onClick,
    children,
}: {
    label: string;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) => (
    <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-foreground/25 hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
    >
        {children}
    </button>
);

/**
 * Full-screen viewer. A nested Radix dialog, so it layers over the project
 * modal (or the phone drawer) without closing it, and Esc closes only this.
 */
function Viewer({
    title,
    shots,
    phone,
    index,
    onClose,
}: {
    title: string;
    shots: GalleryShot[];
    phone: boolean;
    index: number | null;
    onClose: (last: number) => void;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(index ?? 0);
    const open = index !== null;

    // Opening on another screen restarts from it (state adjusted during render,
    // not in an effect, so there is no extra render with the old screen).
    const [openedAt, setOpenedAt] = useState(index);
    if (index !== openedAt) {
        setOpenedAt(index);
        if (index !== null) setCurrent(index);
    }

    useLayoutEffect(() => {
        if (index === null) return;
        // The track mounts with the dialog: jump straight to the chosen screen.
        const id = requestAnimationFrame(() => {
            const el = trackRef.current;
            if (el) el.scrollLeft = index * el.clientWidth;
        });
        return () => cancelAnimationFrame(id);
    }, [index]);

    const go = (i: number) => {
        const el = trackRef.current;
        if (!el) return;
        const t = Math.max(0, Math.min(shots.length - 1, i));
        el.scrollTo({ left: t * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };

    const onScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        const i = Math.round(el.scrollLeft / el.clientWidth);
        if (i !== current) setCurrent(i);
    };

    // Keep the active thumbnail in view.
    useEffect(() => {
        const t = thumbsRef.current?.children[current] as HTMLElement | undefined;
        t?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }, [current]);

    const shot = shots[current];

    return (
        <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose(current)}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content
                    data-lenis-prevent
                    data-vaul-no-drag
                    aria-describedby={undefined}
                    // Focus goes back to the screen we were on (closeViewer), not to the first one.
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowRight") {
                            e.preventDefault();
                            go(current + 1);
                        } else if (e.key === "ArrowLeft") {
                            e.preventDefault();
                            go(current - 1);
                        }
                    }}
                    className="fixed inset-0 z-[1100] flex flex-col text-white outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]"
                >
                    <DialogPrimitive.Title className="sr-only">
                        {title}: {shot?.label}
                    </DialogPrimitive.Title>

                    <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
                        <div className="flex min-w-0 items-baseline gap-3">
                            <span className="text-xs tabular-nums text-white/55">
                                {pad(current + 1)} / {pad(shots.length)}
                            </span>
                            <span className="truncate text-sm font-medium">{shot?.label}</span>
                            <span className="hidden truncate text-xs text-white/45 sm:inline">{title}</span>
                        </div>
                        <DialogPrimitive.Close
                            aria-label="Chiudi"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                        >
                            <X className="h-4 w-4" />
                        </DialogPrimitive.Close>
                    </div>

                    <div className="relative min-h-0 flex-1">
                        <div
                            ref={trackRef}
                            onScroll={onScroll}
                            className="scrollbar-none flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain"
                        >
                            {shots.map((s, i) => (
                                <div
                                    key={s.full}
                                    className="flex h-full w-full shrink-0 snap-center items-center justify-center px-3 md:px-20"
                                >
                                    <FadeImage
                                        src={s.full}
                                        srcSet={`${s.rail} ${s.railW}w, ${s.full} ${s.w}w`}
                                        sizes={phone ? "(min-width: 768px) 40vh, 90vw" : "100vw"}
                                        alt={`${title}: ${s.label}`}
                                        loading={Math.abs(i - (index ?? 0)) <= 1 ? "eager" : "lazy"}
                                        className={cn(
                                            "max-h-full max-w-full object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]",
                                            phone ? "rounded-[1.4rem]" : "rounded-lg"
                                        )}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            aria-label="Schermata precedente"
                            onClick={() => go(current - 1)}
                            disabled={current === 0}
                            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur transition hover:border-white/35 hover:text-white disabled:opacity-0 md:flex"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Schermata successiva"
                            onClick={() => go(current + 1)}
                            disabled={current >= shots.length - 1}
                            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur transition hover:border-white/35 hover:text-white disabled:opacity-0 md:flex"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div
                        ref={thumbsRef}
                        className="scrollbar-none flex shrink-0 justify-start gap-2 overflow-x-auto px-4 py-3 md:justify-center md:px-6 md:py-4"
                    >
                        {shots.map((s, i) => (
                            <button
                                key={s.rail}
                                type="button"
                                aria-label={`Vai a "${s.label}"`}
                                aria-current={i === current}
                                onClick={() => go(i)}
                                className={cn(
                                    "shrink-0 overflow-hidden rounded-md border transition-all duration-300",
                                    i === current ? "border-white/80 opacity-100" : "border-white/10 opacity-45 hover:opacity-80"
                                )}
                                style={{ height: phone ? 64 : 44, aspectRatio: `${s.w} / ${s.h}` }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={s.rail} alt="" draggable={false} className="h-full w-full object-cover object-top" />
                            </button>
                        ))}
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
