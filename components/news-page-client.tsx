"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import type { NewsArticle, NewsCategory } from "@/types";
import { NewsItemCard } from "./news-item-card";

interface NewsPageClientProps {
  initialNews: NewsArticle[];
  initialCategories: NewsCategory[];
}

export function NewsPageClient({
  initialNews,
  initialCategories,
}: NewsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = useMemo(() => {
    return initialNews.filter((item) => {
      const matchesCategory =
        !selectedCategory || item.category?.title === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialNews, selectedCategory, searchQuery]);

  const featuredNews = filteredNews.filter((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <div className="space-y-12">
      {/* Search and Filter Section */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search news and announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <Filter className="w-4 h-4" />
            <span>Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {initialCategories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.title)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.title
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Featured</h2>
            <p className="text-gray-600">
              Highlighted news and important announcements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((item) => (
              <div key={item._id} className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
                <div className="relative h-full">
                  <NewsItemCard item={item} showFeaturedBadge />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All News Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1" />
          <h2 className="text-3xl font-bold text-gray-900 whitespace-nowrap">
            {featuredNews.length > 0 ? "All News" : "News & Announcements"}
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1" />
        </div>

        {regularNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item) => (
              <div key={item._id} className="animate-fade-in h-full">
                <NewsItemCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-700 text-xl font-semibold mb-2">
              No news articles found
            </p>
            <p className="text-gray-500">
              Try adjusting your filters or check back soon for the latest
              updates.
            </p>
          </div>
        )}
      </section>

      {/* Results Summary */}
      {filteredNews.length > 0 && (
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Showing {filteredNews.length} article
            {filteredNews.length !== 1 ? "s" : ""}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>
      )}
    </div>
  );
}
