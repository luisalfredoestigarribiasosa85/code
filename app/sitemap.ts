import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://luisestigarribia.com"
  const lastModified = new Date()

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
