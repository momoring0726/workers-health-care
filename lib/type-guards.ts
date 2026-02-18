/**
 * Type Guards and Validation
 * Context7 Best Practices:
 * - Runtime validation for Sanity data
 * - Type guards for better error handling
 * - Ensures data integrity across the application
 */

import type {
  SanityProgram,
  NewsArticle,
  NewsArticleDetail,
  Hospital,
} from "@/types";

/**
 * Type guard: Check if value is SanityProgram
 */
export function isSanityProgram(value: unknown): value is SanityProgram {
  if (!value || typeof value !== "object") return false;
  const program = value as Record<string, unknown>;
  return (
    typeof program._id === "string" &&
    typeof program.title === "string" &&
    typeof program.description === "string" &&
    typeof program.slug === "object" &&
    typeof program.pricing === "object" &&
    Array.isArray(program.features)
  );
}

/**
 * Type guard: Check if value is NewsArticle
 */
export function isNewsArticle(value: unknown): value is NewsArticle {
  if (!value || typeof value !== "object") return false;
  const article = value as Record<string, unknown>;
  return (
    typeof article._id === "string" &&
    typeof article.title === "string" &&
    typeof article.shortDescription === "string" &&
    typeof article.slug === "object"
  );
}

/**
 * Type guard: Check if value is ContactData
 */
export function isContactData(
  value: unknown,
): value is { _id: string; email: string; phones: string[]; address: string } {
  if (!value || typeof value !== "object") return false;
  const contact = value as Record<string, unknown>;
  return (
    typeof contact._id === "string" &&
    typeof contact.email === "string" &&
    Array.isArray(contact.phones) &&
    typeof contact.address === "string"
  );
}

/**
 * Type guard: Check if value is Hospital
 */
export function isHospital(value: unknown): value is Hospital {
  if (!value || typeof value !== "object") return false;
  const hospital = value as Record<string, unknown>;
  return (
    typeof hospital._id === "string" &&
    typeof hospital.name === "string" &&
    typeof hospital.type === "string"
  );
}

/**
 * Validate array of programs
 */
export function validatePrograms(data: unknown[]): SanityProgram[] {
  return data.filter((item): item is SanityProgram => isSanityProgram(item));
}

/**
 * Validate array of news articles
 */
export function validateNewsArticles(data: unknown[]): NewsArticle[] {
  return data.filter((item): item is NewsArticle => isNewsArticle(item));
}

/**
 * Validate array of hospitals
 */
export function validateHospitals(data: unknown[]): Hospital[] {
  return data.filter((item): item is Hospital => isHospital(item));
}

/**
 * Safe string validation
 */
export function validateString(
  value: unknown,
  minLength = 0,
  maxLength = Infinity,
): value is string {
  return (
    typeof value === "string" &&
    value.length >= minLength &&
    value.length <= maxLength
  );
}

/**
 * Safe slug validation
 */
export function validateSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

/**
 * Safe email validation
 */
export function validateEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Safe URL validation
 */
export function validateUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
