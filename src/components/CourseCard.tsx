'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { Clock, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
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
    <div className="tv-card group flex flex-col justify-between overflow-hidden">
      <div>
        {/* Media Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#131722]">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e222d] via-transparent to-transparent opacity-90" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="rounded bg-[#131722]/90 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#2962ff] border border-[#2a2e39]">
              {course.category}
            </span>
            <span className="rounded bg-[#131722]/90 px-2 py-0.5 text-[10px] font-mono text-[#787b86] border border-[#2a2e39]">
              {course.level}
            </span>
          </div>

          {enrolled && (
            <div className="absolute top-2.5 right-2.5">
              <span className="flex items-center gap-1 rounded bg-[#089981] px-2 py-0.5 text-[10px] font-bold text-white shadow">
                <CheckCircle className="h-3 w-3 stroke-[2.5]" /> ENROLLED
              </span>
            </div>
          )}

          {!enrolled && discountPercent > 0 && (
            <div className="absolute bottom-2.5 right-2.5">
              <span className="rounded bg-[#f23645] text-white font-mono font-bold text-[10px] px-1.5 py-0.5">
                {discountPercent}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          <h3 className="text-base font-bold text-white group-hover:text-[#2962ff] transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-[#787b86] line-clamp-2 leading-relaxed">
            {course.tagline}
          </p>

          <div className="flex items-center gap-3 text-xs font-mono text-[#787b86] pt-1">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {course.lessonsCount || 10} Lessons
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.totalDuration || '12h'}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Button */}
      <div className="p-4 pt-2 border-t border-[#2a2e39] flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white font-mono">
              ₹{course.priceInr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#787b86] line-through font-mono">
              ₹{course.originalPriceInr.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[10px] text-[#089981] font-mono block">One-time fee</span>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-[#089981] text-white hover:bg-[#07806c] transition"
          >
            <span>Classroom</span> <ArrowRight className="h-3 w-3" />
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-[#2962ff] text-white hover:bg-[#1e53e5] transition"
          >
            <span>Explore</span> <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
