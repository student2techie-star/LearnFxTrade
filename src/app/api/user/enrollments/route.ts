import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ courseIds: [] });
  }

  try {
    if (isSupabaseConfigured) {
      const { data } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId);

      if (data && data.length > 0) {
        const courseIds = data.map((e: any) => e.course_id);
        const mappedEnrollments = data.map((e: any) => ({
          id: e.id,
          userId: e.user_id,
          courseId: e.course_id,
          orderId: e.order_id,
          grantedAt: e.granted_at,
        }));
        return NextResponse.json({ courseIds, enrollments: mappedEnrollments });
      }
    }
  } catch (err) {
    console.warn('Supabase enrollments fetch error:', err);
  }

  const enrollments = db.getEnrollmentsByUser(userId);
  const courseIds = enrollments.map(e => e.courseId);

  return NextResponse.json({ courseIds, enrollments });
}

