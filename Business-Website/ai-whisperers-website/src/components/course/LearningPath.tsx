'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';

const learningPath = [
  {
    step: 1,
    course: 'AI Foundations',
    title: 'Discover AI',
    description: 'Start with no-code AI tools and practical applications',
    duration: '12 hours',
    skills: ['AI Tool Mastery', 'Prompt Engineering', 'Quality Evaluation'],
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    step: 2,
    course: 'Applied AI',
    title: 'Build with Code',
    description: 'Create real applications with multiple AI providers',
    duration: '15 hours',
    skills: ['API Integration', 'Data Processing', 'Production Deployment'],
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    step: 3,
    course: 'AI Web Apps',
    title: 'Full-Stack Mastery',
    description: 'Build sophisticated web applications with modern frameworks',
    duration: '21 hours',
    skills: ['React + AI', 'Real-time Streaming', 'Advanced Architecture'],
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
  {
    step: 4,
    course: 'Enterprise AI',
    title: 'Strategic Leadership',
    description: 'Lead AI transformation and strategy in organizations',
    duration: '17.5 hours',
    skills: ['AI Strategy', 'ROI Modeling', 'Change Management'],
    color: 'bg-amber-500',
    lightColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
];

export default function LearningPath() {
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
            Your Progressive Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each course builds upon the previous one, creating a complete skill set from absolute beginner 
            to industry expert. Start at any level that matches your current experience.
          </p>
        </motion.div>

        {/* Learning Path Visualization */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-300 via-blue-300 via-purple-300 to-amber-300"></div>

          {/* Path Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {learningPath.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg relative z-10`}>
                  {step.step}
                </div>

                {/* Arrow (desktop only) */}
                {index < learningPath.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 z-20">
                    <ArrowRightIcon className="w-8 h-8 text-gray-300" />
                  </div>
                )}

                {/* Content Card */}
                <div className={`p-6 rounded-xl ${step.lightColor} border border-gray-200 hover:shadow-lg transition-all duration-300`}>
                  <div className="text-center mb-4">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${step.textColor} bg-white mb-2`}>
                      {step.course}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {step.description}
                    </p>
                    <div className="text-sm font-medium text-gray-500">
                      {step.duration}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Key Skills:</h4>
                    {step.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckIcon className="w-4 h-4 text-success-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Path Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">Start Anywhere</div>
            <p className="text-gray-600">
              Jump in at your current skill level. Each course is self-contained while building toward mastery.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-3xl font-bold text-success-600 mb-2">Build Progressively</div>
            <p className="text-gray-600">
              Each course prepares you for the next level, creating deep, interconnected knowledge.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-3xl font-bold text-accent-600 mb-2">Achieve Mastery</div>
            <p className="text-gray-600">
              Complete the journey with comprehensive AI expertise spanning tools, code, and strategy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}