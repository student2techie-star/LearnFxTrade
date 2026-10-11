import { Course, Lesson, PayoutCertificate, User, Order, Enrollment, LessonProgress } from './types';
import { INITIAL_COURSES, INITIAL_LESSONS, INITIAL_CERTIFICATES, INITIAL_USERS, INITIAL_ENROLLMENTS, INITIAL_ORDERS } from './mock-data';

// Persistent local storage simulator for server routes and client side
class DataStore {
  private courses: Course[] = [...INITIAL_COURSES];
  private lessons: Lesson[] = [...INITIAL_LESSONS];
  private certificates: PayoutCertificate[] = [...INITIAL_CERTIFICATES];
  private users: User[] = [...INITIAL_USERS];
  private enrollments: Enrollment[] = [...INITIAL_ENROLLMENTS];
  private orders: Order[] = [...INITIAL_ORDERS];
  private progress: LessonProgress[] = [];

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

  createUser(name: string, email: string, phone?: string, role: 'student' | 'admin' = 'student'): User {
    const existing = this.getUserByEmail(email);
    if (existing) return existing;

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role,
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
}

// Global singleton instance so memory is shared across server route hits
declare global {
  // eslint-disable-next-line no-var
  var __LEARN_FX_STORE__: DataStore | undefined;
}

export const db: DataStore = global.__LEARN_FX_STORE__ || new DataStore();
if (process.env.NODE_ENV !== 'production') {
  global.__LEARN_FX_STORE__ = db;
}
