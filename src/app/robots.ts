import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://auxilium-consult.onrender.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/client-portal/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
