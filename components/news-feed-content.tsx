import { TrendingUp } from "lucide-react";
import { publicClient } from "@/sanity/lib/client-public";
import { FEATURED_NEWS_QUERY } from "@/sanity/lib/queries";
import { NewsFeedCarousel } from "./news-feed-carousel";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  category: { title: string };
  date: string;
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

import { REVALIDATION_CONFIG } from "@/lib/cache-config";

async function getNews(): Promise<NewsItem[]> {
  try {
    const data = await publicClient.fetch(
      FEATURED_NEWS_QUERY,
      {},
      {
        next: {
          revalidate: 0, // Use webhook for instant updates
          tags: REVALIDATION_CONFIG.news.tags,
        },
      },
    );
    return data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function NewsFeedContent() {
  const items = await getNews();

  return (
    <section className="news-section py-24 bg-gradient-to-b from-white via-blue-100 to-white">
      {/* Section Header */}
      <div className="container mx-auto px-4 max-w-7xl mb-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-bold mb-8 uppercase tracking-wider shadow-lg">
            <TrendingUp className="w-5 h-5" />
            <span>Latest Updates</span>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-gray-900">News &</span>{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-transparent bg-clip-text">
              Announcements
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-xl md:text-2xl leading-relaxed font-light">
            Stay informed with the latest updates and important announcements
          </p>
        </div>
      </div>

      {/* Banner Carousel - Full Width */}
      <NewsFeedCarousel items={items} />
    </section>
  );
}
