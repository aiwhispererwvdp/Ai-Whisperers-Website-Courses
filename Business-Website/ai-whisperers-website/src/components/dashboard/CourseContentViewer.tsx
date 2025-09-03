'use client';

import { motion } from 'framer-motion';
import { PlayIcon, CheckIcon, BookmarkIcon, ClockIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { User } from 'next-auth';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface CourseContentViewerProps {
  course: Course;
  user: User;
}

const courseLessons = {
  'ai-foundations': [
    { id: 1, title: 'What is AI? - Interactive AI Detective Hunt', duration: '2h', status: 'completed' },
    { id: 2, title: 'AI in Daily Life - Hands-on Tool Exploration Lab', duration: '2h', status: 'completed' },
    { id: 3, title: 'Your First AI Creations - Business Presentation', duration: '2h', status: 'completed' },
    { id: 4, title: 'AI Quality Control - Bias Detection Workshop', duration: '2h', status: 'completed' },
    { id: 5, title: 'Real-World Applications - Team Solution Design', duration: '2h', status: 'completed' },
    { id: 6, title: 'Your AI Portfolio - Complete Mini-Project', duration: '2h', status: 'completed' },
  ],
  'applied-ai': [
    { id: 1, title: 'Multi-Provider AI Integration Setup', duration: '2.5h', status: 'completed' },
    { id: 2, title: 'Data Processing Pipeline Development', duration: '2.5h', status: 'completed' },
    { id: 3, title: 'Sentiment Analysis Dashboard Build', duration: '2.5h', status: 'completed' },
    { id: 4, title: 'Multilingual Content Analyzer', duration: '2.5h', status: 'completed' },
    { id: 5, title: 'Production Error Handling & Testing', duration: '2.5h', status: 'completed' },
    { id: 6, title: 'Cloud Deployment & Monitoring', duration: '2.5h', status: 'current' },
  ],
  'web-development-ai': [
    { id: 1, title: 'Modern React Setup with AI Integration', duration: '3h', status: 'completed' },
    { id: 2, title: 'Real-Time Chat Interface Development', duration: '3h', status: 'completed' },
    { id: 3, title: 'Advanced Component Architecture', duration: '3h', status: 'completed' },
    { id: 4, title: 'Streaming AI Responses & State Management', duration: '3h', status: 'current' },
    { id: 5, title: 'Production Optimization & Performance', duration: '3h', status: 'locked' },
    { id: 6, title: 'AI Testing Strategies & Quality Assurance', duration: '3h', status: 'locked' },
    { id: 7, title: 'Full-Stack AI Application Deployment', duration: '3h', status: 'locked' },
  ],
};

export default function CourseContentViewer({ course, user }: CourseContentViewerProps) {
  const lessons = courseLessons[course.id as keyof typeof courseLessons] || [];
  const completedLessons = lessons.filter(l => l.status === 'completed').length;
  const currentLesson = lessons.find(l => l.status === 'current');
  const progress = (completedLessons / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Navigation */}
            <Link
              href="/dashboard"
              className="inline-flex items-center text-primary-200 hover:text-white transition-colors mb-6"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Info */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-primary-100 mb-6 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <BookmarkIcon className="w-5 h-5 text-accent-300" />
                    <span className="text-primary-100">{lessons.length} Lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-5 h-5 text-accent-300" />
                    <span className="text-primary-100">
                      {lessons.reduce((total, lesson) => total + parseFloat(lesson.duration), 0)}h Total
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="w-5 h-5 text-accent-300" />
                    <span className="text-primary-100">{completedLessons} Completed</span>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-primary-500/30 backdrop-blur-sm rounded-2xl p-6 border border-primary-400/30">
                <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-accent-300 mb-1">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-primary-200 text-sm">Complete</div>
                </div>

                <div className="w-full bg-primary-600 rounded-full h-3 mb-4">
                  <motion.div
                    className="bg-accent-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.5, duration: 1.0, ease: 'easeOut' }}
                  />
                </div>

                <div className="text-center text-primary-100 text-sm">
                  {completedLessons} of {lessons.length} lessons completed
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Lesson Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Lessons</h3>
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-xl border transition-all duration-200 ${
                        lesson.status === 'completed'
                          ? 'bg-success-50 border-success-200'
                          : lesson.status === 'current'
                          ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-500/20'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          lesson.status === 'completed'
                            ? 'bg-success-500'
                            : lesson.status === 'current'
                            ? 'bg-primary-500'
                            : 'bg-gray-300'
                        }`}>
                          {lesson.status === 'completed' ? (
                            <CheckIcon className="w-4 h-4 text-white" />
                          ) : lesson.status === 'current' ? (
                            <PlayIcon className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-white text-xs font-bold">{lesson.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${
                            lesson.status === 'locked' ? 'text-gray-500' : 'text-gray-900'
                          }`}>
                            Lesson {lesson.id}
                          </div>
                          <div className="text-xs text-gray-500">
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                      <div className={`mt-2 text-sm ${
                        lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-700'
                      }`}>
                        {lesson.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {currentLesson ? (
                  <>
                    {/* Current Lesson Header */}
                    <div className="p-8 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Lesson {currentLesson.id}: {currentLesson.title}
                          </h2>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <span>Duration: {currentLesson.duration}</span>
                            <span>•</span>
                            <span>Interactive Content</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">Progress</div>
                          <div className="text-2xl font-bold text-primary-600">{Math.round(progress)}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Content */}
                    <div className="p-8">
                      <div className="prose prose-lg max-w-none">
                        <h3>Welcome to {currentLesson.title}</h3>
                        <p>
                          This lesson will guide you through practical, hands-on learning that builds 
                          real AI skills. You'll work with actual tools and create tangible projects 
                          that demonstrate your growing expertise.
                        </p>
                        
                        <h4>What You'll Learn</h4>
                        <ul>
                          <li>Core concepts with immediate practical application</li>
                          <li>Hands-on exercises using industry-standard tools</li>
                          <li>Real-world project development</li>
                          <li>Quality assessment and best practices</li>
                        </ul>

                        <h4>Learning Activities</h4>
                        <p>
                          This lesson includes interactive content, downloadable resources, 
                          and guided exercises designed to reinforce your learning.
                        </p>
                      </div>

                      {/* Lesson Actions */}
                      <div className="mt-8 flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Ready to Continue?</h4>
                          <p className="text-gray-600 text-sm">
                            Complete this lesson to unlock the next module
                          </p>
                        </div>
                        <button className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 flex items-center">
                          <PlayIcon className="w-5 h-5 mr-2" />
                          Start Lesson
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckIcon className="w-12 h-12 text-success-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Course Completed!
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Congratulations! You've successfully completed {course.title}. 
                      Your certificate is ready for download.
                    </p>
                    <div className="space-y-4">
                      <button className="w-full max-w-sm px-6 py-3 bg-success-600 text-white font-semibold rounded-xl hover:bg-success-700 transition-all duration-300">
                        Download Certificate
                      </button>
                      <Link
                        href="/dashboard"
                        className="block w-full max-w-sm px-6 py-3 text-primary-600 font-semibold border-2 border-primary-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                      >
                        Back to Dashboard
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}