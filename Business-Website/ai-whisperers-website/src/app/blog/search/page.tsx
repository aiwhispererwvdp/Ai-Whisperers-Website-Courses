import { Metadata } from 'next';
import { searchBlogPosts } from '@/lib/blog';
import BlogSearchResults from '@/components/blog/BlogSearchResults';

interface BlogSearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    difficulty?: string;
  }>;
}

export async function generateMetadata({ searchParams }: BlogSearchPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  
  return {
    title: query ? `Search Results for "${query}" | AI-Whisperers Blog` : 'Search | AI-Whisperers Blog',
    description: `Find AI education articles, tutorials, and insights. Search our comprehensive blog for expert content on artificial intelligence.`,
    robots: { index: false }, // Don't index search result pages
  };
}

export default async function BlogSearchPage({ searchParams }: BlogSearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  const category = resolvedSearchParams.category;
  const difficulty = resolvedSearchParams.difficulty;
  
  // Perform search
  let results = query ? searchBlogPosts(query) : [];
  
  // Apply filters
  if (category) {
    results = results.filter(post => post.category.slug === category);
  }
  
  if (difficulty) {
    results = results.filter(post => post.difficulty === difficulty);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <BlogSearchResults 
        query={query}
        results={results}
        category={category}
        difficulty={difficulty}
      />
    </main>
  );
}