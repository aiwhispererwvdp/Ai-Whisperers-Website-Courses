import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/auth/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/blog/', '/courses/', '/'],
        disallow: ['/admin/', '/api/', '/dashboard/', '/auth/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/blog/', '/courses/', '/'],
        disallow: ['/admin/', '/api/', '/dashboard/', '/auth/'],
      },
    ],
    sitemap: 'https://ai-whisperers.com/sitemap.xml',
    host: 'https://ai-whisperers.com',
  };
}