export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoId: string; // YouTube video ID or embed key
  duration: string;
  orderNo: number;
  isFreePreview: boolean;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  priceInr: number;
  originalPriceInr: number;
  thumbnailUrl: string;
  category: 'Forex' | 'Indian Market' | 'Price Action' | 'Crypto' | 'Psychology';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Masterclass';
  isPublished: boolean;
  features: string[];
  lessonsCount?: number;
  totalDuration?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  razorpayOrderId: string;
  amount: number; // in INR
  currency: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  method?: string;
  status: string;
  paidAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  orderId?: string;
  grantedAt: string;
  expiresAt?: string | null;
}

export interface PayoutCertificate {
  id: string;
  title: string;
  firmOrBroker: string;
  amount: string; // e.g. "$14,250" or "₹11,50,000"
  date: string;
  imageUrl: string;
  accountType: 'Prop Firm Funded' | 'Live Broker Payout' | 'Evaluation Pass';
  verifiedRef?: string;
  orderNo: number;
  isVisible: boolean;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  updatedAt: string;
}

export interface OfflineBatch {
  id: string;
  title: string;
  city: string; // e.g. Bengaluru, Mumbai, Delhi, Hyderabad
  venue: string; // Hotel/Auditorium/Trading Floor
  startDate: string; // e.g. "Nov 15, 2026"
  endDate: string; // e.g. "Nov 17, 2026"
  timing: string; // e.g. "9:30 AM - 5:30 PM"
  priceInr: number;
  totalSeats: number;
  bookedSeats: number;
  advanceFeeInr?: number; // Minimum advance booking fee to lock seat
  status: 'upcoming' | 'ongoing' | 'completed' | 'sold_out';
  notes?: string;
  enrolledStudents?: string[]; // Student names or IDs
}

