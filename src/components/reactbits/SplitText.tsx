"use client";

/*
 * SplitText — adapted from React Bits (https://reactbits.dev, MIT).
 * Splits a string into words or characters and staggers each piece into view
 * when the element scrolls into the viewport. Implemented with Framer Motion.
 */
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  splitType?: "chars" | "words";
  delay?: number; // stagger between pieces (seconds)
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
};

const container = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay },
  },
});

const child = (duration: number): Variants => ({
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration, ease: [0.16, 1, 0.3, 1] },
  },
});

export default function SplitText({
  text,
  className,
  splitType = "words",
  delay = 0.045,
  duration = 0.9,
  as = "span",
  once = true,
}: SplitTextProps) {
  const pieces = splitType === "chars" ? text.split("") : text.split(" ");
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={container(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      aria-label={text}
    >
      {pieces.map((piece, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span className="inline-block" variants={child(duration)}>
            {piece === " " ? " " : piece}
            {splitType === "words" && i < pieces.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
