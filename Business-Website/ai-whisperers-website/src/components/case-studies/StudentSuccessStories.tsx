'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { QuoteIcon, StarFilledIcon } from '@radix-ui/react-icons';

const successStories = [
  {
    id: 'alex-enterprise',
    student: {
      name: 'Alex Thompson',
      role: 'VP of Digital Transformation',
      company: 'Global Manufacturing',
      location: 'Detroit, MI',
      image: '/images/students/alex-thompson.jpg', // Placeholder
    },
    story: {
      background: 'Led traditional IT operations for 12 years but struggled to drive AI adoption across 15,000-employee organization.',
      challenge: 'Board demanded AI strategy, but Alex lacked practical framework to assess AI opportunities and build business cases.',
      journey: 'Completed Enterprise AI Business course while managing full-time VP responsibilities. Applied frameworks immediately to real projects.',
      transformation: 'Developed comprehensive AI roadmap, secured $8M AI investment, and established Center of Excellence for AI innovation.',
      impact: {
        timeframe: '14 months',
        metrics: [
          '$8M AI budget secured',
          '25% operational efficiency gain',
          '3 AI products in production',
          '50+ employees trained'
        ]
      }
    },
    testimonial: "The Enterprise AI course gave me the strategic frameworks I needed to transform our entire organization. We went from AI skeptics to AI leaders in our industry.",
    rating: 5,
    featured: true,
  },
  {
    id: 'priya-startup',
    student: {
      name: 'Priya Patel',
      role: 'Co-Founder & CTO',
      company: 'HealthTech Startup',
      location: 'San Francisco, CA',
      image: '/images/students/priya-patel.jpg', // Placeholder
    },
    story: {
      background: 'Experienced software engineer with healthcare domain expertise but no practical AI development experience.',
      challenge: 'Needed to build AI-powered diagnostic tools to compete with well-funded startups backed by AI experts.',
      journey: 'Completed Applied AI and Web Development AI courses. Built MVP during coursework using multi-provider AI integration.',
      transformation: 'Launched AI diagnostic platform, raised $2.5M seed round, and hired team of 8 engineers and data scientists.',
      impact: {
        timeframe: '18 months',
        metrics: [
          '$2.5M seed funding raised',
          '10K+ patients served',
          '94% diagnostic accuracy',
          '8 team members hired'
        ]
      }
    },
    testimonial: "The technical depth of the AI courses was incredible. I went from never touching AI APIs to building production-grade AI applications that are improving patient outcomes.",
    rating: 5,
    featured: true,
  },
  {
    id: 'carlos-freelancer',
    student: {
      name: 'Carlos Miranda',
      role: 'AI Automation Consultant',
      company: 'Independent Consultant',
      location: 'Austin, TX',
      image: '/images/students/carlos-miranda.jpg', // Placeholder
    },
    story: {
      background: 'Web developer earning $65K/year doing traditional website projects, struggling to differentiate in competitive market.',
      challenge: 'Wanted to offer high-value services but lacked specialized skills that commanded premium rates.',
      journey: 'Started with AI Foundations, completed full journey. Built portfolio of AI automation projects during courses.',
      transformation: 'Launched AI automation consultancy, increased rates by 300%, and built recurring revenue streams.',
      impact: {
        timeframe: '10 months',
        metrics: [
          '300% rate increase achieved',
          '$180K annual revenue',
          '15+ enterprise clients',
          '85% client retention rate'
        ]
      }
    },
    testimonial: "I went from competing on price for basic web work to being the go-to AI automation expert in my region. The comprehensive curriculum made all the difference.",
    rating: 5,
    featured: false,
  },
  {
    id: 'maria-corporate',
    student: {
      name: 'Maria Rodriguez',
      role: 'Director of Innovation',
      company: 'Financial Services',
      location: 'New York, NY',
      image: '/images/students/maria-rodriguez.jpg', // Placeholder
    },
    story: {
      background: '15 years in financial services innovation but traditional background in process improvement, not AI.',
      challenge: 'Pressure to deliver AI-driven innovation but lacked technical understanding to guide development teams.',
      journey: 'Completed AI Foundations and Enterprise AI Business courses. Built business cases for 5 AI initiatives.',
      transformation: 'Led implementation of 3 AI products, established AI governance framework, promoted to SVP level.',
      impact: {
        timeframe: '16 months',
        metrics: [
          '3 AI products launched',
          '$12M cost savings delivered',
          'SVP promotion achieved',
          '90% team AI literacy'
        ]
      }
    },
    testimonial: "The business-focused approach helped me bridge the gap between AI possibilities and business reality. I can now confidently lead AI initiatives across our organization.",
    rating: 5,
    featured: false,
  }
];

export default function StudentSuccessStories() {
  const [selectedStory, setSelectedStory] = useState(successStories[0]);
  
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
            In Their Own Words
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear directly from students who transformed their careers through our comprehensive AI education. 
            These are unedited testimonials from verified graduates.
          </p>
        </motion.div>

        {/* Featured Story Selector */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {successStories.map((story) => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedStory.id === story.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {story.student.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Story Display */}
        <motion.div
          key={selectedStory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Story Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <QuoteIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedStory.student.name}
                  </h3>
                  <div className="text-primary-600 font-semibold mb-1">
                    {selectedStory.student.role}
                  </div>
                  <div className="text-gray-600">
                    {selectedStory.student.company} • {selectedStory.student.location}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mt-3">
                    {[...Array(selectedStory.rating)].map((_, i) => (
                      <StarFilledIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Testimonial */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-lg text-gray-700 italic leading-relaxed">
                  "{selectedStory.testimonial}"
                </div>
              </div>

              {/* Story Journey */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Background</h4>
                  <p className="text-gray-600 text-sm">{selectedStory.story.background}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                  <p className="text-gray-600 text-sm">{selectedStory.story.challenge}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">AI-Whisperers Journey</h4>
                  <p className="text-gray-600 text-sm">{selectedStory.story.journey}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Transformation</h4>
                  <p className="text-gray-600 text-sm">{selectedStory.story.transformation}</p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Impact Achieved</h4>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {selectedStory.story.impact.timeframe}
                  </div>
                  <div className="text-gray-500 text-sm">Transformation Timeline</div>
                </div>
                
                <div className="space-y-3">
                  {selectedStory.story.impact.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 bg-success-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm font-medium text-gray-900">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-success-50 to-success-100 p-6 rounded-2xl">
                <h5 className="font-bold text-gray-900 mb-4 text-center">Quick Stats</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-700">5.0</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-700">100%</div>
                    <div className="text-xs text-gray-600">Completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-8 p-6 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Career Advancement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">$35K+</div>
              <div className="text-sm text-gray-600">Avg. Salary Increase</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}