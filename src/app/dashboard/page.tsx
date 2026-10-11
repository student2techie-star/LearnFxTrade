'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { INITIAL_COURSES, INITIAL_ORDERS } from '@/lib/mock-data';
import Link from 'next/link';
import {
  GraduationCap,
  Play,
  BookOpen,
  Award,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Receipt,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user, enrolledCourseIds, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-24 text-center px-4 space-y-4">
        <GraduationCap className="h-12 w-12 text-slate-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Sign in to Access Dashboard</h2>
        <p className="text-xs text-slate-400">
          Please log in with your registered email to view your enrolled courses.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const enrolledCourses = INITIAL_COURSES.filter((c) =>
    enrolledCourseIds.includes(c.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-24">
      {/* Student Welcome Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Student Member
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {user.id.slice(-6)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Welcome, {user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Email: <span className="text-slate-200">{user.email}</span> • Continue your syllabus and prop firm evaluation journey.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div>
            <div className="text-2xl font-black text-white">{enrolledCourses.length}</div>
            <div className="text-xs text-slate-400">Enrolled Courses</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-2xl font-black text-emerald-400">Active</div>
            <div className="text-xs text-slate-400">Lifetime Access</div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-emerald-400" /> My Active Courses
          </h2>
          <Link
            href="/courses"
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            Browse More Courses <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 hover:border-emerald-500/50 transition-all hover:shadow-xl"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-emerald-500 text-slate-950 shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 fill-slate-950" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">
                      {course.category}
                    </span>
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {course.title}
                    </h3>
                  </div>

                  {/* Progress bar preview */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Course Progress</span>
                      <span className="text-emerald-400 font-bold">In Progress</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full w-1/3 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>

                <Link
                  href={`/learn/${course.slug}`}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950" />
                  <span>Resume Course Classroom</span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4">
            <BookOpen className="h-10 w-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Courses Enrolled Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You haven&apos;t enrolled in any masterclasses yet. Explore our curriculum to master Forex SMC or Indian Nifty/BankNifty.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg"
            >
              Explore Available Courses
            </Link>
          </div>
        )}
      </div>

      {/* Payment & Invoice Receipts */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Receipt className="h-5 w-5 text-emerald-400" /> Payment Invoices & Transaction History
        </h2>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Receipt / Order ID</th>
                  <th className="py-3 px-4">Course Name</th>
                  <th className="py-3 px-4">Amount (INR)</th>
                  <th className="py-3 px-4">Gateway Status</th>
                  <th className="py-3 px-4">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {INITIAL_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono text-emerald-400">{order.razorpayOrderId}</td>
                    <td className="py-3 px-4 font-medium">{order.courseTitle}</td>
                    <td className="py-3 px-4 font-bold text-white">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-emerald-400 hover:underline cursor-pointer">
                      Download Receipt
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
