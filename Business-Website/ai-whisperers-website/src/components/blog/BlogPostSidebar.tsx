'use client';

import { motion } from 'framer-motion';
import { Share1Icon, BookmarkIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogPostSidebarProps {
  post: BlogPost;
}

export default function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Author Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-lg">
              {post.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{post.author.name}</div>
            <div className="text-sm text-gray-600 mt-1">{post.author.bio}</div>
          </div>
        </div>
      </motion.div>

      {/* Related Courses */}
      {post.resources?.relatedCourses && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="bg-primary-50 border border-primary-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Courses</h3>
          <div className="space-y-3">
            {post.resources.relatedCourses.map((courseId) => (
              <Link
                key={courseId}
                href={`/courses/${courseId}`}
                className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {courseId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <div className="text-sm text-gray-500">Deep dive course</div>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Share Article */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Share Article</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Twitter
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-medium">
            LinkedIn
          </button>
        </div>
        <button className="w-full mt-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center">
          <Share1Icon className="w-4 h-4 mr-2" />
          Copy Link
        </button>
      </motion.div>
    </div>
  );
}