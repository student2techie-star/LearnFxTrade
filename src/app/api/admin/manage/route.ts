import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  const users = db.getUsers();
  const enrollments = db.getAllEnrollments();
  const orders = db.getOrders();
  const courses = db.getCourses();

  const totalRevenue = orders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + o.amount, 0);

  const studentsList = users.map(user => {
    const userEnrollments = enrollments.filter(e => e.userId === user.id);
    const userOrders = orders.filter(o => o.userId === user.id);
    return {
      ...user,
      enrollmentsCount: userEnrollments.length,
      enrolledCourses: userEnrollments.map(e => {
        const c = courses.find(course => course.id === e.courseId);
        return { courseId: e.courseId, title: c?.title || e.courseId };
      }),
      ordersCount: userOrders.length,
    };
  });

  const lessons = courses.flatMap(c => db.getLessonsByCourseId(c.id));

  return NextResponse.json({
    metrics: {
      totalStudents: users.filter(u => u.role === 'student').length,
      totalOrders: orders.length,
      paidOrders: orders.filter(o => o.status === 'paid').length,
      totalRevenue,
      coursesCount: courses.length,
      certificatesCount: db.getAllCertificatesAdmin().length,
      lessonsCount: lessons.length,
      offlineBatchesCount: db.getOfflineBatches().length,
      liveSessionsCount: db.getLiveSessions().length,
    },
    students: studentsList,
    orders,
    courses,
    lessons,
    certificates: db.getAllCertificatesAdmin(),
    offlineBatches: db.getOfflineBatches(),
    liveSessions: db.getLiveSessions(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, userId, courseId, certId, lessonId, batchId } = body;

    if (action === 'grant_access') {
      if (isSupabaseConfigured) {
        await supabase.from('enrollments').upsert({
          id: `enr-${Date.now()}`,
          user_id: userId,
          course_id: courseId,
          granted_at: new Date().toISOString(),
        });
      }
      const enr = db.grantEnrollment(userId, courseId);
      return NextResponse.json({ success: true, enrollment: enr });
    } else if (action === 'revoke_access') {
      if (isSupabaseConfigured) {
        await supabase.from('enrollments').delete().match({ user_id: userId, course_id: courseId });
      }
      const res = db.revokeEnrollment(userId, courseId);
      return NextResponse.json({ success: true, revoked: res });
    } else if (action === 'delete_course') {
      if (isSupabaseConfigured) {
        await supabase.from('courses').delete().eq('id', courseId);
      }
      const res = db.deleteCourse(courseId);
      return NextResponse.json({ success: res });
    } else if (action === 'delete_certificate') {
      if (isSupabaseConfigured) {
        await supabase.from('certificates').delete().eq('id', certId);
      }
      const res = db.deleteCertificate(certId);
      return NextResponse.json({ success: res });
    } else if (action === 'add_lesson') {
      const lessonId = `les-${Date.now()}`;
      if (isSupabaseConfigured) {
        await supabase.from('lessons').insert({
          id: lessonId,
          course_id: body.courseId,
          title: body.title,
          video_id: body.videoId,
          duration: body.duration || '15:00',
          order_no: Number(body.orderNo) || 1,
          is_free_preview: Boolean(body.isFreePreview),
          description: body.description || '',
        });
      }
      const newLesson = db.createLesson({
        courseId: body.courseId,
        title: body.title,
        videoId: body.videoId,
        duration: body.duration || '15:00',
        orderNo: Number(body.orderNo) || 1,
        isFreePreview: Boolean(body.isFreePreview),
        description: body.description || '',
      });
      return NextResponse.json({ success: true, lesson: newLesson });
    } else if (action === 'delete_lesson') {
      if (isSupabaseConfigured) {
        await supabase.from('lessons').delete().eq('id', lessonId);
      }
      const res = db.deleteLesson(lessonId);
      return NextResponse.json({ success: res });
    } else if (action === 'create_offline_batch') {
      const newBatchId = `batch-${Date.now()}`;
      const priceInr = Number(body.priceInr) || 14999;
      const advanceFeeInr = Number(body.advanceFeeInr) || 2999;
      const totalSeats = Number(body.totalSeats) || 25;

      if (isSupabaseConfigured) {
        await supabase.from('offline_batches').insert({
          id: newBatchId,
          title: body.title,
          city: body.city || 'Chennai',
          venue: body.venue || 'ITC Grand Chola / Guindy Tech Trading Hub, Chennai',
          start_date: body.startDate || 'Upcoming',
          end_date: body.endDate || 'Upcoming',
          timing: body.timing || '9:30 AM - 5:30 PM',
          price_inr: priceInr,
          total_seats: totalSeats,
          booked_seats: 0,
          status: 'upcoming',
          notes: body.notes || '',
          enrolled_students: [],
        });
      }

      const newBatch = db.createOfflineBatch({
        title: body.title,
        city: body.city || 'Chennai',
        venue: body.venue || 'ITC Grand Chola / Guindy Tech Trading Hub, Chennai',
        startDate: body.startDate || 'Upcoming',
        endDate: body.endDate || 'Upcoming',
        timing: body.timing || '9:30 AM - 5:30 PM',
        priceInr,
        advanceFeeInr,
        totalSeats,
        bookedSeats: 0,
        status: 'upcoming',
        notes: body.notes || '',
        enrolledStudents: [],
      });
      return NextResponse.json({ success: true, batch: newBatch });
    } else if (action === 'delete_offline_batch') {
      if (isSupabaseConfigured) {
        await supabase.from('offline_batches').delete().eq('id', batchId);
      }
      const res = db.deleteOfflineBatch(batchId);
      return NextResponse.json({ success: res });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Admin action failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

