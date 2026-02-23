import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://workershealthcare.org"; // Consider moving to environment config later if needed

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/studio", "/api/"], // Disable crawling on Sanity Studio and standard API endpoints
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
