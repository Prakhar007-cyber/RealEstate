"use client";

import Image from "next/image";
import SplitText from "@/components/reactbits/SplitText";
import TextReveal from "@/components/animations/TextReveal";
import Parallax from "@/components/animations/Parallax";
import Reveal from "@/components/animations/Reveal";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

/*
 * Intro / project story — editorial two-column layout.
 * Big serif statement (SplitText), scroll-linked philosophy copy (TextReveal)
 * and a parallax architectural image.
 */
export default function Intro() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-350 px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="mb-16 flex items-center gap-4">
        <span className="h-px w-12 bg-gold" />
        <p className="eyebrow">The Philosophy</p>
      </div>

      <SplitText
        as="h2"
        text="A new expression of contemporary luxury."
        splitType="words"
        className="max-w-4xl font-serif text-4xl font-light leading-[1.1] tracking-tight text-ivory sm:text-6xl lg:text-7xl"
      />

      <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="order-2 lg:order-1">
          <TextReveal
            text="Aurelis was imagined as a quiet counterpoint to the noise of the city — a place where architecture recedes and life expands. Every residence is composed around natural light, generous proportion and an unwavering respect for detail. This is not a building. It is a considered way of living."
            className="font-serif text-2xl font-light leading-normal text-ivory sm:text-3xl"
          />

          <AnimatedContent direction="up" delay={0.1}>
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-10">
              <div>
                <p className="eyebrow mb-2">Developer</p>
                <p className="text-sm text-stone">
                  Aurelis Estates — crafting landmark residences across North
                  India for over two decades.
                </p>
              </div>
              <div>
                <p className="eyebrow mb-2">Architecture</p>
                <p className="text-sm text-stone">
                  A collaboration between international masterplanners and Indian
                  landscape studios.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal className="relative aspect-3/4 w-full">
            <Parallax speed={80} className="h-full w-full">
              <div className="relative h-[112%] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                  alt="Sunlit interior of an Aurelis residence"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
