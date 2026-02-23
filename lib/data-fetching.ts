/**
 * Data Fetching Utilities
 * Context7 Best Practices:
 * - Centralized data fetching with error handling
 * - Type-safe queries with proper validation
 * - ISR and revalidation strategy
 * - Consistent error handling across the app
 */

import { publicClient } from "@/sanity/lib/client-public";
import {
  PROGRAMS_QUERY,
  PROGRAM_BY_SLUG_QUERY,
  PROGRAM_SLUGS_QUERY,
  FEATURED_NEWS_QUERY,
  NEWS_SLUGS_QUERY,
  NEWS_BY_SLUG_QUERY,
  CONTACT_QUERY,
  HOSPITALS_QUERY,
} from "@/sanity/lib/queries";
import type {
  SanityProgram,
  NewsArticle,
  NewsArticleDetail,
  Hospital,
} from "@/types";

/**
 * Fetch all programs from Sanity
 * Used for listing and comparison pages
 */
export async function fetchPrograms(): Promise<SanityProgram[]> {
  try {
    const programs = await publicClient.fetch(PROGRAMS_QUERY);
    return programs || [];
  } catch (error) {
    console.error("Failed to fetch programs:", error);
    throw new Error(
      "Unable to load health care plans. Please try again later.",
    );
  }
}

/**
 * Fetch single program by slug
 * Used for program detail pages
 */
export async function fetchProgramBySlug(
  slug: string,
): Promise<SanityProgram | null> {
  try {
    const program = await publicClient.fetch(PROGRAM_BY_SLUG_QUERY, { slug });
    return program || null;
  } catch (error) {
    console.error(`Failed to fetch program with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all program slugs for static generation
 * Used for generateStaticParams
 */
export async function fetchProgramSlugs(): Promise<Array<{ slug: string }>> {
  try {
    const slugs = await publicClient.fetch(PROGRAM_SLUGS_QUERY);
    return slugs || [];
  } catch (error) {
    console.error("Failed to fetch program slugs:", error);
    return [];
  }
}

/**
 * Fetch featured news articles
 * Used for homepage carousel
 */
export async function fetchFeaturedNews(): Promise<NewsArticle[]> {
  try {
    const news = await publicClient.fetch(FEATURED_NEWS_QUERY);
    return news || [];
  } catch (error) {
    console.error("Failed to fetch featured news:", error);
    return [];
  }
}

/**
 * Fetch all news slugs for static generation
 * Used for generateStaticParams
 */
export async function fetchNewsSlugs(): Promise<Array<{ slug: string }>> {
  try {
    const slugs = await publicClient.fetch(NEWS_SLUGS_QUERY);
    return slugs || [];
  } catch (error) {
    console.error("Failed to fetch news slugs:", error);
    return [];
  }
}

/**
 * Fetch single news article by slug
 * Used for news detail pages
 */
export async function fetchNewsBySlug(
  slug: string,
): Promise<NewsArticleDetail | null> {
  try {
    const article = await publicClient.fetch(NEWS_BY_SLUG_QUERY, { slug });
    return article || null;
  } catch (error) {
    console.error(`Failed to fetch news article with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch contact information
 * Used across the app for footer and contact forms
 */
export async function fetchContactData(): Promise<{
  _id: string;
  email: string;
  phones: string[];
  address: string;
} | null> {
  try {
    const contact = await publicClient.fetch(CONTACT_QUERY);
    return contact || null;
  } catch (error) {
    console.error("Failed to fetch contact data:", error);
    return null;
  }
}

/**
 * Fetch all hospitals
 * Used for hospital directory page
 */
export async function fetchHospitals(): Promise<Hospital[]> {
  try {
    const hospitals = await publicClient.fetch(HOSPITALS_QUERY);
    return hospitals || [];
  } catch (error) {
    console.error("Failed to fetch hospitals:", error);
    return [];
  }
}
