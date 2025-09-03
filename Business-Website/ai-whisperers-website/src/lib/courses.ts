import { CourseModule, Course } from './types/course';

// Course 1: AI Foundations - Detailed Curriculum
const aiFoundationsModules: CourseModule[] = [
  {
    id: 'lesson-1',
    title: 'What is AI? Demystifying Artificial Intelligence',
    duration: 120, // 2 hours in minutes
    objectives: [
      'Define artificial intelligence in simple, non-technical terms',
      'Distinguish between AI, machine learning, and automation through practical examples',
      'Identify AI applications currently used in everyday life',
      'Recognize the potential and limitations of current AI technology',
      'Address common fears and misconceptions about AI'
    ],
    activities: [
      {
        name: 'AI Detective Hunt',
        description: 'Find the AI Around You - explore AI features in everyday apps',
        duration: 45,
        type: 'hands-on'
      }
    ],
    caseStudy: 'Netflix Recommendations - How AI suggests movies and shows'
  },
  {
    id: 'lesson-2',
    title: 'AI in Daily Life - From Smart Assistants to Self-Driving Cars',
    duration: 120,
    objectives: [
      'Explore major categories of AI applications (computer vision, natural language processing, prediction)',
      'Experience different types of AI through hands-on interaction',
      'Understand the data requirements for different AI applications',
      'Evaluate AI accuracy and reliability in real-world scenarios',
      'Identify opportunities for AI adoption in personal and professional contexts'
    ],
    activities: [
      {
        name: 'AI Tool Exploration Lab',
        description: 'Guided exploration of consumer AI tools (Voice Assistants, Image Recognition, Translation)',
        duration: 75,
        type: 'hands-on'
      }
    ],
    caseStudy: 'Tesla Autopilot - How self-driving cars "see" the road'
  },
  {
    id: 'lesson-3',
    title: 'No-Code AI Tools - Your First AI Creations',
    duration: 120,
    objectives: [
      'Navigate popular no-code AI platforms (ChatGPT, Canva, Grammarly)',
      'Create content using AI assistance (text, images, presentations)',
      'Understand prompt engineering basics for better AI results',
      'Combine multiple AI tools to complete a project',
      'Evaluate and edit AI-generated content for quality and appropriateness'
    ],
    activities: [
      {
        name: 'Create Your First AI-Assisted Project',
        description: 'Build a small business presentation using only AI tools',
        duration: 90,
        type: 'project'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'AI Quality & Bias - Becoming a Smart AI User',
    duration: 120,
    objectives: [
      'Recognize and evaluate bias in AI systems',
      'Develop critical thinking skills for AI outputs',
      'Understand the importance of diverse training data',
      'Learn techniques for better AI prompting',
      'Create guidelines for responsible AI use'
    ],
    activities: [
      {
        name: 'AI Bias Detective',
        description: 'Test different AI tools for bias and evaluate results',
        duration: 60,
        type: 'analysis'
      }
    ]
  },
  {
    id: 'lesson-5',
    title: 'Solving Problems with AI - A Practical Framework',
    duration: 120,
    objectives: [
      'Apply a systematic approach to identifying AI opportunities',
      'Evaluate when AI is and isn\'t the right solution',
      'Design AI-assisted workflows for common tasks',
      'Measure the effectiveness of AI implementations',
      'Create sustainable AI adoption practices'
    ],
    activities: [
      {
        name: 'Problem-Solution Mapping',
        description: 'Apply AI framework to solve a real workplace challenge',
        duration: 75,
        type: 'workshop'
      }
    ]
  },
  {
    id: 'lesson-6',
    title: 'Your AI Future - Capstone Project & Next Steps',
    duration: 120,
    objectives: [
      'Synthesize learning from all previous lessons',
      'Complete a comprehensive AI-assisted project',
      'Present findings to peers',
      'Develop a personal AI learning plan',
      'Identify resources for continued learning'
    ],
    activities: [
      {
        name: 'Capstone Project',
        description: 'Complete AI project with presentation to class',
        duration: 90,
        type: 'capstone'
      }
    ]
  }
];

// Course 2: Applied AI - Detailed Curriculum
const appliedAiModules: CourseModule[] = [
  {
    id: 'lesson-1',
    title: 'AI APIs and Integration Fundamentals',
    duration: 150, // 2.5 hours
    objectives: [
      'Understand REST APIs and authentication methods',
      'Set up development environment for AI integration',
      'Make first API calls to OpenAI, Anthropic, and Google AI',
      'Handle API responses and error conditions',
      'Implement proper security practices for API keys'
    ],
    activities: [
      {
        name: 'Multi-Provider API Setup',
        description: 'Connect to all major AI providers and test basic functionality',
        duration: 75,
        type: 'coding'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Data Processing and Preparation',
    duration: 150,
    objectives: [
      'Process various data formats for AI analysis',
      'Clean and structure data for optimal AI input',
      'Handle file uploads and data validation',
      'Implement data pipeline patterns',
      'Understand privacy and security considerations'
    ],
    activities: [
      {
        name: 'Build Data Processing Pipeline',
        description: 'Create robust system for handling various data types',
        duration: 90,
        type: 'coding'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Text Analysis and Natural Language Processing',
    duration: 150,
    objectives: [
      'Implement sentiment analysis and text classification',
      'Build multi-language support and translation',
      'Create text summarization and extraction tools',
      'Handle large document processing',
      'Implement content moderation and safety'
    ],
    activities: [
      {
        name: 'Text Analysis Application',
        description: 'Build complete text analysis tool with multiple AI providers',
        duration: 100,
        type: 'project'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Data Visualization and Reporting',
    duration: 150,
    objectives: [
      'Create dynamic charts and visualizations',
      'Build interactive dashboards',
      'Generate automated reports',
      'Implement real-time data updates',
      'Design user-friendly interfaces'
    ],
    activities: [
      {
        name: 'Analytics Dashboard',
        description: 'Build comprehensive dashboard for AI analysis results',
        duration: 90,
        type: 'development'
      }
    ]
  },
  {
    id: 'lesson-5',
    title: 'Multilingual AI Applications',
    duration: 150,
    objectives: [
      'Implement translation and localization',
      'Handle different character encodings',
      'Build cross-language content analysis',
      'Create international user experiences',
      'Understand cultural AI considerations'
    ],
    activities: [
      {
        name: 'Global Content Platform',
        description: 'Build multilingual AI content processing system',
        duration: 105,
        type: 'project'
      }
    ]
  },
  {
    id: 'lesson-6',
    title: 'Production Deployment and Scaling',
    duration: 150,
    objectives: [
      'Deploy applications to cloud platforms',
      'Implement monitoring and logging',
      'Handle rate limiting and cost optimization',
      'Set up automated testing and CI/CD',
      'Plan for scaling and performance'
    ],
    activities: [
      {
        name: 'Production Deployment',
        description: 'Deploy complete application to production with monitoring',
        duration: 90,
        type: 'deployment'
      }
    ]
  }
];

// Course 3: Web Development AI Apps - Detailed Curriculum  
const webDevAiModules: CourseModule[] = [
  {
    id: 'lesson-1',
    title: 'Modern Full-Stack Architecture for AI Applications',
    duration: 180, // 3 hours
    objectives: [
      'Set up modern development environment with Next.js 14+',
      'Implement TypeScript for type-safe AI applications',
      'Design scalable architecture for AI integrations',
      'Configure development tools and testing frameworks',
      'Understand AI-specific performance considerations'
    ],
    activities: [
      {
        name: 'Full-Stack Setup',
        description: 'Configure complete development environment for AI applications',
        duration: 120,
        type: 'setup'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'AI-Powered User Interfaces with React',
    duration: 180,
    objectives: [
      'Build responsive AI interaction components',
      'Implement real-time streaming responses',
      'Create intelligent form handling and validation',
      'Design accessible AI interfaces',
      'Handle loading states and error scenarios'
    ],
    activities: [
      {
        name: 'AI Chat Interface',
        description: 'Build production-ready AI chat component with streaming',
        duration: 135,
        type: 'development'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Backend API Development with AI Integration',
    duration: 180,
    objectives: [
      'Build secure API endpoints for AI services',
      'Implement proper authentication and authorization',
      'Handle AI provider orchestration and failover',
      'Create efficient data caching strategies',
      'Implement rate limiting and cost controls'
    ],
    activities: [
      {
        name: 'AI API Gateway',
        description: 'Build robust API layer for multiple AI providers',
        duration: 150,
        type: 'backend'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Advanced AI Features and Integrations',
    duration: 180,
    objectives: [
      'Implement multi-modal AI (text, image, audio)',
      'Build AI recommendation systems',
      'Create personalization and user learning',
      'Integrate vector databases for semantic search',
      'Implement AI workflow orchestration'
    ],
    activities: [
      {
        name: 'AI Recommendation Engine',
        description: 'Build Netflix-style AI recommendation system',
        duration: 135,
        type: 'advanced'
      }
    ]
  },
  {
    id: 'lesson-5',
    title: 'Real-time AI Applications and WebSockets',
    duration: 180,
    objectives: [
      'Implement real-time AI collaboration features',
      'Build live AI-assisted editing and feedback',
      'Create multi-user AI experiences',
      'Handle real-time synchronization challenges',
      'Optimize for low-latency AI responses'
    ],
    activities: [
      {
        name: 'Collaborative AI Editor',
        description: 'Build real-time collaborative AI writing platform',
        duration: 150,
        type: 'realtime'
      }
    ]
  },
  {
    id: 'lesson-6',
    title: 'Testing, Monitoring, and Performance Optimization',
    duration: 180,
    objectives: [
      'Implement comprehensive testing strategies for AI apps',
      'Set up monitoring and observability',
      'Optimize AI response times and costs',
      'Handle AI model versioning and A/B testing',
      'Implement security best practices'
    ],
    activities: [
      {
        name: 'Production Monitoring Setup',
        description: 'Implement complete testing and monitoring pipeline',
        duration: 120,
        type: 'optimization'
      }
    ]
  },
  {
    id: 'lesson-7',
    title: 'Production Deployment and Scaling',
    duration: 180,
    objectives: [
      'Deploy to modern cloud platforms (Vercel, AWS, etc.)',
      'Implement CI/CD pipelines for AI applications',
      'Set up auto-scaling and load balancing',
      'Monitor costs and optimize for efficiency',
      'Plan for international deployment and compliance'
    ],
    activities: [
      {
        name: 'Full Production Deployment',
        description: 'Deploy complete AI application to production with full monitoring',
        duration: 135,
        type: 'deployment'
      }
    ]
  }
];

// Course 4: Enterprise AI Business - Detailed Curriculum
const enterpriseAiModules: CourseModule[] = [
  {
    id: 'lesson-1',
    title: 'AI Strategy and Business Case Development',
    duration: 150,
    objectives: [
      'Develop comprehensive AI adoption strategy',
      'Create compelling business cases for AI initiatives',
      'Identify high-ROI AI opportunities',
      'Understand AI\'s competitive implications',
      'Build stakeholder alignment and buy-in'
    ],
    activities: [
      {
        name: 'AI Strategy Workshop',
        description: 'Develop complete AI strategy for real business scenario',
        duration: 90,
        type: 'strategy'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'AI Implementation Roadmaps and Project Management',
    duration: 150,
    objectives: [
      'Create realistic AI implementation timelines',
      'Manage AI project risks and dependencies',
      'Build cross-functional AI teams',
      'Establish AI governance frameworks',
      'Measure AI project success and ROI'
    ],
    activities: [
      {
        name: 'AI Project Planning',
        description: 'Create detailed implementation plan for enterprise AI initiative',
        duration: 105,
        type: 'planning'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'AI Ethics, Compliance, and Risk Management',
    duration: 150,
    objectives: [
      'Understand AI regulatory landscape and compliance requirements',
      'Implement AI ethics and bias mitigation strategies',
      'Develop AI risk assessment and management frameworks',
      'Create AI governance policies and procedures',
      'Handle AI-related legal and privacy considerations'
    ],
    activities: [
      {
        name: 'AI Governance Framework',
        description: 'Develop comprehensive AI governance and compliance framework',
        duration: 90,
        type: 'governance'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Change Management for AI Transformation',
    duration: 150,
    objectives: [
      'Lead organizational change for AI adoption',
      'Address workforce concerns and resistance',
      'Design AI training and upskilling programs',
      'Manage cultural transformation for AI-first thinking',
      'Communicate AI value across the organization'
    ],
    activities: [
      {
        name: 'Change Management Plan',
        description: 'Create comprehensive change management strategy for AI transformation',
        duration: 105,
        type: 'change-management'
      }
    ]
  },
  {
    id: 'lesson-5',
    title: 'AI Vendor Management and Technology Selection',
    duration: 150,
    objectives: [
      'Evaluate and select AI technology partners',
      'Negotiate AI vendor contracts and SLAs',
      'Manage AI vendor relationships and performance',
      'Plan for AI technology evolution and migration',
      'Balance build vs buy decisions for AI capabilities'
    ],
    activities: [
      {
        name: 'AI Vendor Evaluation',
        description: 'Complete AI technology selection and vendor evaluation process',
        duration: 90,
        type: 'evaluation'
      }
    ]
  },
  {
    id: 'lesson-6',
    title: 'AI ROI Measurement and Business Impact',
    duration: 150,
    objectives: [
      'Establish AI success metrics and KPIs',
      'Measure and communicate AI business value',
      'Create AI performance dashboards',
      'Optimize AI investments and resource allocation',
      'Demonstrate AI impact to stakeholders and board'
    ],
    activities: [
      {
        name: 'AI ROI Dashboard',
        description: 'Build comprehensive AI performance measurement system',
        duration: 120,
        type: 'measurement'
      }
    ]
  },
  {
    id: 'lesson-7',
    title: 'AI Future Planning and Strategic Positioning',
    duration: 150,
    objectives: [
      'Anticipate AI technology trends and market shifts',
      'Plan for AI-driven business model innovation',
      'Develop AI competitive advantages and moats',
      'Create long-term AI investment strategies',
      'Prepare organization for AI-first future'
    ],
    activities: [
      {
        name: 'AI Future Strategy',
        description: 'Develop 3-year AI strategic plan and competitive positioning',
        duration: 105,
        type: 'strategic-planning'
      }
    ]
  }
];

// Complete course definitions
export const courses: Course[] = [
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    subtitle: 'First Steps into Artificial Intelligence',
    description: 'Master AI without coding. Perfect for complete beginners who want to understand and use AI tools effectively.',
    level: 'Beginner',
    difficulty: 1,
    duration: '12 hours',
    totalMinutes: 720,
    lessons: 6,
    price: 299,
    originalPrice: null,
    category: 'foundations',
    targetAudience: 'Business professionals, career changers, curious learners',
    prerequisites: 'None - designed for complete beginners',
    learningOutcomes: [
      'Understand fundamental AI concepts and terminology',
      'Use 10+ no-code AI tools for practical business applications',
      'Create AI-assisted presentations, designs, and content',
      'Evaluate AI outputs for quality, bias, and reliability',
      'Build your first complete AI-powered mini-project',
      'Make informed decisions about AI tool adoption'
    ],
    keyHighlights: [
      'No coding required - start immediately',
      'Interactive AI Detective Hunt exercise',
      'Build business presentation with AI tools',
      'Master ChatGPT, Canva, Grammarly, and more'
    ],
    technologies: ['ChatGPT', 'Canva', 'Grammarly', 'Google AI Tools', 'Voice Assistants'],
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    popular: false,
    unique: false,
    premium: false,
    rating: 4.8,
    students: 847,
    lastUpdated: '2025-01-15',
    modules: aiFoundationsModules,
    curriculum: {
      overview: 'Comprehensive introduction to AI without technical prerequisites',
      totalDuration: 720,
      moduleCount: 6,
      projectCount: 6,
      certificateOffered: true,
      continuingEducation: 12
    },
    pricing: {
      individual: 299,
      team: 1495, // 5 seats with 25% discount
      enterprise: 2390, // 10 seats with 40% discount
      corporate: 2500 // Custom pricing for large teams
    }
  },
  {
    id: 'applied-ai',
    title: 'Applied AI',
    subtitle: 'From APIs to Simple Projects',
    description: 'Build real AI applications with multi-provider integration. Perfect for developers wanting practical AI implementation skills.',
    level: 'Intermediate',
    difficulty: 2,
    duration: '15 hours',
    totalMinutes: 900,
    lessons: 6,
    price: 399,
    originalPrice: null,
    category: 'development',
    targetAudience: 'Developers, technical professionals, data analysts',
    prerequisites: 'Basic programming, API concepts, command line comfort',
    learningOutcomes: [
      'Integrate multiple AI APIs with professional error handling',
      'Process various data formats for AI analysis and insights',
      'Build complete AI applications from concept to deployment',
      'Implement multilingual text analysis and sentiment detection',
      'Create professional data visualization dashboards',
      'Deploy AI applications to production cloud platforms'
    ],
    keyHighlights: [
      'Multi-provider integration (OpenAI + Anthropic + Google)',
      'Python & JavaScript implementation',
      'Real data processing pipelines',
      'Production deployment strategies'
    ],
    technologies: ['OpenAI API', 'Anthropic Claude', 'Google AI', 'Python', 'JavaScript', 'Cloud Platforms'],
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    popular: true,
    unique: false,
    premium: false,
    rating: 4.9,
    students: 1253,
    lastUpdated: '2025-01-10',
    modules: appliedAiModules,
    curriculum: {
      overview: 'Hands-on AI development with multiple programming languages and cloud deployment',
      totalDuration: 900,
      moduleCount: 6,
      projectCount: 8,
      certificateOffered: true,
      continuingEducation: 15
    },
    pricing: {
      individual: 399,
      team: 1995, // 5 seats with 25% discount
      enterprise: 3192, // 10 seats with 40% discount
      corporate: 3500 // Custom pricing for dev teams
    }
  },
  {
    id: 'web-development-ai',
    title: 'AI-Powered Web Apps',
    subtitle: 'Building Intelligent Interfaces',
    description: 'The only comprehensive AI web development course. Build production-ready AI applications with modern frameworks.',
    level: 'Advanced',
    difficulty: 3,
    duration: '21 hours',
    totalMinutes: 1260,
    lessons: 7,
    price: 599,
    originalPrice: null,
    category: 'web-development',
    targetAudience: 'Web developers, full-stack engineers, tech entrepreneurs',
    prerequisites: 'JavaScript/TypeScript, React basics, API experience',
    learningOutcomes: [
      'Build full-stack AI applications using React/Next.js and FastAPI',
      'Implement real-time AI interactions with streaming responses',
      'Connect and orchestrate multiple AI models and services',
      'Deploy scalable AI applications to production environments',
      'Handle complex AI workflows with proper error management',
      'Create responsive, accessible AI interfaces with excellent UX'
    ],
    keyHighlights: [
      'React + Next.js + TypeScript modern stack',
      'Real-time AI interactions with streaming',
      'Build Netflix-style AI recommendation features',
      'Advanced testing and monitoring strategies'
    ],
    technologies: ['React', 'Next.js 14+', 'TypeScript', 'FastAPI', 'WebSockets', 'Vector Databases', 'Vercel', 'AWS'],
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    popular: false,
    unique: true,
    premium: false,
    rating: 4.9,
    students: 592,
    lastUpdated: '2025-01-05',
    modules: webDevAiModules,
    curriculum: {
      overview: 'Comprehensive full-stack AI web application development with modern frameworks',
      totalDuration: 1260,
      moduleCount: 7,
      projectCount: 12,
      certificateOffered: true,
      continuingEducation: 21
    },
    pricing: {
      individual: 599,
      team: 2995, // 5 seats with 25% discount
      enterprise: 4794, // 10 seats with 40% discount
      corporate: 5000 // Custom pricing for development teams
    }
  },
  {
    id: 'enterprise-ai',
    title: 'AI for Business',
    subtitle: 'Strategy, Adoption & Competitive Advantage',
    description: 'Lead AI transformation in your organization. Strategic frameworks and ROI modeling for business leaders.',
    level: 'Executive',
    difficulty: 2,
    duration: '17.5 hours',
    totalMinutes: 1050,
    lessons: 7,
    price: 899,
    originalPrice: 2600,
    category: 'business',
    targetAudience: 'Executives, managers, business leaders, consultants',
    prerequisites: 'Business management experience, technology familiarity',
    learningOutcomes: [
      'Develop comprehensive AI adoption strategies aligned with business objectives',
      'Identify and prioritize AI use cases with highest ROI potential',
      'Navigate compliance, ethics, and risk management for AI implementations',
      'Design change management programs for AI workforce transformation',
      'Create actionable AI adoption roadmaps with realistic timelines and budgets',
      'Lead AI initiatives and communicate value to stakeholders and boards'
    ],
    keyHighlights: [
      'Strategic AI adoption frameworks',
      'ROI modeling and business case tools',
      'Change management for AI transformation',
      'Board-ready presentation templates'
    ],
    technologies: ['Strategic Frameworks', 'ROI Models', 'Change Management Tools', 'AI Governance', 'Business Analytics'],
    color: 'from-amber-400 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    popular: false,
    unique: false,
    premium: true,
    rating: 4.8,
    students: 312,
    lastUpdated: '2024-12-20',
    modules: enterpriseAiModules,
    curriculum: {
      overview: 'Executive-level AI strategy and transformation leadership',
      totalDuration: 1050,
      moduleCount: 7,
      projectCount: 10,
      certificateOffered: true,
      continuingEducation: 18
    },
    pricing: {
      individual: 899,
      team: 4495, // 5 seats with 25% discount
      enterprise: 7194, // 10 seats with 40% discount
      corporate: 10000 // Custom enterprise pricing
    }
  }
];

// Course bundles
export const courseBundles = [
  {
    id: 'complete-journey',
    title: 'Complete AI Learning Journey',
    description: 'All 4 courses bundled together. The most comprehensive AI education available anywhere.',
    courses: ['ai-foundations', 'applied-ai', 'web-development-ai', 'enterprise-ai'],
    originalPrice: 2496,
    bundlePrice: 1799,
    savings: 697,
    popular: true
  },
  {
    id: 'technical-track',
    title: 'Technical Track Bundle',
    description: 'Perfect for developers seeking AI specialization',
    courses: ['applied-ai', 'web-development-ai'],
    originalPrice: 998,
    bundlePrice: 899,
    savings: 99,
    popular: false
  },
  {
    id: 'business-track',
    title: 'Business Track Bundle',
    description: 'From AI literacy to strategic leadership',
    courses: ['ai-foundations', 'enterprise-ai'],
    originalPrice: 1198,
    bundlePrice: 999,
    savings: 199,
    popular: false
  }
];

// Helper functions
export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getCoursesByLevel(level: string): Course[] {
  return courses.filter(course => course.level.toLowerCase() === level.toLowerCase());
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter(course => course.category === category);
}

export function getBundleById(id: string) {
  return courseBundles.find(bundle => bundle.id === id);
}

export function getCoursesInBundle(bundleId: string): Course[] {
  const bundle = getBundleById(bundleId);
  if (!bundle) return [];
  
  return bundle.courses.map(courseId => getCourseById(courseId)).filter(Boolean) as Course[];
}

export default courses;