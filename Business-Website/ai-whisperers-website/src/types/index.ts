// Centralized type definitions for AI-Whisperers platform

// ===== CORE ENTITIES =====

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  experience?: ExperienceLevel;
  goals?: string;
  marketingConsent: boolean;
  newsletterSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  level: CourseLevel;
  duration: string;
  totalMinutes: number;
  lessonCount: number;
  category: CourseCategory;
  tags: string[];
  features: string[];
  learningObjectives: string[];
  prerequisites: string[];
  image: string;
  instructor: Instructor;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  type: LessonType;
  content?: string;
  videoUrl?: string;
  resources: LessonResource[];
  courseId: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  timeSpent: number;
  currentLessonId?: string;
  paymentType: PaymentType;
  pricePaid: number;
  paymentStatus: PaymentStatus;
  paymentId: string;
  paymentDate: Date;
  enrollmentDate: Date;
  lastAccessDate?: Date;
  completionDate?: Date;
  certificateIssued: boolean;
}

export interface LessonProgress {
  id: string;
  enrollmentId: string;
  lessonId: string;
  userId: string;
  isCompleted: boolean;
  completedAt?: Date;
  timeSpent: number;
  progressPercentage: number;
  notes?: string;
}

// ===== ENUMS & UNIONS =====

export type ExperienceLevel = 
  | 'complete-beginner'
  | 'some-exposure' 
  | 'basic-technical'
  | 'intermediate'
  | 'advanced';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export type CourseCategory = 
  | 'ai-foundations'
  | 'applied-ai'
  | 'web-development'
  | 'business-strategy'
  | 'data-science'
  | 'machine-learning';

export type LessonType = 
  | 'video'
  | 'text'
  | 'interactive'
  | 'quiz'
  | 'assignment'
  | 'project';

export type PaymentType = 'individual' | 'corporate' | 'bundle';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

// ===== COMPONENT PROPS =====

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface EnrollmentFormProps {
  courseId: string;
  title: string;
  price: number;
  onSuccess?: (enrollmentData: EnrollmentResponse) => void;
  onError?: (error: string) => void;
}

export interface PayPalButtonProps {
  courseId?: string;
  bundleId?: string;
  price: number;
  title: string;
  onSuccess?: (orderId: string, details: PayPalOrderDetails) => void;
  onError?: (error: PayPalError) => void;
  className?: string;
  disabled?: boolean;
}

export interface CourseCardProps {
  course: Course;
  showEnrollButton?: boolean;
  compact?: boolean;
  onEnrollClick?: (courseId: string) => void;
}

export interface DashboardProps {
  user: User;
  enrollments: EnrollmentWithCourse[];
  recentActivity: LessonProgress[];
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
}

// ===== API TYPES =====

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateOrderRequest {
  courseId?: string;
  bundleId?: string;
  price: number;
  title: string;
}

export interface CreateOrderResponse {
  orderId: string;
  approvalUrl: string;
}

export interface EnrollmentRequest {
  courseId: string;
  paymentId: string;
  studentInfo: StudentInfo;
}

export interface EnrollmentResponse {
  id: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: Date;
  access: {
    dashboardUrl: string;
    startLessonUrl: string;
  };
}

export interface ProgressUpdateRequest {
  lessonId: string;
  isCompleted: boolean;
  timeSpent?: number;
  progressPercentage?: number;
}

export interface ProgressResponse {
  enrollment: EnrollmentProgress;
  course: Course;
  lessonProgress: LessonProgress[];
  stats: ProgressStats;
}

// ===== FORM & VALIDATION =====

export interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  experience: ExperienceLevel;
  goals?: string;
  marketingConsent: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
  phone?: string;
  marketingConsent?: boolean;
}

export interface FormErrors {
  [field: string]: string;
}

export interface ValidationRule<T = any> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
}

export interface FormValidationSchema {
  [field: string]: ValidationRule;
}

// ===== ANALYTICS & TRACKING =====

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  courseId?: string;
}

export interface WebVitalsMetric {
  id: string;
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// ===== PAYMENT INTEGRATION =====

export interface PayPalOrderDetails {
  id: string;
  status: string;
  payer: {
    email_address: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
  }>;
}

export interface PayPalError {
  name: string;
  message: string;
  stack?: string;
}

// ===== MARKETING AUTOMATION =====

export interface ConvertKitSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  customFields?: Record<string, string>;
}

export interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  ai_experience_level?: string;
  lead_source?: string;
  lifecyclestage?: string;
  hs_lead_status?: string;
}

// ===== UTILITY TYPES =====

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface Instructor {
  name: string;
  bio: string;
  image: string;
  credentials: string[];
  experience: string;
}

export interface LessonResource {
  type: 'video' | 'pdf' | 'link' | 'code';
  title: string;
  url: string;
  duration?: number;
}

export interface ProgressStats {
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  estimatedTimeRemaining: number;
}

export interface EnrollmentProgress {
  id: string;
  progress: number;
  timeSpent: number;
  currentLessonId?: string;
  lastAccessDate?: Date;
  enrollmentDate: Date;
  completionDate?: Date;
}

export interface EnrollmentWithCourse extends Enrollment {
  course: Course;
  user: User;
}

// ===== ERROR HANDLING =====

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// ===== CONSTANTS =====

export const EXPERIENCE_OPTIONS: SelectOption[] = [
  { value: 'complete-beginner', label: 'Complete Beginner (No AI Experience)' },
  { value: 'some-exposure', label: 'Some Exposure (Used AI tools casually)' },
  { value: 'basic-technical', label: 'Basic Technical (Some programming)' },
  { value: 'intermediate', label: 'Intermediate (Built AI projects)' },
  { value: 'advanced', label: 'Advanced (Professional AI work)' },
];

export const COURSE_CATEGORIES: Record<CourseCategory, string> = {
  'ai-foundations': 'AI Foundations',
  'applied-ai': 'Applied AI',
  'web-development': 'Web Development',
  'business-strategy': 'Business Strategy',
  'data-science': 'Data Science',
  'machine-learning': 'Machine Learning',
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  COURSES: '/api/courses',
  ENROLLMENT: '/api/enrollment',
  PAYMENT: '/api/payment',
  PROGRESS: '/api/courses/[id]/progress',
  ANALYTICS: '/api/analytics',
  CONTACT: '/api/contact',
} as const;