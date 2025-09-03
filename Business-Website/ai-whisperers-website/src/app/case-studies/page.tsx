import { Metadata } from 'next';
import CaseStudyHero from '@/components/case-studies/CaseStudyHero';
import CaseStudyGrid from '@/components/case-studies/CaseStudyGrid';
import TransformationMetrics from '@/components/case-studies/TransformationMetrics';
import StudentSuccessStories from '@/components/case-studies/StudentSuccessStories';
import CaseStudyCTA from '@/components/case-studies/CaseStudyCTA';

export const metadata: Metadata = {
  title: 'Case Studies | AI-Whisperers | Student Success Stories & Career Transformations',
  description: 'Discover how AI-Whisperers students transformed their careers. From complete beginners to industry experts in 65.5 hours. Real stories, measurable results.',
  keywords: 'AI success stories, career transformation, AI education results, student outcomes, AI skill development, professional growth',
  openGraph: {
    title: 'Case Studies | AI Career Transformations | AI-Whisperers',
    description: 'See how students went from AI beginners to experts with measurable career impact. Real transformations, real results.',
    url: 'https://ai-whisperers.com/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CaseStudyHero />
      
      {/* Transformation Metrics */}
      <TransformationMetrics />
      
      {/* Featured Case Studies */}
      <CaseStudyGrid />
      
      {/* Student Success Stories */}
      <StudentSuccessStories />
      
      {/* CTA Section */}
      <CaseStudyCTA />
    </main>
  );
}