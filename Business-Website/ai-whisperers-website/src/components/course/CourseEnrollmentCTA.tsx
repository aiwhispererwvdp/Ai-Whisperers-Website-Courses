'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, ClockIcon, LockClosedIcon, UpdateIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Course } from '@/lib/types/course';

interface CourseEnrollmentCTAProps {
  course: Course;
}

export default function CourseEnrollmentCTA({ course }: CourseEnrollmentCTAProps) {
  return (
    <section className={`py-20 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white">
          {/* Main CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your AI Skills?
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join {course.students}+ students who have already mastered {course.title} and transformed their careers.
            </p>
          </motion.div>

          {/* Course Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Learning Today</h3>
                <p className="text-white/80">
                  Immediate access to all {course.lessons} lessons and {course.curriculum.projectCount} hands-on projects
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LockClosedIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Risk-Free Learning</h3>
                <p className="text-white/80">
                  30-day money-back guarantee. Not satisfied? Get a full refund, no questions asked
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UpdateIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lifetime Updates</h3>
                <p className="text-white/80">
                  Keep your skills current with free updates as AI technology evolves
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pricing and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-12"
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-5xl font-bold text-white">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <>
                    <span className="text-2xl text-white/60 line-through">
                      ${course.originalPrice}
                    </span>
                    <span className="bg-accent-400 text-accent-900 px-3 py-1 rounded-full text-sm font-bold">
                      Save ${course.originalPrice - course.price}
                    </span>
                  </>
                )}
              </div>
              <p className="text-white/80 text-lg">
                One-time payment • Lifetime access • No monthly fees
              </p>
            </div>

            {/* What's Included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-accent-300 flex-shrink-0" />
                <span className="text-white/90">{course.duration} of premium content</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-accent-300 flex-shrink-0" />
                <span className="text-white/90">{course.lessons} comprehensive lessons</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-accent-300 flex-shrink-0" />
                <span className="text-white/90">{course.curriculum.projectCount} hands-on projects</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-accent-300 flex-shrink-0" />
                <span className="text-white/90">Certificate of completion</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-accent-300 flex-shrink-0" />
                <span className="text-white/90">Lifetime access & updates</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-accent-300 flex-shrink-0" />
                <span className="text-white/90">30-day money-back guarantee</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/courses/${course.id}/enroll`}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Enroll Now - Start Learning Today
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                href={`/courses/${course.id}/preview`}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                Try Free Preview
              </Link>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-3xl font-bold text-accent-300 mb-2">
                {course.students}+
              </div>
              <div className="text-white/80">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300 mb-2">
                {course.rating}/5
              </div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300 mb-2">
                87%
              </div>
              <div className="text-white/80">Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300 mb-2">
                30-Day
              </div>
              <div className="text-white/80">Money-Back Guarantee</div>
            </div>
          </motion.div>

          {/* Urgency/Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/80 text-lg">
              🔥 <strong>847 students</strong> enrolled in the last 30 days
            </p>
            <p className="text-white/60 mt-2">
              Join thousands of professionals who have transformed their careers with AI
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}