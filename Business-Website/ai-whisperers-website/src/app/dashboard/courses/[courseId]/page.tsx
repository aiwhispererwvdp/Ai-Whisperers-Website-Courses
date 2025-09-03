import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCourseById } from '@/lib/courses';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CourseContentViewer from '@/components/dashboard/CourseContentViewer';

interface DashboardCoursePageProps {
  params: {
    courseId: string;
  };
}

export async function generateMetadata({ params }: DashboardCoursePageProps): Promise<Metadata> {
  const course = getCourseById(params.courseId);
  
  return {
    title: course ? `${course.title} | Student Dashboard` : 'Course Not Found',
    description: course?.description || 'AI-Whisperers course content',
    robots: { index: false }, // Private course content
  };
}

export default async function DashboardCoursePage({ params }: DashboardCoursePageProps) {
  const user = await getCurrentUser();
  const course = getCourseById(params.courseId);

  if (!user) {
    redirect(`/auth/signin?callbackUrl=/dashboard/courses/${params.courseId}`);
  }

  if (!course) {
    redirect('/dashboard');
  }

  return (
    <ProtectedRoute requiredCourses={[params.courseId]}>
      <main className="min-h-screen bg-gray-50">
        <CourseContentViewer 
          course={course}
          user={user}
        />
      </main>
    </ProtectedRoute>
  );
}