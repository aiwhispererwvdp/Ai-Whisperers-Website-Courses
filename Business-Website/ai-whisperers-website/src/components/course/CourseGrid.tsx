'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  PlayIcon, 
  CheckIcon,
  ClockIcon,
  PersonIcon,
  StarIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { courses } from '@/lib/courses';

export default function CourseGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your AI Learning Track
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each course is designed to build upon the previous one, creating a complete learning journey. 
            Start at your level and advance through our proven curriculum.
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl ${course.bgColor} border ${course.borderColor} hover:shadow-premium transition-all duration-300 group`}
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${course.textColor} bg-white`}>
                    {course.level}
                  </span>
                  <div className="flex">
                    {[...Array(course.difficulty)].map((_, i) => (
                      <StarIcon key={i} className={`w-4 h-4 ${course.textColor}`} />
                    ))}
                    {[...Array(3 - course.difficulty)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-gray-300" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
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
              </div>

              {/* Course Info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  {course.subtitle}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {course.description}
                </p>
                
                {/* Course Meta */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <PersonIcon className="w-4 h-4 mr-1" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
                    {course.rating} ({course.students} students)
                  </div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn:</h4>
                <div className="space-y-2">
                  {course.learningOutcomes.slice(0, 4).map((outcome, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{outcome}</span>
                    </div>
                  ))}
                  {course.learningOutcomes.length > 4 && (
                    <div className="text-sm text-gray-500 pl-8">
                      +{course.learningOutcomes.length - 4} more learning outcomes
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <div className="text-sm text-success-600 font-medium">
                      Save ${course.originalPrice - course.price} vs university programs
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Target Audience:</div>
                  <div className="text-sm font-medium text-gray-700">{course.targetAudience}</div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="mb-6 p-4 rounded-lg bg-white border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-1">Prerequisites:</div>
                <div className="text-sm text-gray-600">{course.prerequisites}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/courses/${course.id}`}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${course.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                  View Course Details
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/courses/${course.id}/preview`}
                    className="inline-flex items-center justify-center px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-white transition-all duration-300"
                  >
                    <PlayIcon className="mr-2 w-4 h-4" />
                    Preview
                  </Link>
                  <Link
                    href={`/courses/${course.id}/enroll`}
                    className={`inline-flex items-center justify-center px-4 py-2 border-2 ${course.borderColor} ${course.textColor} font-medium rounded-lg hover:bg-white transition-all duration-300`}
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Selection Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Not Sure Which Course to Start With?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Take our 2-minute assessment to get personalized course recommendations based on 
            your background, goals, and learning style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assessment"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
            >
              Take Course Assessment
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center px-8 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              Speak with an Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}