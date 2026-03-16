import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/auth/",
          "/signin",
          "/signup",
          "/forgot-password",
          "/reset-password/",
          "/payment-success",
          "/error",
        ],
      },
    ],
    host: "https://signalizeai.org",
    sitemap: "https://signalizeai.org/sitemap.xml",
  };
}
