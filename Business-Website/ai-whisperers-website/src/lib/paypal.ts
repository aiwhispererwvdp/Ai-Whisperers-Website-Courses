// PayPal configuration and utilities
export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
export const PAYPAL_MODE = (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox';

// Course pricing configuration
export const COURSES = {
  'ai-foundations': {
    id: 'ai-foundations',
    title: 'AI Foundations',
    price: 299,
    description: 'Master AI without coding - Perfect for complete beginners',
    sku: 'AI-FOUND-001',
  },
  'applied-ai': {
    id: 'applied-ai',
    title: 'Applied AI',
    price: 399,
    description: 'Build real AI applications with multi-provider integration',
    sku: 'AI-APPL-002',
  },
  'web-development-ai': {
    id: 'web-development-ai',
    title: 'AI-Powered Web Apps',
    price: 599,
    description: 'The only comprehensive AI web development course',
    sku: 'AI-WEB-003',
  },
  'enterprise-ai': {
    id: 'enterprise-ai',
    title: 'AI for Business',
    price: 899,
    description: 'Lead AI transformation in your organization',
    sku: 'AI-ENT-004',
  },
} as const;

// Bundle pricing configuration
export const BUNDLES = {
  'complete-journey': {
    id: 'complete-journey',
    title: 'Complete AI Learning Journey',
    price: 1799,
    originalPrice: 2496,
    savings: 697,
    description: 'All 4 courses - From complete beginner to industry expert',
    sku: 'AI-BUNDLE-COMPLETE',
    courses: ['ai-foundations', 'applied-ai', 'web-development-ai', 'enterprise-ai'],
    paymentPlan: {
      enabled: true,
      monthlyPrice: 300,
      months: 6,
    },
  },
  'technical-track': {
    id: 'technical-track',
    title: 'Technical Track Bundle',
    price: 899,
    originalPrice: 998,
    savings: 99,
    description: 'Applied AI + Web Development AI for developers',
    sku: 'AI-BUNDLE-TECH',
    courses: ['applied-ai', 'web-development-ai'],
    paymentPlan: {
      enabled: true,
      monthlyPrice: 150,
      months: 6,
    },
  },
  'business-track': {
    id: 'business-track',
    title: 'Business Track Bundle',
    price: 999,
    originalPrice: 1198,
    savings: 199,
    description: 'AI Foundations + Enterprise AI for business leaders',
    sku: 'AI-BUNDLE-BIZ',
    courses: ['ai-foundations', 'enterprise-ai'],
    paymentPlan: {
      enabled: true,
      monthlyPrice: 167,
      months: 6,
    },
  },
} as const;

// PayPal SDK options
export const paypalOptions = {
  clientId: PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons,funding-eligibility',
  'enable-funding': 'venmo,paylater',
  'disable-funding': 'credit,card',
};

// Payment item creation utilities
export function createPayPalItem(courseId: string, quantity: number = 1) {
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course) {
    throw new Error(`Course not found: ${courseId}`);
  }

  return {
    name: course.title,
    description: course.description,
    sku: course.sku,
    unit_amount: {
      currency_code: 'USD',
      value: course.price.toString(),
    },
    quantity: quantity.toString(),
    category: 'DIGITAL_GOODS',
  };
}

export function createPayPalBundle(bundleId: string) {
  const bundle = BUNDLES[bundleId as keyof typeof BUNDLES];
  if (!bundle) {
    throw new Error(`Bundle not found: ${bundleId}`);
  }

  return {
    name: bundle.title,
    description: bundle.description,
    sku: bundle.sku,
    unit_amount: {
      currency_code: 'USD',
      value: bundle.price.toString(),
    },
    quantity: '1',
    category: 'DIGITAL_GOODS',
  };
}

// Order creation for PayPal
export function createPayPalOrder(items: any[], customerInfo?: any) {
  const totalAmount = items.reduce((sum, item) => 
    sum + (parseFloat(item.unit_amount.value) * parseInt(item.quantity)), 0
  );

  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: `AI-WHISPERERS-${Date.now()}`,
        description: 'AI-Whisperers Course Enrollment',
        amount: {
          currency_code: 'USD',
          value: totalAmount.toString(),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: totalAmount.toString(),
            },
          },
        },
        items: items,
        payee: {
          email_address: 'merchant@ai-whisperers.com',
          merchant_id: process.env.PAYPAL_MERCHANT_ID,
        },
      },
    ],
    application_context: {
      brand_name: 'AI-Whisperers',
      locale: 'en-US',
      landing_page: 'BILLING',
      shipping_preference: 'NO_SHIPPING',
      user_action: 'PAY_NOW',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    },
  };
}

// Subscription plan creation for bundles
export function createSubscriptionPlan(bundleId: string) {
  const bundle = BUNDLES[bundleId as keyof typeof BUNDLES];
  if (!bundle?.paymentPlan?.enabled) {
    throw new Error(`Subscription not available for bundle: ${bundleId}`);
  }

  return {
    product_id: bundle.sku,
    name: `${bundle.title} - Monthly Plan`,
    description: `${bundle.description} - 6-month payment plan`,
    billing_cycles: [
      {
        frequency: {
          interval_unit: 'MONTH',
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: bundle.paymentPlan.months,
        pricing_scheme: {
          fixed_price: {
            value: bundle.paymentPlan.monthlyPrice.toString(),
            currency_code: 'USD',
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee: {
        value: '0',
        currency_code: 'USD',
      },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3,
    },
    taxes: {
      percentage: '0',
      inclusive: false,
    },
  };
}