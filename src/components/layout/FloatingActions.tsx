"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CalendarDays, MessageCircle } from "lucide-react";
import { brand } from "@/data/site";

/*
 * Tasteful floating quick-actions (bottom-right). They fade in only after the
 * hero has scrolled away, so they never sit over the opening frame.
 */
export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actions = [
    {
      label: "WhatsApp",
      href: `https://wa.me/${brand.whatsapp}`,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Call",
      href: `tel:${brand.phoneHref}`,
      icon: Phone,
      external: true,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {actions.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor={label}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink-soft/80 text-ivory backdrop-blur transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </a>
          ))}

          {/* Primary: schedule a visit — scrolls to the CTA form */}
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
            }}
            aria-label="Schedule a visit"
            data-cursor="Book"
            className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-soft"
          >
            <CalendarDays className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">Schedule Visit</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
