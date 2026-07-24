"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { nearbyPlaces, brand } from "@/data/site";
import SplitText from "@/components/reactbits/SplitText";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

/*
 * Location — a stylised, dependency-free map. Nearby landmarks are plotted from
 * data coordinates; hovering a landmark (list or pin) draws a connector from the
 * central Aurelis marker. No paid map API involved.
 */
const CENTER = { x: 50, y: 48 };

export default function Location() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="location" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
      <div className="mb-16 max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-12 bg-gold" />
          <p className="eyebrow">The Location</p>
        </div>
        <SplitText
          as="h2"
          text="Connected to everything. Removed from the ordinary."
          className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-ivory sm:text-6xl"
        />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Distances list */}
        <div className="lg:col-span-4">
          <div className="border-t border-line">
            {nearbyPlaces.map((place) => (
              <button
                key={place.id}
                onMouseEnter={() => setActive(place.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(place.id)}
                className="group flex w-full items-center justify-between border-b border-line py-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`h-4 w-4 transition-colors ${
                      active === place.id ? "text-gold" : "text-stone-dark"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-lg font-light transition-colors ${
                      active === place.id ? "text-ivory" : "text-stone"
                    }`}
                  >
                    {place.name}
                  </span>
                </div>
                <span className="font-serif text-lg text-gold-soft">
                  {place.time}
                </span>
              </button>
            ))}
          </div>

          <AnimatedContent direction="up" className="mt-10">
            <div className="flex items-start gap-3 text-sm text-stone">
              <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <p>{brand.address}</p>
            </div>
          </AnimatedContent>
        </div>

        {/* Stylised map */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink-soft sm:aspect-[16/10]">
            {/* faint grid */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {/* soft glow behind center */}
            <div
              className="absolute h-1/2 w-1/2 rounded-full opacity-20 blur-3xl"
              style={{
                left: `${CENTER.x}%`,
                top: `${CENTER.y}%`,
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)",
              }}
            />

            {/* connectors */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {nearbyPlaces.map((p) => (
                <line
                  key={p.id}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--color-gold)"
                  strokeWidth="0.2"
                  strokeDasharray="1 1"
                  className="transition-opacity duration-300"
                  style={{ opacity: active === p.id ? 0.9 : 0.18 }}
                />
              ))}
            </svg>

            {/* place pins */}
            {nearbyPlaces.map((p) => (
              <button
                key={p.id}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                aria-label={p.name}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    active === p.id
                      ? "scale-150 bg-gold"
                      : "bg-stone-dark"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-wider transition-opacity duration-300 ${
                    active === p.id ? "text-ivory opacity-100" : "text-stone opacity-0"
                  }`}
                >
                  {p.name} · {p.time}
                </span>
              </button>
            ))}

            {/* central Aurelis marker */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
            >
              <motion.span
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative block h-3.5 w-3.5 rounded-full bg-gold" />
              <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap font-serif text-sm tracking-[0.2em] text-ivory">
                AURELIS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
