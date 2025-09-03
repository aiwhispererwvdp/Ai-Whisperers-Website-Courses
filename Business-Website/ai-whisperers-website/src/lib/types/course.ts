// Core course activity type
export interface CourseActivity {
  name: string;
  description: string;
  duration: number; // in minutes
  type: 'hands-on' | 'project' | 'analysis' | 'workshop' | 'capstone' | 'coding' | 'development' | 'deployment' | 'setup' | 'backend' | 'advanced' | 'realtime' | 'optimization' | 'strategy' | 'planning' | 'governance' | 'change-management' | 'evaluation' | 'measurement' | 'strategic-planning';
}

// Individual lesson/module within a course
export interface CourseModule {
  id: string;
  title: string;
  duration: number; // in minutes
  objectives: string[];
  activities: CourseActivity[];
  caseStudy?: string;
  resources?: string[];
  prerequisites?: string[];
}

// Assessment and grading information
export interface CourseAssessment {
  type: 'practical' | 'project' | 'presentation' | 'portfolio' | 'peer-review';
  weight: number; // percentage of total grade
  description: string;
  rubric?: string[];
}

// Course curriculum structure
export interface CourseCurriculum {
  overview: string;
  totalDuration: number; // in minutes
  moduleCount: number;
  projectCount: number;
  certificateOffered: boolean;
  continuingEducation?: number; // CEU credits
  assessments?: CourseAssessment[];
}

// Course pricing structure
export interface CoursePricing {
  individual: number;
  team: number; // 5-19 seats
  enterprise: number; // 20+ seats
  corporate: number; // Custom enterprise pricing
}

// Main course interface
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Executive';
  difficulty: 1 | 2 | 3; // 1 = easy, 3 = hard
  duration: string; // human-readable duration
  totalMinutes: number;
  lessons: number;
  price: number;
  originalPrice?: number | null;
  category: 'foundations' | 'development' | 'web-development' | 'business';
  
  // Audience and prerequisites
  targetAudience: string;
  prerequisites: string;
  
  // Learning content
  learningOutcomes: string[];
  keyHighlights: string[];
  technologies: string[];
  
  // Visual styling
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  
  // Marketing flags
  popular: boolean;
  unique: boolean;
  premium: boolean;
  
  // Social proof
  rating: number;
  students: number;
  
  // Content structure
  modules: CourseModule[];
  curriculum: CourseCurriculum;
  pricing: CoursePricing;
  
  // Meta information
  lastUpdated: string;
  instructor?: string;
  certificateAwarded?: boolean;
}

// Course lesson (individual session within a course)
export interface CourseLesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  order: number;
  
  // Content
  objectives: string[];
  content: string; // Rich text content
  resources: string[]; // Links to materials
  activities: CourseActivity[];
  
  // Completion tracking
  isCompleted?: boolean;
  completedAt?: string;
  progressPercentage?: number;
  
  // Access control
  isPreview: boolean;
  requiresEnrollment: boolean;
}

// Course bundle interface
export interface CourseBundle {
  id: string;
  title: string;
  description: string;
  courses: string[]; // course IDs
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  popular: boolean;
  
  // Bundle-specific features
  bonusContent?: string[];
  additionalResources?: string[];
  communityAccess?: boolean;
  
  // Pricing tiers
  teamDiscount?: number; // percentage
  enterpriseDiscount?: number; // percentage
}

// Course enrollment information
export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: string;
  completionDate?: string;
  progress: number; // 0-100
  
  // Payment information
  paymentType: 'individual' | 'team' | 'enterprise' | 'bundle';
  pricePaid: number;
  paymentDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  
  // Access control
  expirationDate?: string;
  isActive: boolean;
  
  // Progress tracking
  completedLessons: string[];
  currentLesson?: string;
  timeSpent: number; // in minutes
  lastAccessDate: string;
  
  // Certification
  certificateIssued?: boolean;
  certificateDate?: string;
  certificateId?: string;
}

// Course preview content
export interface CoursePreview {
  courseId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  
  // Preview content
  sampleLessons: CourseLesson[];
  videoIntro?: string; // URL to intro video
  syllabus: string; // Detailed syllabus
  
  // Sample materials
  worksheets?: string[]; // URLs to sample worksheets
  codeExamples?: string[]; // URLs to sample code
  projectExamples?: string[]; // URLs to example projects
  
  // Social proof for preview
  testimonials?: string[];
  successStories?: string[];
}

// Learning path interface (course progression)
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[]; // ordered list of course IDs
  totalDuration: number; // in minutes
  totalPrice: number;
  
  // Path-specific information
  targetRole: string; // "AI Developer", "Business Leader", etc.
  careerOutcomes: string[];
  salaryIncrease?: string; // "25-40% average increase"
  
  // Prerequisites and recommendations
  startingLevel: string;
  endingLevel: string;
  recommendedSchedule: string; // "3-6 months part-time"
  
  // Path completion benefits
  certificationName?: string;
  industryRecognition?: string[];
  jobPlacementSupport?: boolean;
}

// User progress across multiple courses
export interface UserProgress {
  userId: string;
  enrollments: CourseEnrollment[];
  
  // Overall statistics
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalTimeSpent: number; // in minutes
  averageRating?: number; // user's average rating of courses
  
  // Learning path progress
  currentLearningPath?: string;
  learningPathProgress?: number; // 0-100
  
  // Achievements
  certificates: string[]; // certificate IDs
  badges?: string[]; // achievement badge IDs
  
  // Preferences
  learningStyle?: 'visual' | 'hands-on' | 'theoretical' | 'mixed';
  preferredPace?: 'fast' | 'medium' | 'slow';
  interests?: string[]; // tags/categories of interest
}

export default Course;