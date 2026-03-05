import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS } from "@/lib/cache-config";

/**
 * On-demand Revalidation API Endpoint
 * Context7: Production-grade cache invalidation for Sanity webhooks
 *
 * Triggered by Sanity Studio webhooks when documents are published/updated
 * Uses tag-based revalidation for efficient, targeted cache invalidation
 */

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  // Verify secret token
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _type } = body;

    // Revalidate based on document type using cache tags
    switch (_type) {
      case "program":
        revalidateTag(CACHE_TAGS.PROGRAMS, "default");
        revalidateTag(CACHE_TAGS.PROGRAM_DETAIL, "default");
        console.log("[Revalidation] Programs cache tags invalidated");
        break;

      case "news":
        revalidateTag(CACHE_TAGS.NEWS, "default");
        revalidateTag(CACHE_TAGS.NEWS_DETAIL, "default");
        console.log("[Revalidation] News cache tags invalidated");
        break;

      case "contact":
        revalidateTag(CACHE_TAGS.CONTACT, "default");
        console.log("[Revalidation] Contact cache tags invalidated");
        break;

      case "hospital":
      case "location":
        revalidateTag(CACHE_TAGS.HOSPITALS, "default");
        console.log("[Revalidation] Hospitals cache tags invalidated");
        break;

      default:
        // Revalidate all content if unknown type
        revalidateTag(CACHE_TAGS.CONTENT, "default");
        console.log(
          `[Revalidation] Unknown type: ${_type}, revalidated all content`,
        );
    }

    return NextResponse.json(
      {
        revalidated: true,
        type: _type,
        now: Date.now(),
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[Revalidation] Error:", err);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
