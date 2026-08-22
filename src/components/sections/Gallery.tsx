"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery, galleryCategories } from "@/data/site";
import SplitText from "@/components/reactbits/SplitText";
import { cn } from "@/lib/utils";

/*
 * Gallery — animated category tabs filter the grid with layout transitions.
 * Clicking a tile opens a fullscreen lightbox with prev/next + keyboard nav.
 */
export default function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = gallery.filter(
    (img) => filter === "All" || img.category === filter
  );

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + visible.length) % visible.length
      ),
    [visible.length]
  );

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    if (lightbox === null) return;
    document.documentElement.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  return (
    <section id="gallery" className="mx-auto max-w-375 px-5 py-28 sm:px-8 sm:py-40">
      <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="eyebrow">The Gallery</p>
          </div>
          <SplitText
            as="h2"
            text="A closer look."
            className="font-serif text-4xl font-light tracking-tight text-ivory sm:text-6xl"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "relative rounded-full border px-5 py-2 text-xs uppercase tracking-[0.15em] transition-colors",
                filter === cat
                  ? "border-gold text-ink"
                  : "border-line text-stone hover:text-ivory"
              )}
            >
              {filter === cat && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 z-0 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid auto-rows-40 grid-cols-2 gap-3 sm:auto-rows-55 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((img, i) => (
              <motion.button
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightbox(i)}
                data-cursor="View"
                className={cn(
                  "group relative overflow-hidden",
                  img.span ? "col-span-2 row-span-2" : ""
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30" />
                <span className="absolute bottom-3 left-3 translate-y-2 text-xs uppercase tracking-[0.15em] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.category}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && visible[lightbox] && (
          <motion.div
            className="fixed inset-0 z-95 flex items-center justify-center bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 z-10 text-stone transition-colors hover:text-gold"
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 z-10 text-stone transition-colors hover:text-gold sm:left-8"
              aria-label="Previous"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 z-10 text-stone transition-colors hover:text-gold sm:right-8"
              aria-label="Next"
            >
              <ChevronRight className="h-9 w-9" />
            </button>

            <motion.div
              key={visible[lightbox].id}
              className="relative mx-12 h-[70vh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={visible[lightbox].src}
                alt={visible[lightbox].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
              <p className="absolute -bottom-8 left-0 text-xs uppercase tracking-[0.2em] text-stone">
                {visible[lightbox].category} — {lightbox + 1} / {visible.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
