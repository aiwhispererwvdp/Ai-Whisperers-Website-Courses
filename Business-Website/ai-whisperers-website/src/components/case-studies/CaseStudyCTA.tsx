'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, ReaderIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function CaseStudyCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Write Your 
                <span className="text-accent-300"> Success Story</span>?
              </h2>
              <p className="text-xl text-primary-100 leading-relaxed">
                Join 500+ professionals who transformed their careers with our comprehensive AI education. 
                Your transformation story could be next.
              </p>
            </div>

            {/* Success Indicators */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-500/30 p-4 rounded-xl border border-primary-400/30">
                <div className="text-2xl font-bold text-accent-300 mb-1">95%</div>
                <div className="text-primary-100 text-sm">Career Advancement Rate</div>
              </div>
              <div className="bg-primary-500/30 p-4 rounded-xl border border-primary-400/30">
                <div className="text-2xl font-bold text-accent-300 mb-1">6 months</div>
                <div className="text-primary-100 text-sm">Average Transformation Time</div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-300 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-white mb-1">Comprehensive Curriculum</div>
                  <div className="text-primary-100 text-sm">4 specialized courses covering every aspect of AI</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-300 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-white mb-1">Production-Ready Skills</div>
                  <div className="text-primary-100 text-sm">Build real applications, not just theory</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-300 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-white mb-1">Career Support</div>
                  <div className="text-primary-100 text-sm">Ongoing mentorship and industry connections</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Primary CTA */}
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <ReaderIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Start Your AI Journey</h3>
                  <p className="text-gray-600">Begin with our comprehensive course catalog</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Complete AI Journey (4 courses)</span>
                  <span className="font-semibold text-primary-600">$1,799</span>
                </div>
                <div className="text-center text-sm text-gray-500">
                  Save $697 vs. individual courses
                </div>
              </div>
              
              <Link
                href="/courses"
                className="group w-full inline-flex items-center justify-center px-6 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
              >
                View All Courses
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Secondary CTA */}
            <div className="bg-primary-500/20 border border-primary-400/30 p-8 rounded-3xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-accent-400/20 rounded-xl flex items-center justify-center border border-accent-400/30">
                  <ChatBubbleIcon className="w-6 h-6 text-accent-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Free Consultation</h3>
                  <p className="text-primary-100">Get personalized course recommendations</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6 text-primary-100 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-accent-300 rounded-full"></div>
                  <span>Assess your current AI knowledge level</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-accent-300 rounded-full"></div>
                  <span>Create personalized learning roadmap</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-accent-300 rounded-full"></div>
                  <span>Discuss career goals and outcomes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-accent-300 rounded-full"></div>
                  <span>15-minute session with AI education expert</span>
                </div>
              </div>
              
              <Link
                href="/consultation"
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-700 transition-all duration-300"
              >
                Book Free Consultation
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="text-center text-primary-100 text-sm">
              <div className="mb-2">✓ 30-day money-back guarantee</div>
              <div className="mb-2">✓ Lifetime access to course materials</div>
              <div>✓ Direct access to instructors and mentors</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}