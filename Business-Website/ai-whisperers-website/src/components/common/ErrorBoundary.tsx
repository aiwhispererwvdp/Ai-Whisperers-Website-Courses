'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import type { ErrorBoundaryState } from '@/types';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface ErrorFallbackProps {
  error: Error;
  retry: () => void;
  showDetails?: boolean;
}

function DefaultErrorFallback({ error, retry, showDetails = false }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-lg border border-red-200"
    >
      <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-red-600 mb-6 max-w-md">
        We encountered an unexpected error. Please try again, or contact support if the problem persists.
      </p>

      {showDetails && (
        <details className="mb-4 text-left w-full max-w-md">
          <summary className="cursor-pointer text-red-700 font-medium">
            Error Details
          </summary>
          <pre className="mt-2 p-3 bg-red-100 rounded text-xs text-red-800 overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
      
      <button
        onClick={retry}
        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      >
        <ArrowPathIcon className="h-4 w-4 mr-2" />
        Try Again
      </button>
    </motion.div>
  );
}

function CourseErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 rounded-lg p-6 text-center"
    >
      <div className="text-gray-600 mb-4">
        <ExclamationTriangleIcon className="h-8 w-8 mx-auto mb-2" />
        Unable to load course content
      </div>
      <button
        onClick={retry}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Retry loading
      </button>
    </motion.div>
  );
}

function PaymentErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-orange-50 border border-orange-200 rounded-lg p-4"
    >
      <div className="flex items-center mb-3">
        <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mr-2" />
        <span className="text-orange-800 font-medium">Payment Error</span>
      </div>
      <p className="text-orange-700 text-sm mb-3">
        We couldn't process your payment. Please check your payment method and try again.
      </p>
      <button
        onClick={retry}
        className="text-orange-600 hover:text-orange-800 underline text-sm"
      >
        Try payment again
      </button>
    </motion.div>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      retryCount: this.retryCount,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount += 1;
      this.setState({ hasError: false, error: undefined });
    }
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent 
          error={this.state.error} 
          retry={this.handleRetry}
          showDetails={this.props.showDetails}
        />
      );
    }

    return this.props.children;
  }
}

// Specialized error boundaries for different contexts
export function CourseErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary 
      fallback={CourseErrorFallback}
      onError={(error) => {
        console.error('Course section error:', error);
        // Track course-specific errors
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export function PaymentErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary 
      fallback={PaymentErrorFallback}
      onError={(error) => {
        console.error('Payment error:', error);
        // Track payment-specific errors for analytics
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export function DashboardErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary 
      showDetails={process.env.NODE_ENV === 'development'}
      onError={(error) => {
        console.error('Dashboard error:', error);
        // Track dashboard errors
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Higher-order component for wrapping components with error boundaries
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  boundaryProps?: Partial<ErrorBoundaryProps>
) {
  const WithErrorBoundaryComponent = (props: P) => (
    <ErrorBoundary {...boundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}