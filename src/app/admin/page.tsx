'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  Award,
  Users,
  DollarSign,
  CheckCircle,
  Image as ImageIcon,
  ShieldCheck,
  RefreshCw,
  LayoutDashboard,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  priceInr: number;
  category: string;
  thumbnailUrl: string;
  slug: string;
  tagline?: string;
  description?: string;
}

interface Certificate {
  id: string;
  title: string;
  firmOrBroker: string;
  amount: string;
  imageUrl: string;
  date: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  role: string;
  enrolledCourses?: { courseId: string; title: string }[];
}

interface Order {
  id: string;
  razorpayOrderId: string;
  userEmail: string;
  courseTitle: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'certificates' | 'students' | 'orders'>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState({ revenue: 0, studentsCount: 0, coursesCount: 0, certsCount: 0, ordersCount: 0 });
  const [loading, setLoading] = useState(true);

  // File upload input refs
  const courseFileRef = useRef<HTMLInputElement>(null);
  const certFileRef = useRef<HTMLInputElement>(null);
  const [uploadingCourseThumb, setUploadingCourseThumb] = useState(false);
  const [uploadingCertImage, setUploadingCertImage] = useState(false);

  // New Course Form State
  const [courseForm, setCourseForm] = useState({
    title: '',
    priceInr: 3999,
    category: 'Forex',
    tagline: '',
    description: '',
    thumbnailUrl: '',
  });

  // New Certificate Form State
  const [certForm, setCertForm] = useState({
    title: '',
    firmOrBroker: '',
    amount: '',
    imageUrl: '',
  });

  // Fetch admin data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/manage');
      if (res.ok) {
        const d = await res.json();
        setCourses(d.courses || []);
        setCertificates(d.certificates || []);
        setStudents(d.students || []);
        setOrders(d.orders || []);
        setMetrics({
          revenue: d.metrics?.totalRevenue || 0,
          studentsCount: d.students?.length || 0,
          coursesCount: d.courses?.length || 0,
          certsCount: d.certificates?.length || 0,
          ordersCount: d.orders?.length || 0,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Upload handler for files from computer
  const handleFileUpload = async (file: File, type: 'course' | 'cert') => {
    const formData = new FormData();
    formData.append('file', file);

    if (type === 'course') setUploadingCourseThumb(true);
    if (type === 'cert') setUploadingCertImage(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (type === 'course') {
          setCourseForm((prev) => ({ ...prev, thumbnailUrl: data.url }));
        } else {
          setCertForm((prev) => ({ ...prev, imageUrl: data.url }));
        }
      } else {
        alert('Upload failed: ' + (data.error || 'Server error'));
      }
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      if (type === 'course') setUploadingCourseThumb(false);
      if (type === 'cert') setUploadingCertImage(false);
    }
  };

  // Create Course
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title) return alert('Enter course title');
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm),
      });
      if (res.ok) {
        alert('Course added successfully!');
        setCourseForm({
          title: '',
          priceInr: 3999,
          category: 'Forex',
          tagline: '',
          description: '',
          thumbnailUrl: '',
        });
        fetchData();
      }
    } catch {
      alert('Failed to add course');
    }
  };

  // Delete Course
  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_course', courseId }),
      });
      if (res.ok) fetchData();
    } catch {
      alert('Failed to delete');
    }
  };

  // Create Certificate
  const handleCreateCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title || !certForm.amount) return alert('Fill required fields');
    if (!certForm.imageUrl) return alert('Please upload a certificate image from your computer');
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certForm),
      });
      if (res.ok) {
        alert('Certificate uploaded successfully!');
        setCertForm({
          title: '',
          firmOrBroker: '',
          amount: '',
          imageUrl: '',
        });
        fetchData();
      }
    } catch {
      alert('Failed to add certificate');
    }
  };

  // Delete Certificate
  const handleDeleteCert = async (certId: string) => {
    if (!confirm('Delete this certificate?')) return;
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_certificate', certId }),
      });
      if (res.ok) fetchData();
    } catch {
      alert('Failed to delete');
    }
  };

  // Toggle student course access
  const handleToggleAccess = async (userId: string, courseId: string, hasAccess: boolean) => {
    try {
      const action = hasAccess ? 'revoke_access' : 'grant_access';
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId, courseId }),
      });
      if (res.ok) fetchData();
    } catch {
      alert('Failed to update student access');
    }
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: null },
    { key: 'courses', label: 'Courses', icon: BookOpen, count: courses.length },
    { key: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
    { key: 'students', label: 'Students Access', icon: Users, count: students.length },
    { key: 'orders', label: 'Orders & Payments', icon: CreditCard, count: orders.length },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-sans antialiased">
      {/* 1. SIMPLE CLEAN SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#222222] bg-[#0c0c0e] transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#222222]">
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10b981] text-black">
                <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white">
                  LearnFx<span className="text-[#10b981]">Trade</span>
                </span>
                <span className="text-[10px] text-[#a1a1aa] font-semibold">Admin Panel</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#10b981] text-black">
              <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#222222] bg-[#141416] text-[#a1a1aa] hover:text-white transition cursor-pointer"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as typeof activeTab)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#10b981] text-black shadow-md'
                    : 'text-[#a1a1aa] hover:bg-[#18181a] hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-black' : 'text-[#a1a1aa]'}`} />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!collapsed && item.count !== null && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-black text-[#10b981]' : 'bg-[#1e1e22] text-[#a1a1aa]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Link to Website */}
        <div className="border-t border-[#222222] p-3">
          <Link
            href="/"
            className="flex w-full items-center gap-2 rounded-xl border border-[#222222] bg-[#141416] px-3 py-2 text-xs font-bold text-white hover:bg-[#202024] transition"
          >
            <ExternalLink className="h-4 w-4 text-[#10b981]" />
            {!collapsed && <span>Go to Website</span>}
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#222222] bg-black/95 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-white capitalize">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'courses' && 'Manage Courses'}
              {activeTab === 'certificates' && 'Manage Payout Certificates'}
              {activeTab === 'students' && 'Manage Student Access'}
              {activeTab === 'orders' && 'Orders & Payments'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#222222] bg-[#141416] text-xs font-bold text-[#a1a1aa] hover:text-white transition cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-[#10b981]' : ''}`} /> Refresh
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-6 space-y-6 max-w-6xl">
          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl border border-[#222222] bg-[#111111] space-y-1">
                  <div className="text-xs text-[#a1a1aa] font-semibold flex items-center justify-between">
                    <span>Revenue</span>
                    <DollarSign className="h-4 w-4 text-[#10b981]" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    ₹{metrics.revenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[#10b981]">Razorpay Live Sync</div>
                </div>

                <div className="p-5 rounded-2xl border border-[#222222] bg-[#111111] space-y-1">
                  <div className="text-xs text-[#a1a1aa] font-semibold flex items-center justify-between">
                    <span>Courses</span>
                    <BookOpen className="h-4 w-4 text-[#10b981]" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{metrics.coursesCount}</div>
                  <div className="text-[11px] text-[#a1a1aa]">Published syllabuses</div>
                </div>

                <div className="p-5 rounded-2xl border border-[#222222] bg-[#111111] space-y-1">
                  <div className="text-xs text-[#a1a1aa] font-semibold flex items-center justify-between">
                    <span>Certificates</span>
                    <Award className="h-4 w-4 text-[#10b981]" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{metrics.certsCount}</div>
                  <div className="text-[11px] text-[#a1a1aa]">Verified proofs</div>
                </div>

                <div className="p-5 rounded-2xl border border-[#222222] bg-[#111111] space-y-1">
                  <div className="text-xs text-[#a1a1aa] font-semibold flex items-center justify-between">
                    <span>Students</span>
                    <Users className="h-4 w-4 text-[#10b981]" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{metrics.studentsCount}</div>
                  <div className="text-[11px] text-[#a1a1aa]">Active accounts</div>
                </div>
              </div>

              {/* Quick Jump Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('courses')}
                  className="p-5 rounded-2xl border border-[#222222] bg-[#111111] hover:border-[#10b981] transition text-left space-y-2 cursor-pointer"
                >
                  <BookOpen className="h-5 w-5 text-[#10b981]" />
                  <div className="text-sm font-bold text-white">Add or Edit Courses</div>
                  <div className="text-xs text-[#a1a1aa]">Upload course thumbnails from computer and manage price</div>
                </button>

                <button
                  onClick={() => setActiveTab('certificates')}
                  className="p-5 rounded-2xl border border-[#222222] bg-[#111111] hover:border-[#10b981] transition text-left space-y-2 cursor-pointer"
                >
                  <Award className="h-5 w-5 text-[#10b981]" />
                  <div className="text-sm font-bold text-white">Upload Payout Certificates</div>
                  <div className="text-xs text-[#a1a1aa]">Select payout proofs from your computer to show publicly</div>
                </button>

                <button
                  onClick={() => setActiveTab('students')}
                  className="p-5 rounded-2xl border border-[#222222] bg-[#111111] hover:border-[#10b981] transition text-left space-y-2 cursor-pointer"
                >
                  <Users className="h-5 w-5 text-[#10b981]" />
                  <div className="text-sm font-bold text-white">Student Permissions</div>
                  <div className="text-xs text-[#a1a1aa]">Grant or revoke student access with 1 click</div>
                </button>
              </div>
            </div>
          )}

          {/* TAB: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Add Course with Upload from Computer */}
              <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="h-4 w-4 text-[#10b981]" /> Add New Course
                </h2>

                <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-white font-semibold">Course Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Master Institutional SMC"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-white font-semibold">Price (INR) *</label>
                        <input
                          type="number"
                          required
                          value={courseForm.priceInr}
                          onChange={(e) => setCourseForm({ ...courseForm, priceInr: Number(e.target.value) })}
                          className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-white font-semibold">Category</label>
                        <select
                          value={courseForm.category}
                          onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                        >
                          <option>Forex</option>
                          <option>Indian Market</option>
                          <option>Price Action</option>
                          <option>Psychology</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-white font-semibold">Short Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Pass prop firm challenges and master bank order flow"
                      value={courseForm.tagline}
                      onChange={(e) => setCourseForm({ ...courseForm, tagline: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                    />
                  </div>

                  {/* Upload Thumbnail From Computer */}
                  <div className="space-y-2">
                    <label className="text-white font-semibold flex items-center justify-between">
                      <span>Course Thumbnail</span>
                      <span className="text-[11px] text-[#a1a1aa]">Upload image from your computer</span>
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-black border border-dashed border-[#333333]">
                      <input
                        ref={courseFileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'course');
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => courseFileRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] text-xs font-bold text-white flex items-center gap-2 transition cursor-pointer"
                      >
                        <Upload className="h-4 w-4 text-[#10b981]" />
                        {uploadingCourseThumb ? 'Uploading...' : 'Choose Image From Computer'}
                      </button>

                      {courseForm.thumbnailUrl ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={courseForm.thumbnailUrl}
                            alt="Thumbnail preview"
                            className="h-12 w-20 object-cover rounded-lg border border-[#222222]"
                          />
                          <span className="text-xs text-[#10b981] font-semibold flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Image Uploaded Ready
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#71717a]">No file chosen yet</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-extrabold text-sm transition cursor-pointer"
                  >
                    + Publish Course
                  </button>
                </form>
              </div>

              {/* Published Courses */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">Published Courses ({courses.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl border border-[#222222] bg-[#111111] flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {c.thumbnailUrl ? (
                          <img src={c.thumbnailUrl} alt={c.title} className="h-14 w-20 object-cover rounded-lg shrink-0" />
                        ) : (
                          <div className="h-14 w-20 rounded-lg bg-black border border-[#222222] flex items-center justify-center shrink-0">
                            <ImageIcon className="h-5 w-5 text-[#71717a]" />
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <h4 className="text-sm font-bold text-white truncate">{c.title}</h4>
                          <div className="text-xs text-[#a1a1aa] mt-0.5">
                            <span className="text-[#10b981] font-bold font-mono">₹{c.priceInr}</span> • {c.category}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-2 rounded-lg bg-black border border-[#222222] text-rose-400 hover:bg-rose-500/20 transition cursor-pointer shrink-0"
                        title="Delete Course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              {/* Add Certificate Box with Computer Upload */}
              <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="h-4 w-4 text-[#10b981]" /> Upload Payout Certificate From Computer
                </h2>

                <form onSubmit={handleCreateCert} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-white font-semibold">Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. $14,250 FundedNext Payout"
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-white font-semibold">Prop Firm / Broker *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. FTMO, FundedNext, Zerodha"
                        value={certForm.firmOrBroker}
                        onChange={(e) => setCertForm({ ...certForm, firmOrBroker: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-white font-semibold">Payout Amount *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. $14,250 or ₹11,50,000"
                        value={certForm.amount}
                        onChange={(e) => setCertForm({ ...certForm, amount: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-black border border-[#222222] text-white focus:border-[#10b981] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Upload Certificate File From Computer */}
                  <div className="space-y-2">
                    <label className="text-white font-semibold flex items-center justify-between">
                      <span>Certificate File from PC *</span>
                      <span className="text-[11px] text-[#a1a1aa]">Select PNG, JPG, or screenshot from your computer</span>
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-black border border-dashed border-[#333333]">
                      <input
                        ref={certFileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'cert');
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => certFileRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] text-xs font-bold text-white flex items-center gap-2 transition cursor-pointer"
                      >
                        <Upload className="h-4 w-4 text-[#10b981]" />
                        {uploadingCertImage ? 'Uploading Certificate...' : 'Choose Certificate From Computer'}
                      </button>

                      {certForm.imageUrl ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={certForm.imageUrl}
                            alt="Certificate preview"
                            className="h-16 w-24 object-cover rounded-lg border border-[#222222]"
                          />
                          <span className="text-xs text-[#10b981] font-semibold flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Certificate Ready
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#71717a]">No certificate chosen yet</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-extrabold text-sm transition cursor-pointer"
                  >
                    + Add to Public Certificate Gallery
                  </button>
                </form>
              </div>

              {/* Existing Certificates Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">Live Certificates ({certificates.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="overflow-hidden rounded-xl border border-[#222222] bg-[#111111]"
                    >
                      <div className="h-36 w-full bg-black">
                        <img src={cert.imageUrl} alt={cert.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-3.5 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="truncate">
                            <h4 className="text-xs font-bold text-white truncate">{cert.title}</h4>
                            <span className="text-[11px] text-[#a1a1aa]">{cert.firmOrBroker}</span>
                          </div>
                          <span className="text-xs font-mono font-black text-[#10b981]">{cert.amount}</span>
                        </div>
                        <div className="pt-2 border-t border-[#1a1a1a] flex justify-end">
                          <button
                            onClick={() => handleDeleteCert(cert.id)}
                            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: STUDENTS ACCESS */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Student Course Access (Grant or Revoke)</h3>
                <p className="text-xs text-[#a1a1aa]">
                  Click buttons below to give or remove instant access to students.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#222222] text-[#a1a1aa] uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-3">Student</th>
                        <th className="py-3 px-3">Email</th>
                        {courses.map((c) => (
                          <th key={c.id} className="py-3 px-3 whitespace-nowrap">
                            {c.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222]">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-[#181818]">
                          <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{student.name}</td>
                          <td className="py-3 px-3 font-mono text-[#a1a1aa] whitespace-nowrap">{student.email}</td>
                          {courses.map((course) => {
                            const hasAccess = student.enrolledCourses?.some(
                              (c) => c.courseId === course.id || c.courseId === course.slug
                            );

                            return (
                              <td key={course.id} className="py-3 px-3 whitespace-nowrap">
                                <button
                                  onClick={() => handleToggleAccess(student.id, course.id, !!hasAccess)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                                    hasAccess
                                      ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/40'
                                      : 'bg-black text-[#a1a1aa] border border-[#222222] hover:text-white hover:border-[#444444]'
                                  }`}
                                  title={hasAccess ? 'Click to revoke access' : 'Click to grant access'}
                                >
                                  {hasAccess ? 'Access Granted ✓' : '+ Grant Access'}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ORDERS & PAYMENTS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Razorpay Orders Audit</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#222222] text-[#a1a1aa] uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-3">Order ID</th>
                        <th className="py-3 px-3">Student Email</th>
                        <th className="py-3 px-3">Course</th>
                        <th className="py-3 px-3">Amount</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222]">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#181818]">
                          <td className="py-3 px-3 font-mono font-bold text-[#10b981]">{o.razorpayOrderId}</td>
                          <td className="py-3 px-3 font-mono text-[#a1a1aa]">{o.userEmail}</td>
                          <td className="py-3 px-3 text-white">{o.courseTitle}</td>
                          <td className="py-3 px-3 font-mono font-bold text-white">₹{o.amount}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10b981]/20 text-[#10b981]">
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[#a1a1aa]">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
