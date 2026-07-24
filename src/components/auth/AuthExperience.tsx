"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { brand } from "@/data/site";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

/*
 * The cinematic authentication experience shared by /signin and /signup.
 *
 * Switching modes does NOT navigate — it toggles internal state so the whole
 * layout can morph smoothly: the image panel slides to the opposite side, the
 * background image crossfades, and the form fades/slides across. The URL is
 * updated silently with history.replaceState so it still reflects the mode.
 *
 * On mobile the split-screen collapses to a stacked layout with a simple fade.
 */
type Mode = "signin" | "signup";

const panelImage: Record<Mode, { src: string; caption: string }> = {
  signin: {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    caption: "Welcome home.",
  },
  signup: {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    caption: "Begin your Aurelis story.",
  },
};

export default function AuthExperience({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const isSignin = mode === "signin";

  function switchMode(next: Mode) {
    setMode(next);
    // Reflect the mode in the URL without a full navigation (keeps the morph smooth).
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/${next}`);
    }
  }

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Back to site */}
      <Link
        href="/"
        className="absolute left-5 top-5 z-30 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:text-gold sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>

      {/* ---------- Desktop: split screen that morphs ---------- */}
      <div className="hidden lg:block">
        {/* Image panel — slides between the two halves */}
        <motion.div
          className="absolute inset-y-0 z-10 w-1/2 overflow-hidden"
          animate={{ left: isSignin ? "0%" : "50%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <AnimatePresence>
            <motion.div
              key={mode}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={panelImage[mode].src}
                alt="Aurelis Residences"
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
            </motion.div>
          </AnimatePresence>

          {/* Panel copy */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-12">
            <span className="font-serif text-2xl font-light tracking-[0.35em] text-ivory">
              {brand.name}
            </span>
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="font-serif text-5xl font-light leading-tight text-ivory"
                >
                  {panelImage[mode].caption}
                </motion.p>
              </AnimatePresence>
              <p className="mt-4 text-sm tracking-[0.15em] text-ivory/60">
                {brand.tagline}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form panel — occupies the opposite half */}
        <motion.div
          className="absolute inset-y-0 flex w-1/2 items-center justify-center px-16"
          animate={{ left: isSignin ? "50%" : "0%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="w-full max-w-md">
            <FormSwitch mode={mode} onSwitch={switchMode} />
          </div>
        </motion.div>
      </div>

      {/* ---------- Mobile: stacked with a simple fade ---------- */}
      <div className="lg:hidden">
        <div className="relative h-52 w-full overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={mode}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={panelImage[mode].src}
                alt="Aurelis Residences"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
          <span className="absolute bottom-5 left-5 font-serif text-xl font-light tracking-[0.35em] text-ivory">
            {brand.name}
          </span>
        </div>
        <div className="px-6 py-10">
          <FormSwitch mode={mode} onSwitch={switchMode} />
        </div>
      </div>
    </div>
  );
}

/* Crossfades between the two forms with a slide, keyed by mode. */
function FormSwitch({
  mode,
  onSwitch,
}: {
  mode: Mode;
  onSwitch: (m: Mode) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {mode === "signin" ? (
          <SignInForm onSwitch={() => onSwitch("signup")} />
        ) : (
          <SignUpForm onSwitch={() => onSwitch("signin")} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
