'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  ReloadIcon, 
  CodeIcon, 
  CheckIcon,
  CopyIcon 
} from '@radix-ui/react-icons';

const demoPrompts = [
  {
    id: 'text-analysis',
    title: 'Text Analysis',
    prompt: 'Analyze the sentiment and key themes in this customer review: "I love this product! The quality is amazing and customer service was incredibly helpful. Will definitely buy again."',
    expectedResponse: 'Sentiment: Highly Positive\n\nKey Themes:\n• Product Quality (very positive)\n• Customer Service (excellent)\n• Loyalty/Retention (strong intent to repurchase)\n\nOverall Score: 9.2/10\nCustomer Satisfaction: Very High',
  },
  {
    id: 'code-generation',
    title: 'Code Generation',
    prompt: 'Write a Python function that calculates the compound interest for an investment with principal, rate, time, and compounding frequency.',
    expectedResponse: '```python\ndef compound_interest(principal, rate, time, frequency=1):\n    """\n    Calculate compound interest\n    \n    Args:\n        principal: Initial amount\n        rate: Annual interest rate (as decimal)\n        time: Time in years\n        frequency: Compounding frequency per year\n    """\n    amount = principal * (1 + rate/frequency) ** (frequency * time)\n    return round(amount, 2)\n\n# Example usage:\nresult = compound_interest(1000, 0.05, 10, 4)\nprint(f"Final amount: ${result}")\n```',
  },
  {
    id: 'business-analysis',
    title: 'Business Strategy',
    prompt: 'What are 3 key considerations for implementing AI in a small retail business to improve customer experience and operations?',
    expectedResponse: '1. **Customer Personalization AI**\n   • Implement recommendation engines\n   • Use chatbots for instant support\n   • ROI: 15-25% increase in average order value\n\n2. **Inventory Optimization**\n   • Predictive analytics for stock management\n   • Automated reordering systems\n   • ROI: 20-30% reduction in inventory costs\n\n3. **Marketing Automation**\n   • AI-powered email campaigns\n   • Social media content optimization\n   • ROI: 40-60% improvement in marketing efficiency',
  },
];

export default function AIAPIDemo() {
  const [selectedDemo, setSelectedDemo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const runDemo = async () => {
    setIsRunning(true);
    setShowResponse(false);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowResponse(true);
    setIsRunning(false);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Demo Header */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🚀 AI API Integration Demo
        </h3>
        <p className="text-gray-600">
          Experience how easy it is to integrate with AI APIs. Try different prompts and see real-time responses.
        </p>
      </div>

      <div className="p-6">
        {/* Demo Type Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {demoPrompts.map((demo, index) => (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedDemo === index
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {demo.title}
            </button>
          ))}
        </div>

        {/* Current Demo */}
        <div className="space-y-6">
          {/* Prompt Input */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                AI Prompt:
              </label>
              <button
                onClick={() => copyCode(demoPrompts[selectedDemo].prompt)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <CopyIcon className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
            <textarea
              value={customPrompt || demoPrompts[selectedDemo].prompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Enter your prompt here..."
            />
          </div>

          {/* Run Demo Button */}
          <div className="text-center">
            <button
              onClick={runDemo}
              disabled={isRunning}
              className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isRunning
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isRunning ? (
                <>
                  <ReloadIcon className="w-5 h-5 mr-3 animate-spin" />
                  Processing with AI...
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5 mr-3" />
                  Run AI Analysis
                </>
              )}
            </button>
          </div>

          {/* API Response */}
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CodeIcon className="w-5 h-5" />
                  <span className="font-medium">AI Response</span>
                </div>
                <button
                  onClick={() => copyCode(demoPrompts[selectedDemo].expectedResponse)}
                  className="text-gray-300 hover:text-white flex items-center space-x-1"
                >
                  <CopyIcon className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </button>
              </div>
              <div className="p-4 bg-gray-50">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {demoPrompts[selectedDemo].expectedResponse}
                </pre>
              </div>
            </motion.div>
          )}

          {/* Learning Notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-3">
              🎓 What You're Learning:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">How to structure effective AI prompts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">Understanding AI response patterns</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">API integration concepts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">Real-world application patterns</span>
              </div>
            </div>
          </div>

          {/* Course Teaser */}
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-xl p-6 text-center">
            <h4 className="font-bold text-gray-900 mb-2">
              This is just the beginning! 🚀
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              In the full Applied AI course, you'll build complete applications with multiple AI providers, 
              handle real data processing, and deploy to production.
            </p>
            <div className="text-primary-600 font-medium text-sm">
              ✓ 15 hours of hands-on coding ✓ 6 complete projects ✓ Production deployment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}