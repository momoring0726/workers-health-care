/**
 * Centralized type definitions following Next.js/React best practices
 * Sourced from Sanity schema and application requirements
 */

export interface SanityAsset {
  _id: string;
  url: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface SanityImage {
  asset?: SanityAsset;
  alt?: string;
  caption?: string;
}

export interface NewsCategory {
  _id: string;
  title: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  category: NewsCategory;
  date: string;
  featured: boolean;
  cardImage?: SanityImage;
}

export interface NewsArticleDetail extends NewsArticle {
  content: ContentBlock[];
  images?: SanityImage[];
}

export interface ContentBlock {
  _type: string;
  _key: string;
  children?: Array<{
    _type: string;
    text: string;
    marks?: string[];
  }>;
  style?: string;
  listItem?: string;
  asset?: SanityImage;
  alt?: string;
  caption?: string;
}

export interface Hospital {
  _id?: string;
  name: string;
  type?: "Hospital" | "Clinic" | "Doctor";
  location?: string;
  region?: string;
  contact?: string;
  email?: string;
  notes?: string;
  url?: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface HospitalizationRate {
  category: string;
  monthly?: string;
  annual?: string;
}

export interface EligibilitySchedule {
  period: string;
  benefit: string;
}

export interface PricingStructure {
  principal?: string;
  spouse?: string;
  child?: string;
  parent?: string;
  sibling?: string;
  annual?: string;
}

export interface SanityProgram {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  features: string[];
  pricing: PricingStructure;
  order: number;
  isActive: boolean;
  highlighted?: boolean;
}

export interface SanityProgramDetail extends SanityProgram {
  benefits?: Benefit[];
  hospitalizationRates?: HospitalizationRate[];
  eligibilitySchedule?: EligibilitySchedule[];
  notes?: string;
}


export interface NewsContentProps {
  filteredNews: NewsArticle[];
  featuredPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

export interface NewsClientInteractionsProps {
  initialNews: NewsArticle[];
  initialCategories: NewsCategory[];
  onFilteredNewsChange?: (filteredNews: NewsArticle[]) => void;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
