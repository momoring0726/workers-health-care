import { publicClient } from "@/sanity/lib/client-public";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    let query = `*[_type == "news"`;
    const params: Record<string, string | undefined> = {};

    if (category) {
      query += ` && category->title == $category`;
      params.category = category;
    }

    if (search) {
      query += ` && [title, shortDescription] match $search`;
      params.search = `${search}*`;
    }

    query += `] | order(date desc) {
      _id,
      title,
      slug,
      shortDescription,
      category->{
        title
      },
      date,
      featured,
      "cardImage": content[_type == "image"][0] {
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
      }
    }`;

    const data = await publicClient.fetch(query, params);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json([], { status: 500 });
  }
}
