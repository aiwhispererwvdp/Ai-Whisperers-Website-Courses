'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, PersonIcon, ReaderIcon, CodeIcon, RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const caseStudies = [
  {
    id: 'sarah-marketing-director',
    category: 'Career Transformation',
    title: 'From Marketing Manager to AI Strategy Director',
    student: {
      name: 'Sarah Chen',
      previousRole: 'Marketing Manager',
      currentRole: 'AI Strategy Director',
      company: 'Fortune 500 Retail',
      image: '/images/students/sarah-chen.jpg', // Placeholder
    },
    transformation: {
      timeframe: '8 months',
      salaryIncrease: '$45,000',
      promotionLevels: 2,
    },
    challenge: 'Sarah was stuck in traditional marketing roles despite 8 years of experience. She needed AI skills to advance to strategic leadership positions.',
    solution: 'Completed our complete AI journey: Foundations → Applied AI → Enterprise Business. Built AI-powered customer segmentation system as capstone project.',
    results: [
      'Promoted to Director level in 8 months',
      'Led company-wide AI transformation initiative',
      'Increased marketing ROI by 340% using AI tools',
      'Speaking at 3 industry conferences on AI marketing',
    ],
    testimonial: "The comprehensive curriculum didn't just teach me AI tools—it taught me how to think strategically about AI transformation. I went from using basic marketing tools to leading a $2M AI initiative.",
    coursesCompleted: ['AI Foundations', 'Applied AI', 'Enterprise AI Business'],
    icon: PersonIcon,
  },
  {
    id: 'marcus-developer',
    category: 'Technical Mastery',
    title: 'Junior Developer to Senior AI Engineer',
    student: {
      name: 'Marcus Rodriguez',
      previousRole: 'Junior Web Developer',
      currentRole: 'Senior AI Engineer',
      company: 'Tech Startup',
      image: '/images/students/marcus-rodriguez.jpg', // Placeholder
    },
    transformation: {
      timeframe: '6 months',
      salaryIncrease: '$52,000',
      promotionLevels: 3,
    },
    challenge: 'Marcus had basic web development skills but no AI experience. He was competing with CS graduates for senior positions.',
    solution: 'Focused on Applied AI → Web Development AI track. Built 5 production AI applications including a real-time sentiment analysis dashboard.',
    results: [
      'Jumped 3 levels from Junior to Senior in 6 months',
      'Built AI features used by 50K+ users daily',
      'Leading AI development team of 6 engineers',
      'Contributed to 2 open-source AI frameworks',
    ],
    testimonial: "The Web Development AI course was a game-changer. I went from basic React to building sophisticated AI interfaces. Now I'm the go-to person for AI integration at my company.",
    coursesCompleted: ['Applied AI', 'Web Development AI Apps'],
    icon: CodeIcon,
  },
  {
    id: 'jennifer-consultant',
    category: 'Business Leadership',
    title: 'Business Analyst to AI Transformation Consultant',
    student: {
      name: 'Jennifer Park',
      previousRole: 'Senior Business Analyst',
      currentRole: 'AI Transformation Consultant',
      company: 'Independent Consultant',
      image: '/images/students/jennifer-park.jpg', // Placeholder
    },
    transformation: {
      timeframe: '10 months',
      salaryIncrease: '$78,000',
      promotionLevels: 0, // Independent
    },
    challenge: 'Jennifer wanted to start her own AI consulting practice but lacked the technical depth and business frameworks to serve enterprise clients.',
    solution: 'Complete 4-course journey with focus on Enterprise AI Business. Built 3 real client case studies during the program.',
    results: [
      'Launched successful AI consulting practice',
      'Secured 6-figure contracts with 3 Fortune 1000 companies',
      'Developed proprietary AI ROI assessment framework',
      'Hired 2 junior consultants within first year',
    ],
    testimonial: "The Enterprise AI course gave me the frameworks and confidence to command premium consulting rates. I'm now earning more in my first year than I did after 10 years as an analyst.",
    coursesCompleted: ['AI Foundations', 'Applied AI', 'Enterprise AI Business'],
    icon: RocketIcon,
  },
  {
    id: 'david-career-change',
    category: 'Complete Career Pivot',
    title: 'From Retail Manager to AI Product Manager',
    student: {
      name: 'David Kim',
      previousRole: 'Retail Store Manager',
      currentRole: 'AI Product Manager',
      company: 'Healthcare Tech',
      image: '/images/students/david-kim.jpg', // Placeholder
    },
    transformation: {
      timeframe: '12 months',
      salaryIncrease: '$67,000',
      promotionLevels: 0, // Career change
    },
    challenge: 'David had 15 years in retail management but wanted to transition to tech. He had no coding or AI background.',
    solution: 'Started with AI Foundations, progressed through all 4 courses. Built portfolio of 8 AI projects demonstrating business impact.',
    results: [
      'Complete career pivot from retail to tech',
      'Product managing AI diagnostic tools for 200K+ patients',
      'Led product launch that generated $5M ARR',
      'Recruited by 2 other healthcare AI companies',
    ],
    testimonial: "I thought I was too old to switch careers at 38. The AI Foundations course showed me that AI is about solving business problems, not just coding. Now I'm using my management experience to lead AI product teams.",
    coursesCompleted: ['AI Foundations', 'Applied AI', 'Web Development AI Apps', 'Enterprise AI Business'],
    icon: ReaderIcon,
  },
];

export default function CaseStudyGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Real Student Transformations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From career changers to industry experts—discover how our comprehensive AI education 
            creates measurable career transformations across all experience levels.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <study.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-600 mb-1">{study.category}</div>
                    <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{study.student.name}</div>
                    <div className="text-gray-600">{study.student.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Transformation Time</div>
                    <div className="text-lg font-bold text-primary-600">{study.transformation.timeframe}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">From</div>
                    <div className="text-sm font-medium text-gray-900">{study.student.previousRole}</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">To</div>
                    <div className="text-sm font-medium text-primary-600">{study.student.currentRole}</div>
                  </div>
                </div>

                <div className="mt-4 text-center p-3 bg-success-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Salary Increase</div>
                  <div className="text-xl font-bold text-success-700">+{study.transformation.salaryIncrease}</div>
                </div>
              </div>

              {/* Key Results */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Results</h4>
                <ul className="space-y-2">
                  {study.results.slice(0, 3).map((result, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial Preview */}
              <div className="mb-6 p-4 bg-primary-50 rounded-xl">
                <div className="text-gray-700 text-sm italic line-clamp-3">
                  "{study.testimonial.slice(0, 120)}..."
                </div>
              </div>

              {/* Courses */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-900 mb-2">Courses Completed</div>
                <div className="flex flex-wrap gap-2">
                  {study.coursesCompleted.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/case-studies/${study.id}`}
                className="group flex items-center justify-between w-full p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300"
              >
                <span className="font-semibold">Read Full Case Study</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center"
        >
          <Link
            href="/case-studies/all"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All 50+ Success Stories
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}