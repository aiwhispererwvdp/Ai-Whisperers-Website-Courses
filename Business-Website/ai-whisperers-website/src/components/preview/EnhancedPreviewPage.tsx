'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  CheckIcon, 
  HeartIcon, 
  ArrowRightIcon,
  BookmarkIcon,
  ClockIcon,
  PersonIcon 
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { Course } from '@/lib/types/course';
import InteractivePreviewContainer from '@/components/interactive/InteractivePreviewContainer';

interface EnhancedPreviewPageProps {
  course: Course;
}

export default function EnhancedPreviewPage({ course }: EnhancedPreviewPageProps) {
  const [previewProgress, setPreviewProgress] = useState(0);
  const [engagementScore, setEngagementScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showPreviewComplete, setShowPreviewComplete] = useState(false);

  // Track time spent on preview
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate engagement score based on time and interactions
  useEffect(() => {
    const baseScore = Math.min(timeSpent / 300, 1) * 40; // 40 points for 5+ minutes
    const progressScore = previewProgress * 60; // 60 points for completion
    setEngagementScore(Math.round(baseScore + progressScore));
    
    if (previewProgress >= 100 && timeSpent > 300) {
      setShowPreviewComplete(true);
    }
  }, [timeSpent, previewProgress]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero with Progress */}
      <section className={`py-16 ${course.bgColor} relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Preview Badge */}
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-accent-100 text-accent-800 text-sm font-medium mb-6">
              <PlayIcon className="w-4 h-4 mr-2" />
              Free Interactive Preview
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Experience {course.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get hands-on with our teaching methodology. Interactive demos, sample lessons, and real course materials.
            </p>

            {/* Live Engagement Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                <ClockIcon className="w-4 h-4 text-primary-600" />
                <span className="font-medium text-gray-800">{formatTime(timeSpent)}</span>
                <span className="text-gray-500 text-sm">preview time</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                <HeartIcon className="w-4 h-4 text-red-500" />
                <span className="font-medium text-gray-800">{engagementScore}</span>
                <span className="text-gray-500 text-sm">engagement score</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                <BookmarkIcon className="w-4 h-4 text-green-500" />
                <span className="font-medium text-gray-800">{Math.round(previewProgress)}%</span>
                <span className="text-gray-500 text-sm">complete</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractivePreviewContainer 
            courseId={course.id}
            courseTitle={course.title}
          />
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What You've Experienced */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What You've Just Experienced
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckIcon className="w-5 h-5 text-success-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Our Teaching Methodology</h4>
                    <p className="text-gray-600 text-sm">
                      Hands-on, practical learning that builds real skills through interactive exercises
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckIcon className="w-5 h-5 text-success-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality of Content</h4>
                    <p className="text-gray-600 text-sm">
                      Professional-grade materials and exercises used by industry professionals
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckIcon className="w-5 h-5 text-success-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Practical Application</h4>
                    <p className="text-gray-600 text-sm">
                      Real-world examples and tools you can use immediately in your work
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Full Course Value */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                The Complete Course Includes
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full ${course.bgColor} ${course.textColor} flex items-center justify-center font-bold`}>
                    {course.lessons}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Complete Lessons</h4>
                    <p className="text-gray-600 text-sm">
                      {course.duration} of comprehensive content with {course.curriculum.projectCount} hands-on projects
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full ${course.bgColor} ${course.textColor} flex items-center justify-center`}>
                    📚
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Resource Library</h4>
                    <p className="text-gray-600 text-sm">
                      Templates, worksheets, code examples, and downloadable tools
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full ${course.bgColor} ${course.textColor} flex items-center justify-center`}>
                    🏆
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Certification & Support</h4>
                    <p className="text-gray-600 text-sm">
                      Professional certificate plus lifetime access and instructor support
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Join Successful Students
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <PersonIcon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {course.students}+
              </div>
              <div className="text-gray-600 text-sm">Students Enrolled</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-success-600 mb-1">
                {course.rating}/5
              </div>
              <div className="text-gray-600 text-sm">Average Rating</div>
              <div className="text-xs text-gray-500 mt-1">Based on verified reviews</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                87%
              </div>
              <div className="text-gray-600 text-sm">Completion Rate</div>
              <div className="text-xs text-gray-500 mt-1">Industry average: 12%</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-accent-600 mb-1">
                95%
              </div>
              <div className="text-gray-600 text-sm">Career Advancement</div>
              <div className="text-xs text-gray-500 mt-1">Within 6 months</div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Completion CTA */}
      {showPreviewComplete && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`py-20 bg-gradient-to-br ${course.color} text-white relative overflow-hidden`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-10 h-10 text-red-500" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Loved the Preview? 
            </h2>
            <p className="text-xl text-white/90 mb-8">
              You spent {formatTime(timeSpent)} exploring our teaching approach. 
              Ready to transform your AI skills with the complete {course.duration} journey?
            </p>
            
            {/* Special Offer for Preview Completers */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">
                🎉 Special Preview Completion Offer
              </h3>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-4xl font-bold">
                  ${Math.round(course.price * 0.85)}
                </span>
                <span className="text-2xl text-white/60 line-through">
                  ${course.price}
                </span>
                <span className="bg-accent-400 text-accent-900 px-3 py-1 rounded-full text-sm font-bold">
                  Save ${Math.round(course.price * 0.15)}
                </span>
              </div>
              
              <p className="text-white/80 mb-6">
                15% discount for completing the interactive preview • Valid for 24 hours
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/courses/${course.id}/enroll?discount=PREVIEW15`}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Claim Discount & Enroll
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
                
                <Link
                  href="/consultation"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-accent-300 mb-1">30-Day</div>
                <div className="text-white/80 text-sm">Money-Back Guarantee</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-accent-300 mb-1">Lifetime</div>
                <div className="text-white/80 text-sm">Access & Updates</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-accent-300 mb-1">24/7</div>
                <div className="text-white/80 text-sm">Student Support</div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              What Students Say About This Course
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The preview convinced me this was different from other AI courses. The hands-on approach and real-world examples made complex concepts easy to understand.",
                  author: "Sarah Chen",
                  role: "Marketing Director",
                  rating: 5,
                },
                {
                  quote: "I was skeptical about online learning, but the interactive demos showed me this wasn't just theory. The practical skills I gained were immediately applicable.",
                  author: "Marcus Rodriguez", 
                  role: "Software Developer",
                  rating: 5,
                },
                {
                  quote: "The ROI calculator opened my eyes to the business value of AI. Within 3 months of completing the course, I led a successful AI initiative at my company.",
                  author: "Jennifer Park",
                  role: "Business Analyst",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-20 bg-gradient-to-br ${course.color} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Transform Your Career with AI
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join {course.students}+ students who chose AI-Whisperers for their AI education. 
              Start your transformation today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/courses/${course.id}/enroll`}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Enroll in Full Course - ${course.price}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                href="/consultation"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                Get Free Consultation
              </Link>
            </div>
            
            <div className="mt-8 text-white/70 text-sm">
              🔒 Secure enrollment • 💡 Instant access • 🎯 30-day guarantee
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}