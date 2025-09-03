'use client';

import { motion } from 'framer-motion';
import { PlayIcon, ArrowLeftIcon, ArrowRightIcon, ClockIcon, BookmarkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Course } from '@/lib/types/course';

interface CoursePreviewHeroProps {
  course: Course;
}

export default function CoursePreviewHero({ course }: CoursePreviewHeroProps) {
  return (
    <section className={`py-16 ${course.bgColor} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-sm text-gray-500 mb-6"
          >
            <Link 
              href="/courses" 
              className="hover:text-gray-700 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              All Courses
            </Link>
            <span>/</span>
            <Link 
              href={`/courses/${course.id}`} 
              className="hover:text-gray-700 transition-colors"
            >
              {course.title}
            </Link>
            <span>/</span>
            <span className={course.textColor}>Free Preview</span>
          </motion.div>

          {/* Preview Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-800 text-sm font-medium mb-4">
              <PlayIcon className="w-4 h-4 mr-2" />
              Free Course Preview
            </div>
          </motion.div>

          {/* Course Title and Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Experience {course.title}
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-600 mb-6">
              {course.subtitle} - Free Preview
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              Get a taste of our comprehensive {course.level.toLowerCase()}-level course. 
              Experience our teaching style, course quality, and hands-on approach before enrolling.
            </p>

            {/* Course Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center text-gray-600">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">{course.duration}</span>
                <span className="ml-1 text-gray-500">(Full Course)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookmarkIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">{course.lessons} Lessons</span>
                <span className="ml-1 text-gray-500">(Full Course)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <PlayIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">3 Sample Lessons</span>
                <span className="ml-1 text-gray-500">(This Preview)</span>
              </div>
            </div>
          </motion.div>

          {/* Preview Content Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-premium p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What You'll Experience in This Preview
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-xl ${course.bgColor} border ${course.borderColor} text-center`}>
                <div className={`w-12 h-12 rounded-full bg-white ${course.textColor} flex items-center justify-center mx-auto mb-4 font-bold text-xl`}>
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Sample Lesson</h4>
                <p className="text-gray-600 text-sm">
                  Complete lesson from {course.modules[0]?.title || 'Module 1'} with full content and activities
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${course.bgColor} border ${course.borderColor} text-center`}>
                <div className={`w-12 h-12 rounded-full bg-white ${course.textColor} flex items-center justify-center mx-auto mb-4 font-bold text-xl`}>
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Interactive Demo</h4>
                <p className="text-gray-600 text-sm">
                  Try hands-on activities and see our practical, project-based teaching approach
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${course.bgColor} border ${course.borderColor} text-center`}>
                <div className={`w-12 h-12 rounded-full bg-white ${course.textColor} flex items-center justify-center mx-auto mb-4 font-bold text-xl`}>
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Course Materials</h4>
                <p className="text-gray-600 text-sm">
                  Sample worksheets, templates, and resources you'll get in the full course
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${course.color} text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                <PlayIcon className="mr-2 w-5 h-5" />
                Start Free Preview
              </button>
              
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl hover:border-gray-400 hover:bg-white transition-all duration-300"
              >
                View Full Course Details
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <p className="text-gray-500 text-sm">
              No registration required • No credit card needed • Start immediately
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}