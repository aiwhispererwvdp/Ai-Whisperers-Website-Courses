import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/lib/courses';
import EnhancedPreviewPage from '@/components/preview/EnhancedPreviewPage';

interface CoursePreviewPageProps {
  params: {
    courseId: string;
  };
}

export async function generateMetadata({ params }: CoursePreviewPageProps): Promise<Metadata> {
  const course = getCourseById(params.courseId);
  
  if (!course) {
    return {
      title: 'Course Preview Not Found | AI-Whisperers',
    };
  }

  return {
    title: `Free Preview: ${course.title} | AI-Whisperers`,
    description: `Get a free preview of ${course.title}. Experience our teaching style and course quality before enrolling. ${course.level} level AI course.`,
    keywords: `${course.title} preview, free AI course preview, ${course.level} AI course, AI education sample`,
    openGraph: {
      title: `Free Preview: ${course.title}`,
      description: `Experience our ${course.level} level AI course before enrolling. Free preview available now.`,
      url: `https://ai-whisperers.com/courses/${course.id}/preview`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  // Generate static paths for all course previews
  return [
    { courseId: 'ai-foundations' },
    { courseId: 'applied-ai' },
    { courseId: 'web-development-ai' },
    { courseId: 'enterprise-ai' },
  ];
}

export default function CoursePreviewPage({ params }: CoursePreviewPageProps) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  return <EnhancedPreviewPage course={course} />;
}