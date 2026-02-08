"use client";

import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { newsItems } from "@/lib/content";

export default function NewsDetailPage() {
  const params = useParams<{ id?: string | string[] }>();
  const rawId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const normalizedId = rawId ? rawId.split("-")[0] : "";
  const id = Number.parseInt(normalizedId, 10);
  const news = newsItems.find((item) => item.id === id);

  if (!news) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg p-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Article not found
              </h1>
              <p className="text-gray-600">
                The news item you&apos;re looking for doesn&apos;t exist.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl">{news.image}</span>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                  {news.category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <time dateTime={news.date}>{news.date}</time>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {news.title}
              </h1>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                {news.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
