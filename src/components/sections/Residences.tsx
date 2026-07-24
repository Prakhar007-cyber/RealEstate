"use client";

import { useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { residences } from "@/data/site";
import SplitText from "@/components/reactbits/SplitText";
import Button from "@/components/ui/Button";

/*
 * Residences — an interactive index rather than a row of cards.
 * Selecting (hover on desktop, tap on mobile) a residence cross-fades the large
 * image and swaps the detail panel. Each has a floor-plan modal.
 */
export default function Residences() {
  const [active, setActive] = useState(0);
  const [planOpen, setPlanOpen] = useState(false);
  const lenis = useLenis();
  const current = residences[active];

  function enquire() {
    setPlanOpen(false);
    const el = document.querySelector("#contact");
    if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
  }

  return (
    <section id="residences" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
      <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="eyebrow">The Residences</p>
          </div>
          <SplitText
            as="h2"
            text="Homes of rare proportion."
            className="font-serif text-4xl font-light tracking-tight text-ivory sm:text-6xl"
          />
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-stone">
          Three collections, each designed to a different rhythm of living — yet
          bound by the same obsession with light, air and space.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Large image */}
        <div className="relative order-1 aspect-[4/3] overflow-hidden lg:order-2 lg:col-span-7 lg:aspect-[16/13]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-5 top-5 font-serif text-sm tracking-[0.3em] text-ivory/80">
            0{active + 1} / 0{residences.length}
          </span>
        </div>

        {/* Selector + details */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="border-t border-line">
            {residences.map((r, i) => (
              <button
                key={r.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-center justify-between border-b border-line py-5 text-left transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`text-xs transition-colors ${
                      active === i ? "text-gold" : "text-stone-dark"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`font-serif text-2xl font-light transition-colors sm:text-3xl ${
                      active === i ? "text-ivory" : "text-stone"
                    }`}
                  >
                    {r.name}
                  </span>
                </div>
                <ArrowRight
                  className={`h-5 w-5 transition-all ${
                    active === i
                      ? "translate-x-0 text-gold opacity-100"
                      : "-translate-x-2 opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Active detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mt-10"
            >
              <p className="eyebrow mb-4">{current.type}</p>
              <p className="max-w-md text-base leading-relaxed text-stone">
                {current.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-dark">
                    Carpet Area
                  </p>
                  <p className="mt-1 font-serif text-xl text-ivory">
                    {current.area}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-dark">
                    Price
                  </p>
                  <p className="mt-1 font-serif text-xl text-ivory">
                    {current.price}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" onClick={() => setPlanOpen(true)} data-cursor="Open">
                  View Floor Plan
                </Button>
                <Button variant="ghost" onClick={enquire} className="!px-2">
                  Enquire →
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floor plan modal */}
      <AnimatePresence>
        {planOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlanOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-3xl border border-line bg-ink-soft p-8 sm:p-12"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPlanOpen(false)}
                className="absolute right-5 top-5 text-stone transition-colors hover:text-gold"
                aria-label="Close floor plan"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="eyebrow mb-2">{current.type}</p>
              <h3 className="font-serif text-3xl font-light text-ivory">
                {current.name} — Indicative Plan
              </h3>
              <FloorPlan />
              <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
                <p className="text-sm text-stone">
                  {current.area} · Detailed & dimensioned plans shared on request.
                </p>
                <Button variant="primary" onClick={enquire}>
                  Request Detailed Plans
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* A tasteful schematic floor plan drawn in SVG (not a placeholder image). */
function FloorPlan() {
  return (
    <svg
      viewBox="0 0 400 260"
      className="mt-6 h-auto w-full"
      fill="none"
      stroke="var(--color-gold)"
      strokeWidth="1"
    >
      <rect x="10" y="10" width="380" height="240" strokeOpacity="0.5" />
      {/* Living */}
      <rect x="20" y="20" width="180" height="130" strokeOpacity="0.7" />
      <text x="30" y="45" fill="var(--color-stone)" stroke="none" fontSize="9">
        LIVING / DINING
      </text>
      {/* Kitchen */}
      <rect x="20" y="160" width="90" height="80" strokeOpacity="0.7" />
      <text x="30" y="185" fill="var(--color-stone)" stroke="none" fontSize="8">
        KITCHEN
      </text>
      {/* Utility */}
      <rect x="120" y="160" width="80" height="80" strokeOpacity="0.7" />
      <text x="130" y="185" fill="var(--color-stone)" stroke="none" fontSize="8">
        UTILITY
      </text>
      {/* Master */}
      <rect x="210" y="20" width="170" height="110" strokeOpacity="0.7" />
      <text x="222" y="45" fill="var(--color-stone)" stroke="none" fontSize="9">
        MASTER SUITE
      </text>
      {/* Bed 2 */}
      <rect x="210" y="140" width="100" height="100" strokeOpacity="0.7" />
      <text x="222" y="165" fill="var(--color-stone)" stroke="none" fontSize="8">
        BEDROOM
      </text>
      {/* Balcony */}
      <rect x="320" y="140" width="60" height="100" strokeOpacity="0.4" strokeDasharray="3 3" />
      <text x="330" y="165" fill="var(--color-stone)" stroke="none" fontSize="7">
        BALCONY
      </text>
    </svg>
  );
}
