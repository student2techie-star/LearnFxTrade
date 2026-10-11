'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Lock, Play, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  lessonId: string;
  courseId: string;
  courseSlug: string;
  title: string;
  isFreePreview: boolean;
  onCompleted?: () => void;
}

export default function VideoPlayer({
  lessonId,
  courseId,
  courseSlug,
  title,
  isFreePreview,
  onCompleted,
}: Props) {
  const { user } = useAuth();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchVideo() {
      setLoading(true);
      setError(null);
      try {
        const query = user?.id ? `?userId=${user.id}` : '';
        const res = await fetch(`/api/lessons/${lessonId}/video${query}`);
        const data = await res.json();

        if (!isMounted) return;

        if (res.ok && data.allowed) {
          setVideoId(data.videoId);
        } else {
          setError(data.error || 'Access restricted. Please enroll in this course.');
        }
      } catch (err: unknown) {
        if (isMounted) setError('Failed to load video stream.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchVideo();
    return () => {
      isMounted = false;
    };
  }, [lessonId, user?.id]);

  // Anti-piracy dynamic watermark text
  const watermarkText = user ? `${user.email} • ID: ${user.id.slice(-6)}` : 'PREVIEW MODE';

  if (loading) {
    return (
      <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <span className="text-xs text-slate-400 font-mono">Authenticating secure video stream...</span>
      </div>
    );
  }

  if (error || !videoId) {
    return (
      <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 p-6 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-xl">
          <Lock className="h-8 w-8" />
        </div>
        <div className="max-w-md space-y-1">
          <h3 className="text-lg font-bold text-white">This Lesson Is Locked</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {error || 'This premium lesson is reserved for registered students enrolled in this curriculum.'}
          </p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Link
            href={`/courses/${courseSlug}`}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            Unlock Full Course Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl">
      {/* Privacy-enhanced YouTube embed without cookies and related videos */}
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`}
        title={title}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Floating Anti-Piracy Dynamic Watermark Overlay */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-watermark select-none text-[12px] font-mono tracking-widest text-white/30 font-bold px-3 py-1 rounded bg-black/40 backdrop-blur-xs w-max border border-white/10">
          🔒 {watermarkText}
        </div>
      </div>

      {/* Free Preview Tag Overlay */}
      {isFreePreview && (
        <div className="pointer-events-none absolute top-3 left-3">
          <span className="flex items-center gap-1 rounded-md bg-emerald-500/90 text-slate-950 px-2.5 py-1 text-[11px] font-bold shadow-md">
            <Sparkles className="h-3 w-3" /> Free Preview Lesson
          </span>
        </div>
      )}
    </div>
  );
}
