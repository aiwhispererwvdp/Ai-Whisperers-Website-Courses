import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/lib/courses';
import CourseDetailHero from '@/components/course/CourseDetailHero';
import CourseCurriculum from '@/components/course/CourseCurriculum';
import CourseInstructor from '@/components/course/CourseInstructor';
import CourseTestimonials from '@/components/course/CourseTestimonials';
import CourseFAQ from '@/components/course/CourseFAQ';
import CourseEnrollmentCTA from '@/components/course/CourseEnrollmentCTA';

interface CourseDetailPageProps {
  params: {
    courseId: string;
  };
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const course = getCourseById(params.courseId);
  
  if (!course) {
    return {
      title: 'Course Not Found | AI-Whisperers',
    };
  }

  return {
    title: `${course.title} - ${course.subtitle} | AI-Whisperers`,
    description: `${course.description} ${course.duration} of comprehensive AI education. ${course.level} level course for ${course.targetAudience}.`,
    keywords: `${course.title}, AI course, ${course.level} AI, ${course.technologies.join(', ')}, AI education, AI training`,
    openGraph: {
      title: `${course.title} - ${course.subtitle}`,
      description: course.description,
      url: `https://ai-whisperers.com/courses/${course.id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} - ${course.subtitle}`,
      description: course.description,
    },
  };
}

export async function generateStaticParams() {
  // Generate static paths for all courses
  return [
    { courseId: 'ai-foundations' },
    { courseId: 'applied-ai' },
    { courseId: 'web-development-ai' },
    { courseId: 'enterprise-ai' },
  ];
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Course Overview */}
      <CourseDetailHero course={course} />
      
      {/* Course Curriculum */}
      <CourseCurriculum course={course} />
      
      {/* Instructor Information */}
      <CourseInstructor course={course} />
      
      {/* Student Testimonials */}
      <CourseTestimonials course={course} />
      
      {/* Frequently Asked Questions */}
      <CourseFAQ course={course} />
      
      {/* Final Enrollment Call-to-Action */}
      <CourseEnrollmentCTA course={course} />
    </main>
  );
}