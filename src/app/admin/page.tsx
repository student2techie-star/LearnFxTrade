'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  ShieldCheck,
  Users,
  DollarSign,
  BookOpen,
  Award,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

interface AdminData {
  metrics: {
    totalStudents: number;
    totalOrders: number;
    paidOrders: number;
    totalRevenue: number;
    coursesCount: number;
    certificatesCount: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  students: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courses: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  certificates: any[];
}

export default function AdminPage() {
  const { user } = useAuth();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'certificates' | 'students' | 'orders'>('overview');

  // Form states for new course
  const [newCourse, setNewCourse] = useState({
    title: '',
    priceInr: 3999,
    category: 'Forex' as const,
    level: 'Intermediate' as const,
    tagline: '',
    description: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  });

  // Form states for new certificate
  const [newCert, setNewCert] = useState({
    title: '',
    firmOrBroker: '',
    amount: '',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    accountType: 'Prop Firm Funded',
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/manage');
      if (res.ok) {
        const d = await res.json();
        setData(d);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      if (res.ok) {
        alert('Course created successfully!');
        setNewCourse({
          title: '',
          priceInr: 3999,
          category: 'Forex',
          level: 'Intermediate',
          tagline: '',
          description: '',
          thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
        });
        fetchData();
      }
    } catch (err) {
      alert('Failed to create course');
    }
  };

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCert),
      });
      if (res.ok) {
        alert('Payout certificate added successfully!');
        setNewCert({
          title: '',
          firmOrBroker: '',
          amount: '',
          imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
          accountType: 'Prop Firm Funded',
        });
        fetchData();
      }
    } catch (err) {
      alert('Failed to add certificate');
    }
  };

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
    } catch (err) {
      alert('Failed to update student access');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-24">
      {/* Admin Header */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Admin & Instructor Portal
            </span>
            <span className="text-xs text-slate-400">LearnFxTrade Console</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Platform Administration</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage courses, upload payout certificates, supervise Razorpay orders, and grant student course access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition flex items-center gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View Public Site
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      {data?.metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Total Revenue</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹{data.metrics.totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">Via Razorpay Gateway</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Registered Students</span>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {data.metrics.totalStudents}
            </div>
            <div className="text-[11px] text-cyan-400 font-medium">Active learners</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Courses Published</span>
              <BookOpen className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {data.metrics.coursesCount}
            </div>
            <div className="text-[11px] text-purple-400 font-medium">Live syllabuses</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Certificates Displayed</span>
              <Award className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {data.metrics.certificatesCount}
            </div>
            <div className="text-[11px] text-amber-400 font-medium">Verified payout proofs</div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {(['overview', 'courses', 'certificates', 'students', 'orders'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === tab
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" /> Recent Razorpay Transactions
            </h3>
            <div className="space-y-3">
              {data?.orders.slice(0, 5).map((o) => (
                <div key={o.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{o.courseTitle}</div>
                    <div className="text-slate-400 font-mono text-[10px]">{o.userEmail} • {o.razorpayOrderId}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">₹{o.amount}</div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" /> Verified Payout Proofs
            </h3>
            <div className="space-y-3">
              {data?.certificates.slice(0, 5).map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{c.title}</div>
                    <div className="text-slate-400">{c.firmOrBroker} ({c.date})</div>
                  </div>
                  <div className="font-black text-amber-400">{c.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Courses */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Course Form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-400" /> Add New Course
            </h3>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced SMC Liquidity Engine"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={newCourse.priceInr}
                    onChange={(e) => setNewCourse({ ...newCourse, priceInr: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  >
                    <option>Forex</option>
                    <option>Indian Market</option>
                    <option>Price Action</option>
                    <option>Psychology</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Short Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. High-probability institutional setup"
                  value={newCourse.tagline}
                  onChange={(e) => setNewCourse({ ...newCourse, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
              >
                Publish Course
              </button>
            </form>
          </div>

          {/* Existing Courses List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-white">Existing Published Courses</h3>
            <div className="space-y-3">
              {data?.courses.map((course) => (
                <div key={course.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={course.thumbnailUrl} alt={course.title} className="h-12 w-16 object-cover rounded-lg" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{course.title}</h4>
                      <p className="text-xs text-slate-400">₹{course.priceInr} • {course.category}</p>
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white"
                  >
                    View Page
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Upload Payout Certificates */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Certificate Form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-amber-400" /> Add Payout Proof
            </h3>
            <form onSubmit={handleCreateCertificate} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Certificate Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. $10,500 FundedNext Payout"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Firm / Broker</label>
                  <input
                    type="text"
                    required
                    placeholder="FTMO, FundedNext, Zerodha"
                    value={newCert.firmOrBroker}
                    onChange={(e) => setNewCert({ ...newCert, firmOrBroker: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Payout Amount</label>
                  <input
                    type="text"
                    required
                    placeholder="$14,250 or ₹11,50,000"
                    value={newCert.amount}
                    onChange={(e) => setNewCert({ ...newCert, amount: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Certificate Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newCert.imageUrl}
                  onChange={(e) => setNewCert({ ...newCert, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
              >
                Add to Gallery
              </button>
            </form>
          </div>

          {/* Certificate list */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-white">Current Certificate Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.certificates.map((cert) => (
                <div key={cert.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <img src={cert.imageUrl} alt={cert.title} className="h-16 w-20 object-cover rounded-lg" />
                  <div className="text-xs">
                    <div className="font-bold text-white line-clamp-1">{cert.title}</div>
                    <div className="text-amber-400 font-black">{cert.amount}</div>
                    <div className="text-slate-400 text-[11px]">{cert.firmOrBroker}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Student Access Management */}
      {activeTab === 'students' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Manage Student Course Access</h3>
              <p className="text-xs text-slate-400">
                Manually grant or revoke course enrollments for support requests or offline payments.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Forex SMC Access</th>
                  <th className="py-3 px-4">Nifty Pro Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {data?.students.map((student) => {
                  const hasForex = student.enrolledCourses?.some((c: any) => c.courseId === 'course-forex-mastery');
                  const hasNifty = student.enrolledCourses?.some((c: any) => c.courseId === 'course-nifty-banknifty');

                  return (
                    <tr key={student.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-white">{student.name}</td>
                      <td className="py-3 px-4 font-mono">{student.email}</td>
                      <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-400">{student.role}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAccess(student.id, 'course-forex-mastery', hasForex)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            hasForex
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {hasForex ? 'Granted ✓' : '+ Grant Access'}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAccess(student.id, 'course-nifty-banknifty', hasNifty)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            hasNifty
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {hasNifty ? 'Granted ✓' : '+ Grant Access'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Razorpay Orders & Verification */}
      {activeTab === 'orders' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Razorpay Orders & Audit Trail</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {data?.orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono text-emerald-400">{order.razorpayOrderId}</td>
                    <td className="py-3 px-4">{order.userEmail}</td>
                    <td className="py-3 px-4">{order.courseTitle}</td>
                    <td className="py-3 px-4 font-bold text-white">₹{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
