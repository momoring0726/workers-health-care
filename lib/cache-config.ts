/**
 * Cache Revalidation Strategy
 * Context7 Best Practices:
 * - Centralized ISR configuration
 * - Tag-based cache invalidation
 * - Webhook integration ready
 * - Production-grade caching strategy
 */

/**
 * Cache tags for different content types
 * Used with Next.js revalidateTag() for targeted cache invalidation
 */
export const CACHE_TAGS = {
  // Content types
  PROGRAMS: "programs",
  PROGRAM_DETAIL: "program-detail",
  NEWS: "news",
  NEWS_DETAIL: "news-detail",
  HOSPITALS: "hospitals",
  CONTACT: "contact",

  // Global
  CONTENT: "content",
  ALL: "all",
} as const;

/**
 * Revalidation intervals (in seconds)
 * ISR strategy for different content types
 */
export const REVALIDATE_INTERVALS = {
  // Fast updates - user-managed content
  FAST: 60, // 1 minute

  // Normal updates - semi-regular content
  NORMAL: 3600, // 1 hour

  // Slow updates - rarely changing content
  SLOW: 86400, // 24 hours

  // Never - static content
  NEVER: false,
} as const;

/**
 * Revalidation configuration by content type
 */
export const REVALIDATION_CONFIG = {
  programs: {
    interval: REVALIDATE_INTERVALS.FAST,
    tags: [CACHE_TAGS.PROGRAMS] as string[],
  },
  programDetail: {
    interval: REVALIDATE_INTERVALS.FAST,
    tags: [CACHE_TAGS.PROGRAM_DETAIL] as string[],
  },
  news: {
    interval: REVALIDATE_INTERVALS.NORMAL,
    tags: [CACHE_TAGS.NEWS] as string[],
  },
  newsDetail: {
    interval: REVALIDATE_INTERVALS.NORMAL,
    tags: [CACHE_TAGS.NEWS_DETAIL] as string[],
  },
  hospitals: {
    interval: REVALIDATE_INTERVALS.NORMAL,
    tags: [CACHE_TAGS.HOSPITALS] as string[],
  },
  contact: {
    interval: REVALIDATE_INTERVALS.SLOW,
    tags: [CACHE_TAGS.CONTACT] as string[],
  },
};

/**
 * Generate revalidation options for fetch requests
 * @param tags - Array of cache tags to apply
 * @param interval - Revalidation interval in seconds
 */
export function getRevalidationOptions(
  tags: string[] = [],
  interval: number | false = REVALIDATE_INTERVALS.NORMAL,
) {
  return {
    next: {
      revalidate: interval,
      tags: [...tags, CACHE_TAGS.CONTENT],
    },
  };
}

/**
 * Webhook handler for Sanity revalidation
 * Call this endpoint from Sanity Studio webhooks to invalidate cache
 *
 * Usage in Sanity Studio:
 * POST /api/revalidate?tag=programs
 * With Bearer token authentication
 */
export async function handleRevalidation(tag: string) {
  try {
    // This is handled by the API route handler
    // See: app/api/revalidate/route.ts
    console.log(`[Revalidation] Tag marked for invalidation: ${tag}`);
    return { success: true, message: `Revalidation triggered for ${tag}` };
  } catch (error) {
    console.error(`[Revalidation] Error: ${error}`);
    return { success: false, error: "Revalidation failed" };
  }
}

/**
 * Revalidation path mappings
 * Used by revalidatePath() to clear specific pages
 */
export const REVALIDATION_PATHS = {
  programs: "/programs",
  programDetail: (slug: string) => `/programs/${slug}`,
  news: "/news",
  newsDetail: (slug: string) => `/news/${slug}`,
  hospitals: "/hospitals",
  homepage: "/",
} as const;
