'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function VerifyRequestPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        {/* Email Icon */}
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <EnvelopeClosedIcon className="w-8 h-8 text-success-600" />
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Check Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We've sent a secure sign-in link to <strong>{email}</strong>.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Click the link in your email to complete your sign-in. The link will expire in 24 hours for security.
        </p>

        {/* Help Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Didn't receive the email?</h3>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure the email address is correct</li>
            <li>• Wait a few minutes for delivery</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
          >
            Try Different Email
          </Link>
          
          <Link
            href="/contact"
            className="block text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Need Help? Contact Support
          </Link>
          
          <Link
            href="/"
            className="block text-gray-500 hover:text-gray-700 text-sm"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}