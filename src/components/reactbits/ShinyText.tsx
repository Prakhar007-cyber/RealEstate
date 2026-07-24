"use client";

/*
 * ShinyText — adapted from React Bits (https://reactbits.dev, MIT).
 * A subtle champagne shimmer sweeps across the text. Used sparingly for
 * eyebrows and small accents so it stays premium, not gimmicky.
 */
import { cn } from "@/lib/utils";

type ShinyTextProps = {
  text: string;
  className?: string;
  speed?: number; // seconds per sweep
};

export default function ShinyText({ text, className, speed = 5 }: ShinyTextProps) {
  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #8f6f47 35%, #f6e7c8 50%, #8f6f47 65%)",
        backgroundSize: "220% 100%",
        animation: `shiny-sweep ${speed}s linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shiny-sweep {
          0% { background-position: 220% 0; }
          100% { background-position: -120% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
