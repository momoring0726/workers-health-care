import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand Revalidation API Endpoint
 * Context7: Production-grade cache invalidation for Sanity webhooks
 *
 * Triggered by Sanity Studio webhooks when documents are published/updated
 * Revalidates specific paths based on document type
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

    // Revalidate based on document type
    switch (_type) {
      case "program":
        revalidatePath("/programs");
        revalidatePath("/");
        console.log("[Revalidation] Programs updated");
        break;

      case "news":
        revalidatePath("/news");
        revalidatePath("/");
        console.log("[Revalidation] News updated");
        break;

      case "contact":
        revalidatePath("/");
        console.log("[Revalidation] Contact information updated");
        break;

      case "hospital":
      case "location":
        revalidatePath("/hospitals");
        console.log("[Revalidation] Hospitals/Locations updated");
        break;

      default:
        // Revalidate all pages if unknown type
        revalidatePath("/");
        console.log(`[Revalidation] Unknown type: ${_type}, revalidated all`);
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
        error: String(err),
      },
      { status: 500 },
    );
  }
}
