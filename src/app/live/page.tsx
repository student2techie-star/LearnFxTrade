'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Video,
  Radio,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  X,
  Phone,
  Mail,
  User,
  Zap,
  Monitor,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { LiveSession } from '@/lib/types';

export default function LiveSessionsPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Enrollment Modal
  const [enrollModalSession, setEnrollModalSession] = useState<LiveSession | null>(null);
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    email: '',
    phone: '',
    tradingExperience: 'Intermediate (1-2 years)',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const fetchLiveSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/live-sessions', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveSessions();
  }, []);

  const categories = ['all', 'Forex SMC', 'Indian Market', 'Psychology & Q&A'];

  const filteredSessions = sessions.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollModalSession) return;

    if (!enrollForm.name || !enrollForm.email) {
      setEnrollError('Please provide your name and email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      setEnrollError(null);

      const res = await fetch('/api/live-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: enrollModalSession.id,
          studentName: enrollForm.name,
          studentEmail: enrollForm.email,
          phone: enrollForm.phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to enroll');
      }

      setEnrollSuccess(true);
      fetchLiveSessions(); // Refresh attendees count
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Enrollment failed';
      setEnrollError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 space-y-12">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-12 border-b border-[#222222] bg-gradient-to-b from-[#0a0f0d] via-black to-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          {/* Eyebrow Live Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-rose-500/30 text-xs font-semibold text-white shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-rose-400 font-bold uppercase tracking-wider">Interactive Live Floor</span>
            <span className="text-[#a1a1aa]">•</span>
            <span className="text-[#10b981]">Market Hours Execution</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Trade Real-Time With Mentors. <br />
            <span className="text-[#10b981]">Live Market Sessions & Desk Reviews.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
            Direct audio-visual access to institutional setups. Join Somnath live on Zoom/Google Meet as London & New York session liquidity opens, ask real-time questions, and review your personal trading journal.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-white/80">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#222222]">
              <Radio className="h-4 w-4 text-rose-500 animate-pulse" />
              <span>Real-Time Screenshare</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#222222]">
              <Users className="h-4 w-4 text-[#10b981]" />
              <span>Capped Cohort Sizes</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#222222]">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Live Q&A + Trade Breakdowns</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#0c0c0e] border border-[#222222]">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition shrink-0 ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#10b981] text-black shadow-md shadow-[#10b981]/20'
                    : 'bg-[#141416] text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1d]'
                }`}
              >
                {cat === 'all' ? 'All Live Sessions' : cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#a1a1aa] shrink-0 font-mono">
            Showing <span className="text-white font-bold">{filteredSessions.length}</span> Scheduled Sessions
          </div>
        </div>
      </section>

      {/* 3. LIVE SESSIONS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-72 rounded-2xl bg-[#111111] animate-pulse border border-[#222222]" />
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-[#0c0c0e] border border-[#222222] p-8 space-y-3">
            <Radio className="h-10 w-10 text-white/30 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Live Sessions in this category</h3>
            <p className="text-xs text-[#a1a1aa]">Check back soon or explore our recorded self-paced masterclasses.</p>
            <Link
              href="/courses"
              className="inline-block mt-2 px-4 py-2 rounded-xl bg-[#10b981] text-black text-xs font-bold"
            >
              Browse Recorded Classes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => {
              const enrolledCount = session.enrolledAttendees?.length || 0;
              const seatsLeft = Math.max(0, session.totalSeats - enrolledCount);
              const isFull = seatsLeft <= 0;
              const isLiveNow = session.status === 'live_now';

              return (
                <div
                  key={session.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 p-6 ${
                    isLiveNow
                      ? 'bg-gradient-to-b from-[#160b0d] to-[#0c0c0e] border-rose-500/40 shadow-xl shadow-rose-950/20'
                      : 'bg-[#0c0c0e] border-[#222222] hover:border-[#10b981]/50 hover:shadow-xl'
                  }`}
                >
                  {/* Top Bar: Live Status + Platform */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      {isLiveNow ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500 text-rose-400 text-[11px] font-extrabold animate-pulse">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          LIVE STREAMING NOW
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-[11px] font-bold">
                          <Clock className="h-3 w-3" />
                          UPCOMING SESSION
                        </div>
                      )}

                      <span className="px-2.5 py-1 rounded-lg bg-[#141416] text-[11px] font-semibold text-[#a1a1aa] border border-[#222222] flex items-center gap-1">
                        <Monitor className="h-3 w-3 text-cyan-400" />
                        {session.platform}
                      </span>
                    </div>

                    {/* Title & Topic */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#10b981]">
                        {session.category}
                      </div>
                      <h2 className="text-lg font-black text-white group-hover:text-[#10b981] transition line-clamp-2">
                        {session.title}
                      </h2>
                      <p className="text-xs text-[#a1a1aa] line-clamp-3 leading-relaxed">
                        {session.topic || session.description}
                      </p>
                    </div>

                    {/* Session Details Pills */}
                    <div className="space-y-2 pt-2 border-t border-[#1c1c1f] text-xs">
                      <div className="flex items-center justify-between text-white/90">
                        <span className="flex items-center gap-1.5 text-[#a1a1aa]">
                          <Calendar className="h-3.5 w-3.5 text-amber-400" /> Date & Time:
                        </span>
                        <span className="font-semibold text-white">{session.scheduledDate}</span>
                      </div>

                      <div className="flex items-center justify-between text-white/90">
                        <span className="flex items-center gap-1.5 text-[#a1a1aa]">
                          <Clock className="h-3.5 w-3.5 text-cyan-400" /> Duration:
                        </span>
                        <span className="font-semibold text-white">{session.duration}</span>
                      </div>

                      <div className="flex items-center justify-between text-white/90">
                        <span className="flex items-center gap-1.5 text-[#a1a1aa]">
                          <User className="h-3.5 w-3.5 text-[#10b981]" /> Mentor:
                        </span>
                        <span className="font-semibold text-[#10b981]">{session.hostMentor}</span>
                      </div>
                    </div>

                    {/* Seat Capacity Progress */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#a1a1aa] flex items-center gap-1">
                          <Users className="h-3 w-3" /> Attendees Enrolled:
                        </span>
                        <span className="font-mono font-bold text-white">
                          {enrolledCount} / {session.totalSeats} seats
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#18181b] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFull ? 'bg-rose-500' : 'bg-[#10b981]'
                          }`}
                          style={{ width: `${Math.min(100, (enrolledCount / session.totalSeats) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] pt-0.5">
                        {isFull ? (
                          <span className="text-rose-400 font-bold uppercase">Cohort Full • Waiting List</span>
                        ) : (
                          <span className="text-amber-400 font-semibold">
                            🔥 Only {seatsLeft} seat{seatsLeft === 1 ? '' : 's'} remaining
                          </span>
                        )}
                        <div className="text-right">
                          <span className="text-white font-mono font-bold text-xs">
                            {session.priceInr === 0 ? 'Free Pass' : `₹${session.priceInr.toLocaleString('en-IN')}`}
                          </span>
                          {session.advanceFeeInr ? (
                            <span className="text-[10px] text-emerald-400 block font-semibold">
                              Pay ₹{session.advanceFeeInr.toLocaleString('en-IN')} Advance
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setEnrollModalSession(session);
                        setEnrollSuccess(false);
                        setEnrollError(null);
                      }}
                      disabled={isFull}
                      className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
                        isFull
                          ? 'bg-[#1c1c1f] text-white/40 cursor-not-allowed'
                          : isLiveNow
                          ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                          : 'bg-[#10b981] hover:bg-[#059669] text-black shadow-[#10b981]/20'
                      }`}
                    >
                      {isFull ? (
                        <span>Cohort Sold Out</span>
                      ) : isLiveNow ? (
                        <>
                          <span>Join Live Stream Room</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>Enroll for Live Session</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. WHAT STUDENTS EXPERIENCE IN LIVE SESSIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#222222] bg-[#0c0c0e] p-8 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10b981]">Real-Market Advantage</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why Attend Live Trading Sessions?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
              Static charts show hindsight. Live sessions teach foresight — spotting order blocks and liquidity before candles form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#1e1e22] space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center font-black">
                1
              </div>
              <h3 className="text-base font-bold text-white">Live Execution Psychology</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Watch how a funded mentor handles fast news volatility, avoids revenge trading, and sizes lots accurately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-[#1e1e22] space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="text-base font-bold text-white">Immediate Mic & Chat Q&A</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Unmute your microphone or post your chart link. Get instant critique on your support/resistance and Fair Value Gaps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-[#1e1e22] space-y-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-400/15 text-cyan-400 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="text-base font-bold text-white">Replay Recordings Access</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Every registered live attendee receives high-definition session recordings to rewatch key breakdown concepts at their own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENROLLMENT MODAL */}
      {enrollModalSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0e0e11] border border-[#27272a] p-6 sm:p-8 text-white shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => {
                setEnrollModalSession(null);
                setEnrollSuccess(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#1a1a1d] text-[#a1a1aa] hover:text-white hover:bg-[#25252a] transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {enrollSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="h-16 w-16 rounded-full bg-[#10b981]/20 border border-[#10b981] text-[#10b981] flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-white">You Are Registered!</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  Welcome to <span className="text-white font-bold">{enrollModalSession.title}</span>. Your live meeting credentials and calendar invitation have been registered for <span className="text-[#10b981] font-semibold">{enrollForm.email}</span>.
                </p>
                <div className="p-4 rounded-2xl bg-[#141417] border border-[#222226] text-xs space-y-1 text-left">
                  <div className="text-[#a1a1aa]">Scheduled Time: <strong className="text-white">{enrollModalSession.scheduledDate}</strong></div>
                  <div className="text-[#a1a1aa]">Platform: <strong className="text-cyan-400">{enrollModalSession.platform}</strong></div>
                  <div className="text-[#a1a1aa]">Mentor: <strong className="text-[#10b981]">{enrollModalSession.hostMentor}</strong></div>
                </div>
                <button
                  onClick={() => {
                    setEnrollModalSession(null);
                    setEnrollSuccess(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#10b981] text-black font-extrabold text-xs cursor-pointer hover:bg-[#059669] transition"
                >
                  Done & Back to Live Sessions
                </button>
              </div>
            ) : (
              <>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-bold mb-2">
                    <Radio className="h-3.5 w-3.5 animate-pulse" /> Live Session Pass
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Enroll for: {enrollModalSession.title}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] mt-1">
                    {enrollModalSession.scheduledDate} • {enrollModalSession.platform}
                  </p>
                </div>

                {enrollError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                    {enrollError}
                  </div>
                )}

                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#a1a1aa] mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-[#a1a1aa]" />
                      <input
                        type="text"
                        required
                        value={enrollForm.name}
                        onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141417] border border-[#27272a] text-sm text-white focus:outline-none focus:border-[#10b981]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#a1a1aa] mb-1.5">
                      Email Address (For Zoom/Meet link) *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#a1a1aa]" />
                      <input
                        type="email"
                        required
                        value={enrollForm.email}
                        onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                        placeholder="e.g. trader@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141417] border border-[#27272a] text-sm text-white focus:outline-none focus:border-[#10b981]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#a1a1aa] mb-1.5">
                      WhatsApp / Mobile Number (For Live Link & SMS)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 h-4 w-4 text-[#a1a1aa]" />
                      <input
                        type="tel"
                        value={enrollForm.phone}
                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141417] border border-[#27272a] text-sm text-white focus:outline-none focus:border-[#10b981]"
                      />
                    </div>
                  </div>

                  {/* Payment Breakdown: Advance Deposit + Remaining Balance */}
                  {enrollModalSession.priceInr > 0 ? (
                    <div className="rounded-2xl border border-emerald-500/30 bg-[#0d1612] p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1b2b22]">
                        <span className="text-[#a1a1aa]">Total Session Fee:</span>
                        <strong className="text-white font-mono text-sm">
                          ₹{enrollModalSession.priceInr.toLocaleString('en-IN')}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-emerald-400 block">
                            1. Pay Advance Now to Lock Seat:
                          </span>
                          <span className="text-[10px] text-emerald-300/70">
                            Guarantees your slot in the live cohort
                          </span>
                        </div>
                        <span className="text-base font-black text-emerald-400 font-mono">
                          ₹{(enrollModalSession.advanceFeeInr || Math.round(enrollModalSession.priceInr * 0.25)).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1b2b22]">
                        <div className="space-y-0.5">
                          <span className="text-[#a1a1aa] block font-semibold">
                            2. Remaining Balance:
                          </span>
                          <span className="text-[10px] text-[#71717a]">
                            Payable before live stream room entry
                          </span>
                        </div>
                        <span className="font-bold text-white font-mono">
                          ₹{(enrollModalSession.priceInr - (enrollModalSession.advanceFeeInr || Math.round(enrollModalSession.priceInr * 0.25))).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="rounded-xl bg-black/60 p-2.5 border border-emerald-500/20 text-[10.5px] text-emerald-200/90 leading-relaxed">
                        💡 <strong>Flexible Two-Stage Payment:</strong> Pay the advance of <strong className="text-white">₹{(enrollModalSession.advanceFeeInr || Math.round(enrollModalSession.priceInr * 0.25)).toLocaleString('en-IN')}</strong> today to reserve your seat. The remaining balance of <strong className="text-white">₹{(enrollModalSession.priceInr - (enrollModalSession.advanceFeeInr || Math.round(enrollModalSession.priceInr * 0.25))).toLocaleString('en-IN')}</strong> is paid before joining the live session.
                      </div>

                      <div className="flex items-start gap-2 pt-1 text-slate-300">
                        <input
                          type="checkbox"
                          id="liveAdvanceAgreement"
                          required
                          className="mt-0.5 rounded border-[#333333] accent-emerald-500"
                        />
                        <label htmlFor="liveAdvanceAgreement" className="cursor-pointer text-[10.5px] leading-tight">
                          I agree to pay the advance deposit of <strong className="text-emerald-400">₹{(enrollModalSession.advanceFeeInr || Math.round(enrollModalSession.priceInr * 0.25)).toLocaleString('en-IN')}</strong> now to secure my seat, and pay the remaining balance before the live session starts.
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-[#141417] border border-[#222226] flex items-center justify-between text-xs">
                      <span className="text-[#a1a1aa]">Live Admission Pass:</span>
                      <span className="font-extrabold text-[#10b981] font-mono">
                        FREE ADMISSION
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#10b981]/25"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Seat...</span>
                    ) : (
                      <>
                        <span>
                          {enrollModalSession.priceInr > 0
                            ? `Lock Seat with ₹${(enrollModalSession.advanceFeeInr || Math.round(enrollModalSession.priceInr * 0.25)).toLocaleString('en-IN')} Advance`
                            : 'Confirm Free Live Session Registration'}
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
