import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import BlogAdminDashboard from '@/components/admin/BlogAdminDashboard';

export const metadata: Metadata = {
  title: 'Blog Administration | AI-Whisperers',
  description: 'Manage blog content, articles, and editorial workflow.',
  robots: { index: false },
};

export default async function BlogAdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin?callbackUrl=/admin/blog');
  }

  // TODO: Check if user has admin privileges
  // For now, allow any authenticated user for development
  
  return (
    <main className="min-h-screen bg-gray-50">
      <BlogAdminDashboard user={user} />
    </main>
  );
}