"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@portabletext/react";

interface ImageItem {
  url: string;
  alt?: string;
  caption?: string;
}

export function NewsImageCarousel({ images }: { images: ImageItem[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mb-12">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl h-[500px]">
          <button
            onClick={prevImage}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all ${images.length > 1
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
              }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full h-full">
            <Image
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt || "Article image"}
              fill
              className="object-cover rounded-2xl cursor-zoom-in"
              onClick={() => openLightbox(currentImageIndex)}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />

            {images[currentImageIndex].caption && (
              <div className="absolute bottom-4 left-6 right-6 text-center text-white/90">
                <p className="text-sm italic drop-shadow">
                  {images[currentImageIndex].caption}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={nextImage}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all ${images.length > 1
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
              }`}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${idx === currentImageIndex
                      ? "bg-white w-8"
                      : "bg-white/40 hover:bg-white/60"
                    }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-center text-gray-500">
          Click image to view full size
        </p>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevLightboxImage}
                className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          <div className="relative max-w-7xl max-h-[90vh] mx-auto px-20">
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || "Article image"}
              width={1920}
              height={1080}
              className="max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              priority
            />

            {(images[lightboxIndex].caption || images[lightboxIndex].alt) && (
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-white/90 text-lg">
                  {images[lightboxIndex].caption || images[lightboxIndex].alt}
                </p>
                <p className="text-white/60 text-sm mt-2">
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === lightboxIndex
                      ? "bg-white w-8"
                      : "bg-white/40 hover:bg-white/60"
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-10 mb-5 text-slate-800">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-8 mb-4 text-slate-800">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 my-8 italic text-lg text-slate-700 bg-emerald-50/50">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-slate-700 leading-relaxed text-lg">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-6 space-y-2 text-slate-700 text-lg">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-slate-700 text-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

export function ContentRenderer({ content }: { content: any[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}
