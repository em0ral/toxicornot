import { guides } from "./guides/guides-data"

export default function sitemap() {
  const now = new Date()

  const staticPages = [
    {
      url: "https://toxicornot.ai",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://toxicornot.ai/guides",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://toxicornot.ai/glossary",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://toxicornot.ai/resources",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://toxicornot.ai/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const guidePages = guides.map((g) => ({
    url: `https://toxicornot.ai/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...guidePages]
}
