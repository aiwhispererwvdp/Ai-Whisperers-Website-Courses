import { Metadata } from 'next';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';

export const metadata: Metadata = {
  title: 'Student Portfolio | AI-Whisperers | Real Projects Built During Courses',
  description: 'Explore 25+ real projects built by AI-Whisperers students. From beginner exercises to enterprise applications—see the practical skills our comprehensive curriculum develops.',
  keywords: 'AI projects, student portfolio, AI applications, machine learning projects, AI web development, practical AI skills',
  openGraph: {
    title: 'Student Portfolio | Real AI Projects | AI-Whisperers',
    description: 'See what students build during their AI learning journey. From no-code tools to production applications.',
    url: 'https://ai-whisperers.com/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Student Project Portfolio
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Explore real projects built by students during their AI learning journey. 
            Every project represents practical skills gained through our comprehensive curriculum.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center mt-8">
            <div>
              <div className="text-3xl font-bold text-accent-300">25+</div>
              <div className="text-primary-200">Student Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300">4</div>
              <div className="text-primary-200">Course Tracks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-300">100%</div>
              <div className="text-primary-200">Production Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <PortfolioShowcase 
        showAll={true}
        title="Complete Project Collection"
        subtitle="From no-code AI tools to enterprise applications—explore the full spectrum of projects created by students across all four specialized courses."
      />
    </main>
  );
}