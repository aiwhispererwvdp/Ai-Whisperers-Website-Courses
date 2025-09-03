'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { getFeaturedBlogPosts } from '@/lib/blog';

export default function FeaturedPosts() {
  const featuredPosts = getFeaturedBlogPosts();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Featured Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hand-picked content to accelerate your AI learning journey. 
            From foundational concepts to advanced implementation strategies.
          </p>
        </motion.div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Article Header */}
              <div className="relative">
                <div className="h-64 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                      post.category.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      post.category.color === 'green' ? 'bg-green-100 text-green-700' :
                      post.category.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {post.category.name}
                    </div>
                    <div className={`text-6xl font-bold ${
                      post.difficulty === 'beginner' ? 'text-green-500' :
                      post.difficulty === 'intermediate' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {post.difficulty === 'beginner' ? '●' : post.difficulty === 'intermediate' ? '◐' : '●'}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {post.difficulty.charAt(0).toUpperCase() + post.difficulty.slice(1)} Level
                    </div>
                  </div>
                </div>
                
                {/* Reading Time Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                  <ClockIcon className="w-4 h-4 inline mr-1" />
                  {post.readingTime} min read
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Title and Excerpt */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium"
                      >
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Source (if applicable) */}
                {post.courseSource && (
                  <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
                    <div className="text-sm font-medium text-primary-800 mb-1">
                      Course Content
                    </div>
                    <div className="text-sm text-primary-700">
                      From {post.courseSource.courseId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                      {post.courseSource.lessonId && ` - Lesson ${post.courseSource.lessonId}`}
                    </div>
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <PersonIcon className="w-4 h-4" />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/link inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Read Article
                    <ArrowRightIcon className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Articles CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/blog/all"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}