"use client";

/*
 * Magnet — adapted from React Bits (https://reactbits.dev, MIT).
 * Pulls its children toward the cursor while hovering, then springs back.
 * Disabled on touch / reduced-motion so it never gets in the way.
 */
import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagnetProps = {
  children: ReactNode;
  className?: string;
  strength?: number; // higher = follows cursor more closely
};

export default function Magnet({
  children,
  className,
  strength = 3,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX / strength);
    y.set(relY / strength);
    setActive(true);
  }

  function reset() {
    x.set(0);
    y.set(0);
    setActive(false);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-active={active}
    >
      {children}
    </motion.div>
  );
}
