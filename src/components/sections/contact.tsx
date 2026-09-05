"use client";
import React from "react";
import Link from "next/link";
import { Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const SOCIALS = [
  { href: config.social.github, label: "GitHub", handle: "@darioeliaaa", Icon: SiGithub },
  { href: config.social.linkedin, label: "LinkedIn", handle: "Dario Elia", Icon: SiLinkedin },
  { href: config.social.instagram, label: "Instagram", handle: "@darioeliaaa", Icon: SiInstagram },
].filter((s) => Boolean(s.href));

const ContactSection = () => {
  return (
    <SectionWrapper
      id="contact"
      className="relative mx-auto min-h-screen max-w-7xl overflow-hidden px-4 py-24"
    >
      <span
        aria-hidden
        className="glow-orb left-1/2 top-10 h-[26rem] w-[40rem] -translate-x-1/2 bg-spark/10 dark:bg-spark/15"
      />

      <SectionHeader
        id="contact"
        eyebrow="Contatti"
        index={6}
        className="relative mb-14"
        title={
          <>
            LAVORIAMO <br />
            INSIEME
          </>
        }
        desc="Hai un'idea, un progetto o semplicemente una domanda? Scrivimi: rispondo di solito entro 24 ore."
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Form */}
        <div className="pointer-events-auto rounded-2xl surface glow-border p-6 md:p-8">
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Scrivimi due righe
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Più dettagli mi dai, più preciso sarà il preventivo.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        {/* Direct channels */}
        <div className="flex flex-col gap-4">
          <div className="pointer-events-auto rounded-2xl surface glow-border p-6 md:p-8">
            <h3 className="text-lg font-semibold tracking-tight">
              Preferisci un altro canale?
            </h3>

            <ul className="mt-5 flex flex-col gap-2">
              {config.email && (
                <li>
                  <Link
                    href={`mailto:${config.email}`}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-colors hover:border-foreground/25 hover:bg-secondary/60"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted-foreground">Email</span>
                      <span className="block truncate text-sm">{config.email}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              )}

              {SOCIALS.map(({ href, label, handle, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-colors hover:border-foreground/25 hover:bg-secondary/60"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted-foreground">{label}</span>
                      <span className="block truncate text-sm">{handle}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pointer-events-auto rounded-2xl surface glow-border p-6 md:p-8">
            <dl className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Dove
                </dt>
                <dd className="ml-auto font-medium">{config.location}</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Risposta
                </dt>
                <dd className="ml-auto font-medium">entro 24h</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    {config.available && (
                      <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-spark" />
                    )}
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        config.available ? "bg-spark" : "bg-muted-foreground"
                      }`}
                    />
                  </span>
                  Stato
                </dt>
                <dd className="ml-auto font-medium">
                  {config.available ? "Disponibile" : "Al completo"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
