'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { PlusIcon, Pencil2Icon, TrashIcon, EyeOpenIcon, CalendarIcon, ReaderIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { User } from 'next-auth';
import { blogPosts, blogCategories } from '@/lib/blog';

interface BlogAdminDashboardProps {
  user: User;
}

export default function BlogAdminDashboard({ user }: BlogAdminDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('publishedAt');

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.slug === selectedCategory);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'publishedAt') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Blog Administration
              </h1>
              <p className="text-gray-300">
                Manage educational content and articles
              </p>
            </div>

            <Link
              href="/admin/blog/new"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              New Article
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-2">{blogPosts.length}</div>
              <div className="text-gray-600">Total Articles</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-success-600 mb-2">
                {blogPosts.filter(p => new Date(p.publishedAt) <= new Date()).length}
              </div>
              <div className="text-gray-600">Published</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-primary-600 mb-2">{blogCategories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-accent-600 mb-2">
                {blogPosts.filter(p => p.featured).length}
              </div>
              <div className="text-gray-600">Featured</div>
            </div>
          </div>

          {/* Content Management Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Content Management</h2>
              <p className="text-gray-600 text-sm">Manage articles, categories, and publishing workflow</p>
            </div>
            
            <div className="p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ReaderIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Content Management System
                </h3>
                <p className="text-gray-600 mb-6">
                  Full CMS functionality can be integrated with your preferred headless CMS or database.
                </p>
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">Current articles are statically defined in blog.ts</div>
                  <div className="text-sm text-gray-500">Connect to Strapi, Sanity, or Prisma for dynamic content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}