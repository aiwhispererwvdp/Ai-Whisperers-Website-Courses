'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  navigationType: string;
}

function sendToAnalytics(metric: WebVitalMetric) {
  const { name, value, id } = metric;
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}: ${value}ms (ID: ${id})`);
  }

  if (typeof window !== 'undefined') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      body: JSON.stringify(metric),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => {
      console.error('Failed to send web vitals:', err);
    });
  }
}

export default function WebVitals() {
  useEffect(() => {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
}

export function getWebVitalsThresholds() {
  return {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  };
}

export function assessWebVitalsScore(metrics: Partial<PerformanceMetrics>): {
  score: number;
  recommendations: string[];
} {
  const thresholds = getWebVitalsThresholds();
  let score = 100;
  const recommendations: string[] = [];

  if (metrics.lcp && metrics.lcp > thresholds.LCP.good) {
    score -= metrics.lcp > thresholds.LCP.needsImprovement ? 30 : 15;
    recommendations.push('Optimize Largest Contentful Paint - consider image optimization and server response times');
  }

  if (metrics.fid && metrics.fid > thresholds.FID.good) {
    score -= metrics.fid > thresholds.FID.needsImprovement ? 25 : 10;
    recommendations.push('Reduce First Input Delay - optimize JavaScript execution and main thread blocking');
  }

  if (metrics.cls && metrics.cls > thresholds.CLS.good) {
    score -= metrics.cls > thresholds.CLS.needsImprovement ? 25 : 10;
    recommendations.push('Fix Cumulative Layout Shift - add dimensions to images and reserve space for dynamic content');
  }

  return { score: Math.max(score, 0), recommendations };
}

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}