"use client";

/*
 * CountUp — adapted from React Bits (https://reactbits.dev, MIT).
 * Animates a number from 0 to its target when it scrolls into view,
 * using a Framer Motion spring for a natural ease-out.
 */
import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

type CountUpProps = {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
};

export default function CountUp({
  to,
  duration = 2,
  className,
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const value = useMotionValue(0);
  const rounded = useSpring(value, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, to, duration, value]);

  useEffect(() => {
    const unsub = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
    return unsub;
  }, [rounded, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
