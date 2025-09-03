'use client';

import { motion } from 'framer-motion';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export default function BlogNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Stay Ahead in AI Education
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Get weekly insights, tutorials, and industry updates delivered to your inbox. 
            Join 10,000+ AI learners staying current with the latest developments.
          </p>
          
          {isSubmitted ? (
            <div className="p-6 bg-success-500/20 border border-success-400/30 rounded-xl max-w-md mx-auto">
              <div className="text-success-200 font-semibold mb-2">Thanks for subscribing!</div>
              <div className="text-success-300 text-sm">Check your email for confirmation.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <EnvelopeClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-12 pr-32 py-4 bg-white text-gray-900 rounded-xl border-0"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-accent-600 text-white font-semibold rounded-lg hover:bg-accent-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
          
          <p className="text-primary-300 text-sm mt-4">
            ✓ Weekly AI insights  ✓ Exclusive tutorials  ✓ Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}