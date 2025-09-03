'use client';

import { motion } from 'framer-motion';
import { CheckIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const comparisonData = {
  categories: [
    'Content Hours',
    'Hands-on Projects',
    'Production Focus',
    'Career Support',
    'Industry Currency',
    'Comprehensive Progression',
    'Multi-Provider Integration',
    'Business Strategy',
    'Code Examples',
    'Assessment Quality',
    'Instructor Support',
    'Community Access',
    'Lifetime Updates',
    'Money-back Guarantee',
  ],
  providers: [
    {
      name: 'AI-Whisperers',
      price: '$299-$1,799',
      highlight: true,
      features: [
        '65.5 hours comprehensive',
        '100+ practical projects',
        'Production deployment focus',
        'Career advancement tracking',
        'Monthly updates, latest tools',
        'Beginner to expert journey',
        'OpenAI + Anthropic + Google',
        'Executive-level frameworks',
        'Production-ready code',
        'Detailed rubrics + grading',
        'Expert instructor guidance',
        'Exclusive alumni network',
        'Lifetime access included',
        '30-day full refund',
      ],
      checks: Array(14).fill(true),
    },
    {
      name: 'Coursera',
      price: '$39-49/month',
      highlight: false,
      features: [
        '20-40 hours (fragmented)',
        'Basic assignments',
        'Academic focus',
        'Basic certificate only',
        'Quarterly updates',
        'Individual courses only',
        'Single provider focus',
        'Limited business content',
        'Academic examples',
        'Basic quizzes',
        'Variable quality',
        'General discussion forums',
        'Subscription required',
        'No refund policy',
      ],
      checks: [true, false, false, false, true, false, false, false, false, false, false, true, false, false],
    },
    {
      name: 'Udemy',
      price: '$20-300',
      highlight: false,
      features: [
        '5-20 hours per course',
        'Variable quality projects',
        'Mixed focus',
        'Certificate of completion',
        'Irregular updates',
        'No planned progression',
        'Usually single provider',
        'Minimal business focus',
        'Basic code examples',
        'Simple quizzes',
        'Individual instructor',
        'Basic Q&A sections',
        'One-time purchase',
        '30-day refund',
      ],
      checks: [false, false, false, false, false, false, false, false, false, false, false, false, true, true],
    },
    {
      name: 'University Programs',
      price: '$15,000-22,000',
      highlight: false,
      features: [
        '40-60 hours (semester)',
        'Academic projects',
        'Theoretical focus',
        'Career services',
        'Annual curriculum updates',
        'Structured program',
        'Academic partnerships',
        'MBA-level business content',
        'Research-focused code',
        'Comprehensive exams',
        'Professor + TA support',
        'Alumni networks',
        'Program completion',
        'No refunds',
      ],
      checks: [true, false, false, true, false, true, false, true, false, true, true, true, true, false],
    },
  ],
};

export default function CourseComparison() {
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
            How We Compare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See why AI-Whisperers offers the most comprehensive and practical AI education available. 
            We're the only provider with complete beginner-to-expert progression.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-white font-semibold">Features</div>
              {comparisonData.providers.map((provider) => (
                <div
                  key={provider.name}
                  className={`text-center ${
                    provider.highlight
                      ? 'bg-accent-400 text-accent-900 rounded-lg p-3 font-bold'
                      : 'text-white font-semibold'
                  }`}
                >
                  <div className="font-bold">{provider.name}</div>
                  <div className="text-sm opacity-90">{provider.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-gray-200">
            {comparisonData.categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.05 }}
                viewport={{ once: true }}
                className={`grid grid-cols-5 gap-4 p-4 ${
                  categoryIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="font-medium text-gray-900 flex items-center">
                  {category}
                </div>
                {comparisonData.providers.map((provider) => (
                  <div key={provider.name} className="text-center flex items-center justify-center">
                    {provider.checks[categoryIndex] ? (
                      <div className="flex flex-col items-center">
                        <CheckIcon className="w-6 h-6 text-success-500 mb-1" />
                        <span className="text-xs text-gray-600 text-center">
                          {provider.features[categoryIndex]}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <CrossCircledIcon className="w-6 h-6 text-gray-300 mb-1" />
                        <span className="text-xs text-gray-400 text-center">
                          {provider.features[categoryIndex]}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="bg-primary-50 p-6 text-center">
            <p className="text-gray-700 mb-4">
              Ready to experience the most comprehensive AI education available?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300">
                Start Free Preview
              </button>
              <button className="px-6 py-3 border border-primary-300 text-primary-700 font-semibold rounded-xl hover:border-primary-400 hover:bg-white transition-all duration-300">
                Compare Detailed Features
              </button>
            </div>
          </div>
        </motion.div>

        {/* Unique Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              Why Choose AI-Whisperers?
            </h3>
            <p className="text-xl text-gray-300">
              We're the only education provider offering complete beginner-to-expert AI progression
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-success-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Production-Ready</h4>
              <p className="text-gray-300 text-sm">
                Build real applications, not just learn concepts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Complete Journey</h4>
              <p className="text-gray-300 text-sm">
                Beginner to expert progression in one platform
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="w-6 h-6 text-accent-900" />
              </div>
              <h4 className="font-semibold mb-2">Unique Specialization</h4>
              <p className="text-gray-300 text-sm">
                AI web development course available nowhere else
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Premium Value</h4>
              <p className="text-gray-300 text-sm">
                70-95% savings vs university programs
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}