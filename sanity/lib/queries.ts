import { defineQuery } from "next-sanity";
import { SINGLETON_IDS } from "../constants";

/**
 * Optimized image fragment for card and display images
 * Fetches only essential metadata for responsive image optimization
 * Follows Sanity best practices to reduce query payload
 */
export const imageFragment = `{
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height }
    }
  },
  alt,
  caption
}`;

/**
 * Lightweight image fragment for list views
 * Reduces payload by omitting non-essential fields
 */
export const lightImageFragment = `{
  asset->{ _id, url },
  alt
}`;

/**
 * Featured news query - optimized for homepage carousel
 * Only fetches featured articles with essential fields
 * Sorted by date DESC for latest content first
 */
export const FEATURED_NEWS_QUERY = defineQuery(`
  *[_type == "news" && featured == true] | order(date desc) {
    _id,
    title,
    slug { current },
    shortDescription,
    category->{ title },
    date,
    "cardImage": content[_type == "image"][0] ${imageFragment}
  }
`);

/**
 * Single news article query by slug
 * Includes full content for article display
 * Uses spread operator to preserve all content block types
 */
export const NEWS_BY_SLUG_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug { current },
    shortDescription,
    category->{ title },
    date,
    content[] {
      ...,
      _type == "image" => {
        ...${imageFragment}
      }
    }
  }
`);

/**
 * All news articles query - optimized for filtering and search
 * Includes lightweight image for list display
 * Essential for client-side filtering by category and search
 */
export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(date desc) {
    _id,
    title,
    slug { current },
    shortDescription,
    category->{ title },
    date,
    featured,
    "cardImage": content[_type == "image"][0] ${imageFragment}
  }
`);

/**
 * Generate static params for news articles
 * Optimized query that only fetches slugs
 * Used by Next.js generateStaticParams for ISR
 */
export const NEWS_SLUGS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)] | order(_createdAt desc) {
    "slug": slug.current
  }
`);

/**
 * Contact information query
 * Singleton query for global contact data
 */
export const CONTACT_QUERY = defineQuery(`
  *[_type == "contact" && _id == "${SINGLETON_IDS.CONTACT}"][0] {
    email,
    phones,
    address
  }
`);

/**
 * All hospitals query
 * Fetches hospital data with location references
 * Sorted alphabetically for consistent display
 */
export const HOSPITALS_QUERY = defineQuery(`
  *[_type == "hospital"] | order(name asc) {
    _id,
    name,
    type,
    location->{ _id, name },
    url
  }
`);

/**
 * News categories query
 * Lightweight query for category filtering
 * Sorted alphabetically for consistent UI
 */
export const NEWS_CATEGORIES_QUERY = defineQuery(`
  *[_type == "newsCategory"] | order(title asc) {
    _id,
    title
  }
`);

/**
 * All programs query
 * Fetches all active insurance programs
 * Sorted by display order
 */
export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program" && isActive == true] | order(order asc) {
    _id,
    title,
    slug { current },
    description,
    features,
    pricing,
    order,
    highlighted
  }
`);

/**
 * Single program by slug
 * Fetches complete program details including benefits
 */
export const PROGRAM_BY_SLUG_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    slug { current },
    description,
    features,
    pricing,
    benefits[] {
      title,
      description
    },
    hospitalizationRates[] {
      category,
      monthly,
      annual
    },
    eligibilitySchedule[] {
      period,
      benefit
    },
    notes
  }
`);

/**
 * Programs for static page generation
 * Lightweight query just for slugs
 */
export const PROGRAM_SLUGS_QUERY = defineQuery(`
  *[_type == "program" && isActive == true] | order(_createdAt desc) {
    "slug": slug.current
  }
`);
