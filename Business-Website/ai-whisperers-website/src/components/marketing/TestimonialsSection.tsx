'use client';

import { motion } from 'framer-motion';
import { StarFilledIcon, QuoteIcon, PersonIcon } from '@radix-ui/react-icons';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Software Developer → AI Specialist',
    company: 'Microsoft',
    image: '/testimonials/sarah-chen.jpg',
    rating: 5,
    course: 'Complete AI Learning Journey',
    quote: 'I went from knowing nothing about AI to building production AI applications in just 3 months. The progression from no-code tools to full-stack development was perfect. Got promoted to AI Specialist with a 40% salary increase.',
    outcome: '+40% Salary Increase',
    timeframe: '3 months',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'VP of Engineering',
    company: 'Stripe',
    image: '/testimonials/marcus-rodriguez.jpg',
    rating: 5,
    course: 'Enterprise AI Business',
    quote: 'The business strategy course gave me the frameworks I needed to lead our AI transformation. The ROI modeling tools alone saved me weeks of work. Presented to our board last month and got approval for $2M AI initiative.',
    outcome: '$2M Initiative Approved',
    timeframe: '6 weeks',
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Marketing Manager → AI Product Manager',
    company: 'Shopify',
    image: '/testimonials/emily-watson.jpg',
    rating: 5,
    course: 'AI Foundations + Applied AI',
    quote: 'Started with the beginner course and loved it so much I took Applied AI too. Now I\'m leading AI product development at Shopify. The hands-on approach made all the difference - I actually know how to implement what I learned.',
    outcome: 'Career Transition',
    timeframe: '4 months',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Full-Stack Developer',
    company: 'Netflix',
    image: '/testimonials/david-kim.jpg',
    rating: 5,
    course: 'AI-Powered Web Apps',
    quote: 'The web development AI course is incredible - nothing like it exists anywhere else. I built a recommendation system using the techniques from the course and it\'s now serving millions of users at Netflix. This course is a game-changer.',
    outcome: 'Production Deployment',
    timeframe: '2 months',
  },
  {
    id: 5,
    name: 'Jennifer Park',
    role: 'Business Consultant → AI Strategy Consultant',
    company: 'McKinsey & Company',
    image: '/testimonials/jennifer-park.jpg',
    rating: 5,
    course: 'Complete AI Learning Journey',
    quote: 'The comprehensive approach is unmatched. I can now consult on AI strategy at the C-suite level and also understand the technical implementation. Clients pay premium rates because I bridge business and technical perspectives.',
    outcome: '+200% Consulting Rates',
    timeframe: '5 months',
  },
  {
    id: 6,
    name: 'Alex Thompson',
    role: 'Startup Founder',
    company: 'AI-First SaaS',
    image: '/testimonials/alex-thompson.jpg',
    rating: 5,
    course: 'Applied AI + Web Development AI',
    quote: 'Built my entire SaaS product using techniques from these courses. We\'re now processing 100K+ AI requests daily and just raised our Series A. The multi-provider approach saved us from vendor lock-in and gave us competitive advantage.',
    outcome: 'Series A Funding',
    timeframe: '8 months',
  },
];

export default function TestimonialsSection() {
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
            <StarFilledIcon className="mr-2 w-4 h-4" />
            Student Success Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real Students, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our graduates don't just learn AI - they transform their careers, lead organizational change, 
            and build production systems serving millions of users.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-premium transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {/* Profile image placeholder - replace with actual images */}
                    <PersonIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm font-medium text-primary-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarFilledIcon key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <QuoteIcon className="absolute -top-2 -left-2 w-8 h-8 text-primary-200" />
                <blockquote className="text-gray-700 leading-relaxed pl-6">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              {/* Results */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-sm text-gray-500">Course Taken</div>
                  <div className="font-medium text-gray-900">{testimonial.course}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Outcome</div>
                  <div className="font-semibold text-success-600">{testimonial.outcome}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-r from-success-500 to-success-600 text-white text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Join 1,000+ Professionals Who Transformed Their Careers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-3xl font-bold text-success-100">95%</div>
              <div className="text-success-100">Report Career Impact</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-100">$25K+</div>
              <div className="text-success-100">Average Salary Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-100">85%+</div>
              <div className="text-success-100">Complete All Courses</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}