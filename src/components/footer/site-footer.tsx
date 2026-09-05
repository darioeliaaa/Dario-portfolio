import React, { Suspense } from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { footer } from "./config";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import BackToTop from "./back-to-top";

/**
 * `cacheComponents` prerenders this page, so reading the clock has to sit
 * behind a Suspense boundary — otherwise Next errors with
 * "used `new Date()` … without a Suspense boundary".
 */
function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}

const SOCIALS = [
  { href: config.social.github, label: "GitHub", Icon: SiGithub },
  { href: config.social.linkedin, label: "LinkedIn", Icon: SiLinkedin },
  { href: config.social.instagram, label: "Instagram", Icon: SiInstagram },
].filter((s) => Boolean(s.href));

function Footer() {
  return (
    <footer className="relative z-10 w-full shrink-0 overflow-hidden border-t border-border bg-background/60 backdrop-blur-md">
      {/* A giant outlined mark of the name as the page's last visual beat —
          purely decorative, so it's hidden from assistive tech and clipped
          so it can never introduce horizontal scroll. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-4 overflow-hidden text-center"
      >
        <span
          className="inline-block whitespace-nowrap font-display font-bold leading-none text-transparent"
          style={{
            fontSize: "clamp(4rem, 14vw, 11rem)",
            WebkitTextStroke: "1px hsl(var(--foreground) / 0.08)",
          }}
        >
          {config.author}
        </span>
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-12 pt-24 md:px-8 md:pt-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold tracking-tight">
              {config.author}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {config.description.short}
            </p>
            {config.email && (
              <Link
                href={`mailto:${config.email}`}
                className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-foreground"
              >
                {config.email}
              </Link>
            )}
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            <span className="eyebrow mb-1">Naviga</span>
            {[
              { title: "Chi sono", href: "/#about" },
              { title: "Progetti", href: "/#projects" },
              { title: "Tariffe", href: "/#tariffe" },
              { title: "CV", href: "/cv" },
              { title: "Contatti", href: "/#contact" },
              ...footer,
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Trovami</span>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Button variant="outline" size="icon">
                    <Icon size={16} />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            ©{" "}
            <Suspense fallback={null}>
              <CopyrightYear />
            </Suspense>{" "}
            {config.author}. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-muted-foreground">
            Costruito con Next.js, Tailwind CSS e Spline.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
