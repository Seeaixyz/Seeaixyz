import type { MetadataRoute } from "next";

const routes = ["", "/studio", "/capabilities", "/gallery", "/models", "/pricing", "/api", "/company"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://seeai.xyz${route}`,
    lastModified: new Date("2026-11-06"),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
