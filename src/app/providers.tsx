"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

/**
 * Global client providers:
 *  - Lenis smooth scrolling (driven by GSAP's ticker so ScrollTrigger stays in sync)
 *  - Custom cursor + scroll progress bar (both are desktop / motion aware internally)
 *
 * Keeping the Lenis + GSAP wiring in one place means every ScrollTrigger animation
 * elsewhere in the app "just works" without re-plumbing the loop.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Drive Lenis from GSAP's ticker (single RAF loop) and keep ScrollTrigger fresh.
    function onLenisScroll() {
      ScrollTrigger.update();
    }
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", onLenisScroll);

    function raf(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.off("scroll", onLenisScroll);
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        // autoRaf off — GSAP's ticker owns the loop (see effect above).
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
      }}
    >
      <ScrollProgress />
      <CustomCursor />
      {children}
    </ReactLenis>
  );
}
