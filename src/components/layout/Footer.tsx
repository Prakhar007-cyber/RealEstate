"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import { Instagram, Linkedin, Facebook } from "@/components/ui/SocialIcons";
import { brand, navLinks } from "@/data/site";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ShinyText from "@/components/reactbits/ShinyText";

export default function Footer() {
  const lenis = useLenis();

  function goTo(href: string) {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink px-5 pb-10 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-350">
        {/* Oversized wordmark */}
        <AnimatedContent direction="up">
          <div className="border-b border-line pb-14">
            <p className="eyebrow mb-6">
              <ShinyText text="Aurelis Residences" />
            </p>
            <h2 className="font-serif text-[18vw] font-light leading-[0.85] tracking-tight text-ivory sm:text-[13vw] lg:text-[11rem]">
              AURELIS
            </h2>
            <p className="mt-6 max-w-md font-serif text-2xl font-light italic text-stone">
              Elevated Living. <br className="sm:hidden" />
              Timeless Design.
            </p>
          </div>
        </AnimatedContent>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => goTo(l.href)}
                    className="text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Legal</p>
            <ul className="space-y-3">
              {["Privacy", "Terms", "Disclaimer"].map((l) => (
                <li key={l}>
                  <span className="cursor-default text-sm text-ivory/70 transition-colors hover:text-gold">
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Sales Gallery</p>
            <address className="space-y-3 not-italic text-sm leading-relaxed text-ivory/70">
              <p>{brand.address}</p>
              <a
                href={`tel:${brand.phoneHref}`}
                className="block transition-colors hover:text-gold"
              >
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="block transition-colors hover:text-gold"
              >
                {brand.email}
              </a>
            </address>
          </div>

          <div>
            <p className="eyebrow mb-5">Account</p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/signin"
                  className="inline-flex items-center gap-1 text-sm text-ivory/70 transition-colors hover:text-gold"
                >
                  Sign In <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1 text-sm text-ivory/70 transition-colors hover:text-gold"
                >
                  Create Account <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-stone-dark sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Aurelis Residences. All rights reserved.</p>
          <p className="max-w-lg">
            *Prices are indicative and exclusive of taxes. Images are artistic
            representations. This is a fictional project created for portfolio
            purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
