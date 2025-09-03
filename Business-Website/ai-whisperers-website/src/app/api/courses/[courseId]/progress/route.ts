import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';
import courses from '@/lib/courses';

interface RouteParams {
  params: Promise<{
    courseId: string;
  }>;
}

// GET - Retrieve user's progress for a course
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const { courseId } = resolvedParams;

    // Find user and enrollment
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      },
      include: {
        lessonProgress: {
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
                order: true,
                duration: true,
              }
            }
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            lessonCount: true,
            totalMinutes: true,
          }
        }
      }
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Calculate progress metrics
    const completedLessons = enrollment.lessonProgress.filter(lp => lp.isCompleted).length;
    const totalLessons = enrollment.course.lessonCount;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return NextResponse.json({
      enrollment: {
        id: enrollment.id,
        progress: progressPercentage,
        timeSpent: enrollment.timeSpent,
        currentLessonId: enrollment.currentLessonId,
        lastAccessDate: enrollment.lastAccessDate,
        enrollmentDate: enrollment.enrollmentDate,
        completionDate: enrollment.completionDate,
      },
      course: enrollment.course,
      lessonProgress: enrollment.lessonProgress.map(lp => ({
        lessonId: lp.lessonId,
        isCompleted: lp.isCompleted,
        completedAt: lp.completedAt,
        timeSpent: lp.timeSpent,
        progressPercentage: lp.progressPercentage,
        lesson: lp.lesson,
      })),
      stats: {
        completedLessons,
        totalLessons,
        progressPercentage: Math.round(progressPercentage),
        estimatedTimeRemaining: enrollment.course.totalMinutes - enrollment.timeSpent,
      }
    });

  } catch (error) {
    console.error('Progress retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve progress' },
      { status: 500 }
    );
  }
}

// POST - Update progress for a lesson
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const { courseId } = resolvedParams;
    const body = await request.json();
    const { lessonId, isCompleted, timeSpent = 0, progressPercentage = 0 } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      );
    }

    // Find user and enrollment
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      }
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Update lesson progress
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollment.id,
          lessonId: lessonId,
        }
      },
      update: {
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null,
        timeSpent: timeSpent,
        progressPercentage: progressPercentage,
      },
      create: {
        enrollmentId: enrollment.id,
        lessonId: lessonId,
        userId: user.id,
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null,
        timeSpent: timeSpent,
        progressPercentage: progressPercentage,
      }
    });

    // Update enrollment progress and last access
    const allLessonProgress = await prisma.lessonProgress.findMany({
      where: {
        enrollmentId: enrollment.id
      }
    });

    const completedLessons = allLessonProgress.filter(lp => lp.isCompleted).length;
    const totalTimeSpent = allLessonProgress.reduce((sum, lp) => sum + lp.timeSpent, 0);
    
    // Get total lessons for this course from course data
    const course = courses.find(c => c.id === courseId);
    const totalLessons = course?.lessonCount || 0;
    const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progress: overallProgress,
        timeSpent: totalTimeSpent,
        lastAccessDate: new Date(),
        currentLessonId: lessonId,
        completionDate: overallProgress >= 100 ? new Date() : null,
      }
    });

    // Update user overall progress
    const userCourseCount = await prisma.enrollment.count({
      where: { userId: user.id }
    });

    const completedCourseCount = await prisma.enrollment.count({
      where: { 
        userId: user.id,
        completionDate: { not: null }
      }
    });

    const totalUserTimeSpent = await prisma.enrollment.aggregate({
      where: { userId: user.id },
      _sum: { timeSpent: true }
    });

    await prisma.userProgress.upsert({
      where: { userId: user.id },
      update: {
        totalCoursesEnrolled: userCourseCount,
        totalCoursesCompleted: completedCourseCount,
        totalTimeSpent: totalUserTimeSpent._sum.timeSpent || 0,
      },
      create: {
        userId: user.id,
        totalCoursesEnrolled: userCourseCount,
        totalCoursesCompleted: completedCourseCount,
        totalTimeSpent: totalUserTimeSpent._sum.timeSpent || 0,
      }
    });

    return NextResponse.json({
      success: true,
      lessonProgress: lessonProgress,
      enrollmentProgress: {
        progress: overallProgress,
        timeSpent: totalTimeSpent,
        completedLessons: completedLessons,
        totalLessons: totalLessons,
        isCompleted: overallProgress >= 100,
      }
    });

  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}