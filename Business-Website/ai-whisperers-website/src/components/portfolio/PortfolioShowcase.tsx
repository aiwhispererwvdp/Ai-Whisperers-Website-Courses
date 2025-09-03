'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightIcon, CodeIcon, ReaderIcon, RocketIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const portfolioProjects = [
  {
    id: 'ai-detective-hunt',
    category: 'Beginner Project',
    title: 'AI Detective Hunt Interactive Experience',
    description: 'Gamified learning experience that helps students discover AI in their daily life through interactive exploration and real-world examples.',
    technologies: ['ChatGPT', 'Canva', 'No-Code Tools'],
    metrics: {
      users: '10K+',
      engagement: '45 min avg',
      completion: '94%'
    },
    courseSource: 'AI Foundations',
    demoUrl: '/portfolio/ai-detective-hunt',
    codeUrl: null, // No code for no-code projects
    featured: true,
    icon: PersonIcon,
    image: '/images/portfolio/ai-detective-hunt.jpg', // Placeholder
  },
  {
    id: 'universal-ai-client',
    category: 'Technical Framework',
    title: 'Universal AI Client Library',
    description: 'Production-ready TypeScript library for seamlessly integrating multiple AI providers (OpenAI, Anthropic, Google) with unified error handling.',
    technologies: ['TypeScript', 'OpenAI API', 'Anthropic API', 'Google AI'],
    metrics: {
      downloads: '25K+',
      github_stars: '1.2K',
      contributors: '45'
    },
    courseSource: 'Applied AI',
    demoUrl: '/portfolio/universal-ai-client',
    codeUrl: 'https://github.com/ai-whisperers/universal-ai-client',
    featured: true,
    icon: CodeIcon,
    image: '/images/portfolio/universal-ai-client.jpg', // Placeholder
  },
  {
    id: 'ai-chat-interface',
    category: 'Web Application',
    title: 'Real-Time AI Chat Interface',
    description: 'Modern React component library for building AI chat interfaces with streaming responses, typing indicators, and conversation history.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metrics: {
      npm_downloads: '15K/month',
      live_demos: '500+',
      performance_score: '98/100'
    },
    courseSource: 'Web Development AI Apps',
    demoUrl: '/portfolio/ai-chat-interface',
    codeUrl: 'https://github.com/ai-whisperers/ai-chat-components',
    featured: true,
    icon: ReaderIcon,
    image: '/images/portfolio/ai-chat-interface.jpg', // Placeholder
  },
  {
    id: 'ai-roi-calculator',
    category: 'Business Tool',
    title: 'Enterprise AI ROI Calculator',
    description: 'Interactive business intelligence tool for calculating AI investment returns, featuring industry-specific metrics and customizable scenarios.',
    technologies: ['Strategic Frameworks', 'Business Analysis', 'ROI Modeling'],
    metrics: {
      enterprise_users: '200+',
      calculations_run: '50K+',
      avg_roi_projected: '340%'
    },
    courseSource: 'Enterprise AI Business',
    demoUrl: '/portfolio/ai-roi-calculator',
    codeUrl: null, // Business tool, not code
    featured: true,
    icon: RocketIcon,
    image: '/images/portfolio/ai-roi-calculator.jpg', // Placeholder
  },
  {
    id: 'sentiment-dashboard',
    category: 'Data Visualization',
    title: 'Multi-Language Sentiment Analysis Dashboard',
    description: 'Real-time dashboard for analyzing sentiment across multiple languages and data sources with beautiful visualizations.',
    technologies: ['Python', 'FastAPI', 'React', 'D3.js', 'Multi-AI APIs'],
    metrics: {
      languages_supported: '15',
      data_points_processed: '10M+',
      accuracy: '94.2%'
    },
    courseSource: 'Applied AI',
    demoUrl: '/portfolio/sentiment-dashboard',
    codeUrl: 'https://github.com/ai-whisperers/sentiment-dashboard',
    featured: false,
    icon: CodeIcon,
    image: '/images/portfolio/sentiment-dashboard.jpg', // Placeholder
  },
  {
    id: 'ai-content-generator',
    category: 'Productivity Tool',
    title: 'AI-Powered Content Generation Suite',
    description: 'Complete content creation toolkit with templates, brand voice training, and multi-format output capabilities.',
    technologies: ['Next.js', 'OpenAI GPT-4', 'Tailwind CSS', 'Prisma'],
    metrics: {
      content_pieces_generated: '1M+',
      active_users: '5K+',
      time_saved_avg: '4.5 hours/week'
    },
    courseSource: 'Web Development AI Apps',
    demoUrl: '/portfolio/ai-content-generator',
    codeUrl: 'https://github.com/ai-whisperers/content-generator',
    featured: false,
    icon: ReaderIcon,
    image: '/images/portfolio/ai-content-generator.jpg', // Placeholder
  },
];

interface PortfolioShowcaseProps {
  showAll?: boolean;
  maxItems?: number;
  title?: string;
  subtitle?: string;
}

export default function PortfolioShowcase({ 
  showAll = false, 
  maxItems = 4,
  title = "Student Portfolio Showcase",
  subtitle = "Explore real projects built by our students during their AI learning journey. From beginner exercises to enterprise applications—see what you'll build."
}: PortfolioShowcaseProps) {
  const displayProjects = showAll 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.featured).slice(0, maxItems);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group"
            >
              {/* Project Image/Header */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <project.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                  {project.category}
                </div>
                
                {/* Course Source Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-sm font-medium rounded-full">
                  {project.courseSource}
                </div>
              </div>

              <div className="p-8">
                {/* Project Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-primary-600 mb-1">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link
                    href={project.demoUrl}
                    className="group/demo inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
                  >
                    View Demo
                    <ArrowTopRightIcon className="ml-2 w-4 h-4 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                  </Link>
                  
                  {project.codeUrl && (
                    <Link
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 text-primary-600 font-semibold border-2 border-primary-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                    >
                      <CodeIcon className="mr-2 w-4 h-4" />
                      View Code
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore Full Portfolio
              <ArrowTopRightIcon className="ml-2 w-5 h-5" />
            </Link>
            
            <div className="mt-4 text-gray-500 text-sm">
              See 25+ projects built by students across all courses
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}