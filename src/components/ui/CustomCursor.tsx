"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * A minimal two-part cursor (small dot + trailing ring) for pointer devices only.
 * The ring lags behind with a spring; it grows and shows a label when hovering
 * elements marked with `data-cursor` or standard interactive tags.
 * Falls back to the native cursor on touch devices and for reduced-motion users.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion()) return;

    // Enable only on pointer devices after mount (media query is client-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor], input, textarea, select"
      ) as HTMLElement | null;
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") ?? "");
      } else {
        setHovering(false);
        setLabel("");
      }
    }

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ x, y }}
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 text-[10px] uppercase tracking-widest text-gold"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? (label ? 84 : 46) : 30,
          height: hovering ? (label ? 84 : 46) : 30,
          backgroundColor: hovering ? "rgba(184,148,101,0.08)" : "rgba(184,148,101,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {label}
      </motion.div>
    </>
  );
}
