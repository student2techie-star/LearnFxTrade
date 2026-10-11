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
    <div className="clean-card group flex flex-col justify-between overflow-hidden rounded-xl">
      <div>
        {/* Media Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-mono font-medium text-white border border-neutral-800">
              {course.category}
            </span>
          </div>

          {enrolled && (
            <div className="absolute top-2.5 right-2.5">
              <span className="flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-black shadow">
                <CheckCircle className="h-3 w-3 stroke-[2.5]" /> ENROLLED
              </span>
            </div>
          )}

          {!enrolled && discountPercent > 0 && (
            <div className="absolute bottom-2.5 right-2.5">
              <span className="rounded bg-neutral-900 border border-neutral-700 text-white font-mono text-[10px] px-1.5 py-0.5">
                {discountPercent}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          <h3 className="text-base font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {course.tagline}
          </p>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 pt-1">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {course.lessonsCount || 10} Modules
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.totalDuration || '12h'}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Button */}
      <div className="p-4 pt-2 border-t border-[#1a1a1a] flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white font-mono">
              ₹{course.priceInr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-neutral-600 line-through font-mono">
              ₹{course.originalPriceInr.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[10px] text-neutral-500 block">One-time payment</span>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-black hover:bg-neutral-200 transition"
          >
            <span>Learn</span> <ArrowRight className="h-3 w-3" />
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 transition"
          >
            <span>View</span> <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
