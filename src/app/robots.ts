import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/list/', '/parent', '/student', '/teacher', '/api'], // add your private routes here
      },
    ],
    sitemap: 'https://www.schoolama.studio/sitemap.xml',
  }
}
