import { Metadata } from 'next';
import Hero from '@/components/marketing/Hero';
import CourseShowcase from '@/components/course/CourseShowcase';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import FeaturesSection from '@/components/marketing/FeaturesSection';
import TestimonialsSection from '@/components/marketing/TestimonialsSection';
import CTASection from '@/components/marketing/CTASection';
import StructuredData from '@/components/seo/StructuredData';
import { generateOrganizationStructuredData, generateFAQStructuredData } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI-Whisperers | The World\'s Only Complete AI Learning Journey',
  description: 'Master AI from complete beginner to expert in 65.5 hours. Production-ready skills, not theoretical knowledge. Start with no-code tools, advance to building AI web applications.',
  keywords: 'AI education, AI courses, machine learning, web development AI, artificial intelligence training, comprehensive AI learning',
  authors: [{ name: 'AI-Whisperers Team' }],
  creator: 'AI-Whisperers',
  publisher: 'AI-Whisperers',
  openGraph: {
    title: 'AI-Whisperers | Complete AI Learning Journey',
    description: 'The world\'s only comprehensive AI education from beginner to expert. 4 specialized tracks, 65.5 hours, production-ready skills.',
    url: 'https://ai-whisperers.com',
    siteName: 'AI-Whisperers',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Whisperers | Complete AI Learning Journey',
    description: 'Master AI from beginner to expert. Production-ready skills, comprehensive curriculum, immediate career impact.',
    creator: '@aiwhisperers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const homePageFAQs = [
  {
    question: "What makes AI-Whisperers different from other AI courses?",
    answer: "AI-Whisperers is the world's only complete AI learning journey, taking you from complete beginner to industry expert in just 65.5 hours. Unlike theoretical courses, we focus on production-ready skills with 4 specialized tracks and 100+ hands-on projects."
  },
  {
    question: "How long does it take to complete the full AI learning journey?", 
    answer: "Our complete curriculum is designed for 65.5 hours of focused learning, which most students complete in 8-12 weeks studying 6-8 hours per week. You can go at your own pace."
  },
  {
    question: "Do I need programming experience to start?",
    answer: "No! Our AI Foundations course starts with no-code AI tools and gradually introduces programming concepts. We take you from complete beginner to building production AI applications."
  },
  {
    question: "What kind of projects will I build?",
    answer: "You'll build over 100 hands-on projects including AI chatbots, image recognition apps, business automation tools, and full-stack AI web applications. All projects are production-ready and portfolio-worthy."
  }
];

export default function HomePage() {
  const organizationData = generateOrganizationStructuredData();
  const faqData = generateFAQStructuredData(homePageFAQs);

  return (
    <>
      <StructuredData data={[organizationData, faqData]} />
      
      <main className="min-h-screen">
        {/* Hero Section - Primary Value Proposition */}
        <Hero />
        
        {/* Course Showcase - Core Offering */}
        <CourseShowcase />
        
        {/* Portfolio Showcase - Student Projects */}
        <PortfolioShowcase 
          maxItems={4}
          title="What You'll Build"
          subtitle="See real projects created by students during their AI learning journey. From beginner exercises to production applications—these showcase the practical skills you'll develop."
        />
        
        {/* Features Section - Key Differentiators */}
        <FeaturesSection />
        
        {/* Testimonials - Social Proof */}
        <TestimonialsSection />
        
        {/* CTA Section - Conversion Focus */}
        <CTASection />
      </main>
    </>
  );
}
