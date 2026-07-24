"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/site";

/* Quiet, rotating testimonials — a single centred quote that crossfades. */
export default function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      7000
    );
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="border-y border-line bg-ink-soft/40">
      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <p className="eyebrow mb-10">In Their Words</p>

        <div className="min-h-[220px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif text-2xl font-light italic leading-[1.4] text-ivory sm:text-4xl">
                “{current.quote}”
              </p>
              <footer className="mt-8">
                <p className="text-sm font-medium tracking-[0.1em] text-gold-soft">
                  {current.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone">
                  {current.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === i ? "w-8 bg-gold" : "w-1.5 bg-stone-dark"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
