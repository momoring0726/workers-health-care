/**
 * News Item Card Component
 * Reusable card component for displaying individual news articles
 *
 * Best Practices Applied:
 * - Server Component (no hooks or interactivity)
 * - Extracted from NewsContent for reusability
 * - Type-safe with centralized types
 * - Optimized Next.js Image usage with proper sizing
 */

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface NewsItemCardProps {
  item: NewsArticle;
  showFeaturedBadge?: boolean;
}

export function NewsItemCard({
  item,
  showFeaturedBadge = false,
}: NewsItemCardProps) {
  const cardImageUrl = item.cardImage
    ? urlFor(item.cardImage).width(600).height(400).url()
    : "/news-placeholder.svg";
  const cardImageAlt = item.cardImage?.alt || item.title;

  return (
    <Link
      href={`/news/${item.slug.current}`}
      className="group"
      aria-label={`Read article: ${item.title}`}
    >
      <article className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-blue-100 hover:border-blue-400 bg-gradient-to-br from-white via-white to-blue-50">
        {/* Gradient Border Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Card Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={cardImageUrl}
            alt={cardImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4 flex-grow flex flex-col gap-2.5">
          {/* Header: Category, Date & Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-md whitespace-nowrap">
                {item.category?.title || "Uncategorized"}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Calendar className="w-3 h-3" />
                <time dateTime={item.date}>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
            {showFeaturedBadge && (
              <div className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-md shadow-sm">
                Featured
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight line-clamp-2">
            {item.title}
          </h3>

          {/* Short Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-grow">
            {item.shortDescription}
          </p>

          {/* Read More Link */}
          <div className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-all duration-300 mt-auto">
            <span className="group-hover:underline">Read More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </article>
    </Link>
  );
}
