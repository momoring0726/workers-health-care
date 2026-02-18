import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import type { NewsArticleDetail } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { publicClient } from "@/sanity/lib/client-public";
import { NEWS_BY_SLUG_QUERY, NEWS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { NewsImageCarousel, ContentRenderer } from "./NewsDetailClient";
import { REVALIDATION_CONFIG } from "@/lib/cache-config";

// ISR: Revalidate every hour for news details
export const revalidate = 3600;

// Generate static params for all news articles
export async function generateStaticParams() {
  const slugs = await publicClient.fetch(
    NEWS_SLUGS_QUERY,
    {},
    {
      next: {
        tags: REVALIDATION_CONFIG.news.tags,
      },
    },
  );
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

// Fetch article data server-side
async function getArticle(slug: string): Promise<NewsArticleDetail | null> {
  try {
    const article = await publicClient.fetch(
      NEWS_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          revalidate: 3600, // Use webhook for instant updates
          tags: REVALIDATION_CONFIG.newsDetail.tags,
        },
      },
    );
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// Dynamic metadata generation for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Workers Health Care",
      description: "The requested article could not be found.",
    };
  }

  const ogImage = article.cardImage
    ? urlFor(article.cardImage).width(1200).height(630).url()
    : null;

  return {
    title: `${article.title} | Workers Health Care`,
    description: article.shortDescription,
    openGraph: {
      title: article.title,
      description: article.shortDescription,
      type: "article",
      publishedTime: article.date,
      url: `/news/${article.slug.current}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.shortDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  // Extract images from content
  const images = article.content
    .filter((block) => block._type === "image" && block.asset)
    .map((block) => ({
      url: urlFor(block.asset!).url(),
      alt: block.alt || "",
      caption: block.caption || "",
    }));

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative h-[30vh] md:h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-700 via-emerald-600 to-slate-900" />

        <Link
          href="/news"
          className="absolute top-8 left-8 flex items-center gap-2 px-6 py-3 bg-white/95 text-emerald-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:gap-3 group z-10"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to News</span>
        </Link>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-20 max-w-5xl">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                {article.category.title}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time className="text-sm font-medium">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>

              <p className="text-lg text-white/95 max-w-3xl leading-relaxed drop-shadow-lg">
                {article.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <NewsImageCarousel images={images} />
        <ContentRenderer content={article.content} />
      </div>
    </article>
  );
}
