"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/*
 * Immersive architecture highlight. The section is tall; an inner panel sticks
 * to the viewport while you scroll, and the image slowly scales as layered text
 * drifts at different speeds to create depth.
 */
export default function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.28]);
  const overlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.3, 0.65]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);
  const subY = useTransform(scrollYProgress, [0, 1], ["-30px", "40px"]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.4]
  );

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80"
            alt="Light-filled architectural interior"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-ink"
          style={{ opacity: overlay }}
        />

        <motion.div
          className="relative z-10 px-6 text-center"
          style={{ opacity: textOpacity }}
        >
          <motion.p
            className="eyebrow mb-8"
            style={{ y: subY }}
          >
            The Architecture
          </motion.p>
          <motion.h2
            style={{ y: titleY }}
            className="mx-auto max-w-5xl font-serif text-[9vw] font-light leading-[1.02] tracking-tight text-ivory sm:text-6xl lg:text-8xl"
          >
            Designed around light, space and silence.
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
