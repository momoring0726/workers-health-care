import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { NewsContentProps } from "@/types";
import { NewsItemCard } from "./news-item-card";

const FEATURED_ITEMS_PER_PAGE = 3;

/**
 * NewsContent Component
 * Displays featured and regular news articles with pagination
 *
 * Best Practices:
 * - Server Component (stateless presentation)
 * - Delegates state management to parent (NewsClientInteractions)
 * - Delegates interactivity to parent via callbacks
 * - Uses NewsItemCard for reusable article display
 * - Follows Next.js composition patterns
 */
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

  return (
    <>
      {/* Featured Articles Section */}
      {featuredNews.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured</h2>

          {/* Carousel Container */}
          <div className="relative">
            {/* Featured News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ease-in-out">
              {featuredNews.map((item) => (
                <div
                  key={item._id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <NewsItemCard item={item} showFeaturedBadge />
                </div>
              ))}
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
                  onClick={() => {} /* Pagination handled by parent */}
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

      {/* All News Articles Section */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1" />
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {allFeaturedNews.length > 0 ? "All News" : "News & Announcements"}
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1" />
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, idx) => (
              <div
                key={item._id}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 50}ms forwards`,
                  opacity: 0,
                }}
              >
                <NewsItemCard item={item} />
              </div>
            ))}
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
