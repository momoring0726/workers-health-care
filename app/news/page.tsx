"use client";

import { Calendar, ArrowRight, TrendingUp, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const newsItems = [
    {
      id: 1,
      title: "Workers' Health Initiative Launches",
      date: "Feb 1, 2026",
      excerpt:
        "A new program to improve workplace health awareness launches this spring. Learn how employers can enroll.",
      content:
        "This groundbreaking initiative aims to revolutionize workplace health by providing comprehensive resources and support to both employers and workers. The program includes training, wellness workshops, and direct access to healthcare professionals.",
      href: "/programs/1",
      category: "Program Launch",
      featured: true,
      image: "🏥",
    },
    {
      id: 2,
      title: "Free Screening Clinics Announced",
      date: "Jan 20, 2026",
      excerpt:
        "Mobile clinics will visit partnering hospitals to offer free screenings to eligible workers.",
      content:
        "Starting next month, our mobile health clinics will visit major workplaces and partner hospitals across the region. These free clinics offer comprehensive health screenings including blood pressure checks, cholesterol testing, and general wellness assessments.",
      href: "/hospitals",
      category: "Healthcare",
      featured: false,
      image: "🩺",
    },
    {
      id: 3,
      title: "New Telehealth Options Available",
      date: "Dec 15, 2025",
      excerpt:
        "We're expanding telehealth coverage so workers can access care from home or on-site.",
      content:
        "Workers can now access telehealth services 24/7 through our expanded platform. This includes virtual consultations with licensed physicians, mental health support, and prescription management services.",
      href: "/programs/2",
      category: "Technology",
      featured: false,
      image: "📱",
    },
    {
      id: 4,
      title: "Mental Health Support Program Expansion",
      date: "Dec 1, 2025",
      excerpt:
        "Additional mental health resources and counseling services now available to all participants.",
      content:
        "In response to growing demand, we've expanded our mental health support services to include 24/7 crisis support, peer support groups, and specialized counseling for workplace stress and burnout.",
      href: "/programs/1",
      category: "Mental Health",
      featured: true,
      image: "🧠",
    },
    {
      id: 5,
      title: "Partnership with Major Hospitals",
      date: "Nov 10, 2025",
      excerpt:
        "We're partnering with leading hospitals to provide comprehensive care networks for workers.",
      content:
        "This partnership strengthens our commitment to providing quality healthcare. Workers gain access to specialty care, emergency services, and coordinated treatment at partner facilities.",
      href: "/hospitals",
      category: "Partnerships",
      featured: false,
      image: "🤝",
    },
    {
      id: 6,
      title: "Q1 2026 Health Goals and Updates",
      date: "Oct 30, 2025",
      excerpt:
        "Learn about our ambitious goals for the first quarter and how we plan to achieve them.",
      content:
        "Our Q1 objectives focus on increasing participation rates, improving health outcomes, and expanding our geographic reach. We're committed to reaching 50,000 new workers by the end of the quarter.",
      href: "/programs",
      category: "Updates",
      featured: false,
      image: "🎯",
    },
  ];

  const categories = [
    "Program Launch",
    "Healthcare",
    "Technology",
    "Mental Health",
    "Partnerships",
    "Updates",
  ];

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.filter((item) => item.featured).slice(0, 2);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
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
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredNews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-white border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                  <div className="p-8 flex flex-col h-full">
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{item.image}</span>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">
                        {item.category}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={item.date}>{item.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Content */}
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {item.content}
                    </p>

                    {/* Read More Link */}
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold group/link hover:text-blue-700"
                    >
                      <span className="group-hover/link:underline">
                        Read Full Story
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All News Articles */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {featuredNews.length > 0 ? "All News" : "News & Announcements"}
          </h2>
          {regularNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((item) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
                >
                  {/* Gradient Overlay Top */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="p-6 flex-grow">
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{item.image}</span>
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                        {item.category}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={item.date}>{item.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
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
                    >
                      <span className="group-hover/link:underline">
                        Read Full Story
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No news items match your search criteria.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
