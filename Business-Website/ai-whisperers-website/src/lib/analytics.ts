declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface ConversionEvent {
  event_name: 'course_enrollment' | 'consultation_booking' | 'newsletter_signup' | 'form_submission';
  course_id?: string;
  course_price?: number;
  lead_score?: number;
  user_segment?: string;
}

class AnalyticsService {
  private isInitialized = false;
  private readonly gaId: string;
  private readonly debug: boolean;

  constructor() {
    this.gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';
    this.debug = process.env.NODE_ENV === 'development';
  }

  initialize() {
    if (this.isInitialized || !this.gaId || typeof window === 'undefined') {
      return;
    }

    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        dimension1: 'user_segment',
        dimension2: 'course_interest',
        dimension3: 'experience_level'
      }
    });

    this.isInitialized = true;
    
    if (this.debug) {
      console.log('📊 Analytics initialized:', this.gaId);
    }
  }

  trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    window.gtag?.('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });

    if (this.debug) {
      console.log('📊 Event tracked:', event);
    }
  }

  trackPageView(url: string, title?: string) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    window.gtag?.('config', this.gaId, {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });

    if (this.debug) {
      console.log('📊 Page view tracked:', url);
    }
  }

  trackConversion(event: ConversionEvent) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const eventData: Record<string, any> = {
      event_category: 'conversion',
      event_label: event.event_name,
    };

    if (event.course_id) eventData.course_id = event.course_id;
    if (event.course_price) eventData.value = event.course_price;
    if (event.lead_score) eventData.custom_parameter_lead_score = event.lead_score;
    if (event.user_segment) eventData.custom_parameter_user_segment = event.user_segment;

    window.gtag?.('event', 'conversion', eventData);

    // Track as enhanced ecommerce if applicable
    if (event.event_name === 'course_enrollment' && event.course_price) {
      window.gtag?.('event', 'purchase', {
        transaction_id: `enrollment_${Date.now()}`,
        value: event.course_price,
        currency: 'USD',
        items: [{
          item_id: event.course_id,
          item_name: event.course_id?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          category: 'AI Course',
          quantity: 1,
          price: event.course_price
        }]
      });
    }

    if (this.debug) {
      console.log('💰 Conversion tracked:', event);
    }
  }

  trackUserSegment(segment: string, properties: Record<string, any> = {}) {
    this.trackEvent({
      action: 'user_segment_identified',
      category: 'user_behavior',
      label: segment,
      custom_parameters: {
        user_segment: segment,
        ...properties
      }
    });
  }

  trackCourseInteraction(action: 'view' | 'preview' | 'enroll', courseId: string, additionalData: Record<string, any> = {}) {
    this.trackEvent({
      action: `course_${action}`,
      category: 'course_interaction',
      label: courseId,
      custom_parameters: {
        course_id: courseId,
        interaction_type: action,
        ...additionalData
      }
    });
  }

  trackFormInteraction(formType: string, action: 'start' | 'complete' | 'error', additionalData: Record<string, any> = {}) {
    this.trackEvent({
      action: `form_${action}`,
      category: 'form_interaction',
      label: formType,
      custom_parameters: {
        form_type: formType,
        form_action: action,
        ...additionalData
      }
    });
  }

  trackPerformanceMetric(metricName: string, value: number, threshold: number) {
    const status = value <= threshold ? 'good' : 'needs_improvement';
    
    this.trackEvent({
      action: 'performance_metric',
      category: 'core_web_vitals',
      label: metricName,
      value: Math.round(value),
      custom_parameters: {
        metric_name: metricName,
        metric_value: value,
        metric_status: status,
        metric_threshold: threshold
      }
    });
  }

  // Enhanced ecommerce tracking for course sales
  trackPurchaseFlow(step: 'begin_checkout' | 'add_payment_info' | 'purchase', courseData: {
    courseId: string;
    courseName: string;
    price: number;
    currency?: string;
  }) {
    const { courseId, courseName, price, currency = 'USD' } = courseData;

    window.gtag?.('event', step, {
      currency,
      value: price,
      items: [{
        item_id: courseId,
        item_name: courseName,
        category: 'AI Course',
        quantity: 1,
        price
      }]
    });

    if (this.debug) {
      console.log('🛒 Purchase flow tracked:', step, courseData);
    }
  }
}

export const analyticsService = new AnalyticsService();

// React hook for analytics
export function useAnalytics() {
  return {
    trackEvent: (event: AnalyticsEvent) => analyticsService.trackEvent(event),
    trackConversion: (event: ConversionEvent) => analyticsService.trackConversion(event),
    trackCourseInteraction: (action: 'view' | 'preview' | 'enroll', courseId: string, data?: Record<string, any>) => 
      analyticsService.trackCourseInteraction(action, courseId, data),
    trackFormInteraction: (formType: string, action: 'start' | 'complete' | 'error', data?: Record<string, any>) =>
      analyticsService.trackFormInteraction(formType, action, data),
    trackUserSegment: (segment: string, properties?: Record<string, any>) =>
      analyticsService.trackUserSegment(segment, properties),
  };
}

// Common event tracking helpers
export const trackingEvents = {
  COURSE_VIEW: (courseId: string) => ({
    action: 'course_view',
    category: 'course_interaction',
    label: courseId,
  }),
  
  CONSULTATION_REQUEST: (leadScore?: number) => ({
    action: 'consultation_request',
    category: 'lead_generation',
    value: leadScore,
  }),
  
  NEWSLETTER_SIGNUP: () => ({
    action: 'newsletter_signup',
    category: 'engagement',
  }),
  
  DOWNLOAD_RESOURCE: (resourceName: string) => ({
    action: 'resource_download',
    category: 'engagement',
    label: resourceName,
  }),
  
  SOCIAL_SHARE: (platform: string, url: string) => ({
    action: 'social_share',
    category: 'engagement',
    label: platform,
    custom_parameters: { shared_url: url },
  }),
};