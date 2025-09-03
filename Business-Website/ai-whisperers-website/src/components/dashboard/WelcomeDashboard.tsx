'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  ChartBarIcon, 
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string;
}

interface WelcomeDashboardProps {
  user: User;
}

export default function WelcomeDashboard({ user }: WelcomeDashboardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const setupSteps = [
    {
      title: "Welcome to AI-Whisperers!",
      description: "You're now part of our AI learning community.",
      icon: AcademicCapIcon,
      action: "Get Started",
    },
    {
      title: "Choose Your Learning Path",
      description: "Select the course that matches your experience level.",
      icon: BookOpenIcon,
      action: "Browse Courses",
    },
    {
      title: "Complete Your First Lesson",
      description: "Start your AI journey with hands-on learning.",
      icon: CheckCircleIcon,
      action: "Start Learning",
    },
  ];

  useEffect(() => {
    // Auto-advance welcome steps
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % setupSteps.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [setupSteps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AI-Whisperers</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name || 'Student'}!</span>
              <Link
                href="/dashboard"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Welcome to AI-Whisperers!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You've just joined the most comprehensive AI education platform. 
            Let's get you started on your journey to AI mastery.
          </p>
        </motion.div>

        {/* Account Setup Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Setup Guide</h2>
          
          {/* Progress Steps */}
          <div className="space-y-6">
            {setupSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.7 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1.02 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary-50 border-primary-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isActive ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isActive ? 'text-primary-600' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-4"
                    >
                      <ArrowRightIcon className="w-5 h-5 text-primary-600" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Course Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Beginner Course */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Foundations</h3>
                  <p className="text-gray-600 text-sm">Perfect for beginners</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Start your AI journey with no-code tools and practical applications.
              </p>
              <Link
                href="/courses/ai-foundations"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Learn More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Popular Choice */}
            <div className="border-2 border-primary-200 rounded-xl p-6 bg-primary-50 relative">
              <div className="absolute top-3 right-3">
                <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  POPULAR
                </span>
              </div>
              
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <StarIcon className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Applied AI</h3>
                  <p className="text-gray-600 text-sm">Most popular choice</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Build real AI applications with APIs and practical projects.
              </p>
              <Link
                href="/courses/applied-ai"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Learn More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Link
            href="/courses"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <BookOpenIcon className="w-8 h-8 text-primary-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Browse All Courses</h3>
            <p className="text-gray-600 text-sm">
              Explore our complete catalog of AI courses
            </p>
            <ArrowRightIcon className="w-4 h-4 text-primary-600 mt-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <ChartBarIcon className="w-8 h-8 text-secondary-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">My Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Track your progress and manage courses
            </p>
            <ArrowRightIcon className="w-4 h-4 text-secondary-600 mt-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-accent-600 text-sm font-bold">?</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Support</h3>
            <p className="text-gray-600 text-sm">
              Questions? Our team is here to help
            </p>
            <ArrowRightIcon className="w-4 h-4 text-accent-600 mt-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Ready to start your AI transformation journey?
          </p>
          <Link
            href="/courses/ai-foundations"
            className="inline-flex items-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
          >
            Start with AI Foundations
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}