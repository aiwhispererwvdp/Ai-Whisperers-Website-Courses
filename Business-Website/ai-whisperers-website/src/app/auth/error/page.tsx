'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const errorMessages: Record<string, string> = {
  Configuration: 'There was a problem with the server configuration.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The verification link was invalid or has expired.',
  OAuthCallback: 'There was an error with the OAuth provider.',
  OAuthCreateAccount: 'Could not create OAuth account.',
  EmailCreateAccount: 'Could not create email account.',
  Callback: 'There was an error in the callback handler.',
  OAuthAccountNotLinked: 'The account is not linked to any user.',
  SessionRequired: 'You must be signed in to access this page.',
  Default: 'An unexpected error occurred.',
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Default';
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        {/* Error Icon */}
        <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ExclamationTriangleIcon className="w-8 h-8 text-error-600" />
        </div>

        {/* Error Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-8">
          {errorMessage}
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300"
          >
            Try Again
          </Link>
          
          <Link
            href="/contact"
            className="block text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Contact Support
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