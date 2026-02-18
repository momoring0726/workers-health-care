"use client";

import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { NewsContent } from "./NewsContent";
import type {
  NewsArticle,
  NewsCategory,
  NewsClientInteractionsProps,
} from "@/types";

const FEATURED_ITEMS_PER_PAGE = 3;

export function NewsClientInteractions({
  initialNews,
  initialCategories,
  onFilteredNewsChange,
}: NewsClientInteractionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredPage, setFeaturedPage] = useState(0);

  // Update news items when filters change
  const filteredNews = initialNews.filter((item) => {
    const matchesCategory =
      !selectedCategory || item.category?.title === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allFeaturedNews = filteredNews.filter((item) => item.featured);
  const totalFeaturedPages = Math.ceil(
    allFeaturedNews.length / FEATURED_ITEMS_PER_PAGE,
  );

  const handlePrevious = () => {
    setFeaturedPage(
      (prev) => (prev - 1 + totalFeaturedPages) % totalFeaturedPages,
    );
  };

  const handleNext = () => {
    setFeaturedPage((prev) => (prev + 1) % totalFeaturedPages);
  };

  // Reset page when filters change
  useEffect(() => {
    setFeaturedPage(0);
  }, [selectedCategory, searchQuery]);

  // Notify parent of filtered news changes
  useEffect(() => {
    onFilteredNewsChange?.(filteredNews);
  }, [filteredNews, onFilteredNewsChange]);

  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search news and announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

      {/* News Content */}
      <NewsContent
        filteredNews={filteredNews}
        featuredPage={featuredPage}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </>
  );
}
