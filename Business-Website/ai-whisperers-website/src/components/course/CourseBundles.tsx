'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  CheckIcon,
  StarIcon,
  LightningBoltIcon,
  RocketIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

const bundles = [
  {
    id: 'complete-journey',
    title: 'Complete AI Learning Journey',
    subtitle: 'From Complete Beginner to Industry Expert',
    description: 'All 4 courses bundled together. The most comprehensive AI education available anywhere.',
    courses: ['AI Foundations', 'Applied AI', 'AI-Powered Web Apps', 'AI for Business'],
    totalHours: '65.5 hours',
    totalLessons: 26,
    individualPrice: 2496,
    bundlePrice: 1799,
    savings: 697,
    savingsPercent: 28,
    features: [
      'Complete beginner-to-expert progression',
      'No-code tools to production applications',
      'Business strategy and technical implementation',
      'Lifetime access to all course updates',
      'Priority support and community access',
      'Completion certificates for all courses',
      '6-month payment plan available',
    ],
    highlight: 'Most Comprehensive',
    color: 'from-primary-500 to-primary-700',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
    popular: true,
    recommended: true,
  },
  {
    id: 'technical-track',
    title: 'Technical Track Bundle',
    subtitle: 'Developer-Focused AI Mastery',
    description: 'Perfect for developers wanting to specialize in AI application development.',
    courses: ['Applied AI', 'AI-Powered Web Apps'],
    totalHours: '36 hours',
    totalLessons: 13,
    individualPrice: 998,
    bundlePrice: 899,
    savings: 99,
    savingsPercent: 10,
    features: [
      'Multi-provider API integration mastery',
      'Modern web development with AI',
      'Production deployment strategies',
      'Advanced testing and monitoring',
      'Career advancement focused',
      'Portfolio project development',
    ],
    highlight: 'Developer Focused',
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    popular: false,
    recommended: false,
  },
  {
    id: 'business-track',
    title: 'Business Track Bundle',
    subtitle: 'Non-Technical to Strategic Leadership',
    description: 'Perfect progression for business professionals advancing to AI leadership roles.',
    courses: ['AI Foundations', 'AI for Business'],
    totalHours: '29.5 hours',
    totalLessons: 13,
    individualPrice: 1198,
    bundlePrice: 999,
    savings: 199,
    savingsPercent: 17,
    features: [
      'No-code AI mastery foundation',
      'Strategic business frameworks',
      'ROI modeling and business cases',
      'Change management expertise',
      'Executive presentation skills',
      'Organizational transformation',
    ],
    highlight: 'Business Leadership',
    color: 'from-amber-500 to-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    popular: false,
    recommended: false,
  },
];

export default function CourseBundles() {
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success-100 text-success-700 text-sm font-medium mb-4">
            <LightningBoltIcon className="mr-2 w-4 h-4" />
            Save with Course Bundles
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Accelerate Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Save money and time with our carefully curated course bundles. Each bundle is designed 
            for specific career paths and learning objectives.
          </p>
        </motion.div>

        {/* Bundles Grid */}
        <div className="space-y-8">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative p-8 lg:p-12 rounded-2xl ${bundle.bgColor} border ${bundle.borderColor} ${bundle.recommended ? 'ring-4 ring-primary-200' : ''} hover:shadow-premium transition-all duration-300`}
            >
              {/* Recommended Badge */}
              {bundle.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-6 py-2 bg-primary-600 text-white text-sm font-bold rounded-full">
                    ⭐ RECOMMENDED
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Bundle Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${bundle.color}`}>
                      {bundle.highlight}
                    </div>
                    {bundle.popular && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                        Most Popular
                      </div>
                    )}
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    {bundle.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {bundle.subtitle}
                  </p>
                  <p className="text-gray-700 mb-6">
                    {bundle.description}
                  </p>

                  {/* Included Courses */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {bundle.courses.map((course, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckIcon className="w-4 h-4 text-success-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bundle Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bundle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckIcon className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="lg:col-span-1">
                  <div className="p-6 rounded-xl bg-white border border-gray-200 text-center">
                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-1">Individual Courses:</div>
                      <div className="text-2xl text-gray-400 line-through mb-2">
                        ${bundle.individualPrice}
                      </div>
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        ${bundle.bundlePrice}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-success-100 text-success-700 text-sm font-medium">
                        Save ${bundle.savings} ({bundle.savingsPercent}%)
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <div className="font-semibold text-gray-900">{bundle.totalHours}</div>
                        <div className="text-gray-600">Total Content</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{bundle.totalLessons}</div>
                        <div className="text-gray-600">Lessons</div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Link
                        href={`/courses/bundle/${bundle.id}`}
                        className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${bundle.color} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300`}
                      >
                        <RocketIcon className="mr-2 w-4 h-4" />
                        Get Bundle
                      </Link>
                      
                      <Link
                        href={`/courses/bundle/${bundle.id}/details`}
                        className="w-full inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>

                    {/* Payment Options */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        💳 Payment plans available
                        <br />
                        🔒 30-day money-back guarantee
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundle Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg"
        >
          <div className="p-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">
              Bundle Comparison
            </h3>
            <p className="text-primary-100">
              Choose the learning path that matches your career goals
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Complete Journey</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Technical Track</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Business Track</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Total Content Hours</td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">65.5 hours</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">36 hours</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">29.5 hours</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">Career Path</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">Any → AI Expert</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">Developer → AI Specialist</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">Business → AI Leader</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Bundle Price</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-primary-600">$1,799</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-purple-600">$899</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-amber-600">$999</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">Savings</td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-success-600">Save $697</td>
                  <td className="px-6 py-4 text-center text-sm text-success-600">Save $99</td>
                  <td className="px-6 py-4 text-center text-sm text-success-600">Save $199</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Best For</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">Complete Career Transformation</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">Technical AI Specialization</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">AI Business Leadership</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses/bundle/complete-journey"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
              >
                <StarIcon className="mr-2 w-4 h-4" />
                Get Complete Journey
              </Link>
              <Link
                href="/courses/compare"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-white transition-all duration-300"
              >
                Compare All Options
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center"
        >
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-4">
              Why Choose Course Bundles?
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our bundles aren't just cost savings - they're designed learning journeys that build 
              skills progressively and create comprehensive expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <RocketIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Progressive Learning</h4>
              <p className="text-gray-300 text-sm">
                Each course builds on the previous one, creating deep, interconnected knowledge
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-success-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Guaranteed Results</h4>
              <p className="text-gray-300 text-sm">
                Complete any bundle and you're guaranteed measurable career advancement
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LightningBoltIcon className="w-6 h-6 text-accent-900" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Maximum Value</h4>
              <p className="text-gray-300 text-sm">
                Save money while getting the most comprehensive AI education available
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}