"use client";

/*
 * AnimatedContent — adapted from React Bits (https://reactbits.dev, MIT).
 * A general-purpose scroll reveal wrapper: fades + slides its children in from
 * a chosen direction when they enter the viewport. Used throughout the site to
 * give sections a consistent, restrained entrance.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export default function AnimatedContent({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const base = offset[direction];
  const from = distance
    ? {
        x: base.x === 0 ? 0 : Math.sign(base.x) * distance,
        y: base.y === 0 ? 0 : Math.sign(base.y) * distance,
      }
    : base;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
