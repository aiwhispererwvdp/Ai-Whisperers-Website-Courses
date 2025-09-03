'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, ReaderIcon, PersonIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Education 
              <span className="text-accent-300"> Insights</span>
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              Expert tutorials, strategic frameworks, and practical guides to accelerate 
              your AI learning journey. From beginner concepts to enterprise implementation.
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tutorials, guides, and insights..."
                  className="w-full pl-12 pr-32 py-4 bg-white text-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-accent-400 text-lg placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          {/* Blog Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary-500/30 rounded-xl flex items-center justify-center">
                <ReaderIcon className="w-6 h-6 text-accent-300" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-primary-200 text-sm">Expert Articles</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary-500/30 rounded-xl flex items-center justify-center">
                <PersonIcon className="w-6 h-6 text-accent-300" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-primary-200 text-sm">Monthly Readers</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary-500/30 rounded-xl flex items-center justify-center">
                <div className="text-accent-300 font-bold text-lg">4</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">Categories</div>
                <div className="text-primary-200 text-sm">Learning Tracks</div>
              </div>
            </div>
          </motion.div>

          {/* Popular Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12"
          >
            <p className="text-primary-200 text-sm mb-4">Popular Topics:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'AI Fundamentals',
                'Technical Development', 
                'AI Strategy',
                'Web Development',
                'Business Implementation',
                'Case Studies'
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => router.push(`/blog/category/${tag.toLowerCase().replace(' ', '-')}`)}
                  className="px-4 py-2 bg-primary-500/30 text-primary-100 rounded-full text-sm font-medium hover:bg-primary-500/50 transition-all duration-300 border border-primary-400/30"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}