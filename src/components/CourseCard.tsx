'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { Clock, BookOpen, CheckCircle, ArrowRight, ShieldCheck, Tag, Zap } from 'lucide-react';
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
    <div className="fintech-card group flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Top Media & Tags */}
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#06090e]">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121d] via-[#0c121d]/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="rounded-full bg-[#06090e]/90 px-3 py-1 text-[11px] font-mono font-bold text-[#00f2a9] backdrop-blur-md border border-[#00f2a9]/30">
              {course.category}
            </span>
            <span className="rounded-full bg-[#06090e]/90 px-2.5 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700">
              {course.level}
            </span>
          </div>

          {enrolled && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 rounded-full bg-[#00f2a9] px-3 py-1 text-[11px] font-black text-[#06090e] shadow-lg">
                <CheckCircle className="h-3.5 w-3.5 stroke-[3]" /> ENROLLED
              </span>
            </div>
          )}

          {!enrolled && discountPercent > 0 && (
            <div className="absolute bottom-3 right-3">
              <span className="rounded-lg bg-rose-500/90 text-white font-mono font-bold text-[11px] px-2 py-0.5 shadow">
                {discountPercent}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-5 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00f2a9] transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {course.tagline}
          </p>

          {/* Specs */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              {course.lessonsCount || 10} Modules
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {course.totalDuration || '12h'}
            </span>
            <span className="flex items-center gap-1 text-[#00f2a9]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Lifetime
            </span>
          </div>

          {/* Feature Highlights */}
          <ul className="space-y-1.5 pt-3 border-t border-[#172235]">
            {course.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                <CheckCircle className="h-3.5 w-3.5 text-[#00f2a9] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-0 border-t border-[#172235]/60 mt-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              ₹{course.priceInr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500 line-through font-mono">
              ₹{course.originalPriceInr.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#00f2a9] font-medium">One-Time All Inclusive</span>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-[#00f2a9] hover:bg-[#00d696] text-[#06090e] transition-all shadow-md active:scale-95"
          >
            <span>Classroom</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-800 hover:bg-[#00f2a9] hover:text-[#06090e] text-white transition-all border border-slate-700 active:scale-95"
          >
            <span>Syllabus</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
