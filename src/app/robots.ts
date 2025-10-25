import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/client-portal/'],
      },
    ],
    sitemap: 'https://auxiliumconsult.com/sitemap.xml',
  }
}
