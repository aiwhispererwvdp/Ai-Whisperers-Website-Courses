import { MetadataRoute } from 'next';

const baseUrl = 'https://ai-whisperers.com';

const courses = [
  { id: 'ai-foundations', lastModified: '2025-01-15' },
  { id: 'applied-ai', lastModified: '2025-01-15' },
  { id: 'web-development-ai', lastModified: '2025-01-15' },
  { id: 'enterprise-ai', lastModified: '2025-01-15' },
];

const blogPosts = [
  { slug: 'getting-started-with-ai', lastModified: '2025-01-15' },
  { slug: 'ai-career-roadmap', lastModified: '2025-01-10' },
  { slug: 'ai-tools-comparison', lastModified: '2025-01-08' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  const coursePages = courses.flatMap(course => [
    {
      url: `${baseUrl}/courses/${course.id}`,
      lastModified: new Date(course.lastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/${course.id}/preview`,
      lastModified: new Date(course.lastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/${course.id}/enroll`,
      lastModified: new Date(course.lastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]);

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...coursePages,
    ...blogPages,
  ];
}