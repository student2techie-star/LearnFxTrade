import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ courseIds: [] });
  }

  const enrollments = db.getEnrollmentsByUser(userId);
  const courseIds = enrollments.map(e => e.courseId);

  return NextResponse.json({ courseIds, enrollments });
}
