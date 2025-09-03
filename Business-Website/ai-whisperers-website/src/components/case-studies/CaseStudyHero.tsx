'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function CaseStudyHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-primary-500 text-primary-100 text-sm font-medium border border-primary-400"
            >
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
              Real Results from Real Students
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto"
            >
              From Complete Beginners to 
              <span className="text-accent-300"> AI Experts</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-primary-100">
                in 65.5 Hours
              </span>
            </motion.h1>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl lg:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed"
            >
              Discover how our students transformed their careers, increased their salaries, 
              and became AI leaders in their organizations. These are real transformations with measurable results.
            </motion.p>

            {/* Success Metrics Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 lg:gap-12 text-center pt-8"
            >
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent-300">95%</div>
                <div className="text-primary-200 font-medium">Career Advancement</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent-300">$35K+</div>
                <div className="text-primary-200 font-medium">Avg. Salary Increase</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent-300">89%</div>
                <div className="text-primary-200 font-medium">Promotion Rate</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent-300">4.9/5</div>
                <div className="text-primary-200 font-medium">Student Satisfaction</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link
                href="/courses"
                className="group inline-flex items-center px-8 py-4 bg-accent-600 text-white text-lg font-semibold rounded-xl hover:bg-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Transformation
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/consultation"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-primary-700 transition-all duration-300"
              >
                Get Free Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}