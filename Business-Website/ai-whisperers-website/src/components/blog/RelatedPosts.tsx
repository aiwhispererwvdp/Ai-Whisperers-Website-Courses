'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

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
            Related Articles
          </h2>
          <p className="text-gray-600">
            Continue your learning with these related insights and tutorials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
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
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
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
      </div>
    </section>
  );
}