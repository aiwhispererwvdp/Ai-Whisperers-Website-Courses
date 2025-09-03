'use client';

import { motion } from 'framer-motion';
import { 
  RocketIcon, 
  CodeIcon, 
  GearIcon, 
  TargetIcon,
  StarIcon,
  LightningBoltIcon,
  PersonIcon,
  BarChartIcon
} from '@radix-ui/react-icons';

const features = [
  {
    icon: RocketIcon,
    title: 'Production-Ready Skills',
    description: 'Build real applications and deploy to production. Not theoretical knowledge, but practical skills you\'ll use immediately in your career.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: CodeIcon,
    title: 'No-Code to Full-Stack',
    description: 'Start with AI tools anyone can use, advance to building sophisticated web applications with React, Next.js, and TypeScript.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: GearIcon,
    title: 'Multi-Provider Integration',
    description: 'Learn to work with OpenAI, Anthropic, Google AI, and more. Build applications that aren\'t locked into a single provider.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: TargetIcon,
    title: 'Career-Focused Learning',
    description: 'Every lesson designed for immediate professional application. Build portfolio projects that get you hired or promoted.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: StarIcon,
    title: 'Comprehensive Progression',
    description: 'The only education provider offering complete beginner-to-expert journey. No gaps, no fragmented learning experience.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: LightningBoltIcon,
    title: 'Industry-Leading Quality',
    description: 'A+ grade curriculum (95/100) with detailed assessments, rubrics, and instructor support. University-quality at accessible pricing.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: PersonIcon,
    title: 'Executive-Ready Strategy',
    description: 'Lead AI transformation in your organization. Strategic frameworks, ROI modeling, and change management for business leaders.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    icon: BarChartIcon,
    title: 'Proven Outcomes',
    description: '85%+ completion rate, 4.7/5 satisfaction, 60%+ career advancement. Real results from real students.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
];

export default function FeaturesSection() {
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
            Why AI-Whisperers is Different
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The Most Comprehensive AI Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just teach AI concepts. We build your complete skill set from absolute beginner 
            to industry expert, with production-ready projects and real career outcomes.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 p-8 lg:p-12 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Real Numbers, Real Results
            </h3>
            <p className="text-xl text-gray-300">
              Our students achieve measurable career and business outcomes
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                85%+
              </div>
              <div className="text-gray-300 font-medium">
                Course Completion Rate
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                4.7/5
              </div>
              <div className="text-gray-300 font-medium">
                Average Satisfaction
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                60%+
              </div>
              <div className="text-gray-300 font-medium">
                Career Advancement
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                $25K+
              </div>
              <div className="text-gray-300 font-medium">
                Average Salary Increase
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}