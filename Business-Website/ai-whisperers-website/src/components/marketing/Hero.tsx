'use client';

import { ArrowRightIcon, PlayIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-3/4 -right-1/4 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium border border-primary-200">
            <span className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></span>
            The World's Only Complete AI Learning Journey
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Master AI from{' '}
            <span className="text-primary-600">Complete Beginner</span>
            <br />
            to{' '}
            <span className="text-accent-600">Industry Expert</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-600">
              in Just 65.5 Hours
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Production-ready skills, not theoretical knowledge. Start with no-code AI tools, 
            advance to building production AI web applications. 
            <span className="font-semibold text-primary-600">
              The only comprehensive AI education available anywhere.
            </span>
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary-600">4</div>
              <div className="text-gray-600 font-medium">Specialized Courses</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary-600">65.5</div>
              <div className="text-gray-600 font-medium">Hours of Content</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary-600">100+</div>
              <div className="text-gray-600 font-medium">Hands-on Projects</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary-600">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/courses"
              className="group inline-flex items-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your AI Journey
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/courses/ai-foundations/preview"
              className="group inline-flex items-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-300 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <PlayIcon className="mr-2 w-5 h-5" />
              Try Interactive Preview
              <span className="ml-2 text-sm text-gray-500">(Free)</span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-8 space-y-4">
            <p className="text-gray-500 text-sm font-medium">
              Trusted by professionals from leading companies:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Company logos would go here */}
              <div className="text-gray-400 font-semibold text-lg">Google</div>
              <div className="text-gray-400 font-semibold text-lg">Microsoft</div>
              <div className="text-gray-400 font-semibold text-lg">Amazon</div>
              <div className="text-gray-400 font-semibold text-lg">Meta</div>
              <div className="text-gray-400 font-semibold text-lg">Netflix</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-primary-600 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}