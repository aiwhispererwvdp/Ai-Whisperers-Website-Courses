'use client';

import { motion } from 'framer-motion';
import { PlayIcon, CheckIcon, ClockIcon, ArrowRightIcon, BookmarkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface EnrolledCoursesProps {
  userId: string;
}

const enrolledCourses = [
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'Master AI without coding - Perfect for complete beginners',
    progress: 100,
    status: 'completed',
    hoursCompleted: 12,
    totalHours: 12,
    lessons: {
      completed: 6,
      total: 6,
    },
    nextLesson: null,
    enrolledAt: '2025-01-15',
    completedAt: '2025-02-28',
    certificateUrl: '/certificates/ai-foundations-123',
  },
  {
    id: 'applied-ai',
    title: 'Applied AI',
    description: 'Build real AI applications with multi-provider integration',
    progress: 80,
    status: 'in-progress',
    hoursCompleted: 12,
    totalHours: 15,
    lessons: {
      completed: 5,
      total: 6,
    },
    nextLesson: 'Lesson 6: Production Deployment Strategies',
    enrolledAt: '2025-03-01',
    completedAt: null,
    certificateUrl: null,
  },
  {
    id: 'web-development-ai',
    title: 'AI-Powered Web Apps',
    description: 'The only comprehensive AI web development course',
    progress: 40,
    status: 'in-progress',
    hoursCompleted: 8.5,
    totalHours: 21,
    lessons: {
      completed: 3,
      total: 7,
    },
    nextLesson: 'Lesson 4: Advanced AI Chat Interfaces',
    enrolledAt: '2025-04-01',
    completedAt: null,
    certificateUrl: null,
  },
];

export default function EnrolledCourses({ userId }: EnrolledCoursesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Enrolled Courses
              </h2>
              <p className="text-gray-600">
                Continue where you left off and track your progress
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 text-primary-600 font-semibold border-2 border-primary-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
            >
              Browse More Courses
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {enrolledCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Course Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {course.description}
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'completed' 
                      ? 'bg-success-100 text-success-700'
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {course.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-primary-600">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        course.status === 'completed' ? 'bg-success-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${course.progress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1.0, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">
                      {course.hoursCompleted}
                    </div>
                    <div className="text-xs text-gray-500">
                      of {course.totalHours} hours
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">
                      {course.lessons.completed}
                    </div>
                    <div className="text-xs text-gray-500">
                      of {course.lessons.total} lessons
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Action */}
              <div className="px-6 pb-6">
                {course.status === 'completed' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full p-4 bg-success-50 border border-success-200 rounded-xl">
                      <CheckIcon className="w-5 h-5 text-success-600 mr-3" />
                      <span className="text-success-700 font-semibold">Course Completed!</span>
                    </div>
                    <Link
                      href={course.certificateUrl!}
                      className="block w-full text-center px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
                    >
                      Download Certificate
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-primary-50 border border-primary-200 rounded-xl">
                      <div className="flex items-center mb-2">
                        <ClockIcon className="w-4 h-4 text-primary-600 mr-2" />
                        <span className="text-primary-700 font-medium text-sm">Next Up:</span>
                      </div>
                      <p className="text-primary-800 text-sm font-medium">
                        {course.nextLesson}
                      </p>
                    </div>
                    
                    <Link
                      href={`/dashboard/courses/${course.id}`}
                      className="group flex items-center justify-center w-full px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
                    >
                      <PlayIcon className="w-5 h-5 mr-3" />
                      Continue Learning
                      <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {enrolledCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookmarkIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Courses Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your AI learning journey today with our comprehensive course catalog. 
              From beginner to expert in 65.5 hours.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
            >
              Browse Courses
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}