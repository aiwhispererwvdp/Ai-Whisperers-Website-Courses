'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  CheckIcon, 
  FileTextIcon, 
  ClockIcon,
  ChevronRightIcon,
  LockClosedIcon
} from '@radix-ui/react-icons';
import { Course } from '@/lib/types/course';

interface CoursePreviewContentProps {
  course: Course;
}

export default function CoursePreviewContent({ course }: CoursePreviewContentProps) {
  const [selectedPreview, setSelectedPreview] = useState(0);

  // Generate preview content based on the course
  const getPreviewContent = () => {
    const firstModule = course.modules[0];
    if (!firstModule) return [];

    switch (course.id) {
      case 'ai-foundations':
        return [
          {
            title: "AI Detective Hunt - Finding AI Around You",
            duration: "15 minutes",
            type: "Interactive Activity",
            description: "Discover AI tools you're already using without realizing it. This hands-on exercise will open your eyes to the AI ecosystem.",
            content: `
              <h3>Welcome to Your First AI Adventure!</h3>
              <p>In this interactive exercise, you'll become an AI detective, discovering artificial intelligence tools hidden in plain sight around you.</p>
              
              <h4>Your Mission:</h4>
              <ul>
                <li>Open your smartphone and identify 5 AI features you use daily</li>
                <li>Explore popular apps like Google Maps, Netflix, and social media</li>
                <li>Create your personal "AI Discovery Map"</li>
              </ul>
              
              <h4>What You'll Discover:</h4>
              <p>Most people interact with dozens of AI systems every day without realizing it. From smartphone cameras that automatically adjust settings to music apps that know exactly what you want to hear next.</p>
              
              <div class="activity-box">
                <h5>Try This Now:</h5>
                <p>Take a photo with your phone's camera. Notice how it automatically focuses, adjusts lighting, and might even suggest filters? That's AI in action!</p>
              </div>
              
              <p>This is just the beginning of your journey to understanding and mastering AI tools that can transform how you work and live.</p>
            `,
            materials: ["AI Detection Worksheet", "Discovery Map Template"],
            objectives: [
              "Identify 10+ AI tools in your daily life",
              "Understand the difference between AI and automation", 
              "Create your personal AI ecosystem map"
            ]
          },
          {
            title: "Understanding AI vs Machine Learning vs Automation",
            duration: "12 minutes", 
            type: "Concept Explanation",
            description: "Clear, non-technical explanations of AI terminology with practical examples you can relate to.",
            content: `
              <h3>Demystifying AI Terminology</h3>
              <p>Let's clear up the confusion around AI, Machine Learning, and Automation with simple, everyday examples.</p>
              
              <h4>Think of it like cooking:</h4>
              <ul>
                <li><strong>Automation:</strong> A rice cooker that automatically turns off when done</li>
                <li><strong>Machine Learning:</strong> A smart oven that learns your preferences and suggests cooking times</li>
                <li><strong>Artificial Intelligence:</strong> A cooking assistant that can plan meals, suggest recipes based on your diet, and even order ingredients</li>
              </ul>
              
              <h4>Real-World Examples:</h4>
              <p><strong>Netflix Recommendations:</strong> This is AI + Machine Learning working together. The system learns from millions of users' viewing patterns and makes intelligent suggestions for you.</p>
              
              <p><strong>Google Search:</strong> When you type "weather," Google doesn't just find weather websites - it understands your intent and shows you the weather for your location right now.</p>
              
              <div class="key-insight">
                <h5>Key Insight:</h5>
                <p>You don't need to be a technical expert to use these tools effectively. Understanding the basics helps you choose the right AI tool for each task.</p>
              </div>
            `,
            materials: ["AI Terminology Guide", "Examples Cheat Sheet"],
            objectives: [
              "Distinguish between AI, ML, and automation",
              "Recognize AI applications in daily life",
              "Speak confidently about AI concepts"
            ]
          }
        ];
      case 'applied-ai':
        return [
          {
            title: "Making Your First OpenAI API Call",
            duration: "20 minutes",
            type: "Hands-on Coding",
            description: "Step-by-step guide to connecting with OpenAI's API and making your first successful AI request.",
            content: `
              <h3>Your First AI API Connection</h3>
              <p>Let's get hands-on with AI APIs! You'll learn to connect to OpenAI and make your first AI-powered application.</p>
              
              <h4>What We'll Build:</h4>
              <p>A simple text analyzer that can summarize articles, analyze sentiment, and answer questions about any text you provide.</p>
              
              <pre><code class="language-python">
import openai
from openai import OpenAI

# Initialize the client
client = OpenAI(api_key="your-api-key-here")

def analyze_text(text, analysis_type="summary"):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": f"You are a helpful assistant that provides {analysis_type} of text."},
            {"role": "user", "content": f"Please {analysis_type} this text: {text}"}
        ]
    )
    return response.choices[0].message.content

# Try it out!
sample_text = "Your article text here..."
summary = analyze_text(sample_text, "summary")
print(summary)
              </code></pre>
              
              <h4>Key Learning Points:</h4>
              <ul>
                <li>API authentication and security</li>
                <li>Understanding request/response patterns</li>
                <li>Error handling and rate limiting</li>
                <li>Cost optimization strategies</li>
              </ul>
              
              <div class="tip-box">
                <h5>Pro Tip:</h5>
                <p>Start with small requests to test your setup. The API playground is your best friend for experimentation!</p>
              </div>
            `,
            materials: ["API Setup Guide", "Sample Code Templates", "Error Handling Checklist"],
            objectives: [
              "Successfully authenticate with OpenAI API",
              "Make structured API requests",
              "Handle responses and errors gracefully"
            ]
          }
        ];
      case 'web-development-ai':
        return [
          {
            title: "Building an AI Chat Component with React",
            duration: "25 minutes",
            type: "Component Development",
            description: "Create a production-ready AI chat interface with streaming responses and modern React patterns.",
            content: `
              <h3>Building Professional AI Chat Interfaces</h3>
              <p>Learn to create responsive, accessible AI chat components that your users will love.</p>
              
              <h4>What We'll Build:</h4>
              <p>A fully-featured chat component with streaming responses, typing indicators, and error handling.</p>
              
              <pre><code class="language-tsx">
import { useState, useCallback } from 'react';
import { useAIStream } from '@/hooks/useAIStream';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState&lt;Message[]&gt;([]);
  const [input, setInput] = useState('');
  const { streamResponse, isLoading } = useAIStream();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Stream AI response
    await streamResponse(input, (chunk) => {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === 'assistant') {
          return prev.map((msg, index) => 
            index === prev.length - 1 
              ? { ...msg, content: msg.content + chunk }
              : msg
          );
        } else {
          return [...prev, {
            id: crypto.randomUUID(),
            content: chunk,
            role: 'assistant',
            timestamp: new Date()
          }];
        }
      });
    });
  }, [input, streamResponse]);

  return (
    &lt;div className="ai-chat-container"&gt;
      {/* Chat messages */}
      {/* Input form */}
      {/* Loading states */}
    &lt;/div&gt;
  );
}
              </code></pre>
              
              <h4>Advanced Features We'll Cover:</h4>
              <ul>
                <li>Real-time streaming responses</li>
                <li>Optimistic UI updates</li>
                <li>Accessible design patterns</li>
                <li>Performance optimization</li>
              </ul>
            `,
            materials: ["React Component Templates", "TypeScript Definitions", "Styling Guide"],
            objectives: [
              "Build responsive AI chat interfaces",
              "Implement streaming AI responses",
              "Handle complex state management"
            ]
          }
        ];
      case 'enterprise-ai':
        return [
          {
            title: "AI ROI Framework - Calculating Business Value",
            duration: "18 minutes",
            type: "Strategic Framework",
            description: "Learn to quantify AI investments and build compelling business cases that get board approval.",
            content: `
              <h3>Quantifying AI Business Value</h3>
              <p>Master the art and science of building bulletproof business cases for AI initiatives.</p>
              
              <h4>The AI ROI Framework:</h4>
              <ol>
                <li><strong>Identify Value Drivers:</strong> Cost reduction, revenue increase, risk mitigation</li>
                <li><strong>Quantify Impact:</strong> Time savings, error reduction, productivity gains</li>
                <li><strong>Calculate Costs:</strong> Technology, training, implementation, maintenance</li>
                <li><strong>Model Scenarios:</strong> Conservative, realistic, optimistic outcomes</li>
              </ol>
              
              <h4>Real Case Study: Customer Service AI</h4>
              <table class="roi-table">
                <tr>
                  <th>Metric</th>
                  <th>Before AI</th>
                  <th>After AI</th>
                  <th>Annual Savings</th>
                </tr>
                <tr>
                  <td>Average Response Time</td>
                  <td>4 hours</td>
                  <td>2 minutes</td>
                  <td>$280,000</td>
                </tr>
                <tr>
                  <td>Resolution Rate</td>
                  <td>75%</td>
                  <td>92%</td>
                  <td>$150,000</td>
                </tr>
                <tr>
                  <td>Agent Productivity</td>
                  <td>20 cases/day</td>
                  <td>35 cases/day</td>
                  <td>$420,000</td>
                </tr>
              </table>
              
              <div class="calculation-box">
                <h5>ROI Calculation:</h5>
                <p><strong>Total Annual Savings:</strong> $850,000</p>
                <p><strong>Implementation Cost:</strong> $200,000</p>
                <p><strong>ROI:</strong> 325% in Year 1</p>
              </div>
              
              <h4>Board Presentation Template:</h4>
              <p>We'll provide you with ready-to-use PowerPoint templates that clearly communicate AI value to executives and board members.</p>
            `,
            materials: ["ROI Calculator Template", "Board Presentation Template", "Business Case Framework"],
            objectives: [
              "Calculate concrete AI business value",
              "Build compelling business cases",
              "Present to executive stakeholders"
            ]
          }
        ];
      default:
        return [];
    }
  };

  const previewLessons = getPreviewContent();

  if (!previewLessons.length) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Preview content is being prepared. Please check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Sample Lessons from {course.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our teaching methodology and see the quality of content you'll get in the full course.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lesson Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Preview Lessons</h3>
              <div className="space-y-2">
                {previewLessons.map((lesson, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPreview(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedPreview === index
                        ? `${course.bgColor} ${course.borderColor} ${course.textColor}`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <PlayIcon className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm mb-1">{lesson.title}</div>
                        <div className="text-xs text-gray-500">{lesson.duration}</div>
                      </div>
                    </div>
                  </button>
                ))}
                
                {/* Locked Lessons */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="text-sm text-gray-500 mb-2">Full Course Includes:</div>
                  {course.modules.slice(1, 4).map((module, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 mb-2">
                      <LockClosedIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm text-gray-600 truncate">
                          {module.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round(module.duration / 60)} hours
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-3">
                    <span className="text-sm text-gray-500">+ {course.modules.length - 4} more lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedPreview}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-premium p-8"
            >
              {/* Lesson Header */}
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${course.textColor} ${course.bgColor}`}>
                    {previewLessons[selectedPreview].type}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {previewLessons[selectedPreview].duration}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {previewLessons[selectedPreview].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {previewLessons[selectedPreview].description}
                </p>
              </div>

              {/* Lesson Content */}
              <div className="mb-8">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: previewLessons[selectedPreview].content 
                  }}
                />
              </div>

              {/* Learning Objectives */}
              <div className="mb-8 p-6 rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-4">Learning Objectives:</h4>
                <div className="space-y-2">
                  {previewLessons[selectedPreview].objectives.map((objective, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Included Materials:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {previewLessons[selectedPreview].materials.map((material, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <FileTextIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 text-sm">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Lesson Teaser */}
              <div className={`p-6 rounded-xl ${course.bgColor} border ${course.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Ready for More?</h5>
                    <p className="text-gray-600 text-sm">
                      This is just one lesson from our comprehensive {course.lessons}-lesson course.
                    </p>
                  </div>
                  <ChevronRightIcon className={`w-5 h-5 ${course.textColor}`} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}