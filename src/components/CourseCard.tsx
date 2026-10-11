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
    <div className="tv-card-clean group flex flex-col justify-between overflow-hidden">
      <div>
        {/* Media Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f0f3fa]">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Category Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#131722] shadow-sm">
              {course.category}
            </span>
            <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-[#787b86]">
              {course.level}
            </span>
          </div>

          {enrolled && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 rounded-full bg-[#089981] px-3 py-1 text-xs font-bold text-white shadow">
                <CheckCircle className="h-3.5 w-3.5 stroke-[2.5]" /> Enrolled
              </span>
            </div>
          )}

          {!enrolled && discountPercent > 0 && (
            <div className="absolute bottom-3 right-3">
              <span className="rounded-full bg-[#f23645] text-white font-bold text-xs px-2.5 py-0.5 shadow">
                {discountPercent}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold text-[#131722] group-hover:text-[#2962ff] transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-[#787b86] line-clamp-2 leading-relaxed">
            {course.tagline}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-[#787b86] pt-1">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#2962ff]" />
              {course.lessonsCount || 10} Lessons
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#787b86]" />
              {course.totalDuration || '12h'}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Button */}
      <div className="p-5 pt-3 border-t border-[#e0e3eb] flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#131722] font-mono">
              ₹{course.priceInr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#787b86] line-through font-mono">
              ₹{course.originalPriceInr.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[11px] text-[#089981] font-semibold">One-time payment</span>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-full bg-[#089981] text-white hover:bg-[#07806c] transition shadow-xs"
          >
            <span>Classroom</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="tv-btn-primary flex items-center gap-1 px-5 py-2 text-xs font-semibold shadow-xs"
          >
            <span>View Syllabus</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
