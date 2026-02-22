"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  category: { title: string };
  date: string;
  cardImage?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
        dimensions?: { width: number; height: number };
      };
    };
    alt?: string;
  };
}

export function NewsFeedCarousel({ items }: { items: NewsItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-600 text-lg">No featured news available.</p>
        <p className="text-gray-500 mt-2">Check back soon for updates.</p>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const cardImageUrl = currentItem.cardImage
    ? urlFor(currentItem.cardImage).width(1600).height(900).url()
    : "/news-placeholder.svg";
  const fullImageUrl = currentItem.cardImage
    ? urlFor(currentItem.cardImage).url()
    : "/news-placeholder.svg";
  const cardImageAlt = currentItem.cardImage?.alt || currentItem.title;

  const handlePrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="w-full">
      {/* Hero-Style Featured News Section */}
      <div
        className="relative w-full overflow-hidden h-auto md:h-[700px] lg:h-[800px] bg-gradient-to-b from-white via-blue-100 to-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl h-full flex items-center pt-8 pb-32 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start lg:items-center w-full">
            {/* Image Preview (Mobile & Desktop) */}
            <div className="lg:hidden relative w-full aspect-[4/3] sm:aspect-video order-first mb-4">
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src={cardImageUrl}
                  alt={cardImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      View Image
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Left: Content */}
            <div
              className={`transition-all duration-500 ${isTransitioning
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
                }`}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100/50 shadow-sm w-fit">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                <span className="text-blue-700 font-bold text-xs md:text-sm uppercase tracking-widest">
                  {currentItem.category?.title || "Featured"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700 mb-4 md:mb-6 leading-[1.15] tracking-tight">
                {currentItem.title}
              </h2>

              {/* Date */}
              <div className="flex items-center gap-2.5 text-gray-500 mb-6 md:mb-8">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                <time
                  dateTime={currentItem.date}
                  className="text-sm md:text-base lg:text-lg font-medium tracking-wide uppercase"
                >
                  {new Date(currentItem.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-light text-base sm:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl">
                {currentItem.shortDescription}
              </p>

              {/* CTA Button */}
              <Link
                href={`/news/${currentItem.slug.current}`}
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm md:text-base lg:text-lg rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] group hover:-translate-y-1"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            {/* Right: Image Preview (Desktop Only) */}
            <div className="hidden lg:block relative h-96">
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src={cardImageUrl}
                  alt={cardImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md">
                      Click to expand
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {items.length > 1 && (
          <>
            {/* Side Arrows - Desktop only */}
            <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-4 z-20 pointer-events-none">
              <button
                onClick={handlePrevious}
                className="pointer-events-auto p-3 rounded-full bg-blue-600 border border-blue-700 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Previous news"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="pointer-events-auto p-3 rounded-full bg-blue-600 border border-blue-700 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Next news"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Pagination */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 md:gap-6">
              {/* Dots */}
              <div className="flex items-center gap-2 md:gap-3">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-300 rounded-full border ${currentIndex === index
                      ? "bg-blue-600 border-blue-700 w-8 md:w-10 h-2.5 md:h-3"
                      : "bg-gray-400 border-gray-500 w-2.5 md:w-3 h-2.5 md:h-3 hover:bg-gray-500"
                      }`}
                    aria-label={`Go to news ${index + 1}`}
                    aria-current={currentIndex === index ? "page" : undefined}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="text-gray-700 font-semibold text-center text-xs md:text-sm">
                <span className="text-blue-600 font-bold">
                  {currentIndex + 1}
                </span>
                <span className="mx-2 text-gray-500">/</span>
                <span>{items.length}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* View All Button */}
      <div className="container mx-auto px-4 max-w-7xl py-12 text-center">
        <Link
          href="/news"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105 group"
        >
          <span>View All News & Announcements</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 z-10"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full max-w-6xl max-h-[95vh]">
              <Image
                src={fullImageUrl}
                alt={cardImageAlt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
