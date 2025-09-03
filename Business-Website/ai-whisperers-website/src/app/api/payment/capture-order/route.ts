import { NextRequest, NextResponse } from 'next/server';

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

async function enrollStudentInCourse(courseId: string, bundleId: string, studentEmail: string) {
  // TODO: Implement course enrollment logic
  // This would typically:
  // 1. Create user account if doesn't exist
  // 2. Enroll in course(s)
  // 3. Send welcome email with course access
  // 4. Update CRM with enrollment data
  // 5. Generate completion certificate placeholder
  
  console.log('Course enrollment:', { courseId, bundleId, studentEmail });
  
  // For now, return success - implement actual enrollment logic later
  return {
    success: true,
    courseAccess: courseId ? [courseId] : bundleId ? getBundleCourses(bundleId) : [],
    message: 'Successfully enrolled in course(s)',
  };
}

function getBundleCourses(bundleId: string): string[] {
  const bundleCourses = {
    'complete-journey': ['ai-foundations', 'applied-ai', 'web-development-ai', 'enterprise-ai'],
    'technical-track': ['applied-ai', 'web-development-ai'],
    'business-track': ['ai-foundations', 'enterprise-ai'],
  };
  
  return bundleCourses[bundleId as keyof typeof bundleCourses] || [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, courseId, bundleId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing order ID' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Capture the order
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PayPal-Request-Id': `AI-WHISPERERS-CAPTURE-${Date.now()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal order capture failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to capture PayPal order', details: errorData },
        { status: response.status }
      );
    }

    const captureData = await response.json();
    
    // Verify payment was successful
    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Payment not completed', status: captureData.status },
        { status: 400 }
      );
    }

    // Extract customer information
    const payer = captureData.payer;
    const customerEmail = payer.email_address;
    const customerName = `${payer.name.given_name} ${payer.name.surname}`;
    
    // Enroll student in course(s)
    const enrollmentResult = await enrollStudentInCourse(courseId, bundleId, customerEmail);
    
    if (!enrollmentResult.success) {
      console.error('Course enrollment failed:', enrollmentResult);
      // Payment was captured but enrollment failed - requires manual intervention
      return NextResponse.json(
        { error: 'Payment successful but course enrollment failed. Support will contact you within 24 hours.' },
        { status: 500 }
      );
    }

    // Log successful transaction
    console.log('Successful transaction:', {
      orderId,
      customerEmail,
      customerName,
      courseId,
      bundleId,
      amount: captureData.purchase_units[0].payments.captures[0].amount.value,
      timestamp: new Date().toISOString(),
    });

    // Send success response
    return NextResponse.json({
      success: true,
      orderId,
      transactionId: captureData.purchase_units[0].payments.captures[0].id,
      customer: {
        email: customerEmail,
        name: customerName,
      },
      enrollment: enrollmentResult,
      message: 'Payment successful and course access granted',
    });

  } catch (error) {
    console.error('PayPal order capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error capturing PayPal order' },
      { status: 500 }
    );
  }
}