'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, HeartIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Course } from '@/lib/types/course';

interface CoursePreviewCTAProps {
  course: Course;
}

export default function CoursePreviewCTA({ course }: CoursePreviewCTAProps) {
  return (
    <section className={`py-20 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/waves.svg')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <HeartIcon className="w-6 h-6 text-accent-300" />
              <span className="text-lg font-medium text-accent-200">
                Enjoyed the preview?
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Master {course.title}?
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-8">
              You've seen just 3 lessons from our {course.lessons}-lesson masterclass. 
              Imagine what you'll accomplish with the complete course.
            </p>
          </motion.div>

          {/* Preview vs Full Course Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What You've Experienced */}
              <div>
                <h3 className="text-2xl font-bold mb-6">What You've Experienced</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">3 sample lessons</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">Hands-on activities</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">Our teaching approach</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">Sample materials</span>
                  </div>
                </div>
              </div>

              {/* What You'll Get */}
              <div>
                <h3 className="text-2xl font-bold mb-6">The Complete Course Includes</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <LightningBoltIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{course.lessons} comprehensive lessons ({course.duration})</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <LightningBoltIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{course.curriculum.projectCount} hands-on projects</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <LightningBoltIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">Complete resource library</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <LightningBoltIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">Certificate of completion</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <LightningBoltIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">Lifetime access & updates</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <LightningBoltIcon className="w-5 h-5 text-accent-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
            </div>
          </motion.div>

          {/* Pricing and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
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
              <p className="text-white/80 text-lg mb-8">
                One-time payment • Lifetime access • 30-day guarantee
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/courses/${course.id}/enroll`}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Enroll Now - Complete Your Journey
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
                
                <Link
                  href={`/courses/${course.id}`}
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                >
                  View Full Course Details
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white/90 text-lg italic mb-4">
                "The preview gave me confidence that this course would deliver real value. 
                After completing the full program, I can say it exceeded my expectations. 
                The hands-on approach and practical projects made all the difference."
              </p>
              <div className="text-accent-300 font-semibold">
                — Recent Student
              </div>
            </div>
          </motion.div>

          {/* Final reassurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/70">
              🔒 Secure payment • 💡 Start learning immediately • 🚀 Join thousands of successful students
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}