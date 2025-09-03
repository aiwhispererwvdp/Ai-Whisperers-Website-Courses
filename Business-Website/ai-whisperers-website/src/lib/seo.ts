import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'course' | 'organization';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  price?: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  courseProvider?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
}

export const baseSEO: Partial<Metadata> = {
  metadataBase: new URL('https://ai-whisperers.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'AI-Whisperers Team', url: 'https://ai-whisperers.com' }],
  creator: 'AI-Whisperers',
  publisher: 'AI-Whisperers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    image = '/og/og-image.jpg',
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
  } = config;

  const fullTitle = title.includes('AI-Whisperers') ? title : `${title} | AI-Whisperers`;
  
  return {
    ...baseSEO,
    title: {
      default: fullTitle,
      template: '%s | AI-Whisperers',
    },
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: 'en_US',
      title: fullTitle,
      description,
      url: canonical,
      siteName: 'AI-Whisperers',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@aiwhisperers',
      images: [image.replace('/og/', '/twitter/')],
    },
  };
}

export function generateCourseMetadata(course: {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  difficulty: string;
  image?: string;
}): Metadata {
  return generateMetadata({
    title: course.title,
    description: course.description,
    keywords: [
      'AI course',
      'machine learning',
      'artificial intelligence',
      course.difficulty.toLowerCase(),
      'online learning',
      'AI education',
      'programming',
      'technology training'
    ],
    canonical: `https://ai-whisperers.com/courses/${course.id}`,
    image: course.image || `/og/course-${course.id}.jpg`,
    type: 'course',
    price: course.price.toString(),
    currency: 'USD',
    availability: 'InStock',
    courseProvider: 'AI-Whisperers',
    difficulty: course.difficulty as SEOConfig['difficulty'],
    duration: course.duration,
  });
}

export function generateBlogMetadata(post: {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  category: string;
}): Metadata {
  return generateMetadata({
    title: post.title,
    description: post.description,
    keywords: [
      'AI blog',
      'artificial intelligence',
      'machine learning',
      'technology insights',
      post.category.toLowerCase(),
      'AI tutorials',
      'industry news'
    ],
    canonical: `https://ai-whisperers.com/blog/${post.slug}`,
    image: post.image || `/og/blog-${post.slug}.jpg`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author,
  });
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI-Whisperers',
    description: 'The world\'s only complete AI learning journey from beginner to expert in 65.5 hours.',
    url: 'https://ai-whisperers.com',
    logo: 'https://ai-whisperers.com/logo.png',
    sameAs: [
      'https://twitter.com/aiwhisperers',
      'https://linkedin.com/company/ai-whisperers',
      'https://github.com/ai-whisperers'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-AI-LEARN',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'CA',
      addressLocality: 'San Francisco'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '297',
      highPrice: '1997',
      offerCount: '4'
    }
  };
}

export function generateCourseStructuredData(course: {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  difficulty: string;
  instructor: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'AI-Whisperers'
    },
    instructor: {
      '@type': 'Person',
      name: course.instructor
    },
    educationalLevel: course.difficulty,
    timeRequired: course.duration,
    courseMode: ['online'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseSchedule: {
        '@type': 'Schedule',
        duration: course.duration,
        repeatFrequency: 'P1D'
      }
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString()
    },
    ...(course.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: course.rating,
        reviewCount: course.reviewCount || 1,
        bestRating: 5,
        worstRating: 1
      }
    })
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}