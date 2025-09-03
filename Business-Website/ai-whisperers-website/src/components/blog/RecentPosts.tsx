'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export default function RecentPosts() {
  const recentPosts = blogPosts.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recent Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay up-to-date with the latest insights, tutorials, and strategic guidance in AI education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.category.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    post.category.color === 'green' ? 'bg-green-100 text-green-700' :
                    post.category.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {post.category.name}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    post.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    post.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {post.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      #{tag.replace('-', '')}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/link inline-flex items-center text-primary-600 text-sm font-semibold hover:text-primary-700 transition-colors"
                  >
                    Read
                    <ArrowRightIcon className="ml-1 w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog/all"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
          >
            View All Articles
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}