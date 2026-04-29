import { MetadataRoute } from "next";
import { trips } from "@/data/trips";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  const tripUrls = trips.map((t) => ({
    url: `${base}/tur/${t.date}`,
    lastModified: new Date(t.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/arkiv`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/karta`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/om`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    ...tripUrls,
  ];
}
