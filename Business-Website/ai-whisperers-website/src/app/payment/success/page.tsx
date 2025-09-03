import { Metadata } from 'next';
import { Suspense } from 'react';
import PaymentSuccess from '@/components/payment/PaymentSuccess';

export const metadata: Metadata = {
  title: 'Payment Successful | AI-Whisperers',
  description: 'Your course enrollment is complete. Access your AI learning materials immediately.',
  robots: { index: false }, // Don't index payment pages
};

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Suspense fallback={
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      }>
        <PaymentSuccess />
      </Suspense>
    </main>
  );
}