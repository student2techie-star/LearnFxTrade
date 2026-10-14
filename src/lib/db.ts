import { Course, Lesson, PayoutCertificate, User, Order, Enrollment, LessonProgress, OfflineBatch, LiveSession } from './types';

// Persistent local storage simulator for server routes and client side
class DataStore {
  private courses: Course[] = [];
  private lessons: Lesson[] = [];
  private certificates: PayoutCertificate[] = [];
  private users: User[] = [];
  private enrollments: Enrollment[] = [];
  private orders: Order[] = [];
  private progress: LessonProgress[] = [];
  private offlineBatches: OfflineBatch[] = [];
  private liveSessions: LiveSession[] = [
    {
      id: 'live-london-smc',
      title: 'London Open Live SMC Execution & Order Flow Breakdown',
      topic: 'Live London session killzone analysis, liquidity pool run execution on EUR/USD & GBP/JPY with real-time entry triggers.',
      category: 'Forex SMC',
      scheduledDate: 'Tomorrow at 1:00 PM IST',
      duration: '90 Mins',
      priceInr: 1999,
      advanceFeeInr: 499,
      hostMentor: 'Somnath (Lead Trader)',
      platform: 'Zoom',
      meetingUrl: 'https://zoom.us/j/98234710293',
      totalSeats: 50,
      enrolledAttendees: [
        'Arun Kumar (arun.fx@gmail.com | +91 98840 12345)',
        'Pooja Venkatesh (pooja.trade@gmail.com | +91 97910 88765)',
        'Karthik R (karthik.smc@yahoo.com | +91 94441 55678)',
        'Vignesh K (vignesh.k@gmail.com | +91 99620 44321)'
      ],
      status: 'upcoming',
      description: 'Live interactive screen share during the London open. Ask doubts directly, review charts together, and observe real-time order block validation.',
    },
    {
      id: 'live-nifty-expiry',
      title: 'Nifty & BankNifty Live Expiry Day Strategy Lab',
      topic: 'Zero-to-Hero risk-controlled option buying setups, Open Interest trap identification, and CPR breakout timing.',
      category: 'Indian Market',
      scheduledDate: 'Thursday at 9:00 AM IST',
      duration: '120 Mins',
      priceInr: 1499,
      advanceFeeInr: 399,
      hostMentor: 'Somnath (Lead Trader)',
      platform: 'Google Meet',
      meetingUrl: 'https://meet.google.com/nif-tyex-pir',
      totalSeats: 40,
      enrolledAttendees: [
        'Sanjay Narayanan (sanjay.n@gmail.com | +91 98401 77654)',
        'Divya Balaji (divya.b@outlook.com | +91 99402 33445)',
        'Rahul S (rahul.trader@gmail.com | +91 97890 11223)'
      ],
      status: 'upcoming',
      description: 'Live market execution during Indian market trading hours. Master theta management and high-momentum gamma bursts.',
    },
    {
      id: 'live-propfirm-qa',
      title: 'Prop Firm Evaluation AMA: Passing FTMO & Drawdown Rules',
      topic: '1-on-1 portfolio desk review, psychology management under 5% daily drawdown, and payout extraction strategies.',
      category: 'Psychology & Q&A',
      scheduledDate: 'Saturday at 6:30 PM IST',
      duration: '75 Mins',
      priceInr: 999,
      advanceFeeInr: 299,
      hostMentor: 'Somnath (Lead Trader)',
      platform: 'Zoom',
      meetingUrl: 'https://zoom.us/j/84712093412',
      totalSeats: 60,
      enrolledAttendees: [
        'Harish V (harish.funded@gmail.com | +91 98412 66789)',
        'Meena Rajan (meena.rajan@gmail.com | +91 97103 44556)'
      ],
      status: 'upcoming',
      description: 'Interactive open floor Q&A session. Bring your recent trading journal for live trade critique and feedback.',
    },
  ];


  // Courses
  getCourses(): Course[] {
    return this.courses;
  }

  getCourseBySlug(slug: string): Course | undefined {
    return this.courses.find(c => c.slug === slug || c.id === slug);
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  createCourse(course: Omit<Course, 'id' | 'createdAt'>): Course {
    const newCourse: Course = {
      ...course,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.courses.unshift(newCourse);
    return newCourse;
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    const idx = this.courses.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.courses[idx] = { ...this.courses[idx], ...updates };
    return this.courses[idx];
  }

  deleteCourse(id: string): boolean {
    const initialLen = this.courses.length;
    this.courses = this.courses.filter(c => c.id !== id);
    this.lessons = this.lessons.filter(l => l.courseId !== id);
    return this.courses.length < initialLen;
  }

  // Lessons
  getLessonsByCourseId(courseId: string): Lesson[] {
    return this.lessons
      .filter(l => l.courseId === courseId)
      .sort((a, b) => a.orderNo - b.orderNo);
  }

  getLessonById(id: string): Lesson | undefined {
    return this.lessons.find(l => l.id === id);
  }

  createLesson(lesson: Omit<Lesson, 'id'>): Lesson {
    const newLesson: Lesson = {
      ...lesson,
      id: `les-${Date.now()}`
    };
    this.lessons.push(newLesson);
    return newLesson;
  }

  updateLesson(id: string, updates: Partial<Lesson>): Lesson | null {
    const idx = this.lessons.findIndex(l => l.id === id);
    if (idx === -1) return null;
    this.lessons[idx] = { ...this.lessons[idx], ...updates };
    return this.lessons[idx];
  }

  deleteLesson(id: string): boolean {
    const initialLen = this.lessons.length;
    this.lessons = this.lessons.filter(l => l.id !== id);
    return this.lessons.length < initialLen;
  }

  // Certificates
  getCertificates(): PayoutCertificate[] {
    return this.certificates
      .filter(c => c.isVisible)
      .sort((a, b) => a.orderNo - b.orderNo);
  }

  getAllCertificatesAdmin(): PayoutCertificate[] {
    return [...this.certificates].sort((a, b) => a.orderNo - b.orderNo);
  }

  createCertificate(cert: Omit<PayoutCertificate, 'id'>): PayoutCertificate {
    const newCert: PayoutCertificate = {
      ...cert,
      id: `cert-${Date.now()}`
    };
    this.certificates.unshift(newCert);
    return newCert;
  }

  deleteCertificate(id: string): boolean {
    const initialLen = this.certificates.length;
    this.certificates = this.certificates.filter(c => c.id !== id);
    return this.certificates.length < initialLen;
  }

  // Users & Auth
  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(name: string, email: string, phone?: string, role: 'student' | 'admin' = 'student', password_hash?: string): User {
    const existing = this.getUserByEmail(email);
    if (existing) {
      if (password_hash) existing.password_hash = password_hash;
      if (role) existing.role = role;
      return existing;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role,
      password_hash,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Enrollments
  isUserEnrolled(userId: string, courseId: string): boolean {
    return this.enrollments.some(e => e.userId === userId && e.courseId === courseId);
  }

  getEnrollmentsByUser(userId: string): Enrollment[] {
    return this.enrollments.filter(e => e.userId === userId);
  }

  getAllEnrollments(): Enrollment[] {
    return this.enrollments;
  }

  grantEnrollment(userId: string, courseId: string, orderId?: string): Enrollment {
    const existing = this.enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (existing) return existing;

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      userId,
      courseId,
      orderId,
      grantedAt: new Date().toISOString()
    };
    this.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  revokeEnrollment(userId: string, courseId: string): boolean {
    const initialLen = this.enrollments.length;
    this.enrollments = this.enrollments.filter(e => !(e.userId === userId && e.courseId === courseId));
    return this.enrollments.length < initialLen;
  }

  // Orders
  getOrders(): Order[] {
    return this.orders;
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['status']): Order | null {
    const order = this.orders.find(o => o.id === orderId || o.razorpayOrderId === orderId);
    if (!order) return null;
    order.status = status;
    return order;
  }

  // Progress
  toggleLessonProgress(userId: string, lessonId: string, courseId: string): boolean {
    const idx = this.progress.findIndex(p => p.userId === userId && p.lessonId === lessonId);
    if (idx >= 0) {
      this.progress[idx].completed = !this.progress[idx].completed;
      return this.progress[idx].completed;
    } else {
      this.progress.push({
        id: `prog-${Date.now()}`,
        userId,
        lessonId,
        courseId,
        completed: true,
        updatedAt: new Date().toISOString()
      });
      return true;
    }
  }

  getUserProgress(userId: string, courseId: string): string[] {
    return this.progress
      .filter(p => p.userId === userId && p.courseId === courseId && p.completed)
      .map(p => p.lessonId);
  }

  // Offline Classes & Batches
  getOfflineBatches(): OfflineBatch[] {
    return this.offlineBatches;
  }

  createOfflineBatch(batch: Omit<OfflineBatch, 'id'>): OfflineBatch {
    const newBatch: OfflineBatch = {
      ...batch,
      id: `batch-${Date.now()}`,
    };
    this.offlineBatches.unshift(newBatch);
    return newBatch;
  }

  deleteOfflineBatch(id: string): boolean {
    const initialLen = this.offlineBatches.length;
    this.offlineBatches = this.offlineBatches.filter(b => b.id !== id);
    return this.offlineBatches.length < initialLen;
  }

  updateOfflineBatchSeats(id: string, delta: number): OfflineBatch | null {
    const b = this.offlineBatches.find(batch => batch.id === id);
    if (!b) return null;
    b.bookedSeats = Math.max(0, Math.min(b.totalSeats, b.bookedSeats + delta));
    if (b.bookedSeats >= b.totalSeats) b.status = 'sold_out';
    return b;
  }

  bookOfflineSeat(batchId: string, studentName: string): { success: boolean; batch?: OfflineBatch; error?: string } {
    const b = this.offlineBatches.find(batch => batch.id === batchId);
    if (!b) return { success: false, error: 'Batch not found' };
    if (b.bookedSeats >= b.totalSeats) return { success: false, error: 'Batch is already sold out!' };

    b.bookedSeats += 1;
    if (!b.enrolledStudents) b.enrolledStudents = [];
    b.enrolledStudents.push(studentName);
    if (b.bookedSeats >= b.totalSeats) b.status = 'sold_out';

    return { success: true, batch: b };
  }

  resetOfflineBatches(): void {
    this.offlineBatches = [];
  }

  // Live Trading Sessions
  getLiveSessions(): LiveSession[] {
    return this.liveSessions;
  }

  createLiveSession(session: Omit<LiveSession, 'id' | 'enrolledAttendees'>): LiveSession {
    const newSession: LiveSession = {
      ...session,
      id: `live-${Date.now()}`,
      enrolledAttendees: [],
    };
    this.liveSessions.unshift(newSession);
    return newSession;
  }

  deleteLiveSession(id: string): boolean {
    const initialLen = this.liveSessions.length;
    this.liveSessions = this.liveSessions.filter(s => s.id !== id);
    return this.liveSessions.length < initialLen;
  }

  enrollInLiveSession(sessionId: string, attendeeInfo: string): { success: boolean; session?: LiveSession; error?: string } {
    const s = this.getLiveSessions().find(item => item.id === sessionId);
    if (!s) return { success: false, error: 'Live session not found' };
    if (s.enrolledAttendees.length >= s.totalSeats) {
      return { success: false, error: 'Live session capacity is full!' };
    }
    if (!s.enrolledAttendees.includes(attendeeInfo)) {
      s.enrolledAttendees.push(attendeeInfo);
    }
    return { success: true, session: s };
  }
}




// Global singleton instance so memory is shared across server route hits
declare global {
  // eslint-disable-next-line no-var
  var __LEARN_FX_STORE__: DataStore | undefined;
}

// Ensure the singleton has the latest class methods (prevents stale HMR prototype bugs)
if (!global.__LEARN_FX_STORE__ || typeof (global.__LEARN_FX_STORE__ as any).createLiveSession !== 'function') {
  global.__LEARN_FX_STORE__ = new DataStore();
}

export const db: DataStore = global.__LEARN_FX_STORE__;
