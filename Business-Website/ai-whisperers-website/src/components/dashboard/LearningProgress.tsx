'use client';

import { motion } from 'framer-motion';
import { BadgeIcon, CalendarIcon, BarChartIcon } from '@radix-ui/react-icons';

interface LearningProgressProps {
  userId: string;
}

const achievements = [
  { 
    id: 'first-course', 
    title: 'First Course Completed', 
    description: 'Completed AI Foundations course',
    earnedDate: '2025-02-28',
    icon: BadgeIcon,
    earned: true,
  },
  { 
    id: 'multi-provider', 
    title: 'Multi-Provider Master', 
    description: 'Built apps using 3+ AI providers',
    earnedDate: null,
    icon: BarChartIcon,
    earned: false,
  },
  { 
    id: 'streak-7', 
    title: '7-Day Learning Streak', 
    description: 'Consistent daily learning for a week',
    earnedDate: '2025-03-15',
    icon: CalendarIcon,
    earned: true,
  },
];

export default function LearningProgress({ userId }: LearningProgressProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Learning Progress & Achievements
          </h2>
          <p className="text-gray-600">
            Track your milestones and celebrate your AI learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Overall Progress</h3>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-primary-50 rounded-xl">
                <div className="text-4xl font-bold text-primary-600 mb-2">67%</div>
                <div className="text-gray-600">Journey Completion</div>
                <div className="text-sm text-gray-500 mt-1">44 of 65.5 hours completed</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-gray-600 text-sm">Courses Enrolled</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">1</div>
                  <div className="text-gray-600 text-sm">Completed</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next milestone</span>
                  <span className="text-primary-600 font-medium">Applied AI completion</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                    style={{ width: '80%' }}
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ delay: 0.8, duration: 1.0, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-success-50 border-success-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    achievement.earned
                      ? 'bg-success-500'
                      : 'bg-gray-300'
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${
                      achievement.earned ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </div>
                    <div className={`text-sm ${
                      achievement.earned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </div>
                    {achievement.earnedDate && (
                      <div className="text-xs text-success-600 mt-1">
                        Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                🎯 Keep learning to unlock more achievements!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}