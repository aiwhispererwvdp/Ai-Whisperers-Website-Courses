'use client';

import { motion } from 'framer-motion';
import { StarIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Course } from '@/lib/types/course';

interface CourseInstructorProps {
  course: Course;
}

export default function CourseInstructor({ course }: CourseInstructorProps) {
  // Placeholder instructor data - in a real app this would come from a database
  const instructor = {
    name: 'AI-Whisperers Expert Team',
    title: 'AI Education Specialists',
    bio: 'Our team of AI experts brings together decades of experience in artificial intelligence, machine learning, and practical business applications. We\'ve worked with Fortune 500 companies, startups, and educational institutions to demystify AI and make it accessible to everyone.',
    image: '/images/team/ai-whisperers-team.jpg', // Placeholder image
    credentials: [
      'Combined 50+ years in AI and Machine Learning',
      'Published researchers in AI ethics and applications', 
      'Former engineers at Google, OpenAI, and Microsoft',
      'Business transformation consultants for 200+ companies',
      'Certified adult education instructors'
    ],
    achievements: [
      '10,000+ students taught worldwide',
      '4.8/5 average course rating',
      'Featured speakers at major AI conferences',
      'Authors of "The Business Leader\'s Guide to AI"',
      'Advisors to AI-first startups and corporations'
    ],
    social: {
      linkedin: 'https://linkedin.com/company/ai-whisperers',
      twitter: 'https://twitter.com/aiwhisperers'
    },
    coursesCreated: 4,
    totalStudents: 3004,
    averageRating: 4.8
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Your Instructors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry experts who have been at the forefront of AI development and education.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-premium p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Instructor Photo and Basic Info */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  {/* Placeholder for team photo */}
                  <div className={`w-48 h-48 mx-auto rounded-full ${course.bgColor} flex items-center justify-center mb-6`}>
                    <div className={`text-6xl font-bold ${course.textColor}`}>
                      AI
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {instructor.name}
                  </h3>
                  <p className={`text-lg ${course.textColor} font-medium mb-4`}>
                    {instructor.title}
                  </p>

                  {/* Instructor Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${course.textColor}`}>
                        {instructor.coursesCreated}
                      </div>
                      <div className="text-sm text-gray-600">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${course.textColor}`}>
                        {instructor.totalStudents.toLocaleString()}+
                      </div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${course.textColor} flex items-center justify-center`}>
                        {instructor.averageRating}
                        <StarIcon className="w-5 h-5 text-yellow-400 ml-1" />
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={instructor.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${course.bgColor} ${course.textColor} hover:bg-opacity-80 transition-colors duration-200`}
                    >
                      <LinkedInLogoIcon className="w-5 h-5" />
                    </a>
                    <a 
                      href={instructor.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${course.bgColor} ${course.textColor} hover:bg-opacity-80 transition-colors duration-200`}
                    >
                      <TwitterLogoIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Instructor Details */}
              <div className="lg:col-span-2">
                {/* Bio */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    About Your Instructors
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>

                {/* Credentials */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Credentials & Experience
                  </h4>
                  <div className="space-y-3">
                    {instructor.credentials.map((credential, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full ${course.color.includes('green') ? 'bg-green-500' : course.color.includes('blue') ? 'bg-blue-500' : course.color.includes('purple') ? 'bg-purple-500' : 'bg-amber-500'} mt-2 flex-shrink-0`}></div>
                        <span className="text-gray-700">{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Achievements
                  </h4>
                  <div className="space-y-3">
                    {instructor.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <StarIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${course.color.includes('green') ? 'text-green-500' : course.color.includes('blue') ? 'text-blue-500' : course.color.includes('purple') ? 'text-purple-500' : 'text-amber-500'}`} />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Teaching Philosophy */}
            <div className={`mt-12 p-6 rounded-xl ${course.bgColor} border ${course.borderColor}`}>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Our Teaching Philosophy
              </h4>
              <p className="text-gray-700 leading-relaxed">
                We believe AI education should be practical, accessible, and immediately applicable. Our courses are designed around real-world projects and hands-on learning, not theoretical concepts. 
                We start with your current knowledge level and guide you step-by-step to mastery, ensuring you build confidence and competence along the way.
                Every lesson includes practical exercises, real business applications, and the tools you need to succeed in an AI-driven world.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}