import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';
import courses from '@/lib/courses';
import { enrollUserInCourse } from '@/lib/convertkit';
import { hubspotService } from '@/lib/hubspot';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { courseId, paymentId, studentInfo } = body;

    if (!courseId || !paymentId) {
      return NextResponse.json(
        { error: 'Course ID and payment ID are required' },
        { status: 400 }
      );
    }

    // Find the course in our course data
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if user exists, create if not
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          firstName: studentInfo?.firstName,
          lastName: studentInfo?.lastName,
          company: studentInfo?.company,
          experience: studentInfo?.experience,
          goals: studentInfo?.goals,
          marketingConsent: studentInfo?.marketingConsent || false,
          newsletterSubscribed: studentInfo?.marketingConsent || false,
        }
      });
    } else {
      // Update user info if provided
      if (studentInfo) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            firstName: studentInfo.firstName || user.firstName,
            lastName: studentInfo.lastName || user.lastName,
            company: studentInfo.company || user.company,
            experience: studentInfo.experience || user.experience,
            goals: studentInfo.goals || user.goals,
            marketingConsent: studentInfo.marketingConsent ?? user.marketingConsent,
            newsletterSubscribed: studentInfo.marketingConsent ?? user.newsletterSubscribed,
          }
        });
      }
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      }
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 409 }
      );
    }

    // Create enrollment record
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
        paymentType: 'individual',
        pricePaid: course.price,
        paymentDate: new Date(),
        paymentStatus: 'COMPLETED',
        paymentId: paymentId,
        currentLessonId: null, // Will be set when they start first lesson
      },
      include: {
        course: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    // Update user progress record
    const userProgress = await prisma.userProgress.upsert({
      where: { userId: user.id },
      update: {
        totalCoursesEnrolled: { increment: 1 }
      },
      create: {
        userId: user.id,
        totalCoursesEnrolled: 1,
        totalCoursesCompleted: 0,
        totalTimeSpent: 0,
      }
    });

    // Send enrollment confirmation and automation sequences
    try {
      // ConvertKit email automation
      await enrollUserInCourse(user.email, courseId, course.title);
      
      // HubSpot contact and deal creation
      await hubspotService.createOrUpdateContact({
        email: user.email,
        firstname: user.firstName || user.name?.split(' ')[0] || '',
        lastname: user.lastName || user.name?.split(' ')[1] || '',
        company: user.company || '',
        ai_experience_level: user.experience || 'unknown',
        lead_source: 'course_enrollment',
        lifecyclestage: 'customer',
        hs_lead_status: 'ENROLLED',
      });
    } catch (automationError) {
      console.error('Marketing automation error (non-blocking):', automationError);
      // Don't fail enrollment if marketing automation fails
    }

    return NextResponse.json({
      success: true,
      enrollment: {
        id: enrollment.id,
        courseId: enrollment.courseId,
        courseTitle: course.title,
        enrollmentDate: enrollment.enrollmentDate,
        access: {
          dashboardUrl: `/dashboard/courses/${courseId}`,
          startLessonUrl: `/dashboard/courses/${courseId}/lessons/1`,
        }
      }
    });

  } catch (error) {
    console.error('Enrollment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    );
  }
}