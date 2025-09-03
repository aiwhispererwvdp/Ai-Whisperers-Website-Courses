'use client';

import { motion } from 'framer-motion';
import { BarChartIcon, PersonIcon, AvatarIcon, StarIcon } from '@radix-ui/react-icons';

const metrics = [
  {
    icon: BarChartIcon,
    value: '95%',
    label: 'Career Advancement Rate',
    description: 'Students who advanced their careers within 6 months',
    trend: '+12% vs industry average',
  },
  {
    icon: PersonIcon,
    value: '$35,000+',
    label: 'Average Salary Increase',
    description: 'Mean salary growth within 12 months of completion',
    trend: '68% above market rate',
  },
  {
    icon: AvatarIcon,
    value: '89%',
    label: 'Promotion Rate',
    description: 'Students promoted to senior or leadership roles',
    trend: '3x higher than peers',
  },
  {
    icon: StarIcon,
    value: '4.9/5',
    label: 'Student Satisfaction',
    description: 'Based on 500+ verified student reviews',
    trend: 'Industry-leading score',
  },
];

const industryBreakdown = [
  { industry: 'Technology', percentage: 45, growth: '+42%' },
  { industry: 'Finance', percentage: 25, growth: '+38%' },
  { industry: 'Healthcare', percentage: 15, growth: '+51%' },
  { industry: 'Consulting', percentage: 10, growth: '+47%' },
  { industry: 'Other', percentage: 5, growth: '+35%' },
];

export default function TransformationMetrics() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Measurable Career Transformations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our students don't just learn AI—they transform their careers. 
            Here's the data that proves our comprehensive approach works.
          </p>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <metric.icon className="w-6 h-6 text-primary-600" />
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{metric.label}</div>
              <div className="text-gray-600 text-sm mb-3">{metric.description}</div>
              
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-success-100 text-success-700 text-xs font-medium">
                {metric.trend}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Success Across All Industries
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive curriculum prepares students for AI roles across every major industry. 
              Here's where our graduates are making an impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Industry List */}
            <div className="space-y-4">
              {industryBreakdown.map((item, index) => (
                <motion.div
                  key={item.industry}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  className="flex items-center justify-between p-4 bg-white rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold text-gray-900">{item.industry}</div>
                    <div className="text-gray-500">{item.percentage}% of students</div>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-success-100 text-success-700 text-sm font-medium">
                    {item.growth} avg. growth
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Representation */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Impact Distribution</h4>
                <p className="text-gray-600 text-sm">Where our students are transforming industries</p>
              </div>
              
              <div className="space-y-4">
                {industryBreakdown.map((item, index) => (
                  <div key={item.industry} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{item.industry}</span>
                      <span className="text-sm text-gray-500">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 1.0, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}