import type { MetadataRoute } from "next";

const baseUrl = "https://www.airportcv.co.uk";

const routes = [
  "",
  "/cv-builder",
  "/cv-checker",
  "/cover-letter",
  "/interview-prep",
  "/career-coach",
  "/jobs",
  "/blog",
  "/blog/simple-ats-cv-airport-jobs",
  "/pricing",
  "/privacy",
  "/terms",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/jobs" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/jobs" ? 0.9 : 0.7,
  }));
}
