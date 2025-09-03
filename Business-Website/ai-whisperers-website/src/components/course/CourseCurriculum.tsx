'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon,
  PlayIcon,
  ClockIcon,
  CheckIcon,
  FileTextIcon,
  CodeIcon,
  BarChartIcon
} from '@radix-ui/react-icons';
import { Course } from '@/lib/types/course';

interface CourseCurriculumProps {
  course: Course;
}

export default function CourseCurriculum({ course }: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'coding':
      case 'development':
      case 'backend':
      case 'advanced':
      case 'realtime':
      case 'optimization':
        return <CodeIcon className="w-4 h-4" />;
      case 'project':
      case 'capstone':
      case 'deployment':
        return <BarChartIcon className="w-4 h-4" />;
      case 'strategy':
      case 'planning':
      case 'governance':
      case 'change-management':
      case 'evaluation':
      case 'measurement':
      case 'strategic-planning':
        return <FileTextIcon className="w-4 h-4" />;
      default:
        return <PlayIcon className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Course Curriculum
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {course.curriculum.overview}
          </p>
          
          {/* Curriculum Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className={`text-3xl font-bold ${course.textColor}`}>
                {course.curriculum.moduleCount}
              </div>
              <div className="text-gray-600">Comprehensive Modules</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${course.textColor}`}>
                {Math.round(course.curriculum.totalDuration / 60)}
              </div>
              <div className="text-gray-600">Hours of Content</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${course.textColor}`}>
                {course.curriculum.projectCount}
              </div>
              <div className="text-gray-600">Hands-on Projects</div>
            </div>
            {course.curriculum.continuingEducation && (
              <div className="text-center">
                <div className={`text-3xl font-bold ${course.textColor}`}>
                  {course.curriculum.continuingEducation}
                </div>
                <div className="text-gray-600">CEU Credits</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Module List */}
        <div className="space-y-4">
          {course.modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${course.bgColor} ${course.textColor} flex items-center justify-center font-bold text-lg`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {module.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {Math.round(module.duration / 60)} hours
                      </span>
                      <span>{module.objectives.length} learning objectives</span>
                      <span>{module.activities.length} activities</span>
                    </div>
                  </div>
                </div>
                <div className={`flex-shrink-0 ${course.textColor} transition-transform duration-200 ${expandedModules.includes(module.id) ? 'rotate-90' : ''}`}>
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </button>

              {/* Module Content */}
              <AnimatePresence>
                {expandedModules.includes(module.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-6">
                      {/* Learning Objectives */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Learning Objectives:
                        </h4>
                        <div className="space-y-2">
                          {module.objectives.map((objective, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <CheckIcon className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      {module.activities.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Hands-on Activities:
                          </h4>
                          <div className="space-y-3">
                            {module.activities.map((activity, idx) => (
                              <div key={idx} className={`p-4 rounded-lg ${course.bgColor} border ${course.borderColor}`}>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <div className={course.textColor}>
                                      {getActivityIcon(activity.type)}
                                    </div>
                                    <h5 className="font-medium text-gray-900">
                                      {activity.name}
                                    </h5>
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {activity.duration} min
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {activity.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Case Study */}
                      {module.caseStudy && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Case Study:
                          </h4>
                          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <p className="text-gray-700 text-sm">{module.caseStudy}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Learning Outcomes Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            By Course Completion, You'll Be Able To:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.learningOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckIcon className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{outcome}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}