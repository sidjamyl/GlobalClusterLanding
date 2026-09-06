import type { MetadataRoute } from "next";
import { routes } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: "https://globalcluster.net" + route,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
