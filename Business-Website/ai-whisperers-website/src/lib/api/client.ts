import type { 
  APIResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  EnrollmentRequest,
  EnrollmentResponse,
  ProgressUpdateRequest,
  ProgressResponse,
  ContactFormData,
  APIError as APIErrorType,
} from '@/types';

export class APIError extends Error implements APIErrorType {
  constructor(
    message: string,
    public statusCode: number,
    public response?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

interface RequestConfig extends RequestInit {
  timeout?: number;
}

class APIClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL = '/api', timeout = 30000) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestConfig = {}
  ): Promise<T> {
    const { timeout = this.defaultTimeout, ...requestOptions } = options;
    const url = `${this.baseURL}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...requestOptions.headers,
      },
      signal: controller.signal,
      ...requestOptions,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage: string;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || `HTTP ${response.status}`;
        } catch {
          errorMessage = errorText || `HTTP ${response.status}`;
        }

        throw new APIError(
          errorMessage, 
          response.status, 
          errorText
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof APIError) {
        throw error;
      }
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }
      
      throw new APIError(
        'Network Error', 
        0, 
        error instanceof Error ? error.message : 'Unknown network error'
      );
    }
  }

  // ===== PAYMENT APIs =====
  
  async createPaymentOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    return this.request<CreateOrderResponse>('/payment/create-order', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async capturePaymentOrder(orderId: string, details: any): Promise<APIResponse> {
    return this.request<APIResponse>('/payment/capture-order', {
      method: 'POST',
      body: JSON.stringify({ orderId, details })
    });
  }

  // ===== ENROLLMENT APIs =====
  
  async enrollInCourse(data: EnrollmentRequest): Promise<EnrollmentResponse> {
    return this.request<EnrollmentResponse>('/enrollment', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async checkCourseAccess(courseId: string): Promise<APIResponse<{ hasAccess: boolean }>> {
    return this.request<APIResponse<{ hasAccess: boolean }>>(`/courses/${courseId}/access`);
  }

  // ===== PROGRESS APIs =====
  
  async getCourseProgress(courseId: string): Promise<ProgressResponse> {
    return this.request<ProgressResponse>(`/courses/${courseId}/progress`);
  }

  async updateLessonProgress(
    courseId: string, 
    data: ProgressUpdateRequest
  ): Promise<APIResponse> {
    return this.request<APIResponse>(`/courses/${courseId}/progress`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // ===== CONTACT APIs =====
  
  async submitContactForm(data: ContactFormData): Promise<APIResponse> {
    return this.request<APIResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // ===== ANALYTICS APIs =====
  
  async trackWebVitals(metrics: any): Promise<APIResponse> {
    return this.request<APIResponse>('/analytics/web-vitals', {
      method: 'POST',
      body: JSON.stringify(metrics)
    });
  }

  async getPerformanceDashboard(): Promise<APIResponse<any>> {
    return this.request<APIResponse<any>>('/performance/dashboard');
  }

  // ===== SEO APIs =====
  
  async performSEOAudit(url: string): Promise<APIResponse> {
    return this.request<APIResponse>('/seo/audit', {
      method: 'POST',
      body: JSON.stringify({ url })
    });
  }

  // ===== GENERIC REQUESTS =====
  
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Singleton instance
export const apiClient = new APIClient();

// Response type guards
export function isSuccessResponse<T>(response: APIResponse<T>): response is APIResponse<T> & { success: true } {
  return response.success === true;
}

export function isErrorResponse(response: APIResponse): response is APIResponse & { success: false; error: string } {
  return response.success === false;
}