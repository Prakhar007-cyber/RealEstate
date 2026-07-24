"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { brand } from "@/data/site";
import Button from "@/components/ui/Button";

/*
 * Full-viewport cinematic hero.
 *  - Background image scales in on load and drifts on scroll (parallax).
 *  - A gentle mouse-parallax shifts the image for depth on pointer devices.
 *  - Headline lines reveal with a clipped, staggered rise.
 * `start` gates the text entrance so it fires exactly as the preloader lifts.
 */
export default function Hero({ start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();

  // Scroll parallax on the background.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Subtle mouse parallax.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 24);
    my.set((e.clientY / innerHeight - 0.5) * 24);
  }

  // Headline lines, revealed with a stagger once `start` is true.
  const lines = ["Elevated Living.", "Timeless Design."];

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="grain relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-[-6%]"
        style={{ y: bgY, x: smx, translateY: smy }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.25 }}
          animate={{ scale: start ? 1 : 1.25 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80"
            alt="Aurelis Residences at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Cinematic overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-24 sm:px-8 sm:pb-28"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9 }}
        >
          {brand.property} — {brand.location}
        </motion.p>

        <h1 className="max-w-5xl font-serif text-[15vw] font-light leading-[0.92] tracking-tight text-ivory sm:text-[9vw] lg:text-[8.5rem]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={start ? { y: "0%" } : {}}
                transition={{
                  delay: 0.25 + i * 0.12,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.9 }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              magnetic
              onClick={() => {
                const el = document.querySelector("#residences");
                if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
              }}
              data-cursor="View"
            >
              Explore Residences
            </Button>
            <Button
              variant="outline"
              magnetic
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
              }}
              data-cursor="Book"
            >
              Book a Site Visit
            </Button>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs uppercase tracking-[0.24em] text-stone">
              Starting
            </p>
            <p className="font-serif text-4xl font-light text-ivory">
              {brand.startingPrice}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2 text-stone">
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
