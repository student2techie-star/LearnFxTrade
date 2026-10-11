'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { Clock, BookOpen, CheckCircle, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const { isEnrolled } = useAuth();
  const enrolled = isEnrolled(course.id);

  const discountPercent = Math.round(
    ((course.originalPriceInr - course.priceInr) / course.originalPriceInr) * 100
  );

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
      {/* Thumbnail and Category Badge */}
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md border border-emerald-500/30">
              {course.category}
            </span>
            <span className="rounded-full bg-slate-950/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700">
              {course.level}
            </span>
          </div>

          {enrolled && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg">
                <CheckCircle className="h-3.5 w-3.5" /> Enrolled
              </span>
            </div>
          )}

          {/* Discount badge */}
          {!enrolled && discountPercent > 0 && (
            <div className="absolute bottom-3 right-3">
              <span className="rounded-lg bg-rose-500/90 text-white font-bold text-xs px-2 py-0.5 shadow">
                {discountPercent}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {course.tagline}
          </p>

          {/* Meta specs */}
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              {course.lessonsCount || 10} Lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {course.totalDuration || '12h'}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Lifetime
            </span>
          </div>

          {/* Feature Highlights */}
          <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
            {course.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing and Action Button */}
      <div className="p-5 pt-0 border-t border-slate-800/50 mt-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              ₹{course.priceInr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{course.originalPriceInr.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">One-Time Fee (All Inclusive)</span>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md active:scale-95"
          >
            Go to Course <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white transition-all border border-slate-700 active:scale-95"
          >
            Explore <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
