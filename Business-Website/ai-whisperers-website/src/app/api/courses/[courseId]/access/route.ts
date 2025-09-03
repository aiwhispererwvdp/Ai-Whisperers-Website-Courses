import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{
    courseId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required', hasAccess: false },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const { courseId } = resolvedParams;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', hasAccess: false },
        { status: 404 }
      );
    }

    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            isActive: true,
          }
        }
      }
    });

    if (!enrollment || !enrollment.course.isActive || !enrollment.isActive) {
      return NextResponse.json(
        { 
          error: 'No active enrollment found for this course',
          hasAccess: false 
        },
        { status: 403 }
      );
    }

    // Check if enrollment has expired (if expiration date is set)
    if (enrollment.expirationDate && new Date() > enrollment.expirationDate) {
      return NextResponse.json(
        { 
          error: 'Course access has expired',
          hasAccess: false,
          expiredDate: enrollment.expirationDate
        },
        { status: 403 }
      );
    }

    // Return access details
    return NextResponse.json({
      hasAccess: true,
      enrollment: {
        id: enrollment.id,
        enrollmentDate: enrollment.enrollmentDate,
        progress: enrollment.progress,
        currentLessonId: enrollment.currentLessonId,
        timeSpent: enrollment.timeSpent,
        lastAccessDate: enrollment.lastAccessDate,
      },
      course: {
        id: enrollment.course.id,
        title: enrollment.course.title,
      },
      accessUrls: {
        dashboard: `/dashboard/courses/${courseId}`,
        nextLesson: enrollment.currentLessonId 
          ? `/dashboard/courses/${courseId}/lessons/${enrollment.currentLessonId}`
          : `/dashboard/courses/${courseId}/lessons/1`,
      }
    });

  } catch (error) {
    console.error('Course access check error:', error);
    return NextResponse.json(
      { error: 'Failed to verify course access', hasAccess: false },
      { status: 500 }
    );
  }
}