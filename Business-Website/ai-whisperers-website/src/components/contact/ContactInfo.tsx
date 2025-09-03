'use client';

import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  EnvelopeClosedIcon, 
  ChatBubbleIcon,
  CalendarIcon,
  QuestionMarkCircledIcon,
  RocketIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

const contactMethods = [
  {
    icon: CalendarIcon,
    title: 'Free Consultation',
    description: 'Book a 30-minute session with our AI education experts',
    details: 'Get personalized course recommendations and career guidance',
    action: 'Schedule Consultation',
    href: '/consultation',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
    highlight: true,
  },
  {
    icon: EnvelopeClosedIcon,
    title: 'Email Support',
    description: 'Get detailed answers to your questions',
    details: 'hello@ai-whisperers.com • Response within 4 hours',
    action: 'Send Email',
    href: 'mailto:hello@ai-whisperers.com',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    highlight: false,
  },
  {
    icon: ChatBubbleIcon,
    title: 'Live Chat',
    description: 'Instant support during business hours',
    details: 'Mon-Fri 9AM-6PM EST • Weekend support available',
    action: 'Start Chat',
    href: '#',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    highlight: false,
  },
];

const quickLinks = [
  {
    icon: QuestionMarkCircledIcon,
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our courses',
    href: '/faq',
  },
  {
    icon: RocketIcon,
    title: 'Course Recommendation Quiz',
    description: 'Take our 2-minute assessment to find your perfect course',
    href: '/assessment',
  },
  {
    icon: CalendarIcon,
    title: 'Corporate Training Inquiry',
    description: 'Custom AI training programs for teams and organizations',
    href: '/enterprise',
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Choose How You'd Like to Connect
        </h3>
        
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                method.highlight 
                  ? 'border-primary-200 bg-primary-50 ring-2 ring-primary-100' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {method.title}
                    {method.highlight && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                        Recommended
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600 mb-2">{method.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{method.details}</p>
                  
                  <Link
                    href={method.href}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      method.highlight
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {method.action}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Helpful Resources
        </h3>
        
        <div className="space-y-3">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              <Link
                href={link.href}
                className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group"
              >
                <link.icon className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {link.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {link.description}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="p-6 rounded-xl bg-gray-50 border border-gray-200"
      >
        <div className="flex items-start space-x-3">
          <ClockIcon className="w-5 h-5 text-gray-500 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Monday - Friday: 9:00 AM - 6:00 PM EST</div>
              <div>Saturday: 10:00 AM - 4:00 PM EST</div>
              <div>Sunday: Emergency support only</div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              * Free consultations available outside business hours by appointment
            </p>
          </div>
        </div>
      </motion.div>

      {/* Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="p-6 rounded-xl bg-success-50 border border-success-200 text-center"
      >
        <h4 className="font-semibold text-success-800 mb-2">
          Our Commitment to You
        </h4>
        <p className="text-success-700 text-sm">
          We're committed to your AI learning success. Every consultation, course, and interaction 
          is designed to advance your career and achieve your goals.
          <br />
          <span className="font-medium">100% satisfaction guaranteed or full refund within 30 days.</span>
        </p>
      </motion.div>
    </div>
  );
}