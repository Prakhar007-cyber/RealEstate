"use client";

import Image from "next/image";
import { lifestyle } from "@/data/site";
import Reveal from "@/components/animations/Reveal";
import Parallax from "@/components/animations/Parallax";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SplitText from "@/components/reactbits/SplitText";

/*
 * Lifestyle — four chapters (Morning / Wellness / Community / Evening) told with
 * alternating image/text rows, clip reveals and gentle image parallax.
 */
export default function Lifestyle() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
      <div className="mb-20 max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-12 bg-gold" />
          <p className="eyebrow">A Day at Aurelis</p>
        </div>
        <SplitText
          as="h2"
          text="Life, measured in light."
          className="font-serif text-4xl font-light tracking-tight text-ivory sm:text-6xl"
        />
      </div>

      <div className="flex flex-col gap-24 sm:gap-36">
        {lifestyle.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={item.id}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              {/* Image */}
              <div className={reversed ? "lg:order-2" : ""}>
                <Reveal className="relative aspect-[4/5] w-full sm:aspect-[5/4]">
                  <Parallax speed={70} className="h-full w-full">
                    <div className="relative h-[112%] w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                </Reveal>
              </div>

              {/* Text */}
              <div className={reversed ? "lg:order-1" : ""}>
                <AnimatedContent direction={reversed ? "right" : "left"}>
                  <p className="eyebrow mb-6">{item.chapter}</p>
                  <h3 className="font-serif text-3xl font-light leading-tight text-ivory sm:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
                    {item.copy}
                  </p>
                </AnimatedContent>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
