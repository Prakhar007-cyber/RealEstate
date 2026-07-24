"use client";

import { motion } from "framer-motion";

/*
 * Route transition. `template.tsx` re-mounts on every navigation, so this
 * runs each time you move between Home / Sign In / Sign Up:
 *  1. an ink curtain (with the AURELIS wordmark) covers the screen, then lifts
 *  2. the incoming page fades up underneath it
 * On the very first homepage load the Preloader sits above this, so it's unseen.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[75] flex items-center justify-center bg-ink"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.15 }}
      >
        <span className="font-serif text-3xl font-light tracking-[0.4em] text-ivory">
          AURELIS
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
