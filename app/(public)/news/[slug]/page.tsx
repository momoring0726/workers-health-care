"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

interface ImageAsset {
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

interface ContentBlock {
  _type: string;
  _key: string;
  children?: Array<{
    _type: string;
    text: string;
    marks?: string[];
  }>;
  style?: string;
  listItem?: string;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
  asset?: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

interface NewsArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: { title: string; slug: { current: string } };
  publishedAt: string;
  featuredImage: ImageAsset;
  content: ContentBlock[];
}

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState<
    Array<{ url: string; alt?: string; caption?: string }>
  >([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const query = `*[_type == "news" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          excerpt,
          category->{title, slug},
          publishedAt,
          featuredImage{
            asset,
            alt
          },
          content
        }`;

        const data = await client.fetch(query, { slug });

        if (!data) {
          notFound();
        }

        setArticle(data);

        // Extract all images from content
        const images: Array<{ url: string; alt?: string; caption?: string }> =
          [];

        // Add content images (do not include featured image here)
        data.content?.forEach((block: ContentBlock) => {
          if (block._type === "image" && block.asset) {
            images.push({
              url: urlFor(block.asset._ref).url(),
              alt: block.alt || "",
              caption: block.caption || "",
            });
          }
        });

        setImageList(images);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const openLightbox = (imageUrl: string) => {
    const index = imageList.findIndex((img) => img.url === imageUrl);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageList.length) % imageList.length,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, imageList.length]);

  const renderContent = (content: ContentBlock[]) => {
    return content.map((block) => {
      if (block._type === "block") {
        const text = block.children?.map((child) => child.text).join("") || "";

        switch (block.style) {
          case "h2":
            return (
              <h2
                key={block._key}
                className="text-3xl font-bold mt-12 mb-6 text-slate-900"
              >
                {text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={block._key}
                className="text-2xl font-semibold mt-10 mb-5 text-slate-800"
              >
                {text}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={block._key}
                className="text-xl font-semibold mt-8 mb-4 text-slate-800"
              >
                {text}
              </h4>
            );
          case "blockquote":
            return (
              <blockquote
                key={block._key}
                className="border-l-4 border-emerald-500 pl-6 py-2 my-8 italic text-lg text-slate-700 bg-emerald-50/50"
              >
                {text}
              </blockquote>
            );
          default:
            if (block.listItem === "bullet") {
              return (
                <li
                  key={block._key}
                  className="ml-6 mb-2 text-slate-700 leading-relaxed"
                >
                  {text}
                </li>
              );
            }
            if (block.listItem === "number") {
              return (
                <li
                  key={block._key}
                  className="ml-6 mb-2 text-slate-700 leading-relaxed list-decimal"
                >
                  {text}
                </li>
              );
            }
            return (
              <p
                key={block._key}
                className="mb-6 text-slate-700 leading-relaxed text-lg"
              >
                {text}
              </p>
            );
        }
      }

      if (block._type === "image" && block.asset) {
        const imageUrl = urlFor(block.asset._ref).url();
        return (
          <figure key={block._key} className="my-12 group">
            <div
              className="relative overflow-hidden rounded-2xl shadow-2xl cursor-zoom-in transition-all duration-500 hover:shadow-3xl"
              onClick={() => openLightbox(imageUrl)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <ZoomIn className="w-5 h-5 text-slate-700" />
              </div>
              <Image
                src={imageUrl}
                alt={block.alt || "Article image"}
                width={1200}
                height={800}
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {block.caption && (
              <figcaption className="mt-4 text-center text-sm text-slate-600 italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      return null;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const featuredImageUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage.asset._ref).url()
    : null;

  return (
    <>
      <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          {/* Background Image with Parallax Effect */}
          {featuredImageUrl && (
            <div className="absolute inset-0">
              <Image
                src={featuredImageUrl}
                alt={article.featuredImage.alt || article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </div>
          )}

          {/* Back Button */}
          <Link
            href="/news"
            className="absolute top-8 left-8 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:gap-3 group z-10"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to News</span>
          </Link>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 pb-16 max-w-5xl">
              <div className="space-y-6 animate-fade-in">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                  {article.category.title}
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                  {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <time className="text-sm font-medium">
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </time>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-xl text-white/95 max-w-3xl leading-relaxed drop-shadow-lg">
                  {article.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {renderContent(article.content)}
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Navigation Buttons */}
          {imageList.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {/* Image Display */}
          <div className="relative max-w-7xl max-h-[90vh] mx-auto px-20">
            <Image
              src={imageList[currentImageIndex].url}
              alt={imageList[currentImageIndex].alt || "Article image"}
              width={1920}
              height={1080}
              className="max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl animate-scale-in"
              priority
            />

            {/* Image Caption */}
            {(imageList[currentImageIndex].caption ||
              imageList[currentImageIndex].alt) && (
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-white/90 text-lg">
                  {imageList[currentImageIndex].caption ||
                    imageList[currentImageIndex].alt}
                </p>
                <p className="text-white/60 text-sm mt-2">
                  {currentImageIndex + 1} / {imageList.length}
                </p>
              </div>
            )}
          </div>

          {/* Image Counter */}
          {imageList.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {imageList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
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
