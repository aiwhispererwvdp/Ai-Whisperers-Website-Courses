import { NextRequest, NextResponse } from 'next/server';

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  navigationType: string;
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();
    
    console.log('Web Vital recorded:', {
      metric: metric.name,
      value: metric.value,
      navigation: metric.navigationType,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Web vitals recording error:', error);
    return NextResponse.json(
      { error: 'Failed to record web vital' },
      { status: 500 }
    );
  }
}