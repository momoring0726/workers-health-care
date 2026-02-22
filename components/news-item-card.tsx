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
      <article className="relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full border border-gray-100 group">
        {/* Card Image */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden">
          <Image
            src={cardImageUrl}
            alt={cardImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-5 md:p-4 flex-grow flex flex-col gap-3 md:gap-2.5">
          {/* Header: Category, Date & Badge */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap border border-blue-100/50">
                {item.category?.title || "Uncategorized"}
              </span>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
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
              <div className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                Featured
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug line-clamp-2 mt-1">
            {item.title}
          </h3>

          {/* Short Description */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mt-1 mb-4">
            {item.shortDescription}
          </p>

          {/* Read More Link */}
          <div className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm group-hover:text-blue-700 transition-all duration-300 mt-auto pt-4 border-t border-gray-50">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300">
              Read More
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </article>
    </Link>
  );
}
