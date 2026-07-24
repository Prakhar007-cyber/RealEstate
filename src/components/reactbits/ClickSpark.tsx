"use client";

/*
 * ClickSpark — adapted from React Bits (https://reactbits.dev, MIT).
 * Emits a small burst of champagne "sparks" from the pointer on every click,
 * drawn on a full-screen canvas. Purely decorative; skipped for reduced motion.
 */
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type Spark = { x: number; y: number; angle: number; start: number };

export default function ClickSpark({
  color = "#cdad82",
  count = 8,
  radius = 18,
  duration = 420,
}: {
  color?: string;
  count?: number;
  radius?: number;
  duration?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Cast to non-null so TS keeps the narrowing inside the nested closures below.
    const cv = canvas;
    const ctx = context;

    function resize() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onClick(e: MouseEvent) {
      const now = performance.now();
      for (let i = 0; i < count; i++) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / count,
          start: now,
        });
      }
    }
    window.addEventListener("click", onClick);

    let raf = 0;
    function loop() {
      const now = performance.now();
      ctx.clearRect(0, 0, cv.width, cv.height);
      sparks.current = sparks.current.filter((s) => now - s.start < duration);
      for (const s of sparks.current) {
        const t = (now - s.start) / duration; // 0 -> 1
        const eased = 1 - Math.pow(1 - t, 3);
        const dist = radius * eased;
        const x1 = s.x + Math.cos(s.angle) * dist;
        const y1 = s.y + Math.sin(s.angle) * dist;
        const x2 = s.x + Math.cos(s.angle) * (dist + 8);
        const y2 = s.y + Math.sin(s.angle) * (dist + 8);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 1 - t;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, [color, count, radius, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95]"
    />
  );
}
