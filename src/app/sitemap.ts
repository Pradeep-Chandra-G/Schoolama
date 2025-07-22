import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.schoolama.studio"
  const lastMod = new Date();

  const paths = [
    "/", "/sign-in", "/contact", "/about", "/careers",
    "/privacy", "/terms", "/blog", "/demo",
    "/help", "/community", "/home"
  ]

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastMod,
    changeFrequency: "monthly",
    priority: 1,
  }))
}
