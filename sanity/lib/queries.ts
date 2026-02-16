import { defineQuery } from "next-sanity";
import { SINGLETON_IDS } from "../constants";

// Image fragment for reuse
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

// Featured news query
export const FEATURED_NEWS_QUERY = defineQuery(`
  *[_type == "news" && featured == true] | order(date desc) {
    _id,
    title,
    slug,
    shortDescription,
    category->{
      title
    },
    date,
    "cardImage": content[_type == "image"][0] ${imageFragment}
  }
`);

// Single news article by slug
export const NEWS_BY_SLUG_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    category->{
      title
    },
    date,
    content[] {
      ...,
      _type == "image" => {
        ...${imageFragment}
      }
    }
  }
`);

// All news articles
export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(date desc) {
    _id,
    title,
    slug,
    shortDescription,
    category->{
      title
    },
    date,
    featured,
    "cardImage": content[_type == "image"][0] ${imageFragment}
  }
`);

// Static params for news slugs
export const NEWS_SLUGS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)] {
    "slug": slug.current
  }
`);

// Contact information
export const CONTACT_QUERY = defineQuery(`
  *[_type == "contact" && _id == "${SINGLETON_IDS.CONTACT}"][0] {
    email,
    phones,
    address
  }
`);

// All hospitals
export const HOSPITALS_QUERY = defineQuery(`
  *[_type == "hospital"] | order(name asc) {
    _id,
    name,
    type,
    location->{
      _id,
      name
    },
    url
  }
`);

// Categories for news filtering
export const NEWS_CATEGORIES_QUERY = defineQuery(`
  *[_type == "newsCategory"] | order(title asc) {
    _id,
    title
  }
`);
