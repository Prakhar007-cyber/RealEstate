"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, brand } from "@/data/site";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Smoothly scroll to an in-page anchor using the shared Lenis instance.
  function goTo(href: string) {
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-ink/70 py-4 backdrop-blur-xl"
            : "border-b border-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
          {/* Wordmark */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                lenis?.scrollTo(0);
              }
            }}
            className="font-serif text-2xl font-light tracking-[0.35em] text-ivory transition-colors hover:text-gold"
          >
            {brand.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => goTo(link.href)}
                className="group relative text-[0.8rem] font-light uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-ivory"
              >
                {link.label}
                {/* animated underline */}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              variant="outline"
              magnetic
              onClick={() => goTo("#contact")}
              className="!px-6 !py-2.5"
              data-cursor="Enquire"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="text-ivory lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-6">
              <span className="font-serif text-2xl font-light tracking-[0.35em] text-ivory">
                {brand.name}
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-ivory" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className="border-b border-line py-5 text-left font-serif text-4xl font-light text-ivory"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                >
                  <span className="mr-4 text-xs align-middle text-gold">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <Button
                variant="primary"
                onClick={() => goTo("#contact")}
                className="w-full"
              >
                Enquire Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
