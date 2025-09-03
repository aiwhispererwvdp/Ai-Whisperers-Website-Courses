'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircledIcon as CheckCircleIcon } from '@radix-ui/react-icons';

interface PaymentSuccessProps {
  orderId?: string;
  courseTitle?: string;
  amount?: number;
}

export default function PaymentSuccess({ orderId, courseTitle, amount }: PaymentSuccessProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate processing delay
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your enrollment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <div className="space-y-4 mb-8">
          {courseTitle && (
            <p className="text-gray-600">
              You're now enrolled in <strong>{courseTitle}</strong>
            </p>
          )}

          {orderId && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-sm text-gray-900">{orderId}</p>
            </div>
          )}

          {amount && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Amount Paid</p>
              <p className="text-lg font-bold text-green-800">${amount.toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg text-left">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check your email for course access details</li>
              <li>• Join our exclusive student community</li>
              <li>• Start your first lesson immediately</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={() => window.location.href = '/courses'}
              className="w-full bg-primary-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-primary-700 transition-colors"
            >
              Access Your Course
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Questions? Contact our support team at{' '}
            <a href="mailto:support@ai-whisperers.com" className="text-primary-600 hover:underline">
              support@ai-whisperers.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}