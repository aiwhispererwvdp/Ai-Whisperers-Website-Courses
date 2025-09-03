'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon, MixerHorizontalIcon, Cross2Icon, CalendarIcon, ClockIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BlogPost, blogCategories } from '@/lib/blog';

interface BlogSearchResultsProps {
  query: string;
  results: BlogPost[];
  category?: string;
  difficulty?: string;
}

export default function BlogSearchResults({ 
  query: initialQuery, 
  results: initialResults, 
  category: initialCategory,
  difficulty: initialDifficulty 
}: BlogSearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty || '');
  const [results, setResults] = useState(initialResults);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      updateURL();
    }
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
    
    router.push(`/blog/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    router.push(`/blog/search?${params.toString()}`);
  };

  const clearSearch = () => {
    setQuery('');
    router.push('/blog');
  };

  useEffect(() => {
    updateURL();
  }, [selectedCategory, selectedDifficulty]);

  const hasActiveFilters = selectedCategory || selectedDifficulty;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Back to Blog */}
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-200 hover:text-white transition-colors mb-8"
            >
              ← Back to Blog
            </Link>

            <h1 className="text-4xl lg:text-5xl font-bold mb-8">
              {query ? (
                <>Search Results for <span className="text-accent-300">"{query}"</span></>
              ) : (
                'Search AI Education Content'
              )}
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, tutorials, and guides..."
                  className="w-full pl-12 pr-32 py-4 bg-white text-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-accent-400 text-lg"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-32 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Cross2Icon className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results Count */}
            <p className="text-primary-200">
              {results.length} {results.length === 1 ? 'article' : 'articles'} found
              {hasActiveFilters && ' with current filters'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                  >
                    <MixerHorizontalIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Category
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value=""
                          checked={selectedCategory === ''}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">All Categories</span>
                      </label>
                      {blogCategories.map((cat) => (
                        <label key={cat.id} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={cat.slug}
                            checked={selectedCategory === cat.slug}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            {cat.name} ({cat.postCount})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Difficulty Level
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="difficulty"
                          value=""
                          checked={selectedDifficulty === ''}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">All Levels</span>
                      </label>
                      {['beginner', 'intermediate', 'advanced'].map((level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="radio"
                            name="difficulty"
                            value={level}
                            checked={selectedDifficulty === level}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="ml-3 text-sm text-gray-700 capitalize">
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 text-primary-600 font-medium border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results */}
            <div className="lg:col-span-3">
              {results.length > 0 ? (
                <div className="space-y-8">
                  {results.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-8">
                        {/* Categories and Difficulty */}
                        <div className="flex items-center space-x-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            post.category.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            post.category.color === 'green' ? 'bg-green-100 text-green-700' :
                            post.category.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {post.category.name}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            post.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                            post.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {post.difficulty}
                          </span>
                        </div>

                        {/* Title and Excerpt */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                            >
                              #{tag.replace('-', '')}
                            </span>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{post.readingTime} min read</span>
                            </div>
                          </div>

                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                          >
                            Read Article →
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    No Articles Found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {query ? (
                      <>We couldn't find any articles matching "<strong>{query}</strong>"{hasActiveFilters ? ' with the selected filters' : ''}.</>
                    ) : (
                      'Enter a search term to find relevant AI education content.'
                    )}
                  </p>
                  <div className="space-x-4">
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="px-6 py-3 text-primary-600 font-semibold border-2 border-primary-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                      >
                        Clear Filters
                      </button>
                    )}
                    <Link
                      href="/blog"
                      className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
                    >
                      Browse All Articles
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}