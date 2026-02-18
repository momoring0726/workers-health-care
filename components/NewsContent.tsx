import {
  Calendar,
  ArrowRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  category: { title: string };
  date: string;
  featured: boolean;
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

const FEATURED_ITEMS_PER_PAGE = 3;

interface NewsContentProps {
  filteredNews: NewsItem[];
  featuredPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

export function NewsContent({
  filteredNews,
  featuredPage,
  handlePrevious,
  handleNext,
}: NewsContentProps) {
  const allFeaturedNews = filteredNews.filter((item) => item.featured);
  const totalFeaturedPages = Math.ceil(
    allFeaturedNews.length / FEATURED_ITEMS_PER_PAGE,
  );
  const featuredNews = allFeaturedNews.slice(
    featuredPage * FEATURED_ITEMS_PER_PAGE,
    (featuredPage + 1) * FEATURED_ITEMS_PER_PAGE,
  );
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <>
      {/* Featured Articles */}
      {featuredNews.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured</h2>

          {/* Carousel Container */}
          <div className="relative">
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ease-in-out">
              {featuredNews.map((item, index) => {
                const cardImageUrl = item.cardImage
                  ? urlFor(item.cardImage).width(600).height(400).url()
                  : "/news-placeholder.svg";
                const cardImageAlt = item.cardImage?.alt || item.title;

                return (
                  <Link
                    key={item._id}
                    href={`/news/${item.slug.current}`}
                    className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
                    // Avoid mixing `animation` shorthand (from classes) with the
                    // `animationDelay` longhand here — setting longhand while a
                    // shorthand is present causes React's runtime warning. We
                    // remove the inline `animationDelay` to prevent the conflict.
                    style={{}}
                  >
                    <article className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-blue-100 hover:border-blue-400 bg-gradient-to-br from-white via-white to-blue-50">
                      {/* Gradient Border Top */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                      {/* Card Image */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={cardImageUrl}
                          alt={cardImageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                                {new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "numeric" },
                                )}
                              </time>
                            </div>
                          </div>
                          <div className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-md shadow-sm">
                            Featured
                          </div>
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
                          <span className="group-hover:underline">
                            Read More
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Navigation Controls */}
            {totalFeaturedPages > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-2 md:p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-110 hidden sm:flex items-center justify-center"
                  aria-label="Previous news"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-2 md:p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-110 hidden sm:flex items-center justify-center"
                  aria-label="Next news"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Pagination Dots */}
          {totalFeaturedPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              {Array.from({ length: totalFeaturedPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {} /* This will be handled by parent */}
                  className={`transition-all duration-300 ${
                    featuredPage === index
                      ? "bg-blue-600 w-8 h-3 rounded-full"
                      : "bg-gray-300 w-3 h-3 rounded-full hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={featuredPage === index ? "page" : undefined}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* All News Articles */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {allFeaturedNews.length > 0 ? "All News" : "News & Announcements"}
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
        </div>
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, idx) => {
              const cardImageUrl = item.cardImage
                ? urlFor(item.cardImage).width(600).height(400).url()
                : "/news-placeholder.svg";
              const cardImageAlt = item.cardImage?.alt || item.title;

              return (
                <Link
                  key={item._id}
                  href={`/news/${item.slug.current}`}
                  className="group block"
                  // Combine the animation delay into the shorthand to avoid
                  // mixing shorthand and longhand properties at runtime.
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 50}ms forwards`,
                    opacity: 0,
                  }}
                >
                  <article className="relative h-full bg-white overflow-hidden transition-all duration-500 ease-out group-hover:shadow-2xl border-2 border-slate-200 group-hover:border-blue-500">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>

                    {/* Animated border accent lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 delay-100"></div>
                      <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 delay-100"></div>
                    </div>

                    <div className="relative flex flex-col h-full">
                      {/* Image Container with overlay gradient */}
                      <div className="relative w-full h-56 overflow-hidden bg-slate-100">
                        <Image
                          src={cardImageUrl}
                          alt={cardImageAlt}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        />
                        {/* Overlay gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Floating category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-4 py-1.5 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold tracking-wider uppercase shadow-lg border-l-4 border-blue-500">
                            {item.category?.title || "Uncategorized"}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col flex-grow p-6 bg-white">
                        {/* Date with custom styling */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium tracking-wide">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <time dateTime={item.date} className="uppercase">
                              {new Date(item.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                            {Math.ceil(Math.random() * 5 + 2)} min read
                          </div>
                        </div>

                        {/* Title with distinctive typography */}
                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {item.title}
                        </h3>

                        {/* Short Description with refined styling */}
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light">
                          {item.shortDescription}
                        </p>

                        {/* Read more with animated arrow */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors tracking-wide uppercase">
                            Read Article
                          </span>
                          <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-500 flex items-center justify-center transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>

                        {/* Decorative bottom accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-700 text-xl font-semibold mb-2">
              No news articles found
            </p>
            <p className="text-slate-500">
              Try adjusting your filters or check back soon for the latest
              updates.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
