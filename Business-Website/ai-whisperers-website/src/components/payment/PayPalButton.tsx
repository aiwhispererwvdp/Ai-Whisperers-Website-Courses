'use client';

import { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { motion } from 'framer-motion';
import { CheckIcon, Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';

interface PayPalButtonProps {
  courseId?: string;
  bundleId?: string;
  price: number;
  title: string;
  onSuccess?: (orderId: string, details: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

export default function PayPalButton({
  courseId,
  bundleId,
  price,
  title,
  onSuccess,
  onError,
  className = '',
}: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const createOrder = async () => {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          bundleId,
          price,
          title,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      setPaymentStatus('error');
      setErrorMessage('Failed to create payment order. Please try again.');
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    setPaymentStatus('processing');
    
    try {
      const response = await fetch('/api/payment/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
          courseId,
          bundleId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to capture order: ${response.statusText}`);
      }

      const details = await response.json();
      setPaymentStatus('success');
      
      if (onSuccess) {
        onSuccess(data.orderID, details);
      }

      // Redirect to success page
      window.location.href = `/payment/success?orderId=${data.orderID}`;
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      setPaymentStatus('error');
      setErrorMessage('Payment processing failed. Please contact support.');
      
      if (onError) {
        onError(error);
      }
    }
  };

  const onErrorHandler = (error: any) => {
    console.error('PayPal payment error:', error);
    setPaymentStatus('error');
    setErrorMessage('Payment failed. Please try again or contact support.');
    
    if (onError) {
      onError(error);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-xl bg-success-50 border border-success-200 text-center ${className}`}
      >
        <CheckIcon className="w-12 h-12 text-success-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-success-800 mb-2">
          Payment Successful!
        </h3>
        <p className="text-success-700 text-sm">
          Redirecting to your course access...
        </p>
      </motion.div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-xl bg-error-50 border border-error-200 text-center ${className}`}
      >
        <Cross2Icon className="w-12 h-12 text-error-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-error-800 mb-2">
          Payment Failed
        </h3>
        <p className="text-error-700 text-sm mb-4">
          {errorMessage}
        </p>
        <button
          onClick={() => {
            setPaymentStatus('idle');
            setErrorMessage('');
          }}
          className="px-4 py-2 bg-error-600 text-white font-medium rounded-lg hover:bg-error-700 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Payment Status */}
      {paymentStatus === 'processing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-4 rounded-lg bg-primary-50 border border-primary-200 text-center"
        >
          <ReloadIcon className="w-6 h-6 text-primary-600 mx-auto mb-2 animate-spin" />
          <p className="text-primary-700 font-medium">Processing your payment...</p>
          <p className="text-primary-600 text-sm">Please don't close this window</p>
        </motion.div>
      )}

      {/* Course/Bundle Info */}
      <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Amount:</span>
          <span className="text-2xl font-bold text-gray-900">${price}</span>
        </div>
      </div>

      {/* PayPal Button */}
      {isPending ? (
        <div className="flex items-center justify-center h-12 bg-gray-100 rounded-lg">
          <ReloadIcon className="w-5 h-5 text-gray-500 animate-spin mr-2" />
          <span className="text-gray-600">Loading PayPal...</span>
        </div>
      ) : (
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 45,
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onErrorHandler}
          onCancel={() => {
            console.log('Payment cancelled by user');
          }}
        />
      )}

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm text-center">
          🔒 Secure payment processed by PayPal
          <br />
          💰 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}