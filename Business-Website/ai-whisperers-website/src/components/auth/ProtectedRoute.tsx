'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ReloadIcon } from '@radix-ui/react-icons';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  requiredCourses?: string[];
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/signin',
  requiredCourses = [],
  fallback 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      const currentPath = window.location.pathname;
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  }, [status, router, redirectTo]);

  // Loading state
  if (status === 'loading') {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <ReloadIcon className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your courses...</p>
        </motion.div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return null; // Redirect handled by useEffect
  }

  // Check course access if required
  if (requiredCourses.length > 0) {
    const userCourses = session.user.enrolledCourses || [];
    const hasAccess = requiredCourses.some(courseId => userCourses.includes(courseId));
    
    if (!hasAccess) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ReloadIcon className="w-8 h-8 text-warning-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Course Access Required
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be enrolled in one of the following courses to access this content:
            </p>
            <div className="space-y-2 mb-6">
              {requiredCourses.map(courseId => (
                <div key={courseId} className="text-primary-600 font-medium">
                  {courseId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/courses')}
              className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
            >
              View Available Courses
            </button>
          </motion.div>
        </div>
      );
    }
  }

  return <>{children}</>;
}