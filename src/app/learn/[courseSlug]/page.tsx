'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Course, Lesson } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import VideoPlayer from '@/components/VideoPlayer';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function CoursePlayerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseSlug = params?.courseSlug as string;
  const initialLessonId = searchParams?.get('lesson');

  const { isEnrolled, user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId || '');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/admin/manage')
      .then((res) => res.json())
      .then((data) => {
        const foundCourse = (data.courses || []).find(
          (c: Course) => c.slug === courseSlug || c.id === courseSlug
        );
        if (foundCourse) {
          setCourse(foundCourse);
          const courseLessons = (data.lessons || []).filter(
            (l: Lesson) => l.courseId === foundCourse.id
          );
          setLessons(courseLessons);
          if (!activeLessonId && courseLessons.length > 0) {
            setActiveLessonId(courseLessons[0].id);
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [courseSlug, activeLessonId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center px-4 space-y-4">
        <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
        <Link href="/courses" className="text-emerald-400 text-sm hover:underline">
          Return to Courses
        </Link>
      </div>
    );
  }

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
  const enrolled = isEnrolled(course.id);

  const toggleComplete = (id: string) => {
    if (completedLessonIds.includes(id)) {
      setCompletedLessonIds(completedLessonIds.filter((item) => item !== id));
    } else {
      setCompletedLessonIds([...completedLessonIds, id]);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 pb-24">
      {/* Top Breadcrumb & Course Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">
                {course.category} Classroom
              </span>
              {enrolled ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Full Access Granted
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Preview Mode
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white line-clamp-1">
              {course.title}
            </h1>
          </div>
        </div>

        {!enrolled && (
          <Link
            href={`/courses/${course.slug}`}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition self-start sm:self-auto"
          >
            Unlock Full Course (₹{course.priceInr})
          </Link>
        )}
      </div>

      {/* Main Player Area & Lessons Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Video Player & Lesson Notes */}
        <div className="lg:col-span-2 space-y-6">
          {activeLesson ? (
            <>
              {/* Dynamic Video Player with Watermark & Security */}
              <VideoPlayer
                lessonId={activeLesson.id}
                courseId={course.id}
                courseSlug={course.slug}
                title={activeLesson.title}
                isFreePreview={activeLesson.isFreePreview}
              />

              {/* Lesson Details Box */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400">
                      Module {activeLesson.orderNo}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-0.5">
                      {activeLesson.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleComplete(activeLesson.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                      completedLessonIds.includes(activeLesson.id)
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {completedLessonIds.includes(activeLesson.id)
                      ? 'Marked as Completed'
                      : 'Mark Lesson Complete'}
                  </button>
                </div>

                {activeLesson.description && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                    {activeLesson.description}
                  </p>
                )}

                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" />
                    Duration: {activeLesson.duration}
                  </span>
                  <span>•</span>
                  <span className="text-slate-400">
                    High Definition 1080p Stream
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Right Col: Lessons Playlist / Syllabus Sidebar */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-400" /> Course Syllabus ({lessons.length})
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              {completedLessonIds.length}/{lessons.length} Done
            </span>
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {lessons.map((lesson, idx) => {
              const isActive = lesson.id === activeLesson?.id;
              const isDone = completedLessonIds.includes(lesson.id);
              const canPlay = lesson.isFreePreview || enrolled;

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-3 ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800/80 bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950'
                          : isActive
                          ? 'bg-emerald-400/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                    </div>

                    <div>
                      <div className="text-xs font-semibold line-clamp-1">
                        {lesson.title}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{lesson.duration}</span>
                        {lesson.isFreePreview && (
                          <span className="text-emerald-400 font-bold uppercase">
                            • Preview
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {canPlay ? (
                      <Play
                        className={`h-3.5 w-3.5 ${
                          isActive ? 'text-emerald-400 fill-emerald-400' : 'text-slate-500'
                        }`}
                      />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-slate-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
