'use client';

import Link from 'next/link';
import { EnvelopeClosedIcon, TwitterLogoIcon, LinkedInLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const footerNavigation = {
  courses: [
    { name: 'AI Foundations', href: '/courses/ai-foundations' },
    { name: 'Applied AI', href: '/courses/applied-ai' },
    { name: 'Web Development AI', href: '/courses/web-development-ai' },
    { name: 'Enterprise AI Business', href: '/courses/enterprise-ai' },
    { name: 'Course Bundles', href: '/courses/bundles' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/about/mission' },
    { name: 'Instructor Team', href: '/about/instructors' },
    { name: 'Student Success', href: '/success-stories' },
    { name: 'Careers', href: '/careers' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Resource Library', href: '/resources' },
    { name: 'AI Tools Guide', href: '/resources/ai-tools' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Free Assessment', href: '/assessment' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Free Consultation', href: '/consultation' },
    { name: 'Community', href: '/community' },
    { name: 'Enterprise Support', href: '/enterprise' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/aiwhisperers',
    icon: TwitterLogoIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/ai-whisperers',
    icon: LinkedInLogoIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ai-whisperers',
    icon: GitHubLogoIcon,
  },
  {
    name: 'Email',
    href: 'mailto:hello@ai-whisperers.com',
    icon: EnvelopeClosedIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Signup */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with AI Learning Insights
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Get weekly AI learning tips, course updates, and industry insights delivered to your inbox. 
              Join 5,000+ professionals advancing their AI skills.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent-400 focus:outline-none"
              />
              <button className="px-6 py-3 bg-accent-400 text-accent-900 font-semibold rounded-lg hover:bg-accent-300 transition-colors">
                Subscribe
              </button>
            </div>
            
            <p className="text-xs text-primary-200 mt-3">
              No spam, unsubscribe anytime. Privacy policy applies.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-white">
                AI-Whisperers
              </span>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              The world's only complete AI learning journey. From complete beginner to industry expert 
              in 65.5 hours of comprehensive, production-focused education.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-accent-400">1,000+</div>
                <div className="text-gray-400 text-sm">Successful Graduates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-400">85%+</div>
                <div className="text-gray-400 text-sm">Completion Rate</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Courses
            </h4>
            <ul className="space-y-3">
              {footerNavigation.courses.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 AI-Whisperers. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Quality Badge */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span>A+ Quality Grade (95/100)</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm max-w-3xl mx-auto">
              AI-Whisperers is committed to providing the highest quality AI education. 
              Our courses are continuously updated to reflect the latest industry developments and best practices. 
              <Link href="/about/quality" className="text-primary-400 hover:text-primary-300 ml-1">
                Learn about our quality standards →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}