'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Course } from '@/lib/types/course';

interface CourseFAQProps {
  course: Course;
}

export default function CourseFAQ({ course }: CourseFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Course-specific FAQ items
  const getFAQItems = () => {
    const commonFAQs = [
      {
        question: "How long do I have access to the course?",
        answer: "You get lifetime access to all course materials, including any future updates. Once you enroll, the content is yours forever."
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with the course content, we'll provide a full refund, no questions asked."
      },
      {
        question: "Can I get a certificate upon completion?",
        answer: `Yes, you'll receive a verified certificate of completion for ${course.title} that you can add to your LinkedIn profile and resume.`
      },
      {
        question: "How is this course different from free online resources?",
        answer: "Our course provides structured, comprehensive learning with hands-on projects, expert instruction, and practical business applications. You'll get immediate support, curated content, and real-world skills that free resources can't match."
      }
    ];

    let specificFAQs = [];

    switch (course.id) {
      case 'ai-foundations':
        specificFAQs = [
          {
            question: "Do I need any coding experience?",
            answer: "Absolutely not! This course is specifically designed for complete beginners with no coding background. We focus entirely on no-code AI tools that anyone can use."
          },
          {
            question: "What AI tools will I learn to use?",
            answer: "You'll master 10+ AI tools including ChatGPT, Canva AI, Grammarly, Google AI tools, voice assistants, and more. All tools used are accessible and free or low-cost."
          },
          {
            question: "How quickly can I start using AI in my work?",
            answer: "You can start applying AI tools immediately after the first lesson. By the end of the course, you'll be confidently using AI for presentations, content creation, and business analysis."
          }
        ];
        break;
      case 'applied-ai':
        specificFAQs = [
          {
            question: "What programming languages are covered?",
            answer: "The course covers both Python and JavaScript, with complete code examples and starter templates. We provide setup guides for both languages."
          },
          {
            question: "Do I need API keys for the major AI providers?",
            answer: "You'll need API keys for OpenAI, Anthropic, and Google AI. We provide detailed setup instructions and cost optimization strategies to minimize expenses while learning."
          },
          {
            question: "Can I use this to build production applications?",
            answer: "Absolutely! The course includes production deployment strategies, error handling, and scaling considerations. Many students have launched real applications using the techniques taught."
          }
        ];
        break;
      case 'web-development-ai':
        specificFAQs = [
          {
            question: "What's the required experience level?",
            answer: "You should be comfortable with JavaScript/TypeScript and have basic React experience. We provide a pre-course checklist to ensure you're ready."
          },
          {
            question: "Will I build real applications?",
            answer: "Yes! You'll build multiple production-ready applications including AI chat interfaces, recommendation systems, and real-time collaborative tools. All projects include full deployment."
          },
          {
            question: "How current are the frameworks and tools?",
            answer: "We use the latest versions of Next.js 14+, React 18, and TypeScript. The course is regularly updated to reflect current best practices and new features."
          }
        ];
        break;
      case 'enterprise-ai':
        specificFAQs = [
          {
            question: "Is this suitable for non-technical executives?",
            answer: "Yes! This course is designed for business leaders, executives, and managers. We focus on strategy, ROI, and business transformation rather than technical implementation."
          },
          {
            question: "Will I get templates and frameworks I can use immediately?",
            answer: "Absolutely! The course includes ready-to-use templates for AI strategy documents, ROI calculators, business cases, board presentations, and governance frameworks."
          },
          {
            question: "How do I justify the ROI of AI investments to my board?",
            answer: "The course includes comprehensive ROI modeling tools, real case studies, and board-ready presentation templates that clearly demonstrate AI business value and competitive advantages."
          }
        ];
        break;
    }

    return [...specificFAQs, ...commonFAQs];
  };

  const faqItems = getFAQItems();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about {course.title}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <div className={`flex-shrink-0 ${course.textColor} transition-transform duration-200`}>
                  {openItems.includes(index) ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`p-8 rounded-2xl ${course.bgColor} border ${course.borderColor}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you make the best decision for your AI learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${course.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300`}
              >
                Contact Us
              </a>
              <a
                href="/consultation"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-white transition-all duration-300"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}