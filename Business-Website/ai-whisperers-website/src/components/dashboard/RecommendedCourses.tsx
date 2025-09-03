'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, StarIcon, ClockIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface RecommendedCoursesProps {
  userId: string;
}

const recommendedCourses = [
  {
    id: 'enterprise-ai',
    title: 'AI for Business',
    description: 'Lead AI transformation in your organization',
    price: 899,
    duration: '17.5h',
    level: 'Advanced',
    reason: 'Perfect next step after completing Applied AI',
    benefits: [
      'Strategic AI frameworks',
      'Business case development',
      'Executive presentation skills',
    ],
    featured: true,
  },
  {
    id: 'complete-journey',
    title: 'Complete AI Learning Journey',
    description: 'All 4 courses - From complete beginner to industry expert',
    price: 1799,
    originalPrice: 2496,
    savings: 697,
    duration: '65.5h',
    level: 'All Levels',
    reason: 'Best value for comprehensive AI mastery',
    benefits: [
      'Complete skill development',
      'Career transformation package',
      'Lifetime access & updates',
    ],
    featured: false,
  },
];

export default function RecommendedCourses({ userId }: RecommendedCoursesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recommended for You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your learning progress and goals, here are the courses that will 
            accelerate your AI expertise and career growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recommendedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 ${
                course.featured ? 'border-primary-200 ring-2 ring-primary-500/20' : 'border-gray-200'
              }`}
            >
              {/* Featured Badge */}
              {course.featured && (
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 text-center">
                  <span className="font-semibold text-sm flex items-center justify-center">
                    <StarIcon className="w-4 h-4 mr-2" />
                    Recommended for Your Progress Level
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Course Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{course.description}</p>
                    </div>
                    <div className="text-right">
                      {course.savings ? (
                        <div>
                          <div className="text-lg text-gray-500 line-through">${course.originalPrice}</div>
                          <div className="text-2xl font-bold text-success-600">${course.price}</div>
                          <div className="text-sm text-success-600 font-medium">Save ${course.savings}</div>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-gray-900">${course.price}</div>
                      )}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div>{course.level}</div>
                  </div>
                </div>

                {/* Recommendation Reason */}
                <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
                  <div className="text-sm font-medium text-primary-800 mb-2">
                    Why we recommend this:
                  </div>
                  <div className="text-sm text-primary-700">
                    {course.reason}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-900 mb-3">
                    What you'll gain:
                  </div>
                  <div className="space-y-2">
                    {course.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    href={`/courses/${course.id}`}
                    className="group w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link
                    href={`/courses/${course.id}/enroll`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 text-primary-600 font-semibold border-2 border-primary-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}