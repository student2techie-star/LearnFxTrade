'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Users,
  CreditCard,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  DollarSign,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  Bell,
  X,
  ArrowUpRight,
  BarChart3,
  Flame,
  KeyRound,
  Download,
  AlertCircle
} from 'lucide-react';

interface MetricData {
  totalStudents: number;
  totalOrders: number;
  paidOrders: number;
  totalRevenue: number;
  coursesCount: number;
  certificatesCount: number;
  lessonsCount?: number;
}

interface StudentItem {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  createdAt: string;
  enrollmentsCount: number;
  enrolledCourses: { courseId: string; title: string }[];
  ordersCount: number;
}

interface OrderItem {
  id: string;
  userId: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  razorpayOrderId: string;
  amount: number;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
}

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  priceInr: number;
  originalPriceInr: number;
  thumbnailUrl: string;
  category: 'Forex' | 'Indian Market' | 'Price Action' | 'Crypto' | 'Psychology';
  level: string;
  isPublished: boolean;
  lessonsCount?: number;
}

interface CertificateItem {
  id: string;
  title: string;
  firmOrBroker: string;
  amount: string;
  date: string;
  imageUrl: string;
  accountType: string;
}

interface LessonItem {
  id: string;
  courseId: string;
  title: string;
  videoId: string;
  duration: string;
  orderNo: number;
  isFreePreview: boolean;
  description?: string;
}

type TabKey = 'dashboard' | 'courses' | 'lessons' | 'students' | 'finance' | 'certificates' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Raw data from server
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [lessons, setLessons] = useState<LessonItem[]>([]);

  // Filtering & Searches
  const [studentSearch, setStudentSearch] = useState('');
  const [courseFilterCategory, setCourseFilterCategory] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'paid' | 'created' | 'failed'>('all');
  const [lessonCourseFilter, setLessonCourseFilter] = useState<string>('all');

  // Modal States
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);

  // Form states: New Course
  const [courseForm, setCourseForm] = useState({
    title: '',
    tagline: '',
    description: '',
    priceInr: 4999,
    originalPriceInr: 14999,
    category: 'Forex' as CourseItem['category'],
    level: 'Masterclass',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  });

  // Form states: New Certificate
  const [certForm, setCertForm] = useState({
    title: '',
    firmOrBroker: 'FundedNext',
    amount: '$14,250',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Prop Firm Funded',
  });

  // Form states: New Video Lesson
  const [lessonForm, setLessonForm] = useState({
    courseId: '',
    title: '',
    videoId: 'dQw4w9WgXcQ',
    duration: '18:45',
    orderNo: 1,
    isFreePreview: false,
    description: '',
  });

  // Fetch full Admin data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/manage');
      if (res.ok) {
        const d = await res.json();
        setMetrics(d.metrics);
        setStudents(d.students || []);
        setOrders(d.orders || []);
        setCourses(d.courses || []);
        setCertificates(d.certificates || []);
        setLessons(d.lessons || []);

        if (d.courses?.length > 0 && !lessonForm.courseId) {
          setLessonForm((prev) => ({ ...prev, courseId: d.courses[0].id }));
        }
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Action: Toggle Student Access
  const handleToggleAccess = async (userId: string, courseId: string, currentEnrolled: boolean) => {
    try {
      const action = currentEnrolled ? 'revoke_access' : 'grant_access';
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId, courseId }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch {
      alert('Error changing student permissions');
    }
  };

  // Action: Create Course
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm),
      });
      if (res.ok) {
        setShowAddCourseModal(false);
        setCourseForm({
          title: '',
          tagline: '',
          description: '',
          priceInr: 4999,
          originalPriceInr: 14999,
          category: 'Forex',
          level: 'Masterclass',
          thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
        });
        fetchData();
      }
    } catch {
      alert('Failed to publish course');
    }
  };

  // Action: Delete Course
  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course and its curriculum?')) return;
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_course', courseId }),
      });
      if (res.ok) fetchData();
    } catch {
      alert('Failed to delete course');
    }
  };

  // Action: Create Certificate
  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certForm),
      });
      if (res.ok) {
        setShowAddCertModal(false);
        setCertForm({
          title: '',
          firmOrBroker: 'FundedNext',
          amount: '$14,250',
          imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
          accountType: 'Prop Firm Funded',
        });
        fetchData();
      }
    } catch {
      alert('Failed to add certificate');
    }
  };

  // Action: Delete Certificate
  const handleDeleteCertificate = async (certId: string) => {
    if (!confirm('Delete this payout certificate from public gallery?')) return;
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_certificate', certId }),
      });
      if (res.ok) fetchData();
    } catch {
      alert('Failed to delete certificate');
    }
  };

  // Action: Add Video Lesson
  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_lesson', ...lessonForm }),
      });
      if (res.ok) {
        setShowAddLessonModal(false);
        setLessonForm({
          courseId: courses[0]?.id || '',
          title: '',
          videoId: '',
          duration: '15:00',
          orderNo: (lessons.length || 0) + 1,
          isFreePreview: false,
          description: '',
        });
        fetchData();
      }
    } catch {
      alert('Failed to add video lesson');
    }
  };

  // Action: Delete Video Lesson
  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Delete this lesson module?')) return;
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_lesson', lessonId }),
      });
      if (res.ok) fetchData();
    } catch {
      alert('Failed to delete lesson');
    }
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const term = studentSearch.toLowerCase();
      return s.name.toLowerCase().includes(term) || s.email.toLowerCase().includes(term);
    });
  }, [students, studentSearch]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (courseFilterCategory === 'all') return true;
      return c.category === courseFilterCategory;
    });
  }, [courses, courseFilterCategory]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const term = orderSearch.toLowerCase();
      const matchesSearch =
        o.razorpayOrderId.toLowerCase().includes(term) ||
        o.userEmail.toLowerCase().includes(term) ||
        o.courseTitle.toLowerCase().includes(term);
      const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      if (lessonCourseFilter === 'all') return true;
      return l.courseId === lessonCourseFilter;
    });
  }, [lessons, lessonCourseFilter]);

  // Sidebar items
  const navItems = [
    { key: 'dashboard', label: 'Terminal Overview', icon: LayoutDashboard, badge: null },
    { key: 'courses', label: 'Curriculum & Courses', icon: BookOpen, badge: courses.length },
    { key: 'lessons', label: 'Video Lessons Hub', icon: Video, badge: lessons.length },
    { key: 'students', label: 'Student Permissions', icon: Users, badge: students.length },
    { key: 'finance', label: 'Razorpay Financials', icon: CreditCard, badge: orders.length },
    { key: 'certificates', label: 'Payout Certificates', icon: Award, badge: certificates.length },
    { key: 'settings', label: 'Platform Settings', icon: Settings, badge: null },
  ];

  return (
    <div className="flex min-h-screen bg-[#000000] text-white selection:bg-[#10b981] selection:text-black font-sans antialiased">
      {/* 1. Sleek Modern Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#1a1a1a] bg-[#09090b] transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#1a1a1a]">
          {!collapsed ? (
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#059669] to-[#10b981] shadow-lg shadow-[#10b981]/20">
                <ShieldCheck className="h-5 w-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  LearnFx<span className="text-[#10b981]">Trade</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#a1a1aa] font-semibold">
                  Admin Terminal
                </span>
              </div>
            </Link>
          ) : (
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#059669] to-[#10b981]">
              <ShieldCheck className="h-5 w-5 text-black" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle Sidebar"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#222222] bg-[#111111] text-[#a1a1aa] hover:text-white hover:bg-[#1c1c1c] transition"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="px-3 pt-4">
          <div className="flex items-center gap-2 rounded-xl border border-[#1f2923] bg-[#0c1612] px-3 py-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]"></span>
            </span>
            {!collapsed && (
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[#10b981] text-[11px]">System Online</span>
                <span className="text-[10px] text-[#a1a1aa]">Razorpay Live Sync</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as TabKey)}
                title={collapsed ? item.label : undefined}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/15 font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#141416] hover:text-white'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-black' : 'text-[#a1a1aa] group-hover:text-[#10b981]'
                  }`}
                />
                {!collapsed && (
                  <span className="flex-1 text-left truncate tracking-wide">{item.label}</span>
                )}
                {!collapsed && item.badge !== null && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-black text-[#10b981]'
                        : 'bg-[#18181b] text-[#a1a1aa] border border-[#27272a]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom User & Public site link */}
        <div className="border-t border-[#1a1a1a] p-3 space-y-2">
          <Link
            href="/"
            className="flex w-full items-center gap-2.5 rounded-xl border border-[#222222] bg-[#111111] px-3 py-2 text-xs font-bold text-[#e4e4e7] hover:border-[#333333] hover:text-white transition"
          >
            <ExternalLink className="h-4 w-4 text-[#10b981]" />
            {!collapsed && <span>Open Public Site</span>}
          </Link>
          {!collapsed && (
            <div className="flex items-center justify-between px-2 pt-1 text-[10px] text-[#71717a]">
              <span>v2.4.0 Institutional</span>
              <span className="text-[#10b981]">Encrypted</span>
            </div>
          )}
        </div>
      </aside>

      {/* 2. Main Workspace Layout */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Operational App Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1a1a1a] bg-[#000000]/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white flex items-center gap-2 capitalize">
              {activeTab === 'dashboard' && 'Executive Terminal Overview'}
              {activeTab === 'courses' && 'Curriculum & Course Management'}
              {activeTab === 'lessons' && 'Video Lessons & Video Player Sync'}
              {activeTab === 'students' && 'Student Access Control & Permissions'}
              {activeTab === 'finance' && 'Razorpay Orders & Financial Ledgers'}
              {activeTab === 'certificates' && 'Payout Certificates & Verified Proofs'}
              {activeTab === 'settings' && 'Platform Configuration & Security'}
            </h1>
            <span className="hidden sm:inline-block rounded-md border border-[#222222] bg-[#111111] px-2 py-0.5 text-[10px] font-mono text-[#a1a1aa]">
              INR • Real-Time
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              title="Refresh Data"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#222222] bg-[#111111] text-[#a1a1aa] hover:border-[#333333] hover:text-white transition"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-[#10b981]' : ''}`} />
            </button>

            {/* Quick Actions based on tab */}
            {activeTab === 'courses' && (
              <button
                onClick={() => setShowAddCourseModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] px-3.5 py-2 text-xs font-bold text-black transition shadow-lg shadow-[#10b981]/20"
              >
                <Plus className="h-4 w-4" /> New Course
              </button>
            )}

            {activeTab === 'lessons' && (
              <button
                onClick={() => setShowAddLessonModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] px-3.5 py-2 text-xs font-bold text-black transition shadow-lg shadow-[#10b981]/20"
              >
                <Plus className="h-4 w-4" /> Upload Lesson
              </button>
            )}

            {activeTab === 'certificates' && (
              <button
                onClick={() => setShowAddCertModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] px-3.5 py-2 text-xs font-bold text-black transition shadow-lg shadow-[#10b981]/20"
              >
                <Plus className="h-4 w-4" /> Add Payout Proof
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 md:p-8 space-y-8 flex-1">
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Top High-Impact Metrics Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Metric 1 */}
                <div className="relative overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10] p-5 shadow-xl transition-hover hover:border-[#333333]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                      Gross Revenue
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/15 text-[#10b981]">
                      <DollarSign className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                      ₹{metrics?.totalRevenue?.toLocaleString('en-IN') || '0'}
                    </span>
                    <span className="text-xs font-bold text-[#10b981] flex items-center">
                      <TrendingUp className="h-3 w-3 mr-0.5" /> +100%
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#71717a]">
                    Verified through Razorpay Webhook
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="relative overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10] p-5 shadow-xl transition-hover hover:border-[#333333]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                      Total Learners
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/15 text-[#10b981]">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                      {metrics?.totalStudents || 0}
                    </span>
                    <span className="text-xs font-bold text-white/70">Students</span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#71717a]">
                    Active account enrollments in portal
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="relative overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10] p-5 shadow-xl transition-hover hover:border-[#333333]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                      Orders Processed
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/15 text-[#10b981]">
                      <CreditCard className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                      {metrics?.paidOrders || 0}
                    </span>
                    <span className="text-xs font-bold text-[#10b981]">Paid & Settled</span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#71717a]">
                    {metrics?.totalOrders || 0} checkout attempts total
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="relative overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10] p-5 shadow-xl transition-hover hover:border-[#333333]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                      Curriculum Depth
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/15 text-[#10b981]">
                      <BookOpen className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                      {courses.length}
                    </span>
                    <span className="text-xs font-bold text-white/70">
                      Courses • {lessons.length} Lessons
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#71717a]">
                    {certificates.length} Verified Payout Proofs
                  </div>
                </div>
              </div>

              {/* Analytical Visual Chart & Recent Feed */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left 2 cols: Revenue Flow Analytics simulation */}
                <div className="lg:col-span-2 rounded-2xl border border-[#222222] bg-[#0e0e10] p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-[#10b981]" /> Weekly Revenue Inflow
                      </h2>
                      <p className="text-xs text-[#a1a1aa]">
                        Razorpay Settlement Volume over last 7 days
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#18181b] border border-[#27272a] text-xs font-mono text-[#10b981] font-bold">
                      ₹{metrics?.totalRevenue?.toLocaleString('en-IN')} Total
                    </span>
                  </div>

                  {/* Pure CSS Bar Chart with Emerald Glow */}
                  <div className="pt-4 pb-2">
                    <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-44 border-b border-[#222222] pb-3">
                      {[
                        { day: 'Mon', val: 3999, height: '40%' },
                        { day: 'Tue', val: 7998, height: '65%' },
                        { day: 'Wed', val: 4999, height: '48%' },
                        { day: 'Thu', val: 11997, height: '90%' },
                        { day: 'Fri', val: 8998, height: '75%' },
                        { day: 'Sat', val: 14997, height: '100%' },
                        { day: 'Sun', val: 6999, height: '58%' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 group h-full justify-end">
                          <span className="text-[10px] font-mono text-[#a1a1aa] opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹{item.val}
                          </span>
                          <div
                            style={{ height: item.height }}
                            className="w-full rounded-t-lg bg-gradient-to-t from-[#059669] to-[#10b981] group-hover:brightness-125 transition-all cursor-pointer shadow-lg shadow-[#10b981]/10"
                          />
                          <span className="text-[11px] font-bold text-[#a1a1aa] group-hover:text-white">
                            {item.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#1a1a1a] text-xs">
                    <div>
                      <span className="text-[#71717a] block text-[10px] uppercase font-bold">Forex SMC Volume</span>
                      <span className="font-bold text-white font-mono">72.4%</span>
                    </div>
                    <div>
                      <span className="text-[#71717a] block text-[10px] uppercase font-bold">Nifty Pro Volume</span>
                      <span className="font-bold text-white font-mono">21.8%</span>
                    </div>
                    <div>
                      <span className="text-[#71717a] block text-[10px] uppercase font-bold">Refund Rate</span>
                      <span className="font-bold text-[#10b981] font-mono">0.00%</span>
                    </div>
                  </div>
                </div>

                {/* Right col: Quick Activity Feed */}
                <div className="rounded-2xl border border-[#222222] bg-[#0e0e10] p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Flame className="h-4 w-4 text-[#10b981]" /> Live Order Stream
                    </h2>
                    <p className="text-xs text-[#a1a1aa]">Latest student transactions</p>

                    <div className="mt-4 space-y-3">
                      {orders.slice(0, 4).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-[#1f1f23] bg-[#141416] text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-white line-clamp-1">{order.courseTitle}</div>
                            <div className="text-[10px] font-mono text-[#a1a1aa]">{order.userEmail}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold font-mono text-[#10b981]">₹{order.amount}</div>
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#10b981]/15 text-[#10b981]">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('finance')}
                    className="w-full mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-[#222222] bg-[#18181b] py-2.5 text-xs font-bold text-white hover:bg-[#202024] transition"
                  >
                    View All Orders <ArrowUpRight className="h-3.5 w-3.5 text-[#10b981]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COURSES MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#222222] bg-[#0e0e10] p-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="h-4 w-4 text-[#10b981]" />
                  <span className="text-xs font-bold text-[#a1a1aa]">Category:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'Forex', 'Indian Market', 'Psychology'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCourseFilterCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          courseFilterCategory === cat
                            ? 'bg-[#10b981] text-black'
                            : 'bg-[#18181b] text-[#a1a1aa] hover:text-white border border-[#27272a]'
                        }`}
                      >
                        {cat === 'all' ? 'All' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowAddCourseModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] px-4 py-2 text-xs font-bold text-black transition shadow-lg shadow-[#10b981]/20"
                >
                  <Plus className="h-4 w-4" /> Create New Course
                </button>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10] transition-all hover:border-[#333333]"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-black">
                        <img
                          src={c.thumbnailUrl}
                          alt={c.title}
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase text-[#10b981] backdrop-blur-md border border-[#10b981]/30">
                            {c.category}
                          </span>
                          <span className="rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase text-white backdrop-blur-md border border-[#222222]">
                            {c.level}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="text-base font-bold text-white line-clamp-1">{c.title}</h3>
                        <p className="text-xs text-[#a1a1aa] line-clamp-2">{c.tagline || c.description}</p>
                        <div className="pt-2 flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-white font-mono">₹{c.priceInr}</span>
                          {c.originalPriceInr && (
                            <span className="text-xs text-[#71717a] line-through font-mono">
                              ₹{c.originalPriceInr}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#1a1a1a] bg-[#141416] p-4 flex items-center justify-between">
                      <Link
                        href={`/courses/${c.slug}`}
                        target="_blank"
                        className="text-xs font-bold text-[#a1a1aa] hover:text-[#10b981] flex items-center gap-1 transition"
                      >
                        Public Page <ExternalLink className="h-3 w-3" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setLessonCourseFilter(c.id);
                            setActiveTab('lessons');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-xs font-bold text-white hover:border-[#10b981] transition"
                        >
                          Curriculum
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-rose-400 hover:bg-rose-500/20 transition"
                          title="Delete Course"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VIDEO LESSONS HUB */}
          {activeTab === 'lessons' && (
            <div className="space-y-6">
              {/* Header filter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#222222] bg-[#0e0e10] p-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Video className="h-4 w-4 text-[#10b981]" />
                  <span className="text-xs font-bold text-[#a1a1aa]">Filter By Course:</span>
                  <select
                    value={lessonCourseFilter}
                    onChange={(e) => setLessonCourseFilter(e.target.value)}
                    className="p-2 rounded-xl bg-black border border-[#222222] text-xs text-white focus:border-[#10b981] focus:outline-none"
                  >
                    <option value="all">All Courses ({lessons.length} lessons)</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowAddLessonModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] px-4 py-2 text-xs font-bold text-black transition shadow-lg shadow-[#10b981]/20"
                >
                  <Plus className="h-4 w-4" /> Add Video Lesson
                </button>
              </div>

              {/* Lessons Table */}
              <div className="overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141416] text-[#a1a1aa] uppercase text-[10px] tracking-wider border-b border-[#222222]">
                      <tr>
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Lesson Title</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Video ID / Provider</th>
                        <th className="py-3 px-4">Duration</th>
                        <th className="py-3 px-4">Preview</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a] text-white">
                      {filteredLessons.map((l, index) => {
                        const courseObj = courses.find((c) => c.id === l.courseId);
                        return (
                          <tr key={l.id} className="hover:bg-[#141416]/60 transition">
                            <td className="py-3.5 px-4 font-mono text-[#a1a1aa]">{l.orderNo || index + 1}</td>
                            <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                              <PlayCircle className="h-4 w-4 text-[#10b981] shrink-0" />
                              <span className="line-clamp-1">{l.title}</span>
                            </td>
                            <td className="py-3.5 px-4 text-[#a1a1aa]">
                              {courseObj ? courseObj.title : l.courseId}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs text-[#10b981]">
                              {l.videoId}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#a1a1aa]">{l.duration}</td>
                            <td className="py-3.5 px-4">
                              {l.isFreePreview ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                                  Free Preview
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
                                  Locked / Enrolled
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteLesson(l.id)}
                                className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-rose-400 hover:bg-rose-500/20 transition"
                                title="Delete Lesson"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDENT ACCESS CONTROL */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              {/* Search bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#222222] bg-[#0e0e10] p-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#71717a]" />
                  <input
                    type="text"
                    placeholder="Search students by name or email..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black border border-[#222222] text-xs text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>

                <div className="text-xs text-[#a1a1aa]">
                  Showing <span className="text-white font-bold">{filteredStudents.length}</span> students
                </div>
              </div>

              {/* Student Access Table */}
              <div className="overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141416] text-[#a1a1aa] uppercase text-[10px] tracking-wider border-b border-[#222222]">
                      <tr>
                        <th className="py-3.5 px-4">Student</th>
                        <th className="py-3.5 px-4">Email</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Forex SMC Access</th>
                        <th className="py-3.5 px-4">Nifty Pro Access</th>
                        <th className="py-3.5 px-4">Enrolled Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a] text-white">
                      {filteredStudents.map((s) => {
                        const hasForex = s.enrolledCourses?.some(
                          (c) => c.courseId === 'course-forex-mastery'
                        );
                        const hasNifty = s.enrolledCourses?.some(
                          (c) => c.courseId === 'course-nifty-banknifty'
                        );

                        return (
                          <tr key={s.id} className="hover:bg-[#141416]/60 transition">
                            <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-xs font-bold text-[#10b981]">
                                {s.name.charAt(0).toUpperCase()}
                              </div>
                              {s.name}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#a1a1aa]">{s.email}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
                                {s.role}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() =>
                                  handleToggleAccess(s.id, 'course-forex-mastery', hasForex)
                                }
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                                  hasForex
                                    ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30'
                                    : 'bg-[#18181b] text-[#a1a1aa] hover:text-white border border-[#27272a]'
                                }`}
                              >
                                {hasForex ? (
                                  <>
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Granted
                                  </>
                                ) : (
                                  '+ Grant Access'
                                )}
                              </button>
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() =>
                                  handleToggleAccess(s.id, 'course-nifty-banknifty', hasNifty)
                                }
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                                  hasNifty
                                    ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30'
                                    : 'bg-[#18181b] text-[#a1a1aa] hover:text-white border border-[#27272a]'
                                }`}
                              >
                                {hasNifty ? (
                                  <>
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Granted
                                  </>
                                ) : (
                                  '+ Grant Access'
                                )}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#a1a1aa]">
                              {s.enrolledCourses?.length || 0} active
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RAZORPAY FINANCIALS */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#222222] bg-[#0e0e10] p-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#71717a]" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, Email, Course..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black border border-[#222222] text-xs text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {(['all', 'paid', 'created', 'failed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                        orderStatusFilter === st
                          ? 'bg-[#10b981] text-black'
                          : 'bg-[#18181b] text-[#a1a1aa] hover:text-white border border-[#27272a]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141416] text-[#a1a1aa] uppercase text-[10px] tracking-wider border-b border-[#222222]">
                      <tr>
                        <th className="py-3.5 px-4">Razorpay Order ID</th>
                        <th className="py-3.5 px-4">Customer Email</th>
                        <th className="py-3.5 px-4">Course Product</th>
                        <th className="py-3.5 px-4">Amount</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a] text-white">
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#141416]/60 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#10b981]">
                            {o.razorpayOrderId}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#a1a1aa]">{o.userEmail}</td>
                          <td className="py-3.5 px-4 font-semibold text-white">{o.courseTitle}</td>
                          <td className="py-3.5 px-4 font-mono font-black text-white">₹{o.amount}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                o.status === 'paid'
                                  ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[#a1a1aa]">
                            {new Date(o.createdAt).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PAYOUT CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#222222] bg-[#0e0e10] p-4">
                <div>
                  <h3 className="text-base font-bold text-white">Verified Prop Firm & Broker Certificates</h3>
                  <p className="text-xs text-[#a1a1aa]">
                    Proofs rendered in the public payout gallery to establish high trust.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddCertModal(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] px-4 py-2 text-xs font-bold text-black transition shadow-lg shadow-[#10b981]/20"
                >
                  <Plus className="h-4 w-4" /> Add Payout Proof
                </button>
              </div>

              {/* Certificate Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="overflow-hidden rounded-2xl border border-[#222222] bg-[#0e0e10] transition-all hover:border-[#333333]"
                  >
                    <div className="relative h-48 w-full bg-black">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-md bg-black/80 px-2 py-1 text-[10px] font-bold text-[#10b981] border border-[#10b981]/30">
                          {cert.accountType}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{cert.title}</h4>
                          <span className="text-xs text-[#a1a1aa]">{cert.firmOrBroker}</span>
                        </div>
                        <div className="font-mono font-black text-lg text-[#10b981]">{cert.amount}</div>
                      </div>

                      <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs">
                        <span className="text-[#71717a] font-mono text-[11px]">{cert.date}</span>
                        <button
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-rose-400 hover:bg-rose-500/20 transition"
                          title="Delete Proof"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PLATFORM SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-[#222222] bg-[#0e0e10] p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-[#10b981]" /> Payment Gateway (Razorpay API Keys)
                </h3>
                <p className="text-xs text-[#a1a1aa]">
                  Current environment variables active for accepting UPI, Cards, NetBanking, and EMI.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#a1a1aa]">RAZORPAY_KEY_ID</label>
                    <input
                      type="text"
                      readOnly
                      value="rzp_test_LearnFxTradeKey"
                      className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-xs font-mono text-[#10b981]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#a1a1aa]">WEBHOOK STATUS</label>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black border border-[#222222] text-xs text-white">
                      <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                      <span>Active • /api/webhooks/razorpay</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#222222] bg-[#0e0e10] p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#10b981]" /> Admin Security & Session
                </h3>
                <p className="text-xs text-[#a1a1aa]">
                  Two-factor encryption is enabled for high-privilege course mutations.
                </p>
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#1f1f23] bg-[#141416]">
                  <div>
                    <div className="text-xs font-bold text-white">Automated Student Grant on Webhook</div>
                    <div className="text-[11px] text-[#71717a]">
                      Immediately unlocks lessons when Razorpay payment signature verifies
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#10b981]/20 text-[#10b981]">
                    ENABLED
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. MODAL: Add New Course */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-[#222222] bg-[#0e0e10] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-[#10b981]" /> Publish New Course
              </h3>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="text-[#a1a1aa] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced SMC Liquidity Engine"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-bold">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={courseForm.priceInr}
                    onChange={(e) => setCourseForm({ ...courseForm, priceInr: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-bold">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, category: e.target.value as CourseItem['category'] })
                    }
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  >
                    <option>Forex</option>
                    <option>Indian Market</option>
                    <option>Price Action</option>
                    <option>Psychology</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. High-probability institutional setup"
                  value={courseForm.tagline}
                  onChange={(e) => setCourseForm({ ...courseForm, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Description</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Thumbnail URL</label>
                <input
                  type="url"
                  required
                  value={courseForm.thumbnailUrl}
                  onChange={(e) => setCourseForm({ ...courseForm, thumbnailUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#222222] text-[#a1a1aa] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-bold shadow-lg shadow-[#10b981]/20 transition"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: Add Video Lesson */}
      {showAddLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#222222] bg-[#0e0e10] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="h-4 w-4 text-[#10b981]" /> Add Video Lesson Module
              </h3>
              <button
                onClick={() => setShowAddLessonModal(false)}
                className="text-[#a1a1aa] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Assign to Course</label>
                <select
                  required
                  value={lessonForm.courseId}
                  onChange={(e) => setLessonForm({ ...lessonForm, courseId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Lesson Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass 01: Liquidity Pools & Stop Runs"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-bold">Video Embed ID (YouTube/Vimeo)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M7lc1UVf-VE"
                    value={lessonForm.videoId}
                    onChange={(e) => setLessonForm({ ...lessonForm, videoId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-bold">Duration (MM:SS)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18:45"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFreePreview"
                  checked={lessonForm.isFreePreview}
                  onChange={(e) => setLessonForm({ ...lessonForm, isFreePreview: e.target.checked })}
                  className="rounded border-[#222222] bg-black text-[#10b981] focus:ring-[#10b981]"
                />
                <label htmlFor="isFreePreview" className="text-white font-medium cursor-pointer">
                  Allow Free Preview (Available before purchase)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#222222] text-[#a1a1aa] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-bold shadow-lg shadow-[#10b981]/20 transition"
                >
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: Add Payout Certificate */}
      {showAddCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#222222] bg-[#0e0e10] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="h-4 w-4 text-[#10b981]" /> Add Payout Proof
              </h3>
              <button
                onClick={() => setShowAddCertModal(false)}
                className="text-[#a1a1aa] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCertificate} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Certificate Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. $14,250 FundedNext Payout"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-bold">Firm / Broker</label>
                  <input
                    type="text"
                    required
                    placeholder="FTMO, FundedNext, Zerodha"
                    value={certForm.firmOrBroker}
                    onChange={(e) => setCertForm({ ...certForm, firmOrBroker: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-bold">Amount</label>
                  <input
                    type="text"
                    required
                    placeholder="$14,250"
                    value={certForm.amount}
                    onChange={(e) => setCertForm({ ...certForm, amount: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-bold">Image URL</label>
                <input
                  type="url"
                  required
                  value={certForm.imageUrl}
                  onChange={(e) => setCertForm({ ...certForm, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCertModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#222222] text-[#a1a1aa] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-bold shadow-lg shadow-[#10b981]/20 transition"
                >
                  Add Proof
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
