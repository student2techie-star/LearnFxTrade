import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
    const { action, userId, courseId } = await req.json();

    if (action === 'grant_access') {
      const enr = db.grantEnrollment(userId, courseId);
      return NextResponse.json({ success: true, enrollment: enr });
    } else if (action === 'revoke_access') {
      const res = db.revokeEnrollment(userId, courseId);
      return NextResponse.json({ success: true, revoked: res });
    } else if (action === 'delete_course') {
      const res = db.deleteCourse(courseId);
      return NextResponse.json({ success: res });
    } else if (action === 'delete_certificate') {
      const { certId } = await req.clone().json();
      const res = db.deleteCertificate(certId);
      return NextResponse.json({ success: res });
    } else if (action === 'add_lesson') {
      const body = await req.clone().json();
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
      const body = await req.clone().json();
      const res = db.deleteLesson(body.lessonId);
      return NextResponse.json({ success: res });
    } else if (action === 'create_offline_batch') {
      const body = await req.clone().json();
      const newBatch = db.createOfflineBatch({
        title: body.title,
        city: body.city || 'Bengaluru',
        venue: body.venue || 'City Trading Center',
        startDate: body.startDate || 'Upcoming',
        endDate: body.endDate || 'Upcoming',
        timing: body.timing || '9:30 AM - 5:30 PM',
        priceInr: Number(body.priceInr) || 14999,
        totalSeats: Number(body.totalSeats) || 25,
        bookedSeats: 0,
        status: 'upcoming',
        notes: body.notes || '',
        enrolledStudents: [],
      });
      return NextResponse.json({ success: true, batch: newBatch });
    } else if (action === 'delete_offline_batch') {
      const body = await req.clone().json();
      const res = db.deleteOfflineBatch(body.batchId);
      return NextResponse.json({ success: res });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Admin action failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

