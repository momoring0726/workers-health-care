"use client";

import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: { title: string };
  publishedAt: string;
}

const ITEMS_PER_PAGE = 3;

export function NewsFeedCarousel({ items }: { items: NewsItem[] }) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentItems = items.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No featured news yet.</p>
        <p className="text-gray-500">Check back soon for the latest updates.</p>
      </div>
    );
  }

  return (
    <>
      {/* Carousel Container */}
      <div className="relative">
        {/* News Grid */}
        <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ease-in-out">
          {currentItems.map((item, index) => (
            <Link
              key={item._id}
              href={`/news/${item.slug.current}`}
              className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <article className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-blue-100 hover:border-blue-400 bg-gradient-to-br from-white via-white to-blue-50">
                {/* Gradient Border Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="p-4 flex-grow flex flex-col gap-2.5">
                  {/* Header: Category, Date & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-md whitespace-nowrap">
                        {item.category?.title || "Uncategorized"}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={item.publishedAt}>
                          {new Date(item.publishedAt).toLocaleDateString(
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

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-grow">
                    {item.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-all duration-300 mt-auto">
                    <span className="group-hover:underline">Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
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
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`transition-all duration-300 ${
                currentPage === index
                  ? "bg-blue-600 w-8 h-3 rounded-full"
                  : "bg-gray-300 w-3 h-3 rounded-full hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
              aria-current={currentPage === index ? "page" : undefined}
            />
          ))}
        </div>
      )}

      {/* View All Link */}
      {items.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </>
  );
}
