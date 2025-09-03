import { NextRequest, NextResponse } from 'next/server';

interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  experience: string;
  goals: string;
  marketingConsent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentInfo, courseId }: { studentInfo: StudentInfo; courseId: string } = body;

    // Validate required fields
    if (!studentInfo.firstName || !studentInfo.lastName || !studentInfo.email || !studentInfo.experience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentInfo.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate course ID
    const validCourses = ['ai-foundations', 'applied-ai', 'web-development-ai', 'enterprise-ai'];
    if (!validCourses.includes(courseId)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    // TODO: Implement actual enrollment preparation
    // This would typically:
    // 1. Check if user already exists
    // 2. Validate course availability
    // 3. Check for any prerequisites
    // 4. Prepare user account creation
    // 5. Set up course access permissions
    // 6. Prepare welcome email template
    // 7. Create enrollment record in pending state

    // For now, simulate enrollment preparation
    console.log('Preparing enrollment:', {
      student: {
        name: `${studentInfo.firstName} ${studentInfo.lastName}`,
        email: studentInfo.email,
        company: studentInfo.company || 'Individual',
        experience: studentInfo.experience,
      },
      course: courseId,
      timestamp: new Date().toISOString(),
    });

    // Check if user already has access to this course
    // TODO: Implement actual database check
    const hasExistingAccess = false;

    if (hasExistingAccess) {
      return NextResponse.json(
        { error: 'You already have access to this course. Check your student dashboard.' },
        { status: 409 }
      );
    }

    // Prepare enrollment session
    const enrollmentSession = {
      sessionId: `enroll_${courseId}_${Date.now()}`,
      studentInfo: {
        ...studentInfo,
        // Don't store sensitive info in session
        email: studentInfo.email,
        firstName: studentInfo.firstName,
        lastName: studentInfo.lastName,
      },
      courseId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
    };

    // TODO: Store enrollment session in database/cache
    // For now, we'll rely on the payment flow to complete enrollment

    // Prepare marketing list addition if consented
    if (studentInfo.marketingConsent) {
      // TODO: Add to email marketing list
      console.log('Adding to marketing list:', studentInfo.email);
    }

    return NextResponse.json({
      success: true,
      sessionId: enrollmentSession.sessionId,
      message: 'Enrollment preparation successful',
      nextStep: 'payment',
    });

  } catch (error) {
    console.error('Enrollment preparation error:', error);
    return NextResponse.json(
      { error: 'Internal server error preparing enrollment' },
      { status: 500 }
    );
  }
}