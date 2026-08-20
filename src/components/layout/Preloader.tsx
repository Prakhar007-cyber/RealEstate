"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
 * Cinematic preloader shown on first homepage load.
 * The AURELIS wordmark rises letter-by-letter, a hairline draws to 100%,
 * a counter ticks up, then the whole curtain lifts to reveal the hero.
 */
const WORD = "AURELIS".split("");

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // Tick a percentage counter up to 100 over ~1.8s, then lift the curtain.
  useEffect(() => {
    const total = 1800;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const p = Math.min((now - start) / total, 1);
      // ease-out for a natural deceleration near 100
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    }
    raf = requestAnimationFrame(tick);

    // Lock scroll while the preloader is up.
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="grain fixed inset-0 z-80 flex flex-col items-center justify-center overflow-hidden bg-ink"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
        >
          {/* Wordmark */}
          <div className="flex overflow-hidden">
            {WORD.map((letter, i) => (
              <span key={i} className="overflow-hidden">
                <motion.span
                  className="block font-serif text-[15vw] font-light leading-none tracking-[0.06em] text-ivory sm:text-[8vw]"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="eyebrow mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Elevated Living. Timeless Design.
          </motion.p>

          {/* Progress line + counter */}
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-8">
            <div className="relative h-px w-40 overflow-hidden bg-line sm:w-64">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <span className="font-sans text-xs tracking-[0.3em] text-stone">
              {count.toString().padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
