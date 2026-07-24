"use client";

/*
 * BlurText — adapted from React Bits (https://reactbits.dev, MIT).
 * Words animate up from a blurred, offset state as they enter the viewport.
 * Great for editorial paragraphs that should "resolve" into focus on scroll.
 */
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function BlurText({
  text,
  className,
  delay = 0,
  once = true,
}: BlurTextProps) {
  return (
    <motion.p
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block" aria-hidden>
          {w}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
}
