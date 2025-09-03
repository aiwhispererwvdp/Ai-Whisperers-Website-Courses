'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Main CTA */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Transform Your Career with AI?
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Join thousands of professionals who've advanced their careers through comprehensive AI education. 
              Start your journey today with our proven curriculum.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/courses"
              className="group inline-flex items-center px-8 py-4 bg-accent-400 text-accent-900 font-bold text-lg rounded-xl hover:bg-accent-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse All Courses
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/consultation"
              className="group inline-flex items-center px-8 py-4 border-2 border-white/20 text-white font-semibold text-lg rounded-xl hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              <CalendarIcon className="mr-2 w-5 h-5" />
              Book Free Consultation
            </Link>
          </div>

          {/* Quick Access Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="w-12 h-12 bg-accent-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowRightIcon className="w-6 h-6 text-accent-900" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Start Immediately
              </h3>
              <p className="text-primary-100 mb-4">
                Course 1: AI Foundations. No coding required. Perfect for complete beginners.
              </p>
              <Link
                href="/courses/ai-foundations"
                className="text-accent-300 hover:text-accent-200 font-medium text-sm flex items-center justify-center"
              >
                Begin AI Foundations →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="w-12 h-12 bg-accent-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ChatBubbleIcon className="w-6 h-6 text-accent-900" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Get Expert Guidance
              </h3>
              <p className="text-primary-100 mb-4">
                Free 30-minute consultation to map your AI learning journey and career goals.
              </p>
              <Link
                href="/consultation"
                className="text-accent-300 hover:text-accent-200 font-medium text-sm flex items-center justify-center"
              >
                Schedule Consultation →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="w-12 h-12 bg-accent-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-6 h-6 text-accent-900" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Corporate Training
              </h3>
              <p className="text-primary-100 mb-4">
                Transform your entire team with custom AI training programs starting at $7,500/day.
              </p>
              <Link
                href="/enterprise"
                className="text-accent-300 hover:text-accent-200 font-medium text-sm flex items-center justify-center"
              >
                Explore Enterprise →
              </Link>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="pt-12 space-y-4"
          >
            <p className="text-primary-200 text-sm font-medium">
              30-Day Money-Back Guarantee • Lifetime Access • Complete Certificate
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-primary-200 text-sm">
              <span>✓ A+ Quality Grade (92/100)</span>
              <span>✓ 1,000+ Successful Graduates</span>
              <span>✓ Industry Expert Instructors</span>
              <span>✓ 24/7 Student Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}