'use client';

import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeClosedIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('email', {
        email,
        callbackUrl,
        redirect: false,
      });

      if (result?.ok) {
        setEmailSent(true);
      } else {
        console.error('Sign in failed:', result?.error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = async (providerId: string) => {
    setIsLoading(true);
    await signIn(providerId, { callbackUrl });
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <EnvelopeClosedIcon className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent you a secure sign-in link at <strong>{email}</strong>. 
            Click the link in your email to complete your sign-in.
          </p>
          <button
            onClick={() => setEmailSent(false)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Try a different email
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">AI-Whisperers</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your AI learning journey
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl">
            <p className="text-error-700 text-sm">
              {error === 'OAuthCallback' 
                ? 'Authentication failed. Please try again.'
                : error === 'EmailSignin'
                ? 'Failed to send sign-in email. Please check your email address.'
                : 'An error occurred during sign-in. Please try again.'}
            </p>
          </div>
        )}

        {/* OAuth Providers */}
        {providers && (
          <div className="space-y-4 mb-6">
            {Object.values(providers).map((provider) => {
              if (provider.id === 'email') return null;
              
              return (
                <button
                  key={provider.name}
                  onClick={() => handleProviderSignIn(provider.id)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {provider.id === 'google' && (
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {provider.id === 'github' && <GitHubLogoIcon className="w-5 h-5 mr-3" />}
                  Continue with {provider.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Email Sign In Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Sending sign-in link...
              </>
            ) : (
              <>
                <EnvelopeClosedIcon className="w-5 h-5 mr-3" />
                Send sign-in link
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            New to AI-Whisperers?{' '}
            <Link href="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
              Browse our courses
            </Link>
          </p>
          <p className="mt-2">
            Need help?{' '}
            <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}