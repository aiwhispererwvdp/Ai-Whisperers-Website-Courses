'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, QuestionMarkCircledIcon, CalendarIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const faqData = [
  {
    category: 'Course Selection',
    questions: [
      {
        question: 'Which course should I start with if I\'m a complete beginner?',
        answer: 'Start with Course 1: AI Foundations. It\'s designed specifically for people with no coding or AI background. You\'ll learn to use AI tools like ChatGPT, Canva, and others without any technical knowledge required. The course builds confidence and foundational understanding that prepares you for more advanced courses if you choose to continue.',
      },
      {
        question: 'I\'m a developer - can I skip the beginner course?',
        answer: 'While you could jump to Course 2: Applied AI, we recommend at least reviewing Course 1 materials. Even experienced developers often discover valuable insights about AI tool usage, prompt engineering, and bias evaluation. Course 1 also provides context for business applications that will make you more effective in technical roles.',
      },
      {
        question: 'What makes your Web Development AI course unique?',
        answer: 'Course 3 is the only comprehensive AI web development course available anywhere. While others offer basic introductions, we provide 21 hours of intensive training with React, Next.js, TypeScript, and real-time AI integration. You\'ll build production-ready applications with advanced features like streaming responses and multi-model orchestration.',
      },
    ],
  },
  {
    category: 'Course Content & Quality',
    questions: [
      {
        question: 'How current is your course content?',
        answer: 'Our courses are updated monthly to reflect the latest AI tools and industry developments. We monitor OpenAI, Anthropic, Google AI, and other major providers for updates. All code examples are tested regularly, and we add new case studies and examples as the industry evolves.',
      },
      {
        question: 'What\'s included in each course?',
        answer: 'Every course includes: comprehensive video lessons, hands-on projects, code repositories (for technical courses), assessment rubrics, student worksheets, instructor support materials, and completion certificates. You also get lifetime access to all updates and our exclusive alumni community.',
      },
      {
        question: 'How do your courses compare to university programs?',
        answer: 'Our courses focus on practical, immediately applicable skills rather than theoretical knowledge. While university programs cost $15,000-22,000 and take 6-24 months, our complete journey is $1,799 and can be completed in 3-6 months. You get production-ready skills that you can use immediately in your career.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes! For the Complete AI Learning Journey bundle ($1,799), we offer a 6-month payment plan at $300/month with no interest. Individual courses can be paid in full, and we accept all major credit cards, PayPal, and bank transfers for corporate accounts.',
      },
      {
        question: 'What\'s your refund policy?',
        answer: 'We offer a 30-day money-back guarantee on all courses and bundles. If you\'re not completely satisfied with the quality and value of your learning experience, we\'ll provide a full refund, no questions asked. We\'re confident in our course quality and student success rates.',
      },
      {
        question: 'Are there discounts for teams or organizations?',
        answer: 'Yes! Teams of 5+ people get 25% off bundle prices. For organizations needing custom training, we offer corporate packages starting at $7,500/day with customized content, dedicated support, and progress tracking. Contact us for enterprise pricing and volume discounts.',
      },
    ],
  },
  {
    category: 'Learning Experience',
    questions: [
      {
        question: 'How much time should I dedicate to learning?',
        answer: 'Most students dedicate 3-5 hours per week and complete individual courses in 3-5 weeks. The Complete AI Learning Journey typically takes 3-6 months with consistent effort. All courses are self-paced, so you can adjust the timeline to fit your schedule and learning style.',
      },
      {
        question: 'Do I need any special software or tools?',
        answer: 'For Course 1 (AI Foundations), you only need a web browser and internet connection. Technical courses (2-3) require a code editor like VS Code and basic development tools, which we help you set up. All AI services have free tiers to get started, though we recommend educational pricing for full access.',
      },
      {
        question: 'What kind of support do I get as a student?',
        answer: 'All students get access to our expert instructor team, detailed course materials, project feedback, and our exclusive community. Premium support includes office hours, 1-on-1 coaching sessions, career guidance, and priority response to questions.',
      },
    ],
  },
  {
    category: 'Career & Outcomes',
    questions: [
      {
        question: 'What career outcomes can I expect?',
        answer: 'Our graduates report significant career advancement: 60%+ get promotions or new roles, average salary increase of $25,000+, and 85% report improved job performance. Many transition into AI-focused roles, start consulting businesses, or lead AI initiatives at their companies.',
      },
      {
        question: 'Do you provide job placement assistance?',
        answer: 'While we don\'t guarantee job placement, we provide extensive career support: portfolio development guidance, interview preparation, industry networking opportunities, and access to our alumni network with professionals at top companies like Google, Microsoft, and Netflix.',
      },
      {
        question: 'How do I showcase my skills to employers?',
        answer: 'Each course includes portfolio projects that demonstrate real-world skills. Technical courses include GitHub repositories, deployed applications, and code examples. Business courses include strategic frameworks, ROI models, and presentation materials. All students receive completion certificates and digital badges.',
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
            <QuestionMarkCircledIcon className="mr-2 w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our courses, pricing, and learning experience.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const itemId = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <motion.div
                      key={itemId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: questionIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full p-6 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-300"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Still Have Questions?
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our AI education experts are here to help you choose the right learning path 
            and answer any specific questions about your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center px-8 py-3 bg-accent-400 text-accent-900 font-bold rounded-xl hover:bg-accent-300 transition-all duration-300"
            >
              <CalendarIcon className="mr-2 w-5 h-5" />
              Book Free Consultation
            </Link>
            <Link
              href="mailto:hello@ai-whisperers.com"
              className="inline-flex items-center px-8 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              <EnvelopeClosedIcon className="mr-2 w-5 h-5" />
              Email Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}