import type { MetadataRoute } from "next";

const BASE_URL = "https://signalizeai.org";

const staticRoutes = [
  "",
  "/about",
  "/pricing",
  "/contact",
  "/docs",
  "/privacy",
  "/blogs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
