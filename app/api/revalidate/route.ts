import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Set a secret token in your .env.local
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
      case "news":
        revalidatePath("/", "layout"); // Revalidate homepage
        revalidatePath("/news", "page"); // Revalidate news page
        break;
      case "contact":
        revalidatePath("/", "layout"); // Revalidate all pages (contact is in footer)
        break;
      case "hospital":
      case "location":
        revalidatePath("/hospitals", "page");
        break;
      default:
        // Revalidate all pages if unknown type
        revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 },
    );
  }
}
