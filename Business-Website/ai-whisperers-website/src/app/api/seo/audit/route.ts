import { NextRequest, NextResponse } from 'next/server';

interface SEOAuditResult {
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    category: 'meta' | 'structure' | 'performance' | 'accessibility';
    message: string;
    fix?: string;
  }>;
  recommendations: string[];
  metrics: {
    metaTags: number;
    structuredData: number;
    images: number;
    links: number;
    headings: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required for SEO audit' },
        { status: 400 }
      );
    }

    const auditResult = await performSEOAudit(url);
    
    return NextResponse.json({
      success: true,
      data: auditResult
    });

  } catch (error) {
    console.error('SEO audit error:', error);
    return NextResponse.json(
      { error: 'Failed to perform SEO audit' },
      { status: 500 }
    );
  }
}

async function performSEOAudit(url: string): Promise<SEOAuditResult> {
  const issues: SEOAuditResult['issues'] = [];
  const recommendations: string[] = [];
  let score = 100;

  try {
    const response = await fetch(url);
    const html = await response.text();
    
    const metrics = {
      metaTags: (html.match(/<meta/g) || []).length,
      structuredData: (html.match(/application\/ld\+json/g) || []).length,
      images: (html.match(/<img/g) || []).length,
      links: (html.match(/<a href/g) || []).length,
      headings: (html.match(/<h[1-6]/g) || []).length,
    };

    if (!html.includes('<title>')) {
      issues.push({
        type: 'error',
        category: 'meta',
        message: 'Missing title tag',
        fix: 'Add a descriptive title tag'
      });
      score -= 15;
    }

    if (!html.includes('name="description"')) {
      issues.push({
        type: 'error',
        category: 'meta',
        message: 'Missing meta description',
        fix: 'Add a compelling meta description (150-160 characters)'
      });
      score -= 10;
    }

    if (!html.includes('property="og:title"')) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Missing Open Graph title',
        fix: 'Add Open Graph meta tags for social sharing'
      });
      score -= 5;
    }

    if (metrics.structuredData === 0) {
      issues.push({
        type: 'warning',
        category: 'structure',
        message: 'No structured data found',
        fix: 'Add JSON-LD structured data for better search visibility'
      });
      score -= 8;
    }

    if (!html.includes('lang=')) {
      issues.push({
        type: 'error',
        category: 'accessibility',
        message: 'Missing language declaration',
        fix: 'Add lang attribute to html element'
      });
      score -= 5;
    }

    if (metrics.headings === 0) {
      issues.push({
        type: 'error',
        category: 'structure',
        message: 'No heading structure found',
        fix: 'Add proper heading hierarchy (h1, h2, h3, etc.)'
      });
      score -= 10;
    }

    if (metrics.images > 0) {
      const imagesWithAlt = (html.match(/alt="[^"]*"/g) || []).length;
      const missingAlt = metrics.images - imagesWithAlt;
      
      if (missingAlt > 0) {
        issues.push({
          type: 'warning',
          category: 'accessibility',
          message: `${missingAlt} images missing alt text`,
          fix: 'Add descriptive alt text to all images'
        });
        score -= Math.min(missingAlt * 2, 10);
      }
    }

    if (score >= 90) {
      recommendations.push('Excellent SEO implementation! Consider A/B testing titles and descriptions.');
    } else if (score >= 70) {
      recommendations.push('Good SEO foundation. Focus on structured data and image optimization.');
    } else {
      recommendations.push('SEO needs significant improvement. Start with meta tags and structured data.');
    }

    return {
      score: Math.max(score, 0),
      issues,
      recommendations,
      metrics
    };

  } catch (error) {
    console.error('Audit error:', error);
    return {
      score: 0,
      issues: [{
        type: 'error',
        category: 'meta',
        message: 'Failed to fetch page for audit',
        fix: 'Ensure URL is accessible'
      }],
      recommendations: ['Fix page accessibility before running SEO audit'],
      metrics: { metaTags: 0, structuredData: 0, images: 0, links: 0, headings: 0 }
    };
  }
}