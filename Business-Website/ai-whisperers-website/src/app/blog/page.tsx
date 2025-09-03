import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import BlogCategories from '@/components/blog/BlogCategories';
import RecentPosts from '@/components/blog/RecentPosts';
import BlogNewsletter from '@/components/blog/BlogNewsletter';

export const metadata: Metadata = {
  title: 'AI Education Blog | Expert Insights & Tutorials | AI-Whisperers',
  description: 'Comprehensive AI education blog with expert tutorials, industry insights, and practical guides. From beginner AI concepts to advanced development techniques.',
  keywords: [
    'AI blog',
    'artificial intelligence education',
    'AI tutorials', 
    'machine learning guides',
    'AI development',
    'AI strategy',
    'AI business insights'
  ],
  openGraph: {
    title: 'AI Education Blog | Expert Insights & Tutorials | AI-Whisperers',
    description: 'Expert AI education content: tutorials, case studies, and strategic insights from industry professionals.',
    url: 'https://ai-whisperers.com/blog',
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Blog Hero */}
      <BlogHero />
      
      {/* Featured Posts */}
      <FeaturedPosts />
      
      {/* Blog Categories */}
      <BlogCategories />
      
      {/* Recent Posts */}
      <RecentPosts />
      
      {/* Newsletter Signup */}
      <BlogNewsletter />
    </main>
  );
}