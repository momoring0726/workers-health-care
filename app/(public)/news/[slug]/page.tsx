import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: { title: string };
  publishedAt: string;
  content: any[];
}

async function getNewsItem(slug: string): Promise<NewsItem | null> {
  try {
    const data = await client.fetch(
      `*[_type == "news" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        category->{
          title
        },
        publishedAt,
        content
      }`,
      { slug },
      {
        next: {
          revalidate: 0,
          tags: ["news"],
        },
      },
    );
    return data || null;
  } catch (error) {
    console.error("Error fetching news item:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsItem(slug);

  if (!news) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: news.title,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsItem(slug);

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
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </section>

      <article className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border-2 border-blue-200 rounded-2xl shadow-lg p-10 md:p-12">
            {/* Category */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">
                {news.category?.title || "Uncategorized"}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <time dateTime={news.publishedAt}>
                  {new Date(news.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {news.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-10 pb-10 border-b-2 border-gray-200">
              {news.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-4">
                <PortableText
                  value={news.content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
                          {children}
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => (
                        <li className="text-gray-700">{children}</li>
                      ),
                      number: ({ children }) => (
                        <li className="text-gray-700">{children}</li>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                      code: ({ children }) => (
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {children}
                        </code>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
