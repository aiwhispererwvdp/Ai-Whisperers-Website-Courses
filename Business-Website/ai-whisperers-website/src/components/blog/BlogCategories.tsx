'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { blogCategories } from '@/lib/blog';

export default function BlogCategories() {
  const featuredCategories = blogCategories.filter(cat => cat.featured);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dive deep into specific areas of AI education with our curated content categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <Link
                href={`/blog/category/${category.slug}`}
                className="block p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  category.color === 'blue' ? 'bg-blue-100' :
                  category.color === 'green' ? 'bg-green-100' :
                  category.color === 'purple' ? 'bg-purple-100' :
                  category.color === 'teal' ? 'bg-teal-100' :
                  'bg-gray-100'
                }`}>
                  <div className={`text-2xl ${
                    category.color === 'blue' ? 'text-blue-600' :
                    category.color === 'green' ? 'text-green-600' :
                    category.color === 'purple' ? 'text-purple-600' :
                    category.color === 'teal' ? 'text-teal-600' :
                    'text-gray-600'
                  }`}>
                    {category.name === 'AI Fundamentals' ? '🎯' :
                     category.name === 'Technical Development' ? '⚡' :
                     category.name === 'AI Web Development' ? '💻' :
                     category.name === 'AI Strategy' ? '🚀' : '📊'}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {category.postCount} articles
                  </span>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}