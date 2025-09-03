'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, PersonIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>

          {/* Category and Difficulty */}
          <div className="flex items-center space-x-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              post.category.color === 'blue' ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30' :
              post.category.color === 'green' ? 'bg-green-500/20 text-green-200 border border-green-400/30' :
              post.category.color === 'purple' ? 'bg-purple-500/20 text-purple-200 border border-purple-400/30' :
              'bg-gray-500/20 text-gray-200 border border-gray-400/30'
            }`}>
              {post.category.name}
            </span>
            
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${
              post.difficulty === 'beginner' ? 'bg-green-500/20 text-green-200 border-green-400/30' :
              post.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30' :
              'bg-red-500/20 text-red-200 border-red-400/30'
            }`}>
              {post.difficulty.charAt(0).toUpperCase() + post.difficulty.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-primary-100 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-primary-200">
            <div className="flex items-center space-x-2">
              <PersonIcon className="w-5 h-5" />
              <span>By {post.author.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Course Source (if applicable) */}
          {post.courseSource && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 p-4 bg-primary-500/20 border border-primary-400/30 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-400/20 rounded-lg flex items-center justify-center">
                  📚
                </div>
                <div>
                  <div className="font-semibold text-white">Course Content</div>
                  <div className="text-primary-200 text-sm">
                    From {post.courseSource.courseId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    {post.courseSource.lessonId && ` - Lesson ${post.courseSource.lessonId}`}
                  </div>
                </div>
                <div className="ml-auto">
                  <Link
                    href={`/courses/${post.courseSource.courseId}`}
                    className="px-4 py-2 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 transition-colors"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-500/20 text-primary-100 rounded-full text-sm font-medium border border-primary-400/30"
                >
                  #{tag.replace('-', '')}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}