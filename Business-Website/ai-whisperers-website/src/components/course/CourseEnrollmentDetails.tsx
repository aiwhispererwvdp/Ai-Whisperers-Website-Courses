'use client';

import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  PersonIcon, 
  CheckIcon, 
  StarIcon,
  LockClosedIcon as ShieldIcon,
  UpdateIcon,
  ChatBubbleIcon as CommunityIcon
} from '@radix-ui/react-icons';

interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
}

interface CourseEnrollmentDetailsProps {
  course: Course;
}

// Course details data - would typically come from API/database
const courseDetails = {
  'ai-foundations': {
    duration: '12 hours',
    lessons: 6,
    level: 'Beginner',
    prerequisites: 'None - designed for complete beginners',
    outcomes: [
      'Master 10+ AI tools without coding',
      'Create AI-assisted presentations and content',
      'Understand AI bias and quality evaluation',
      'Build your first AI-powered project',
      'Make informed AI adoption decisions',
    ],
    features: [
      'Interactive workshops and hands-on activities',
      'No-code AI tool mastery (ChatGPT, Canva, etc.)',
      'Real-world business case studies',
      'Project-based portfolio development',
      'AI ethics and bias detection training',
    ],
    includes: [
      '6 comprehensive video lessons',
      '20+ hands-on exercises and activities',
      'Project templates and worksheets',
      'Assessment rubrics and self-evaluation tools',
      'Completion certificate and digital badge',
      'Lifetime access to all course updates',
    ],
  },
  'applied-ai': {
    duration: '15 hours',
    lessons: 6,
    level: 'Intermediate',
    prerequisites: 'Basic programming, API concepts, command line comfort',
    outcomes: [
      'Integrate multiple AI APIs professionally',
      'Build production-ready AI applications',
      'Process real-world data for AI analysis',
      'Deploy applications to cloud platforms',
      'Implement multilingual text analysis',
    ],
    features: [
      'Multi-provider API integration (OpenAI + Anthropic + Google)',
      'Python and JavaScript implementation',
      'Real data processing pipelines',
      'Production deployment strategies',
      'Error handling and rate limiting',
    ],
    includes: [
      '6 intensive coding workshops',
      'Complete project repositories',
      'API integration examples and templates',
      'Data processing pipeline code',
      'Cloud deployment guides',
      'Production-ready application examples',
    ],
  },
  'web-development-ai': {
    duration: '21 hours',
    lessons: 7,
    level: 'Advanced',
    prerequisites: 'JavaScript/TypeScript, React basics, API experience',
    outcomes: [
      'Build full-stack AI applications',
      'Implement real-time AI interactions',
      'Create responsive AI interfaces',
      'Deploy scalable applications',
      'Handle complex AI workflows',
    ],
    features: [
      'React + Next.js + TypeScript modern stack',
      'Real-time AI interactions with streaming',
      'Advanced component architecture',
      'Production deployment and monitoring',
      'Performance optimization strategies',
    ],
    includes: [
      '7 intensive development workshops',
      'Complete full-stack application code',
      'React component library for AI',
      'Deployment automation scripts',
      'Testing and monitoring examples',
      'Performance optimization guides',
    ],
  },
  'enterprise-ai': {
    duration: '17.5 hours',
    lessons: 7,
    level: 'Executive',
    prerequisites: 'Business management experience, technology familiarity',
    outcomes: [
      'Develop AI adoption strategies',
      'Create ROI models and business cases',
      'Navigate AI ethics and compliance',
      'Lead organizational transformation',
      'Present to boards and stakeholders',
    ],
    features: [
      'Strategic AI adoption frameworks',
      'ROI modeling and financial analysis',
      'Change management methodologies',
      'Governance and compliance structures',
      'Executive presentation templates',
    ],
    includes: [
      '7 strategic business workshops',
      'ROI calculator and modeling tools',
      'Business case templates',
      'Change management frameworks',
      'Board presentation materials',
      'Implementation roadmap templates',
    ],
  },
};

export default function CourseEnrollmentDetails({ course }: CourseEnrollmentDetailsProps) {
  const details = courseDetails[course.id as keyof typeof courseDetails];

  if (!details) {
    return (
      <div className="p-8 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-gray-600">Course details not available.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Course Overview */}
      <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Course Overview</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-primary-600" />
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="font-medium">{details.duration}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <PersonIcon className="w-5 h-5 text-primary-600" />
            <div>
              <div className="text-sm text-gray-600">Lessons</div>
              <div className="font-medium">{details.lessons} lessons</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <StarIcon className="w-5 h-5 text-primary-600" />
            <div>
              <div className="text-sm text-gray-600">Level</div>
              <div className="font-medium">{details.level}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ShieldIcon className="w-5 h-5 text-primary-600" />
            <div>
              <div className="text-sm text-gray-600">Price</div>
              <div className="font-medium">${course.price}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Prerequisites:</h4>
            <p className="text-gray-700 text-sm">{details.prerequisites}</p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
        <div className="space-y-3">
          {details.outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckIcon className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Features */}
      <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
        <div className="space-y-3">
          {details.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckIcon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What's Included */}
      <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
        <div className="space-y-3">
          {details.includes.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckIcon className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guarantees */}
      <div className="p-6 rounded-xl bg-success-50 border border-success-200">
        <h3 className="text-lg font-bold text-success-800 mb-4">Our Guarantees</h3>
        <div className="space-y-3 text-sm text-success-700">
          <div className="flex items-center space-x-3">
            <ShieldIcon className="w-4 h-4 flex-shrink-0" />
            <span>30-day money-back guarantee - no questions asked</span>
          </div>
          <div className="flex items-center space-x-3">
            <UpdateIcon className="w-4 h-4 flex-shrink-0" />
            <span>Lifetime access to course updates and improvements</span>
          </div>
          <div className="flex items-center space-x-3">
            <CommunityIcon className="w-4 h-4 flex-shrink-0" />
            <span>Exclusive access to student community and networking</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}