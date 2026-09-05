"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/site-footer";
import AppOverlays from "@/components/app-overlays";
import ScrollProgress from "@/components/ui/scroll-progress";

/**
 * Wraps the app shell. The `/components*` showcase routes are rendered
 * "bare" (no header / footer / decorative overlays) so the component
 * galleries can be judged in isolation. Everything else gets full chrome.
 */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/components") ?? false;

  if (bare) return <>{children}</>;

  return (
    <>
      {/* Skip link — the first tab stop on every page. */}
      <a
        href="#main"
        className="sr-only z-[2000] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Vai al contenuto
      </a>
      <ScrollProgress />
      <Header />
      <div id="main">{children}</div>
      <Footer />
      <AppOverlays />
    </>
  );
}
