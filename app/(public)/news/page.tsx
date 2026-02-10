"use client";

import {
  Calendar,
  ArrowRight,
  TrendingUp,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: { title: string };
  publishedAt: string;
  featured: boolean;
  featuredImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

interface Category {
  _id: string;
  title: string;
}

const FEATURED_ITEMS_PER_PAGE = 3;

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredPage, setFeaturedPage] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "/api/news?" +
            (selectedCategory ? `category=${selectedCategory}&` : "") +
            (searchQuery ? `search=${searchQuery}` : ""),
        );
        const data = await response.json();
        setNewsItems(data);
        setFeaturedPage(0);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  const filteredNews = newsItems;
  const allFeaturedNews = filteredNews.filter((item) => item.featured);
  const totalFeaturedPages = Math.ceil(
    allFeaturedNews.length / FEATURED_ITEMS_PER_PAGE,
  );
  const featuredNews = allFeaturedNews.slice(
    featuredPage * FEATURED_ITEMS_PER_PAGE,
    (featuredPage + 1) * FEATURED_ITEMS_PER_PAGE,
  );
  const regularNews = filteredNews.filter((item) => !item.featured);

  const handlePrevious = () => {
    setFeaturedPage(
      (prev) => (prev - 1 + totalFeaturedPages) % totalFeaturedPages,
    );
  };

  const handleNext = () => {
    setFeaturedPage((prev) => (prev + 1) % totalFeaturedPages);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/30 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Latest Updates</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">News & Announcements</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Stay informed about the latest developments in workers' health
              care
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl py-12">
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
              {categories.map((category) => (
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

        {/* Featured Articles */}
        {featuredNews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured</h2>

            {/* Carousel Container */}
            <div className="relative">
              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ease-in-out">
                {featuredNews.map((item, index) => (
                  <Link
                    key={item._id}
                    href={`/news/${item.slug.current}`}
                    className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <article className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-blue-100 hover:border-blue-400 bg-gradient-to-br from-white via-white to-blue-50">
                      {/* Gradient Border Top */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                      {/* Featured Image */}
                      {item.featuredImage && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={urlFor(item.featuredImage)
                              .width(600)
                              .height(400)
                              .url()}
                            alt={item.featuredImage.alt || item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

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
                          <span className="group-hover:underline">
                            Read More
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </article>
                  </Link>
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
                    onClick={() => setFeaturedPage(index)}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {allFeaturedNews.length > 0 ? "All News" : "News & Announcements"}
          </h2>
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <Link
                  key={item._id}
                  href={`/news/${item.slug.current}`}
                  className="group"
                >
                  <article className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                    {/* Gradient Overlay Top */}
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Featured Image */}
                    {item.featuredImage && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={urlFor(item.featuredImage)
                            .width(600)
                            .height(400)
                            .url()}
                          alt={item.featuredImage.alt || item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category */}
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg w-fit mb-4">
                        {item.category?.title || "Uncategorized"}
                      </span>

                      {/* Date */}
                      <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={item.publishedAt}>
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </time>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors flex-grow">
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                        <span className="group-hover:underline">Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No news yet.</p>
              <p className="text-gray-500">
                Check back soon for the latest updates.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
