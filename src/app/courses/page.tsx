'use client';

import React from 'react';
import Link from 'next/link';
import {
  Video,
  Radio,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Zap,
  Monitor
} from 'lucide-react';

export default function CoursesHubPage() {
  const options = [
    {
      id: 'recorded',
      title: 'Recorded Classes',
      badge: 'SELF-PACED VIDEO LESSONS',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      tagline: 'Learn at your own pace anytime, anywhere',
      description:
        'Comprehensive on-demand video masterclasses covering Forex SMC institutional order flow, Nifty/BankNifty index options, and FTMO prop challenge preparation with lifetime replay and future updates.',
      icon: Video,
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      href: '/courses/recorded',
      buttonText: 'Browse Recorded Classes',
      buttonStyle: 'bg-[#10b981] hover:bg-[#059669] text-black shadow-[#10b981]/25',
      features: [
        'Lifetime access to full HD video curriculum',
        'Learn anytime on mobile, tablet, or desktop',
        'Step-by-step PDF trade checklists & markups',
        'Direct Discord community Q&A access',
      ],
      stats: '4 Masterclasses • 28+ Video Hours',
    },
    {
      id: 'offline',
      title: 'Offline Classes',
      badge: 'IN-PERSON WORKSHOPS',
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      tagline: 'Classroom trading in Bengaluru, Mumbai & Chennai',
      description:
        'Intensive 3-day in-person bootcamps on big screen trading floors. Sit next to the mentor, execute live trades together during NSE & London opens, and network with serious traders.',
      icon: MapPin,
      iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      href: '/offline',
      buttonText: 'Explore Offline Batches & Venues',
      buttonStyle: 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/25',
      features: [
        'Physical trading desks with institutional monitors',
        'Live market trading alongside lead mentors',
        'High-tea, networking lunch & 1-on-1 portfolio review',
        'Reserve seats with nominal advance fee',
      ],
      stats: 'Chennai, Bengaluru & Mumbai • 25 Seats/Batch',
    },
    {
      id: 'live',
      title: 'Live Sessions',
      badge: 'MARKET HOURS INTERACTIVE',
      badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      tagline: 'Trade alongside mentor on Zoom / Meet',
      description:
        'Join Somnath live on Zoom/Google Meet during London & New York market sessions. Witness real-time order block executions, ask live voice/mic questions, and receive feedback on your journal.',
      icon: Radio,
      iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      href: '/live',
      buttonText: 'Join Live Trading Sessions',
      buttonStyle: 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25',
      features: [
        'Live screen-share execution during active sessions',
        'Instant microphone & chat Q&A with mentor',
        'Prop firm drawdown & risk evaluation AMAs',
        'HD replay recordings provided for all attendees',
      ],
      stats: 'Weekly Live Labs • Interactive Cohorts',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24 space-y-16">
      {/* 1. HERO HEADER */}
      <section className="relative pt-14 sm:pt-20 pb-12 border-b border-[#222222] bg-gradient-to-b from-[#0c120e] via-black to-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#222222] text-xs font-semibold text-white shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[#10b981] font-bold uppercase tracking-wider">Choose Your Learning Path</span>
            <span className="text-[#a1a1aa]">•</span>
            <span className="text-white">LearnFxTrade Mentorship</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Select How You Want To Master The Markets. <br />
            <span className="text-[#10b981]">Three Tailored Learning Formats.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
            Whether you prefer flexible on-demand video learning, interactive live webinars during market hours, or intensive in-person classroom trading floors, we have the ideal format for you.
          </p>
        </div>
      </section>

      {/* 2. THE THREE OPTIONS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {options.map((option, idx) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#222222] bg-[#0c0c0e] hover:border-[#333338] hover:bg-[#101014] p-8 transition-all duration-300 shadow-2xl space-y-8"
              >
                <div className="space-y-6">
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-white/40">
                      0{idx + 1} / OPTION
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border ${option.badgeColor}`}
                    >
                      {option.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3">
                    <div
                      className={`h-14 w-14 rounded-2xl border flex items-center justify-center ${option.iconBg}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white group-hover:text-[#10b981] transition">
                        {option.title}
                      </h2>
                      <p className="text-xs font-semibold text-white/70 mt-1">
                        {option.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {option.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-4 border-t border-[#1c1c20]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                      What is included:
                    </span>
                    <ul className="space-y-2 text-xs text-white/80">
                      {option.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-[#1c1c20] space-y-3">
                  <div className="text-[11px] font-mono text-center text-[#a1a1aa]">
                    {option.stats}
                  </div>
                  <Link
                    href={option.href}
                    className={`w-full py-3.5 px-5 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${option.buttonStyle}`}
                  >
                    <span>{option.buttonText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. COMPARISON HELPER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#222222] bg-[#0c0c0e] p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10b981]">
              Need Help Deciding?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Which Format Fits Your Trading Schedule?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
              Every format is rooted in the same core institutional strategy: liquidity sweeps, Fair Value Gaps, and funded prop risk control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-[#121215] border border-[#202024] space-y-2">
              <div className="text-xs font-bold text-emerald-400">Working Professionals</div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Choose <strong className="text-white">Recorded Classes</strong> if you have fixed day job hours and want to study at night or on weekends at your own pace.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121215] border border-[#202024] space-y-2">
              <div className="text-xs font-bold text-rose-400">Active Market Day Traders</div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Choose <strong className="text-white">Live Sessions</strong> if you want real-time trading guidance and instant voice answers during European & US market hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121215] border border-[#202024] space-y-2">
              <div className="text-xs font-bold text-amber-400">Immersive Hands-On Learners</div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Choose <strong className="text-white">Offline Classes</strong> if you benefit most from 1-on-1 mentorship, in-person screen setups, and high-energy peer networking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
