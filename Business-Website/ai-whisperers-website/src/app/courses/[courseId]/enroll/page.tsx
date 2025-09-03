import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/lib/courses';
import EnrollmentForm from '@/components/course/EnrollmentForm';
import CourseEnrollmentDetails from '@/components/course/CourseEnrollmentDetails';

interface CourseEnrollPageProps {
  params: {
    courseId: string;
  };
}

export async function generateMetadata({ params }: CourseEnrollPageProps): Promise<Metadata> {
  const course = getCourseById(params.courseId);
  
  if (!course) {
    return {
      title: 'Course Not Found | AI-Whisperers',
    };
  }

  return {
    title: `Enroll in ${course.title} | AI-Whisperers`,
    description: `Enroll in ${course.title}: ${course.description}. Secure enrollment with PayPal and immediate course access.`,
    robots: { index: false }, // Don't index enrollment pages
  };
}

export default function CourseEnrollPage({ params }: CourseEnrollPageProps) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enroll in {course.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You're one step away from starting your AI learning journey. 
            Secure enrollment with instant course access upon payment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Course Details */}
          <div>
            <CourseEnrollmentDetails course={course} />
          </div>

          {/* Enrollment Form */}
          <div>
            <EnrollmentForm 
              courseId={course.id}
              title={course.title}
              price={course.price}
            />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <div className="text-2xl font-bold text-success-600 mb-2">30-Day</div>
            <div className="text-gray-700 font-medium">Money-Back Guarantee</div>
            <div className="text-sm text-gray-500 mt-2">
              100% satisfaction or full refund
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <div className="text-2xl font-bold text-primary-600 mb-2">Instant</div>
            <div className="text-gray-700 font-medium">Course Access</div>
            <div className="text-sm text-gray-500 mt-2">
              Start learning immediately after payment
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <div className="text-2xl font-bold text-accent-600 mb-2">Lifetime</div>
            <div className="text-gray-700 font-medium">Access & Updates</div>
            <div className="text-sm text-gray-500 mt-2">
              Keep access forever with all updates
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}