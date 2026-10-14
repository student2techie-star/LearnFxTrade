import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const [
        usersRes,
        coursesRes,
        certsRes,
        batchesRes,
        liveRes,
        enrollmentsRes,
        ordersRes,
        lessonsRes
      ] = await Promise.all([
        supabase.from('users').select('*').order('created_at', { ascending: false }),
        supabase.from('courses').select('*').order('created_at', { ascending: false }),
        supabase.from('certificates').select('*').order('order_no', { ascending: true }),
        supabase.from('offline_batches').select('*').order('created_at', { ascending: false }),
        supabase.from('live_sessions').select('*').order('created_at', { ascending: false }),
        supabase.from('enrollments').select('*').order('granted_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('lessons').select('*').order('order_no', { ascending: true }),
      ]);

      const dbUsers = usersRes.data || [];
      const dbCourses = (coursesRes.data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        tagline: row.tagline || '',
        description: row.description || '',
        priceInr: Number(row.price_inr) || 0,
        originalPriceInr: Number(row.original_price_inr) || 0,
        thumbnailUrl: row.thumbnail_url || '',
        category: row.category || 'Forex',
        level: row.level || 'Intermediate',
        isPublished: row.is_published ?? true,
        features: Array.isArray(row.features) ? row.features : [],
        lessonsCount: Number(row.lessons_count) || 0,
        totalDuration: row.total_duration || '0h',
        createdAt: row.created_at,
      }));

      const dbCerts = (certsRes.data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        firmOrBroker: row.firm_or_broker,
        amount: row.amount,
        date: row.date || '',
        imageUrl: row.image_url,
        accountType: row.account_type || 'Prop Firm Funded',
        verifiedRef: row.verified_ref || '',
        orderNo: Number(row.order_no) || 1,
        isVisible: row.is_visible ?? true,
      }));

      const dbBatches = (batchesRes.data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        city: row.city || 'Chennai',
        venue: row.venue,
        startDate: row.start_date,
        endDate: row.end_date,
        timing: row.timing || '9:30 AM - 5:30 PM IST',
        priceInr: Number(row.price_inr) || 14999,
        advanceFeeInr: Number(row.advance_fee_inr) || 2999,
        totalSeats: Number(row.total_seats) || 25,
        bookedSeats: Number(row.booked_seats) || 0,
        status: row.status || 'upcoming',
        notes: row.notes || '',
        enrolledStudents: Array.isArray(row.enrolled_students) ? row.enrolled_students : [],
      }));

      const dbLiveSessions = (liveRes.data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        topic: row.topic || '',
        category: row.category || 'Forex SMC',
        scheduledDate: row.scheduled_date || '',
        duration: row.duration || '90 Mins',
        priceInr: Number(row.price_inr) || 0,
        advanceFeeInr: Number(row.advance_fee_inr) || 0,
        hostMentor: row.host_mentor || 'Somnath (Lead Trader)',
        platform: row.platform || 'Zoom',
        meetingUrl: row.meeting_url || '',
        totalSeats: Number(row.total_seats) || 100,
        enrolledAttendees: Array.isArray(row.enrolled_attendees) ? row.enrolled_attendees : [],
        status: row.status || 'upcoming',
        description: row.description || '',
      }));

      const dbEnrollments = (enrollmentsRes.data || []).map((row: any) => ({
        id: row.id,
        userId: row.user_id,
        courseId: row.course_id,
        orderId: row.order_id,
        grantedAt: row.granted_at,
      }));

      const dbOrders = (ordersRes.data || []).map((row: any) => ({
        id: row.id,
        userId: row.user_id,
        userEmail: row.user_email,
        courseId: row.course_id,
        courseTitle: row.course_title,
        razorpayOrderId: row.razorpay_order_id,
        amount: Number(row.amount) || 0,
        currency: row.currency || 'INR',
        status: row.status || 'created',
        createdAt: row.created_at,
      }));

      const dbLessons = (lessonsRes.data || []).map((row: any) => ({
        id: row.id,
        courseId: row.course_id,
        title: row.title,
        videoId: row.video_id,
        duration: row.duration || '15:00',
        orderNo: Number(row.order_no) || 1,
        isFreePreview: Boolean(row.is_free_preview),
        description: row.description || '',
      }));

      const totalRevenue = dbOrders
        .filter((o: any) => o.status === 'paid')
        .reduce((sum: number, o: any) => sum + o.amount, 0);

      const studentsList = dbUsers
        .filter((u: any) => u.role !== 'admin')
        .map((user: any) => {
          const userEnrollments = dbEnrollments.filter((e: any) => e.userId === user.id);
          const userOrders = dbOrders.filter((o: any) => o.userId === user.id || o.userEmail === user.email);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.created_at,
            enrollmentsCount: userEnrollments.length,
            enrolledCourses: userEnrollments.map((e: any) => {
              const c = dbCourses.find((course: any) => course.id === e.courseId);
              return { courseId: e.courseId, title: c?.title || e.courseId };
            }),
            ordersCount: userOrders.length,
          };
        });

      return NextResponse.json({
        metrics: {
          totalStudents: studentsList.length,
          totalOrders: dbOrders.length,
          paidOrders: dbOrders.filter((o: any) => o.status === 'paid').length,
          totalRevenue,
          coursesCount: dbCourses.length,
          certificatesCount: dbCerts.length,
          lessonsCount: dbLessons.length,
          offlineBatchesCount: dbBatches.length,
          liveSessionsCount: dbLiveSessions.length,
        },
        students: studentsList,
        orders: dbOrders,
        courses: dbCourses,
        lessons: dbLessons,
        certificates: dbCerts,
        offlineBatches: dbBatches,
        liveSessions: dbLiveSessions,
      });
    }
  } catch (err) {
    console.warn('Supabase admin/manage query error:', err);
  }

  // Fallback to in-memory store
  const users = db.getUsers();
  const enrollments = db.getAllEnrollments();
  const orders = db.getOrders();
  const courses = db.getCourses();

  const totalRevenue = orders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + o.amount, 0);

  const studentsList = users
    .filter(u => u.role !== 'admin')
    .map(user => {
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
      totalStudents: studentsList.length,
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

