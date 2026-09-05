"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowDown, FileText, MapPin } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { config } from "@/data/config";
import { SKILLS } from "@/data/constants";
import RotatingText from "../ui/rotating-text";

import SectionWrapper from "../ui/section-wrapper";

const SOCIALS = [
    { href: config.social.github, label: "GitHub", Icon: SiGithub },
    { href: config.social.linkedin, label: "LinkedIn", Icon: SiLinkedin },
    { href: config.social.instagram, label: "Instagram", Icon: SiInstagram },
].filter((s) => Boolean(s.href));

const TICKER_ITEMS = Object.values(SKILLS)
    .slice(0, 12)
    .map((s) => s.label);

const HeroSection = () => {
    const { isLoading } = usePreloader();
    const [firstName, ...rest] = config.author.split(" ");

    return (
        <SectionWrapper id="hero" className={cn("relative w-full h-screen overflow-hidden grain")}>
            {/* Two soft color blobs — the only "loud" color on an otherwise
                monochrome page, so they're placed once, big, and blurred
                rather than sprinkled as flat accent dots everywhere. */}
            <span
                aria-hidden
                className="glow-orb -left-40 top-0 h-[28rem] w-[28rem] bg-spark/25 dark:bg-spark/20"
            />
            <span
                aria-hidden
                className="glow-orb right-0 top-1/3 h-[26rem] w-[26rem] bg-spark-2/20 dark:bg-spark-2/25"
            />

            <div className="grid md:grid-cols-2">
                <div
                    className={cn(
                        // `relative` is load-bearing: z-[2] does nothing on a
                        // static element, and without it the fixed 3D canvas
                        // (painted after this in a separate stacking pass)
                        // covers the CTAs/social row on shorter viewports.
                        "relative h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
                        "col-span-1",
                        "flex flex-col justify-start md:justify-center items-start",
                        "px-6 pt-24 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
                    )}
                >
                    {!isLoading && (
                        <div className="flex flex-col">
                            {/* Status pill — the first thing a client looks for. */}
                            {config.available && (
                                <BlurIn delay={0.55}>
                                    <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-background/60 px-3.5 py-1.5 backdrop-blur-md">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-spark" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-spark" />
                                        </span>
                                        <span className="text-xs font-medium tracking-wide text-foreground/80">
                                            {config.availabilityLabel}
                                        </span>
                                    </div>
                                </BlurIn>
                            )}

                            <div>
                                <BlurIn delay={0.7}>
                                    <p
                                        className={cn(
                                            "font-medium text-md text-muted-foreground",
                                            "cursor-default sm:text-xl md:text-xl whitespace-nowrap"
                                        )}
                                    >
                                        Ciao, sono
                                    </p>
                                </BlurIn>

                                <BlurIn delay={0.9}>
                                    <Tooltip delayDuration={300}>
                                        <TooltipTrigger asChild>
                                            <h1
                                                className={cn(
                                                    "-ml-[6px] leading-[0.85] text-left",
                                                    "font-bold cursor-default font-display"
                                                )}
                                                // Fluid clamp() instead of Tailwind breakpoint
                                                // classes: this build wasn't generating CSS for
                                                // arbitrary text-size utilities (text-[3.4rem]
                                                // rendered as the browser default, 16px) — an
                                                // inline style sidesteps that generation step
                                                // entirely and scales smoothly besides.
                                                style={{ fontSize: "clamp(3.4rem, 3rem + 4vw, 7.5rem)" }}
                                            >
                                                <span className="text-foreground">{firstName}</span>
                                                <br />
                                                <span className="text-accent-gradient">
                                                    {rest.join(" ")}
                                                </span>
                                            </h1>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            c&apos;è una piccola sorpresa per te nei devtools
                                        </TooltipContent>
                                    </Tooltip>
                                </BlurIn>

                                {/* On mobile the keyboard's world-space position lands
                                    right behind this text (same reason the CTA row below
                                    gets a glass backdrop) — a subtle scrim keeps the
                                    rotating role + tagline readable over the keycaps.
                                    md+ drops it: the keyboard sits in the right column
                                    there, clear of this text. */}
                                <div className="-mx-3 mt-5 rounded-2xl bg-background/55 p-3 backdrop-blur-md md:mx-0 md:mt-0 md:rounded-none md:bg-transparent md:p-0 md:backdrop-blur-none">
                                    <BlurIn delay={1.1}>
                                        <p
                                            className={cn(
                                                "flex items-baseline gap-2 font-medium text-md text-muted-foreground",
                                                "cursor-default sm:text-xl md:text-xl"
                                            )}
                                        >
                                            <span
                                                aria-hidden
                                                className="inline-block h-4 w-1 shrink-0 rounded-full accent-gradient"
                                            />
                                            <RotatingText items={config.roles} />
                                        </p>
                                    </BlurIn>

                                    <BlurIn delay={1.25}>
                                        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                                            {config.tagline}
                                        </p>
                                    </BlurIn>
                                </div>
                            </div>

                            <BlurIn delay={1.4}>
                                {/* On mobile the 3D keyboard's world-space position lands
                                    right behind this row — a glass backdrop keeps the CTAs
                                    and social icons legible regardless of where the scene
                                    puts it, instead of chasing exact 3D coordinates.
                                    md+ drops the backdrop: the keyboard sits in the right
                                    column there, clear of this content. */}
                                <div className="mt-8 flex flex-col gap-5 rounded-2xl surface p-4 md:mt-8 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
                                    {/* `size="lg"` only from md up — three lg
                                        buttons wrap to three rows on a 375px
                                        phone and push the hero past the fold. */}
                                    <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
                                        <Link href="#contact">
                                            <Button className="group relative overflow-hidden md:h-12 md:px-7 md:text-base">
                                                <span className="relative z-10">Lavoriamo insieme</span>
                                                <span
                                                    aria-hidden
                                                    className="accent-gradient absolute inset-0 -z-0 -translate-x-full transition-transform duration-500 ease-smooth group-hover:translate-x-0"
                                                />
                                            </Button>
                                        </Link>
                                        <Link href="#projects">
                                            <Button
                                                variant="outline"
                                                className="md:h-12 md:px-7 md:text-base"
                                            >
                                                Guarda i progetti
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href="/cv">
                                            <Button
                                                variant="ghost"
                                                className="md:h-12 md:px-7 md:text-base"
                                            >
                                                <FileText className="h-4 w-4" />
                                                CV
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            {SOCIALS.map(({ href, label, Icon }) => (
                                                <Tooltip key={label} delayDuration={200}>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={label}
                                                            className="cursor-can-hover"
                                                        >
                                                            <Button variant="outline" size="icon">
                                                                <Icon size={18} />
                                                            </Button>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="bottom">{label}</TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </div>

                                        <span className="h-6 w-px bg-border" aria-hidden />

                                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {config.location}
                                        </span>
                                    </div>
                                </div>
                            </BlurIn>
                        </div>
                    )}
                </div>
                <div className="grid col-span-1"></div>
            </div>

            {/* Ticker — a quiet strip of motion along the very bottom of the
                fold. Duplicated once so the 50%-shift `animate-marquee` loops
                seamlessly; aria-hidden since SkillsSection is the real,
                accessible list of these same technologies. */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-20 overflow-hidden mask-x-fade opacity-70 md:bottom-24"
            >
                <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((label, i) => (
                        <span
                            key={`${label}-${i}`}
                            className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/60"
                        >
                            {label}
                            <span className="ml-10 text-spark/50">/</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
                <ScrollDownIcon />
            </div>
        </SectionWrapper>
    );
};

export default HeroSection;
