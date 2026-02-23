import { publicClient } from "@/sanity/lib/client-public";

export async function GET() {
  try {
    const query = `*[_type == "newsCategory"] | order(title asc) {
      _id,
      title
    }`;

    const data = await publicClient.fetch(query);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json([], { status: 500 });
  }
}