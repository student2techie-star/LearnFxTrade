import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const lesson = db.getLessonById(id);
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // 1. If it's a free preview lesson, video ID is allowed
    if (lesson.isFreePreview) {
      return NextResponse.json({
        allowed: true,
        isFreePreview: true,
        videoId: lesson.videoId,
        title: lesson.title,
      });
    }

    // 2. For paid lesson, strictly check enrollment
    if (!userId) {
      return NextResponse.json(
        { allowed: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = db.getUserById(userId);
    const isEnrolled = db.isUserEnrolled(userId, lesson.courseId);
    const isAdmin = user?.role === 'admin';

    if (!isEnrolled && !isAdmin) {
      return NextResponse.json(
        {
          allowed: false,
          error: 'Course access restricted. Please enroll to watch this lesson.',
        },
        { status: 403 }
      );
    }

    // Return video ID only for authorized users
    return NextResponse.json({
      allowed: true,
      isFreePreview: false,
      videoId: lesson.videoId,
      title: lesson.title,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
