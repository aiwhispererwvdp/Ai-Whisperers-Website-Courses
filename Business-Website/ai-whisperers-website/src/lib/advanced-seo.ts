import { Metadata } from 'next';

interface InternalLink {
  href: string;
  anchor: string;
  context: 'navigation' | 'content' | 'footer';
  weight: number;
}

interface PageSEOAnalysis {
  titleLength: number;
  descriptionLength: number;
  h1Count: number;
  h2Count: number;
  internalLinks: InternalLink[];
  externalLinks: number;
  imageCount: number;
  wordCount: number;
  keywordDensity: Record<string, number>;
}

class AdvancedSEOService {
  private readonly targetKeywordDensity = 0.02; // 2%
  private readonly maxTitleLength = 60;
  private readonly maxDescriptionLength = 160;

  generateAdvancedMetadata(config: {
    title: string;
    description: string;
    keywords: string[];
    url: string;
    image?: string;
    article?: {
      author: string;
      publishedTime: string;
      modifiedTime?: string;
      section: string;
      tags: string[];
    };
    course?: {
      price: number;
      currency: string;
      availability: string;
      instructor: string;
      duration: string;
      difficulty: string;
    };
  }): Metadata {
    const metadata: Metadata = {
      title: config.title,
      description: config.description,
      keywords: config.keywords.join(', '),
      
      alternates: {
        canonical: config.url,
      },
      
      openGraph: {
        type: config.article ? 'article' : 'website',
        title: config.title,
        description: config.description,
        url: config.url,
        siteName: 'AI-Whisperers',
        locale: 'en_US',
        images: [
          {
            url: config.image || '/og/default.jpg',
            width: 1200,
            height: 630,
            alt: config.title,
          },
        ],
        ...(config.article && {
          publishedTime: config.article.publishedTime,
          modifiedTime: config.article.modifiedTime,
          authors: [config.article.author],
          section: config.article.section,
          tags: config.article.tags,
        }),
      },
      
      twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.description,
        creator: '@aiwhisperers',
        images: [config.image || '/twitter/default.jpg'],
      },
      
      other: {
        'article:author': config.article?.author,
        'article:section': config.article?.section,
        'product:price:amount': config.course?.price,
        'product:price:currency': config.course?.currency,
        'product:availability': config.course?.availability,
      },
    };

    return metadata;
  }

  analyzePageSEO(html: string, targetKeywords: string[]): PageSEOAnalysis {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    
    const analysis: PageSEOAnalysis = {
      titleLength: titleMatch?.[1]?.length || 0,
      descriptionLength: descMatch?.[1]?.length || 0,
      h1Count: (html.match(/<h1[^>]*>/gi) || []).length,
      h2Count: (html.match(/<h2[^>]*>/gi) || []).length,
      internalLinks: this.extractInternalLinks(html),
      externalLinks: (html.match(/<a[^>]+href=["']https?:\/\/(?!ai-whisperers\.com)[^"']+/gi) || []).length,
      imageCount: (html.match(/<img[^>]*>/gi) || []).length,
      wordCount: this.countWords(html),
      keywordDensity: this.calculateKeywordDensity(html, targetKeywords),
    };

    return analysis;
  }

  private extractInternalLinks(html: string): InternalLink[] {
    const linkMatches = html.match(/<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi) || [];
    
    return linkMatches.map(match => {
      const hrefMatch = match.match(/href=["']([^"']+)["']/i);
      const textMatch = match.match(/>([^<]+)<\/a>/i);
      
      return {
        href: hrefMatch?.[1] || '',
        anchor: textMatch?.[1] || '',
        context: this.getLinkContext(match),
        weight: this.calculateLinkWeight(textMatch?.[1] || '', hrefMatch?.[1] || ''),
      };
    }).filter(link => !link.href.startsWith('http') || link.href.includes('ai-whisperers.com'));
  }

  private getLinkContext(linkHtml: string): 'navigation' | 'content' | 'footer' {
    if (linkHtml.includes('nav') || linkHtml.includes('menu')) return 'navigation';
    if (linkHtml.includes('footer')) return 'footer';
    return 'content';
  }

  private calculateLinkWeight(anchor: string, href: string): number {
    let weight = 1;
    
    if (href.includes('/courses/')) weight += 2;
    if (anchor.toLowerCase().includes('course') || anchor.toLowerCase().includes('learn')) weight += 1;
    if (anchor.length > 3 && anchor.length < 50) weight += 1;
    
    return Math.min(weight, 5);
  }

  private countWords(html: string): number {
    const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return textContent.split(' ').filter(word => word.length > 2).length;
  }

  private calculateKeywordDensity(html: string, keywords: string[]): Record<string, number> {
    const textContent = html.replace(/<[^>]*>/g, ' ').toLowerCase();
    const totalWords = this.countWords(html);
    
    return keywords.reduce((density, keyword) => {
      const keywordRegex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
      const matches = textContent.match(keywordRegex) || [];
      density[keyword] = matches.length / totalWords;
      return density;
    }, {} as Record<string, number>);
  }

  generateSEORecommendations(analysis: PageSEOAnalysis, targetKeywords: string[]): {
    critical: string[];
    important: string[];
    optional: string[];
    score: number;
  } {
    const critical: string[] = [];
    const important: string[] = [];
    const optional: string[] = [];
    let score = 100;

    // Title optimization
    if (analysis.titleLength === 0) {
      critical.push('Add a title tag');
      score -= 20;
    } else if (analysis.titleLength > this.maxTitleLength) {
      important.push(`Shorten title (${analysis.titleLength} chars, target: <${this.maxTitleLength})`);
      score -= 10;
    }

    // Description optimization
    if (analysis.descriptionLength === 0) {
      critical.push('Add meta description');
      score -= 15;
    } else if (analysis.descriptionLength > this.maxDescriptionLength) {
      important.push(`Optimize meta description length (${analysis.descriptionLength} chars)`);
      score -= 5;
    }

    // Heading structure
    if (analysis.h1Count === 0) {
      critical.push('Add exactly one H1 tag');
      score -= 15;
    } else if (analysis.h1Count > 1) {
      important.push(`Use only one H1 tag (found ${analysis.h1Count})`);
      score -= 8;
    }

    if (analysis.h2Count === 0) {
      important.push('Add H2 subheadings for content structure');
      score -= 5;
    }

    // Content optimization
    if (analysis.wordCount < 300) {
      important.push(`Increase content length (${analysis.wordCount} words, target: >300)`);
      score -= 10;
    }

    // Keyword optimization
    targetKeywords.forEach(keyword => {
      const density = analysis.keywordDensity[keyword] || 0;
      if (density === 0) {
        important.push(`Include target keyword "${keyword}" in content`);
        score -= 5;
      } else if (density > this.targetKeywordDensity * 3) {
        optional.push(`Reduce keyword density for "${keyword}" (${(density * 100).toFixed(1)}%)`);
        score -= 2;
      }
    });

    // Internal linking
    const contentLinks = analysis.internalLinks.filter(link => link.context === 'content');
    if (contentLinks.length < 3) {
      important.push('Add more internal links to related content');
      score -= 8;
    }

    return {
      critical,
      important,
      optional,
      score: Math.max(score, 0),
    };
  }

  generateSchemaMarkup(type: 'course' | 'article' | 'faq' | 'organization', data: Record<string, any>) {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type.charAt(0).toUpperCase() + type.slice(1),
    };

    switch (type) {
      case 'course':
        return {
          ...baseSchema,
          '@type': 'Course',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'AI-Whisperers',
            url: 'https://ai-whisperers.com'
          },
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          educationalLevel: data.level,
          timeRequired: data.duration,
        };

      case 'article':
        return {
          ...baseSchema,
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Person',
            name: data.author
          },
          publisher: {
            '@type': 'Organization',
            name: 'AI-Whisperers',
            logo: 'https://ai-whisperers.com/logo.png'
          },
          datePublished: data.publishedAt,
          dateModified: data.modifiedAt,
          image: data.image,
          mainEntityOfPage: data.url,
        };

      case 'faq':
        return {
          ...baseSchema,
          '@type': 'FAQPage',
          mainEntity: data.questions.map((q: any) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          }))
        };

      default:
        return baseSchema;
    }
  }
}

export const advancedSEOService = new AdvancedSEOService();

// SEO monitoring for Core Web Vitals impact
export function trackSEOPerformanceCorrelation(seoScore: number, webVitalsScore: number) {
  const correlation = Math.abs(seoScore - webVitalsScore);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'seo_performance_correlation', {
      event_category: 'SEO Analytics',
      seo_score: seoScore,
      web_vitals_score: webVitalsScore,
      correlation_gap: correlation,
      event_label: correlation < 10 ? 'aligned' : 'misaligned',
    });
  }
}