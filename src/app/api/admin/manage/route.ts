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

  return NextResponse.json({
    metrics: {
      totalStudents: users.filter(u => u.role === 'student').length,
      totalOrders: orders.length,
      paidOrders: orders.filter(o => o.status === 'paid').length,
      totalRevenue,
      coursesCount: courses.length,
      certificatesCount: db.getAllCertificatesAdmin().length,
    },
    students: studentsList,
    orders,
    courses,
    certificates: db.getAllCertificatesAdmin(),
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
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Admin action failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
