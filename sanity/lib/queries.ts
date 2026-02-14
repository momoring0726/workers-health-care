import { defineQuery } from "next-sanity";

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
  alt
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
    excerpt,
    category->{
      title
    },
    publishedAt,
    featuredImage ${imageFragment},
    content[] {
      ...,
      _type == "image" => {
        ...${imageFragment},
        caption
      }
    }
  }
`);

// All news articles
export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category->{
      title
    },
    publishedAt,
    featured,
    featuredImage ${imageFragment}
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
  *[_type == "contact" && _id == "d74f0679-a2c2-454f-b4f5-e1ad553393a2"][0] {
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
