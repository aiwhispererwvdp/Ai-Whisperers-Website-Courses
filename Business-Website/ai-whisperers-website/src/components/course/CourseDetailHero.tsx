'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  PlayIcon, 
  CheckIcon,
  ClockIcon,
  PersonIcon,
  StarIcon,
  CalendarIcon,
  BookmarkIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { Course } from '@/lib/types/course';

interface CourseDetailHeroProps {
  course: Course;
}

export default function CourseDetailHero({ course }: CourseDetailHeroProps) {
  return (
    <section className={`py-20 ${course.bgColor} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Course Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link href="/courses" className="hover:text-gray-700 transition-colors">
                Courses
              </Link>
              <span>/</span>
              <span className={course.textColor}>{course.title}</span>
            </div>

            {/* Course Badges */}
            <div className="flex items-center space-x-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${course.textColor} bg-white border ${course.borderColor}`}>
                {course.level}
              </span>
              <div className="flex items-center">
                {[...Array(course.difficulty)].map((_, i) => (
                  <StarIcon key={i} className={`w-4 h-4 ${course.textColor}`} />
                ))}
                {[...Array(3 - course.difficulty)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              {course.popular && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-primary-600">
                  Most Popular
                </span>
              )}
              {course.unique && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-purple-600">
                  Only Available Here
                </span>
              )}
              {course.premium && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-amber-600">
                  Executive Premium
                </span>
              )}
            </div>

            {/* Course Title and Description */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-600 mb-6">
              {course.subtitle}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className={`text-2xl font-bold ${course.textColor}`}>
                  {course.duration}
                </div>
                <div className="text-sm text-gray-600">Total Content</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${course.textColor}`}>
                  {course.lessons}
                </div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${course.textColor}`}>
                  {course.rating}
                </div>
                <div className="text-sm text-gray-600">Student Rating</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${course.textColor}`}>
                  {course.students}
                </div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Master:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/courses/${course.id}/enroll`}
                className={`inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${course.color} text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                Enroll Now - ${course.price}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                href={`/courses/${course.id}/preview`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl hover:border-gray-400 hover:bg-white transition-all duration-300"
              >
                <PlayIcon className="mr-2 w-5 h-5" />
                Free Preview
              </Link>
            </div>
          </motion.div>

          {/* Course Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <div className="bg-white rounded-2xl shadow-premium p-8 border border-gray-200">
              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
                {course.originalPrice && (
                  <div className="text-sm text-success-600 font-medium mt-1">
                    Save ${course.originalPrice - course.price} vs university programs
                  </div>
                )}
              </div>

              {/* Course Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    Duration
                  </div>
                  <div className="font-medium text-gray-900">{course.duration}</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <BookmarkIcon className="w-4 h-4 mr-2" />
                    Lessons
                  </div>
                  <div className="font-medium text-gray-900">{course.lessons}</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <PersonIcon className="w-4 h-4 mr-2" />
                    Level
                  </div>
                  <div className="font-medium text-gray-900">{course.level}</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Updated
                  </div>
                  <div className="font-medium text-gray-900">
                    {new Date(course.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Target Audience */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                <p className="text-gray-600 text-sm">{course.targetAudience}</p>
              </div>

              {/* Prerequisites */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Prerequisites:</h4>
                <p className="text-gray-600 text-sm">{course.prerequisites}</p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Technologies Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.technologies.map((tech, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${course.bgColor} ${course.textColor} border ${course.borderColor}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                  30-day money-back guarantee
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                  Lifetime access to course materials
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                  All future course updates included
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                  Certificate of completion
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}