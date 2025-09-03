'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ReactNode } from 'react';

interface PayPalProviderProps {
  children: ReactNode;
}

const paypalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons,funding-eligibility',
  'enable-funding': 'venmo,paylater',
  'data-partner-attribution-id': 'AI-WHISPERERS_BN',
};

export default function PayPalProvider({ children }: PayPalProviderProps) {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      {children}
    </PayPalScriptProvider>
  );
}