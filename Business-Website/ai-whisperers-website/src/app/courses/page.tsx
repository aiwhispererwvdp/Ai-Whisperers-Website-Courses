import { Metadata } from 'next';
import CourseGrid from '@/components/course/CourseGrid';
import CourseBundles from '@/components/course/CourseBundles';
import CourseComparison from '@/components/course/CourseComparison';
import LearningPath from '@/components/course/LearningPath';
import StructuredData from '@/components/seo/StructuredData';
import { generateCourseStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Courses | Complete AI Learning Journey | AI-Whisperers',
  description: 'Comprehensive AI education from beginner to expert. 4 specialized courses, 65.5 hours, production-ready skills. Start with no-code, advance to full-stack AI development.',
  keywords: 'AI courses, AI education, machine learning courses, AI training, artificial intelligence learning, comprehensive AI curriculum',
  openGraph: {
    title: 'AI Courses | Complete Learning Journey | AI-Whisperers',
    description: 'Master AI from beginner to expert with our comprehensive 4-course program. Production-ready skills, immediate career impact.',
    url: 'https://ai-whisperers.com/courses',
  },
};

export default function CoursesPage() {
  const coursesData = [
    generateCourseStructuredData({
      id: 'ai-foundations',
      title: 'AI Foundations: No-Code to Programming',
      description: 'Start your AI journey with no-code tools and advance to programming fundamentals.',
      price: 297,
      duration: 'PT15H30M',
      difficulty: 'Beginner',
      instructor: 'AI-Whisperers Team',
      rating: 4.9,
      reviewCount: 245
    }),
    generateCourseStructuredData({
      id: 'applied-ai',
      title: 'Applied AI: Real-World Projects',
      description: 'Build production-ready AI applications with hands-on projects and industry techniques.',
      price: 497,
      duration: 'PT18H',
      difficulty: 'Intermediate',
      instructor: 'AI-Whisperers Team',
      rating: 4.8,
      reviewCount: 189
    }),
    generateCourseStructuredData({
      id: 'web-development-ai',
      title: 'Web Development AI: Full-Stack Applications',
      description: 'Create AI-powered web applications using modern frameworks and deployment strategies.',
      price: 697,
      duration: 'PT20H',
      difficulty: 'Advanced',
      instructor: 'AI-Whisperers Team',
      rating: 4.9,
      reviewCount: 156
    }),
    generateCourseStructuredData({
      id: 'enterprise-ai',
      title: 'Enterprise AI Business: Strategy & Implementation',
      description: 'Learn to implement AI strategies in enterprise environments and lead AI transformations.',
      price: 897,
      duration: 'PT12H',
      difficulty: 'Advanced',
      instructor: 'AI-Whisperers Team',
      rating: 4.7,
      reviewCount: 89
    })
  ];

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://ai-whisperers.com' },
    { name: 'Courses', url: 'https://ai-whisperers.com/courses' }
  ]);

  return (
    <>
      <StructuredData data={[...coursesData, breadcrumbData]} />
      
      <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Your Complete AI Learning Journey
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Four specialized courses designed to take you from complete beginner to industry expert. 
            Start anywhere, progress at your own pace.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent-300">65.5</div>
              <div className="text-primary-200">Hours of Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300">26</div>
              <div className="text-primary-200">Detailed Lessons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300">100+</div>
              <div className="text-primary-200">Hands-on Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300">4</div>
              <div className="text-primary-200">Specialized Tracks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Visualization */}
      <LearningPath />

      {/* Individual Courses */}
      <CourseGrid />

      {/* Course Bundles */}
      <CourseBundles />

      {/* Course Comparison */}
      <CourseComparison />
    </main>
    </>
  );
}