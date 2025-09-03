import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostSidebar from '@/components/blog/BlogPostSidebar';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogPostFooter from '@/components/blog/BlogPostFooter';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | AI-Whisperers Blog',
    };
  }

  return {
    title: post.seoMetadata.title,
    description: post.seoMetadata.description,
    keywords: post.seoMetadata.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
      url: `https://ai-whisperers.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.seoMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
      images: [post.seoMetadata.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Blog Post Header */}
      <BlogPostHeader post={post} />

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <BlogPostContent post={post} />
              <BlogPostFooter post={post} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogPostSidebar post={post} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </main>
  );
}