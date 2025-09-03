'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogPostFooterProps {
  post: BlogPost;
}

export default function BlogPostFooter({ post }: BlogPostFooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-12 p-8 bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-2xl"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Master AI?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          This article is just a glimpse of our comprehensive AI education. 
          Join thousands of students transforming their careers through our structured learning programs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {post.courseSource && (
            <Link
              href={`/courses/${post.courseSource.courseId}`}
              className="group inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
            >
              Explore Full Course
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          
          <Link
            href="/consultation"
            className="inline-flex items-center px-6 py-3 text-primary-600 font-semibold border-2 border-primary-200 rounded-xl hover:border-primary-300 hover:bg-white transition-all duration-300"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </motion.div>
  );
}