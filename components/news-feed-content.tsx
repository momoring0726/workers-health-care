import { Calendar, TrendingUp } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { NewsFeedCarousel } from "./news-feed-carousel";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: { title: string };
  publishedAt: string;
  featuredImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

async function getNews(): Promise<NewsItem[]> {
  try {
    const data = await client.fetch(
      `*[_type == "news" && featured == true] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        category->{
          title
        },
        publishedAt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }`,
      {},
      {
        next: {
          revalidate: 0,
          tags: ["news"],
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
    <section className="news-section py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Featured News</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            News & Announcements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest developments in workers' health care
          </p>
        </div>

        {/* News Carousel */}
        <NewsFeedCarousel items={items} />
      </div>
    </section>
  );
}
