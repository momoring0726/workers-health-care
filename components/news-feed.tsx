"use client";

import { Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { newsItems } from "@/lib/content";

export function NewsFeed() {
  const items = newsItems.slice(0, 3);

  return (
    <section className="news-section py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Latest Updates</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            News & Announcements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest developments in workers' health care
          </p>
        </div>

        {/* News Grid */}
        <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
              aria-labelledby={`news-${item.id}`}
            >
              {/* Gradient Overlay Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="p-6 flex-grow">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                </div>

                {/* Title */}
                <h3
                  id={`news-${item.id}`}
                  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2"
                >
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href={item.href}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group/link"
                  aria-label={`Read more about ${item.title}`}
                >
                  <span className="group-hover/link:underline">
                    Read Full Story
                  </span>
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 bg-blue-200 group-hover:bg-blue-500 transition-all duration-300"></div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>View All News</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
