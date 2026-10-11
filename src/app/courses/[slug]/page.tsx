'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { INITIAL_COURSES, INITIAL_LESSONS } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import CheckoutModal from '@/components/CheckoutModal';
import Link from 'next/link';
import {
  Clock,
  BookOpen,
  ShieldCheck,
  CheckCircle,
  Play,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isEnrolled } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const course = INITIAL_COURSES.find((c) => c.slug === slug || c.id === slug);
  if (!course) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center px-4 space-y-4">
        <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
        <Link href="/courses" className="text-emerald-400 text-sm hover:underline">
          Return to Courses Catalog
        </Link>
      </div>
    );
  }

  const lessons = INITIAL_LESSONS.filter((l) => l.courseId === course.id);
  const enrolled = isEnrolled(course.id);
  const firstPreviewLesson = lessons.find((l) => l.isFreePreview) || lessons[0];

  const discountPercent = Math.round(
    ((course.originalPriceInr - course.priceInr) / course.originalPriceInr) * 100
  );

  return (
    <div className="pb-24">
      {/* Course Header Banner */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left 2 Cols: Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                  {course.category}
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                  {course.level} Level
                </span>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 border border-cyan-500/20">
                  Updated 2026 Batch
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {course.description}
              </p>

              {/* Quick specs */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>{lessons.length} In-Depth Video Modules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>{course.totalDuration || '12 Hours'} Content</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Lifetime Access & Updates</span>
                </div>
              </div>
            </div>

            {/* Right Col: Pricing & Enrollment Action Card */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur text-xs font-bold text-white border border-white/20">
                    <Play className="h-3.5 w-3.5 fill-white text-white" /> Free Preview Available
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">
                    ₹{course.priceInr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{course.originalPriceInr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Single one-time payment. Instant access via Razorpay.
                </p>
              </div>

              {enrolled ? (
                <Link
                  href={`/learn/${course.slug}`}
                  className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Go to Course Classroom</span>
                </Link>
              ) : (
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide transition shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-98"
                >
                  <Zap className="h-4 w-4 fill-slate-950" />
                  <span>Enroll Now (Pay with UPI / Cards)</span>
                </button>
              )}

              <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Instant student login credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Verified Razorpay payment invoice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Private Telegram & Discord discussion access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Curriculum & Syllabus Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Lessons Syllabus Accordion */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">Course Curriculum & Syllabus</h2>
              <p className="text-xs text-slate-400 mt-1">
                Click any preview lesson to watch right now. Locked lessons unlock upon enrollment.
              </p>
            </div>

            <div className="space-y-3">
              {lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-slate-700 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-slate-300">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {lesson.title}
                        {lesson.isFreePreview && (
                          <span className="text-[10px] uppercase font-black bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                            Free Preview
                          </span>
                        )}
                      </h4>
                      {lesson.description && (
                        <p className="text-xs text-slate-400 mt-0.5">{lesson.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" />
                      {lesson.duration}
                    </span>

                    {lesson.isFreePreview || enrolled ? (
                      <Link
                        href={`/learn/${course.slug}?lesson=${lesson.id}`}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Play className="h-3 w-3 fill-current" /> Watch
                      </Link>
                    ) : (
                      <button
                        onClick={() => setCheckoutOpen(true)}
                        className="p-2 rounded-lg bg-slate-800/80 text-slate-500 hover:text-slate-400"
                        title="Enroll to unlock"
                      >
                        <Lock className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What You Learn & Highlights */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">What You Will Master</h3>
              <ul className="space-y-3">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-amber-500/20 bg-amber-950/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Award className="h-4 w-4" /> Prop Firm Guarantee
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every strategy taught in this syllabus is strictly backtested on Funded accounts. We cover real drawdown preservation algorithms without reckless gambling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Checkout Modal */}
      <CheckoutModal
        course={course}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
