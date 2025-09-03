'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, BookmarkIcon, BadgeIcon } from '@radix-ui/react-icons';
import { User } from 'next-auth';

interface DashboardHeroProps {
  user: User;
}

export default function DashboardHero({ user }: DashboardHeroProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
        >
          {/* Welcome Message */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {greeting}, {user.name?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="text-xl text-primary-100 mb-6 leading-relaxed">
              Ready to continue your AI learning journey? You're making excellent progress 
              toward becoming an AI expert. Let's keep building those career-changing skills.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-accent-300" />
                <span className="text-primary-100">Joined {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookmarkIcon className="w-5 h-5 text-accent-300" />
                <span className="text-primary-100">3 courses in progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeIcon className="w-5 h-5 text-accent-300" />
                <span className="text-primary-100">Level: AI Practitioner</span>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-primary-500/30 backdrop-blur-sm rounded-2xl p-6 border border-primary-400/30">
            <h3 className="text-xl font-bold text-white mb-4">Learning Progress</h3>
            
            <div className="space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary-100 text-sm">Overall Completion</span>
                  <span className="text-accent-300 font-semibold">67%</span>
                </div>
                <div className="w-full bg-primary-600 rounded-full h-2">
                  <motion.div
                    className="bg-accent-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '67%' }}
                    transition={{ delay: 0.5, duration: 1.0, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Hours Completed */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-300">44</div>
                  <div className="text-primary-200 text-xs">Hours Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-300">21.5</div>
                  <div className="text-primary-200 text-xs">Hours Remaining</div>
                </div>
              </div>

              {/* Next Milestone */}
              <div className="pt-4 border-t border-primary-400/30">
                <div className="text-primary-100 text-sm mb-1">Next Milestone</div>
                <div className="text-white font-medium">Complete Web Development AI</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}