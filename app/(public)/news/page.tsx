import { TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { NewsClientInteractions } from "@/components/NewsClientInteractions";
import { publicClient } from "@/sanity/lib/client-public";
import { ALL_NEWS_QUERY, NEWS_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import type { NewsArticle, NewsCategory } from "@/types";

export const metadata: Metadata = {
  title: "News & Announcements | Workers Health Care",
  description:
    "Stay informed about the latest developments and updates in workers' health care coverage and programs.",
  openGraph: {
    title: "News & Announcements | Workers Health Care",
    description:
      "Stay informed about the latest developments and updates in workers' health care coverage and programs.",
    type: "website",
  },
};

// Server-side data fetching functions
async function getNews(): Promise<NewsArticle[]> {
  try {
    const news = await publicClient.fetch(ALL_NEWS_QUERY);
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

async function getCategories(): Promise<NewsCategory[]> {
  try {
    const categories = await publicClient.fetch(NEWS_CATEGORIES_QUERY);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function NewsPage() {
  // Fetch data server-side
  const newsItems = await getNews();
  const categories = await getCategories();

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
        <NewsClientInteractions
          initialNews={newsItems}
          initialCategories={categories}
        />
      </div>
    </main>
  );
}
