"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { amenities } from "@/data/site";

/*
 * Amenities — hovering (or tapping) a name cross-fades the full-bleed background
 * and animates in its description. A more cinematic take than an icon grid.
 */
export default function Amenities() {
  const [active, setActive] = useState(0);
  const current = amenities[active];

  return (
    <section
      id="amenities"
      className="relative min-h-screen w-full overflow-hidden bg-ink py-24 sm:py-28"
    >
      {/* Background image crossfade */}
      <AnimatePresence>
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={current.image}
            alt={current.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/80 to-ink/30" />
      <div className="absolute inset-0 bg-linear-to-t from-ink to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-full max-w-350 flex-col justify-between gap-16 px-5 sm:px-8 lg:flex-row lg:items-center">
        {/* List */}
        <div className="w-full lg:w-1/2">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="eyebrow">The Amenities</p>
          </div>
          <ul>
            {amenities.map((a, i) => (
              <li key={a.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-4 border-b border-line py-4 text-left"
                >
                  <span
                    className={`text-xs transition-colors ${
                      active === i ? "text-gold" : "text-stone-dark"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`font-serif text-3xl font-light transition-all duration-300 sm:text-4xl ${
                      active === i
                        ? "translate-x-2 text-ivory"
                        : "text-stone group-hover:text-ivory/70"
                    }`}
                  >
                    {a.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Active description card */}
        <div className="w-full lg:w-[38%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="border border-line bg-ink/40 p-8 backdrop-blur-md sm:p-10"
            >
              <p className="eyebrow mb-4">
                0{active + 1} — {current.name}
              </p>
              <p className="font-serif text-2xl font-light leading-snug text-ivory sm:text-3xl">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
