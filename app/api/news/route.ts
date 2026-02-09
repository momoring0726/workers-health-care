import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    let query = `*[_type == "news"`;

    if (category) {
      query += ` && category->title == "${category}"`;
    }

    if (search) {
      query += ` && (title match "${search}*" || excerpt match "${search}*")`;
    }

    query += `] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category->{
        title
      },
      publishedAt,
      featured
    }`;

    const data = await client.fetch(query);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json([], { status: 500 });
  }
}
