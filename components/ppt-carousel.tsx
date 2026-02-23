"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { pptSlides as slides } from "@/lib/content";

export function PptCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      if (!emblaApi) return;
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation (Left/Right)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi]);

  // Use instant scroll on click for faster perceived response
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(true), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(true), [emblaApi]);

  const captionFor = (name: string) => {
    // derive a nicer caption from filename
    return name
      .replace(/\.(jpg|jpeg|png|gif)/i, "")
      .replace(/Slide/i, "Slide ");
  };

  return (
    <section className="bg-white py-6 sm:py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Plan Statistics & Benefits
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-600">
            Statistics and a summary of benefits for our HMO plans — use arrows
            or swipe to navigate.
          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden w-full"
            ref={emblaRef}
            style={{ touchAction: "pan-y" }}
          >
            <div className="flex">
              {slides.map((name, index) => (
                <div
                  key={index}
                  className="min-w-full flex-shrink-0 flex items-center justify-center relative"
                >
                  <img
                    src={`/WHC-PPT/${name}`}
                    alt={`Slide ${index + 1}`}
                    className="w-auto max-w-[640px] sm:max-w-[720px] md:max-w-[800px] h-auto max-h-[40vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain mx-auto"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute left-2 bottom-2 rounded bg-black/60 px-2 py-0.5 text-xs sm:text-sm text-white">
                    {captionFor(name)} — {index + 1}/{slides.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={scrollPrev}
              aria-label="Previous"
              className="rounded-full bg-white/90 p-3 sm:p-4 shadow hover:bg-white/95"
              style={{ fontSize: 20 }}
            >
              ‹
            </button>
          </div>

          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={scrollNext}
              aria-label="Next"
              className="rounded-full bg-white/90 p-3 sm:p-4 shadow hover:bg-white/95"
              style={{ fontSize: 20 }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
