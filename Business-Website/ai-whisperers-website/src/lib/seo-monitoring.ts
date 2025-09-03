interface SEOMetrics {
  crawlability: number;
  indexability: number;
  rankingFactors: number;
  technicalSEO: number;
  contentQuality: number;
}

interface SEOPageData {
  url: string;
  title: string;
  description: string;
  h1Count: number;
  imageCount: number;
  linkCount: number;
  hasStructuredData: boolean;
  loadTime: number;
  mobileScore: number;
}

class SEOMonitoringService {
  private readonly apiEndpoint = '/api/seo/audit';

  async auditPage(url: string): Promise<SEOPageData> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error(`SEO audit failed: ${response.statusText}`);
      }

      const { data } = await response.json();
      return data;

    } catch (error) {
      console.error('SEO monitoring error:', error);
      throw error;
    }
  }

  calculateSEOScore(metrics: SEOMetrics): number {
    const weights = {
      crawlability: 0.25,
      indexability: 0.25, 
      rankingFactors: 0.20,
      technicalSEO: 0.15,
      contentQuality: 0.15,
    };

    return Math.round(
      metrics.crawlability * weights.crawlability +
      metrics.indexability * weights.indexability +
      metrics.rankingFactors * weights.rankingFactors +
      metrics.technicalSEO * weights.technicalSEO +
      metrics.contentQuality * weights.contentQuality
    );
  }

  generateSEORecommendations(pageData: SEOPageData): Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    action: string;
    impact: string;
  }> {
    const recommendations = [];

    if (!pageData.title) {
      recommendations.push({
        priority: 'high' as const,
        category: 'Meta Tags',
        action: 'Add descriptive title tag',
        impact: 'Critical for search rankings and click-through rates'
      });
    }

    if (!pageData.description) {
      recommendations.push({
        priority: 'high' as const,
        category: 'Meta Tags', 
        action: 'Add compelling meta description',
        impact: 'Improves click-through rates from search results'
      });
    }

    if (pageData.h1Count !== 1) {
      recommendations.push({
        priority: 'medium' as const,
        category: 'Content Structure',
        action: 'Use exactly one h1 tag per page',
        impact: 'Improves content hierarchy and search understanding'
      });
    }

    if (!pageData.hasStructuredData) {
      recommendations.push({
        priority: 'medium' as const,
        category: 'Structured Data',
        action: 'Add JSON-LD structured data',
        impact: 'Enables rich snippets and better search understanding'
      });
    }

    if (pageData.loadTime > 3000) {
      recommendations.push({
        priority: 'high' as const,
        category: 'Performance',
        action: 'Optimize page loading speed',
        impact: 'Page speed is a direct ranking factor'
      });
    }

    if (pageData.imageCount > 0) {
      recommendations.push({
        priority: 'low' as const,
        category: 'Images',
        action: 'Verify all images have alt text',
        impact: 'Improves accessibility and image search visibility'
      });
    }

    return recommendations;
  }

  async monitorKeywords(keywords: string[]): Promise<Array<{
    keyword: string;
    position: number;
    change: number;
    difficulty: number;
    volume: number;
  }>> {
    return keywords.map(keyword => ({
      keyword,
      position: Math.floor(Math.random() * 100) + 1,
      change: Math.floor(Math.random() * 20) - 10,
      difficulty: Math.floor(Math.random() * 100),
      volume: Math.floor(Math.random() * 10000) + 100,
    }));
  }

  generateSEOReport(pageData: SEOPageData): {
    score: number;
    grade: string;
    strengths: string[];
    weaknesses: string[];
    priority_fixes: string[];
  } {
    const metrics: SEOMetrics = {
      crawlability: pageData.url ? 95 : 60,
      indexability: pageData.title && pageData.description ? 90 : 50,
      rankingFactors: pageData.hasStructuredData ? 85 : 60,
      technicalSEO: pageData.loadTime < 3000 ? 90 : 60,
      contentQuality: pageData.h1Count === 1 ? 85 : 70,
    };

    const score = this.calculateSEOScore(metrics);
    
    let grade = 'F';
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';

    const strengths = [];
    const weaknesses = [];
    const priority_fixes = [];

    if (metrics.crawlability >= 80) strengths.push('Good crawlability');
    else weaknesses.push('Crawlability issues');

    if (metrics.indexability >= 80) strengths.push('Strong meta tag implementation');
    else {
      weaknesses.push('Missing critical meta tags');
      priority_fixes.push('Add title and description meta tags');
    }

    if (metrics.rankingFactors >= 80) strengths.push('Good structured data implementation');
    else {
      weaknesses.push('Limited structured data');
      priority_fixes.push('Implement JSON-LD structured data');
    }

    return {
      score,
      grade,
      strengths,
      weaknesses,
      priority_fixes
    };
  }
}

export const seoMonitoringService = new SEOMonitoringService();

export const targetKeywords = [
  'AI courses',
  'AI education',
  'AI learning',
  'machine learning courses',
  'artificial intelligence training',
  'AI programming',
  'AI web development',
  'AI for business',
  'comprehensive AI course',
  'AI certification'
];