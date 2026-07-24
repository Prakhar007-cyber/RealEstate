"use client";

import CountUp from "@/components/reactbits/CountUp";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { stats } from "@/data/site";

/* Minimal animated statistics — numbers count up as they enter view. */
export default function Stats() {
  return (
    <section className="border-y border-line bg-ink-soft/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <AnimatedContent key={stat.label} direction="up" delay={i * 0.08}>
              <div className="flex flex-col">
                <div className="flex items-baseline font-serif text-6xl font-light text-ivory sm:text-7xl">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-gold-soft">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-stone">{stat.detail}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
