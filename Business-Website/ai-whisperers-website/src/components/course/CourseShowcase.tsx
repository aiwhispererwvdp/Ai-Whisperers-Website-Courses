'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, PlayIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { courses } from '@/lib/courses';

export default function CourseShowcase() {
  return (
    <section className="py-20 bg-gray-50">
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
            Your Complete AI Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four specialized tracks designed to take you from complete beginner to industry expert. 
            Choose your starting point and advance at your own pace.
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl ${course.bgColor} border border-gray-200 hover:shadow-premium transition-all duration-300 group`}
            >
              {/* Course Level Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${course.textColor} bg-white`}>
                  {course.level}
                </span>
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
                <p className="text-gray-700 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Details */}
              <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${course.price}
                </div>
              </div>

              {/* Course Highlights */}
              <div className="space-y-3 mb-8">
                {course.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Course Actions */}
              <div className="space-y-3">
                <Link
                  href={`/courses/${course.id}`}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${course.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                  Learn More
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href={`/courses/${course.id}/preview`}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-white transition-all duration-300"
                >
                  <PlayIcon className="mr-2 w-4 h-4" />
                  Free Preview
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundle Offer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white text-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-400 text-accent-900 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent-600 rounded-full mr-2 animate-pulse"></span>
              Limited Time - Save $697
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Complete AI Learning Journey
            </h3>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              All 4 courses bundled together. The most comprehensive AI education available anywhere.
              <span className="block mt-2 font-semibold">
                From no-code beginner to production AI developer.
              </span>
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">$2,496</div>
                <div className="text-sm opacity-75 line-through">Individual Price</div>
              </div>
              <div className="text-4xl font-bold text-accent-300">→</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-300">$1,799</div>
                <div className="text-sm opacity-75">Bundle Price</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses/bundle"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent-400 text-accent-900 font-bold text-lg rounded-xl hover:bg-accent-300 transition-all duration-300 shadow-lg"
              >
                Get Complete Bundle
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                href="/courses/compare"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold text-lg rounded-xl hover:border-white/40 hover:bg-white/10 transition-all duration-300"
              >
                Compare Courses
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}