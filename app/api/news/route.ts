import { publicClient } from "@/sanity/lib/client-public";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    const params: Record<string, string | undefined> = {};
    if (category) params.category = category;
    if (search) params.search = `${search}*`;

    const query = `
      *[_type == "news" && 
        (!defined($category) || category->title == $category) && 
        (!defined($search) || [title, shortDescription] match $search)
      ] | order(date desc) {
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
      }
    `;

    const data = await publicClient.fetch(query, params);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json([], { status: 500 });
  }
}
