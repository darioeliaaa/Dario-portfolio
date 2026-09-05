"use client";

import { usePathname } from "next/navigation";
import Particles from "@/components/Particles";
import RemoteCursors from "@/components/realtime/remote-cursors";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/ElasticCursor";

import MotionNudge from "@/components/motion-nudge";
import { usePerfProfile } from "@/hooks/use-perf-profile";

export default function AppOverlays() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // The CV route disables the elastic cursor (keeps the particle bg).
  const isCv = pathname?.startsWith("/cv") ?? false;

  const { particleCount, maxDpr, disableDecorative } = usePerfProfile();

  return (
    <>
      {particleCount > 0 && (
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={particleCount}
          maxDpr={maxDpr}
        />
      )}
      {isHome && <RemoteCursors />}
      <EasterEggs />
      {!isCv && !disableDecorative && <ElasticCursor />}
      {isHome && <MotionNudge />}
    </>
  );
}
