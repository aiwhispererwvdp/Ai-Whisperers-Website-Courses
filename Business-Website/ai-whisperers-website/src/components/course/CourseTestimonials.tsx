'use client';

import { motion } from 'framer-motion';
import { StarIcon, QuoteIcon } from '@radix-ui/react-icons';
import { Course } from '@/lib/types/course';

interface CourseTestimonialsProps {
  course: Course;
}

export default function CourseTestimonials({ course }: CourseTestimonialsProps) {
  // Course-specific testimonials based on course level and content
  const getTestimonials = () => {
    switch (course.id) {
      case 'ai-foundations':
        return [
          {
            name: 'Sarah Chen',
            role: 'Marketing Manager',
            company: 'TechStart Inc.',
            image: '/images/testimonials/sarah-chen.jpg',
            rating: 5,
            text: 'I went from knowing nothing about AI to confidently using 10+ AI tools in my daily work. The no-code approach was perfect for someone without a technical background. Now I\'m the go-to AI person at my company!',
            highlight: 'Became the company AI expert'
          },
          {
            name: 'Michael Rodriguez',
            role: 'Small Business Owner',
            company: 'Rodriguez Consulting',
            image: '/images/testimonials/michael-rodriguez.jpg',
            rating: 5,
            text: 'This course gave me the confidence to integrate AI into my consulting practice. The practical exercises and real-world examples made everything click. I\'ve already seen a 30% improvement in my workflow efficiency.',
            highlight: '30% workflow improvement'
          },
          {
            name: 'Jennifer Park',
            role: 'Career Changer',
            company: 'Freelance AI Consultant',
            image: '/images/testimonials/jennifer-park.jpg',
            rating: 5,
            text: 'After 15 years in traditional marketing, I was intimidated by AI. This course changed everything. The instructors made complex concepts simple, and now I\'m launching my own AI consulting business!',
            highlight: 'Launched AI consulting business'
          }
        ];
      case 'applied-ai':
        return [
          {
            name: 'David Kumar',
            role: 'Software Developer',
            company: 'DataFlow Systems',
            image: '/images/testimonials/david-kumar.jpg',
            rating: 5,
            text: 'The multi-provider API integration approach is brilliant. I learned to work with OpenAI, Anthropic, and Google AI all in one course. The production deployment section saved me weeks of research.',
            highlight: 'Multi-provider integration mastery'
          },
          {
            name: 'Lisa Thompson',
            role: 'Data Analyst',
            company: 'FinTech Solutions',
            image: '/images/testimonials/lisa-thompson.jpg',
            rating: 5,
            text: 'Finally, a course that bridges the gap between AI theory and practical implementation. The data processing pipeline project is now running in production at our company, processing 100K+ documents daily.',
            highlight: 'Production system processing 100K+ documents'
          },
          {
            name: 'Alex Wang',
            role: 'Technical Lead',
            company: 'StartupAI',
            image: '/images/testimonials/alex-wang.jpg',
            rating: 5,
            text: 'This course accelerated our product development by months. The comprehensive error handling and cloud deployment strategies are industry-grade. My team and I reference the materials constantly.',
            highlight: 'Accelerated product development by months'
          }
        ];
      case 'web-development-ai':
        return [
          {
            name: 'Rachel Martinez',
            role: 'Full-Stack Developer',
            company: 'WebCorp Technologies',
            image: '/images/testimonials/rachel-martinez.jpg',
            rating: 5,
            text: 'The most comprehensive web development course I\'ve ever taken. Building real-time AI features with React and Next.js felt magical. I got promoted to Senior Developer within 3 months of completion.',
            highlight: 'Promoted to Senior Developer'
          },
          {
            name: 'James Foster',
            role: 'Frontend Engineer',
            company: 'AIStream Inc.',
            image: '/images/testimonials/james-foster.jpg',
            rating: 5,
            text: 'The streaming AI responses and WebSocket implementation sections were game-changers. Our users love the Netflix-style recommendations we built using the course techniques. Revenue is up 25%.',
            highlight: '25% revenue increase'
          },
          {
            name: 'Sophie Dubois',
            role: 'Tech Entrepreneur',
            company: 'Founder, SmartAssist',
            image: '/images/testimonials/sophie-dubois.jpg',
            rating: 5,
            text: 'This course gave me the technical foundation to build my AI SaaS product. The production deployment and monitoring sections were invaluable. We launched to 1000+ users in our first month!',
            highlight: '1000+ users in first month'
          }
        ];
      case 'enterprise-ai':
        return [
          {
            name: 'Robert Johnson',
            role: 'Chief Technology Officer',
            company: 'Global Manufacturing Corp',
            image: '/images/testimonials/robert-johnson.jpg',
            rating: 5,
            text: 'The strategic frameworks and ROI modeling tools transformed how we approach AI initiatives. We\'ve successfully implemented AI across 3 business units, saving $2M annually while improving efficiency by 40%.',
            highlight: '$2M annual savings, 40% efficiency gain'
          },
          {
            name: 'Maria Santos',
            role: 'VP of Operations',
            company: 'Healthcare Solutions Ltd',
            image: '/images/testimonials/maria-santos.jpg',
            rating: 5,
            text: 'The change management and governance frameworks were exactly what we needed. Our AI transformation went smoothly with 95% employee buy-in. The board presentation templates were incredibly helpful.',
            highlight: '95% employee buy-in'
          },
          {
            name: 'Thomas Anderson',
            role: 'Management Consultant',
            company: 'Anderson Strategy Group',
            image: '/images/testimonials/thomas-anderson.jpg',
            rating: 5,
            text: 'This course elevated my consulting practice to a new level. The AI strategy frameworks and business case tools have become core to my offerings. I\'ve increased my rates by 60% and clients love the value.',
            highlight: '60% rate increase'
          }
        ];
      default:
        return [];
    }
  };

  const testimonials = getTestimonials();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real students who transformed their careers and businesses with our course.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-premium transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote Icon */}
              <QuoteIcon className={`w-8 h-8 ${course.textColor} mb-4`} />

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Highlight */}
              <div className={`p-3 rounded-lg ${course.bgColor} border ${course.borderColor} mb-6`}>
                <div className="text-sm font-medium text-gray-900">
                  Key Result: {testimonial.highlight}
                </div>
              </div>

              {/* Student Info */}
              <div className="flex items-center">
                {/* Placeholder avatar */}
                <div className={`w-12 h-12 rounded-full ${course.bgColor} ${course.textColor} flex items-center justify-center font-bold mr-4`}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Course Success Metrics
            </h3>
            <p className="text-gray-600">
              Real outcomes from students who completed {course.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-3xl font-bold ${course.textColor} mb-2`}>
                {course.rating}/5
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${course.textColor} mb-2`}>
                87%
              </div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${course.textColor} mb-2`}>
                92%
              </div>
              <div className="text-gray-600">Career Impact</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${course.textColor} mb-2`}>
                {course.students}+
              </div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}