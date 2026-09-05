import type { MetadataRoute } from "next";
import { config } from "@/data/config";

// No `lastModified`: reading the clock during a prerender is exactly what
// `cacheComponents` complains about, and it buys nothing on a two-page site.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: config.site, changeFrequency: "monthly", priority: 1 },
    { url: `${config.site}/cv`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
