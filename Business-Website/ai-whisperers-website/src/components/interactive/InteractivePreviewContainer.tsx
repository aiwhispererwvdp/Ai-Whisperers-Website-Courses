'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { 
  PlayIcon, 
  ReaderIcon, 
  CodeIcon, 
  BarChartIcon,
  CheckCircledIcon 
} from '@radix-ui/react-icons';
import AIDetectiveDemo from './AIDetectiveDemo';
import AIAPIDemo from './AIAPIDemo';
import ROICalculatorDemo from './ROICalculatorDemo';

interface InteractivePreviewContainerProps {
  courseId: string;
  courseTitle: string;
}

interface PreviewTab {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType;
  duration: string;
  type: string;
}

const getPreviewTabs = (courseId: string): PreviewTab[] => {
  switch (courseId) {
    case 'ai-foundations':
      return [
        {
          id: 'ai-detective',
          title: 'AI Detective Hunt',
          description: 'Interactive exercise to discover AI in your daily life',
          icon: PlayIcon,
          component: AIDetectiveDemo,
          duration: '15 min',
          type: 'Interactive Game',
        },
        {
          id: 'concepts',
          title: 'AI Concepts Overview',
          description: 'Learn core AI terminology with practical examples',
          icon: ReaderIcon,
          component: () => (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">AI vs Machine Learning vs Automation</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-green-800 mb-2">🍳 Think of it like cooking:</h4>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-gray-900">Automation:</strong>
                      <span className="text-gray-700"> A rice cooker that automatically turns off when done</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Machine Learning:</strong>
                      <span className="text-gray-700"> A smart oven that learns your preferences and suggests cooking times</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Artificial Intelligence:</strong>
                      <span className="text-gray-700"> A cooking assistant that plans meals, suggests recipes, and orders ingredients</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-blue-900 mb-3">Real-World Example: Netflix</h4>
                  <p className="text-blue-800 leading-relaxed">
                    Netflix uses <strong>AI + Machine Learning</strong> together. The system learns from millions of users' viewing patterns 
                    and makes intelligent suggestions specifically for you. It doesn't just show popular shows—it predicts what YOU will enjoy.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircledIcon className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h5 className="font-semibold text-green-800">Key Takeaway:</h5>
                      <p className="text-green-700 text-sm">
                        You don't need to be technical to use AI effectively. Understanding these basics helps you choose the right tool for each task.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
          duration: '12 min',
          type: 'Concept Learning',
        },
      ];

    case 'applied-ai':
      return [
        {
          id: 'api-demo',
          title: 'AI API Integration',
          description: 'See how easy it is to connect with AI providers',
          icon: CodeIcon,
          component: AIAPIDemo,
          duration: '20 min',
          type: 'Hands-on Coding',
        },
      ];

    case 'web-development-ai':
      return [
        {
          id: 'react-demo',
          title: 'AI Chat Component',
          description: 'Build a production-ready AI chat interface with React',
          icon: CodeIcon,
          component: () => (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">React AI Chat Component Demo</h3>
              
              {/* Mock Chat Interface */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-96">
                <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                  <h4 className="font-semibold">AI Assistant Chat</h4>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="p-4 space-y-4 h-80 overflow-y-auto">
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-800">Hello! I'm your AI assistant. How can I help you today?</p>
                      <div className="text-xs text-gray-500 mt-1">Just now</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-primary-600 text-white rounded-lg p-3">
                      <p className="text-sm">Can you help me understand machine learning?</p>
                      <div className="text-xs text-primary-200 mt-1">Just now</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">AI is typing...</span>
                      </div>
                      <p className="text-sm text-gray-800">
                        Machine learning is like teaching a computer to recognize patterns, just like how you learned to recognize faces or read handwriting. 
                        The computer looks at lots of examples and gets better at making predictions or decisions.
                      </p>
                      <div className="text-xs text-gray-500 mt-1">Just now</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="text" 
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                      disabled
                    />
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium opacity-50">
                      Send
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-3">🎓 What You're Learning:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircledIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800">Real-time streaming responses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircledIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800">React state management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircledIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800">TypeScript integration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircledIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800">Production-ready patterns</span>
                  </div>
                </div>
              </div>
            </div>
          ),
          duration: '25 min',
          type: 'Component Development',
        },
      ];

    case 'enterprise-ai':
      return [
        {
          id: 'roi-calculator',
          title: 'AI ROI Calculator',
          description: 'Calculate real business value of AI investments',
          icon: BarChartIcon,
          component: ROICalculatorDemo,
          duration: '18 min',
          type: 'Strategic Framework',
        },
      ];

    default:
      return [];
  }
};

export default function InteractivePreviewContainer({ 
  courseId, 
  courseTitle 
}: InteractivePreviewContainerProps) {
  const previewTabs = getPreviewTabs(courseId);
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  if (previewTabs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Interactive Preview Coming Soon
        </h3>
        <p className="text-gray-600">
          We're preparing interactive demos for this course. Check back soon!
        </p>
      </div>
    );
  }

  const markTabCompleted = (tabId: string) => {
    if (!completedTabs.includes(tabId)) {
      setCompletedTabs([...completedTabs, tabId]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden"
    >
      {/* Container Header */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Interactive Course Preview
        </h2>
        <p className="text-gray-600">
          Experience {courseTitle} through hands-on demos and sample content
        </p>
        
        {/* Progress Indicator */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Progress: {completedTabs.length}/{previewTabs.length} completed
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedTabs.length / previewTabs.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Content */}
      <div className="p-6">
        <Tabs defaultValue={previewTabs[0]?.id} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${previewTabs.length}, minmax(0, 1fr))` }}>
            {previewTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative data-[state=active]:bg-primary-600 data-[state=active]:text-white"
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.title}</span>
                </div>
                {completedTabs.includes(tab.id) && (
                  <CheckCircledIcon className="absolute -top-1 -right-1 w-4 h-4 text-success-500 bg-white rounded-full" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          {previewTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              {/* Tab Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tab.title}</h3>
                  <p className="text-gray-600">{tab.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">{tab.type}</div>
                  <div className="text-lg font-semibold text-primary-600">{tab.duration}</div>
                </div>
              </div>

              {/* Interactive Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <tab.component />
              </motion.div>

              {/* Completion Action */}
              {!completedTabs.includes(tab.id) && (
                <div className="text-center">
                  <button
                    onClick={() => markTabCompleted(tab.id)}
                    className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
                  >
                    Mark as Completed
                  </button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Completion Summary */}
        {completedTabs.length === previewTabs.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-gradient-to-br from-success-50 to-green-50 border border-success-200 rounded-2xl text-center"
          >
            <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircledIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-success-800 mb-4">
              🎉 Preview Completed!
            </h3>
            <p className="text-success-700 mb-6 max-w-2xl mx-auto">
              You've experienced the quality and teaching approach of our {courseTitle} course. 
              Ready to dive into the complete {previewTabs.length * 4}+ hour learning journey?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-success-600 text-white font-bold text-lg rounded-xl hover:bg-success-700 transition-all duration-300 transform hover:scale-105">
                Enroll in Full Course
              </button>
              <button className="px-8 py-4 text-success-700 font-semibold border-2 border-success-300 rounded-xl hover:border-success-400 hover:bg-success-50 transition-all duration-300">
                Get Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}