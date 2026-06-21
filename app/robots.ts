import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/premium-report", "/api"],
    },
    sitemap: "https://www.airportcv.co.uk/sitemap.xml",
  };
}
