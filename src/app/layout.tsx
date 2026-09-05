import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import Script from "next/script";
import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@next/third-parties/google";

/* Body/base font — Space Grotesk, bound to --font-sans (applied as `font-sans`
 * on <html>). Everything that isn't a heading inherits this. */
const spaceGroteskSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Heading font — Unbounded, bound to --font-display and applied to h1–h6. */
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  // Without this every relative OG/Twitter image URL resolves against the
  // wrong origin (and Next logs a warning on every build).
  metadataBase: new URL(config.site),
  title: {
    default: config.title,
    template: `%s | ${config.author}`,
  },
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author, url: config.site }],
  creator: config.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    siteName: config.author,
    locale: "it_IT",
    // og:image comes from src/app/opengraph-image.tsx (generated from config).
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches the light/dark `--background` tokens so the mobile browser chrome
  // blends into the page instead of flashing white on a dark site.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
  ],
};

/** Schema.org Person — lets search engines show a proper knowledge panel. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: config.author,
  url: config.site,
  jobTitle: config.role,
  description: config.description.short,
  image: `${config.site}/opengraph-image`,
  address: { "@type": "PostalAddress", addressCountry: "IT" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Università della Calabria",
  },
  knowsAbout: config.keywords,
  sameAs: Object.values(config.social).filter(Boolean),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={[
        spaceGroteskSans.variable,
        unbounded.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        {/* The Spline runtime lazy-loads its wasm from unpkg; warm the
            connection early so the 3D scene starts faster. */}
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        {/* Skill icons (devicon) are served from jsDelivr. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* Guarded: an unconditional <Script src={undefined}> renders an
            empty, broken <script> tag when Umami isn't configured — which is
            the default (both env vars are optional/unset). */}
        {process.env.UMAMI_DOMAIN && process.env.UMAMI_SITE_ID && (
          <Script
            defer
            src={process.env.UMAMI_DOMAIN}
            data-website-id={process.env.UMAMI_SITE_ID}
          />
        )}
        {/* JSON-LD, as a real string child rather than dangerouslySetInnerHTML.
            React 19 manages <script> as a hoistable resource and flags the
            dangerouslySetInnerHTML form ("script tag while rendering React
            component") with a hydration mismatch on every load; a plain
            string child skips that path — React does not HTML-escape it, so
            the JSON stays valid. */}
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </head>
      <body>
        <Providers>
          <SiteFrame>{children}</SiteFrame>
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
