interface PerformanceThresholds {
  LCP: { good: number; needsImprovement: number };
  FID: { good: number; needsImprovement: number };
  CLS: { good: number; needsImprovement: number };
  FCP: { good: number; needsImprovement: number };
  TTFB: { good: number; needsImprovement: number };
}

interface PerformanceReport {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  metrics: Record<string, number>;
  recommendations: string[];
  criticalIssues: string[];
}

class PerformanceMonitoringService {
  private readonly thresholds: PerformanceThresholds = {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  };

  async measurePageLoad(): Promise<PerformanceReport> {
    if (typeof window === 'undefined') {
      return this.getDefaultReport();
    }

    const metrics: Record<string, number> = {};
    const recommendations: string[] = [];
    const criticalIssues: string[] = [];

    // Measure TTFB
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationTiming) {
      metrics.TTFB = navigationTiming.responseStart - navigationTiming.requestStart;
      metrics.FCP = navigationTiming.domContentLoadedEventStart - navigationTiming.navigationStart;
      metrics.DOMContentLoaded = navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart;
    }

    // Measure resource loading
    const resourceEntries = performance.getEntriesByType('resource');
    const totalResourceTime = resourceEntries.reduce((sum, resource) => sum + resource.duration, 0);
    metrics.ResourceLoad = totalResourceTime;

    // Analyze bundle sizes
    const jsResources = resourceEntries.filter(r => r.name.includes('.js'));
    const cssResources = resourceEntries.filter(r => r.name.includes('.css'));
    metrics.JSBundleCount = jsResources.length;
    metrics.CSSBundleCount = cssResources.length;

    // Generate recommendations
    if (metrics.TTFB > this.thresholds.TTFB.good) {
      criticalIssues.push(`TTFB too high: ${metrics.TTFB}ms (target: <${this.thresholds.TTFB.good}ms)`);
      recommendations.push('Optimize server response time and database queries');
    }

    if (metrics.FCP > this.thresholds.FCP.good) {
      recommendations.push('Optimize critical rendering path and reduce render-blocking resources');
    }

    if (metrics.JSBundleCount > 10) {
      recommendations.push('Consider code splitting to reduce JavaScript bundle count');
    }

    const score = this.calculatePerformanceScore(metrics);
    const grade = this.getPerformanceGrade(score);

    return {
      score,
      grade,
      metrics,
      recommendations,
      criticalIssues,
    };
  }

  private calculatePerformanceScore(metrics: Record<string, number>): number {
    let score = 100;

    // TTFB scoring (25% weight)
    if (metrics.TTFB > this.thresholds.TTFB.needsImprovement) {
      score -= 25;
    } else if (metrics.TTFB > this.thresholds.TTFB.good) {
      score -= 15;
    }

    // FCP scoring (20% weight)  
    if (metrics.FCP > this.thresholds.FCP.needsImprovement) {
      score -= 20;
    } else if (metrics.FCP > this.thresholds.FCP.good) {
      score -= 12;
    }

    // Resource optimization (15% weight)
    if (metrics.JSBundleCount > 15) {
      score -= 15;
    } else if (metrics.JSBundleCount > 10) {
      score -= 8;
    }

    // DOMContentLoaded (15% weight)
    if (metrics.DOMContentLoaded > 3000) {
      score -= 15;
    } else if (metrics.DOMContentLoaded > 2000) {
      score -= 8;
    }

    return Math.max(score, 0);
  }

  private getPerformanceGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  private getDefaultReport(): PerformanceReport {
    return {
      score: 85,
      grade: 'B',
      metrics: {},
      recommendations: ['Run performance test in browser for detailed metrics'],
      criticalIssues: [],
    };
  }

  async monitorCoreWebVitals(): Promise<{
    lcp: number;
    inp: number;
    cls: number;
    status: 'good' | 'needs-improvement' | 'poor';
  }> {
    return new Promise((resolve) => {
      const vitals = { lcp: 0, inp: 0, cls: 0 };
      let metricsCollected = 0;
      const totalMetrics = 3;

      const checkComplete = () => {
        if (metricsCollected === totalMetrics) {
          let status: 'good' | 'needs-improvement' | 'poor' = 'good';
          
          if (vitals.lcp > this.thresholds.LCP.needsImprovement ||
              vitals.inp > this.thresholds.FID.needsImprovement ||
              vitals.cls > this.thresholds.CLS.needsImprovement) {
            status = 'poor';
          } else if (vitals.lcp > this.thresholds.LCP.good ||
                     vitals.inp > this.thresholds.FID.good ||
                     vitals.cls > this.thresholds.CLS.good) {
            status = 'needs-improvement';
          }

          resolve({ ...vitals, status });
        }
      };

      // Mock implementation - in real app, use web-vitals library
      setTimeout(() => {
        vitals.lcp = 1200 + Math.random() * 2000;
        metricsCollected++;
        checkComplete();
      }, 100);

      setTimeout(() => {
        vitals.inp = 50 + Math.random() * 200;
        metricsCollected++;
        checkComplete();
      }, 200);

      setTimeout(() => {
        vitals.cls = Math.random() * 0.3;
        metricsCollected++;
        checkComplete();
      }, 300);
    });
  }

  generatePerformanceReport(metrics: Record<string, number>): {
    summary: string;
    optimizations: string[];
    nextSteps: string[];
  } {
    const optimizations: string[] = [];
    const nextSteps: string[] = [];

    if (metrics.TTFB > 800) {
      optimizations.push('Server-side optimization: Implement edge caching and database optimization');
      nextSteps.push('Set up CDN with edge locations');
    }

    if (metrics.JSBundleCount > 10) {
      optimizations.push('Client-side optimization: Implement code splitting and lazy loading');
      nextSteps.push('Audit and optimize JavaScript bundles');
    }

    if (metrics.FCP > 1800) {
      optimizations.push('Critical rendering path: Inline critical CSS and preload key resources');
      nextSteps.push('Implement resource preloading strategy');
    }

    const score = this.calculatePerformanceScore(metrics);
    let summary = '';

    if (score >= 90) {
      summary = '🚀 Excellent performance! Your site loads fast and provides great user experience.';
    } else if (score >= 70) {
      summary = '⚡ Good performance with room for optimization. Focus on the recommendations below.';
    } else {
      summary = '⚠️ Performance needs improvement. Critical issues require immediate attention.';
    }

    return { summary, optimizations, nextSteps };
  }
}

export const performanceMonitoringService = new PerformanceMonitoringService();

// Performance budget thresholds
export const performanceBudget = {
  // Bundle size limits (gzipped)
  mainBundle: 150 * 1024, // 150KB
  vendorBundle: 300 * 1024, // 300KB
  cssBundle: 50 * 1024, // 50KB
  
  // Loading time budgets
  maxTTFB: 800, // 800ms
  maxFCP: 1800, // 1.8s
  maxLCP: 2500, // 2.5s
  
  // Resource limits
  maxRequests: 50,
  maxImageSize: 500 * 1024, // 500KB per image
  maxFontFiles: 6,
};

// CDN configuration for different environments
export const cdnConfig = {
  production: {
    domain: 'cdn.ai-whisperers.com',
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    caching: {
      static: '1y',
      dynamic: '1h',
      api: '5m',
    },
  },
  
  staging: {
    domain: 'staging-cdn.ai-whisperers.com', 
    regions: ['us-east-1'],
    caching: {
      static: '1d',
      dynamic: '1h',
      api: '1m',
    },
  },
};

export interface WebVitalsData {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}