"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import PricingSection from "@/components/sections/pricing-section";
import ContactSection from "@/components/sections/contact";

function MainPage() {
    return (
        <SmoothScroll>
            <AnimatedBackground />
            {/* `canvas-overlay-mode` lets clicks fall through to the 3D canvas
                except on real content (see globals.css). */}
            <main className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ExperienceSection />
                <ProjectsSection />
                <PricingSection />
                <ContactSection />
            </main>
        </SmoothScroll>
    );
}

export default MainPage;
