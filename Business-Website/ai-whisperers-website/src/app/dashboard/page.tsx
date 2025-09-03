import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import DashboardHero from '@/components/dashboard/DashboardHero';
import EnrolledCourses from '@/components/dashboard/EnrolledCourses';
import LearningProgress from '@/components/dashboard/LearningProgress';
import RecommendedCourses from '@/components/dashboard/RecommendedCourses';

export const metadata: Metadata = {
  title: 'Student Dashboard | AI-Whisperers',
  description: 'Access your AI courses, track learning progress, and manage your account.',
  robots: { index: false }, // Private pages shouldn't be indexed
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Dashboard Hero */}
      <DashboardHero user={user} />
      
      {/* Enrolled Courses */}
      <EnrolledCourses userId={user.id} />
      
      {/* Learning Progress */}
      <LearningProgress userId={user.id} />
      
      {/* Recommended Courses */}
      <RecommendedCourses userId={user.id} />
    </main>
  );
}