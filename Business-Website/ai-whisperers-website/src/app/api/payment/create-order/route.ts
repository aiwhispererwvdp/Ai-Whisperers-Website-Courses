import { NextRequest, NextResponse } from 'next/server';
import { COURSES, BUNDLES, createPayPalItem, createPayPalBundle } from '@/lib/paypal';

const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Failed to get PayPal access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, bundleId, price, title } = body;

    // Validate request
    if (!price || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: price, title' },
        { status: 400 }
      );
    }

    // Create PayPal order items
    let items;
    if (courseId) {
      if (!COURSES[courseId as keyof typeof COURSES]) {
        return NextResponse.json(
          { error: `Invalid course ID: ${courseId}` },
          { status: 400 }
        );
      }
      items = [createPayPalItem(courseId)];
    } else if (bundleId) {
      if (!BUNDLES[bundleId as keyof typeof BUNDLES]) {
        return NextResponse.json(
          { error: `Invalid bundle ID: ${bundleId}` },
          { status: 400 }
        );
      }
      items = [createPayPalBundle(bundleId)];
    } else {
      return NextResponse.json(
        { error: 'Either courseId or bundleId must be provided' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => 
      sum + (parseFloat(item.unit_amount.value) * parseInt(item.quantity)), 0
    );

    // Create PayPal order
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: `AI-WHISPERERS-${Date.now()}`,
          description: 'AI-Whisperers Course Enrollment',
          amount: {
            currency_code: 'USD',
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: items,
        },
      ],
      application_context: {
        brand_name: 'AI-Whisperers',
        locale: 'en-US',
        landing_page: 'BILLING',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses`,
      },
    };

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PayPal-Request-Id': `AI-WHISPERERS-${Date.now()}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal order creation failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to create PayPal order', details: errorData },
        { status: response.status }
      );
    }

    const order = await response.json();
    
    // Log order creation for analytics
    console.log('PayPal order created:', {
      orderId: order.id,
      courseId,
      bundleId,
      amount: totalAmount,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(order);

  } catch (error) {
    console.error('PayPal order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error creating PayPal order' },
      { status: 500 }
    );
  }
}